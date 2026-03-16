// Popup script: orchestrates conversion between content script and converter lib

const SETTINGS_KEY = 'wikiMdSettings';
const SETTING_DEFAULTS = {
  embedBase64: true,
  htmlInlineImages: true,
  includeMetadata: true,
};

/** Load persisted settings (merged with defaults). */
async function getSettings() {
  try {
    const result = await browser.storage.local.get(SETTINGS_KEY);
    return { ...SETTING_DEFAULTS, ...result[SETTINGS_KEY] };
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}

document.addEventListener('DOMContentLoaded', init);

async function init() {
  setupTheme();
  setupTabs();
  setupExportTab();
  setupConvertTab();
  setupImportTab();
  setupAttachmentsTab();
  await applySettingsToUI();
  await detectPage();
}

/** Sync popup checkboxes with persisted settings. */
async function applySettingsToUI() {
  const settings = await getSettings();
  document.getElementById('optImages').checked = settings.embedBase64;
  document.getElementById('optMetadata').checked = settings.includeMetadata;
}

// ─── Theme toggle (light / dark / system) ────────────────────────
function setupTheme() {
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('jira-md-theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
    updateThemeIcon(stored);
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    let next;
    if (!current) {
      // system → dark
      next = 'dark';
    } else if (current === 'dark') {
      // dark → light
      next = 'light';
    } else {
      // light → system (remove attribute)
      next = null;
    }

    if (next) {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jira-md-theme', next);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('jira-md-theme');
    }
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById('themeToggle');
  if (theme === 'dark') {
    toggle.textContent = '\u263E'; // moon
    toggle.title = 'Theme: Dark (click for Light)';
  } else if (theme === 'light') {
    toggle.textContent = '\u2600'; // sun
    toggle.title = 'Theme: Light (click for System)';
  } else {
    toggle.textContent = '\u25D1'; // half circle
    toggle.title = 'Theme: System (click for Dark)';
  }
}

// ─── Settings link ──────────────────────────────────────────────
document.getElementById('btnSettings').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

// ─── Tab switching ───────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

// ─── Page detection ──────────────────────────────────────────────
async function detectPage() {
  try {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    const info = await browser.tabs.sendMessage(tab.id, { type: 'getPageInfo' });
    const el = document.getElementById('pageInfo');
    if (info.isConfluence) {
      el.textContent = '📄 Confluence page detected';
    } else if (info.isJira) {
      el.textContent = '🎯 Jira issue detected';
      if (info.isEditing) el.textContent += ' (editor open)';
    } else {
      el.textContent = '⚠️ Not a Jira/Confluence page';
    }
  } catch {
    document.getElementById('pageInfo').textContent = '⚠️ Cannot access page';
  }
}

// ─── Tab 1: Export (page → Markdown) ─────────────────────────────
function setupExportTab() {
  const btnCopy = document.getElementById('btnCopyMd');
  const btnCopyOutput = document.getElementById('btnCopyOutput');
  const btnDownload = document.getElementById('btnDownload');
  const btnExportImages = document.getElementById('btnExportImages');
  const btnExportHtml = document.getElementById('btnExportHtml');
  const output = document.getElementById('outputMd');

  // State: keep track of last export for download filename and images
  let lastPageTitle = '';
  let lastImageUrls = [];

  btnCopy.addEventListener('click', async () => {
    btnCopy.disabled = true;
    btnCopy.textContent = 'Converting...';
    setStatus('Extracting page content...');

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      const options = {
        includeImages: document.getElementById('optImages').checked,
        includeMetadata: document.getElementById('optMetadata').checked,
        selectedOnly: document.getElementById('optSelected').checked,
      };

      // Step 1: Extract content from page
      const { html, metadata, imageUrls } = await browser.tabs.sendMessage(tab.id, {
        type: 'extractPageContent',
        options,
      });

      if (!html) {
        setStatus('No content found on page.', 'error');
        return;
      }

      // Save for download filename / image export
      lastPageTitle = sanitizeFilename(
        metadata?.issueKey || metadata?.title || tab.title || 'export'
      );
      lastImageUrls = imageUrls || [];

      // Step 2: Fetch images as base64 (via background script)
      let imageBase64Map = new Map();
      if (options.includeImages && imageUrls.length > 0) {
        setStatus(`Converting ${imageUrls.length} images to base64...`);
        const urlMap = await browser.runtime.sendMessage({
          type: 'fetchImagesAsBase64',
          urls: imageUrls,
        });
        imageBase64Map = new Map(Object.entries(urlMap));
      }

      // Step 3: Convert HTML to Markdown
      const md = window.JiraMdConverter.htmlToMarkdown(html, {
        imageBase64Map,
        metadata: options.includeMetadata ? metadata : null,
      });

      output.value = md;
      btnCopyOutput.disabled = false;
      btnDownload.disabled = false;
      if (lastImageUrls.length > 0) btnExportImages.disabled = false;
      setStatus(`Converted! ${md.length} chars, ${imageBase64Map.size} images embedded.`, 'success');
    } catch (e) {
      setStatus(`Error: ${e.message}`, 'error');
      console.error('[Wiki↔MD]', e);
    } finally {
      btnCopy.disabled = false;
      btnCopy.textContent = 'Copy Page as Markdown';
    }
  });

  btnCopyOutput.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value);
    setStatus('Copied to clipboard!', 'success');
  });

  // ─── All downloads go through background downloads API for folder structure ───
  // Structure: Downloads/{pageTitle}/{pageTitle}.md
  //            Downloads/{pageTitle}/{pageTitle}.html
  //            Downloads/{pageTitle}/images/img01.png

  // Download .md — respects embedBase64 setting:
  //   ON:  save .md with base64 data URIs (self-contained, no images/ folder)
  //   OFF: download images to images/ folder, use relative paths in .md
  btnDownload.addEventListener('click', async () => {
    const settings = await getSettings();
    let mdContent = output.value;

    if (settings.embedBase64) {
      // ── Base64 mode: ensure images are embedded as data URIs ──
      setStatus('Saving self-contained markdown...');

      // If the markdown doesn't have base64 yet (e.g. checkbox was off during copy),
      // fetch and embed now
      if (lastImageUrls.length > 0 && !mdContent.includes('data:image/')) {
        setStatus(`Embedding ${lastImageUrls.length} images as base64...`);
        const urlMap = await browser.runtime.sendMessage({
          type: 'fetchImagesAsBase64',
          urls: lastImageUrls,
        });
        for (const [originalUrl, dataUri] of Object.entries(urlMap)) {
          if (!dataUri.startsWith('data:')) continue;
          mdContent = mdContent.split(originalUrl).join(dataUri);
        }
      }
    } else {
      // ── Local path mode: download images to images/ folder ──
      setStatus('Saving markdown + images...');

      if (lastImageUrls.length > 0) {
        const urlMap = await browser.runtime.sendMessage({
          type: 'fetchImagesAsBase64',
          urls: lastImageUrls,
        });

        let imgIdx = 0;
        for (const [originalUrl, dataUri] of Object.entries(urlMap)) {
          if (!dataUri.startsWith('data:')) continue;
          imgIdx++;
          const mimeMatch = dataUri.match(/^data:image\/(\w+);/);
          const ext = mimeMatch ? mimeMatch[1].replace('jpeg', 'jpg') : 'png';
          const imgName = `img${String(imgIdx).padStart(2, '0')}.${ext}`;
          const localPath = `images/${imgName}`;

          // Save image file to folder
          await browser.runtime.sendMessage({
            type: 'downloadToFolder',
            dataUri,
            filePath: `${lastPageTitle}/${localPath}`,
          });

          // Replace ALL occurrences of this URL in markdown (base64 or original)
          mdContent = mdContent.split(originalUrl).join(localPath);
          // Also replace any base64 version that was embedded
          if (mdContent.includes(dataUri)) {
            mdContent = mdContent.split(dataUri).join(localPath);
          }

          await new Promise((r) => setTimeout(r, 100));
        }
      }
    }

    // Save the .md file
    const mdDataUri = 'data:text/markdown;base64,' + btoa(unescape(encodeURIComponent(mdContent)));
    const filePath = `${lastPageTitle}/${lastPageTitle}.md`;
    const result = await browser.runtime.sendMessage({
      type: 'downloadToFolder',
      dataUri: mdDataUri,
      filePath,
    });

    if (result.success) {
      const mode = settings.embedBase64 ? '(base64 embedded)' : '+ images/';
      setStatus(`Saved: ${filePath} ${mode}`, 'success');
    } else {
      setStatus(`Error: ${result.error}`, 'error');
    }
  });

  // Export all images into folder/images/
  btnExportImages.addEventListener('click', async () => {
    if (lastImageUrls.length === 0) return;
    btnExportImages.disabled = true;
    btnExportImages.textContent = 'Downloading...';
    setStatus(`Downloading ${lastImageUrls.length} images...`);

    try {
      const urlMap = await browser.runtime.sendMessage({
        type: 'fetchImagesAsBase64',
        urls: lastImageUrls,
      });

      let count = 0;
      for (const [, dataUri] of Object.entries(urlMap)) {
        if (!dataUri.startsWith('data:')) continue;
        const mimeMatch = dataUri.match(/^data:image\/(\w+);/);
        const ext = mimeMatch ? mimeMatch[1].replace('jpeg', 'jpg') : 'png';
        const imgName = `img${String(count + 1).padStart(2, '0')}.${ext}`;
        const filePath = `${lastPageTitle}/images/${imgName}`;

        await browser.runtime.sendMessage({
          type: 'downloadToFolder',
          dataUri,
          filePath,
        });
        count++;
        await new Promise((r) => setTimeout(r, 150));
      }

      setStatus(`Saved ${count} images → ${lastPageTitle}/images/`, 'success');
    } catch (e) {
      setStatus(`Error: ${e.message}`, 'error');
    } finally {
      btnExportImages.disabled = false;
      btnExportImages.textContent = 'Export Images';
    }
  });

  // Export single HTML into folder
  btnExportHtml.addEventListener('click', async () => {
    btnExportHtml.disabled = true;
    btnExportHtml.textContent = 'Exporting...';
    setStatus('Building self-contained HTML...');

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      const settings = await getSettings();
      const result = await browser.tabs.sendMessage(tab.id, {
        type: 'exportSingleHtml',
        options: { inlineImages: settings.htmlInlineImages },
      });

      if (!result.success) {
        setStatus(result.error || 'Export failed', 'error');
        return;
      }

      const title = sanitizeFilename(lastPageTitle || result.title || 'export');
      const dataUri = 'data:text/html;base64,' + btoa(unescape(encodeURIComponent(result.html)));
      const filePath = `${title}/${title}.html`;

      // Save HTML file
      await browser.runtime.sendMessage({
        type: 'downloadToFolder',
        dataUri,
        filePath,
      });

      // Download accompanying local media (videos, attachments) referenced by the HTML
      let mediaCount = 0;
      if (result.localMedia && result.localMedia.length > 0) {
        setStatus(`Downloading ${result.localMedia.length} media files...`);
        const mediaItems = result.localMedia.map((m) => ({
          url: m.url,
          filename: m.filename,
          type: m.type,
        }));
        const dlResult = await browser.runtime.sendMessage({
          type: 'downloadAttachments',
          items: mediaItems,
          folderName: title,
        });
        mediaCount = dlResult.success || 0;
      }

      const sizeMB = (result.size / 1024 / 1024).toFixed(1);
      const extra = mediaCount > 0 ? `, ${mediaCount} media files` : '';
      setStatus(`Saved: ${filePath} (${sizeMB}MB, ${result.imageCount} images${extra})`, 'success');
    } catch (e) {
      setStatus(`Error: ${e.message}`, 'error');
    } finally {
      btnExportHtml.disabled = false;
      btnExportHtml.textContent = 'Export HTML';
    }
  });
}

