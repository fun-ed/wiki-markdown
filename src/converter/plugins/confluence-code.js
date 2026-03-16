/**
 * Plugin: Confluence Code Blocks
 * Converts Confluence code panels/blocks to fenced code blocks (```).
 * Supports both Server/DC and Cloud HTML structures.
 * @implements {TurndownPlugin}
 */
export function confluenceCodePlugin(turndownService) {
  // ── Rule 1: Confluence Server/DC — div.code.panel ──
  turndownService.addRule('confluenceCodePanel', {
    filter(node) {
      return (
        node.nodeName === 'DIV' &&
        node.classList.contains('code') &&
        node.classList.contains('panel')
      );
    },
    replacement(_content, node) {
      const paramStr =
        node.querySelector('.code')?.dataset?.syntaxhighlighterParams || '';
      const lang = extractLang(paramStr);
      const codeEl = node.querySelector('pre');
      const code = codeEl ? codeEl.textContent : _content.trim();
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });

  // ── Rule 2: Confluence Cloud — div[data-node-type="codeBlock"] ──
  turndownService.addRule('confluenceCloudCodeBlock', {
    filter(node) {
      return (
        node.nodeName === 'DIV' &&
        (node.getAttribute('data-node-type') === 'codeBlock' ||
         node.classList.contains('code-block'))
      );
    },
    replacement(_content, node) {
      const lang =
        node.getAttribute('data-language') ||
        node.dataset?.language ||
        '';
      const code = extractCodeText(node);
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });

  // ── Rule 3: Confluence macro table-based code blocks ──
  // <table data-macro-name="code"> or with class "wysiwyg-macro"
  turndownService.addRule('confluenceCodeMacroTable', {
    filter(node) {
      if (node.nodeName !== 'TABLE') return false;
      return (
        node.getAttribute('data-macro-name') === 'code' ||
        (node.classList.contains('wysiwyg-macro') &&
         node.querySelector('pre'))
      );
    },
    replacement(_content, node) {
      const paramStr =
        node.getAttribute('data-macro-parameters') ||
        node.getAttribute('data-syntaxhighlighter-params') || '';
      const lang = extractLang(paramStr);
      const pre = node.querySelector('pre');
      const code = pre ? pre.textContent : _content.trim();
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });

  // ── Rule 4: pre with Confluence-specific attributes ──
  // Catches <pre> with data-syntaxhighlighter-params or class="syntaxhighlighter-*"
  turndownService.addRule('confluencePreBlock', {
    filter(node) {
      if (node.nodeName !== 'PRE') return false;
      return !!(
        node.getAttribute('data-syntaxhighlighter-params') ||
        node.className.match(/syntaxhighlighter/) ||
        // Confluence Cloud: <pre> inside codeBlock wrapper (already handled by rule 2,
        // but catch standalone ones)
        node.parentElement?.getAttribute('data-node-type') === 'codeBlock'
      );
    },
    replacement(_content, node) {
      // Skip if parent is already handled by rule 2
      if (node.parentElement?.getAttribute('data-node-type') === 'codeBlock') {
        return false; // let rule 2 handle it
      }
      const paramStr = node.getAttribute('data-syntaxhighlighter-params') || '';
      const lang = extractLang(paramStr);
      const code = node.textContent;
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });

  // ── Rule 5: Generic <pre><code> — improve Turndown's default ──
  // Turndown handles this natively, but sometimes loses newlines
  // when <code> contains <span> wrappers (syntax highlighting).
  turndownService.addRule('preCodeWithSpans', {
    filter(node) {
      if (node.nodeName !== 'PRE') return false;
      const code = node.querySelector('code');
      if (!code) return false;
      // Only intercept if code contains child elements (spans for syntax highlight)
      return code.children.length > 0;
    },
    replacement(_content, node) {
      const codeEl = node.querySelector('code');
      const lang =
        extractLangFromClass(codeEl.className) ||
        extractLangFromClass(node.className) ||
        '';
      const code = extractCodeText(node);
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });
}

/**
 * Extract language from Confluence syntaxhighlighter params string.
 * e.g. "brush: bash; gutter: true" → "bash"
 */
function extractLang(paramStr) {
  const match = paramStr.match(/brush:\s*(\w+)/);
  return match ? normalizeLanguage(match[1]) : '';
}

/**
 * Extract language from CSS class names.
 * e.g. "language-bash", "lang-js", "brush-python"
 */
function extractLangFromClass(className) {
  if (!className) return '';
  const match = className.match(/(?:language|lang|brush)-(\w+)/);
  return match ? normalizeLanguage(match[1]) : '';
}

/**
 * Normalize common language aliases to standard names.
 */
function normalizeLanguage(lang) {
  const aliases = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rb: 'ruby',
    sh: 'bash',
    shell: 'bash',
    yml: 'yaml',
  };
  return aliases[lang.toLowerCase()] || lang.toLowerCase();
}

/**
 * Extract plain text code from a node, preserving line breaks.
 * Handles <span>-wrapped lines, <br> tags, and plain text.
 */
function extractCodeText(node) {
  const codeEl = node.querySelector('code') || node.querySelector('pre') || node;

  // If it has child elements (spans for syntax highlighting), walk the DOM
  if (codeEl.children.length > 0) {
    let text = '';
    for (const child of codeEl.childNodes) {
      if (child.nodeType === 3) {
        // Text node
        text += child.textContent;
      } else if (child.nodeName === 'BR') {
        text += '\n';
      } else if (child.nodeName === 'SPAN' || child.nodeName === 'DIV') {
        // Span-wrapped line or div line
        text += child.textContent;
        // Add newline after block-level elements or if next sibling isn't inline
        if (child.nodeName === 'DIV') {
          text += '\n';
        }
      } else {
        text += child.textContent;
      }
    }
    return text.replace(/\n$/, ''); // trim trailing newline
  }

  return codeEl.textContent;
}
