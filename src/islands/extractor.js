/**
 * Extractor Island
 * Responsible for extracting content and metadata from Jira/Confluence pages.
 * Self-contained module — manages its own lifecycle and state.
 *
 * Handles: getPageInfo, extractPageContent
 */
import { registerHandler } from './message-bus.js';

export function initExtractorIsland() {
  registerHandler('getPageInfo', () => Promise.resolve(getPageInfo()));
  registerHandler('extractPageContent', (msg) => Promise.resolve(extractContent(msg.options)));
}

// ─── Page Detection ──────────────────────────────────────────────

function getPageInfo() {
  return {
    isConfluence: detectConfluence(),
    isJira: detectJira(),
    isEditing: detectEditor(),
    url: window.location.href,
    title: document.title,
  };
}

function detectConfluence() {
  return !!(
    document.querySelector('#main-content') ||
    document.querySelector('[data-testid="page-content"]') ||
    document.body.classList.contains('theme-default')
  );
}

function detectJira() {
  return !!(
    document.querySelector('#jira') ||
    document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]') ||
    window.location.hostname.includes('atlassian.net')
  );
}

function detectEditor() {
  return !!(
    document.querySelector('[contenteditable="true"]') ||
    document.querySelector('.ProseMirror') ||
    document.querySelector('#tinymce')
  );
}

// ─── Content Extraction ──────────────────────────────────────────

function extractContent(options = {}) {
  const { includeImages = true, includeMetadata = true, selectedOnly = false } = options;

  let html = '';
  const selection = window.getSelection();

  if (selectedOnly && selection && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const container = document.createElement('div');
    container.appendChild(range.cloneContents());
    html = container.innerHTML;
  } else {
    html = extractFullContent();
  }

  const metadata = includeMetadata ? extractMetadata() : {};
  // Always collect image URLs — the flag only controls base64 embedding in popup
  const imageUrls = collectImageUrls(html);

  return { html, metadata, imageUrls };
}

function extractFullContent() {
  // Confluence Cloud
  const confluence =
    document.querySelector('[data-testid="page-content"]') ||
    document.querySelector('#main-content') ||
    document.querySelector('.wiki-content');
  if (confluence) return confluence.innerHTML;

  // Jira description
  const jiraDesc =
    document.querySelector('[data-testid="issue.views.field.rich-text.description"]') ||
    document.querySelector('#description-val') ||
    document.querySelector('.user-content-block');
  if (jiraDesc) {
    const summary =
      document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]') ||
      document.querySelector('#summary-val');
    const titleHtml = summary ? `<h1>${escapeHtml(summary.textContent)}</h1>` : '';
    return titleHtml + jiraDesc.innerHTML;
  }

  // Jira comments
  const comments = document.querySelectorAll(
    '[data-testid="issue.activity.comments-list"] .user-content-block, .activity-comment .action-body'
  );
  if (comments.length > 0) {
    return [...comments].map((c) => c.innerHTML).join('\n<hr>\n');
  }

  // Fallback
  const main = document.querySelector('main') || document.querySelector('[role="main"]');
  return main ? main.innerHTML : '';
}

function extractMetadata() {
  const meta = {
    title: document.title,
    url: window.location.href,
    exportedAt: new Date().toISOString(),
  };

  const selectors = {
    spaceKey: 'meta[name="ajs-space-key"]',
    pageId: 'meta[name="ajs-page-id"]',
  };

  for (const [key, sel] of Object.entries(selectors)) {
    const el = document.querySelector(sel);
    if (el) meta[key] = el.content;
  }

  const author =
    document.querySelector('.page-metadata-modification-info .author') ||
    document.querySelector('[data-testid="page-metadata-banner--last-modified-by"]');
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
  const doc = parser.parseFromString(html, 'text/html');
  const urls = new Set();

  // 1. Standard <img> tags
  for (const img of doc.querySelectorAll('img')) {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('data:')) {
      urls.add(src);
    }
    // Also check data-src (lazy-loaded images)
    const dataSrc = img.getAttribute('data-src');
    if (dataSrc && !dataSrc.startsWith('data:')) {
      urls.add(dataSrc);
    }
  }

  // 2. Confluence mediaSingle image nodes that may use background-image or
  //    have src on non-img elements (e.g. <div style="background-image:url(...)">)
  for (const media of doc.querySelectorAll('[data-node-type="mediaSingle"], [data-node-type="media"]')) {
    // Check for img inside (may already be collected above)
    const img = media.querySelector('img');
    if (img) {
      const src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src && !src.startsWith('data:') && !urls.has(src)) {
        urls.add(src);
      }
    }
    // Check for elements with src attribute that aren't img/video
    for (const el of media.querySelectorAll('[src]')) {
      if (el.tagName === 'VIDEO' || el.tagName === 'SOURCE') continue;
      const src = el.getAttribute('src');
      if (src && !src.startsWith('data:') && !urls.has(src)) {
        urls.add(src);
      }
    }
  }

  return [...urls];
}

/**
 * Request max resolution from Atlassian media CDN by adjusting URL params.
 */
function upgradeAtlassianMediaUrl(url) {
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
