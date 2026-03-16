/**
 * Jira Strategy
 * Bidirectional conversion between Jira wiki markup and Markdown.
 * Uses AST pipeline for MD→Jira (original implementation).
 * Uses jira2md for Jira→MD direction (with post-processing fixes).
 *
 * @implements {ConversionStrategy}
 */
import J2M from 'jira2md';
import { parse } from '../pipeline/parser.js';
import { walkAndTransform, collapseBlankLines, normalizeListDepth } from '../pipeline/transformer.js';
import { emit } from '../pipeline/emitter.js';

export class JiraStrategy {
  /** @type {string} */
  get name() {
    return 'jira';
  }

  /**
   * Convert Markdown to Jira wiki markup via AST pipeline.
   * Pipeline: parse → transform → emit
   * @param {string} markdown
   * @returns {string}
   */
  fromMarkdown(markdown) {
    // Phase 1: Parse to AST
    let ast = parse(markdown);

    // Phase 2: Apply transformers
    ast = walkAndTransform(ast, collapseBlankLines);
    ast = normalizeListDepth(ast);

    // Phase 3: Emit Jira markup
    let result = emit(ast);

    // Phase 4: Final cleanup
    result = this._postProcess(result);

    return result;
  }

  /**
   * Convert Jira wiki markup to Markdown.
   * Uses jira2md core with post-processing fixes.
   * @param {string} jiraMarkup
   * @returns {string}
   */
  toMarkdown(jiraMarkup) {
    let md = J2M.to_markdown(jiraMarkup);

    // Fix: heading should have space after #
    md = md.replace(/^(#{1,6})(\S)/gm, '$1 $2');

    // Fix: table cell spacing
    md = md.replace(/\|([^|\n]+)/g, (_match, cell) => {
      return `| ${cell.trim()} `;
    });

    return md;
  }

  /**
   * Access to J2M for HTML generation (used by Fill Jira feature).
   */
  get j2m() {
    return J2M;
  }

  /** @private */
  _postProcess(jira) {
    // Ensure headings have space after dot
    jira = jira.replace(/^(h[1-6]\.)\s*(\S)/gm, '$1 $2');

    // Remove triple+ blank lines
    jira = jira.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace per line
    jira = jira.replace(/[ \t]+$/gm, '');

    return jira.trim();
  }
}
