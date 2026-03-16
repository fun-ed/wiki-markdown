/**
 * Shortcut Handler Island
 * Handles keyboard shortcut and context menu triggered actions.
 * Bridges between background script commands and page-level operations.
 *
 * Handles: convertAndCopy
 */
import { registerHandler } from './message-bus.js';
import { showNotification } from './notification.js';

export function initShortcutHandlerIsland() {
  registerHandler('convertAndCopy', (msg) => handleConvertAndCopy(msg));
}

async function handleConvertAndCopy({ html, metadata, imageMap }) {
  try {
    let md = simplifyHtmlToMd(html);

    if (metadata && Object.keys(metadata).length > 0) {
      const fm = Object.entries(metadata)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n');
      md = `---\n${fm}\n---\n\n${md}`;
    }

    await navigator.clipboard.writeText(md);
    showNotification('Copied as Markdown!');
    return { success: true };
  } catch (e) {
    showNotification('Copy failed: ' + e.message, true);
    return { success: false, error: e.message };
  }
}

/**
 * Lightweight DOM-walker HTML→Markdown converter.
 * Used for keyboard shortcuts (Turndown is only in the popup bundle).
 */
function simplifyHtmlToMd(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let md = '';

  const walk = (node, depth = 0) => {
    if (node.nodeType === Node.TEXT_NODE) {
      md += node.textContent;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();
    const before = tagOpen(tag, node, depth);
    md += before;

    const childDepth = (tag === 'ul' || tag === 'ol') ? depth + 1 : depth;
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
    h1: '\n# ', h2: '\n## ', h3: '\n### ',
    h4: '\n#### ', h5: '\n##### ', h6: '\n###### ',
    p: '\n\n', br: '\n',
    strong: '**', b: '**',
    em: '*', i: '*',
    li: '\n' + '  '.repeat(depth) + '- ',
    hr: '\n---\n',
    tr: '\n|',
    th: ' ', td: ' ',
  };
  if (tag === 'code') {
    return node.parentElement?.tagName.toLowerCase() === 'pre' ? '\n```\n' : '`';
  }
  if (tag === 'a') return '[';
  if (tag === 'img') {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    return `![${alt}](${src})`;
  }
  return map[tag] || '';
}

function tagClose(tag, node) {
  const map = {
    h1: '\n', h2: '\n', h3: '\n', h4: '\n', h5: '\n', h6: '\n',
    strong: '**', b: '**',
    em: '*', i: '*',
    th: ' |', td: ' |',
  };
  if (tag === 'code') {
    return node.parentElement?.tagName.toLowerCase() === 'pre' ? '\n```\n' : '`';
  }
  if (tag === 'a') {
    return `](${node.getAttribute('href') || ''})`;
  }
  return map[tag] || '';
}
