/**
 * Converter Facade
 * Entry point for all conversion operations.
 * Uses Strategy Pattern — each conversion direction is a separate strategy.
 * New formats can be added by registering new strategies (Open-Closed Principle).
 *
 * @example
 * import { htmlToMarkdown, markdownToJira, jiraToMarkdown } from './converter';
 */
import { MarkdownStrategy } from './strategies/markdown.js';
import { JiraStrategy } from './strategies/jira.js';

// ─── Strategy instances (Singleton per strategy) ─────────────────
const markdownStrategy = new MarkdownStrategy();
const jiraStrategy = new JiraStrategy();

// ─── Public API ──────────────────────────────────────────────────

/**
 * Convert rendered HTML to Markdown.
 * @param {string} html
 * @param {Object} [options]
 * @param {Map<string,string>} [options.imageBase64Map]
 * @param {Object} [options.metadata]
 * @returns {string}
 */
export function htmlToMarkdown(html, options = {}) {
  return markdownStrategy.convert(html, options);
}

/**
 * Convert Jira wiki markup to Markdown.
 * @param {string} jiraMarkup
 * @returns {string}
 */
export function jiraToMarkdown(jiraMarkup) {
  return jiraStrategy.toMarkdown(jiraMarkup);
}

/**
 * Convert Markdown to Jira wiki markup via AST pipeline.
 * @param {string} markdown
 * @returns {string}
 */
export function markdownToJira(markdown) {
  return jiraStrategy.fromMarkdown(markdown);
}

/**
 * Re-export J2M for HTML generation (used by popup's Fill Jira feature).
 */
export const J2M = jiraStrategy.j2m;
