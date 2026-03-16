/**
 * Markdown AST Parser
 * Converts raw Markdown text into an abstract syntax tree.
 * Each node has: { type, children?, value?, props? }
 *
 * This is a custom recursive-descent parser — not based on any existing library.
 * It handles: headings, paragraphs, lists (nested/mixed), code blocks,
 * inline code, tables, blockquotes, bold, italic, links, images, hr.
 */

/** @typedef {{ type: string, children?: ASTNode[], value?: string, props?: Record<string,any> }} ASTNode */

/**
 * Parse Markdown source into an AST.
 * @param {string} source
 * @returns {ASTNode}
 */
export function parse(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const root = { type: 'document', children: [] };
  let cursor = 0;

  while (cursor < lines.length) {
    const result = parseBlock(lines, cursor);
    if (result.node) root.children.push(result.node);
    cursor = result.next;
  }

  return root;
}

function parseBlock(lines, cursor) {
  const line = lines[cursor];

  // Blank line → skip
  if (line.trim() === '') {
    return { node: null, next: cursor + 1 };
  }

  // Fenced code block
  if (/^```(\w*)/.test(line)) {
    return parseFencedCode(lines, cursor);
  }

  // Heading (ATX style)
  const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
  if (headingMatch) {
    return {
      node: {
        type: 'heading',
        props: { level: headingMatch[1].length },
        children: parseInline(headingMatch[2]),
      },
      next: cursor + 1,
    };
  }

  // Horizontal rule
  if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
    return { node: { type: 'hr' }, next: cursor + 1 };
  }

  // Blockquote
  if (/^>\s?/.test(line)) {
    return parseBlockquote(lines, cursor);
  }

  // Table (pipe syntax with separator line)
  if (
    cursor + 1 < lines.length &&
    /^\|.*\|$/.test(line.trim()) &&
    /^\|[\s:]*-{3,}/.test(lines[cursor + 1].trim())
  ) {
    return parseTable(lines, cursor);
  }

  // List item (unordered: -, *, + or ordered: 1.)
  if (/^\s*(?:[-*+]|\d+\.)\s/.test(line)) {
    return parseList(lines, cursor);
  }

  // Paragraph (default)
  return parseParagraph(lines, cursor);
}

function parseFencedCode(lines, cursor) {
  const openMatch = lines[cursor].match(/^```(\w*)/);
  const lang = openMatch ? openMatch[1] : '';
  const codeLines = [];
  let i = cursor + 1;
  while (i < lines.length && !lines[i].startsWith('```')) {
    codeLines.push(lines[i]);
    i++;
  }
  // Skip closing ```
  if (i < lines.length) i++;
  return {
    node: {
      type: 'codeBlock',
      props: { lang },
      value: codeLines.join('\n'),
    },
    next: i,
  };
}

function parseBlockquote(lines, cursor) {
  const quoteLines = [];
  let i = cursor;
  while (i < lines.length && /^>\s?/.test(lines[i])) {
    quoteLines.push(lines[i].replace(/^>\s?/, ''));
    i++;
  }
  const innerSource = quoteLines.join('\n');
  const innerAst = parse(innerSource);
  return {
    node: { type: 'blockquote', children: innerAst.children },
    next: i,
  };
}

function parseTable(lines, cursor) {
  // Header row
  const headerCells = splitTableRow(lines[cursor]);
  // Skip separator
  let i = cursor + 2;
  // Body rows
  const bodyRows = [];
  while (i < lines.length && /^\|/.test(lines[i].trim())) {
    bodyRows.push(splitTableRow(lines[i]));
    i++;
  }
  return {
    node: {
      type: 'table',
      props: { headers: headerCells },
      children: bodyRows.map((cells) => ({ type: 'tableRow', props: { cells } })),
    },
    next: i,
  };
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim());
}

