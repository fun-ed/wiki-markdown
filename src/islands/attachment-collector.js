/**
 * Attachment Collector Island
 * Collects all attachments (images + files) from Jira/Confluence pages.
 * Returns structured data for downloading into organized folders.
 *
 * Handles: collectAttachments
 */
import { registerHandler } from './message-bus.js';

export function initAttachmentCollectorIsland() {
  registerHandler('collectAttachments', () => Promise.resolve(collectAttachments()));
}

function collectAttachments() {
  const attachments = {
    images: [],
    files: [],
    pageTitle: sanitizeForFolder(document.title),
  };

  // 1. Collect all images from the page content
  const contentEl =
    document.querySelector('[data-testid="page-content"]') ||
    document.querySelector('#main-content') ||
    document.querySelector('[data-testid="issue.views.field.rich-text.description"]') ||
    document.querySelector('#description-val') ||
    document.querySelector('main') ||
    document.body;

  const imgs = contentEl.querySelectorAll('img');
  const seenUrls = new Set();

  for (const img of imgs) {
    const url = getBestImageUrl(img);
    if (!url || url.startsWith('data:') || seenUrls.has(url)) continue;
    seenUrls.add(url);

    const alt = img.getAttribute('alt') || '';
    const mediaName = img.getAttribute('data-test-media-name') || '';
    const filename = mediaName || alt || extractFilename(url) || `image_${seenUrls.size}`;

    attachments.images.push({
      url: decodeHtmlEntities(url),
      filename: sanitizeFilename(filename),
    });
  }

  // 2. Collect file attachments from Confluence attachment panel
  const attachLinks = document.querySelectorAll(
    '[data-testid="attachment-panel"] a[href], .attachment-content a[href], .attachments a[download]'
  );
  for (const link of attachLinks) {
    const href = link.getAttribute('href');
    if (!href || seenUrls.has(href)) continue;
    seenUrls.add(href);

    const filename = link.getAttribute('download') ||
      link.textContent.trim() ||
      extractFilename(href);

    attachments.files.push({
      url: decodeHtmlEntities(new URL(href, window.location.href).toString()),
      filename: sanitizeFilename(filename),
    });
  }

  // 3. Collect from Jira attachment section
  const jiraAttachments = document.querySelectorAll(
    '[data-testid="issue.views.issue-base.foundation.attachment-panel"] a[href], .attachment-thumb a[href]'
  );
  for (const link of jiraAttachments) {
    const href = link.getAttribute('href');
    if (!href || seenUrls.has(href)) continue;
    seenUrls.add(href);

    const filename = link.getAttribute('download') ||
      link.querySelector('img')?.getAttribute('alt') ||
      link.textContent.trim() ||
      extractFilename(href);

    attachments.files.push({
      url: decodeHtmlEntities(new URL(href, window.location.href).toString()),
      filename: sanitizeFilename(filename),
    });
  }

  // 4. Collect inline file attachments (Confluence media cards, smart links, inline cards)
  //    These are non-image files embedded inline (e.g., .txt, .pdf, .diff)
  const inlineFileSelectors = [
    // Confluence Cloud: inline media cards
    '[data-testid="media-inline"] a[href]',
    '[data-testid="media-file-card-view"] a[href]',
    '[data-testid="inline-card-resolved-view"] a[href]',
    // Confluence Cloud: media single (non-image files)
    '[data-node-type="mediaSingle"] a[href]',
    '[data-node-type="mediaInline"] a[href]',
    // Confluence: embedded file wrapper
    '.confluence-embedded-file a[href]',
    'span.confluence-embedded-file-wrapper a[href]',
    // Smart links / block cards
    '[data-testid="block-card-resolved-view"] a[href]',
    '[data-testid="smart-block-title-resolved-view"]',
    // Generic: links to Atlassian media CDN files (non-image)
    'a[href*="media-cdn.atlassian.com/file/"]',
    'a[href*="/wiki/download/attachments/"]',
    'a[href*="/wiki/download/thumbnails/"]',
    // Jira: attachment links in description/comments
    'a.attachment-link[href]',
    'a[data-attachment-id][href]',
  ];

  const inlineFiles = contentEl.querySelectorAll(inlineFileSelectors.join(', '));
  for (const el of inlineFiles) {
    const href = el.getAttribute('href') || el.closest('a')?.getAttribute('href');
    if (!href || seenUrls.has(href)) continue;

    // Skip if it's an image URL we already collected
    if (/\.(png|jpg|jpeg|gif|svg|webp)(\?|$)/i.test(href)) continue;

    seenUrls.add(href);

    const filename =
      el.getAttribute('download') ||
      el.getAttribute('data-testid')?.includes('title') && el.textContent.trim() ||
      el.textContent.trim() ||
      el.closest('[data-filename]')?.getAttribute('data-filename') ||
      extractFilename(href);

    if (filename) {
      attachments.files.push({
        url: decodeHtmlEntities(new URL(href, window.location.href).toString()),
        filename: sanitizeFilename(filename),
      });
    }
  }

  // 5. Collect from data-fileid attributes (Confluence media nodes without visible links)
  const mediaNodes = contentEl.querySelectorAll('[data-fileid]');
  for (const node of mediaNodes) {
    if (node.tagName === 'IMG') continue; // images already handled
    const fileId = node.getAttribute('data-fileid');
    const collection = node.getAttribute('data-filecollection') || '';
    if (!fileId || seenUrls.has(fileId)) continue;
    seenUrls.add(fileId);

    // Construct the download URL from file ID
    const mediaName = node.getAttribute('data-test-media-name') ||
      node.getAttribute('data-media-name') ||
      node.closest('[data-media-name]')?.getAttribute('data-media-name') ||
      node.textContent.trim() ||
      fileId;

    // Use the Confluence download API URL pattern
    const baseUrl = window.location.origin;
    const downloadUrl = `${baseUrl}/wiki/rest/api/mediafile/${fileId}/content`;

    attachments.files.push({
      url: downloadUrl,
      filename: sanitizeFilename(mediaName),
    });
  }

  // 6. Collect videos (<video>, <source>, Confluence video players)
  const videos = contentEl.querySelectorAll('video');
  for (const video of videos) {
    // Try <source> children first, then video src
    const sources = video.querySelectorAll('source[src]');
    const srcList = sources.length > 0
      ? [...sources].map((s) => s.getAttribute('src'))
      : [video.getAttribute('src')];

    for (const src of srcList) {
      if (!src || src.startsWith('data:') || seenUrls.has(src)) continue;
      seenUrls.add(src);
      const name = video.getAttribute('data-test-media-name') ||
        video.getAttribute('data-media-name') ||
        extractFilename(src) || `video_${seenUrls.size}`;
      attachments.files.push({
        url: decodeHtmlEntities(upgradeMediaUrl(src)),
        filename: sanitizeFilename(name),
      });
    }
  }

  // 7. Collect Confluence media cards that are videos (poster attribute = video thumbnail)
  const videoCards = contentEl.querySelectorAll(
    '[data-testid="media-card-view"] video[src], [data-type="video"] [src], [data-testid*="video"] [src]'
  );
  for (const vc of videoCards) {
    const src = vc.getAttribute('src');
    if (!src || src.startsWith('data:') || seenUrls.has(src)) continue;
    seenUrls.add(src);
    const name = vc.closest('[data-media-name]')?.getAttribute('data-media-name') ||
      vc.closest('[data-filename]')?.getAttribute('data-filename') ||
      extractFilename(src) || 'video';
    attachments.files.push({
      url: decodeHtmlEntities(upgradeMediaUrl(src)),
      filename: sanitizeFilename(name),
    });
  }

  // 8. Catch any remaining media CDN links (video/audio/file) not yet collected
  const mediaCdnLinks = contentEl.querySelectorAll('a[href*="media-cdn.atlassian.com"]');
  for (const link of mediaCdnLinks) {
    const href = link.getAttribute('href');
    if (!href || seenUrls.has(href)) continue;
    seenUrls.add(href);
    const name = link.textContent.trim() || extractFilename(href) || 'file';
    attachments.files.push({
      url: decodeHtmlEntities(href),
      filename: sanitizeFilename(name),
    });
  }

  return attachments;
}

function getBestImageUrl(img) {
  const srcset = img.getAttribute('srcset');
  if (srcset) {
    const entries = srcset.split(',').map((e) => {
      const parts = e.trim().split(/\s+/);
      return { url: parts[0], mult: parseFloat(parts[1]) || 1 };
    });
    entries.sort((a, b) => b.mult - a.mult);
    if (entries[0]?.url) {
      return upgradeMediaUrl(entries[0].url);
    }
  }
  const src = img.getAttribute('src');
  return src ? upgradeMediaUrl(src) : null;
}

function upgradeMediaUrl(url) {
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

function extractFilename(url) {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
}

function sanitizeFilename(name) {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 120)
    || 'file';
}

function sanitizeForFolder(name) {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 80)
    || 'export';
}

function decodeHtmlEntities(str) {
  return str.replace(/&amp;/g, '&');
}
