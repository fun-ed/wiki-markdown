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
      // Match any table that has rows with content
      return node.rows && node.rows.length > 0;
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
 * Handles <p>, <div>, <span>, inline code, links, and other wrappers.
 */
function cleanCellContent(cell) {
  // Get text content but handle specific elements
  let text = '';

  for (const child of cell.childNodes) {
    if (child.nodeType === 3) {
      // Text node
      text += child.textContent;
    } else if (child.nodeName === 'P') {
      // <p> wrapper — extract content, add space between paragraphs
      if (text && !text.endsWith(' ')) text += ' ';
      text += cleanInlineContent(child);
    } else if (child.nodeName === 'BR') {
      text += ' ';
    } else if (child.nodeName === 'CODE') {
      text += '`' + child.textContent + '`';
    } else if (child.nodeName === 'PRE') {
      text += '`' + child.textContent.trim() + '`';
    } else if (child.nodeName === 'A') {
      const href = child.getAttribute('href') || '';
      const linkText = child.textContent.trim();
      text += href ? `[${linkText}](${href})` : linkText;
    } else if (child.nodeName === 'STRONG' || child.nodeName === 'B') {
      text += '**' + child.textContent + '**';
    } else if (child.nodeName === 'EM' || child.nodeName === 'I') {
      text += '*' + child.textContent + '*';
    } else if (child.nodeName === 'IMG') {
      const alt = child.getAttribute('alt') || '';
      const src = child.getAttribute('src') || '';
      text += `![${alt}](${src})`;
    } else {
      // Generic: recurse into inline content
      text += cleanInlineContent(child);
    }
  }

  // Clean up: collapse whitespace, trim, escape pipes
  return text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\|/g, '\\|');
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
