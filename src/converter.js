import TurndownService from 'turndown';
import { gfm } from '@truto/turndown-plugin-gfm';
import J2M from 'jira2md';

// ─── Jira/Confluence HTML → Markdown ─────────────────────────────
function createTurndownService() {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });

  // GFM: tables, strikethrough, task lists
  td.use(gfm);

  // Confluence-specific: info/warning/note panels
  td.addRule('confluencePanel', {
    filter(node) {
      return (
        node.nodeName === 'DIV' &&
        (node.classList.contains('confluence-information-macro') ||
          node.classList.contains('panel'))
      );
    },
    replacement(content, node) {
      const type =
        node.dataset?.macroName ||
        node.getAttribute('data-macro-name') ||
        'info';
      return `\n> **${type.toUpperCase()}:** ${content.trim()}\n\n`;
    },
  });

  // Confluence: code macro
  td.addRule('confluenceCodeBlock', {
    filter(node) {
      return (
        node.nodeName === 'DIV' &&
        node.classList.contains('code') &&
        node.classList.contains('panel')
      );
    },
    replacement(content, node) {
      const lang =
        node.querySelector('.code')?.dataset?.syntaxhighlighterParams || '';
      const langMatch = lang.match(/brush:\s*(\w+)/);
      const langName = langMatch ? langMatch[1] : '';
      const code =
        node.querySelector('pre')?.textContent || content.trim();
      return `\n\`\`\`${langName}\n${code}\n\`\`\`\n`;
    },
  });

  // Confluence: status macro (colored labels)
  td.addRule('confluenceStatus', {
    filter(node) {
      return (
        node.nodeName === 'SPAN' &&
        node.classList.contains('status-macro')
      );
    },
    replacement(content, node) {
      return `\`${node.textContent.trim()}\``;
    },
  });

  // Confluence: mention / user link
  td.addRule('confluenceMention', {
    filter(node) {
      return (
        node.nodeName === 'A' &&
        (node.classList.contains('confluence-userlink') ||
          node.dataset?.username)
      );
    },
    replacement(content, node) {
      return `@${node.textContent.trim()}`;
    },
  });

  // Jira: issue key links (e.g. PROJ-123)
  td.addRule('jiraIssueLink', {
    filter(node) {
      return (
        node.nodeName === 'A' &&
        node.classList.contains('issue-link')
      );
    },
    replacement(content, node) {
      const key = node.dataset?.issueKey || node.textContent.trim();
      const href = node.getAttribute('href') || '';
      return `[${key}](${href})`;
    },
  });

  // Jira: emoticons
  td.addRule('jiraEmoticon', {
    filter(node) {
      return (
        node.nodeName === 'IMG' &&
        node.classList.contains('emoticon')
      );
    },
    replacement(content, node) {
      const alt = node.getAttribute('alt') || '';
      return alt || '';
    },
  });

  return td;
}

/**
 * Convert rendered HTML (from Jira/Confluence page DOM) to Markdown.
 * @param {string} html - The HTML content
 * @param {Object} options
 * @param {Map<string,string>} [options.imageBase64Map] - URL → data URI map
 * @param {Object} [options.metadata] - Page metadata to include as YAML front matter
 * @returns {string} Markdown
 */
export function htmlToMarkdown(html, options = {}) {
  const { imageBase64Map, metadata } = options;
  const td = createTurndownService();

  // If we have base64 images, add a rule to replace <img> src
  if (imageBase64Map && imageBase64Map.size > 0) {
    td.addRule('base64Images', {
      filter: 'img',
      replacement(content, node) {
        const src = node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        const dataUri = imageBase64Map.get(src) || src;
        return `![${alt}](${dataUri})`;
      },
    });
  }

  let md = td.turndown(html);

  // YAML front matter
  if (metadata && Object.keys(metadata).length > 0) {
    const frontMatter = Object.entries(metadata)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join('\n');
    md = `---\n${frontMatter}\n---\n\n${md}`;
  }

  return md;
}

// ─── Jira Wiki Markup → Markdown ─────────────────────────────────
/**
 * Convert Jira wiki markup to Markdown with fixes for known issues.
 */
