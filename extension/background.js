// Background script: cross-browser (Firefox + Chrome) MV3
// Uses webextension-polyfill for unified `browser.*` API

// ─── Context menu (must be in onInstalled for Chrome) ────────────
const menusApi = browser.menus || browser.contextMenus;

browser.runtime.onInstalled.addListener(() => {
  menusApi.create({
    id: 'copy-page-as-md',
    title: 'Copy Page as Markdown',
    contexts: ['page'],
    documentUrlPatterns: ['*://*.atlassian.net/*', '*://*.jira.com/*'],
  });

  menusApi.create({
    id: 'copy-selection-as-md',
    title: 'Copy Selection as Markdown',
    contexts: ['selection'],
    documentUrlPatterns: ['*://*.atlassian.net/*', '*://*.jira.com/*'],
  });
});

menusApi.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'copy-page-as-md') {
    await triggerCopyAsMarkdown(tab.id, false);
  } else if (info.menuItemId === 'copy-selection-as-md') {
    await triggerCopyAsMarkdown(tab.id, true);
  }
});

// ─── Message handler ─────────────────────────────────────────────
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'fetchImagesAsBase64') {
    return handleFetchImages(message.urls);
  }
  if (message.type === 'requestPermission') {
    return browser.permissions.request({ origins: ['<all_urls>'] });
  }
  if (message.type === 'downloadAttachments') {
    return handleDownloadAttachments(message.items, message.folderName);
  }
  if (message.type === 'downloadToFolder') {
    return handleDownloadToFolder(message.dataUri, message.filePath);
  }
  return false;
});

// ─── Keyboard shortcuts ──────────────────────────────────────────
browser.commands.onCommand.addListener(async (command) => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  if (command === 'copy-as-markdown') {
    await triggerCopyAsMarkdown(tab.id, false);
  } else if (command === 'insert-markdown') {
    await triggerInsertFromClipboard(tab.id);
  }
});

// ─── Core functions ──────────────────────────────────────────────

async function triggerCopyAsMarkdown(tabId, selectedOnly) {
  try {
    const { html, metadata, imageUrls } = await browser.tabs.sendMessage(tabId, {
      type: 'extractPageContent',
      options: { includeImages: true, includeMetadata: true, selectedOnly },
    });

    if (!html) return;

    let imageMap = {};
    if (imageUrls.length > 0) {
      imageMap = await handleFetchImages(imageUrls);
    }

    await browser.tabs.sendMessage(tabId, {
      type: 'convertAndCopy',
      html,
      metadata,
      imageMap,
    });
  } catch (e) {
    console.error('[Wiki↔MD] Copy failed:', e);
  }
}

async function triggerInsertFromClipboard(tabId) {
  try {
    await browser.tabs.sendMessage(tabId, {
      type: 'insertFromClipboard',
    });
  } catch (e) {
    console.error('[Wiki↔MD] Insert failed:', e);
  }
}

async function handleFetchImages(urls) {
  const results = {};
  const batchSize = 5;
  let successCount = 0;
  let failCount = 0;

  console.log(`[Wiki↔MD] Fetching ${urls.length} images for base64 conversion...`);

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const promises = batch.map(async (url) => {
      try {
        // Decode HTML entities + upgrade Atlassian CDN to max resolution
        let fetchUrl = url.replace(/&amp;/g, '&');
        fetchUrl = upgradeAtlassianUrl(fetchUrl);

        const response = await fetch(fetchUrl, {
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          console.warn(`[Wiki↔MD] Image fetch HTTP ${response.status}: ${cleanUrl.substring(0, 80)}...`);
          failCount++;
          results[url] = url; // fallback to original
          return;
        }

        const contentType = response.headers.get('content-type') || 'image/png';
        const blob = await response.blob();

        // Verify we got an actual image (not an error page)
        if (!contentType.startsWith('image/') && blob.size < 100) {
          console.warn(`[Wiki↔MD] Not an image (${contentType}, ${blob.size}B): ${cleanUrl.substring(0, 80)}...`);
          failCount++;
          results[url] = url;
          return;
        }

        const dataUri = await blobToDataUri(blob);
        results[url] = dataUri;
        successCount++;
      } catch (e) {
        console.warn(`[Wiki↔MD] Image fetch error: ${e.message} — ${url.substring(0, 80)}...`);
        failCount++;
        results[url] = url; // fallback
      }
    });
    await Promise.all(promises);
  }

  console.log(`[Wiki↔MD] Image fetch complete: ${successCount} success, ${failCount} failed`);
  return results;
}

function blobToDataUri(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ─── Download attachments to organized folder ────────────────────

async function handleDownloadAttachments(items, folderName) {
  const results = { success: 0, failed: 0, errors: [] };

  for (const item of items) {
    try {
      const cleanUrl = item.url.replace(/&amp;/g, '&');

      // Fetch the file via background (CORS bypass)
      const response = await fetch(cleanUrl, { credentials: 'include', mode: 'cors' });
      if (!response.ok) {
        results.failed++;
        results.errors.push(`HTTP ${response.status}: ${item.filename}`);
        continue;
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Determine subfolder
      const subfolderMap = { image: 'images', video: 'videos', file: 'attachments' };
      const subfolder = subfolderMap[item.type] || 'attachments';
      const filePath = `${folderName}/${subfolder}/${item.filename}`;

      // Use downloads API with Blob URL (data: URIs not allowed in Firefox)
      await browser.downloads.download({
        url: blobUrl,
        filename: filePath,
        saveAs: false,
      });
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);

      results.success++;

      // Small delay to avoid overwhelming the browser
      await new Promise((r) => setTimeout(r, 150));
    } catch (e) {
      results.failed++;
      results.errors.push(`${item.filename}: ${e.message}`);
    }
  }

  console.log(`[Wiki↔MD] Downloads: ${results.success} success, ${results.failed} failed`);
  return results;
}

/**
 * Download a single data URI to a specific file path within Downloads.
 * Used by popup for .md, .html, and individual image exports.
 */
async function handleDownloadToFolder(dataUri, filePath) {
  try {
    // Firefox doesn't allow data: URIs in downloads.download
    // Convert to Blob URL first
    const blobUrl = await dataUriToBlobUrl(dataUri);
    await browser.downloads.download({
      url: blobUrl,
      filename: filePath,
      saveAs: false,
    });
    // Clean up blob URL after a delay (download needs time to start)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    return { success: true };
  } catch (e) {
    console.warn(`[Wiki↔MD] Download failed: ${filePath}`, e);
    return { success: false, error: e.message };
  }
}

async function dataUriToBlobUrl(dataUri) {
  const resp = await fetch(dataUri);
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
}

/**
 * Upgrade Atlassian media CDN URLs to request maximum resolution.
 * Results are keyed by ORIGINAL URL so popup's imageBase64Map matches HTML src attributes.
 */
function upgradeAtlassianUrl(url) {
  if (!url.includes('media-cdn.atlassian.com') && !url.includes('media.atlassian.com')) {
    return url;
  }
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('width', '4096');
    parsed.searchParams.set('height', '4096');
    parsed.searchParams.set('mode', 'full-fit');
    return parsed.toString();
  } catch {
    return url;
  }
}
