(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/islands/message-bus.js
  function registerHandler(messageType, handler) {
    if (handlers.has(messageType)) {
      console.warn(`[MessageBus] Overwriting handler for "${messageType}"`);
    }
    handlers.set(messageType, handler);
  }
  function initMessageBus() {
    browser.runtime.onMessage.addListener((message, _sender) => {
      const handler = handlers.get(message.type);
      if (handler) {
        return handler(message);
      }
      return false;
    });
  }
  function sendToBackground(message) {
    return browser.runtime.sendMessage(message);
  }
  var handlers;
  var init_message_bus = __esm({
    "src/islands/message-bus.js"() {
      handlers = /* @__PURE__ */ new Map();
    }
  });

  // src/islands/extractor.js
  function initExtractorIsland() {
    registerHandler("getPageInfo", () => Promise.resolve(getPageInfo()));
    registerHandler("extractPageContent", (msg) => Promise.resolve(extractContent(msg.options)));
  }
  function getPageInfo() {
    return {
      isConfluence: detectConfluence(),
      isJira: detectJira(),
      isEditing: detectEditor(),
      url: window.location.href,
      title: document.title
    };
  }
  function detectConfluence() {
    return !!(document.querySelector("#main-content") || document.querySelector('[data-testid="page-content"]') || document.body.classList.contains("theme-default"));
  }
  function detectJira() {
    return !!(document.querySelector("#jira") || document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]') || window.location.hostname.includes("atlassian.net"));
  }
  function detectEditor() {
    return !!(document.querySelector('[contenteditable="true"]') || document.querySelector(".ProseMirror") || document.querySelector("#tinymce"));
  }
  function extractContent(options = {}) {
    const { includeImages = true, includeMetadata = true, selectedOnly = false } = options;
    let html = "";
    const selection = window.getSelection();
    if (selectedOnly && selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const container = document.createElement("div");
      container.appendChild(range.cloneContents());
      html = container.innerHTML;
    } else {
      html = extractFullContent();
    }
    const metadata = includeMetadata ? extractMetadata() : {};
    const imageUrls = includeImages ? collectImageUrls(html) : [];
    return { html, metadata, imageUrls };
  }
  function extractFullContent() {
    const confluence = document.querySelector('[data-testid="page-content"]') || document.querySelector("#main-content") || document.querySelector(".wiki-content");
    if (confluence) return confluence.innerHTML;
    const jiraDesc = document.querySelector('[data-testid="issue.views.field.rich-text.description"]') || document.querySelector("#description-val") || document.querySelector(".user-content-block");
    if (jiraDesc) {
      const summary = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]') || document.querySelector("#summary-val");
      const titleHtml = summary ? `<h1>${escapeHtml(summary.textContent)}</h1>` : "";
      return titleHtml + jiraDesc.innerHTML;
    }
    const comments = document.querySelectorAll(
      '[data-testid="issue.activity.comments-list"] .user-content-block, .activity-comment .action-body'
    );
    if (comments.length > 0) {
      return [...comments].map((c) => c.innerHTML).join("\n<hr>\n");
    }
    const main = document.querySelector("main") || document.querySelector('[role="main"]');
    return main ? main.innerHTML : "";
  }
  function extractMetadata() {
    const meta = {
      title: document.title,
      url: window.location.href,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const selectors = {
      spaceKey: 'meta[name="ajs-space-key"]',
      pageId: 'meta[name="ajs-page-id"]'
    };
    for (const [key, sel] of Object.entries(selectors)) {
      const el = document.querySelector(sel);
      if (el) meta[key] = el.content;
    }
    const author = document.querySelector(".page-metadata-modification-info .author") || document.querySelector('[data-testid="page-metadata-banner--last-modified-by"]');
    if (author) meta.author = author.textContent.trim();
    const labels = document.querySelectorAll('.label-list .label, [data-testid="label"]');
    if (labels.length > 0) meta.labels = [...labels].map((l) => l.textContent.trim());
    const issueKey = document.querySelector(
      '[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"], #key-val'
    );
    if (issueKey) meta.issueKey = issueKey.textContent.trim();
    const status = document.querySelector(
      '[data-testid="issue.views.issue-base.foundation.status.status-field-wrapper"]'
    );
    if (status) meta.status = status.textContent.trim();
    return meta;
  }
  function collectImageUrls(html) {
    if (!html) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const urls = /* @__PURE__ */ new Set();
    for (const img of doc.querySelectorAll("img")) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        urls.add(src);
      }
      const dataSrc = img.getAttribute("data-src");
      if (dataSrc && !dataSrc.startsWith("data:")) {
        urls.add(dataSrc);
      }
    }
    for (const media of doc.querySelectorAll('[data-node-type="mediaSingle"], [data-node-type="media"]')) {
      const img = media.querySelector("img");
      if (img) {
        const src = img.getAttribute("src") || img.getAttribute("data-src");
        if (src && !src.startsWith("data:") && !urls.has(src)) {
          urls.add(src);
        }
      }
      for (const el of media.querySelectorAll("[src]")) {
        if (el.tagName === "VIDEO" || el.tagName === "SOURCE") continue;
        const src = el.getAttribute("src");
        if (src && !src.startsWith("data:") && !urls.has(src)) {
          urls.add(src);
        }
      }
    }
    return [...urls];
  }
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  var init_extractor = __esm({
    "src/islands/extractor.js"() {
      init_message_bus();
    }
  });

  // src/islands/notification.js
  function showNotification(text, isError = false) {
    const existing = document.getElementById(NOTIFICATION_ID);
    if (existing) existing.remove();
    const el = document.createElement("div");
    el.id = NOTIFICATION_ID;
    el.textContent = text;
    Object.assign(el.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      padding: "10px 18px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "500",
      zIndex: "999999",
      background: isError ? "#de350b" : "#00875a",
      color: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      transition: "opacity 0.3s",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    });
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), FADE_MS);
    }, DISPLAY_MS);
  }
  var NOTIFICATION_ID, DISPLAY_MS, FADE_MS;
  var init_notification = __esm({
    "src/islands/notification.js"() {
      NOTIFICATION_ID = "wiki-md-notification";
      DISPLAY_MS = 2e3;
      FADE_MS = 300;
    }
  });

  // src/islands/inserter.js
  function initInserterIsland() {
    registerHandler(
      "insertMarkdownToJira",
      (msg) => Promise.resolve(insertToEditor(msg.jiraMarkup, msg.html))
    );
    registerHandler("insertFromClipboard", () => handleInsertFromClipboard());
  }
  function insertToEditor(jiraMarkup, html) {
    const proseMirror = document.querySelector('.ProseMirror[contenteditable="true"]');
    if (proseMirror) {
      return insertViaProseMirror(proseMirror, html, jiraMarkup);
    }
    const tinymce = document.querySelector("#tinymce, .mce-content-body");
    if (tinymce) {
      return insertViaTinyMCE(html);
    }
    const textarea = document.querySelector(
      'textarea[name="description"], textarea[name="comment"], textarea.wiki-edit'
    );
    if (textarea) {
      textarea.value = jiraMarkup;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
      return { success: true, method: "textarea" };
    }
    return { success: false, error: "No editable field found. Please open an editor first." };
  }
  function insertViaProseMirror(editor, html, jiraMarkup) {
    try {
      editor.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editor);
      sel.removeAllRanges();
      sel.addRange(range);
      const clipboardData = new DataTransfer();
      clipboardData.setData("text/html", html);
      clipboardData.setData("text/plain", jiraMarkup);
      const pasteEvent = new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData
      });
      editor.dispatchEvent(pasteEvent);
      return { success: true, method: "prosemirror-paste" };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  function insertViaTinyMCE(html) {
    try {
      if (window.tinymce && window.tinymce.activeEditor) {
        window.tinymce.activeEditor.setContent(html);
        return { success: true, method: "tinymce" };
      }
      return { success: false, error: "TinyMCE not accessible" };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  async function handleInsertFromClipboard() {
    try {
      const md = await navigator.clipboard.readText();
      if (!md || !md.trim()) {
        showNotification("Clipboard is empty", true);
        return { success: false };
      }
      const escDiv = document.createElement("div");
      escDiv.textContent = md;
      const result = insertToEditor(md, `<pre>${escDiv.innerHTML}</pre>`);
      if (result.success) showNotification("Inserted from clipboard!");
      return result;
    } catch (e) {
      showNotification("Insert failed: " + e.message, true);
      return { success: false, error: e.message };
    }
  }
  var init_inserter = __esm({
    "src/islands/inserter.js"() {
      init_message_bus();
      init_notification();
    }
  });

  // src/islands/html-exporter.js
  function initHtmlExporterIsland() {
    registerHandler("exportSingleHtml", (msg) => exportSingleHtml(msg.options));
  }
  async function exportSingleHtml(options = {}) {
    const { inlineImages = true } = options;
    try {
      const contentEl = findContentElement();
      const clone = contentEl.cloneNode(true);
      const inlinedStyles = await collectStyles();
      let imageCount = 0;
      if (inlineImages) {
        imageCount = await inlineImagesInClone(clone);
      }
      const localMedia = replaceVideosWithLocal(clone);
      replaceFileLinksWithLocal(clone, localMedia);
      for (const script of clone.querySelectorAll("script")) {
        script.remove();
      }
      const title = document.title;
      const escTitle = escapeHtml2(title);
      const escUrl = escapeHtml2(window.location.href);
      const htmlContent = [
        "<!DOCTYPE html>",
        `<html lang="${document.documentElement.lang || "en"}">`,
        "<head>",
        '  <meta charset="UTF-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        `  <title>${escTitle}</title>`,
        '  <meta name="generator" content="Wiki\u2194Markdown Extension">',
        `  <meta name="source-url" content="${escUrl}">`,
        `  <meta name="export-date" content="${(/* @__PURE__ */ new Date()).toISOString()}">`,
        "  <style>",
        inlinedStyles,
        LIGHTBOX_STYLES,
        "  </style>",
        "</head>",
        "<body>",
        `  ${clone.outerHTML}`,
        LIGHTBOX_HTML,
        LIGHTBOX_SCRIPT,
        "</body>",
        "</html>"
      ].join("\n");
      return {
        success: true,
        html: htmlContent,
        title,
        imageCount,
        size: htmlContent.length,
        localMedia
        // files that need to be downloaded alongside the HTML
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  function findContentElement() {
    const selectors = [
      '[data-testid="page-content"]',
      "#main-content",
      ".wiki-content",
      '[data-testid="issue.views.field.rich-text.description"]',
      "#description-val",
      "main",
      "body"
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return document.body;
  }
  async function collectStyles() {
    const styleChunks = [];
    for (const sheet of document.styleSheets) {
      try {
        const rules = [...sheet.cssRules].map((r) => r.cssText).join("\n");
        styleChunks.push(rules);
      } catch {
        if (sheet.href) {
          try {
            const resp = await fetch(sheet.href);
            if (resp.ok) styleChunks.push(await resp.text());
          } catch {
          }
        }
      }
    }
    return styleChunks.join("\n\n");
  }
  async function inlineImagesInClone(clone) {
    const imgs = clone.querySelectorAll("img");
    const urlSet = /* @__PURE__ */ new Set();
    const imgUrlMap = /* @__PURE__ */ new Map();
    for (const img of imgs) {
      let bestUrl = getHighestResSrc(img);
      if ((!bestUrl || bestUrl.startsWith("data:")) && img.getAttribute("data-src")) {
        bestUrl = img.getAttribute("data-src");
      }
      if (bestUrl && !bestUrl.startsWith("data:")) {
        urlSet.add(bestUrl);
        imgUrlMap.set(img, bestUrl);
      }
    }
    const urls = [...urlSet];
    if (urls.length === 0) return 0;
    const imageMap = await sendToBackground({
      type: "fetchImagesAsBase64",
      urls
    });
    let count = 0;
    for (const img of imgs) {
      const bestUrl = imgUrlMap.get(img);
      if (bestUrl && imageMap[bestUrl] && imageMap[bestUrl].startsWith("data:")) {
        img.setAttribute("src", imageMap[bestUrl]);
        img.removeAttribute("srcset");
        count++;
      }
    }
    return count;
  }
  function getHighestResSrc(img) {
    let bestUrl = img.getAttribute("src");
    const srcset = img.getAttribute("srcset");
    if (srcset) {
      const entries = srcset.split(",").map((entry) => {
        const parts = entry.trim().split(/\s+/);
        return { url: parts[0], multiplier: parseFloat(parts[1]) || 1 };
      });
      entries.sort((a, b) => b.multiplier - a.multiplier);
      if (entries.length > 0 && entries[0].url) {
        bestUrl = entries[0].url;
      }
    }
    if (bestUrl) {
      bestUrl = upgradeAtlassianMediaUrl(bestUrl);
    }
    return bestUrl;
  }
  function upgradeAtlassianMediaUrl(url) {
    if (!url.includes("media-cdn.atlassian.com") && !url.includes("media.atlassian.com")) {
      return url;
    }
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("width", "4096");
      parsed.searchParams.set("height", "4096");
      parsed.searchParams.set("mode", "full-fit");
      return parsed.toString();
    } catch {
      return url;
    }
  }
  function replaceVideosWithLocal(clone) {
    const media = [];
    let videoIdx = 0;
    const videos = clone.querySelectorAll("video");
    for (const video of videos) {
      const src = video.getAttribute("src") || video.querySelector("source")?.getAttribute("src");
      if (!src || src.startsWith("data:")) continue;
      videoIdx++;
      const name = video.getAttribute("data-test-media-name") || video.getAttribute("data-media-name") || extractFilenameFromUrl(src) || `video_${String(videoIdx).padStart(2, "0")}.mp4`;
      const localPath = `videos/${name}`;
      const newVideo = clone.ownerDocument.createElement("video");
      newVideo.setAttribute("controls", "");
      newVideo.setAttribute("preload", "metadata");
      newVideo.setAttribute("src", localPath);
      newVideo.style.cssText = "max-width:100%;border-radius:6px;";
      if (video.getAttribute("poster")) {
        newVideo.setAttribute("poster", video.getAttribute("poster"));
      }
      video.replaceWith(newVideo);
      media.push({
        url: decodeHtmlEntities(upgradeAtlassianMediaUrl(src)),
        localPath,
        filename: name,
        type: "video"
      });
    }
    const videoCards = clone.querySelectorAll(
      '[data-testid*="media"][data-type="video"], [data-node-type="mediaSingle"]'
    );
    for (const card of videoCards) {
      const innerVideo = card.querySelector("video");
      if (innerVideo) continue;
      if (card.querySelector("img")) continue;
      const src = card.querySelector("[src]")?.getAttribute("src");
      if (!src) continue;
      videoIdx++;
      const name = card.getAttribute("data-media-name") || extractFilenameFromUrl(src) || `video_${String(videoIdx).padStart(2, "0")}.mp4`;
      const localPath = `videos/${name}`;
      const newVideo = clone.ownerDocument.createElement("video");
      newVideo.setAttribute("controls", "");
      newVideo.setAttribute("preload", "metadata");
      newVideo.setAttribute("src", localPath);
      newVideo.style.cssText = "max-width:100%;border-radius:6px;";
      card.replaceWith(newVideo);
      media.push({
        url: decodeHtmlEntities(upgradeAtlassianMediaUrl(src)),
        localPath,
        filename: name,
        type: "video"
      });
    }
    return media;
  }
  function replaceFileLinksWithLocal(clone, media) {
    const previewableExt = /\.(png|jpg|jpeg|gif|svg|webp|html|htm)$/i;
    let fileIdx = 0;
    const fileLinks = clone.querySelectorAll(
      'a[href*="media-cdn.atlassian.com"], a[href*="/wiki/download/"], a.attachment-link, a[data-attachment-id]'
    );
    for (const link of fileLinks) {
      const href = link.getAttribute("href");
      if (!href) continue;
      if (previewableExt.test(href)) continue;
      if (href.startsWith("#")) continue;
      fileIdx++;
      const name = link.getAttribute("download") || link.textContent.trim() || extractFilenameFromUrl(href) || `file_${String(fileIdx).padStart(2, "0")}`;
      const localPath = `attachments/${name}`;
      link.setAttribute("href", localPath);
      link.setAttribute("title", `Local file: ${localPath}`);
      media.push({
        url: decodeHtmlEntities(href),
        localPath,
        filename: name,
        type: "file"
      });
    }
    const inlineCards = clone.querySelectorAll(
      '[data-testid="media-inline"] a, [data-testid="inline-card-resolved-view"] a, .confluence-embedded-file a'
    );
    for (const card of inlineCards) {
      const href = card.getAttribute("href");
      if (!href || href.startsWith("#") || previewableExt.test(href)) continue;
      if (media.some((m) => m.url === decodeHtmlEntities(href))) continue;
      fileIdx++;
      const name = card.textContent.trim() || extractFilenameFromUrl(href) || `file_${String(fileIdx).padStart(2, "0")}`;
      const localPath = `attachments/${name}`;
      card.setAttribute("href", localPath);
      card.setAttribute("title", `Local file: ${localPath}`);
      media.push({
        url: decodeHtmlEntities(href),
        localPath,
        filename: name,
        type: "file"
      });
    }
  }
  function extractFilenameFromUrl(url) {
    try {
      const pathname = new URL(url).pathname;
      const parts = pathname.split("/");
      const last = parts[parts.length - 1];
      return last && last !== "cdn" ? last : "";
    } catch {
      return "";
    }
  }
  function decodeHtmlEntities(str) {
    return str.replace(/&amp;/g, "&");
  }
  function escapeHtml2(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  var LIGHTBOX_STYLES, LIGHTBOX_HTML, LIGHTBOX_SCRIPT;
  var init_html_exporter = __esm({
    "src/islands/html-exporter.js"() {
      init_message_bus();
      LIGHTBOX_STYLES = `
/* \u2500\u2500 Image Lightbox \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
body img {
  cursor: zoom-in;
  transition: opacity 0.15s;
}
body img:hover {
  opacity: 0.85;
}
.wm-lightbox-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
  animation: wm-lb-fadein 0.2s ease;
}
.wm-lightbox-overlay.active {
  display: flex;
}
.wm-lightbox-overlay img {
  max-width: 92vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  cursor: default;
  animation: wm-lb-zoomin 0.25s ease;
}
.wm-lightbox-close {
  position: fixed;
  top: 16px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  z-index: 1000000;
}
.wm-lightbox-close:hover {
  background: rgba(255,255,255,0.3);
}
.wm-lightbox-info {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: rgba(0,0,0,0.5);
  padding: 4px 12px;
  border-radius: 4px;
  pointer-events: none;
}
@keyframes wm-lb-fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes wm-lb-zoomin {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;
      LIGHTBOX_HTML = `
<div class="wm-lightbox-overlay" id="wmLightbox">
  <button class="wm-lightbox-close" id="wmLightboxClose" title="Close (Esc)">&times;</button>
  <img id="wmLightboxImg" src="" alt="">
  <div class="wm-lightbox-info" id="wmLightboxInfo"></div>
</div>
`;
      LIGHTBOX_SCRIPT = `
<script>
(function() {
  var overlay = document.getElementById('wmLightbox');
  var lbImg = document.getElementById('wmLightboxImg');
  var lbInfo = document.getElementById('wmLightboxInfo');
  var closeBtn = document.getElementById('wmLightboxClose');
  if (!overlay) return;

  // Click any image to open lightbox
  document.addEventListener('click', function(e) {
    var img = e.target.closest('img');
    if (!img || img.id === 'wmLightboxImg') return;
    if (overlay.classList.contains('active')) return;

    var src = img.src;
    var alt = img.alt || img.getAttribute('data-test-media-name') || '';
    var natW = img.naturalWidth;
    var natH = img.naturalHeight;

    lbImg.src = src;
    lbImg.alt = alt;
    lbInfo.textContent = alt + (natW ? ' (' + natW + ' x ' + natH + ')' : '');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === lbImg) return; // don't close when clicking the zoomed image
    closeLightbox();
  });

  // Close button
  closeBtn.addEventListener('click', closeLightbox);

  // Esc key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
})();
<\/script>
`;
    }
  });

  // src/islands/shortcut-handler.js
  function initShortcutHandlerIsland() {
    registerHandler("convertAndCopy", (msg) => handleConvertAndCopy(msg));
  }
  async function handleConvertAndCopy({ html, metadata, imageMap }) {
    try {
      let md = simplifyHtmlToMd(html);
      if (metadata && Object.keys(metadata).length > 0) {
        const fm = Object.entries(metadata).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n");
        md = `---
${fm}
---

${md}`;
      }
      await navigator.clipboard.writeText(md);
      showNotification("Copied as Markdown!");
      return { success: true };
    } catch (e) {
      showNotification("Copy failed: " + e.message, true);
      return { success: false, error: e.message };
    }
  }
  function simplifyHtmlToMd(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    let md = "";
    const walk = (node, depth = 0) => {
      if (node.nodeType === Node.TEXT_NODE) {
        md += node.textContent;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toLowerCase();
      const before = tagOpen(tag, node, depth);
      md += before;
      const childDepth = tag === "ul" || tag === "ol" ? depth + 1 : depth;
      for (const child of node.childNodes) {
        walk(child, childDepth);
      }
      md += tagClose(tag, node);
    };
    walk(doc.body);
    return md.trim();
  }
  function tagOpen(tag, node, depth) {
    const map = {
      h1: "\n# ",
      h2: "\n## ",
      h3: "\n### ",
      h4: "\n#### ",
      h5: "\n##### ",
      h6: "\n###### ",
      p: "\n\n",
      br: "\n",
      strong: "**",
      b: "**",
      em: "*",
      i: "*",
      li: "\n" + "  ".repeat(depth) + "- ",
      hr: "\n---\n",
      tr: "\n|",
      th: " ",
      td: " "
    };
    if (tag === "code") {
      return node.parentElement?.tagName.toLowerCase() === "pre" ? "\n```\n" : "`";
    }
    if (tag === "a") return "[";
    if (tag === "img") {
      const alt = node.getAttribute("alt") || "";
      const src = node.getAttribute("src") || "";
      return `![${alt}](${src})`;
    }
    return map[tag] || "";
  }
  function tagClose(tag, node) {
    const map = {
      h1: "\n",
      h2: "\n",
      h3: "\n",
      h4: "\n",
      h5: "\n",
      h6: "\n",
      strong: "**",
      b: "**",
      em: "*",
      i: "*",
      th: " |",
      td: " |"
    };
    if (tag === "code") {
      return node.parentElement?.tagName.toLowerCase() === "pre" ? "\n```\n" : "`";
    }
    if (tag === "a") {
      return `](${node.getAttribute("href") || ""})`;
    }
    return map[tag] || "";
  }
  var init_shortcut_handler = __esm({
    "src/islands/shortcut-handler.js"() {
      init_message_bus();
      init_notification();
    }
  });

  // src/islands/attachment-collector.js
  function initAttachmentCollectorIsland() {
    registerHandler("collectAttachments", () => Promise.resolve(collectAttachments()));
  }
  function collectAttachments() {
    const attachments = {
      images: [],
      files: [],
      pageTitle: sanitizeForFolder(document.title)
    };
    const contentEl = document.querySelector('[data-testid="page-content"]') || document.querySelector("#main-content") || document.querySelector('[data-testid="issue.views.field.rich-text.description"]') || document.querySelector("#description-val") || document.querySelector("main") || document.body;
    const imgs = contentEl.querySelectorAll("img");
    const seenUrls = /* @__PURE__ */ new Set();
    for (const img of imgs) {
      const url = getBestImageUrl(img);
      if (!url || url.startsWith("data:") || seenUrls.has(url)) continue;
      seenUrls.add(url);
      const alt = img.getAttribute("alt") || "";
      const mediaName = img.getAttribute("data-test-media-name") || "";
      const filename = mediaName || alt || extractFilename(url) || `image_${seenUrls.size}`;
      attachments.images.push({
        url: decodeHtmlEntities2(url),
        filename: sanitizeFilename(filename)
      });
    }
    const attachLinks = document.querySelectorAll(
      '[data-testid="attachment-panel"] a[href], .attachment-content a[href], .attachments a[download]'
    );
    for (const link of attachLinks) {
      const href = link.getAttribute("href");
      if (!href || seenUrls.has(href)) continue;
      seenUrls.add(href);
      const filename = link.getAttribute("download") || link.textContent.trim() || extractFilename(href);
      attachments.files.push({
        url: decodeHtmlEntities2(new URL(href, window.location.href).toString()),
        filename: sanitizeFilename(filename)
      });
    }
    const jiraAttachments = document.querySelectorAll(
      '[data-testid="issue.views.issue-base.foundation.attachment-panel"] a[href], .attachment-thumb a[href]'
    );
    for (const link of jiraAttachments) {
      const href = link.getAttribute("href");
      if (!href || seenUrls.has(href)) continue;
      seenUrls.add(href);
      const filename = link.getAttribute("download") || link.querySelector("img")?.getAttribute("alt") || link.textContent.trim() || extractFilename(href);
      attachments.files.push({
        url: decodeHtmlEntities2(new URL(href, window.location.href).toString()),
        filename: sanitizeFilename(filename)
      });
    }
    const inlineFileSelectors = [
      // Confluence Cloud: inline media cards
      '[data-testid="media-inline"] a[href]',
      '[data-testid="media-file-card-view"] a[href]',
      '[data-testid="inline-card-resolved-view"] a[href]',
      // Confluence Cloud: media single (non-image files)
      '[data-node-type="mediaSingle"] a[href]',
      '[data-node-type="mediaInline"] a[href]',
      // Confluence: embedded file wrapper
      ".confluence-embedded-file a[href]",
      "span.confluence-embedded-file-wrapper a[href]",
      // Smart links / block cards
      '[data-testid="block-card-resolved-view"] a[href]',
      '[data-testid="smart-block-title-resolved-view"]',
      // Generic: links to Atlassian media CDN files (non-image)
      'a[href*="media-cdn.atlassian.com/file/"]',
      'a[href*="/wiki/download/attachments/"]',
      'a[href*="/wiki/download/thumbnails/"]',
      // Jira: attachment links in description/comments
      "a.attachment-link[href]",
      "a[data-attachment-id][href]"
    ];
    const inlineFiles = contentEl.querySelectorAll(inlineFileSelectors.join(", "));
    for (const el of inlineFiles) {
      const href = el.getAttribute("href") || el.closest("a")?.getAttribute("href");
      if (!href || seenUrls.has(href)) continue;
      if (/\.(png|jpg|jpeg|gif|svg|webp)(\?|$)/i.test(href)) continue;
      seenUrls.add(href);
      const filename = el.getAttribute("download") || el.getAttribute("data-testid")?.includes("title") && el.textContent.trim() || el.textContent.trim() || el.closest("[data-filename]")?.getAttribute("data-filename") || extractFilename(href);
      if (filename) {
        attachments.files.push({
          url: decodeHtmlEntities2(new URL(href, window.location.href).toString()),
          filename: sanitizeFilename(filename)
        });
      }
    }
    const mediaNodes = contentEl.querySelectorAll("[data-fileid]");
    for (const node of mediaNodes) {
      if (node.tagName === "IMG") continue;
      const fileId = node.getAttribute("data-fileid");
      const collection = node.getAttribute("data-filecollection") || "";
      if (!fileId || seenUrls.has(fileId)) continue;
      seenUrls.add(fileId);
      const mediaName = node.getAttribute("data-test-media-name") || node.getAttribute("data-media-name") || node.closest("[data-media-name]")?.getAttribute("data-media-name") || node.textContent.trim() || fileId;
      const baseUrl = window.location.origin;
      const downloadUrl = `${baseUrl}/wiki/rest/api/mediafile/${fileId}/content`;
      attachments.files.push({
        url: downloadUrl,
        filename: sanitizeFilename(mediaName)
      });
    }
    const videos = contentEl.querySelectorAll("video");
    for (const video of videos) {
      const sources = video.querySelectorAll("source[src]");
      const srcList = sources.length > 0 ? [...sources].map((s) => s.getAttribute("src")) : [video.getAttribute("src")];
      for (const src of srcList) {
        if (!src || src.startsWith("data:") || seenUrls.has(src)) continue;
        seenUrls.add(src);
        const name = video.getAttribute("data-test-media-name") || video.getAttribute("data-media-name") || extractFilename(src) || `video_${seenUrls.size}`;
        attachments.files.push({
          url: decodeHtmlEntities2(upgradeMediaUrl(src)),
          filename: sanitizeFilename(name)
        });
      }
    }
    const videoCards = contentEl.querySelectorAll(
      '[data-testid="media-card-view"] video[src], [data-type="video"] [src], [data-testid*="video"] [src]'
    );
    for (const vc of videoCards) {
      const src = vc.getAttribute("src");
      if (!src || src.startsWith("data:") || seenUrls.has(src)) continue;
      seenUrls.add(src);
      const name = vc.closest("[data-media-name]")?.getAttribute("data-media-name") || vc.closest("[data-filename]")?.getAttribute("data-filename") || extractFilename(src) || "video";
      attachments.files.push({
        url: decodeHtmlEntities2(upgradeMediaUrl(src)),
        filename: sanitizeFilename(name)
      });
    }
    const mediaCdnLinks = contentEl.querySelectorAll('a[href*="media-cdn.atlassian.com"]');
    for (const link of mediaCdnLinks) {
      const href = link.getAttribute("href");
      if (!href || seenUrls.has(href)) continue;
      seenUrls.add(href);
      const name = link.textContent.trim() || extractFilename(href) || "file";
      attachments.files.push({
        url: decodeHtmlEntities2(href),
        filename: sanitizeFilename(name)
      });
    }
    return attachments;
  }
  function getBestImageUrl(img) {
    const srcset = img.getAttribute("srcset");
    if (srcset) {
      const entries = srcset.split(",").map((e) => {
        const parts = e.trim().split(/\s+/);
        return { url: parts[0], mult: parseFloat(parts[1]) || 1 };
      });
      entries.sort((a, b) => b.mult - a.mult);
      if (entries[0]?.url) {
        return upgradeMediaUrl(entries[0].url);
      }
    }
    const src = img.getAttribute("src");
    return src ? upgradeMediaUrl(src) : null;
  }
  function upgradeMediaUrl(url) {
    if (!url.includes("media-cdn.atlassian.com") && !url.includes("media.atlassian.com")) {
      return url;
    }
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("width", "4096");
      parsed.searchParams.set("height", "4096");
      parsed.searchParams.set("mode", "full-fit");
      return parsed.toString();
    } catch {
      return url;
    }
  }
  function extractFilename(url) {
    try {
      const pathname = new URL(url).pathname;
      const parts = pathname.split("/");
      return parts[parts.length - 1] || "";
    } catch {
      return "";
    }
  }
  function sanitizeFilename(name) {
    return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").replace(/\s+/g, "_").substring(0, 120) || "file";
  }
  function sanitizeForFolder(name) {
    return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").replace(/\s+/g, "_").substring(0, 80) || "export";
  }
  function decodeHtmlEntities2(str) {
    return str.replace(/&amp;/g, "&");
  }
  var init_attachment_collector = __esm({
    "src/islands/attachment-collector.js"() {
      init_message_bus();
    }
  });

  // src/islands/index.js
  var require_index = __commonJS({
    "src/islands/index.js"() {
      init_message_bus();
      init_extractor();
      init_inserter();
      init_html_exporter();
      init_shortcut_handler();
      init_attachment_collector();
      initMessageBus();
      initExtractorIsland();
      initInserterIsland();
      initHtmlExporterIsland();
      initShortcutHandlerIsland();
      initAttachmentCollectorIsland();
    }
  });
  require_index();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2lzbGFuZHMvbWVzc2FnZS1idXMuanMiLCAiLi4vc3JjL2lzbGFuZHMvZXh0cmFjdG9yLmpzIiwgIi4uL3NyYy9pc2xhbmRzL25vdGlmaWNhdGlvbi5qcyIsICIuLi9zcmMvaXNsYW5kcy9pbnNlcnRlci5qcyIsICIuLi9zcmMvaXNsYW5kcy9odG1sLWV4cG9ydGVyLmpzIiwgIi4uL3NyYy9pc2xhbmRzL3Nob3J0Y3V0LWhhbmRsZXIuanMiLCAiLi4vc3JjL2lzbGFuZHMvYXR0YWNobWVudC1jb2xsZWN0b3IuanMiLCAiLi4vc3JjL2lzbGFuZHMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogTWVzc2FnZSBCdXNcbiAqIERlY291cGxlZCBldmVudC1kcml2ZW4gY29tbXVuaWNhdGlvbiBsYXllciBmb3IgaXNsYW5kcy5cbiAqIEVhY2ggaXNsYW5kIHJlZ2lzdGVycyBoYW5kbGVyczsgdGhlIGJ1cyByb3V0ZXMgaW5jb21pbmcgZXh0ZW5zaW9uIG1lc3NhZ2VzLlxuICpcbiAqIEZvbGxvd3MgTWVkaWF0b3IgUGF0dGVybiBcdTIwMTQgaXNsYW5kcyBkb24ndCBrbm93IGFib3V0IGVhY2ggb3RoZXIsXG4gKiB0aGV5IG9ubHkgaW50ZXJhY3QgdGhyb3VnaCB0aGUgYnVzLlxuICovXG5cbi8qKiBAdHlwZSB7TWFwPHN0cmluZywgKG1lc3NhZ2U6IGFueSkgPT4gUHJvbWlzZTxhbnk+Pn0gKi9cbmNvbnN0IGhhbmRsZXJzID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbWVzc2FnZSBoYW5kbGVyIGZvciBhIHNwZWNpZmljIG1lc3NhZ2UgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlVHlwZVxuICogQHBhcmFtIHsobWVzc2FnZTogYW55KSA9PiBQcm9taXNlPGFueT59IGhhbmRsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcihtZXNzYWdlVHlwZSwgaGFuZGxlcikge1xuICBpZiAoaGFuZGxlcnMuaGFzKG1lc3NhZ2VUeXBlKSkge1xuICAgIGNvbnNvbGUud2FybihgW01lc3NhZ2VCdXNdIE92ZXJ3cml0aW5nIGhhbmRsZXIgZm9yIFwiJHttZXNzYWdlVHlwZX1cImApO1xuICB9XG4gIGhhbmRsZXJzLnNldChtZXNzYWdlVHlwZSwgaGFuZGxlcik7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgbWVzc2FnZSBidXMgXHUyMDE0IGNvbm5lY3RzIHRvIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuXG4gKiBNdXN0IGJlIGNhbGxlZCBvbmNlIGR1cmluZyBjb250ZW50IHNjcmlwdCBpbml0aWFsaXphdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXNzYWdlQnVzKCkge1xuICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBfc2VuZGVyKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChtZXNzYWdlLnR5cGUpO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBOb3QgaGFuZGxlZFxuICB9KTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHQuXG4gKiBAcGFyYW0ge09iamVjdH0gbWVzc2FnZVxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbmRUb0JhY2tncm91bmQobWVzc2FnZSkge1xuICByZXR1cm4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xufVxuIiwgIi8qKlxuICogRXh0cmFjdG9yIElzbGFuZFxuICogUmVzcG9uc2libGUgZm9yIGV4dHJhY3RpbmcgY29udGVudCBhbmQgbWV0YWRhdGEgZnJvbSBKaXJhL0NvbmZsdWVuY2UgcGFnZXMuXG4gKiBTZWxmLWNvbnRhaW5lZCBtb2R1bGUgXHUyMDE0IG1hbmFnZXMgaXRzIG93biBsaWZlY3ljbGUgYW5kIHN0YXRlLlxuICpcbiAqIEhhbmRsZXM6IGdldFBhZ2VJbmZvLCBleHRyYWN0UGFnZUNvbnRlbnRcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJIYW5kbGVyIH0gZnJvbSAnLi9tZXNzYWdlLWJ1cy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RXh0cmFjdG9ySXNsYW5kKCkge1xuICByZWdpc3RlckhhbmRsZXIoJ2dldFBhZ2VJbmZvJywgKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGdldFBhZ2VJbmZvKCkpKTtcbiAgcmVnaXN0ZXJIYW5kbGVyKCdleHRyYWN0UGFnZUNvbnRlbnQnLCAobXNnKSA9PiBQcm9taXNlLnJlc29sdmUoZXh0cmFjdENvbnRlbnQobXNnLm9wdGlvbnMpKSk7XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQYWdlIERldGVjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuZnVuY3Rpb24gZ2V0UGFnZUluZm8oKSB7XG4gIHJldHVybiB7XG4gICAgaXNDb25mbHVlbmNlOiBkZXRlY3RDb25mbHVlbmNlKCksXG4gICAgaXNKaXJhOiBkZXRlY3RKaXJhKCksXG4gICAgaXNFZGl0aW5nOiBkZXRlY3RFZGl0b3IoKSxcbiAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Q29uZmx1ZW5jZSgpIHtcbiAgcmV0dXJuICEhKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNvbnRlbnQnKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScpIHx8XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLWRlZmF1bHQnKVxuICApO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RKaXJhKCkge1xuICByZXR1cm4gISEoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ppcmEnKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmlzc3VlLWJhc2UuZm91bmRhdGlvbi5zdW1tYXJ5LmhlYWRpbmdcIl0nKSB8fFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmNsdWRlcygnYXRsYXNzaWFuLm5ldCcpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGRldGVjdEVkaXRvcigpIHtcbiAgcmV0dXJuICEhKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuUHJvc2VNaXJyb3InKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55bWNlJylcbiAgKTtcbn1cblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIENvbnRlbnQgRXh0cmFjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuZnVuY3Rpb24gZXh0cmFjdENvbnRlbnQob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgaW5jbHVkZUltYWdlcyA9IHRydWUsIGluY2x1ZGVNZXRhZGF0YSA9IHRydWUsIHNlbGVjdGVkT25seSA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gIGxldCBodG1sID0gJyc7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAoc2VsZWN0ZWRPbmx5ICYmIHNlbGVjdGlvbiAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2UuY2xvbmVDb250ZW50cygpKTtcbiAgICBodG1sID0gY29udGFpbmVyLmlubmVySFRNTDtcbiAgfSBlbHNlIHtcbiAgICBodG1sID0gZXh0cmFjdEZ1bGxDb250ZW50KCk7XG4gIH1cblxuICBjb25zdCBtZXRhZGF0YSA9IGluY2x1ZGVNZXRhZGF0YSA/IGV4dHJhY3RNZXRhZGF0YSgpIDoge307XG4gIGNvbnN0IGltYWdlVXJscyA9IGluY2x1ZGVJbWFnZXMgPyBjb2xsZWN0SW1hZ2VVcmxzKGh0bWwpIDogW107XG5cbiAgcmV0dXJuIHsgaHRtbCwgbWV0YWRhdGEsIGltYWdlVXJscyB9O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0RnVsbENvbnRlbnQoKSB7XG4gIC8vIENvbmZsdWVuY2UgQ2xvdWRcbiAgY29uc3QgY29uZmx1ZW5jZSA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwicGFnZS1jb250ZW50XCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jb250ZW50JykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lraS1jb250ZW50Jyk7XG4gIGlmIChjb25mbHVlbmNlKSByZXR1cm4gY29uZmx1ZW5jZS5pbm5lckhUTUw7XG5cbiAgLy8gSmlyYSBkZXNjcmlwdGlvblxuICBjb25zdCBqaXJhRGVzYyA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuZmllbGQucmljaC10ZXh0LmRlc2NyaXB0aW9uXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24tdmFsJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1jb250ZW50LWJsb2NrJyk7XG4gIGlmIChqaXJhRGVzYykge1xuICAgIGNvbnN0IHN1bW1hcnkgPVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuaXNzdWUtYmFzZS5mb3VuZGF0aW9uLnN1bW1hcnkuaGVhZGluZ1wiXScpIHx8XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VtbWFyeS12YWwnKTtcbiAgICBjb25zdCB0aXRsZUh0bWwgPSBzdW1tYXJ5ID8gYDxoMT4ke2VzY2FwZUh0bWwoc3VtbWFyeS50ZXh0Q29udGVudCl9PC9oMT5gIDogJyc7XG4gICAgcmV0dXJuIHRpdGxlSHRtbCArIGppcmFEZXNjLmlubmVySFRNTDtcbiAgfVxuXG4gIC8vIEppcmEgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdbZGF0YS10ZXN0aWQ9XCJpc3N1ZS5hY3Rpdml0eS5jb21tZW50cy1saXN0XCJdIC51c2VyLWNvbnRlbnQtYmxvY2ssIC5hY3Rpdml0eS1jb21tZW50IC5hY3Rpb24tYm9keSdcbiAgKTtcbiAgaWYgKGNvbW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gWy4uLmNvbW1lbnRzXS5tYXAoKGMpID0+IGMuaW5uZXJIVE1MKS5qb2luKCdcXG48aHI+XFxuJyk7XG4gIH1cblxuICAvLyBGYWxsYmFja1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwibWFpblwiXScpO1xuICByZXR1cm4gbWFpbiA/IG1haW4uaW5uZXJIVE1MIDogJyc7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RNZXRhZGF0YSgpIHtcbiAgY29uc3QgbWV0YSA9IHtcbiAgICB0aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICBleHBvcnRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgIHNwYWNlS2V5OiAnbWV0YVtuYW1lPVwiYWpzLXNwYWNlLWtleVwiXScsXG4gICAgcGFnZUlkOiAnbWV0YVtuYW1lPVwiYWpzLXBhZ2UtaWRcIl0nLFxuICB9O1xuXG4gIGZvciAoY29uc3QgW2tleSwgc2VsXSBvZiBPYmplY3QuZW50cmllcyhzZWxlY3RvcnMpKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XG4gICAgaWYgKGVsKSBtZXRhW2tleV0gPSBlbC5jb250ZW50O1xuICB9XG5cbiAgY29uc3QgYXV0aG9yID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1tZXRhZGF0YS1tb2RpZmljYXRpb24taW5mbyAuYXV0aG9yJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXN0aWQ9XCJwYWdlLW1ldGFkYXRhLWJhbm5lci0tbGFzdC1tb2RpZmllZC1ieVwiXScpO1xuICBpZiAoYXV0aG9yKSBtZXRhLmF1dGhvciA9IGF1dGhvci50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgY29uc3QgbGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhYmVsLWxpc3QgLmxhYmVsLCBbZGF0YS10ZXN0aWQ9XCJsYWJlbFwiXScpO1xuICBpZiAobGFiZWxzLmxlbmd0aCA+IDApIG1ldGEubGFiZWxzID0gWy4uLmxhYmVsc10ubWFwKChsKSA9PiBsLnRleHRDb250ZW50LnRyaW0oKSk7XG5cbiAgY29uc3QgaXNzdWVLZXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICdbZGF0YS10ZXN0aWQ9XCJpc3N1ZS52aWV3cy5pc3N1ZS1iYXNlLmZvdW5kYXRpb24uYnJlYWRjcnVtYnMuY3VycmVudC1pc3N1ZS5pdGVtXCJdLCAja2V5LXZhbCdcbiAgKTtcbiAgaWYgKGlzc3VlS2V5KSBtZXRhLmlzc3VlS2V5ID0gaXNzdWVLZXkudGV4dENvbnRlbnQudHJpbSgpO1xuXG4gIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmlzc3VlLWJhc2UuZm91bmRhdGlvbi5zdGF0dXMuc3RhdHVzLWZpZWxkLXdyYXBwZXJcIl0nXG4gICk7XG4gIGlmIChzdGF0dXMpIG1ldGEuc3RhdHVzID0gc3RhdHVzLnRleHRDb250ZW50LnRyaW0oKTtcblxuICByZXR1cm4gbWV0YTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEltYWdlVXJscyhodG1sKSB7XG4gIGlmICghaHRtbCkgcmV0dXJuIFtdO1xuICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpO1xuICBjb25zdCB1cmxzID0gbmV3IFNldCgpO1xuXG4gIC8vIDEuIFN0YW5kYXJkIDxpbWc+IHRhZ3NcbiAgZm9yIChjb25zdCBpbWcgb2YgZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKSB7XG4gICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKHNyYyAmJiAhc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIHVybHMuYWRkKHNyYyk7XG4gICAgfVxuICAgIC8vIEFsc28gY2hlY2sgZGF0YS1zcmMgKGxhenktbG9hZGVkIGltYWdlcylcbiAgICBjb25zdCBkYXRhU3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICBpZiAoZGF0YVNyYyAmJiAhZGF0YVNyYy5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICB1cmxzLmFkZChkYXRhU3JjKTtcbiAgICB9XG4gIH1cblxuICAvLyAyLiBDb25mbHVlbmNlIG1lZGlhU2luZ2xlIGltYWdlIG5vZGVzIHRoYXQgbWF5IHVzZSBiYWNrZ3JvdW5kLWltYWdlIG9yXG4gIC8vICAgIGhhdmUgc3JjIG9uIG5vbi1pbWcgZWxlbWVudHMgKGUuZy4gPGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6dXJsKC4uLilcIj4pXG4gIGZvciAoY29uc3QgbWVkaWEgb2YgZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5vZGUtdHlwZT1cIm1lZGlhU2luZ2xlXCJdLCBbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVwiXScpKSB7XG4gICAgLy8gQ2hlY2sgZm9yIGltZyBpbnNpZGUgKG1heSBhbHJlYWR5IGJlIGNvbGxlY3RlZCBhYm92ZSlcbiAgICBjb25zdCBpbWcgPSBtZWRpYS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICBpZiAoaW1nKSB7XG4gICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuICAgICAgaWYgKHNyYyAmJiAhc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykgJiYgIXVybHMuaGFzKHNyYykpIHtcbiAgICAgICAgdXJscy5hZGQoc3JjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2hlY2sgZm9yIGVsZW1lbnRzIHdpdGggc3JjIGF0dHJpYnV0ZSB0aGF0IGFyZW4ndCBpbWcvdmlkZW9cbiAgICBmb3IgKGNvbnN0IGVsIG9mIG1lZGlhLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tzcmNdJykpIHtcbiAgICAgIGlmIChlbC50YWdOYW1lID09PSAnVklERU8nIHx8IGVsLnRhZ05hbWUgPT09ICdTT1VSQ0UnKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHNyYyA9IGVsLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICBpZiAoc3JjICYmICFzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSAmJiAhdXJscy5oYXMoc3JjKSkge1xuICAgICAgICB1cmxzLmFkZChzcmMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbLi4udXJsc107XG59XG5cbi8qKlxuICogUmVxdWVzdCBtYXggcmVzb2x1dGlvbiBmcm9tIEF0bGFzc2lhbiBtZWRpYSBDRE4gYnkgYWRqdXN0aW5nIFVSTCBwYXJhbXMuXG4gKi9cbmZ1bmN0aW9uIHVwZ3JhZGVBdGxhc3NpYW5NZWRpYVVybCh1cmwpIHtcbiAgaWYgKCF1cmwuaW5jbHVkZXMoJ21lZGlhLWNkbi5hdGxhc3NpYW4uY29tJykgJiYgIXVybC5pbmNsdWRlcygnbWVkaWEuYXRsYXNzaWFuLmNvbScpKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZCA9IG5ldyBVUkwodXJsKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnd2lkdGgnLCAnNDA5NicpO1xuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCdoZWlnaHQnLCAnNDA5NicpO1xuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCdtb2RlJywgJ2Z1bGwtZml0Jyk7XG4gICAgcmV0dXJuIHBhcnNlZC50b1N0cmluZygpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xufVxuIiwgIi8qKlxuICogTm90aWZpY2F0aW9uIElzbGFuZCAoc2hhcmVkIHV0aWxpdHkpXG4gKiBWaXN1YWwgdG9hc3Qgbm90aWZpY2F0aW9ucyBmb3Iga2V5Ym9hcmQgc2hvcnRjdXQgLyBjb250ZXh0IG1lbnUgYWN0aW9ucy5cbiAqL1xuXG5jb25zdCBOT1RJRklDQVRJT05fSUQgPSAnd2lraS1tZC1ub3RpZmljYXRpb24nO1xuY29uc3QgRElTUExBWV9NUyA9IDIwMDA7XG5jb25zdCBGQURFX01TID0gMzAwO1xuXG4vKipcbiAqIFNob3cgYSB0b2FzdCBub3RpZmljYXRpb24gb24gdGhlIGN1cnJlbnQgcGFnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Vycm9yPWZhbHNlXVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd05vdGlmaWNhdGlvbih0ZXh0LCBpc0Vycm9yID0gZmFsc2UpIHtcbiAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChOT1RJRklDQVRJT05fSUQpO1xuICBpZiAoZXhpc3RpbmcpIGV4aXN0aW5nLnJlbW92ZSgpO1xuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVsLmlkID0gTk9USUZJQ0FUSU9OX0lEO1xuICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwge1xuICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgIHRvcDogJzE2cHgnLFxuICAgIHJpZ2h0OiAnMTZweCcsXG4gICAgcGFkZGluZzogJzEwcHggMThweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICBmb250U2l6ZTogJzEzcHgnLFxuICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgIHpJbmRleDogJzk5OTk5OScsXG4gICAgYmFja2dyb3VuZDogaXNFcnJvciA/ICcjZGUzNTBiJyA6ICcjMDA4NzVhJyxcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4yKScsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4zcycsXG4gICAgZm9udEZhbWlseTogJy1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZicsXG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2V0VGltZW91dCgoKSA9PiBlbC5yZW1vdmUoKSwgRkFERV9NUyk7XG4gIH0sIERJU1BMQVlfTVMpO1xufVxuIiwgIi8qKlxuICogSW5zZXJ0ZXIgSXNsYW5kXG4gKiBSZXNwb25zaWJsZSBmb3IgaW5zZXJ0aW5nIGNvbnRlbnQgaW50byBKaXJhL0NvbmZsdWVuY2UgZWRpdG9ycy5cbiAqIERldGVjdHMgZWRpdG9yIHR5cGUgYW5kIHVzZXMgYXBwcm9wcmlhdGUgaW5zZXJ0aW9uIHN0cmF0ZWd5LlxuICpcbiAqIEhhbmRsZXM6IGluc2VydE1hcmtkb3duVG9KaXJhLCBpbnNlcnRGcm9tQ2xpcGJvYXJkXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVySGFuZGxlciB9IGZyb20gJy4vbWVzc2FnZS1idXMuanMnO1xuaW1wb3J0IHsgc2hvd05vdGlmaWNhdGlvbiB9IGZyb20gJy4vbm90aWZpY2F0aW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJbnNlcnRlcklzbGFuZCgpIHtcbiAgcmVnaXN0ZXJIYW5kbGVyKCdpbnNlcnRNYXJrZG93blRvSmlyYScsIChtc2cpID0+XG4gICAgUHJvbWlzZS5yZXNvbHZlKGluc2VydFRvRWRpdG9yKG1zZy5qaXJhTWFya3VwLCBtc2cuaHRtbCkpXG4gICk7XG4gIHJlZ2lzdGVySGFuZGxlcignaW5zZXJ0RnJvbUNsaXBib2FyZCcsICgpID0+IGhhbmRsZUluc2VydEZyb21DbGlwYm9hcmQoKSk7XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBFZGl0b3IgRGV0ZWN0aW9uICYgSW5zZXJ0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIEluc2VydCBjb250ZW50IGludG8gdGhlIGFjdGl2ZSBlZGl0b3IuXG4gKiBVc2VzIHN0cmF0ZWd5IHNlbGVjdGlvbiBiYXNlZCBvbiBkZXRlY3RlZCBlZGl0b3IgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0VG9FZGl0b3IoamlyYU1hcmt1cCwgaHRtbCkge1xuICAvLyBTdHJhdGVneSAxOiBQcm9zZU1pcnJvciAoSmlyYSBDbG91ZCAvIENvbmZsdWVuY2UgQ2xvdWQgbmV3IGVkaXRvcilcbiAgY29uc3QgcHJvc2VNaXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuUHJvc2VNaXJyb3JbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xuICBpZiAocHJvc2VNaXJyb3IpIHtcbiAgICByZXR1cm4gaW5zZXJ0VmlhUHJvc2VNaXJyb3IocHJvc2VNaXJyb3IsIGh0bWwsIGppcmFNYXJrdXApO1xuICB9XG5cbiAgLy8gU3RyYXRlZ3kgMjogVGlueU1DRSAoQ29uZmx1ZW5jZSBsZWdhY3kgZWRpdG9yKVxuICBjb25zdCB0aW55bWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbnltY2UsIC5tY2UtY29udGVudC1ib2R5Jyk7XG4gIGlmICh0aW55bWNlKSB7XG4gICAgcmV0dXJuIGluc2VydFZpYVRpbnlNQ0UoaHRtbCk7XG4gIH1cblxuICAvLyBTdHJhdGVneSAzOiBQbGFpbiB0ZXh0YXJlYSAoZmFsbGJhY2spXG4gIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAndGV4dGFyZWFbbmFtZT1cImRlc2NyaXB0aW9uXCJdLCB0ZXh0YXJlYVtuYW1lPVwiY29tbWVudFwiXSwgdGV4dGFyZWEud2lraS1lZGl0J1xuICApO1xuICBpZiAodGV4dGFyZWEpIHtcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IGppcmFNYXJrdXA7XG4gICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB0ZXh0YXJlYS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXRob2Q6ICd0ZXh0YXJlYScgfTtcbiAgfVxuXG4gIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIGVkaXRhYmxlIGZpZWxkIGZvdW5kLiBQbGVhc2Ugb3BlbiBhbiBlZGl0b3IgZmlyc3QuJyB9O1xufVxuXG5mdW5jdGlvbiBpbnNlcnRWaWFQcm9zZU1pcnJvcihlZGl0b3IsIGh0bWwsIGppcmFNYXJrdXApIHtcbiAgdHJ5IHtcbiAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlZGl0b3IpO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuXG4gICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IG5ldyBEYXRhVHJhbnNmZXIoKTtcbiAgICBjbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvaHRtbCcsIGh0bWwpO1xuICAgIGNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGppcmFNYXJrdXApO1xuXG4gICAgY29uc3QgcGFzdGVFdmVudCA9IG5ldyBDbGlwYm9hcmRFdmVudCgncGFzdGUnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgIGNsaXBib2FyZERhdGEsXG4gICAgfSk7XG5cbiAgICBlZGl0b3IuZGlzcGF0Y2hFdmVudChwYXN0ZUV2ZW50KTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXRob2Q6ICdwcm9zZW1pcnJvci1wYXN0ZScgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0VmlhVGlueU1DRShodG1sKSB7XG4gIHRyeSB7XG4gICAgaWYgKHdpbmRvdy50aW55bWNlICYmIHdpbmRvdy50aW55bWNlLmFjdGl2ZUVkaXRvcikge1xuICAgICAgd2luZG93LnRpbnltY2UuYWN0aXZlRWRpdG9yLnNldENvbnRlbnQoaHRtbCk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXRob2Q6ICd0aW55bWNlJyB9O1xuICAgIH1cbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdUaW55TUNFIG5vdCBhY2Nlc3NpYmxlJyB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlLm1lc3NhZ2UgfTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVJbnNlcnRGcm9tQ2xpcGJvYXJkKCkge1xuICB0cnkge1xuICAgIGNvbnN0IG1kID0gYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpO1xuICAgIGlmICghbWQgfHwgIW1kLnRyaW0oKSkge1xuICAgICAgc2hvd05vdGlmaWNhdGlvbignQ2xpcGJvYXJkIGlzIGVtcHR5JywgdHJ1ZSk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSB9O1xuICAgIH1cbiAgICBjb25zdCBlc2NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlc2NEaXYudGV4dENvbnRlbnQgPSBtZDtcbiAgICBjb25zdCByZXN1bHQgPSBpbnNlcnRUb0VkaXRvcihtZCwgYDxwcmU+JHtlc2NEaXYuaW5uZXJIVE1MfTwvcHJlPmApO1xuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykgc2hvd05vdGlmaWNhdGlvbignSW5zZXJ0ZWQgZnJvbSBjbGlwYm9hcmQhJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNob3dOb3RpZmljYXRpb24oJ0luc2VydCBmYWlsZWQ6ICcgKyBlLm1lc3NhZ2UsIHRydWUpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cbiIsICIvKipcbiAqIEhUTUwgRXhwb3J0ZXIgSXNsYW5kXG4gKiBSZXNwb25zaWJsZSBmb3IgZXhwb3J0aW5nIHRoZSBjdXJyZW50IHBhZ2UgYXMgYSBzZWxmLWNvbnRhaW5lZCBIVE1MIGZpbGUuXG4gKiBJbmxpbmVzIENTUyBzdHlsZXNoZWV0cyBhbmQgaW1hZ2VzICh2aWEgYmFja2dyb3VuZCBzY3JpcHQpLlxuICpcbiAqIEhhbmRsZXM6IGV4cG9ydFNpbmdsZUh0bWxcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJIYW5kbGVyLCBzZW5kVG9CYWNrZ3JvdW5kIH0gZnJvbSAnLi9tZXNzYWdlLWJ1cy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0SHRtbEV4cG9ydGVySXNsYW5kKCkge1xuICByZWdpc3RlckhhbmRsZXIoJ2V4cG9ydFNpbmdsZUh0bWwnLCAobXNnKSA9PiBleHBvcnRTaW5nbGVIdG1sKG1zZy5vcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4cG9ydFNpbmdsZUh0bWwob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgaW5saW5lSW1hZ2VzID0gdHJ1ZSB9ID0gb3B0aW9ucztcblxuICB0cnkge1xuICAgIC8vIDEuIElkZW50aWZ5IGFuZCBjbG9uZSB0YXJnZXQgY29udGVudFxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGZpbmRDb250ZW50RWxlbWVudCgpO1xuICAgIGNvbnN0IGNsb25lID0gY29udGVudEVsLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIC8vIDIuIENvbGxlY3QgYW5kIGlubGluZSBzdHlsZXNoZWV0c1xuICAgIGNvbnN0IGlubGluZWRTdHlsZXMgPSBhd2FpdCBjb2xsZWN0U3R5bGVzKCk7XG5cbiAgICAvLyAzLiBDb2xsZWN0IGFuZCBpbmxpbmUgaW1hZ2VzXG4gICAgbGV0IGltYWdlQ291bnQgPSAwO1xuICAgIGlmIChpbmxpbmVJbWFnZXMpIHtcbiAgICAgIGltYWdlQ291bnQgPSBhd2FpdCBpbmxpbmVJbWFnZXNJbkNsb25lKGNsb25lKTtcbiAgICB9XG5cbiAgICAvLyA0LiBSZXBsYWNlIHZpZGVvcyB3aXRoIEhUTUw1IDx2aWRlbz4gdGFncyBwb2ludGluZyB0byBsb2NhbCByZWxhdGl2ZSBwYXRoc1xuICAgIGNvbnN0IGxvY2FsTWVkaWEgPSByZXBsYWNlVmlkZW9zV2l0aExvY2FsKGNsb25lKTtcblxuICAgIC8vIDUuIFJlcGxhY2Ugbm9uLXByZXZpZXdhYmxlIGZpbGUgbGlua3Mgd2l0aCBsb2NhbCByZWxhdGl2ZSBwYXRoc1xuICAgIHJlcGxhY2VGaWxlTGlua3NXaXRoTG9jYWwoY2xvbmUsIGxvY2FsTWVkaWEpO1xuXG4gICAgLy8gNi4gU3RyaXAgc2NyaXB0cyBmb3Igc2VjdXJpdHlcbiAgICBmb3IgKGNvbnN0IHNjcmlwdCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKSkge1xuICAgICAgc2NyaXB0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIDcuIEFzc2VtYmxlIHNlbGYtY29udGFpbmVkIEhUTUxcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnRpdGxlO1xuICAgIGNvbnN0IGVzY1RpdGxlID0gZXNjYXBlSHRtbCh0aXRsZSk7XG4gICAgY29uc3QgZXNjVXJsID0gZXNjYXBlSHRtbCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICBjb25zdCBodG1sQ29udGVudCA9IFtcbiAgICAgICc8IURPQ1RZUEUgaHRtbD4nLFxuICAgICAgYDxodG1sIGxhbmc9XCIke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdlbid9XCI+YCxcbiAgICAgICc8aGVhZD4nLFxuICAgICAgJyAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+JyxcbiAgICAgICcgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+JyxcbiAgICAgIGAgIDx0aXRsZT4ke2VzY1RpdGxlfTwvdGl0bGU+YCxcbiAgICAgICcgIDxtZXRhIG5hbWU9XCJnZW5lcmF0b3JcIiBjb250ZW50PVwiV2lraVx1MjE5NE1hcmtkb3duIEV4dGVuc2lvblwiPicsXG4gICAgICBgICA8bWV0YSBuYW1lPVwic291cmNlLXVybFwiIGNvbnRlbnQ9XCIke2VzY1VybH1cIj5gLFxuICAgICAgYCAgPG1ldGEgbmFtZT1cImV4cG9ydC1kYXRlXCIgY29udGVudD1cIiR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfVwiPmAsXG4gICAgICAnICA8c3R5bGU+JyxcbiAgICAgIGlubGluZWRTdHlsZXMsXG4gICAgICBMSUdIVEJPWF9TVFlMRVMsXG4gICAgICAnICA8L3N0eWxlPicsXG4gICAgICAnPC9oZWFkPicsXG4gICAgICAnPGJvZHk+JyxcbiAgICAgIGAgICR7Y2xvbmUub3V0ZXJIVE1MfWAsXG4gICAgICBMSUdIVEJPWF9IVE1MLFxuICAgICAgTElHSFRCT1hfU0NSSVBULFxuICAgICAgJzwvYm9keT4nLFxuICAgICAgJzwvaHRtbD4nLFxuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGh0bWw6IGh0bWxDb250ZW50LFxuICAgICAgdGl0bGUsXG4gICAgICBpbWFnZUNvdW50LFxuICAgICAgc2l6ZTogaHRtbENvbnRlbnQubGVuZ3RoLFxuICAgICAgbG9jYWxNZWRpYSwgLy8gZmlsZXMgdGhhdCBuZWVkIHRvIGJlIGRvd25sb2FkZWQgYWxvbmdzaWRlIHRoZSBIVE1MXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZENvbnRlbnRFbGVtZW50KCkge1xuICBjb25zdCBzZWxlY3RvcnMgPSBbXG4gICAgJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScsXG4gICAgJyNtYWluLWNvbnRlbnQnLFxuICAgICcud2lraS1jb250ZW50JyxcbiAgICAnW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuZmllbGQucmljaC10ZXh0LmRlc2NyaXB0aW9uXCJdJyxcbiAgICAnI2Rlc2NyaXB0aW9uLXZhbCcsXG4gICAgJ21haW4nLFxuICAgICdib2R5JyxcbiAgXTtcbiAgZm9yIChjb25zdCBzZWwgb2Ygc2VsZWN0b3JzKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XG4gICAgaWYgKGVsKSByZXR1cm4gZWw7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3RTdHlsZXMoKSB7XG4gIGNvbnN0IHN0eWxlQ2h1bmtzID0gW107XG4gIGZvciAoY29uc3Qgc2hlZXQgb2YgZG9jdW1lbnQuc3R5bGVTaGVldHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcnVsZXMgPSBbLi4uc2hlZXQuY3NzUnVsZXNdLm1hcCgocikgPT4gci5jc3NUZXh0KS5qb2luKCdcXG4nKTtcbiAgICAgIHN0eWxlQ2h1bmtzLnB1c2gocnVsZXMpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgaWYgKHNoZWV0LmhyZWYpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goc2hlZXQuaHJlZik7XG4gICAgICAgICAgaWYgKHJlc3Aub2spIHN0eWxlQ2h1bmtzLnB1c2goYXdhaXQgcmVzcC50ZXh0KCkpO1xuICAgICAgICB9IGNhdGNoIHsgLyogdW5yZWFjaGFibGUgc3R5bGVzaGVldCAqLyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZUNodW5rcy5qb2luKCdcXG5cXG4nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5saW5lSW1hZ2VzSW5DbG9uZShjbG9uZSkge1xuICBjb25zdCBpbWdzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG5cbiAgLy8gQ29sbGVjdCBhbGwgdW5pcXVlIFVSTHM6IHByZWZlciBoaWdoZXN0IHJlc29sdXRpb24gZnJvbSBzcmNzZXQsIGZhbGxiYWNrIHRvIHNyY1xuICBjb25zdCB1cmxTZXQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IGltZ1VybE1hcCA9IG5ldyBNYXAoKTsgLy8gaW1nIGVsZW1lbnQgXHUyMTkyIGJlc3QgVVJMIHRvIGZldGNoXG5cbiAgZm9yIChjb25zdCBpbWcgb2YgaW1ncykge1xuICAgIGxldCBiZXN0VXJsID0gZ2V0SGlnaGVzdFJlc1NyYyhpbWcpO1xuICAgIC8vIEZhbGxiYWNrIHRvIGRhdGEtc3JjIGZvciBsYXp5LWxvYWRlZCBpbWFnZXNcbiAgICBpZiAoKCFiZXN0VXJsIHx8IGJlc3RVcmwuc3RhcnRzV2l0aCgnZGF0YTonKSkgJiYgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSkge1xuICAgICAgYmVzdFVybCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG4gICAgfVxuICAgIGlmIChiZXN0VXJsICYmICFiZXN0VXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIHVybFNldC5hZGQoYmVzdFVybCk7XG4gICAgICBpbWdVcmxNYXAuc2V0KGltZywgYmVzdFVybCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXJscyA9IFsuLi51cmxTZXRdO1xuICBpZiAodXJscy5sZW5ndGggPT09IDApIHJldHVybiAwO1xuXG4gIGNvbnN0IGltYWdlTWFwID0gYXdhaXQgc2VuZFRvQmFja2dyb3VuZCh7XG4gICAgdHlwZTogJ2ZldGNoSW1hZ2VzQXNCYXNlNjQnLFxuICAgIHVybHMsXG4gIH0pO1xuXG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICBjb25zdCBiZXN0VXJsID0gaW1nVXJsTWFwLmdldChpbWcpO1xuICAgIGlmIChiZXN0VXJsICYmIGltYWdlTWFwW2Jlc3RVcmxdICYmIGltYWdlTWFwW2Jlc3RVcmxdLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlTWFwW2Jlc3RVcmxdKTtcbiAgICAgIC8vIFJlbW92ZSBzcmNzZXQgdG8gcHJldmVudCBicm93c2VyIGZyb20gdXNpbmcgZXh0ZXJuYWwgVVJMc1xuICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSBoaWdoZXN0IHJlc29sdXRpb24gaW1hZ2UgVVJMIGZyb20gYW4gPGltZz4gZWxlbWVudC5cbiAqIFN0cmF0ZWd5OlxuICogMS4gUGljayBoaWdoZXN0IG11bHRpcGxpZXIgZnJvbSBzcmNzZXQgKDJ4ID4gMXgpXG4gKiAyLiBGb3IgQXRsYXNzaWFuIG1lZGlhIENETiBVUkxzLCByZXF1ZXN0IG1heCByZXNvbHV0aW9uIGJ5XG4gKiAgICByZW1vdmluZyB3aWR0aC9oZWlnaHQgY29uc3RyYWludHNcbiAqL1xuZnVuY3Rpb24gZ2V0SGlnaGVzdFJlc1NyYyhpbWcpIHtcbiAgbGV0IGJlc3RVcmwgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblxuICAvLyBDaGVjayBzcmNzZXQgZm9yIGhpZ2hlciByZXNvbHV0aW9uIHZhcmlhbnRzXG4gIGNvbnN0IHNyY3NldCA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpO1xuICBpZiAoc3Jjc2V0KSB7XG4gICAgY29uc3QgZW50cmllcyA9IHNyY3NldC5zcGxpdCgnLCcpLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnRzID0gZW50cnkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICByZXR1cm4geyB1cmw6IHBhcnRzWzBdLCBtdWx0aXBsaWVyOiBwYXJzZUZsb2F0KHBhcnRzWzFdKSB8fCAxIH07XG4gICAgfSk7XG4gICAgZW50cmllcy5zb3J0KChhLCBiKSA9PiBiLm11bHRpcGxpZXIgLSBhLm11bHRpcGxpZXIpO1xuICAgIGlmIChlbnRyaWVzLmxlbmd0aCA+IDAgJiYgZW50cmllc1swXS51cmwpIHtcbiAgICAgIGJlc3RVcmwgPSBlbnRyaWVzWzBdLnVybDtcbiAgICB9XG4gIH1cblxuICAvLyBGb3IgQXRsYXNzaWFuIG1lZGlhIENETjogcmVxdWVzdCBvcmlnaW5hbC9tYXggcmVzb2x1dGlvblxuICBpZiAoYmVzdFVybCkge1xuICAgIGJlc3RVcmwgPSB1cGdyYWRlQXRsYXNzaWFuTWVkaWFVcmwoYmVzdFVybCk7XG4gIH1cblxuICByZXR1cm4gYmVzdFVybDtcbn1cblxuLyoqXG4gKiBVcGdyYWRlIEF0bGFzc2lhbiBtZWRpYSBDRE4gVVJMcyB0byByZXF1ZXN0IG1heGltdW0gcmVzb2x1dGlvbi5cbiAqIG1lZGlhLWNkbi5hdGxhc3NpYW4uY29tIFVSTHMgYWNjZXB0IHdpZHRoL2hlaWdodCBwYXJhbXMgdGhhdCBsaW1pdCBvdXRwdXQuXG4gKiBCeSBzZXR0aW5nIGxhcmdlIHZhbHVlcyBhbmQgbW9kZT1mdWxsLWZpdCwgd2UgZ2V0IHRoZSBvcmlnaW5hbCBpbWFnZS5cbiAqL1xuZnVuY3Rpb24gdXBncmFkZUF0bGFzc2lhbk1lZGlhVXJsKHVybCkge1xuICBpZiAoIXVybC5pbmNsdWRlcygnbWVkaWEtY2RuLmF0bGFzc2lhbi5jb20nKSAmJiAhdXJsLmluY2x1ZGVzKCdtZWRpYS5hdGxhc3NpYW4uY29tJykpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkID0gbmV3IFVSTCh1cmwpO1xuICAgIC8vIFJlcXVlc3QgbWF4aW11bSByZXNvbHV0aW9uXG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ3dpZHRoJywgJzQwOTYnKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnaGVpZ2h0JywgJzQwOTYnKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnbW9kZScsICdmdWxsLWZpdCcpO1xuICAgIHJldHVybiBwYXJzZWQudG9TdHJpbmcoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgVmlkZW8gJiBmaWxlIGxpbmsgbG9jYWxpemF0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIFJlcGxhY2UgPHZpZGVvPiBlbGVtZW50cyBhbmQgdmlkZW8tbGlrZSBtZWRpYSBjYXJkcyB3aXRoIEhUTUw1IDx2aWRlbz4gdGFnc1xuICogcG9pbnRpbmcgdG8gbG9jYWwgcmVsYXRpdmUgcGF0aHMuIFJldHVybnMgbGlzdCBvZiBtZWRpYSB0byBkb3dubG9hZC5cbiAqL1xuZnVuY3Rpb24gcmVwbGFjZVZpZGVvc1dpdGhMb2NhbChjbG9uZSkge1xuICBjb25zdCBtZWRpYSA9IFtdOyAvLyB7IHVybCwgbG9jYWxQYXRoLCBmaWxlbmFtZSwgdHlwZSB9XG4gIGxldCB2aWRlb0lkeCA9IDA7XG5cbiAgLy8gSGFuZGxlIDx2aWRlbz4gdGFnc1xuICBjb25zdCB2aWRlb3MgPSBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpO1xuICBmb3IgKGNvbnN0IHZpZGVvIG9mIHZpZGVvcykge1xuICAgIGNvbnN0IHNyYyA9IHZpZGVvLmdldEF0dHJpYnV0ZSgnc3JjJykgfHxcbiAgICAgIHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJ3NvdXJjZScpPy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmICghc3JjIHx8IHNyYy5zdGFydHNXaXRoKCdkYXRhOicpKSBjb250aW51ZTtcblxuICAgIHZpZGVvSWR4Kys7XG4gICAgY29uc3QgbmFtZSA9IHZpZGVvLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LW1lZGlhLW5hbWUnKSB8fFxuICAgICAgdmlkZW8uZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lRnJvbVVybChzcmMpIHx8XG4gICAgICBgdmlkZW9fJHtTdHJpbmcodmlkZW9JZHgpLnBhZFN0YXJ0KDIsICcwJyl9Lm1wNGA7XG4gICAgY29uc3QgbG9jYWxQYXRoID0gYHZpZGVvcy8ke25hbWV9YDtcblxuICAgIC8vIFJlcGxhY2Ugd2l0aCBjbGVhbiBIVE1MNSB2aWRlbyBwbGF5ZXJcbiAgICBjb25zdCBuZXdWaWRlbyA9IGNsb25lLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xuICAgIG5ld1ZpZGVvLnNldEF0dHJpYnV0ZSgncHJlbG9hZCcsICdtZXRhZGF0YScpO1xuICAgIG5ld1ZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbG9jYWxQYXRoKTtcbiAgICBuZXdWaWRlby5zdHlsZS5jc3NUZXh0ID0gJ21heC13aWR0aDoxMDAlO2JvcmRlci1yYWRpdXM6NnB4Oyc7XG4gICAgaWYgKHZpZGVvLmdldEF0dHJpYnV0ZSgncG9zdGVyJykpIHtcbiAgICAgIG5ld1ZpZGVvLnNldEF0dHJpYnV0ZSgncG9zdGVyJywgdmlkZW8uZ2V0QXR0cmlidXRlKCdwb3N0ZXInKSk7XG4gICAgfVxuICAgIHZpZGVvLnJlcGxhY2VXaXRoKG5ld1ZpZGVvKTtcblxuICAgIG1lZGlhLnB1c2goe1xuICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXModXBncmFkZUF0bGFzc2lhbk1lZGlhVXJsKHNyYykpLFxuICAgICAgbG9jYWxQYXRoLFxuICAgICAgZmlsZW5hbWU6IG5hbWUsXG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gSGFuZGxlIENvbmZsdWVuY2UgdmlkZW8gY2FyZHMgKGRpdiB3cmFwcGVycyB0aGF0IGNvbnRhaW4gdmlkZW8gcGxheWVycylcbiAgLy8gTk9URTogW2RhdGEtbm9kZS10eXBlPVwibWVkaWFTaW5nbGVcIl0gd3JhcHMgQUxMIG1lZGlhIChpbWFnZXMgKyB2aWRlb3MpLlxuICAvLyBXZSBtdXN0IHNraXAgY2FyZHMgdGhhdCBjb250YWluIDxpbWc+IFx1MjAxNCB0aG9zZSBhcmUgaW1hZ2VzLCBub3QgdmlkZW9zLlxuICBjb25zdCB2aWRlb0NhcmRzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbChcbiAgICAnW2RhdGEtdGVzdGlkKj1cIm1lZGlhXCJdW2RhdGEtdHlwZT1cInZpZGVvXCJdLCBbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVNpbmdsZVwiXSdcbiAgKTtcbiAgZm9yIChjb25zdCBjYXJkIG9mIHZpZGVvQ2FyZHMpIHtcbiAgICBjb25zdCBpbm5lclZpZGVvID0gY2FyZC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgIGlmIChpbm5lclZpZGVvKSBjb250aW51ZTsgLy8gYWxyZWFkeSBoYW5kbGVkIGFib3ZlXG4gICAgLy8gU2tpcCBpbWFnZSBub2RlcyBcdTIwMTQgdGhlc2UgYXJlIGhhbmRsZWQgYnkgaW5saW5lSW1hZ2VzSW5DbG9uZVxuICAgIGlmIChjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKSBjb250aW51ZTtcbiAgICBjb25zdCBzcmMgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tzcmNdJyk/LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKCFzcmMpIGNvbnRpbnVlO1xuXG4gICAgdmlkZW9JZHgrKztcbiAgICBjb25zdCBuYW1lID0gY2FyZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaWEtbmFtZScpIHx8XG4gICAgICBleHRyYWN0RmlsZW5hbWVGcm9tVXJsKHNyYykgfHxcbiAgICAgIGB2aWRlb18ke1N0cmluZyh2aWRlb0lkeCkucGFkU3RhcnQoMiwgJzAnKX0ubXA0YDtcbiAgICBjb25zdCBsb2NhbFBhdGggPSBgdmlkZW9zLyR7bmFtZX1gO1xuXG4gICAgY29uc3QgbmV3VmlkZW8gPSBjbG9uZS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbmV3VmlkZW8uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnLCAnbWV0YWRhdGEnKTtcbiAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxvY2FsUGF0aCk7XG4gICAgbmV3VmlkZW8uc3R5bGUuY3NzVGV4dCA9ICdtYXgtd2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjZweDsnO1xuICAgIGNhcmQucmVwbGFjZVdpdGgobmV3VmlkZW8pO1xuXG4gICAgbWVkaWEucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyh1cGdyYWRlQXRsYXNzaWFuTWVkaWFVcmwoc3JjKSksXG4gICAgICBsb2NhbFBhdGgsXG4gICAgICBmaWxlbmFtZTogbmFtZSxcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbWVkaWE7XG59XG5cbi8qKlxuICogUmVwbGFjZSBub24tcHJldmlld2FibGUgZmlsZSBsaW5rcyAoUERGcywgdGV4dCwgZGlmZnMsIGV0Yy4pXG4gKiB3aXRoIGxvY2FsIHJlbGF0aXZlIHBhdGhzLiBBZGRzIHRoZW0gdG8gdGhlIG1lZGlhIGRvd25sb2FkIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2VGaWxlTGlua3NXaXRoTG9jYWwoY2xvbmUsIG1lZGlhKSB7XG4gIC8vIFByZXZpZXdhYmxlIGluIGJyb3dzZXI6IGltYWdlcyAoYWxyZWFkeSBiYXNlNjQnZCksIEhUTUxcbiAgY29uc3QgcHJldmlld2FibGVFeHQgPSAvXFwuKHBuZ3xqcGd8anBlZ3xnaWZ8c3ZnfHdlYnB8aHRtbHxodG0pJC9pO1xuICBsZXQgZmlsZUlkeCA9IDA7XG5cbiAgY29uc3QgZmlsZUxpbmtzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbChcbiAgICAnYVtocmVmKj1cIm1lZGlhLWNkbi5hdGxhc3NpYW4uY29tXCJdLCBhW2hyZWYqPVwiL3dpa2kvZG93bmxvYWQvXCJdLCBhLmF0dGFjaG1lbnQtbGluaywgYVtkYXRhLWF0dGFjaG1lbnQtaWRdJ1xuICApO1xuXG4gIGZvciAoY29uc3QgbGluayBvZiBmaWxlTGlua3MpIHtcbiAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICBpZiAoIWhyZWYpIGNvbnRpbnVlO1xuXG4gICAgLy8gU2tpcCBpbWFnZSBsaW5rcyAoYWxyZWFkeSBpbmxpbmVkIGFzIGJhc2U2NClcbiAgICBpZiAocHJldmlld2FibGVFeHQudGVzdChocmVmKSkgY29udGludWU7XG4gICAgLy8gU2tpcCBhbmNob3Itb25seSBsaW5rc1xuICAgIGlmIChocmVmLnN0YXJ0c1dpdGgoJyMnKSkgY29udGludWU7XG5cbiAgICBmaWxlSWR4Kys7XG4gICAgY29uc3QgbmFtZSA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8XG4gICAgICBsaW5rLnRleHRDb250ZW50LnRyaW0oKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lRnJvbVVybChocmVmKSB8fFxuICAgICAgYGZpbGVfJHtTdHJpbmcoZmlsZUlkeCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgIGNvbnN0IGxvY2FsUGF0aCA9IGBhdHRhY2htZW50cy8ke25hbWV9YDtcblxuICAgIC8vIFVwZGF0ZSBocmVmIHRvIGxvY2FsIHBhdGhcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxvY2FsUGF0aCk7XG4gICAgLy8gQWRkIHZpc3VhbCBpbmRpY2F0b3JcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgTG9jYWwgZmlsZTogJHtsb2NhbFBhdGh9YCk7XG5cbiAgICBtZWRpYS5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKGhyZWYpLFxuICAgICAgbG9jYWxQYXRoLFxuICAgICAgZmlsZW5hbWU6IG5hbWUsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgfSk7XG4gIH1cblxuICAvLyBBbHNvIGhhbmRsZSBpbmxpbmUgZmlsZSBjYXJkcyAoQ29uZmx1ZW5jZSBtZWRpYSBjYXJkcyBmb3Igbm9uLWltYWdlIGZpbGVzKVxuICBjb25zdCBpbmxpbmVDYXJkcyA9IGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tkYXRhLXRlc3RpZD1cIm1lZGlhLWlubGluZVwiXSBhLCBbZGF0YS10ZXN0aWQ9XCJpbmxpbmUtY2FyZC1yZXNvbHZlZC12aWV3XCJdIGEsIC5jb25mbHVlbmNlLWVtYmVkZGVkLWZpbGUgYSdcbiAgKTtcbiAgZm9yIChjb25zdCBjYXJkIG9mIGlubGluZUNhcmRzKSB7XG4gICAgY29uc3QgaHJlZiA9IGNhcmQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKCFocmVmIHx8IGhyZWYuc3RhcnRzV2l0aCgnIycpIHx8IHByZXZpZXdhYmxlRXh0LnRlc3QoaHJlZikpIGNvbnRpbnVlO1xuICAgIGlmIChtZWRpYS5zb21lKChtKSA9PiBtLnVybCA9PT0gZGVjb2RlSHRtbEVudGl0aWVzKGhyZWYpKSkgY29udGludWU7IC8vIGFscmVhZHkgaGFuZGxlZFxuXG4gICAgZmlsZUlkeCsrO1xuICAgIGNvbnN0IG5hbWUgPSBjYXJkLnRleHRDb250ZW50LnRyaW0oKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lRnJvbVVybChocmVmKSB8fFxuICAgICAgYGZpbGVfJHtTdHJpbmcoZmlsZUlkeCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgIGNvbnN0IGxvY2FsUGF0aCA9IGBhdHRhY2htZW50cy8ke25hbWV9YDtcblxuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdocmVmJywgbG9jYWxQYXRoKTtcbiAgICBjYXJkLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgTG9jYWwgZmlsZTogJHtsb2NhbFBhdGh9YCk7XG5cbiAgICBtZWRpYS5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKGhyZWYpLFxuICAgICAgbG9jYWxQYXRoLFxuICAgICAgZmlsZW5hbWU6IG5hbWUsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0cmFjdEZpbGVuYW1lRnJvbVVybCh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICBjb25zdCBwYXJ0cyA9IHBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgbGFzdCA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBsYXN0ICYmIGxhc3QgIT09ICdjZG4nID8gbGFzdCA6ICcnO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbEVudGl0aWVzKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyZhbXA7L2csICcmJyk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgTGlnaHRib3g6IGNsaWNrLXRvLXpvb20gZm9yIGltYWdlcyBpbiBleHBvcnRlZCBIVE1MIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuLy8gU2VsZi1jb250YWluZWQgQ1NTICsgSFRNTCArIEpTIGluamVjdGVkIGludG8gdGhlIGV4cG9ydGVkIGZpbGUuXG4vLyBObyBleHRlcm5hbCBkZXBlbmRlbmNpZXMuIEtleWJvYXJkIGFjY2Vzc2libGUgKEVzYyB0byBjbG9zZSkuXG5cbmNvbnN0IExJR0hUQk9YX1NUWUxFUyA9IGBcbi8qIFx1MjUwMFx1MjUwMCBJbWFnZSBMaWdodGJveCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDAgKi9cbmJvZHkgaW1nIHtcbiAgY3Vyc29yOiB6b29tLWluO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xufVxuYm9keSBpbWc6aG92ZXIge1xuICBvcGFjaXR5OiAwLjg1O1xufVxuLndtLWxpZ2h0Ym94LW92ZXJsYXkge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICB6LWluZGV4OiA5OTk5OTk7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44Mik7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiB6b29tLW91dDtcbiAgYW5pbWF0aW9uOiB3bS1sYi1mYWRlaW4gMC4ycyBlYXNlO1xufVxuLndtLWxpZ2h0Ym94LW92ZXJsYXkuYWN0aXZlIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi53bS1saWdodGJveC1vdmVybGF5IGltZyB7XG4gIG1heC13aWR0aDogOTJ2dztcbiAgbWF4LWhlaWdodDogOTB2aDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC41KTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICBhbmltYXRpb246IHdtLWxiLXpvb21pbiAwLjI1cyBlYXNlO1xufVxuLndtLWxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzNnB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjE1KTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXM7XG4gIHotaW5kZXg6IDEwMDAwMDA7XG59XG4ud20tbGlnaHRib3gtY2xvc2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMyk7XG59XG4ud20tbGlnaHRib3gtaW5mbyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAxNnB4O1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC43KTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNSk7XG4gIHBhZGRpbmc6IDRweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuQGtleWZyYW1lcyB3bS1sYi1mYWRlaW4ge1xuICBmcm9tIHsgb3BhY2l0eTogMDsgfVxuICB0byB7IG9wYWNpdHk6IDE7IH1cbn1cbkBrZXlmcmFtZXMgd20tbGItem9vbWluIHtcbiAgZnJvbSB7IHRyYW5zZm9ybTogc2NhbGUoMC44NSk7IG9wYWNpdHk6IDA7IH1cbiAgdG8geyB0cmFuc2Zvcm06IHNjYWxlKDEpOyBvcGFjaXR5OiAxOyB9XG59XG5gO1xuXG5jb25zdCBMSUdIVEJPWF9IVE1MID0gYFxuPGRpdiBjbGFzcz1cIndtLWxpZ2h0Ym94LW92ZXJsYXlcIiBpZD1cIndtTGlnaHRib3hcIj5cbiAgPGJ1dHRvbiBjbGFzcz1cIndtLWxpZ2h0Ym94LWNsb3NlXCIgaWQ9XCJ3bUxpZ2h0Ym94Q2xvc2VcIiB0aXRsZT1cIkNsb3NlIChFc2MpXCI+JnRpbWVzOzwvYnV0dG9uPlxuICA8aW1nIGlkPVwid21MaWdodGJveEltZ1wiIHNyYz1cIlwiIGFsdD1cIlwiPlxuICA8ZGl2IGNsYXNzPVwid20tbGlnaHRib3gtaW5mb1wiIGlkPVwid21MaWdodGJveEluZm9cIj48L2Rpdj5cbjwvZGl2PlxuYDtcblxuY29uc3QgTElHSFRCT1hfU0NSSVBUID0gYFxuPHNjcmlwdD5cbihmdW5jdGlvbigpIHtcbiAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd21MaWdodGJveCcpO1xuICB2YXIgbGJJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd21MaWdodGJveEltZycpO1xuICB2YXIgbGJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dtTGlnaHRib3hJbmZvJyk7XG4gIHZhciBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3bUxpZ2h0Ym94Q2xvc2UnKTtcbiAgaWYgKCFvdmVybGF5KSByZXR1cm47XG5cbiAgLy8gQ2xpY2sgYW55IGltYWdlIHRvIG9wZW4gbGlnaHRib3hcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGltZyA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2ltZycpO1xuICAgIGlmICghaW1nIHx8IGltZy5pZCA9PT0gJ3dtTGlnaHRib3hJbWcnKSByZXR1cm47XG4gICAgaWYgKG92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuXG4gICAgdmFyIHNyYyA9IGltZy5zcmM7XG4gICAgdmFyIGFsdCA9IGltZy5hbHQgfHwgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LW1lZGlhLW5hbWUnKSB8fCAnJztcbiAgICB2YXIgbmF0VyA9IGltZy5uYXR1cmFsV2lkdGg7XG4gICAgdmFyIG5hdEggPSBpbWcubmF0dXJhbEhlaWdodDtcblxuICAgIGxiSW1nLnNyYyA9IHNyYztcbiAgICBsYkltZy5hbHQgPSBhbHQ7XG4gICAgbGJJbmZvLnRleHRDb250ZW50ID0gYWx0ICsgKG5hdFcgPyAnICgnICsgbmF0VyArICcgeCAnICsgbmF0SCArICcpJyA6ICcnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgfSk7XG5cbiAgLy8gQ2xvc2Ugb24gb3ZlcmxheSBjbGlja1xuICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gbGJJbWcpIHJldHVybjsgLy8gZG9uJ3QgY2xvc2Ugd2hlbiBjbGlja2luZyB0aGUgem9vbWVkIGltYWdlXG4gICAgY2xvc2VMaWdodGJveCgpO1xuICB9KTtcblxuICAvLyBDbG9zZSBidXR0b25cbiAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUxpZ2h0Ym94KTtcblxuICAvLyBFc2Mga2V5XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGNsb3NlTGlnaHRib3goKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNsb3NlTGlnaHRib3goKSB7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgbGJJbWcuc3JjID0gJyc7XG4gIH1cbn0pKCk7XG48XFwvc2NyaXB0PlxuYDtcbiIsICIvKipcbiAqIFNob3J0Y3V0IEhhbmRsZXIgSXNsYW5kXG4gKiBIYW5kbGVzIGtleWJvYXJkIHNob3J0Y3V0IGFuZCBjb250ZXh0IG1lbnUgdHJpZ2dlcmVkIGFjdGlvbnMuXG4gKiBCcmlkZ2VzIGJldHdlZW4gYmFja2dyb3VuZCBzY3JpcHQgY29tbWFuZHMgYW5kIHBhZ2UtbGV2ZWwgb3BlcmF0aW9ucy5cbiAqXG4gKiBIYW5kbGVzOiBjb252ZXJ0QW5kQ29weVxuICovXG5pbXBvcnQgeyByZWdpc3RlckhhbmRsZXIgfSBmcm9tICcuL21lc3NhZ2UtYnVzLmpzJztcbmltcG9ydCB7IHNob3dOb3RpZmljYXRpb24gfSBmcm9tICcuL25vdGlmaWNhdGlvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2hvcnRjdXRIYW5kbGVySXNsYW5kKCkge1xuICByZWdpc3RlckhhbmRsZXIoJ2NvbnZlcnRBbmRDb3B5JywgKG1zZykgPT4gaGFuZGxlQ29udmVydEFuZENvcHkobXNnKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbnZlcnRBbmRDb3B5KHsgaHRtbCwgbWV0YWRhdGEsIGltYWdlTWFwIH0pIHtcbiAgdHJ5IHtcbiAgICBsZXQgbWQgPSBzaW1wbGlmeUh0bWxUb01kKGh0bWwpO1xuXG4gICAgaWYgKG1ldGFkYXRhICYmIE9iamVjdC5rZXlzKG1ldGFkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmbSA9IE9iamVjdC5lbnRyaWVzKG1ldGFkYXRhKVxuICAgICAgICAubWFwKChbaywgdl0pID0+IGAke2t9OiAke0pTT04uc3RyaW5naWZ5KHYpfWApXG4gICAgICAgIC5qb2luKCdcXG4nKTtcbiAgICAgIG1kID0gYC0tLVxcbiR7Zm19XFxuLS0tXFxuXFxuJHttZH1gO1xuICAgIH1cblxuICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KG1kKTtcbiAgICBzaG93Tm90aWZpY2F0aW9uKCdDb3BpZWQgYXMgTWFya2Rvd24hJyk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hvd05vdGlmaWNhdGlvbignQ29weSBmYWlsZWQ6ICcgKyBlLm1lc3NhZ2UsIHRydWUpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cblxuLyoqXG4gKiBMaWdodHdlaWdodCBET00td2Fsa2VyIEhUTUxcdTIxOTJNYXJrZG93biBjb252ZXJ0ZXIuXG4gKiBVc2VkIGZvciBrZXlib2FyZCBzaG9ydGN1dHMgKFR1cm5kb3duIGlzIG9ubHkgaW4gdGhlIHBvcHVwIGJ1bmRsZSkuXG4gKi9cbmZ1bmN0aW9uIHNpbXBsaWZ5SHRtbFRvTWQoaHRtbCkge1xuICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpO1xuICBsZXQgbWQgPSAnJztcblxuICBjb25zdCB3YWxrID0gKG5vZGUsIGRlcHRoID0gMCkgPT4ge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgbWQgKz0gbm9kZS50ZXh0Q29udGVudDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSByZXR1cm47XG5cbiAgICBjb25zdCB0YWcgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBiZWZvcmUgPSB0YWdPcGVuKHRhZywgbm9kZSwgZGVwdGgpO1xuICAgIG1kICs9IGJlZm9yZTtcblxuICAgIGNvbnN0IGNoaWxkRGVwdGggPSAodGFnID09PSAndWwnIHx8IHRhZyA9PT0gJ29sJykgPyBkZXB0aCArIDEgOiBkZXB0aDtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgd2FsayhjaGlsZCwgY2hpbGREZXB0aCk7XG4gICAgfVxuXG4gICAgbWQgKz0gdGFnQ2xvc2UodGFnLCBub2RlKTtcbiAgfTtcblxuICB3YWxrKGRvYy5ib2R5KTtcbiAgcmV0dXJuIG1kLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gdGFnT3Blbih0YWcsIG5vZGUsIGRlcHRoKSB7XG4gIGNvbnN0IG1hcCA9IHtcbiAgICBoMTogJ1xcbiMgJywgaDI6ICdcXG4jIyAnLCBoMzogJ1xcbiMjIyAnLFxuICAgIGg0OiAnXFxuIyMjIyAnLCBoNTogJ1xcbiMjIyMjICcsIGg2OiAnXFxuIyMjIyMjICcsXG4gICAgcDogJ1xcblxcbicsIGJyOiAnXFxuJyxcbiAgICBzdHJvbmc6ICcqKicsIGI6ICcqKicsXG4gICAgZW06ICcqJywgaTogJyonLFxuICAgIGxpOiAnXFxuJyArICcgICcucmVwZWF0KGRlcHRoKSArICctICcsXG4gICAgaHI6ICdcXG4tLS1cXG4nLFxuICAgIHRyOiAnXFxufCcsXG4gICAgdGg6ICcgJywgdGQ6ICcgJyxcbiAgfTtcbiAgaWYgKHRhZyA9PT0gJ2NvZGUnKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50RWxlbWVudD8udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJyA/ICdcXG5gYGBcXG4nIDogJ2AnO1xuICB9XG4gIGlmICh0YWcgPT09ICdhJykgcmV0dXJuICdbJztcbiAgaWYgKHRhZyA9PT0gJ2ltZycpIHtcbiAgICBjb25zdCBhbHQgPSBub2RlLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgY29uc3Qgc3JjID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnO1xuICAgIHJldHVybiBgIVske2FsdH1dKCR7c3JjfSlgO1xuICB9XG4gIHJldHVybiBtYXBbdGFnXSB8fCAnJztcbn1cblxuZnVuY3Rpb24gdGFnQ2xvc2UodGFnLCBub2RlKSB7XG4gIGNvbnN0IG1hcCA9IHtcbiAgICBoMTogJ1xcbicsIGgyOiAnXFxuJywgaDM6ICdcXG4nLCBoNDogJ1xcbicsIGg1OiAnXFxuJywgaDY6ICdcXG4nLFxuICAgIHN0cm9uZzogJyoqJywgYjogJyoqJyxcbiAgICBlbTogJyonLCBpOiAnKicsXG4gICAgdGg6ICcgfCcsIHRkOiAnIHwnLFxuICB9O1xuICBpZiAodGFnID09PSAnY29kZScpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnRFbGVtZW50Py50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnID8gJ1xcbmBgYFxcbicgOiAnYCc7XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ2EnKSB7XG4gICAgcmV0dXJuIGBdKCR7bm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJ30pYDtcbiAgfVxuICByZXR1cm4gbWFwW3RhZ10gfHwgJyc7XG59XG4iLCAiLyoqXG4gKiBBdHRhY2htZW50IENvbGxlY3RvciBJc2xhbmRcbiAqIENvbGxlY3RzIGFsbCBhdHRhY2htZW50cyAoaW1hZ2VzICsgZmlsZXMpIGZyb20gSmlyYS9Db25mbHVlbmNlIHBhZ2VzLlxuICogUmV0dXJucyBzdHJ1Y3R1cmVkIGRhdGEgZm9yIGRvd25sb2FkaW5nIGludG8gb3JnYW5pemVkIGZvbGRlcnMuXG4gKlxuICogSGFuZGxlczogY29sbGVjdEF0dGFjaG1lbnRzXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVySGFuZGxlciB9IGZyb20gJy4vbWVzc2FnZS1idXMuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEF0dGFjaG1lbnRDb2xsZWN0b3JJc2xhbmQoKSB7XG4gIHJlZ2lzdGVySGFuZGxlcignY29sbGVjdEF0dGFjaG1lbnRzJywgKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGNvbGxlY3RBdHRhY2htZW50cygpKSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RBdHRhY2htZW50cygpIHtcbiAgY29uc3QgYXR0YWNobWVudHMgPSB7XG4gICAgaW1hZ2VzOiBbXSxcbiAgICBmaWxlczogW10sXG4gICAgcGFnZVRpdGxlOiBzYW5pdGl6ZUZvckZvbGRlcihkb2N1bWVudC50aXRsZSksXG4gIH07XG5cbiAgLy8gMS4gQ29sbGVjdCBhbGwgaW1hZ2VzIGZyb20gdGhlIHBhZ2UgY29udGVudFxuICBjb25zdCBjb250ZW50RWwgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY29udGVudCcpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuZmllbGQucmljaC10ZXh0LmRlc2NyaXB0aW9uXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24tdmFsJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykgfHxcbiAgICBkb2N1bWVudC5ib2R5O1xuXG4gIGNvbnN0IGltZ3MgPSBjb250ZW50RWwucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG4gIGNvbnN0IHNlZW5VcmxzID0gbmV3IFNldCgpO1xuXG4gIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICBjb25zdCB1cmwgPSBnZXRCZXN0SW1hZ2VVcmwoaW1nKTtcbiAgICBpZiAoIXVybCB8fCB1cmwuc3RhcnRzV2l0aCgnZGF0YTonKSB8fCBzZWVuVXJscy5oYXModXJsKSkgY29udGludWU7XG4gICAgc2VlblVybHMuYWRkKHVybCk7XG5cbiAgICBjb25zdCBhbHQgPSBpbWcuZ2V0QXR0cmlidXRlKCdhbHQnKSB8fCAnJztcbiAgICBjb25zdCBtZWRpYU5hbWUgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtbWVkaWEtbmFtZScpIHx8ICcnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gbWVkaWFOYW1lIHx8IGFsdCB8fCBleHRyYWN0RmlsZW5hbWUodXJsKSB8fCBgaW1hZ2VfJHtzZWVuVXJscy5zaXplfWA7XG5cbiAgICBhdHRhY2htZW50cy5pbWFnZXMucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyh1cmwpLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUoZmlsZW5hbWUpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gMi4gQ29sbGVjdCBmaWxlIGF0dGFjaG1lbnRzIGZyb20gQ29uZmx1ZW5jZSBhdHRhY2htZW50IHBhbmVsXG4gIGNvbnN0IGF0dGFjaExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnW2RhdGEtdGVzdGlkPVwiYXR0YWNobWVudC1wYW5lbFwiXSBhW2hyZWZdLCAuYXR0YWNobWVudC1jb250ZW50IGFbaHJlZl0sIC5hdHRhY2htZW50cyBhW2Rvd25sb2FkXSdcbiAgKTtcbiAgZm9yIChjb25zdCBsaW5rIG9mIGF0dGFjaExpbmtzKSB7XG4gICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKCFocmVmIHx8IHNlZW5VcmxzLmhhcyhocmVmKSkgY29udGludWU7XG4gICAgc2VlblVybHMuYWRkKGhyZWYpO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fFxuICAgICAgbGluay50ZXh0Q29udGVudC50cmltKCkgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZShocmVmKTtcblxuICAgIGF0dGFjaG1lbnRzLmZpbGVzLnB1c2goe1xuICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXMobmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZikudG9TdHJpbmcoKSksXG4gICAgICBmaWxlbmFtZTogc2FuaXRpemVGaWxlbmFtZShmaWxlbmFtZSksXG4gICAgfSk7XG4gIH1cblxuICAvLyAzLiBDb2xsZWN0IGZyb20gSmlyYSBhdHRhY2htZW50IHNlY3Rpb25cbiAgY29uc3QgamlyYUF0dGFjaG1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuaXNzdWUtYmFzZS5mb3VuZGF0aW9uLmF0dGFjaG1lbnQtcGFuZWxcIl0gYVtocmVmXSwgLmF0dGFjaG1lbnQtdGh1bWIgYVtocmVmXSdcbiAgKTtcbiAgZm9yIChjb25zdCBsaW5rIG9mIGppcmFBdHRhY2htZW50cykge1xuICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaHJlZiB8fCBzZWVuVXJscy5oYXMoaHJlZikpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZChocmVmKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gbGluay5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHxcbiAgICAgIGxpbmsucXVlcnlTZWxlY3RvcignaW1nJyk/LmdldEF0dHJpYnV0ZSgnYWx0JykgfHxcbiAgICAgIGxpbmsudGV4dENvbnRlbnQudHJpbSgpIHx8XG4gICAgICBleHRyYWN0RmlsZW5hbWUoaHJlZik7XG5cbiAgICBhdHRhY2htZW50cy5maWxlcy5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLnRvU3RyaW5nKCkpLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUoZmlsZW5hbWUpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gNC4gQ29sbGVjdCBpbmxpbmUgZmlsZSBhdHRhY2htZW50cyAoQ29uZmx1ZW5jZSBtZWRpYSBjYXJkcywgc21hcnQgbGlua3MsIGlubGluZSBjYXJkcylcbiAgLy8gICAgVGhlc2UgYXJlIG5vbi1pbWFnZSBmaWxlcyBlbWJlZGRlZCBpbmxpbmUgKGUuZy4sIC50eHQsIC5wZGYsIC5kaWZmKVxuICBjb25zdCBpbmxpbmVGaWxlU2VsZWN0b3JzID0gW1xuICAgIC8vIENvbmZsdWVuY2UgQ2xvdWQ6IGlubGluZSBtZWRpYSBjYXJkc1xuICAgICdbZGF0YS10ZXN0aWQ9XCJtZWRpYS1pbmxpbmVcIl0gYVtocmVmXScsXG4gICAgJ1tkYXRhLXRlc3RpZD1cIm1lZGlhLWZpbGUtY2FyZC12aWV3XCJdIGFbaHJlZl0nLFxuICAgICdbZGF0YS10ZXN0aWQ9XCJpbmxpbmUtY2FyZC1yZXNvbHZlZC12aWV3XCJdIGFbaHJlZl0nLFxuICAgIC8vIENvbmZsdWVuY2UgQ2xvdWQ6IG1lZGlhIHNpbmdsZSAobm9uLWltYWdlIGZpbGVzKVxuICAgICdbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVNpbmdsZVwiXSBhW2hyZWZdJyxcbiAgICAnW2RhdGEtbm9kZS10eXBlPVwibWVkaWFJbmxpbmVcIl0gYVtocmVmXScsXG4gICAgLy8gQ29uZmx1ZW5jZTogZW1iZWRkZWQgZmlsZSB3cmFwcGVyXG4gICAgJy5jb25mbHVlbmNlLWVtYmVkZGVkLWZpbGUgYVtocmVmXScsXG4gICAgJ3NwYW4uY29uZmx1ZW5jZS1lbWJlZGRlZC1maWxlLXdyYXBwZXIgYVtocmVmXScsXG4gICAgLy8gU21hcnQgbGlua3MgLyBibG9jayBjYXJkc1xuICAgICdbZGF0YS10ZXN0aWQ9XCJibG9jay1jYXJkLXJlc29sdmVkLXZpZXdcIl0gYVtocmVmXScsXG4gICAgJ1tkYXRhLXRlc3RpZD1cInNtYXJ0LWJsb2NrLXRpdGxlLXJlc29sdmVkLXZpZXdcIl0nLFxuICAgIC8vIEdlbmVyaWM6IGxpbmtzIHRvIEF0bGFzc2lhbiBtZWRpYSBDRE4gZmlsZXMgKG5vbi1pbWFnZSlcbiAgICAnYVtocmVmKj1cIm1lZGlhLWNkbi5hdGxhc3NpYW4uY29tL2ZpbGUvXCJdJyxcbiAgICAnYVtocmVmKj1cIi93aWtpL2Rvd25sb2FkL2F0dGFjaG1lbnRzL1wiXScsXG4gICAgJ2FbaHJlZio9XCIvd2lraS9kb3dubG9hZC90aHVtYm5haWxzL1wiXScsXG4gICAgLy8gSmlyYTogYXR0YWNobWVudCBsaW5rcyBpbiBkZXNjcmlwdGlvbi9jb21tZW50c1xuICAgICdhLmF0dGFjaG1lbnQtbGlua1tocmVmXScsXG4gICAgJ2FbZGF0YS1hdHRhY2htZW50LWlkXVtocmVmXScsXG4gIF07XG5cbiAgY29uc3QgaW5saW5lRmlsZXMgPSBjb250ZW50RWwucXVlcnlTZWxlY3RvckFsbChpbmxpbmVGaWxlU2VsZWN0b3JzLmpvaW4oJywgJykpO1xuICBmb3IgKGNvbnN0IGVsIG9mIGlubGluZUZpbGVzKSB7XG4gICAgY29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IGVsLmNsb3Nlc3QoJ2EnKT8uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKCFocmVmIHx8IHNlZW5VcmxzLmhhcyhocmVmKSkgY29udGludWU7XG5cbiAgICAvLyBTa2lwIGlmIGl0J3MgYW4gaW1hZ2UgVVJMIHdlIGFscmVhZHkgY29sbGVjdGVkXG4gICAgaWYgKC9cXC4ocG5nfGpwZ3xqcGVnfGdpZnxzdmd8d2VicCkoXFw/fCQpL2kudGVzdChocmVmKSkgY29udGludWU7XG5cbiAgICBzZWVuVXJscy5hZGQoaHJlZik7XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9XG4gICAgICBlbC5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHxcbiAgICAgIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0aWQnKT8uaW5jbHVkZXMoJ3RpdGxlJykgJiYgZWwudGV4dENvbnRlbnQudHJpbSgpIHx8XG4gICAgICBlbC50ZXh0Q29udGVudC50cmltKCkgfHxcbiAgICAgIGVsLmNsb3Nlc3QoJ1tkYXRhLWZpbGVuYW1lXScpPy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsZW5hbWUnKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lKGhyZWYpO1xuXG4gICAgaWYgKGZpbGVuYW1lKSB7XG4gICAgICBhdHRhY2htZW50cy5maWxlcy5wdXNoKHtcbiAgICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXMobmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZikudG9TdHJpbmcoKSksXG4gICAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKGZpbGVuYW1lKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIDUuIENvbGxlY3QgZnJvbSBkYXRhLWZpbGVpZCBhdHRyaWJ1dGVzIChDb25mbHVlbmNlIG1lZGlhIG5vZGVzIHdpdGhvdXQgdmlzaWJsZSBsaW5rcylcbiAgY29uc3QgbWVkaWFOb2RlcyA9IGNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWxlaWRdJyk7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBtZWRpYU5vZGVzKSB7XG4gICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ0lNRycpIGNvbnRpbnVlOyAvLyBpbWFnZXMgYWxyZWFkeSBoYW5kbGVkXG4gICAgY29uc3QgZmlsZUlkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsZWlkJyk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGVjb2xsZWN0aW9uJykgfHwgJyc7XG4gICAgaWYgKCFmaWxlSWQgfHwgc2VlblVybHMuaGFzKGZpbGVJZCkpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZChmaWxlSWQpO1xuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBkb3dubG9hZCBVUkwgZnJvbSBmaWxlIElEXG4gICAgY29uc3QgbWVkaWFOYW1lID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1tZWRpYS1uYW1lJykgfHxcbiAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgbm9kZS5jbG9zZXN0KCdbZGF0YS1tZWRpYS1uYW1lXScpPy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaWEtbmFtZScpIHx8XG4gICAgICBub2RlLnRleHRDb250ZW50LnRyaW0oKSB8fFxuICAgICAgZmlsZUlkO1xuXG4gICAgLy8gVXNlIHRoZSBDb25mbHVlbmNlIGRvd25sb2FkIEFQSSBVUkwgcGF0dGVyblxuICAgIGNvbnN0IGJhc2VVcmwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgIGNvbnN0IGRvd25sb2FkVXJsID0gYCR7YmFzZVVybH0vd2lraS9yZXN0L2FwaS9tZWRpYWZpbGUvJHtmaWxlSWR9L2NvbnRlbnRgO1xuXG4gICAgYXR0YWNobWVudHMuZmlsZXMucHVzaCh7XG4gICAgICB1cmw6IGRvd25sb2FkVXJsLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUobWVkaWFOYW1lKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDYuIENvbGxlY3QgdmlkZW9zICg8dmlkZW8+LCA8c291cmNlPiwgQ29uZmx1ZW5jZSB2aWRlbyBwbGF5ZXJzKVxuICBjb25zdCB2aWRlb3MgPSBjb250ZW50RWwucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKTtcbiAgZm9yIChjb25zdCB2aWRlbyBvZiB2aWRlb3MpIHtcbiAgICAvLyBUcnkgPHNvdXJjZT4gY2hpbGRyZW4gZmlyc3QsIHRoZW4gdmlkZW8gc3JjXG4gICAgY29uc3Qgc291cmNlcyA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NvdXJjZVtzcmNdJyk7XG4gICAgY29uc3Qgc3JjTGlzdCA9IHNvdXJjZXMubGVuZ3RoID4gMFxuICAgICAgPyBbLi4uc291cmNlc10ubWFwKChzKSA9PiBzLmdldEF0dHJpYnV0ZSgnc3JjJykpXG4gICAgICA6IFt2aWRlby5nZXRBdHRyaWJ1dGUoJ3NyYycpXTtcblxuICAgIGZvciAoY29uc3Qgc3JjIG9mIHNyY0xpc3QpIHtcbiAgICAgIGlmICghc3JjIHx8IHNyYy5zdGFydHNXaXRoKCdkYXRhOicpIHx8IHNlZW5VcmxzLmhhcyhzcmMpKSBjb250aW51ZTtcbiAgICAgIHNlZW5VcmxzLmFkZChzcmMpO1xuICAgICAgY29uc3QgbmFtZSA9IHZpZGVvLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LW1lZGlhLW5hbWUnKSB8fFxuICAgICAgICB2aWRlby5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaWEtbmFtZScpIHx8XG4gICAgICAgIGV4dHJhY3RGaWxlbmFtZShzcmMpIHx8IGB2aWRlb18ke3NlZW5VcmxzLnNpemV9YDtcbiAgICAgIGF0dGFjaG1lbnRzLmZpbGVzLnB1c2goe1xuICAgICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyh1cGdyYWRlTWVkaWFVcmwoc3JjKSksXG4gICAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKG5hbWUpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gNy4gQ29sbGVjdCBDb25mbHVlbmNlIG1lZGlhIGNhcmRzIHRoYXQgYXJlIHZpZGVvcyAocG9zdGVyIGF0dHJpYnV0ZSA9IHZpZGVvIHRodW1ibmFpbClcbiAgY29uc3QgdmlkZW9DYXJkcyA9IGNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdbZGF0YS10ZXN0aWQ9XCJtZWRpYS1jYXJkLXZpZXdcIl0gdmlkZW9bc3JjXSwgW2RhdGEtdHlwZT1cInZpZGVvXCJdIFtzcmNdLCBbZGF0YS10ZXN0aWQqPVwidmlkZW9cIl0gW3NyY10nXG4gICk7XG4gIGZvciAoY29uc3QgdmMgb2YgdmlkZW9DYXJkcykge1xuICAgIGNvbnN0IHNyYyA9IHZjLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKCFzcmMgfHwgc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykgfHwgc2VlblVybHMuaGFzKHNyYykpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZChzcmMpO1xuICAgIGNvbnN0IG5hbWUgPSB2Yy5jbG9zZXN0KCdbZGF0YS1tZWRpYS1uYW1lXScpPy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVkaWEtbmFtZScpIHx8XG4gICAgICB2Yy5jbG9zZXN0KCdbZGF0YS1maWxlbmFtZV0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGVuYW1lJykgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZShzcmMpIHx8ICd2aWRlbyc7XG4gICAgYXR0YWNobWVudHMuZmlsZXMucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyh1cGdyYWRlTWVkaWFVcmwoc3JjKSksXG4gICAgICBmaWxlbmFtZTogc2FuaXRpemVGaWxlbmFtZShuYW1lKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDguIENhdGNoIGFueSByZW1haW5pbmcgbWVkaWEgQ0ROIGxpbmtzICh2aWRlby9hdWRpby9maWxlKSBub3QgeWV0IGNvbGxlY3RlZFxuICBjb25zdCBtZWRpYUNkbkxpbmtzID0gY29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCJtZWRpYS1jZG4uYXRsYXNzaWFuLmNvbVwiXScpO1xuICBmb3IgKGNvbnN0IGxpbmsgb2YgbWVkaWFDZG5MaW5rcykge1xuICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaHJlZiB8fCBzZWVuVXJscy5oYXMoaHJlZikpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZChocmVmKTtcbiAgICBjb25zdCBuYW1lID0gbGluay50ZXh0Q29udGVudC50cmltKCkgfHwgZXh0cmFjdEZpbGVuYW1lKGhyZWYpIHx8ICdmaWxlJztcbiAgICBhdHRhY2htZW50cy5maWxlcy5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKGhyZWYpLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUobmFtZSksXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gYXR0YWNobWVudHM7XG59XG5cbmZ1bmN0aW9uIGdldEJlc3RJbWFnZVVybChpbWcpIHtcbiAgY29uc3Qgc3Jjc2V0ID0gaW1nLmdldEF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gIGlmIChzcmNzZXQpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gc3Jjc2V0LnNwbGl0KCcsJykubWFwKChlKSA9PiB7XG4gICAgICBjb25zdCBwYXJ0cyA9IGUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICByZXR1cm4geyB1cmw6IHBhcnRzWzBdLCBtdWx0OiBwYXJzZUZsb2F0KHBhcnRzWzFdKSB8fCAxIH07XG4gICAgfSk7XG4gICAgZW50cmllcy5zb3J0KChhLCBiKSA9PiBiLm11bHQgLSBhLm11bHQpO1xuICAgIGlmIChlbnRyaWVzWzBdPy51cmwpIHtcbiAgICAgIHJldHVybiB1cGdyYWRlTWVkaWFVcmwoZW50cmllc1swXS51cmwpO1xuICAgIH1cbiAgfVxuICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgcmV0dXJuIHNyYyA/IHVwZ3JhZGVNZWRpYVVybChzcmMpIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdXBncmFkZU1lZGlhVXJsKHVybCkge1xuICBpZiAoIXVybC5pbmNsdWRlcygnbWVkaWEtY2RuLmF0bGFzc2lhbi5jb20nKSAmJiAhdXJsLmluY2x1ZGVzKCdtZWRpYS5hdGxhc3NpYW4uY29tJykpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkID0gbmV3IFVSTCh1cmwpO1xuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCd3aWR0aCcsICc0MDk2Jyk7XG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ2hlaWdodCcsICc0MDk2Jyk7XG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ21vZGUnLCAnZnVsbC1maXQnKTtcbiAgICByZXR1cm4gcGFyc2VkLnRvU3RyaW5nKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0cmFjdEZpbGVuYW1lKHVybCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIGNvbnN0IHBhcnRzID0gcGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgJyc7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUZpbGVuYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHgwMC1cXHgxZl0vZywgJycpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJ18nKVxuICAgIC5zdWJzdHJpbmcoMCwgMTIwKVxuICAgIHx8ICdmaWxlJztcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVGb3JGb2xkZXIobmFtZSkge1xuICByZXR1cm4gbmFtZVxuICAgIC5yZXBsYWNlKC9bPD46XCIvXFxcXHw/KlxceDAwLVxceDFmXS9nLCAnJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnXycpXG4gICAgLnN1YnN0cmluZygwLCA4MClcbiAgICB8fCAnZXhwb3J0Jztcbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbEVudGl0aWVzKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyZhbXA7L2csICcmJyk7XG59XG4iLCAiLyoqXG4gKiBJc2xhbmRzIE9yY2hlc3RyYXRvclxuICogRW50cnkgcG9pbnQgZm9yIHRoZSBjb250ZW50IHNjcmlwdC5cbiAqIEluaXRpYWxpemVzIHRoZSBtZXNzYWdlIGJ1cyBhbmQgYWxsIGlzbGFuZHMuXG4gKlxuICogRWFjaCBpc2xhbmQgaXMgc2VsZi1jb250YWluZWQgYW5kIGNvbW11bmljYXRlcyBvbmx5IHRocm91Z2ggdGhlIG1lc3NhZ2UgYnVzLlxuICogTmV3IGlzbGFuZHMgY2FuIGJlIGFkZGVkIGhlcmUgd2l0aG91dCBtb2RpZnlpbmcgZXhpc3Rpbmcgb25lcyAoT3Blbi1DbG9zZWQpLlxuICovXG5pbXBvcnQgeyBpbml0TWVzc2FnZUJ1cyB9IGZyb20gJy4vbWVzc2FnZS1idXMuanMnO1xuaW1wb3J0IHsgaW5pdEV4dHJhY3RvcklzbGFuZCB9IGZyb20gJy4vZXh0cmFjdG9yLmpzJztcbmltcG9ydCB7IGluaXRJbnNlcnRlcklzbGFuZCB9IGZyb20gJy4vaW5zZXJ0ZXIuanMnO1xuaW1wb3J0IHsgaW5pdEh0bWxFeHBvcnRlcklzbGFuZCB9IGZyb20gJy4vaHRtbC1leHBvcnRlci5qcyc7XG5pbXBvcnQgeyBpbml0U2hvcnRjdXRIYW5kbGVySXNsYW5kIH0gZnJvbSAnLi9zaG9ydGN1dC1oYW5kbGVyLmpzJztcbmltcG9ydCB7IGluaXRBdHRhY2htZW50Q29sbGVjdG9ySXNsYW5kIH0gZnJvbSAnLi9hdHRhY2htZW50LWNvbGxlY3Rvci5qcyc7XG5cbi8vIEJvb3Qgc2VxdWVuY2U6IGluaXRpYWxpemUgbWVzc2FnZSBidXMsIHRoZW4gcmVnaXN0ZXIgYWxsIGlzbGFuZHNcbmluaXRNZXNzYWdlQnVzKCk7XG5pbml0RXh0cmFjdG9ySXNsYW5kKCk7XG5pbml0SW5zZXJ0ZXJJc2xhbmQoKTtcbmluaXRIdG1sRXhwb3J0ZXJJc2xhbmQoKTtcbmluaXRTaG9ydGN1dEhhbmRsZXJJc2xhbmQoKTtcbmluaXRBdHRhY2htZW50Q29sbGVjdG9ySXNsYW5kKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBaUJPLFdBQVMsZ0JBQWdCLGFBQWEsU0FBUztBQUNwRCxRQUFJLFNBQVMsSUFBSSxXQUFXLEdBQUc7QUFDN0IsY0FBUSxLQUFLLHlDQUF5QyxXQUFXLEdBQUc7QUFBQSxJQUN0RTtBQUNBLGFBQVMsSUFBSSxhQUFhLE9BQU87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