function parseList(lines, cursor) {
  const items = [];
  let i = cursor;

  while (i < lines.length) {
    const itemMatch = lines[i].match(/^(\s*)([-*+]|\d+\.)\s+(.*)/);
    if (!itemMatch) break;

    const indent = itemMatch[1].replace(/\t/g, '    ').length;
    const marker = itemMatch[2];
    const ordered = /^\d+\.$/.test(marker);
    const content = itemMatch[3];

    // Collect continuation / sub-items
    const subLines = [];
    let j = i + 1;
    while (j < lines.length) {
      const nextMatch = lines[j].match(/^(\s*)([-*+]|\d+\.)\s/);
      if (nextMatch) {
        const nextIndent = nextMatch[1].replace(/\t/g, '    ').length;
        if (nextIndent > indent) {
          subLines.push(lines[j]);
          j++;
          continue;
        }
        break;
      }
      // Continuation line (indented text)
      if (lines[j].trim() === '' || /^\s{2,}/.test(lines[j])) {
        subLines.push(lines[j]);
        j++;
        continue;
      }
      break;
    }

    const item = {
      type: 'listItem',
      props: { ordered, depth: Math.floor(indent / 2) },
      children: parseInline(content),
    };

    // Parse nested list from sub-lines
    if (subLines.length > 0) {
      const dedented = subLines.map((l) => l.replace(new RegExp(`^\\s{${indent + 2}}`), ''));
      const subAst = parse(dedented.join('\n'));
      if (subAst.children.length > 0) {
        item.children = [...item.children, ...subAst.children];
      }
    }

    items.push(item);
    i = j;
  }

  const firstOrdered = items[0]?.props?.ordered;
  return {
    node: {
      type: 'list',
      props: { ordered: firstOrdered },
      children: items,
    },
    next: i,
  };
}

function parseParagraph(lines, cursor) {
  const paraLines = [];
  let i = cursor;
  while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines, i)) {
    paraLines.push(lines[i]);
    i++;
  }
  return {
    node: {
      type: 'paragraph',
      children: parseInline(paraLines.join('\n')),
    },
    next: i,
  };
}

function isBlockStart(lines, i) {
  const line = lines[i];
  if (/^#{1,6}\s/.test(line)) return true;
  if (/^```/.test(line)) return true;
  if (/^>\s/.test(line)) return true;
  if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) return true;
  if (/^\s*(?:[-*+]|\d+\.)\s/.test(line)) return true;
  if (/^\|.*\|$/.test(line.trim()) && i + 1 < lines.length && /^\|[\s:]*-{3,}/.test(lines[i + 1])) return true;
  return false;
}

// ─── Inline Parser ─────────────────────────────────────────────

/**
 * Parse inline Markdown elements.
 * Returns an array of inline AST nodes.
 * @param {string} text
 * @returns {ASTNode[]}
 */
export function parseInline(text) {
  const nodes = [];
  let remaining = text;

  while (remaining.length > 0) {
    let matched = false;

    // Bold+Italic ***text***
    const boldItalic = remaining.match(/^\*{3}(.+?)\*{3}/);
    if (boldItalic) {
      nodes.push({ type: 'boldItalic', children: parseInline(boldItalic[1]) });
      remaining = remaining.slice(boldItalic[0].length);
      matched = true;
      continue;
    }

    // Bold **text**
    const bold = remaining.match(/^\*{2}(.+?)\*{2}/);
    if (bold) {
      nodes.push({ type: 'bold', children: parseInline(bold[1]) });
      remaining = remaining.slice(bold[0].length);
      matched = true;
      continue;
    }

    // Italic *text*
    const italic = remaining.match(/^\*([^*]+?)\*/);
    if (italic) {
      nodes.push({ type: 'italic', children: parseInline(italic[1]) });
      remaining = remaining.slice(italic[0].length);
      matched = true;
      continue;
    }

    // Strikethrough ~~text~~
    const strike = remaining.match(/^~~(.+?)~~/);
    if (strike) {
      nodes.push({ type: 'strikethrough', value: strike[1] });
      remaining = remaining.slice(strike[0].length);
      matched = true;
      continue;
    }

    // Inline code `text`
    const inlineCode = remaining.match(/^`([^`]+)`/);
    if (inlineCode) {
      nodes.push({ type: 'inlineCode', value: inlineCode[1] });
      remaining = remaining.slice(inlineCode[0].length);
      matched = true;
      continue;
    }

    // Image ![alt](src)
    const image = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (image) {
      nodes.push({ type: 'image', props: { alt: image[1], src: image[2] } });
      remaining = remaining.slice(image[0].length);
      matched = true;
      continue;
    }

    // Link [text](url)
    const link = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (link) {
      nodes.push({ type: 'link', props: { url: link[2] }, children: parseInline(link[1]) });
      remaining = remaining.slice(link[0].length);
      matched = true;
      continue;
    }

    // Plain text (consume one char at a time until next special char)
    if (!matched) {
      const nextSpecial = remaining.slice(1).search(/[*~`!\[]/);
      const end = nextSpecial === -1 ? remaining.length : nextSpecial + 1;
      nodes.push({ type: 'text', value: remaining.slice(0, end) });
      remaining = remaining.slice(end);
    }
  }

  return nodes;
}
