/**
 * AST Transformer
 * Applies transformations to the parsed AST before emission.
 * Each transformer is a visitor function that can modify nodes in-place.
 *
 * Follows the Visitor Pattern — new transformations can be added
 * without modifying existing code (Open-Closed Principle).
 */

/**
 * @typedef {(node: ASTNode, parent?: ASTNode) => ASTNode|null} TransformVisitor
 */

/**
 * Walk an AST tree and apply visitor to each node (depth-first).
 * If visitor returns null, the node is removed.
 * @param {ASTNode} ast
 * @param {TransformVisitor} visitor
 * @returns {ASTNode}
 */
export function walkAndTransform(ast, visitor) {
  const result = visitor(ast);
  if (!result) return null;

  if (result.children && Array.isArray(result.children)) {
    result.children = result.children
      .map((child) => walkAndTransform(child, visitor))
      .filter(Boolean);
  }

  return result;
}

/**
 * Compose multiple visitors into a single visitor.
 * Visitors are applied in order.
 * @param {TransformVisitor[]} visitors
 * @returns {TransformVisitor}
 */
export function composeVisitors(...visitors) {
  return (node, parent) => {
    let current = node;
    for (const visitor of visitors) {
      current = visitor(current, parent);
      if (!current) return null;
    }
    return current;
  };
}

// ─── Built-in Transformers ─────────────────────────────────────

/**
 * Collapse consecutive blank paragraphs into a single break.
 */
export function collapseBlankLines(node) {
  if (node.type === 'document' && node.children) {
    const collapsed = [];
    let prevBlank = false;
    for (const child of node.children) {
      const isBlank = child.type === 'paragraph' &&
        child.children?.length === 1 &&
        child.children[0].type === 'text' &&
        child.children[0].value?.trim() === '';
      if (isBlank) {
        if (!prevBlank) collapsed.push(child);
        prevBlank = true;
      } else {
        collapsed.push(child);
        prevBlank = false;
      }
    }
    return { ...node, children: collapsed };
  }
  return node;
}

/**
 * Normalize list item depth based on actual nesting level.
 */
export function normalizeListDepth(node, _parent, depth = 0) {
  if (node.type === 'listItem') {
    return { ...node, props: { ...node.props, resolvedDepth: depth } };
  }
  if (node.type === 'list' && node.children) {
    return {
      ...node,
      children: node.children.map((child) => normalizeListDepth(child, node, depth + 1)),
    };
  }
  return node;
}