/** Sanitize string for use as filename */
function sanitizeFilename(str) {
  return str
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 100)
    .replace(/^_+|_+$/g, '')
    || 'export';
}

// ─── Tab 2: Convert (bidirectional text conversion) ──────────────
function setupConvertTab() {
  const mdArea = document.getElementById('convertMd');
  const jiraArea = document.getElementById('convertJira');

  document.getElementById('btnMdToJira').addEventListener('click', () => {
    if (!mdArea.value.trim()) return;
    jiraArea.value = window.JiraMdConverter.markdownToJira(mdArea.value);
    setStatus('Converted MD → Jira', 'success');
  });

  document.getElementById('btnJiraToMd').addEventListener('click', () => {
    if (!jiraArea.value.trim()) return;
    mdArea.value = window.JiraMdConverter.jiraToMarkdown(jiraArea.value);
    setStatus('Converted Jira → MD', 'success');
  });

  document.getElementById('btnCopyConvertMd').addEventListener('click', () => {
    navigator.clipboard.writeText(mdArea.value);
    setStatus('MD copied!', 'success');
  });

  document.getElementById('btnCopyConvertJira').addEventListener('click', () => {
    navigator.clipboard.writeText(jiraArea.value);
    setStatus('Jira markup copied!', 'success');
  });
}

