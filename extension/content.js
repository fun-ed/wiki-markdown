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
    const imageUrls = collectImageUrls(html);
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
      let imageFiles = [];
      if (inlineImages) {
        imageCount = await inlineImagesInClone(clone);
      } else {
        imageFiles = localizeImagesInClone(clone);
        imageCount = imageFiles.length;
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
        localMedia,
        // files that need to be downloaded alongside the HTML
        imageFiles
        // images to download when not inlined (empty when inlineImages=true)
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
  function localizeImagesInClone(clone) {
    const imgs = clone.querySelectorAll("img");
    const imageFiles = [];
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
    if (urlSet.size === 0) return imageFiles;
    const urlToLocal = /* @__PURE__ */ new Map();
    let idx = 0;
    for (const url of urlSet) {
      idx++;
      const imgName = `img${String(idx).padStart(2, "0")}.png`;
      const localPath = `images/${imgName}`;
      urlToLocal.set(url, { localPath, filename: imgName });
      imageFiles.push({
        url: decodeHtmlEntities(url),
        localPath,
        filename: imgName,
        type: "image"
      });
    }
    for (const img of imgs) {
      const bestUrl = imgUrlMap.get(img);
      if (bestUrl && urlToLocal.has(bestUrl)) {
        img.setAttribute("src", urlToLocal.get(bestUrl).localPath);
        img.removeAttribute("srcset");
      }
    }
    return imageFiles;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2lzbGFuZHMvbWVzc2FnZS1idXMuanMiLCAiLi4vc3JjL2lzbGFuZHMvZXh0cmFjdG9yLmpzIiwgIi4uL3NyYy9pc2xhbmRzL25vdGlmaWNhdGlvbi5qcyIsICIuLi9zcmMvaXNsYW5kcy9pbnNlcnRlci5qcyIsICIuLi9zcmMvaXNsYW5kcy9odG1sLWV4cG9ydGVyLmpzIiwgIi4uL3NyYy9pc2xhbmRzL3Nob3J0Y3V0LWhhbmRsZXIuanMiLCAiLi4vc3JjL2lzbGFuZHMvYXR0YWNobWVudC1jb2xsZWN0b3IuanMiLCAiLi4vc3JjL2lzbGFuZHMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogTWVzc2FnZSBCdXNcbiAqIERlY291cGxlZCBldmVudC1kcml2ZW4gY29tbXVuaWNhdGlvbiBsYXllciBmb3IgaXNsYW5kcy5cbiAqIEVhY2ggaXNsYW5kIHJlZ2lzdGVycyBoYW5kbGVyczsgdGhlIGJ1cyByb3V0ZXMgaW5jb21pbmcgZXh0ZW5zaW9uIG1lc3NhZ2VzLlxuICpcbiAqIEZvbGxvd3MgTWVkaWF0b3IgUGF0dGVybiBcdTIwMTQgaXNsYW5kcyBkb24ndCBrbm93IGFib3V0IGVhY2ggb3RoZXIsXG4gKiB0aGV5IG9ubHkgaW50ZXJhY3QgdGhyb3VnaCB0aGUgYnVzLlxuICovXG5cbi8qKiBAdHlwZSB7TWFwPHN0cmluZywgKG1lc3NhZ2U6IGFueSkgPT4gUHJvbWlzZTxhbnk+Pn0gKi9cbmNvbnN0IGhhbmRsZXJzID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbWVzc2FnZSBoYW5kbGVyIGZvciBhIHNwZWNpZmljIG1lc3NhZ2UgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlVHlwZVxuICogQHBhcmFtIHsobWVzc2FnZTogYW55KSA9PiBQcm9taXNlPGFueT59IGhhbmRsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcihtZXNzYWdlVHlwZSwgaGFuZGxlcikge1xuICBpZiAoaGFuZGxlcnMuaGFzKG1lc3NhZ2VUeXBlKSkge1xuICAgIGNvbnNvbGUud2FybihgW01lc3NhZ2VCdXNdIE92ZXJ3cml0aW5nIGhhbmRsZXIgZm9yIFwiJHttZXNzYWdlVHlwZX1cImApO1xuICB9XG4gIGhhbmRsZXJzLnNldChtZXNzYWdlVHlwZSwgaGFuZGxlcik7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgbWVzc2FnZSBidXMgXHUyMDE0IGNvbm5lY3RzIHRvIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuXG4gKiBNdXN0IGJlIGNhbGxlZCBvbmNlIGR1cmluZyBjb250ZW50IHNjcmlwdCBpbml0aWFsaXphdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXNzYWdlQnVzKCkge1xuICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBfc2VuZGVyKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzLmdldChtZXNzYWdlLnR5cGUpO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBOb3QgaGFuZGxlZFxuICB9KTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHQuXG4gKiBAcGFyYW0ge09iamVjdH0gbWVzc2FnZVxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbmRUb0JhY2tncm91bmQobWVzc2FnZSkge1xuICByZXR1cm4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xufVxuIiwgIi8qKlxuICogRXh0cmFjdG9yIElzbGFuZFxuICogUmVzcG9uc2libGUgZm9yIGV4dHJhY3RpbmcgY29udGVudCBhbmQgbWV0YWRhdGEgZnJvbSBKaXJhL0NvbmZsdWVuY2UgcGFnZXMuXG4gKiBTZWxmLWNvbnRhaW5lZCBtb2R1bGUgXHUyMDE0IG1hbmFnZXMgaXRzIG93biBsaWZlY3ljbGUgYW5kIHN0YXRlLlxuICpcbiAqIEhhbmRsZXM6IGdldFBhZ2VJbmZvLCBleHRyYWN0UGFnZUNvbnRlbnRcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJIYW5kbGVyIH0gZnJvbSAnLi9tZXNzYWdlLWJ1cy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RXh0cmFjdG9ySXNsYW5kKCkge1xuICByZWdpc3RlckhhbmRsZXIoJ2dldFBhZ2VJbmZvJywgKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGdldFBhZ2VJbmZvKCkpKTtcbiAgcmVnaXN0ZXJIYW5kbGVyKCdleHRyYWN0UGFnZUNvbnRlbnQnLCAobXNnKSA9PiBQcm9taXNlLnJlc29sdmUoZXh0cmFjdENvbnRlbnQobXNnLm9wdGlvbnMpKSk7XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQYWdlIERldGVjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuZnVuY3Rpb24gZ2V0UGFnZUluZm8oKSB7XG4gIHJldHVybiB7XG4gICAgaXNDb25mbHVlbmNlOiBkZXRlY3RDb25mbHVlbmNlKCksXG4gICAgaXNKaXJhOiBkZXRlY3RKaXJhKCksXG4gICAgaXNFZGl0aW5nOiBkZXRlY3RFZGl0b3IoKSxcbiAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Q29uZmx1ZW5jZSgpIHtcbiAgcmV0dXJuICEhKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNvbnRlbnQnKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScpIHx8XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLWRlZmF1bHQnKVxuICApO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RKaXJhKCkge1xuICByZXR1cm4gISEoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ppcmEnKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmlzc3VlLWJhc2UuZm91bmRhdGlvbi5zdW1tYXJ5LmhlYWRpbmdcIl0nKSB8fFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmNsdWRlcygnYXRsYXNzaWFuLm5ldCcpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGRldGVjdEVkaXRvcigpIHtcbiAgcmV0dXJuICEhKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuUHJvc2VNaXJyb3InKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55bWNlJylcbiAgKTtcbn1cblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIENvbnRlbnQgRXh0cmFjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuZnVuY3Rpb24gZXh0cmFjdENvbnRlbnQob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgaW5jbHVkZUltYWdlcyA9IHRydWUsIGluY2x1ZGVNZXRhZGF0YSA9IHRydWUsIHNlbGVjdGVkT25seSA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gIGxldCBodG1sID0gJyc7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAoc2VsZWN0ZWRPbmx5ICYmIHNlbGVjdGlvbiAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2UuY2xvbmVDb250ZW50cygpKTtcbiAgICBodG1sID0gY29udGFpbmVyLmlubmVySFRNTDtcbiAgfSBlbHNlIHtcbiAgICBodG1sID0gZXh0cmFjdEZ1bGxDb250ZW50KCk7XG4gIH1cblxuICBjb25zdCBtZXRhZGF0YSA9IGluY2x1ZGVNZXRhZGF0YSA/IGV4dHJhY3RNZXRhZGF0YSgpIDoge307XG4gIC8vIEFsd2F5cyBjb2xsZWN0IGltYWdlIFVSTHMgXHUyMDE0IHRoZSBmbGFnIG9ubHkgY29udHJvbHMgYmFzZTY0IGVtYmVkZGluZyBpbiBwb3B1cFxuICBjb25zdCBpbWFnZVVybHMgPSBjb2xsZWN0SW1hZ2VVcmxzKGh0bWwpO1xuXG4gIHJldHVybiB7IGh0bWwsIG1ldGFkYXRhLCBpbWFnZVVybHMgfTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEZ1bGxDb250ZW50KCkge1xuICAvLyBDb25mbHVlbmNlIENsb3VkXG4gIGNvbnN0IGNvbmZsdWVuY2UgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY29udGVudCcpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpa2ktY29udGVudCcpO1xuICBpZiAoY29uZmx1ZW5jZSkgcmV0dXJuIGNvbmZsdWVuY2UuaW5uZXJIVE1MO1xuXG4gIC8vIEppcmEgZGVzY3JpcHRpb25cbiAgY29uc3QgamlyYURlc2MgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmZpZWxkLnJpY2gtdGV4dC5kZXNjcmlwdGlvblwiXScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uLXZhbCcpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItY29udGVudC1ibG9jaycpO1xuICBpZiAoamlyYURlc2MpIHtcbiAgICBjb25zdCBzdW1tYXJ5ID1cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmlzc3VlLWJhc2UuZm91bmRhdGlvbi5zdW1tYXJ5LmhlYWRpbmdcIl0nKSB8fFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1bW1hcnktdmFsJyk7XG4gICAgY29uc3QgdGl0bGVIdG1sID0gc3VtbWFyeSA/IGA8aDE+JHtlc2NhcGVIdG1sKHN1bW1hcnkudGV4dENvbnRlbnQpfTwvaDE+YCA6ICcnO1xuICAgIHJldHVybiB0aXRsZUh0bWwgKyBqaXJhRGVzYy5pbm5lckhUTUw7XG4gIH1cblxuICAvLyBKaXJhIGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnW2RhdGEtdGVzdGlkPVwiaXNzdWUuYWN0aXZpdHkuY29tbWVudHMtbGlzdFwiXSAudXNlci1jb250ZW50LWJsb2NrLCAuYWN0aXZpdHktY29tbWVudCAuYWN0aW9uLWJvZHknXG4gICk7XG4gIGlmIChjb21tZW50cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIFsuLi5jb21tZW50c10ubWFwKChjKSA9PiBjLmlubmVySFRNTCkuam9pbignXFxuPGhyPlxcbicpO1xuICB9XG5cbiAgLy8gRmFsbGJhY2tcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIm1haW5cIl0nKTtcbiAgcmV0dXJuIG1haW4gPyBtYWluLmlubmVySFRNTCA6ICcnO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0TWV0YWRhdGEoKSB7XG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxuICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgZXhwb3J0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9O1xuXG4gIGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICBzcGFjZUtleTogJ21ldGFbbmFtZT1cImFqcy1zcGFjZS1rZXlcIl0nLFxuICAgIHBhZ2VJZDogJ21ldGFbbmFtZT1cImFqcy1wYWdlLWlkXCJdJyxcbiAgfTtcblxuICBmb3IgKGNvbnN0IFtrZXksIHNlbF0gb2YgT2JqZWN0LmVudHJpZXMoc2VsZWN0b3JzKSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpO1xuICAgIGlmIChlbCkgbWV0YVtrZXldID0gZWwuY29udGVudDtcbiAgfVxuXG4gIGNvbnN0IGF1dGhvciA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtbWV0YWRhdGEtbW9kaWZpY2F0aW9uLWluZm8gLmF1dGhvcicpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwicGFnZS1tZXRhZGF0YS1iYW5uZXItLWxhc3QtbW9kaWZpZWQtYnlcIl0nKTtcbiAgaWYgKGF1dGhvcikgbWV0YS5hdXRob3IgPSBhdXRob3IudGV4dENvbnRlbnQudHJpbSgpO1xuXG4gIGNvbnN0IGxhYmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYWJlbC1saXN0IC5sYWJlbCwgW2RhdGEtdGVzdGlkPVwibGFiZWxcIl0nKTtcbiAgaWYgKGxhYmVscy5sZW5ndGggPiAwKSBtZXRhLmxhYmVscyA9IFsuLi5sYWJlbHNdLm1hcCgobCkgPT4gbC50ZXh0Q29udGVudC50cmltKCkpO1xuXG4gIGNvbnN0IGlzc3VlS2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuaXNzdWUtYmFzZS5mb3VuZGF0aW9uLmJyZWFkY3J1bWJzLmN1cnJlbnQtaXNzdWUuaXRlbVwiXSwgI2tleS12YWwnXG4gICk7XG4gIGlmIChpc3N1ZUtleSkgbWV0YS5pc3N1ZUtleSA9IGlzc3VlS2V5LnRleHRDb250ZW50LnRyaW0oKTtcblxuICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICdbZGF0YS10ZXN0aWQ9XCJpc3N1ZS52aWV3cy5pc3N1ZS1iYXNlLmZvdW5kYXRpb24uc3RhdHVzLnN0YXR1cy1maWVsZC13cmFwcGVyXCJdJ1xuICApO1xuICBpZiAoc3RhdHVzKSBtZXRhLnN0YXR1cyA9IHN0YXR1cy50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgcmV0dXJuIG1ldGE7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RJbWFnZVVybHMoaHRtbCkge1xuICBpZiAoIWh0bWwpIHJldHVybiBbXTtcbiAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKTtcbiAgY29uc3QgdXJscyA9IG5ldyBTZXQoKTtcblxuICAvLyAxLiBTdGFuZGFyZCA8aW1nPiB0YWdzXG4gIGZvciAoY29uc3QgaW1nIG9mIGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSkge1xuICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmIChzcmMgJiYgIXNyYy5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICB1cmxzLmFkZChzcmMpO1xuICAgIH1cbiAgICAvLyBBbHNvIGNoZWNrIGRhdGEtc3JjIChsYXp5LWxvYWRlZCBpbWFnZXMpXG4gICAgY29uc3QgZGF0YVNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG4gICAgaWYgKGRhdGFTcmMgJiYgIWRhdGFTcmMuc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgdXJscy5hZGQoZGF0YVNyYyk7XG4gICAgfVxuICB9XG5cbiAgLy8gMi4gQ29uZmx1ZW5jZSBtZWRpYVNpbmdsZSBpbWFnZSBub2RlcyB0aGF0IG1heSB1c2UgYmFja2dyb3VuZC1pbWFnZSBvclxuICAvLyAgICBoYXZlIHNyYyBvbiBub24taW1nIGVsZW1lbnRzIChlLmcuIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOnVybCguLi4pXCI+KVxuICBmb3IgKGNvbnN0IG1lZGlhIG9mIGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVNpbmdsZVwiXSwgW2RhdGEtbm9kZS10eXBlPVwibWVkaWFcIl0nKSkge1xuICAgIC8vIENoZWNrIGZvciBpbWcgaW5zaWRlIChtYXkgYWxyZWFkeSBiZSBjb2xsZWN0ZWQgYWJvdmUpXG4gICAgY29uc3QgaW1nID0gbWVkaWEucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICAgIGlmIChzcmMgJiYgIXNyYy5zdGFydHNXaXRoKCdkYXRhOicpICYmICF1cmxzLmhhcyhzcmMpKSB7XG4gICAgICAgIHVybHMuYWRkKHNyYyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIENoZWNrIGZvciBlbGVtZW50cyB3aXRoIHNyYyBhdHRyaWJ1dGUgdGhhdCBhcmVuJ3QgaW1nL3ZpZGVvXG4gICAgZm9yIChjb25zdCBlbCBvZiBtZWRpYS5xdWVyeVNlbGVjdG9yQWxsKCdbc3JjXScpKSB7XG4gICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1ZJREVPJyB8fCBlbC50YWdOYW1lID09PSAnU09VUkNFJykgY29udGludWU7XG4gICAgICBjb25zdCBzcmMgPSBlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgaWYgKHNyYyAmJiAhc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykgJiYgIXVybHMuaGFzKHNyYykpIHtcbiAgICAgICAgdXJscy5hZGQoc3JjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gWy4uLnVybHNdO1xufVxuXG4vKipcbiAqIFJlcXVlc3QgbWF4IHJlc29sdXRpb24gZnJvbSBBdGxhc3NpYW4gbWVkaWEgQ0ROIGJ5IGFkanVzdGluZyBVUkwgcGFyYW1zLlxuICovXG5mdW5jdGlvbiB1cGdyYWRlQXRsYXNzaWFuTWVkaWFVcmwodXJsKSB7XG4gIGlmICghdXJsLmluY2x1ZGVzKCdtZWRpYS1jZG4uYXRsYXNzaWFuLmNvbScpICYmICF1cmwuaW5jbHVkZXMoJ21lZGlhLmF0bGFzc2lhbi5jb20nKSkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBuZXcgVVJMKHVybCk7XG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ3dpZHRoJywgJzQwOTYnKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnaGVpZ2h0JywgJzQwOTYnKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnbW9kZScsICdmdWxsLWZpdCcpO1xuICAgIHJldHVybiBwYXJzZWQudG9TdHJpbmcoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xuICByZXR1cm4gZGl2LmlubmVySFRNTDtcbn1cbiIsICIvKipcbiAqIE5vdGlmaWNhdGlvbiBJc2xhbmQgKHNoYXJlZCB1dGlsaXR5KVxuICogVmlzdWFsIHRvYXN0IG5vdGlmaWNhdGlvbnMgZm9yIGtleWJvYXJkIHNob3J0Y3V0IC8gY29udGV4dCBtZW51IGFjdGlvbnMuXG4gKi9cblxuY29uc3QgTk9USUZJQ0FUSU9OX0lEID0gJ3dpa2ktbWQtbm90aWZpY2F0aW9uJztcbmNvbnN0IERJU1BMQVlfTVMgPSAyMDAwO1xuY29uc3QgRkFERV9NUyA9IDMwMDtcblxuLyoqXG4gKiBTaG93IGEgdG9hc3Qgbm90aWZpY2F0aW9uIG9uIHRoZSBjdXJyZW50IHBhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHtib29sZWFufSBbaXNFcnJvcj1mYWxzZV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dOb3RpZmljYXRpb24odGV4dCwgaXNFcnJvciA9IGZhbHNlKSB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoTk9USUZJQ0FUSU9OX0lEKTtcbiAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTtcblxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbC5pZCA9IE5PVElGSUNBVElPTl9JRDtcbiAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHtcbiAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICB0b3A6ICcxNnB4JyxcbiAgICByaWdodDogJzE2cHgnLFxuICAgIHBhZGRpbmc6ICcxMHB4IDE4cHgnLFxuICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgZm9udFNpemU6ICcxM3B4JyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICB6SW5kZXg6ICc5OTk5OTknLFxuICAgIGJhY2tncm91bmQ6IGlzRXJyb3IgPyAnI2RlMzUwYicgOiAnIzAwODc1YScsXG4gICAgY29sb3I6ICd3aGl0ZScsXG4gICAgYm94U2hhZG93OiAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMiknLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MnLFxuICAgIGZvbnRGYW1pbHk6ICctYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWYnLFxuICB9KTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gZWwucmVtb3ZlKCksIEZBREVfTVMpO1xuICB9LCBESVNQTEFZX01TKTtcbn1cbiIsICIvKipcbiAqIEluc2VydGVyIElzbGFuZFxuICogUmVzcG9uc2libGUgZm9yIGluc2VydGluZyBjb250ZW50IGludG8gSmlyYS9Db25mbHVlbmNlIGVkaXRvcnMuXG4gKiBEZXRlY3RzIGVkaXRvciB0eXBlIGFuZCB1c2VzIGFwcHJvcHJpYXRlIGluc2VydGlvbiBzdHJhdGVneS5cbiAqXG4gKiBIYW5kbGVzOiBpbnNlcnRNYXJrZG93blRvSmlyYSwgaW5zZXJ0RnJvbUNsaXBib2FyZFxuICovXG5pbXBvcnQgeyByZWdpc3RlckhhbmRsZXIgfSBmcm9tICcuL21lc3NhZ2UtYnVzLmpzJztcbmltcG9ydCB7IHNob3dOb3RpZmljYXRpb24gfSBmcm9tICcuL25vdGlmaWNhdGlvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0SW5zZXJ0ZXJJc2xhbmQoKSB7XG4gIHJlZ2lzdGVySGFuZGxlcignaW5zZXJ0TWFya2Rvd25Ub0ppcmEnLCAobXNnKSA9PlxuICAgIFByb21pc2UucmVzb2x2ZShpbnNlcnRUb0VkaXRvcihtc2cuamlyYU1hcmt1cCwgbXNnLmh0bWwpKVxuICApO1xuICByZWdpc3RlckhhbmRsZXIoJ2luc2VydEZyb21DbGlwYm9hcmQnLCAoKSA9PiBoYW5kbGVJbnNlcnRGcm9tQ2xpcGJvYXJkKCkpO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgRWRpdG9yIERldGVjdGlvbiAmIEluc2VydGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuLyoqXG4gKiBJbnNlcnQgY29udGVudCBpbnRvIHRoZSBhY3RpdmUgZWRpdG9yLlxuICogVXNlcyBzdHJhdGVneSBzZWxlY3Rpb24gYmFzZWQgb24gZGV0ZWN0ZWQgZWRpdG9yIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGluc2VydFRvRWRpdG9yKGppcmFNYXJrdXAsIGh0bWwpIHtcbiAgLy8gU3RyYXRlZ3kgMTogUHJvc2VNaXJyb3IgKEppcmEgQ2xvdWQgLyBDb25mbHVlbmNlIENsb3VkIG5ldyBlZGl0b3IpXG4gIGNvbnN0IHByb3NlTWlycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlByb3NlTWlycm9yW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nKTtcbiAgaWYgKHByb3NlTWlycm9yKSB7XG4gICAgcmV0dXJuIGluc2VydFZpYVByb3NlTWlycm9yKHByb3NlTWlycm9yLCBodG1sLCBqaXJhTWFya3VwKTtcbiAgfVxuXG4gIC8vIFN0cmF0ZWd5IDI6IFRpbnlNQ0UgKENvbmZsdWVuY2UgbGVnYWN5IGVkaXRvcilcbiAgY29uc3QgdGlueW1jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55bWNlLCAubWNlLWNvbnRlbnQtYm9keScpO1xuICBpZiAodGlueW1jZSkge1xuICAgIHJldHVybiBpbnNlcnRWaWFUaW55TUNFKGh0bWwpO1xuICB9XG5cbiAgLy8gU3RyYXRlZ3kgMzogUGxhaW4gdGV4dGFyZWEgKGZhbGxiYWNrKVxuICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJ3RleHRhcmVhW25hbWU9XCJkZXNjcmlwdGlvblwiXSwgdGV4dGFyZWFbbmFtZT1cImNvbW1lbnRcIl0sIHRleHRhcmVhLndpa2ktZWRpdCdcbiAgKTtcbiAgaWYgKHRleHRhcmVhKSB7XG4gICAgdGV4dGFyZWEudmFsdWUgPSBqaXJhTWFya3VwO1xuICAgIHRleHRhcmVhLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiAndGV4dGFyZWEnIH07XG4gIH1cblxuICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBlZGl0YWJsZSBmaWVsZCBmb3VuZC4gUGxlYXNlIG9wZW4gYW4gZWRpdG9yIGZpcnN0LicgfTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0VmlhUHJvc2VNaXJyb3IoZWRpdG9yLCBodG1sLCBqaXJhTWFya3VwKSB7XG4gIHRyeSB7XG4gICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWRpdG9yKTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcblxuICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBuZXcgRGF0YVRyYW5zZmVyKCk7XG4gICAgY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L2h0bWwnLCBodG1sKTtcbiAgICBjbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCBqaXJhTWFya3VwKTtcblxuICAgIGNvbnN0IHBhc3RlRXZlbnQgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJywge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjbGlwYm9hcmREYXRhLFxuICAgIH0pO1xuXG4gICAgZWRpdG9yLmRpc3BhdGNoRXZlbnQocGFzdGVFdmVudCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiAncHJvc2VtaXJyb3ItcGFzdGUnIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGUubWVzc2FnZSB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGluc2VydFZpYVRpbnlNQ0UoaHRtbCkge1xuICB0cnkge1xuICAgIGlmICh3aW5kb3cudGlueW1jZSAmJiB3aW5kb3cudGlueW1jZS5hY3RpdmVFZGl0b3IpIHtcbiAgICAgIHdpbmRvdy50aW55bWNlLmFjdGl2ZUVkaXRvci5zZXRDb250ZW50KGh0bWwpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiAndGlueW1jZScgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVGlueU1DRSBub3QgYWNjZXNzaWJsZScgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlSW5zZXJ0RnJvbUNsaXBib2FyZCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBtZCA9IGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKTtcbiAgICBpZiAoIW1kIHx8ICFtZC50cmltKCkpIHtcbiAgICAgIHNob3dOb3RpZmljYXRpb24oJ0NsaXBib2FyZCBpcyBlbXB0eScsIHRydWUpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UgfTtcbiAgICB9XG4gICAgY29uc3QgZXNjRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXNjRGl2LnRleHRDb250ZW50ID0gbWQ7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5zZXJ0VG9FZGl0b3IobWQsIGA8cHJlPiR7ZXNjRGl2LmlubmVySFRNTH08L3ByZT5gKTtcbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHNob3dOb3RpZmljYXRpb24oJ0luc2VydGVkIGZyb20gY2xpcGJvYXJkIScpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaG93Tm90aWZpY2F0aW9uKCdJbnNlcnQgZmFpbGVkOiAnICsgZS5tZXNzYWdlLCB0cnVlKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGUubWVzc2FnZSB9O1xuICB9XG59XG4iLCAiLyoqXG4gKiBIVE1MIEV4cG9ydGVyIElzbGFuZFxuICogUmVzcG9uc2libGUgZm9yIGV4cG9ydGluZyB0aGUgY3VycmVudCBwYWdlIGFzIGEgc2VsZi1jb250YWluZWQgSFRNTCBmaWxlLlxuICogSW5saW5lcyBDU1Mgc3R5bGVzaGVldHMgYW5kIGltYWdlcyAodmlhIGJhY2tncm91bmQgc2NyaXB0KS5cbiAqXG4gKiBIYW5kbGVzOiBleHBvcnRTaW5nbGVIdG1sXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVySGFuZGxlciwgc2VuZFRvQmFja2dyb3VuZCB9IGZyb20gJy4vbWVzc2FnZS1idXMuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEh0bWxFeHBvcnRlcklzbGFuZCgpIHtcbiAgcmVnaXN0ZXJIYW5kbGVyKCdleHBvcnRTaW5nbGVIdG1sJywgKG1zZykgPT4gZXhwb3J0U2luZ2xlSHRtbChtc2cub3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBleHBvcnRTaW5nbGVIdG1sKG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IGlubGluZUltYWdlcyA9IHRydWUgfSA9IG9wdGlvbnM7XG5cbiAgdHJ5IHtcbiAgICAvLyAxLiBJZGVudGlmeSBhbmQgY2xvbmUgdGFyZ2V0IGNvbnRlbnRcbiAgICBjb25zdCBjb250ZW50RWwgPSBmaW5kQ29udGVudEVsZW1lbnQoKTtcbiAgICBjb25zdCBjbG9uZSA9IGNvbnRlbnRFbC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAvLyAyLiBDb2xsZWN0IGFuZCBpbmxpbmUgc3R5bGVzaGVldHNcbiAgICBjb25zdCBpbmxpbmVkU3R5bGVzID0gYXdhaXQgY29sbGVjdFN0eWxlcygpO1xuXG4gICAgLy8gMy4gSGFuZGxlIGltYWdlczogaW5saW5lIGFzIGJhc2U2NCBvciBsb2NhbGl6ZSB0byByZWxhdGl2ZSBwYXRoc1xuICAgIGxldCBpbWFnZUNvdW50ID0gMDtcbiAgICBsZXQgaW1hZ2VGaWxlcyA9IFtdO1xuICAgIGlmIChpbmxpbmVJbWFnZXMpIHtcbiAgICAgIGltYWdlQ291bnQgPSBhd2FpdCBpbmxpbmVJbWFnZXNJbkNsb25lKGNsb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1hZ2VGaWxlcyA9IGxvY2FsaXplSW1hZ2VzSW5DbG9uZShjbG9uZSk7XG4gICAgICBpbWFnZUNvdW50ID0gaW1hZ2VGaWxlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gNC4gUmVwbGFjZSB2aWRlb3Mgd2l0aCBIVE1MNSA8dmlkZW8+IHRhZ3MgcG9pbnRpbmcgdG8gbG9jYWwgcmVsYXRpdmUgcGF0aHNcbiAgICBjb25zdCBsb2NhbE1lZGlhID0gcmVwbGFjZVZpZGVvc1dpdGhMb2NhbChjbG9uZSk7XG5cbiAgICAvLyA1LiBSZXBsYWNlIG5vbi1wcmV2aWV3YWJsZSBmaWxlIGxpbmtzIHdpdGggbG9jYWwgcmVsYXRpdmUgcGF0aHNcbiAgICByZXBsYWNlRmlsZUxpbmtzV2l0aExvY2FsKGNsb25lLCBsb2NhbE1lZGlhKTtcblxuICAgIC8vIDYuIFN0cmlwIHNjcmlwdHMgZm9yIHNlY3VyaXR5XG4gICAgZm9yIChjb25zdCBzY3JpcHQgb2YgY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0JykpIHtcbiAgICAgIHNjcmlwdC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyA3LiBBc3NlbWJsZSBzZWxmLWNvbnRhaW5lZCBIVE1MXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC50aXRsZTtcbiAgICBjb25zdCBlc2NUaXRsZSA9IGVzY2FwZUh0bWwodGl0bGUpO1xuICAgIGNvbnN0IGVzY1VybCA9IGVzY2FwZUh0bWwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBbXG4gICAgICAnPCFET0NUWVBFIGh0bWw+JyxcbiAgICAgIGA8aHRtbCBsYW5nPVwiJHtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCAnZW4nfVwiPmAsXG4gICAgICAnPGhlYWQ+JyxcbiAgICAgICcgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPicsXG4gICAgICAnICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPicsXG4gICAgICBgICA8dGl0bGU+JHtlc2NUaXRsZX08L3RpdGxlPmAsXG4gICAgICAnICA8bWV0YSBuYW1lPVwiZ2VuZXJhdG9yXCIgY29udGVudD1cIldpa2lcdTIxOTRNYXJrZG93biBFeHRlbnNpb25cIj4nLFxuICAgICAgYCAgPG1ldGEgbmFtZT1cInNvdXJjZS11cmxcIiBjb250ZW50PVwiJHtlc2NVcmx9XCI+YCxcbiAgICAgIGAgIDxtZXRhIG5hbWU9XCJleHBvcnQtZGF0ZVwiIGNvbnRlbnQ9XCIke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1cIj5gLFxuICAgICAgJyAgPHN0eWxlPicsXG4gICAgICBpbmxpbmVkU3R5bGVzLFxuICAgICAgTElHSFRCT1hfU1RZTEVTLFxuICAgICAgJyAgPC9zdHlsZT4nLFxuICAgICAgJzwvaGVhZD4nLFxuICAgICAgJzxib2R5PicsXG4gICAgICBgICAke2Nsb25lLm91dGVySFRNTH1gLFxuICAgICAgTElHSFRCT1hfSFRNTCxcbiAgICAgIExJR0hUQk9YX1NDUklQVCxcbiAgICAgICc8L2JvZHk+JyxcbiAgICAgICc8L2h0bWw+JyxcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBodG1sOiBodG1sQ29udGVudCxcbiAgICAgIHRpdGxlLFxuICAgICAgaW1hZ2VDb3VudCxcbiAgICAgIHNpemU6IGh0bWxDb250ZW50Lmxlbmd0aCxcbiAgICAgIGxvY2FsTWVkaWEsIC8vIGZpbGVzIHRoYXQgbmVlZCB0byBiZSBkb3dubG9hZGVkIGFsb25nc2lkZSB0aGUgSFRNTFxuICAgICAgaW1hZ2VGaWxlcywgLy8gaW1hZ2VzIHRvIGRvd25sb2FkIHdoZW4gbm90IGlubGluZWQgKGVtcHR5IHdoZW4gaW5saW5lSW1hZ2VzPXRydWUpXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZS5tZXNzYWdlIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZENvbnRlbnRFbGVtZW50KCkge1xuICBjb25zdCBzZWxlY3RvcnMgPSBbXG4gICAgJ1tkYXRhLXRlc3RpZD1cInBhZ2UtY29udGVudFwiXScsXG4gICAgJyNtYWluLWNvbnRlbnQnLFxuICAgICcud2lraS1jb250ZW50JyxcbiAgICAnW2RhdGEtdGVzdGlkPVwiaXNzdWUudmlld3MuZmllbGQucmljaC10ZXh0LmRlc2NyaXB0aW9uXCJdJyxcbiAgICAnI2Rlc2NyaXB0aW9uLXZhbCcsXG4gICAgJ21haW4nLFxuICAgICdib2R5JyxcbiAgXTtcbiAgZm9yIChjb25zdCBzZWwgb2Ygc2VsZWN0b3JzKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XG4gICAgaWYgKGVsKSByZXR1cm4gZWw7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3RTdHlsZXMoKSB7XG4gIGNvbnN0IHN0eWxlQ2h1bmtzID0gW107XG4gIGZvciAoY29uc3Qgc2hlZXQgb2YgZG9jdW1lbnQuc3R5bGVTaGVldHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcnVsZXMgPSBbLi4uc2hlZXQuY3NzUnVsZXNdLm1hcCgocikgPT4gci5jc3NUZXh0KS5qb2luKCdcXG4nKTtcbiAgICAgIHN0eWxlQ2h1bmtzLnB1c2gocnVsZXMpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgaWYgKHNoZWV0LmhyZWYpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goc2hlZXQuaHJlZik7XG4gICAgICAgICAgaWYgKHJlc3Aub2spIHN0eWxlQ2h1bmtzLnB1c2goYXdhaXQgcmVzcC50ZXh0KCkpO1xuICAgICAgICB9IGNhdGNoIHsgLyogdW5yZWFjaGFibGUgc3R5bGVzaGVldCAqLyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZUNodW5rcy5qb2luKCdcXG5cXG4nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5saW5lSW1hZ2VzSW5DbG9uZShjbG9uZSkge1xuICBjb25zdCBpbWdzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG5cbiAgLy8gQ29sbGVjdCBhbGwgdW5pcXVlIFVSTHM6IHByZWZlciBoaWdoZXN0IHJlc29sdXRpb24gZnJvbSBzcmNzZXQsIGZhbGxiYWNrIHRvIHNyY1xuICBjb25zdCB1cmxTZXQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IGltZ1VybE1hcCA9IG5ldyBNYXAoKTsgLy8gaW1nIGVsZW1lbnQgXHUyMTkyIGJlc3QgVVJMIHRvIGZldGNoXG5cbiAgZm9yIChjb25zdCBpbWcgb2YgaW1ncykge1xuICAgIGxldCBiZXN0VXJsID0gZ2V0SGlnaGVzdFJlc1NyYyhpbWcpO1xuICAgIC8vIEZhbGxiYWNrIHRvIGRhdGEtc3JjIGZvciBsYXp5LWxvYWRlZCBpbWFnZXNcbiAgICBpZiAoKCFiZXN0VXJsIHx8IGJlc3RVcmwuc3RhcnRzV2l0aCgnZGF0YTonKSkgJiYgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSkge1xuICAgICAgYmVzdFVybCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG4gICAgfVxuICAgIGlmIChiZXN0VXJsICYmICFiZXN0VXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIHVybFNldC5hZGQoYmVzdFVybCk7XG4gICAgICBpbWdVcmxNYXAuc2V0KGltZywgYmVzdFVybCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXJscyA9IFsuLi51cmxTZXRdO1xuICBpZiAodXJscy5sZW5ndGggPT09IDApIHJldHVybiAwO1xuXG4gIGNvbnN0IGltYWdlTWFwID0gYXdhaXQgc2VuZFRvQmFja2dyb3VuZCh7XG4gICAgdHlwZTogJ2ZldGNoSW1hZ2VzQXNCYXNlNjQnLFxuICAgIHVybHMsXG4gIH0pO1xuXG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICBjb25zdCBiZXN0VXJsID0gaW1nVXJsTWFwLmdldChpbWcpO1xuICAgIGlmIChiZXN0VXJsICYmIGltYWdlTWFwW2Jlc3RVcmxdICYmIGltYWdlTWFwW2Jlc3RVcmxdLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlTWFwW2Jlc3RVcmxdKTtcbiAgICAgIC8vIFJlbW92ZSBzcmNzZXQgdG8gcHJldmVudCBicm93c2VyIGZyb20gdXNpbmcgZXh0ZXJuYWwgVVJMc1xuICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBSZXdyaXRlIDxpbWcgc3JjPiBpbiBjbG9uZSB0byBsb2NhbCByZWxhdGl2ZSBwYXRocyAoaW1hZ2VzL2ltZzAxLnBuZykuXG4gKiBSZXR1cm5zIGFycmF5IG9mIHsgdXJsLCBsb2NhbFBhdGgsIGZpbGVuYW1lIH0gZm9yIHBvcHVwIHRvIGRvd25sb2FkLlxuICogTWlycm9ycyBpbmxpbmVJbWFnZXNJbkNsb25lJ3MgVVJMIHJlc29sdXRpb24gYnV0IHdpdGhvdXQgZmV0Y2hpbmcuXG4gKi9cbmZ1bmN0aW9uIGxvY2FsaXplSW1hZ2VzSW5DbG9uZShjbG9uZSkge1xuICBjb25zdCBpbWdzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG4gIGNvbnN0IGltYWdlRmlsZXMgPSBbXTtcbiAgY29uc3QgdXJsU2V0ID0gbmV3IFNldCgpO1xuICBjb25zdCBpbWdVcmxNYXAgPSBuZXcgTWFwKCk7XG5cbiAgZm9yIChjb25zdCBpbWcgb2YgaW1ncykge1xuICAgIGxldCBiZXN0VXJsID0gZ2V0SGlnaGVzdFJlc1NyYyhpbWcpO1xuICAgIGlmICgoIWJlc3RVcmwgfHwgYmVzdFVybC5zdGFydHNXaXRoKCdkYXRhOicpKSAmJiBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKSB7XG4gICAgICBiZXN0VXJsID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICB9XG4gICAgaWYgKGJlc3RVcmwgJiYgIWJlc3RVcmwuc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgdXJsU2V0LmFkZChiZXN0VXJsKTtcbiAgICAgIGltZ1VybE1hcC5zZXQoaW1nLCBiZXN0VXJsKTtcbiAgICB9XG4gIH1cblxuICBpZiAodXJsU2V0LnNpemUgPT09IDApIHJldHVybiBpbWFnZUZpbGVzO1xuXG4gIC8vIEJ1aWxkIFVSTFx1MjE5MmxvY2FsUGF0aCBtYXBwaW5nXG4gIGNvbnN0IHVybFRvTG9jYWwgPSBuZXcgTWFwKCk7XG4gIGxldCBpZHggPSAwO1xuICBmb3IgKGNvbnN0IHVybCBvZiB1cmxTZXQpIHtcbiAgICBpZHgrKztcbiAgICBjb25zdCBpbWdOYW1lID0gYGltZyR7U3RyaW5nKGlkeCkucGFkU3RhcnQoMiwgJzAnKX0ucG5nYDtcbiAgICBjb25zdCBsb2NhbFBhdGggPSBgaW1hZ2VzLyR7aW1nTmFtZX1gO1xuICAgIHVybFRvTG9jYWwuc2V0KHVybCwgeyBsb2NhbFBhdGgsIGZpbGVuYW1lOiBpbWdOYW1lIH0pO1xuICAgIGltYWdlRmlsZXMucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyh1cmwpLFxuICAgICAgbG9jYWxQYXRoLFxuICAgICAgZmlsZW5hbWU6IGltZ05hbWUsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUmV3cml0ZSBpbWcgc3JjIHRvIGxvY2FsIHBhdGhzXG4gIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICBjb25zdCBiZXN0VXJsID0gaW1nVXJsTWFwLmdldChpbWcpO1xuICAgIGlmIChiZXN0VXJsICYmIHVybFRvTG9jYWwuaGFzKGJlc3RVcmwpKSB7XG4gICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmxUb0xvY2FsLmdldChiZXN0VXJsKS5sb2NhbFBhdGgpO1xuICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGltYWdlRmlsZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCB0aGUgaGlnaGVzdCByZXNvbHV0aW9uIGltYWdlIFVSTCBmcm9tIGFuIDxpbWc+IGVsZW1lbnQuXG4gKiBTdHJhdGVneTpcbiAqIDEuIFBpY2sgaGlnaGVzdCBtdWx0aXBsaWVyIGZyb20gc3Jjc2V0ICgyeCA+IDF4KVxuICogMi4gRm9yIEF0bGFzc2lhbiBtZWRpYSBDRE4gVVJMcywgcmVxdWVzdCBtYXggcmVzb2x1dGlvbiBieVxuICogICAgcmVtb3Zpbmcgd2lkdGgvaGVpZ2h0IGNvbnN0cmFpbnRzXG4gKi9cbmZ1bmN0aW9uIGdldEhpZ2hlc3RSZXNTcmMoaW1nKSB7XG4gIGxldCBiZXN0VXJsID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgLy8gQ2hlY2sgc3Jjc2V0IGZvciBoaWdoZXIgcmVzb2x1dGlvbiB2YXJpYW50c1xuICBjb25zdCBzcmNzZXQgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmNzZXQnKTtcbiAgaWYgKHNyY3NldCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSBzcmNzZXQuc3BsaXQoJywnKS5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXJ0cyA9IGVudHJ5LnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgcmV0dXJuIHsgdXJsOiBwYXJ0c1swXSwgbXVsdGlwbGllcjogcGFyc2VGbG9hdChwYXJ0c1sxXSkgfHwgMSB9O1xuICAgIH0pO1xuICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4gYi5tdWx0aXBsaWVyIC0gYS5tdWx0aXBsaWVyKTtcbiAgICBpZiAoZW50cmllcy5sZW5ndGggPiAwICYmIGVudHJpZXNbMF0udXJsKSB7XG4gICAgICBiZXN0VXJsID0gZW50cmllc1swXS51cmw7XG4gICAgfVxuICB9XG5cbiAgLy8gRm9yIEF0bGFzc2lhbiBtZWRpYSBDRE46IHJlcXVlc3Qgb3JpZ2luYWwvbWF4IHJlc29sdXRpb25cbiAgaWYgKGJlc3RVcmwpIHtcbiAgICBiZXN0VXJsID0gdXBncmFkZUF0bGFzc2lhbk1lZGlhVXJsKGJlc3RVcmwpO1xuICB9XG5cbiAgcmV0dXJuIGJlc3RVcmw7XG59XG5cbi8qKlxuICogVXBncmFkZSBBdGxhc3NpYW4gbWVkaWEgQ0ROIFVSTHMgdG8gcmVxdWVzdCBtYXhpbXVtIHJlc29sdXRpb24uXG4gKiBtZWRpYS1jZG4uYXRsYXNzaWFuLmNvbSBVUkxzIGFjY2VwdCB3aWR0aC9oZWlnaHQgcGFyYW1zIHRoYXQgbGltaXQgb3V0cHV0LlxuICogQnkgc2V0dGluZyBsYXJnZSB2YWx1ZXMgYW5kIG1vZGU9ZnVsbC1maXQsIHdlIGdldCB0aGUgb3JpZ2luYWwgaW1hZ2UuXG4gKi9cbmZ1bmN0aW9uIHVwZ3JhZGVBdGxhc3NpYW5NZWRpYVVybCh1cmwpIHtcbiAgaWYgKCF1cmwuaW5jbHVkZXMoJ21lZGlhLWNkbi5hdGxhc3NpYW4uY29tJykgJiYgIXVybC5pbmNsdWRlcygnbWVkaWEuYXRsYXNzaWFuLmNvbScpKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZCA9IG5ldyBVUkwodXJsKTtcbiAgICAvLyBSZXF1ZXN0IG1heGltdW0gcmVzb2x1dGlvblxuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCd3aWR0aCcsICc0MDk2Jyk7XG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ2hlaWdodCcsICc0MDk2Jyk7XG4gICAgcGFyc2VkLnNlYXJjaFBhcmFtcy5zZXQoJ21vZGUnLCAnZnVsbC1maXQnKTtcbiAgICByZXR1cm4gcGFyc2VkLnRvU3RyaW5nKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIFZpZGVvICYgZmlsZSBsaW5rIGxvY2FsaXphdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuLyoqXG4gKiBSZXBsYWNlIDx2aWRlbz4gZWxlbWVudHMgYW5kIHZpZGVvLWxpa2UgbWVkaWEgY2FyZHMgd2l0aCBIVE1MNSA8dmlkZW8+IHRhZ3NcbiAqIHBvaW50aW5nIHRvIGxvY2FsIHJlbGF0aXZlIHBhdGhzLiBSZXR1cm5zIGxpc3Qgb2YgbWVkaWEgdG8gZG93bmxvYWQuXG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2VWaWRlb3NXaXRoTG9jYWwoY2xvbmUpIHtcbiAgY29uc3QgbWVkaWEgPSBbXTsgLy8geyB1cmwsIGxvY2FsUGF0aCwgZmlsZW5hbWUsIHR5cGUgfVxuICBsZXQgdmlkZW9JZHggPSAwO1xuXG4gIC8vIEhhbmRsZSA8dmlkZW8+IHRhZ3NcbiAgY29uc3QgdmlkZW9zID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKTtcbiAgZm9yIChjb25zdCB2aWRlbyBvZiB2aWRlb3MpIHtcbiAgICBjb25zdCBzcmMgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8XG4gICAgICB2aWRlby5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKT8uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICBpZiAoIXNyYyB8fCBzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSkgY29udGludWU7XG5cbiAgICB2aWRlb0lkeCsrO1xuICAgIGNvbnN0IG5hbWUgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1tZWRpYS1uYW1lJykgfHxcbiAgICAgIHZpZGVvLmdldEF0dHJpYnV0ZSgnZGF0YS1tZWRpYS1uYW1lJykgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZUZyb21Vcmwoc3JjKSB8fFxuICAgICAgYHZpZGVvXyR7U3RyaW5nKHZpZGVvSWR4KS5wYWRTdGFydCgyLCAnMCcpfS5tcDRgO1xuICAgIGNvbnN0IGxvY2FsUGF0aCA9IGB2aWRlb3MvJHtuYW1lfWA7XG5cbiAgICAvLyBSZXBsYWNlIHdpdGggY2xlYW4gSFRNTDUgdmlkZW8gcGxheWVyXG4gICAgY29uc3QgbmV3VmlkZW8gPSBjbG9uZS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbmV3VmlkZW8uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnLCAnbWV0YWRhdGEnKTtcbiAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxvY2FsUGF0aCk7XG4gICAgbmV3VmlkZW8uc3R5bGUuY3NzVGV4dCA9ICdtYXgtd2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjZweDsnO1xuICAgIGlmICh2aWRlby5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpKSB7XG4gICAgICBuZXdWaWRlby5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHZpZGVvLmdldEF0dHJpYnV0ZSgncG9zdGVyJykpO1xuICAgIH1cbiAgICB2aWRlby5yZXBsYWNlV2l0aChuZXdWaWRlbyk7XG5cbiAgICBtZWRpYS5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKHVwZ3JhZGVBdGxhc3NpYW5NZWRpYVVybChzcmMpKSxcbiAgICAgIGxvY2FsUGF0aCxcbiAgICAgIGZpbGVuYW1lOiBuYW1lLFxuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBDb25mbHVlbmNlIHZpZGVvIGNhcmRzIChkaXYgd3JhcHBlcnMgdGhhdCBjb250YWluIHZpZGVvIHBsYXllcnMpXG4gIC8vIE5PVEU6IFtkYXRhLW5vZGUtdHlwZT1cIm1lZGlhU2luZ2xlXCJdIHdyYXBzIEFMTCBtZWRpYSAoaW1hZ2VzICsgdmlkZW9zKS5cbiAgLy8gV2UgbXVzdCBza2lwIGNhcmRzIHRoYXQgY29udGFpbiA8aW1nPiBcdTIwMTQgdGhvc2UgYXJlIGltYWdlcywgbm90IHZpZGVvcy5cbiAgY29uc3QgdmlkZW9DYXJkcyA9IGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tkYXRhLXRlc3RpZCo9XCJtZWRpYVwiXVtkYXRhLXR5cGU9XCJ2aWRlb1wiXSwgW2RhdGEtbm9kZS10eXBlPVwibWVkaWFTaW5nbGVcIl0nXG4gICk7XG4gIGZvciAoY29uc3QgY2FyZCBvZiB2aWRlb0NhcmRzKSB7XG4gICAgY29uc3QgaW5uZXJWaWRlbyA9IGNhcmQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICBpZiAoaW5uZXJWaWRlbykgY29udGludWU7IC8vIGFscmVhZHkgaGFuZGxlZCBhYm92ZVxuICAgIC8vIFNraXAgaW1hZ2Ugbm9kZXMgXHUyMDE0IHRoZXNlIGFyZSBoYW5kbGVkIGJ5IGlubGluZUltYWdlc0luQ2xvbmVcbiAgICBpZiAoY2FyZC5xdWVyeVNlbGVjdG9yKCdpbWcnKSkgY29udGludWU7XG4gICAgY29uc3Qgc3JjID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbc3JjXScpPy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmICghc3JjKSBjb250aW51ZTtcblxuICAgIHZpZGVvSWR4Kys7XG4gICAgY29uc3QgbmFtZSA9IGNhcmQuZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lRnJvbVVybChzcmMpIHx8XG4gICAgICBgdmlkZW9fJHtTdHJpbmcodmlkZW9JZHgpLnBhZFN0YXJ0KDIsICcwJyl9Lm1wNGA7XG4gICAgY29uc3QgbG9jYWxQYXRoID0gYHZpZGVvcy8ke25hbWV9YDtcblxuICAgIGNvbnN0IG5ld1ZpZGVvID0gY2xvbmUub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIG5ld1ZpZGVvLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgbmV3VmlkZW8uc2V0QXR0cmlidXRlKCdwcmVsb2FkJywgJ21ldGFkYXRhJyk7XG4gICAgbmV3VmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsb2NhbFBhdGgpO1xuICAgIG5ld1ZpZGVvLnN0eWxlLmNzc1RleHQgPSAnbWF4LXdpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czo2cHg7JztcbiAgICBjYXJkLnJlcGxhY2VXaXRoKG5ld1ZpZGVvKTtcblxuICAgIG1lZGlhLnB1c2goe1xuICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXModXBncmFkZUF0bGFzc2lhbk1lZGlhVXJsKHNyYykpLFxuICAgICAgbG9jYWxQYXRoLFxuICAgICAgZmlsZW5hbWU6IG5hbWUsXG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG1lZGlhO1xufVxuXG4vKipcbiAqIFJlcGxhY2Ugbm9uLXByZXZpZXdhYmxlIGZpbGUgbGlua3MgKFBERnMsIHRleHQsIGRpZmZzLCBldGMuKVxuICogd2l0aCBsb2NhbCByZWxhdGl2ZSBwYXRocy4gQWRkcyB0aGVtIHRvIHRoZSBtZWRpYSBkb3dubG9hZCBsaXN0LlxuICovXG5mdW5jdGlvbiByZXBsYWNlRmlsZUxpbmtzV2l0aExvY2FsKGNsb25lLCBtZWRpYSkge1xuICAvLyBQcmV2aWV3YWJsZSBpbiBicm93c2VyOiBpbWFnZXMgKGFscmVhZHkgYmFzZTY0J2QpLCBIVE1MXG4gIGNvbnN0IHByZXZpZXdhYmxlRXh0ID0gL1xcLihwbmd8anBnfGpwZWd8Z2lmfHN2Z3x3ZWJwfGh0bWx8aHRtKSQvaTtcbiAgbGV0IGZpbGVJZHggPSAwO1xuXG4gIGNvbnN0IGZpbGVMaW5rcyA9IGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ2FbaHJlZio9XCJtZWRpYS1jZG4uYXRsYXNzaWFuLmNvbVwiXSwgYVtocmVmKj1cIi93aWtpL2Rvd25sb2FkL1wiXSwgYS5hdHRhY2htZW50LWxpbmssIGFbZGF0YS1hdHRhY2htZW50LWlkXSdcbiAgKTtcblxuICBmb3IgKGNvbnN0IGxpbmsgb2YgZmlsZUxpbmtzKSB7XG4gICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKCFocmVmKSBjb250aW51ZTtcblxuICAgIC8vIFNraXAgaW1hZ2UgbGlua3MgKGFscmVhZHkgaW5saW5lZCBhcyBiYXNlNjQpXG4gICAgaWYgKHByZXZpZXdhYmxlRXh0LnRlc3QoaHJlZikpIGNvbnRpbnVlO1xuICAgIC8vIFNraXAgYW5jaG9yLW9ubHkgbGlua3NcbiAgICBpZiAoaHJlZi5zdGFydHNXaXRoKCcjJykpIGNvbnRpbnVlO1xuXG4gICAgZmlsZUlkeCsrO1xuICAgIGNvbnN0IG5hbWUgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fFxuICAgICAgbGluay50ZXh0Q29udGVudC50cmltKCkgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZUZyb21VcmwoaHJlZikgfHxcbiAgICAgIGBmaWxlXyR7U3RyaW5nKGZpbGVJZHgpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICBjb25zdCBsb2NhbFBhdGggPSBgYXR0YWNobWVudHMvJHtuYW1lfWA7XG5cbiAgICAvLyBVcGRhdGUgaHJlZiB0byBsb2NhbCBwYXRoXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsb2NhbFBhdGgpO1xuICAgIC8vIEFkZCB2aXN1YWwgaW5kaWNhdG9yXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgYExvY2FsIGZpbGU6ICR7bG9jYWxQYXRofWApO1xuXG4gICAgbWVkaWEucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyhocmVmKSxcbiAgICAgIGxvY2FsUGF0aCxcbiAgICAgIGZpbGVuYW1lOiBuYW1lLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQWxzbyBoYW5kbGUgaW5saW5lIGZpbGUgY2FyZHMgKENvbmZsdWVuY2UgbWVkaWEgY2FyZHMgZm9yIG5vbi1pbWFnZSBmaWxlcylcbiAgY29uc3QgaW5saW5lQ2FyZHMgPSBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdbZGF0YS10ZXN0aWQ9XCJtZWRpYS1pbmxpbmVcIl0gYSwgW2RhdGEtdGVzdGlkPVwiaW5saW5lLWNhcmQtcmVzb2x2ZWQtdmlld1wiXSBhLCAuY29uZmx1ZW5jZS1lbWJlZGRlZC1maWxlIGEnXG4gICk7XG4gIGZvciAoY29uc3QgY2FyZCBvZiBpbmxpbmVDYXJkcykge1xuICAgIGNvbnN0IGhyZWYgPSBjYXJkLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaHJlZiB8fCBocmVmLnN0YXJ0c1dpdGgoJyMnKSB8fCBwcmV2aWV3YWJsZUV4dC50ZXN0KGhyZWYpKSBjb250aW51ZTtcbiAgICBpZiAobWVkaWEuc29tZSgobSkgPT4gbS51cmwgPT09IGRlY29kZUh0bWxFbnRpdGllcyhocmVmKSkpIGNvbnRpbnVlOyAvLyBhbHJlYWR5IGhhbmRsZWRcblxuICAgIGZpbGVJZHgrKztcbiAgICBjb25zdCBuYW1lID0gY2FyZC50ZXh0Q29udGVudC50cmltKCkgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZUZyb21VcmwoaHJlZikgfHxcbiAgICAgIGBmaWxlXyR7U3RyaW5nKGZpbGVJZHgpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICBjb25zdCBsb2NhbFBhdGggPSBgYXR0YWNobWVudHMvJHtuYW1lfWA7XG5cbiAgICBjYXJkLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxvY2FsUGF0aCk7XG4gICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgYExvY2FsIGZpbGU6ICR7bG9jYWxQYXRofWApO1xuXG4gICAgbWVkaWEucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyhocmVmKSxcbiAgICAgIGxvY2FsUGF0aCxcbiAgICAgIGZpbGVuYW1lOiBuYW1lLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RGaWxlbmFtZUZyb21VcmwodXJsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBuZXcgVVJMKHVybCkucGF0aG5hbWU7XG4gICAgY29uc3QgcGFydHMgPSBwYXRobmFtZS5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGxhc3QgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gbGFzdCAmJiBsYXN0ICE9PSAnY2RuJyA/IGxhc3QgOiAnJztcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZUh0bWxFbnRpdGllcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xuICByZXR1cm4gZGl2LmlubmVySFRNTDtcbn1cblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIExpZ2h0Ym94OiBjbGljay10by16b29tIGZvciBpbWFnZXMgaW4gZXhwb3J0ZWQgSFRNTCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbi8vIFNlbGYtY29udGFpbmVkIENTUyArIEhUTUwgKyBKUyBpbmplY3RlZCBpbnRvIHRoZSBleHBvcnRlZCBmaWxlLlxuLy8gTm8gZXh0ZXJuYWwgZGVwZW5kZW5jaWVzLiBLZXlib2FyZCBhY2Nlc3NpYmxlIChFc2MgdG8gY2xvc2UpLlxuXG5jb25zdCBMSUdIVEJPWF9TVFlMRVMgPSBgXG4vKiBcdTI1MDBcdTI1MDAgSW1hZ2UgTGlnaHRib3ggXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwICovXG5ib2R5IGltZyB7XG4gIGN1cnNvcjogem9vbS1pbjtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cztcbn1cbmJvZHkgaW1nOmhvdmVyIHtcbiAgb3BhY2l0eTogMC44NTtcbn1cbi53bS1saWdodGJveC1vdmVybGF5IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBpbnNldDogMDtcbiAgei1pbmRleDogOTk5OTk5O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuODIpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTtcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogem9vbS1vdXQ7XG4gIGFuaW1hdGlvbjogd20tbGItZmFkZWluIDAuMnMgZWFzZTtcbn1cbi53bS1saWdodGJveC1vdmVybGF5LmFjdGl2ZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ud20tbGlnaHRib3gtb3ZlcmxheSBpbWcge1xuICBtYXgtd2lkdGg6IDkydnc7XG4gIG1heC1oZWlnaHQ6IDkwdmg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLDAuNSk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgYW5pbWF0aW9uOiB3bS1sYi16b29taW4gMC4yNXMgZWFzZTtcbn1cbi53bS1saWdodGJveC1jbG9zZSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAxNnB4O1xuICByaWdodDogMjBweDtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4xNSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzO1xuICB6LWluZGV4OiAxMDAwMDAwO1xufVxuLndtLWxpZ2h0Ym94LWNsb3NlOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjMpO1xufVxuLndtLWxpZ2h0Ym94LWluZm8ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMTZweDtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuNyk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjUpO1xuICBwYWRkaW5nOiA0cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbkBrZXlmcmFtZXMgd20tbGItZmFkZWluIHtcbiAgZnJvbSB7IG9wYWNpdHk6IDA7IH1cbiAgdG8geyBvcGFjaXR5OiAxOyB9XG59XG5Aa2V5ZnJhbWVzIHdtLWxiLXpvb21pbiB7XG4gIGZyb20geyB0cmFuc2Zvcm06IHNjYWxlKDAuODUpOyBvcGFjaXR5OiAwOyB9XG4gIHRvIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgb3BhY2l0eTogMTsgfVxufVxuYDtcblxuY29uc3QgTElHSFRCT1hfSFRNTCA9IGBcbjxkaXYgY2xhc3M9XCJ3bS1saWdodGJveC1vdmVybGF5XCIgaWQ9XCJ3bUxpZ2h0Ym94XCI+XG4gIDxidXR0b24gY2xhc3M9XCJ3bS1saWdodGJveC1jbG9zZVwiIGlkPVwid21MaWdodGJveENsb3NlXCIgdGl0bGU9XCJDbG9zZSAoRXNjKVwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgPGltZyBpZD1cIndtTGlnaHRib3hJbWdcIiBzcmM9XCJcIiBhbHQ9XCJcIj5cbiAgPGRpdiBjbGFzcz1cIndtLWxpZ2h0Ym94LWluZm9cIiBpZD1cIndtTGlnaHRib3hJbmZvXCI+PC9kaXY+XG48L2Rpdj5cbmA7XG5cbmNvbnN0IExJR0hUQk9YX1NDUklQVCA9IGBcbjxzY3JpcHQ+XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dtTGlnaHRib3gnKTtcbiAgdmFyIGxiSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dtTGlnaHRib3hJbWcnKTtcbiAgdmFyIGxiSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3bUxpZ2h0Ym94SW5mbycpO1xuICB2YXIgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd21MaWdodGJveENsb3NlJyk7XG4gIGlmICghb3ZlcmxheSkgcmV0dXJuO1xuXG4gIC8vIENsaWNrIGFueSBpbWFnZSB0byBvcGVuIGxpZ2h0Ym94XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciBpbWcgPSBlLnRhcmdldC5jbG9zZXN0KCdpbWcnKTtcbiAgICBpZiAoIWltZyB8fCBpbWcuaWQgPT09ICd3bUxpZ2h0Ym94SW1nJykgcmV0dXJuO1xuICAgIGlmIChvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcblxuICAgIHZhciBzcmMgPSBpbWcuc3JjO1xuICAgIHZhciBhbHQgPSBpbWcuYWx0IHx8IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1tZWRpYS1uYW1lJykgfHwgJyc7XG4gICAgdmFyIG5hdFcgPSBpbWcubmF0dXJhbFdpZHRoO1xuICAgIHZhciBuYXRIID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG5cbiAgICBsYkltZy5zcmMgPSBzcmM7XG4gICAgbGJJbWcuYWx0ID0gYWx0O1xuICAgIGxiSW5mby50ZXh0Q29udGVudCA9IGFsdCArIChuYXRXID8gJyAoJyArIG5hdFcgKyAnIHggJyArIG5hdEggKyAnKScgOiAnJyk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH0pO1xuXG4gIC8vIENsb3NlIG9uIG92ZXJsYXkgY2xpY2tcbiAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGxiSW1nKSByZXR1cm47IC8vIGRvbid0IGNsb3NlIHdoZW4gY2xpY2tpbmcgdGhlIHpvb21lZCBpbWFnZVxuICAgIGNsb3NlTGlnaHRib3goKTtcbiAgfSk7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uXG4gIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VMaWdodGJveCk7XG5cbiAgLy8gRXNjIGtleVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgb3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICBjbG9zZUxpZ2h0Ym94KCk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjbG9zZUxpZ2h0Ym94KCkge1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgIGxiSW1nLnNyYyA9ICcnO1xuICB9XG59KSgpO1xuPFxcL3NjcmlwdD5cbmA7XG4iLCAiLyoqXG4gKiBTaG9ydGN1dCBIYW5kbGVyIElzbGFuZFxuICogSGFuZGxlcyBrZXlib2FyZCBzaG9ydGN1dCBhbmQgY29udGV4dCBtZW51IHRyaWdnZXJlZCBhY3Rpb25zLlxuICogQnJpZGdlcyBiZXR3ZWVuIGJhY2tncm91bmQgc2NyaXB0IGNvbW1hbmRzIGFuZCBwYWdlLWxldmVsIG9wZXJhdGlvbnMuXG4gKlxuICogSGFuZGxlczogY29udmVydEFuZENvcHlcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJIYW5kbGVyIH0gZnJvbSAnLi9tZXNzYWdlLWJ1cy5qcyc7XG5pbXBvcnQgeyBzaG93Tm90aWZpY2F0aW9uIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNob3J0Y3V0SGFuZGxlcklzbGFuZCgpIHtcbiAgcmVnaXN0ZXJIYW5kbGVyKCdjb252ZXJ0QW5kQ29weScsIChtc2cpID0+IGhhbmRsZUNvbnZlcnRBbmRDb3B5KG1zZykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb252ZXJ0QW5kQ29weSh7IGh0bWwsIG1ldGFkYXRhLCBpbWFnZU1hcCB9KSB7XG4gIHRyeSB7XG4gICAgbGV0IG1kID0gc2ltcGxpZnlIdG1sVG9NZChodG1sKTtcblxuICAgIGlmIChtZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhtZXRhZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZm0gPSBPYmplY3QuZW50cmllcyhtZXRhZGF0YSlcbiAgICAgICAgLm1hcCgoW2ssIHZdKSA9PiBgJHtrfTogJHtKU09OLnN0cmluZ2lmeSh2KX1gKVxuICAgICAgICAuam9pbignXFxuJyk7XG4gICAgICBtZCA9IGAtLS1cXG4ke2ZtfVxcbi0tLVxcblxcbiR7bWR9YDtcbiAgICB9XG5cbiAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChtZCk7XG4gICAgc2hvd05vdGlmaWNhdGlvbignQ29waWVkIGFzIE1hcmtkb3duIScpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNob3dOb3RpZmljYXRpb24oJ0NvcHkgZmFpbGVkOiAnICsgZS5tZXNzYWdlLCB0cnVlKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGUubWVzc2FnZSB9O1xuICB9XG59XG5cbi8qKlxuICogTGlnaHR3ZWlnaHQgRE9NLXdhbGtlciBIVE1MXHUyMTkyTWFya2Rvd24gY29udmVydGVyLlxuICogVXNlZCBmb3Iga2V5Ym9hcmQgc2hvcnRjdXRzIChUdXJuZG93biBpcyBvbmx5IGluIHRoZSBwb3B1cCBidW5kbGUpLlxuICovXG5mdW5jdGlvbiBzaW1wbGlmeUh0bWxUb01kKGh0bWwpIHtcbiAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKTtcbiAgbGV0IG1kID0gJyc7XG5cbiAgY29uc3Qgd2FsayA9IChub2RlLCBkZXB0aCA9IDApID0+IHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIG1kICs9IG5vZGUudGV4dENvbnRlbnQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFnID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgYmVmb3JlID0gdGFnT3Blbih0YWcsIG5vZGUsIGRlcHRoKTtcbiAgICBtZCArPSBiZWZvcmU7XG5cbiAgICBjb25zdCBjaGlsZERlcHRoID0gKHRhZyA9PT0gJ3VsJyB8fCB0YWcgPT09ICdvbCcpID8gZGVwdGggKyAxIDogZGVwdGg7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgIHdhbGsoY2hpbGQsIGNoaWxkRGVwdGgpO1xuICAgIH1cblxuICAgIG1kICs9IHRhZ0Nsb3NlKHRhZywgbm9kZSk7XG4gIH07XG5cbiAgd2Fsayhkb2MuYm9keSk7XG4gIHJldHVybiBtZC50cmltKCk7XG59XG5cbmZ1bmN0aW9uIHRhZ09wZW4odGFnLCBub2RlLCBkZXB0aCkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgaDE6ICdcXG4jICcsIGgyOiAnXFxuIyMgJywgaDM6ICdcXG4jIyMgJyxcbiAgICBoNDogJ1xcbiMjIyMgJywgaDU6ICdcXG4jIyMjIyAnLCBoNjogJ1xcbiMjIyMjIyAnLFxuICAgIHA6ICdcXG5cXG4nLCBicjogJ1xcbicsXG4gICAgc3Ryb25nOiAnKionLCBiOiAnKionLFxuICAgIGVtOiAnKicsIGk6ICcqJyxcbiAgICBsaTogJ1xcbicgKyAnICAnLnJlcGVhdChkZXB0aCkgKyAnLSAnLFxuICAgIGhyOiAnXFxuLS0tXFxuJyxcbiAgICB0cjogJ1xcbnwnLFxuICAgIHRoOiAnICcsIHRkOiAnICcsXG4gIH07XG4gIGlmICh0YWcgPT09ICdjb2RlJykge1xuICAgIHJldHVybiBub2RlLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScgPyAnXFxuYGBgXFxuJyA6ICdgJztcbiAgfVxuICBpZiAodGFnID09PSAnYScpIHJldHVybiAnWyc7XG4gIGlmICh0YWcgPT09ICdpbWcnKSB7XG4gICAgY29uc3QgYWx0ID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgIGNvbnN0IHNyYyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJztcbiAgICByZXR1cm4gYCFbJHthbHR9XSgke3NyY30pYDtcbiAgfVxuICByZXR1cm4gbWFwW3RhZ10gfHwgJyc7XG59XG5cbmZ1bmN0aW9uIHRhZ0Nsb3NlKHRhZywgbm9kZSkge1xuICBjb25zdCBtYXAgPSB7XG4gICAgaDE6ICdcXG4nLCBoMjogJ1xcbicsIGgzOiAnXFxuJywgaDQ6ICdcXG4nLCBoNTogJ1xcbicsIGg2OiAnXFxuJyxcbiAgICBzdHJvbmc6ICcqKicsIGI6ICcqKicsXG4gICAgZW06ICcqJywgaTogJyonLFxuICAgIHRoOiAnIHwnLCB0ZDogJyB8JyxcbiAgfTtcbiAgaWYgKHRhZyA9PT0gJ2NvZGUnKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50RWxlbWVudD8udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJyA/ICdcXG5gYGBcXG4nIDogJ2AnO1xuICB9XG4gIGlmICh0YWcgPT09ICdhJykge1xuICAgIHJldHVybiBgXSgke25vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyd9KWA7XG4gIH1cbiAgcmV0dXJuIG1hcFt0YWddIHx8ICcnO1xufVxuIiwgIi8qKlxuICogQXR0YWNobWVudCBDb2xsZWN0b3IgSXNsYW5kXG4gKiBDb2xsZWN0cyBhbGwgYXR0YWNobWVudHMgKGltYWdlcyArIGZpbGVzKSBmcm9tIEppcmEvQ29uZmx1ZW5jZSBwYWdlcy5cbiAqIFJldHVybnMgc3RydWN0dXJlZCBkYXRhIGZvciBkb3dubG9hZGluZyBpbnRvIG9yZ2FuaXplZCBmb2xkZXJzLlxuICpcbiAqIEhhbmRsZXM6IGNvbGxlY3RBdHRhY2htZW50c1xuICovXG5pbXBvcnQgeyByZWdpc3RlckhhbmRsZXIgfSBmcm9tICcuL21lc3NhZ2UtYnVzLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRBdHRhY2htZW50Q29sbGVjdG9ySXNsYW5kKCkge1xuICByZWdpc3RlckhhbmRsZXIoJ2NvbGxlY3RBdHRhY2htZW50cycsICgpID0+IFByb21pc2UucmVzb2x2ZShjb2xsZWN0QXR0YWNobWVudHMoKSkpO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0QXR0YWNobWVudHMoKSB7XG4gIGNvbnN0IGF0dGFjaG1lbnRzID0ge1xuICAgIGltYWdlczogW10sXG4gICAgZmlsZXM6IFtdLFxuICAgIHBhZ2VUaXRsZTogc2FuaXRpemVGb3JGb2xkZXIoZG9jdW1lbnQudGl0bGUpLFxuICB9O1xuXG4gIC8vIDEuIENvbGxlY3QgYWxsIGltYWdlcyBmcm9tIHRoZSBwYWdlIGNvbnRlbnRcbiAgY29uc3QgY29udGVudEVsID1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXN0aWQ9XCJwYWdlLWNvbnRlbnRcIl0nKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNvbnRlbnQnKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmZpZWxkLnJpY2gtdGV4dC5kZXNjcmlwdGlvblwiXScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uLXZhbCcpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpIHx8XG4gICAgZG9jdW1lbnQuYm9keTtcblxuICBjb25zdCBpbWdzID0gY29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpO1xuICBjb25zdCBzZWVuVXJscyA9IG5ldyBTZXQoKTtcblxuICBmb3IgKGNvbnN0IGltZyBvZiBpbWdzKSB7XG4gICAgY29uc3QgdXJsID0gZ2V0QmVzdEltYWdlVXJsKGltZyk7XG4gICAgaWYgKCF1cmwgfHwgdXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykgfHwgc2VlblVybHMuaGFzKHVybCkpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZCh1cmwpO1xuXG4gICAgY29uc3QgYWx0ID0gaW1nLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgY29uc3QgbWVkaWFOYW1lID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LW1lZGlhLW5hbWUnKSB8fCAnJztcbiAgICBjb25zdCBmaWxlbmFtZSA9IG1lZGlhTmFtZSB8fCBhbHQgfHwgZXh0cmFjdEZpbGVuYW1lKHVybCkgfHwgYGltYWdlXyR7c2VlblVybHMuc2l6ZX1gO1xuXG4gICAgYXR0YWNobWVudHMuaW1hZ2VzLnB1c2goe1xuICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXModXJsKSxcbiAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKGZpbGVuYW1lKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDIuIENvbGxlY3QgZmlsZSBhdHRhY2htZW50cyBmcm9tIENvbmZsdWVuY2UgYXR0YWNobWVudCBwYW5lbFxuICBjb25zdCBhdHRhY2hMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tkYXRhLXRlc3RpZD1cImF0dGFjaG1lbnQtcGFuZWxcIl0gYVtocmVmXSwgLmF0dGFjaG1lbnQtY29udGVudCBhW2hyZWZdLCAuYXR0YWNobWVudHMgYVtkb3dubG9hZF0nXG4gICk7XG4gIGZvciAoY29uc3QgbGluayBvZiBhdHRhY2hMaW5rcykge1xuICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaHJlZiB8fCBzZWVuVXJscy5oYXMoaHJlZikpIGNvbnRpbnVlO1xuICAgIHNlZW5VcmxzLmFkZChocmVmKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gbGluay5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHxcbiAgICAgIGxpbmsudGV4dENvbnRlbnQudHJpbSgpIHx8XG4gICAgICBleHRyYWN0RmlsZW5hbWUoaHJlZik7XG5cbiAgICBhdHRhY2htZW50cy5maWxlcy5wdXNoKHtcbiAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLnRvU3RyaW5nKCkpLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUoZmlsZW5hbWUpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gMy4gQ29sbGVjdCBmcm9tIEppcmEgYXR0YWNobWVudCBzZWN0aW9uXG4gIGNvbnN0IGppcmFBdHRhY2htZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tkYXRhLXRlc3RpZD1cImlzc3VlLnZpZXdzLmlzc3VlLWJhc2UuZm91bmRhdGlvbi5hdHRhY2htZW50LXBhbmVsXCJdIGFbaHJlZl0sIC5hdHRhY2htZW50LXRodW1iIGFbaHJlZl0nXG4gICk7XG4gIGZvciAoY29uc3QgbGluayBvZiBqaXJhQXR0YWNobWVudHMpIHtcbiAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICBpZiAoIWhyZWYgfHwgc2VlblVybHMuaGFzKGhyZWYpKSBjb250aW51ZTtcbiAgICBzZWVuVXJscy5hZGQoaHJlZik7XG5cbiAgICBjb25zdCBmaWxlbmFtZSA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8XG4gICAgICBsaW5rLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpPy5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8XG4gICAgICBsaW5rLnRleHRDb250ZW50LnRyaW0oKSB8fFxuICAgICAgZXh0cmFjdEZpbGVuYW1lKGhyZWYpO1xuXG4gICAgYXR0YWNobWVudHMuZmlsZXMucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyhuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50b1N0cmluZygpKSxcbiAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKGZpbGVuYW1lKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDQuIENvbGxlY3QgaW5saW5lIGZpbGUgYXR0YWNobWVudHMgKENvbmZsdWVuY2UgbWVkaWEgY2FyZHMsIHNtYXJ0IGxpbmtzLCBpbmxpbmUgY2FyZHMpXG4gIC8vICAgIFRoZXNlIGFyZSBub24taW1hZ2UgZmlsZXMgZW1iZWRkZWQgaW5saW5lIChlLmcuLCAudHh0LCAucGRmLCAuZGlmZilcbiAgY29uc3QgaW5saW5lRmlsZVNlbGVjdG9ycyA9IFtcbiAgICAvLyBDb25mbHVlbmNlIENsb3VkOiBpbmxpbmUgbWVkaWEgY2FyZHNcbiAgICAnW2RhdGEtdGVzdGlkPVwibWVkaWEtaW5saW5lXCJdIGFbaHJlZl0nLFxuICAgICdbZGF0YS10ZXN0aWQ9XCJtZWRpYS1maWxlLWNhcmQtdmlld1wiXSBhW2hyZWZdJyxcbiAgICAnW2RhdGEtdGVzdGlkPVwiaW5saW5lLWNhcmQtcmVzb2x2ZWQtdmlld1wiXSBhW2hyZWZdJyxcbiAgICAvLyBDb25mbHVlbmNlIENsb3VkOiBtZWRpYSBzaW5nbGUgKG5vbi1pbWFnZSBmaWxlcylcbiAgICAnW2RhdGEtbm9kZS10eXBlPVwibWVkaWFTaW5nbGVcIl0gYVtocmVmXScsXG4gICAgJ1tkYXRhLW5vZGUtdHlwZT1cIm1lZGlhSW5saW5lXCJdIGFbaHJlZl0nLFxuICAgIC8vIENvbmZsdWVuY2U6IGVtYmVkZGVkIGZpbGUgd3JhcHBlclxuICAgICcuY29uZmx1ZW5jZS1lbWJlZGRlZC1maWxlIGFbaHJlZl0nLFxuICAgICdzcGFuLmNvbmZsdWVuY2UtZW1iZWRkZWQtZmlsZS13cmFwcGVyIGFbaHJlZl0nLFxuICAgIC8vIFNtYXJ0IGxpbmtzIC8gYmxvY2sgY2FyZHNcbiAgICAnW2RhdGEtdGVzdGlkPVwiYmxvY2stY2FyZC1yZXNvbHZlZC12aWV3XCJdIGFbaHJlZl0nLFxuICAgICdbZGF0YS10ZXN0aWQ9XCJzbWFydC1ibG9jay10aXRsZS1yZXNvbHZlZC12aWV3XCJdJyxcbiAgICAvLyBHZW5lcmljOiBsaW5rcyB0byBBdGxhc3NpYW4gbWVkaWEgQ0ROIGZpbGVzIChub24taW1hZ2UpXG4gICAgJ2FbaHJlZio9XCJtZWRpYS1jZG4uYXRsYXNzaWFuLmNvbS9maWxlL1wiXScsXG4gICAgJ2FbaHJlZio9XCIvd2lraS9kb3dubG9hZC9hdHRhY2htZW50cy9cIl0nLFxuICAgICdhW2hyZWYqPVwiL3dpa2kvZG93bmxvYWQvdGh1bWJuYWlscy9cIl0nLFxuICAgIC8vIEppcmE6IGF0dGFjaG1lbnQgbGlua3MgaW4gZGVzY3JpcHRpb24vY29tbWVudHNcbiAgICAnYS5hdHRhY2htZW50LWxpbmtbaHJlZl0nLFxuICAgICdhW2RhdGEtYXR0YWNobWVudC1pZF1baHJlZl0nLFxuICBdO1xuXG4gIGNvbnN0IGlubGluZUZpbGVzID0gY29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoaW5saW5lRmlsZVNlbGVjdG9ycy5qb2luKCcsICcpKTtcbiAgZm9yIChjb25zdCBlbCBvZiBpbmxpbmVGaWxlcykge1xuICAgIGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBlbC5jbG9zZXN0KCdhJyk/LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaHJlZiB8fCBzZWVuVXJscy5oYXMoaHJlZikpIGNvbnRpbnVlO1xuXG4gICAgLy8gU2tpcCBpZiBpdCdzIGFuIGltYWdlIFVSTCB3ZSBhbHJlYWR5IGNvbGxlY3RlZFxuICAgIGlmICgvXFwuKHBuZ3xqcGd8anBlZ3xnaWZ8c3ZnfHdlYnApKFxcP3wkKS9pLnRlc3QoaHJlZikpIGNvbnRpbnVlO1xuXG4gICAgc2VlblVybHMuYWRkKGhyZWYpO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPVxuICAgICAgZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8XG4gICAgICBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdGlkJyk/LmluY2x1ZGVzKCd0aXRsZScpICYmIGVsLnRleHRDb250ZW50LnRyaW0oKSB8fFxuICAgICAgZWwudGV4dENvbnRlbnQudHJpbSgpIHx8XG4gICAgICBlbC5jbG9zZXN0KCdbZGF0YS1maWxlbmFtZV0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGVuYW1lJykgfHxcbiAgICAgIGV4dHJhY3RGaWxlbmFtZShocmVmKTtcblxuICAgIGlmIChmaWxlbmFtZSkge1xuICAgICAgYXR0YWNobWVudHMuZmlsZXMucHVzaCh7XG4gICAgICAgIHVybDogZGVjb2RlSHRtbEVudGl0aWVzKG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLnRvU3RyaW5nKCkpLFxuICAgICAgICBmaWxlbmFtZTogc2FuaXRpemVGaWxlbmFtZShmaWxlbmFtZSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyA1LiBDb2xsZWN0IGZyb20gZGF0YS1maWxlaWQgYXR0cmlidXRlcyAoQ29uZmx1ZW5jZSBtZWRpYSBub2RlcyB3aXRob3V0IHZpc2libGUgbGlua3MpXG4gIGNvbnN0IG1lZGlhTm9kZXMgPSBjb250ZW50RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmlsZWlkXScpO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgbWVkaWFOb2Rlcykge1xuICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdJTUcnKSBjb250aW51ZTsgLy8gaW1hZ2VzIGFscmVhZHkgaGFuZGxlZFxuICAgIGNvbnN0IGZpbGVJZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGVpZCcpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxlY29sbGVjdGlvbicpIHx8ICcnO1xuICAgIGlmICghZmlsZUlkIHx8IHNlZW5VcmxzLmhhcyhmaWxlSWQpKSBjb250aW51ZTtcbiAgICBzZWVuVXJscy5hZGQoZmlsZUlkKTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZG93bmxvYWQgVVJMIGZyb20gZmlsZSBJRFxuICAgIGNvbnN0IG1lZGlhTmFtZSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtbWVkaWEtbmFtZScpIHx8XG4gICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tZWRpYS1uYW1lJykgfHxcbiAgICAgIG5vZGUuY2xvc2VzdCgnW2RhdGEtbWVkaWEtbmFtZV0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgbm9kZS50ZXh0Q29udGVudC50cmltKCkgfHxcbiAgICAgIGZpbGVJZDtcblxuICAgIC8vIFVzZSB0aGUgQ29uZmx1ZW5jZSBkb3dubG9hZCBBUEkgVVJMIHBhdHRlcm5cbiAgICBjb25zdCBiYXNlVXJsID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICBjb25zdCBkb3dubG9hZFVybCA9IGAke2Jhc2VVcmx9L3dpa2kvcmVzdC9hcGkvbWVkaWFmaWxlLyR7ZmlsZUlkfS9jb250ZW50YDtcblxuICAgIGF0dGFjaG1lbnRzLmZpbGVzLnB1c2goe1xuICAgICAgdXJsOiBkb3dubG9hZFVybCxcbiAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKG1lZGlhTmFtZSksXG4gICAgfSk7XG4gIH1cblxuICAvLyA2LiBDb2xsZWN0IHZpZGVvcyAoPHZpZGVvPiwgPHNvdXJjZT4sIENvbmZsdWVuY2UgdmlkZW8gcGxheWVycylcbiAgY29uc3QgdmlkZW9zID0gY29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJyk7XG4gIGZvciAoY29uc3QgdmlkZW8gb2YgdmlkZW9zKSB7XG4gICAgLy8gVHJ5IDxzb3VyY2U+IGNoaWxkcmVuIGZpcnN0LCB0aGVuIHZpZGVvIHNyY1xuICAgIGNvbnN0IHNvdXJjZXMgPSB2aWRlby5xdWVyeVNlbGVjdG9yQWxsKCdzb3VyY2Vbc3JjXScpO1xuICAgIGNvbnN0IHNyY0xpc3QgPSBzb3VyY2VzLmxlbmd0aCA+IDBcbiAgICAgID8gWy4uLnNvdXJjZXNdLm1hcCgocykgPT4gcy5nZXRBdHRyaWJ1dGUoJ3NyYycpKVxuICAgICAgOiBbdmlkZW8uZ2V0QXR0cmlidXRlKCdzcmMnKV07XG5cbiAgICBmb3IgKGNvbnN0IHNyYyBvZiBzcmNMaXN0KSB7XG4gICAgICBpZiAoIXNyYyB8fCBzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSB8fCBzZWVuVXJscy5oYXMoc3JjKSkgY29udGludWU7XG4gICAgICBzZWVuVXJscy5hZGQoc3JjKTtcbiAgICAgIGNvbnN0IG5hbWUgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1tZWRpYS1uYW1lJykgfHxcbiAgICAgICAgdmlkZW8uZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgICBleHRyYWN0RmlsZW5hbWUoc3JjKSB8fCBgdmlkZW9fJHtzZWVuVXJscy5zaXplfWA7XG4gICAgICBhdHRhY2htZW50cy5maWxlcy5wdXNoKHtcbiAgICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXModXBncmFkZU1lZGlhVXJsKHNyYykpLFxuICAgICAgICBmaWxlbmFtZTogc2FuaXRpemVGaWxlbmFtZShuYW1lKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIDcuIENvbGxlY3QgQ29uZmx1ZW5jZSBtZWRpYSBjYXJkcyB0aGF0IGFyZSB2aWRlb3MgKHBvc3RlciBhdHRyaWJ1dGUgPSB2aWRlbyB0aHVtYm5haWwpXG4gIGNvbnN0IHZpZGVvQ2FyZHMgPSBjb250ZW50RWwucXVlcnlTZWxlY3RvckFsbChcbiAgICAnW2RhdGEtdGVzdGlkPVwibWVkaWEtY2FyZC12aWV3XCJdIHZpZGVvW3NyY10sIFtkYXRhLXR5cGU9XCJ2aWRlb1wiXSBbc3JjXSwgW2RhdGEtdGVzdGlkKj1cInZpZGVvXCJdIFtzcmNdJ1xuICApO1xuICBmb3IgKGNvbnN0IHZjIG9mIHZpZGVvQ2FyZHMpIHtcbiAgICBjb25zdCBzcmMgPSB2Yy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmICghc3JjIHx8IHNyYy5zdGFydHNXaXRoKCdkYXRhOicpIHx8IHNlZW5VcmxzLmhhcyhzcmMpKSBjb250aW51ZTtcbiAgICBzZWVuVXJscy5hZGQoc3JjKTtcbiAgICBjb25zdCBuYW1lID0gdmMuY2xvc2VzdCgnW2RhdGEtbWVkaWEtbmFtZV0nKT8uZ2V0QXR0cmlidXRlKCdkYXRhLW1lZGlhLW5hbWUnKSB8fFxuICAgICAgdmMuY2xvc2VzdCgnW2RhdGEtZmlsZW5hbWVdJyk/LmdldEF0dHJpYnV0ZSgnZGF0YS1maWxlbmFtZScpIHx8XG4gICAgICBleHRyYWN0RmlsZW5hbWUoc3JjKSB8fCAndmlkZW8nO1xuICAgIGF0dGFjaG1lbnRzLmZpbGVzLnB1c2goe1xuICAgICAgdXJsOiBkZWNvZGVIdG1sRW50aXRpZXModXBncmFkZU1lZGlhVXJsKHNyYykpLFxuICAgICAgZmlsZW5hbWU6IHNhbml0aXplRmlsZW5hbWUobmFtZSksXG4gICAgfSk7XG4gIH1cblxuICAvLyA4LiBDYXRjaCBhbnkgcmVtYWluaW5nIG1lZGlhIENETiBsaW5rcyAodmlkZW8vYXVkaW8vZmlsZSkgbm90IHlldCBjb2xsZWN0ZWRcbiAgY29uc3QgbWVkaWFDZG5MaW5rcyA9IGNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYqPVwibWVkaWEtY2RuLmF0bGFzc2lhbi5jb21cIl0nKTtcbiAgZm9yIChjb25zdCBsaW5rIG9mIG1lZGlhQ2RuTGlua3MpIHtcbiAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICBpZiAoIWhyZWYgfHwgc2VlblVybHMuaGFzKGhyZWYpKSBjb250aW51ZTtcbiAgICBzZWVuVXJscy5hZGQoaHJlZik7XG4gICAgY29uc3QgbmFtZSA9IGxpbmsudGV4dENvbnRlbnQudHJpbSgpIHx8IGV4dHJhY3RGaWxlbmFtZShocmVmKSB8fCAnZmlsZSc7XG4gICAgYXR0YWNobWVudHMuZmlsZXMucHVzaCh7XG4gICAgICB1cmw6IGRlY29kZUh0bWxFbnRpdGllcyhocmVmKSxcbiAgICAgIGZpbGVuYW1lOiBzYW5pdGl6ZUZpbGVuYW1lKG5hbWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaG1lbnRzO1xufVxuXG5mdW5jdGlvbiBnZXRCZXN0SW1hZ2VVcmwoaW1nKSB7XG4gIGNvbnN0IHNyY3NldCA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpO1xuICBpZiAoc3Jjc2V0KSB7XG4gICAgY29uc3QgZW50cmllcyA9IHNyY3NldC5zcGxpdCgnLCcpLm1hcCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGFydHMgPSBlLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgcmV0dXJuIHsgdXJsOiBwYXJ0c1swXSwgbXVsdDogcGFyc2VGbG9hdChwYXJ0c1sxXSkgfHwgMSB9O1xuICAgIH0pO1xuICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4gYi5tdWx0IC0gYS5tdWx0KTtcbiAgICBpZiAoZW50cmllc1swXT8udXJsKSB7XG4gICAgICByZXR1cm4gdXBncmFkZU1lZGlhVXJsKGVudHJpZXNbMF0udXJsKTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gIHJldHVybiBzcmMgPyB1cGdyYWRlTWVkaWFVcmwoc3JjKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHVwZ3JhZGVNZWRpYVVybCh1cmwpIHtcbiAgaWYgKCF1cmwuaW5jbHVkZXMoJ21lZGlhLWNkbi5hdGxhc3NpYW4uY29tJykgJiYgIXVybC5pbmNsdWRlcygnbWVkaWEuYXRsYXNzaWFuLmNvbScpKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZCA9IG5ldyBVUkwodXJsKTtcbiAgICBwYXJzZWQuc2VhcmNoUGFyYW1zLnNldCgnd2lkdGgnLCAnNDA5NicpO1xuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCdoZWlnaHQnLCAnNDA5NicpO1xuICAgIHBhcnNlZC5zZWFyY2hQYXJhbXMuc2V0KCdtb2RlJywgJ2Z1bGwtZml0Jyk7XG4gICAgcmV0dXJuIHBhcnNlZC50b1N0cmluZygpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RGaWxlbmFtZSh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICBjb25zdCBwYXJ0cyA9IHBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgcmV0dXJuIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdIHx8ICcnO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2FuaXRpemVGaWxlbmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx4MDAtXFx4MWZdL2csICcnKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICdfJylcbiAgICAuc3Vic3RyaW5nKDAsIDEyMClcbiAgICB8fCAnZmlsZSc7XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplRm9yRm9sZGVyKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHgwMC1cXHgxZl0vZywgJycpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJ18nKVxuICAgIC5zdWJzdHJpbmcoMCwgODApXG4gICAgfHwgJ2V4cG9ydCc7XG59XG5cbmZ1bmN0aW9uIGRlY29kZUh0bWxFbnRpdGllcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufVxuIiwgIi8qKlxuICogSXNsYW5kcyBPcmNoZXN0cmF0b3JcbiAqIEVudHJ5IHBvaW50IGZvciB0aGUgY29udGVudCBzY3JpcHQuXG4gKiBJbml0aWFsaXplcyB0aGUgbWVzc2FnZSBidXMgYW5kIGFsbCBpc2xhbmRzLlxuICpcbiAqIEVhY2ggaXNsYW5kIGlzIHNlbGYtY29udGFpbmVkIGFuZCBjb21tdW5pY2F0ZXMgb25seSB0aHJvdWdoIHRoZSBtZXNzYWdlIGJ1cy5cbiAqIE5ldyBpc2xhbmRzIGNhbiBiZSBhZGRlZCBoZXJlIHdpdGhvdXQgbW9kaWZ5aW5nIGV4aXN0aW5nIG9uZXMgKE9wZW4tQ2xvc2VkKS5cbiAqL1xuaW1wb3J0IHsgaW5pdE1lc3NhZ2VCdXMgfSBmcm9tICcuL21lc3NhZ2UtYnVzLmpzJztcbmltcG9ydCB7IGluaXRFeHRyYWN0b3JJc2xhbmQgfSBmcm9tICcuL2V4dHJhY3Rvci5qcyc7XG5pbXBvcnQgeyBpbml0SW5zZXJ0ZXJJc2xhbmQgfSBmcm9tICcuL2luc2VydGVyLmpzJztcbmltcG9ydCB7IGluaXRIdG1sRXhwb3J0ZXJJc2xhbmQgfSBmcm9tICcuL2h0bWwtZXhwb3J0ZXIuanMnO1xuaW1wb3J0IHsgaW5pdFNob3J0Y3V0SGFuZGxlcklzbGFuZCB9IGZyb20gJy4vc2hvcnRjdXQtaGFuZGxlci5qcyc7XG5pbXBvcnQgeyBpbml0QXR0YWNobWVudENvbGxlY3RvcklzbGFuZCB9IGZyb20gJy4vYXR0YWNobWVudC1jb2xsZWN0b3IuanMnO1xuXG4vLyBCb290IHNlcXVlbmNlOiBpbml0aWFsaXplIG1lc3NhZ2UgYnVzLCB0aGVuIHJlZ2lzdGVyIGFsbCBpc2xhbmRzXG5pbml0TWVzc2FnZUJ1cygpO1xuaW5pdEV4dHJhY3RvcklzbGFuZCgpO1xuaW5pdEluc2VydGVySXNsYW5kKCk7XG5pbml0SHRtbEV4cG9ydGVySXNsYW5kKCk7XG5pbml0U2hvcnRjdXRIYW5kbGVySXNsYW5kKCk7XG5pbml0QXR0YWNobWVudENvbGxlY3RvcklzbGFuZCgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQWlCTyxXQUFTLGdCQUFnQixhQUFhLFNBQVM7QUFDcEQsUUFBSSxTQUFTLElBQUksV0FBVyxHQUFHO0FBQzdCLGNBQVEsS0FB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
