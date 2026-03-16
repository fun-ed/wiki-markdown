/**
 * HTML Exporter Island
 * Responsible for exporting the current page as a self-contained HTML file.
 * Inlines CSS stylesheets and images (via background script).
 *
 * Handles: exportSingleHtml
 */
import { registerHandler, sendToBackground } from './message-bus.js';

export function initHtmlExporterIsland() {
  registerHandler('exportSingleHtml', (msg) => exportSingleHtml(msg.options));
}

async function exportSingleHtml(options = {}) {
  const { inlineImages = true } = options;

  try {
    // 1. Identify and clone target content
    const contentEl = findContentElement();
    const clone = contentEl.cloneNode(true);

    // 2. Collect and inline stylesheets
    const inlinedStyles = await collectStyles();

    // 3. Collect and inline images
    let imageCount = 0;
    if (inlineImages) {
      imageCount = await inlineImagesInClone(clone);
    }

    // 4. Replace videos with HTML5 <video> tags pointing to local relative paths
    const localMedia = replaceVideosWithLocal(clone);

    // 5. Replace non-previewable file links with local relative paths
    replaceFileLinksWithLocal(clone, localMedia);

    // 6. Strip scripts for security
    for (const script of clone.querySelectorAll('script')) {
      script.remove();
    }

    // 7. Assemble self-contained HTML
    const title = document.title;
    const escTitle = escapeHtml(title);
    const escUrl = escapeHtml(window.location.href);

    const htmlContent = [
      '<!DOCTYPE html>',
      `<html lang="${document.documentElement.lang || 'en'}">`,
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `  <title>${escTitle}</title>`,
      '  <meta name="generator" content="Wiki↔Markdown Extension">',
      `  <meta name="source-url" content="${escUrl}">`,
      `  <meta name="export-date" content="${new Date().toISOString()}">`,
      '  <style>',
      inlinedStyles,
      LIGHTBOX_STYLES,
      '  </style>',
      '</head>',
      '<body>',
      `  ${clone.outerHTML}`,
      LIGHTBOX_HTML,
      LIGHTBOX_SCRIPT,
      '</body>',
      '</html>',
    ].join('\n');

    return {
      success: true,
      html: htmlContent,
      title,
      imageCount,
      size: htmlContent.length,
      localMedia, // files that need to be downloaded alongside the HTML
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function findContentElement() {
  const selectors = [
    '[data-testid="page-content"]',
    '#main-content',
    '.wiki-content',
    '[data-testid="issue.views.field.rich-text.description"]',
    '#description-val',
    'main',
    'body',
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
      const rules = [...sheet.cssRules].map((r) => r.cssText).join('\n');
      styleChunks.push(rules);
    } catch {
      if (sheet.href) {
        try {
          const resp = await fetch(sheet.href);
          if (resp.ok) styleChunks.push(await resp.text());
        } catch { /* unreachable stylesheet */ }
      }
    }
  }
  return styleChunks.join('\n\n');
}

async function inlineImagesInClone(clone) {
  const imgs = clone.querySelectorAll('img');

  // Collect all unique URLs: prefer highest resolution from srcset, fallback to src
  const urlSet = new Set();
  const imgUrlMap = new Map(); // img element → best URL to fetch

  for (const img of imgs) {
    let bestUrl = getHighestResSrc(img);
    // Fallback to data-src for lazy-loaded images
    if ((!bestUrl || bestUrl.startsWith('data:')) && img.getAttribute('data-src')) {
      bestUrl = img.getAttribute('data-src');
    }
    if (bestUrl && !bestUrl.startsWith('data:')) {
      urlSet.add(bestUrl);
      imgUrlMap.set(img, bestUrl);
    }
  }

  const urls = [...urlSet];
  if (urls.length === 0) return 0;

  const imageMap = await sendToBackground({
    type: 'fetchImagesAsBase64',
    urls,
  });

  let count = 0;
  for (const img of imgs) {
    const bestUrl = imgUrlMap.get(img);
    if (bestUrl && imageMap[bestUrl] && imageMap[bestUrl].startsWith('data:')) {
      img.setAttribute('src', imageMap[bestUrl]);
      // Remove srcset to prevent browser from using external URLs
      img.removeAttribute('srcset');
      count++;
    }
  }

  return count;
}

/**
 * Extract the highest resolution image URL from an <img> element.
 * Strategy:
 * 1. Pick highest multiplier from srcset (2x > 1x)
 * 2. For Atlassian media CDN URLs, request max resolution by
 *    removing width/height constraints
 */
function getHighestResSrc(img) {
  let bestUrl = img.getAttribute('src');

  // Check srcset for higher resolution variants
  const srcset = img.getAttribute('srcset');
  if (srcset) {
    const entries = srcset.split(',').map((entry) => {
      const parts = entry.trim().split(/\s+/);
      return { url: parts[0], multiplier: parseFloat(parts[1]) || 1 };
    });
    entries.sort((a, b) => b.multiplier - a.multiplier);
    if (entries.length > 0 && entries[0].url) {
      bestUrl = entries[0].url;
    }
  }

  // For Atlassian media CDN: request original/max resolution
  if (bestUrl) {
    bestUrl = upgradeAtlassianMediaUrl(bestUrl);
  }

  return bestUrl;
}

/**
 * Upgrade Atlassian media CDN URLs to request maximum resolution.
 * media-cdn.atlassian.com URLs accept width/height params that limit output.
 * By setting large values and mode=full-fit, we get the original image.
 */
function upgradeAtlassianMediaUrl(url) {
  if (!url.includes('media-cdn.atlassian.com') && !url.includes('media.atlassian.com')) {
    return url;
  }
  try {
    const parsed = new URL(url);
    // Request maximum resolution
    parsed.searchParams.set('width', '4096');
    parsed.searchParams.set('height', '4096');
    parsed.searchParams.set('mode', 'full-fit');
    return parsed.toString();
  } catch {
    return url;
  }
}

// ─── Video & file link localization ─────────────────────────────

/**
 * Replace <video> elements and video-like media cards with HTML5 <video> tags
 * pointing to local relative paths. Returns list of media to download.
 */
function replaceVideosWithLocal(clone) {
  const media = []; // { url, localPath, filename, type }
  let videoIdx = 0;

  // Handle <video> tags
  const videos = clone.querySelectorAll('video');
  for (const video of videos) {
    const src = video.getAttribute('src') ||
      video.querySelector('source')?.getAttribute('src');
    if (!src || src.startsWith('data:')) continue;

    videoIdx++;
    const name = video.getAttribute('data-test-media-name') ||
      video.getAttribute('data-media-name') ||
      extractFilenameFromUrl(src) ||
      `video_${String(videoIdx).padStart(2, '0')}.mp4`;
    const localPath = `videos/${name}`;

    // Replace with clean HTML5 video player
    const newVideo = clone.ownerDocument.createElement('video');
    newVideo.setAttribute('controls', '');
    newVideo.setAttribute('preload', 'metadata');
    newVideo.setAttribute('src', localPath);
    newVideo.style.cssText = 'max-width:100%;border-radius:6px;';
    if (video.getAttribute('poster')) {
      newVideo.setAttribute('poster', video.getAttribute('poster'));
    }
    video.replaceWith(newVideo);

    media.push({
      url: decodeHtmlEntities(upgradeAtlassianMediaUrl(src)),
      localPath,
      filename: name,
      type: 'video',
    });
  }

  // Handle Confluence video cards (div wrappers that contain video players)
  // NOTE: [data-node-type="mediaSingle"] wraps ALL media (images + videos).
  // We must skip cards that contain <img> — those are images, not videos.
  const videoCards = clone.querySelectorAll(
    '[data-testid*="media"][data-type="video"], [data-node-type="mediaSingle"]'
  );
  for (const card of videoCards) {
    const innerVideo = card.querySelector('video');
    if (innerVideo) continue; // already handled above
    // Skip image nodes — these are handled by inlineImagesInClone
    if (card.querySelector('img')) continue;
    const src = card.querySelector('[src]')?.getAttribute('src');
    if (!src) continue;

    videoIdx++;
    const name = card.getAttribute('data-media-name') ||
      extractFilenameFromUrl(src) ||
      `video_${String(videoIdx).padStart(2, '0')}.mp4`;
    const localPath = `videos/${name}`;

    const newVideo = clone.ownerDocument.createElement('video');
    newVideo.setAttribute('controls', '');
    newVideo.setAttribute('preload', 'metadata');
    newVideo.setAttribute('src', localPath);
    newVideo.style.cssText = 'max-width:100%;border-radius:6px;';
    card.replaceWith(newVideo);

    media.push({
      url: decodeHtmlEntities(upgradeAtlassianMediaUrl(src)),
      localPath,
      filename: name,
      type: 'video',
    });
  }

  return media;
}

/**
 * Replace non-previewable file links (PDFs, text, diffs, etc.)
 * with local relative paths. Adds them to the media download list.
 */
function replaceFileLinksWithLocal(clone, media) {
  // Previewable in browser: images (already base64'd), HTML
  const previewableExt = /\.(png|jpg|jpeg|gif|svg|webp|html|htm)$/i;
  let fileIdx = 0;

  const fileLinks = clone.querySelectorAll(
    'a[href*="media-cdn.atlassian.com"], a[href*="/wiki/download/"], a.attachment-link, a[data-attachment-id]'
  );

  for (const link of fileLinks) {
    const href = link.getAttribute('href');
    if (!href) continue;

    // Skip image links (already inlined as base64)
    if (previewableExt.test(href)) continue;
    // Skip anchor-only links
    if (href.startsWith('#')) continue;

    fileIdx++;
    const name = link.getAttribute('download') ||
      link.textContent.trim() ||
      extractFilenameFromUrl(href) ||
      `file_${String(fileIdx).padStart(2, '0')}`;
    const localPath = `attachments/${name}`;

    // Update href to local path
    link.setAttribute('href', localPath);
    // Add visual indicator
    link.setAttribute('title', `Local file: ${localPath}`);

    media.push({
      url: decodeHtmlEntities(href),
      localPath,
      filename: name,
      type: 'file',
    });
  }

  // Also handle inline file cards (Confluence media cards for non-image files)
  const inlineCards = clone.querySelectorAll(
    '[data-testid="media-inline"] a, [data-testid="inline-card-resolved-view"] a, .confluence-embedded-file a'
  );
  for (const card of inlineCards) {
    const href = card.getAttribute('href');
    if (!href || href.startsWith('#') || previewableExt.test(href)) continue;
    if (media.some((m) => m.url === decodeHtmlEntities(href))) continue; // already handled

    fileIdx++;
    const name = card.textContent.trim() ||
      extractFilenameFromUrl(href) ||
      `file_${String(fileIdx).padStart(2, '0')}`;
    const localPath = `attachments/${name}`;

    card.setAttribute('href', localPath);
    card.setAttribute('title', `Local file: ${localPath}`);

    media.push({
      url: decodeHtmlEntities(href),
      localPath,
      filename: name,
      type: 'file',
    });
  }
}

function extractFilenameFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    const last = parts[parts.length - 1];
    return last && last !== 'cdn' ? last : '';
  } catch {
    return '';
  }
}

function decodeHtmlEntities(str) {
  return str.replace(/&amp;/g, '&');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Lightbox: click-to-zoom for images in exported HTML ────────
// Self-contained CSS + HTML + JS injected into the exported file.
// No external dependencies. Keyboard accessible (Esc to close).

const LIGHTBOX_STYLES = `
/* ── Image Lightbox ─────────────────────────────────────────── */
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

const LIGHTBOX_HTML = `
<div class="wm-lightbox-overlay" id="wmLightbox">
  <button class="wm-lightbox-close" id="wmLightboxClose" title="Close (Esc)">&times;</button>
  <img id="wmLightboxImg" src="" alt="">
  <div class="wm-lightbox-info" id="wmLightboxInfo"></div>
</div>
`;

const LIGHTBOX_SCRIPT = `
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