// ─── Tab 3: Import (Markdown → Jira page auto-fill) ─────────────
function setupImportTab() {
  const importMd = document.getElementById('importMd');
  const fileInput = document.getElementById('fileInput');
  const fileName = document.getElementById('fileName');
  const optPreview = document.getElementById('optPreview');
  const previewArea = document.getElementById('previewArea');
  const previewJira = document.getElementById('previewJira');
  const btnInsert = document.getElementById('btnInsert');
  const insertStatus = document.getElementById('insertStatus');

  // File upload
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (ev) => {
      importMd.value = ev.target.result;
      updatePreview();
    };
    reader.readAsText(file);
  });

  // Preview toggle
  optPreview.addEventListener('change', () => {
    previewArea.hidden = !optPreview.checked;
    if (optPreview.checked) updatePreview();
  });

  importMd.addEventListener('input', () => {
    if (optPreview.checked) updatePreview();
  });

  function updatePreview() {
    if (!importMd.value.trim()) return;
    previewJira.value = window.JiraMdConverter.markdownToJira(importMd.value);
  }

  // Insert into page
  btnInsert.addEventListener('click', async () => {
    if (!importMd.value.trim()) {
      showInsertStatus('Please enter or upload Markdown content.', 'error');
      return;
    }

    btnInsert.disabled = true;
    btnInsert.textContent = '⏳ Inserting...';

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      const jiraMarkup = window.JiraMdConverter.markdownToJira(importMd.value);

      // Also generate HTML for ProseMirror editors
      const html = window.JiraMdConverter.J2M.md_to_html(importMd.value);

      const result = await browser.tabs.sendMessage(tab.id, {
        type: 'insertMarkdownToJira',
        jiraMarkup,
        html,
      });

      if (result.success) {
        showInsertStatus(`Inserted via ${result.method}!`, 'success');
      } else {
        showInsertStatus(result.error || 'Failed to insert.', 'error');
      }
    } catch (e) {
      showInsertStatus(`Error: ${e.message}`, 'error');
    } finally {
      btnInsert.disabled = false;
      btnInsert.textContent = '⚡ Insert into Jira Page';
    }
  });

  function showInsertStatus(msg, type) {
    insertStatus.hidden = false;
    insertStatus.textContent = msg;
    insertStatus.className = `status ${type}`;
  }
}

