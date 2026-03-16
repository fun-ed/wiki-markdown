/**
 * Plugin: Confluence Panel Macros
 * Converts info/warning/note/tip panels to blockquote format.
 * @implements {TurndownPlugin}
 */
export function confluencePanelsPlugin(turndownService) {
  turndownService.addRule('confluencePanel', {
    filter(node) {
      if (node.nodeName !== 'DIV') return false;
      const cl = node.classList;
      return (
        cl.contains('confluence-information-macro') ||
        cl.contains('panel') ||
        cl.contains('confluence-information-macro-information') ||
        cl.contains('confluence-information-macro-warning') ||
        cl.contains('confluence-information-macro-note') ||
        cl.contains('confluence-information-macro-tip')
      );
    },
    replacement(content, node) {
      const macroName =
        node.dataset?.macroName ||
        node.getAttribute('data-macro-name') ||
        detectPanelType(node);
      const label = macroName.toUpperCase();
      const body = content.trim().replace(/\n/g, '\n> ');
      return `\n> **${label}:** ${body}\n\n`;
    },
  });
}

function detectPanelType(node) {
  const cl = node.classList;
  if (cl.contains('confluence-information-macro-warning')) return 'warning';
  if (cl.contains('confluence-information-macro-note')) return 'note';
  if (cl.contains('confluence-information-macro-tip')) return 'tip';
  return 'info';
}
