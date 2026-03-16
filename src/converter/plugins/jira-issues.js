/**
 * Plugin: Jira Issue Links & Emoticons
 * Converts issue-link anchors to [KEY](url) and emoticon images to text.
 * @implements {TurndownPlugin}
 */
export function jiraIssuesPlugin(turndownService) {
  // Issue key links (e.g. PROJ-123)
  turndownService.addRule('jiraIssueLink', {
    filter(node) {
      return (
        node.nodeName === 'A' &&
        node.classList.contains('issue-link')
      );
    },
    replacement(_content, node) {
      const key = node.dataset?.issueKey || node.textContent.trim();
      const href = node.getAttribute('href') || '';
      return `[${key}](${href})`;
    },
  });

  // Emoticon images → alt text
  turndownService.addRule('jiraEmoticon', {
    filter(node) {
      return (
        node.nodeName === 'IMG' &&
        node.classList.contains('emoticon')
      );
    },
    replacement(_content, node) {
      return node.getAttribute('alt') || '';
    },
  });
}