// ─── Global status ───────────────────────────────────────────────
// ─── Tab 4: Attachments (scan + select + download) ──────────────
function setupAttachmentsTab() {
  const btnScan = document.getElementById('btnScanAttachments');
  const attachmentList = document.getElementById('attachmentList');
  const attachItems = document.getElementById('attachItems');
  const attachCount = document.getElementById('attachCount');
  const selectAll = document.getElementById('attachSelectAll');
  const btnDownload = document.getElementById('btnDownloadAttachments');
  const downloadStatus = document.getElementById('downloadStatus');

  let scannedData = null;

  btnScan.addEventListener('click', async () => {
    btnScan.disabled = true;
    btnScan.textContent = 'Scanning...';
    setStatus('Scanning page for attachments...');

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      scannedData = await browser.tabs.sendMessage(tab.id, { type: 'collectAttachments' });

      const allItems = [
        ...scannedData.images.map((i) => ({ ...i, type: 'image' })),
        ...scannedData.files.map((f) => ({ ...f, type: 'file' })),
      ];

      if (allItems.length === 0) {
        setStatus('No attachments found.', 'error');
        return;
      }

      // Render checklist
      attachItems.textContent = ''; // clear
      allItems.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'attachment-item';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = true;
        cb.dataset.idx = idx;
        cb.className = 'att-cb';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'att-name';
        nameSpan.textContent = item.filename;
        nameSpan.title = item.filename;

        const typeSpan = document.createElement('span');
        typeSpan.className = 'att-type';
        typeSpan.textContent = item.type;

        row.appendChild(cb);

        // Thumbnail for images
        if (item.type === 'image') {
          const thumb = document.createElement('img');
          thumb.className = 'att-thumb';
          thumb.src = item.url;
          thumb.alt = '';
          row.appendChild(thumb);
        }

        row.appendChild(nameSpan);
        row.appendChild(typeSpan);
        attachItems.appendChild(row);
      });

      attachCount.textContent = `${allItems.length} items`;
      attachmentList.hidden = false;
      btnDownload.disabled = false;
      setStatus(`Found ${scannedData.images.length} images, ${scannedData.files.length} files`, 'success');

      // Store items for download
      scannedData._allItems = allItems;
    } catch (e) {
      setStatus(`Error: ${e.message}`, 'error');
    } finally {
      btnScan.disabled = false;
      btnScan.textContent = 'Scan Attachments';
    }
  });

  // Select all toggle
  selectAll.addEventListener('change', () => {
    const checkboxes = attachItems.querySelectorAll('.att-cb');
    checkboxes.forEach((cb) => { cb.checked = selectAll.checked; });
  });

  // Download selected
  btnDownload.addEventListener('click', async () => {
    if (!scannedData?._allItems) return;

    const checkboxes = attachItems.querySelectorAll('.att-cb');
    const selectedItems = [];
    checkboxes.forEach((cb, idx) => {
      if (cb.checked) {
        selectedItems.push(scannedData._allItems[idx]);
      }
    });

    if (selectedItems.length === 0) {
      showDownloadStatus('No items selected.', 'error');
      return;
    }

    btnDownload.disabled = true;
    btnDownload.textContent = `Downloading ${selectedItems.length}...`;
    setStatus(`Downloading ${selectedItems.length} items...`);

    try {
      const result = await browser.runtime.sendMessage({
        type: 'downloadAttachments',
        items: selectedItems,
        folderName: scannedData.pageTitle,
      });

      showDownloadStatus(
        `Downloaded ${result.success} items${result.failed ? `, ${result.failed} failed` : ''}`,
        result.failed ? 'warning' : 'success'
      );
      setStatus('Download complete', 'success');
    } catch (e) {
      showDownloadStatus(`Error: ${e.message}`, 'error');
    } finally {
      btnDownload.disabled = false;
      btnDownload.textContent = 'Download Selected';
    }
  });

  function showDownloadStatus(msg, type) {
    downloadStatus.hidden = false;
    downloadStatus.textContent = msg;
    downloadStatus.className = `status ${type}`;
  }
}

function setStatus(msg, type = 'info') {
  const el = document.getElementById('statusText');
  el.textContent = msg;
  el.style.color = type === 'success'
    ? 'var(--success)'
    : type === 'error'
      ? 'var(--error)'
      : 'var(--text-muted)';
}
