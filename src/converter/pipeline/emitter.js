/**
 * Jira Wiki Markup Emitter
 * Converts an AST into Jira wiki markup string.
 *
 * Each node type has its own emit function — follows the Strategy Pattern
 * per node type. New node types can be added without modifying existing emitters.
 */

/** @type {Record<string, (node: ASTNode, ctx: EmitContext) => string>} */
const emitters = {};

/**
 * Register an emitter for a node type.
 * @param {string} nodeType
 * @param {(node: ASTNode, ctx: EmitContext) => string} fn
 */
export function registerEmitter(nodeType, fn) {
  emitters[nodeType] = fn;
}

/**
 * Emit an AST node to Jira wiki markup.
 * @param {ASTNode} node
 * @param {EmitContext} [ctx]
 * @returns {string}
 */
export function emit(node, ctx = { listStack: [] }) {
  const fn = emitters[node.type];
  if (!fn) {
    // Fallback: emit children or value
    if (node.children) return emitChildren(node, ctx);
    return node.value || '';
  }
  return fn(node, ctx);
}

function emitChildren(node, ctx) {
  if (!node.children) return '';
  return node.children.map((child) => emit(child, ctx)).join('');
}

// ─── Register Built-in Emitters ────────────────────────────────

registerEmitter('document', (node, ctx) => {
  return node.children.map((child) => emit(child, ctx)).join('\n');
});

registerEmitter('heading', (node, ctx) => {
  const level = node.props?.level || 1;
  const content = emitChildren(node, ctx);
  return `h${level}. ${content}\n`;
});

registerEmitter('paragraph', (node, ctx) => {
  return emitChildren(node, ctx) + '\n';
});

registerEmitter('hr', () => '----\n');

registerEmitter('codeBlock', (node) => {
  const lang = node.props?.lang;
  const tag = lang ? `{code:${lang}}` : '{code}';
  return `${tag}\n${node.value}\n{code}\n`;
});

registerEmitter('blockquote', (node, ctx) => {
  const inner = node.children.map((child) => emit(child, ctx)).join('\n').trim();
  const lines = inner.split('\n');
  if (lines.length === 1) {
    return `bq. ${inner}\n`;
  }
  return `{quote}\n${inner}\n{quote}\n`;
});

registerEmitter('table', (node, ctx) => {
  const headers = node.props?.headers || [];
  const headerRow = `||${headers.join('||')}||`;
  const bodyRows = node.children
    .map((row) => {
      const cells = row.props?.cells || [];
      return `|${cells.join('|')}|`;
    })
    .join('\n');
  return `${headerRow}\n${bodyRows}\n`;
});

registerEmitter('list', (node, ctx) => {
  return node.children.map((child) => emit(child, ctx)).join('');
});

registerEmitter('listItem', (node, ctx) => {
  const ordered = node.props?.ordered;
  const depth = (node.props?.resolvedDepth || node.props?.depth || 0) + 1;
  const marker = ordered ? '#' : '*';
  const prefix = marker.repeat(depth);

  // Separate inline children from nested block children
  const inlineNodes = [];
  const blockNodes = [];
  for (const child of (node.children || [])) {
    if (child.type === 'list') {
      blockNodes.push(child);
    } else {
      inlineNodes.push(child);
    }
  }

  const content = inlineNodes.map((c) => emit(c, ctx)).join('');
  let result = `${prefix} ${content}\n`;

  // Emit nested lists
  for (const block of blockNodes) {
    result += emit(block, ctx);
  }

  return result;
});

// ─── Inline Emitters ───────────────────────────────────────────

registerEmitter('text', (node) => node.value || '');

registerEmitter('bold', (node, ctx) => {
  return `*${emitChildren(node, ctx)}*`;
});

registerEmitter('italic', (node, ctx) => {
  return `_${emitChildren(node, ctx)}_`;
});

registerEmitter('boldItalic', (node, ctx) => {
  return `_*${emitChildren(node, ctx)}*_`;
});

registerEmitter('strikethrough', (node) => {
  return `-${node.value}-`;
});

registerEmitter('inlineCode', (node) => {
  return `{{${node.value}}}`;
});

registerEmitter('link', (node, ctx) => {
  const text = emitChildren(node, ctx);
  const url = node.props?.url || '';
  return `[${text}|${url}]`;
});

registerEmitter('image', (node) => {
  const src = node.props?.src || '';
  return `!${src}!`;
});
