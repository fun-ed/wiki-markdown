/**
 * Markdown Strategy
 * Converts HTML (from Jira/Confluence DOM) to Markdown.
 * Uses Turndown as the core engine with a plugin architecture.
 *
 * @implements {ConversionStrategy}
 */
import TurndownService from 'turndown';
import { gfm } from '@truto/turndown-plugin-gfm';
import {
  confluencePanelsPlugin,
  confluenceCodePlugin,
  confluenceTablesPlugin,
  confluenceMentionsPlugin,
  jiraIssuesPlugin,
  createBase64ImagesPlugin,
} from '../plugins/index.js';

export class MarkdownStrategy {
  /** @type {string} */
  get name() {
    return 'markdown';
  }

  /**
   * Convert HTML to Markdown.
   * @param {string} html
   * @param {Object} [options]
   * @param {Map<string,string>} [options.imageBase64Map]
   * @param {Object} [options.metadata]
   * @returns {string}
   */
  convert(html, options = {}) {
    const { imageBase64Map, metadata } = options;
    const service = this._createService(imageBase64Map);
    let md = service.turndown(html);

    if (metadata && Object.keys(metadata).length > 0) {
      md = this._buildFrontMatter(metadata) + md;
    }

    return md;
  }

  /**
   * Create and configure a Turndown instance with all plugins.
   * @private
   */
  _createService(imageBase64Map) {
    const service = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*',
    });

    // Core GFM support
    service.use(gfm);

    // Confluence plugins
    service.use(confluencePanelsPlugin);
    service.use(confluenceCodePlugin);
    service.use(confluenceTablesPlugin);
    service.use(confluenceMentionsPlugin);

    // Jira plugins
    service.use(jiraIssuesPlugin);

    // Base64 image inlining (conditional)
    if (imageBase64Map && imageBase64Map.size > 0) {
      service.use(createBase64ImagesPlugin(imageBase64Map));
    }

    return service;
  }

  /**
   * Build YAML front matter from metadata object.
   * @private
   */
  _buildFrontMatter(metadata) {
    const entries = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');
    return `---\n${entries}\n---\n\n`;
  }
}
