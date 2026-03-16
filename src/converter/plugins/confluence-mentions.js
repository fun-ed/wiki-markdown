/**
 * Plugin: Confluence User Mentions & Status Macros
 * Converts user links to @mentions and status badges to inline code.
 * @implements {TurndownPlugin}
 */
export function confluenceMentionsPlugin(turndownService) {
  // User mentions
  turndownService.addRule('confluenceMention', {
    filter(node) {
      return (
        node.nodeName === 'A' &&
        (node.classList.contains('confluence-userlink') ||
          node.dataset?.username != null)
      );
    },
    replacement(_content, node) {
      const name = node.textContent.trim();
      return `@${name}`;
    },
  });

  // Status macro (colored labels like "IN PROGRESS", "DONE")
  turndownService.addRule('confluenceStatus', {
    filter(node) {
      return (
        node.nodeName === 'SPAN' &&
        node.classList.contains('status-macro')
      );
    },
    replacement(_content, node) {
      return `\`${node.textContent.trim()}\``;
    },
  });
}
