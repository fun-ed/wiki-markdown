/**
 * Plugin: Confluence Tables
 * Handles Confluence Cloud tables where:
 * - Header row (<th>) is inside <tbody> (no <thead>)
 * - Cells contain <p>, <div>, or other block-level wrappers
 * - Table may be nested inside container divs
 *
 * This rule takes priority over the GFM table rules by processing
 * the <table> element directly and extracting clean content.
 * @implements {TurndownPlugin}
 */
export function confluenceTablesPlugin(turndownService) {
  turndownService.addRule('confluenceTable', {
    filter(node) {
      if (node.nodeName !== 'TABLE') return false;
      if (!node.rows || node.rows.length === 0) return false;
      // Skip duplicate sticky header tables (Confluence renders 2 copies)
      const wrapper = node.closest('.pm-table-sticky-wrapper');
      if (wrapper) return false;
      return true;
    },
    replacement(_content, node) {
      const rows = extractRows(node);
      if (rows.length === 0) return '';

      // Detect header row: first row with all <th> cells, or <thead> row
      let headerRow = null;
      let bodyRows = rows;

      if (rows.length > 0 && rows[0].isHeader) {
        headerRow = rows[0];
        bodyRows = rows.slice(1);
      }

      // If no header detected but table has rows, use first row as header
      // (Markdown requires a header row)
      if (!headerRow && bodyRows.length > 0) {
        headerRow = bodyRows[0];
        bodyRows = bodyRows.slice(1);
      }

      if (!headerRow) return '';

      // Determine column count from the widest row
      const colCount = Math.max(
        headerRow.cells.length,
        ...bodyRows.map((r) => r.cells.length)
      );

      if (colCount === 0) return '';

      // Pad rows to consistent column count
      const padRow = (cells) => {
        while (cells.length < colCount) cells.push('');
        return cells;
      };

      // Build markdown table
      const lines = [];

      // Header
      const hCells = padRow([...headerRow.cells]);
      lines.push('| ' + hCells.join(' | ') + ' |');

      // Separator
      lines.push('| ' + hCells.map(() => '---').join(' | ') + ' |');

      // Body rows
      for (const row of bodyRows) {
        const bCells = padRow([...row.cells]);
        lines.push('| ' + bCells.join(' | ') + ' |');
      }

      return '\n\n' + lines.join('\n') + '\n\n';
    },
  });

  // Prevent GFM table rules from also processing table parts
  turndownService.addRule('confluenceTableSection', {
    filter: ['thead', 'tbody', 'tfoot'],
    replacement(content) {
      return content;
    },
  });

  // Strip duplicate sticky header tables (Confluence renders header twice)
  turndownService.addRule('confluenceStickyHeader', {
    filter(node) {
      if (node.nodeName !== 'DIV') return false;
      return node.classList?.contains('pm-table-sticky-wrapper') ||
        (node.classList?.contains('pm-table-container') && node.classList?.contains('is-sticky'));
    },
    replacement() {
      return ''; // discard entirely — the real table is in pm-table-wrapper
    },
  });
}

/**
 * Extract rows from a table element, preserving header/body distinction.
 */
function extractRows(table) {
  const rows = [];

  for (const tr of table.rows) {
    const cells = [];
    let isHeader = false;
    let thCount = 0;
    let cellCount = 0;

    for (const child of tr.childNodes) {
      if (child.nodeType !== 1) continue; // skip text nodes
      if (child.nodeName !== 'TD' && child.nodeName !== 'TH') continue;

      cellCount++;
      if (child.nodeName === 'TH') thCount++;

      const text = cleanCellContent(child);
      cells.push(text);
    }

    // A header row = all cells are <th>, or row is inside <thead>
    if (cellCount > 0 && thCount === cellCount) isHeader = true;
    if (tr.parentNode?.nodeName === 'THEAD') isHeader = true;

    if (cells.length > 0) {
      rows.push({ cells, isHeader });
    }
  }

  return rows;
}

/**
 * Extract clean text from a table cell.
 * Handles <p>, <div>, <span>, inline code, links, images, and Confluence media wrappers.
 */