export function jiraToMarkdown(jiraMarkup) {
  let md = J2M.to_markdown(jiraMarkup);

  // Fix: heading should have space after #
  md = md.replace(/^(#{1,6})(\S)/gm, '$1 $2');

  // Fix: table alignment — ensure consistent pipe spacing
  md = md.replace(/\|([^|\n]+)/g, (match, cell) => {
    return `| ${cell.trim()} `;
  });

  return md;
}

// ─── Markdown → Jira Wiki Markup ─────────────────────────────────
/**
 * Convert Markdown to Jira wiki markup with enhanced fixes for
 * tables, nested lists, headings, and whitespace.
 */
export function markdownToJira(markdown) {
  // Pre-process: normalize line endings
  let str = markdown.replace(/\r\n/g, '\n');

  // ── Phase 1: Protect structures jira2md would mangle ──────────

  // 1a. Fenced code blocks → placeholders
  const codeBlocks = [];
  str = str.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang, code: code.replace(/\n$/, '') });
    return `%%CODEBLOCK_${idx}%%`;
  });

  // 1b. Inline code → placeholders (prevent ` being mangled)
  const inlineCodes = [];
  str = str.replace(/`([^`\n]+)`/g, (match, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(code);
    return `%%INLINE_${idx}%%`;
  });

  // 1c. GFM tables → placeholders (jira2md table handling is broken)
  const tableBlocks = [];
  str = str.replace(
    /^(\|.*\|)\n(\|[\s:]*-{3,}[\s:]*(?:\|[\s:]*-{3,}[\s:]*)*\|)\n((?:\|.*\|\n?)*)/gm,
    (match, headerLine, sepLine, bodyLines) => {
      const idx = tableBlocks.length;
      tableBlocks.push({ headerLine, bodyLines: bodyLines.trimEnd() });
      return `%%TABLE_${idx}%%`;
    }
  );

  // 1d. Multi-line blockquotes → placeholders
  //     Markdown: > line1\n> line2  →  Jira: {quote}\nline1\nline2\n{quote}
  const blockquotes = [];
  str = str.replace(/^((?:>\s?.*\n?)+)/gm, (match) => {
    const idx = blockquotes.length;
    const content = match
      .split('\n')
      .map((line) => line.replace(/^>\s?/, ''))
      .join('\n')
      .trimEnd();
    blockquotes.push(content);
    return `%%BLOCKQUOTE_${idx}%%`;
  });

  // 1e. Nested mixed lists → convert indentation to Jira symbols
  //     Handle before jira2md to get correct *# / #* nesting
  const listBlocks = [];
  str = str.replace(/^((?:[ \t]*(?:[-*+]|\d+\.)\s+.*\n?)+)/gm, (match) => {
    const idx = listBlocks.length;
    listBlocks.push(match.trimEnd());
    return `%%LIST_${idx}%%`;
  });

  // ── Phase 2: Run jira2md on remaining simple content ──────────
  let jira = J2M.to_jira(str);

  // ── Phase 3: Restore protected structures ─────────────────────

  // 3a. Restore code blocks
  codeBlocks.forEach(({ lang, code }, idx) => {
    const jiraLang = lang ? `{code:${lang}}` : '{code}';
    jira = jira.replace(`%%CODEBLOCK_${idx}%%`, `${jiraLang}\n${code}\n{code}`);
  });

  // 3b. Restore inline code
  inlineCodes.forEach((code, idx) => {
    jira = jira.replace(`%%INLINE_${idx}%%`, `{{${code}}}`);
  });

  // 3c. Restore tables with proper Jira formatting
  tableBlocks.forEach(({ headerLine, bodyLines }, idx) => {
    const headers = headerLine
      .split('|')
      .filter(Boolean)
      .map((c) => c.trim());
    const jiraHeader = `||${headers.join('||')}||`;
    const jiraRows = bodyLines
      .split('\n')
      .filter(Boolean)
      .map((row) => {
        const cells = row
          .split('|')
          .filter(Boolean)
          .map((c) => c.trim());
        return `|${cells.join('|')}|`;
      })
      .join('\n');
    jira = jira.replace(`%%TABLE_${idx}%%`, `${jiraHeader}\n${jiraRows}`);
  });

  // 3d. Restore blockquotes
  blockquotes.forEach((content, idx) => {
    // For single-line blockquotes, use bq. prefix
    // For multi-line, use {quote}...{quote} macro
    const lines = content.split('\n');
    let bq;
    if (lines.length === 1) {
      bq = `bq. ${content}`;
    } else {
      bq = `{quote}\n${content}\n{quote}`;
    }
    jira = jira.replace(`%%BLOCKQUOTE_${idx}%%`, bq);
  });

  // 3e. Restore lists with proper Jira nesting
  listBlocks.forEach((block, idx) => {
    const jiraList = convertNestedList(block);
    jira = jira.replace(`%%LIST_${idx}%%`, jiraList);
  });

  // ── Phase 4: Final cleanup ────────────────────────────────────

  // Fix: ensure headings have format "h1. Title" (space after dot)
  jira = jira.replace(/^(h[1-6]\.)\s*(\S)/gm, '$1 $2');

  // Fix: remove triple+ blank lines
  jira = jira.replace(/\n{3,}/g, '\n\n');

  return jira;
}

/**
 * Convert a block of nested Markdown list items to Jira wiki markup.
 * Handles mixed ordered/unordered nesting (e.g., *# and #* in Jira).
 */
function convertNestedList(block) {
  const lines = block.split('\n');
  const result = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Determine indentation level
    const leadingSpaces = line.match(/^([ \t]*)/)[1];
    const indent = leadingSpaces.replace(/\t/g, '    ').length;
    const depth = Math.floor(indent / 2) + 1;

    // Determine list type
    const isOrdered = /^\s*\d+\.\s/.test(line);
    const content = line.replace(/^\s*(?:[-*+]|\d+\.)\s+/, '');

    // Build Jira list prefix: * for unordered, # for ordered
    // For depth > 1, we need to look at parent types
    // Simple approach: use the type at each level
    const marker = isOrdered ? '#' : '*';
    const prefix = marker.repeat(depth);

    result.push(`${prefix} ${content}`);
  }

  return result.join('\n');
}

// ─── Export for use in content script / popup ────────────────────
export { J2M };