function cleanCellContent(cell) {
  // Priority: check for any <img> anywhere in the cell first.
  // Confluence wraps images in deep structures (mediaSingle > a > div > ...),
  // and the visible text is just "Open image-xxx.png" which is useless.
  const imgs = cell.querySelectorAll('img');
  if (imgs.length > 0) {
    const parts = [];
    // Collect all images
    for (const img of imgs) {
      const alt = img.getAttribute('alt') || '';
      const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
      if (src) parts.push(`![${alt}](${src})`);
    }
    // Also collect non-image text from the cell (there may be mixed content)
    const textOnly = extractNonImageText(cell);
    if (textOnly) parts.unshift(textOnly);
    return parts.join(' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\|/g, '\\|');
  }

  // No images — process children normally
  let text = '';

  for (const child of cell.childNodes) {
    text += processNode(child);
  }

  // Clean up: collapse whitespace, trim, escape pipes
  return text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\|/g, '\\|');
}

/**
 * Extract text content from a cell, excluding any <img> elements,
 * Confluence media wrappers, sorting icons, and fallback buttons.
 */
function extractNonImageText(cell) {
  const clone = cell.cloneNode(true);
  // Remove images, media wrappers, sorting icons, and fallback buttons
  const removeSelectors = [
    'img',
    '[data-node-type="mediaSingle"]',
    '[data-node-type="media"]',
    'figure',                                    // sorting icons in headers
    'button',                                    // "Open image-xxx" fallback buttons
    '.ak-renderer-tableHeader-sorting-icon',     // sorting icon wrappers
    '[data-testid="media-badges"]',              // media badge overlays
  ].join(', ');
  for (const el of clone.querySelectorAll(removeSelectors)) {
    el.remove();
  }
  // Remove "Open image-..." or "Open Screenshot..." text left by Confluence
  const text = clone.textContent
    .replace(/Open (image|Screenshot)[^\n]*/g, '')
    .trim();
  return text;
}

/**
 * Process a single DOM node into markdown text.
 */
function processNode(child) {
  if (child.nodeType === 3) {
    return child.textContent;
  }
  // Skip Confluence UI elements (sorting icons, fallback buttons, media badges)
  if (child.nodeName === 'FIGURE') return '';
  if (child.nodeName === 'BUTTON') return '';
  if (child.getAttribute?.('data-testid') === 'media-badges') return '';
  if (child.nodeName === 'P') {
    return ' ' + cleanInlineContent(child);
  }
  if (child.nodeName === 'BR') {
    return ' ';
  }
  if (child.nodeName === 'CODE') {
    return '`' + child.textContent + '`';
  }
  if (child.nodeName === 'PRE') {
    return '`' + child.textContent.trim() + '`';
  }
  if (child.nodeName === 'A') {
    // Check if link wraps an image
    const img = child.querySelector('img');
    if (img) {
      const alt = img.getAttribute('alt') || '';
      const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
      return src ? `![${alt}](${src})` : '';
    }
    const href = child.getAttribute('href') || '';
    const linkText = child.textContent.trim();
    return href ? `[${linkText}](${href})` : linkText;
  }
  if (child.nodeName === 'STRONG' || child.nodeName === 'B') {
    return '**' + child.textContent + '**';
  }
  if (child.nodeName === 'EM' || child.nodeName === 'I') {
    return '*' + child.textContent + '*';
  }
  if (child.nodeName === 'IMG') {
    const alt = child.getAttribute('alt') || '';
    const src = child.getAttribute('src') || child.getAttribute('data-src') || '';
    return `![${alt}](${src})`;
  }
  // Generic: recurse
  return cleanInlineContent(child);
}

/**
 * Extract inline content from an element, handling basic formatting.
 */
function cleanInlineContent(el) {
  let text = '';
  for (const child of el.childNodes) {
    if (child.nodeType === 3) {
      text += child.textContent;
    } else if (child.nodeName === 'CODE') {
      text += '`' + child.textContent + '`';
    } else if (child.nodeName === 'A') {
      const href = child.getAttribute('href') || '';
      const linkText = child.textContent.trim();
      text += href ? `[${linkText}](${href})` : linkText;
    } else if (child.nodeName === 'STRONG' || child.nodeName === 'B') {
      text += '**' + child.textContent + '**';
    } else if (child.nodeName === 'EM' || child.nodeName === 'I') {
      text += '*' + child.textContent + '*';
    } else if (child.nodeName === 'BR') {
      text += ' ';
    } else if (child.nodeName === 'IMG') {
      const alt = child.getAttribute('alt') || '';
      const src = child.getAttribute('src') || '';
      text += `![${alt}](${src})`;
    } else {
      text += child.textContent;
    }
  }
  return text;
}
