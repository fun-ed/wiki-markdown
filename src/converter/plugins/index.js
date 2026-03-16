/**
 * Plugin Registry
 * Central export point for all Turndown plugins.
 * New plugins can be added here without modifying strategy code (Open-Closed).
 */
export { confluencePanelsPlugin } from './confluence-panels.js';
export { confluenceCodePlugin } from './confluence-code.js';
export { confluenceTablesPlugin } from './confluence-tables.js';
export { confluenceMentionsPlugin } from './confluence-mentions.js';
export { jiraIssuesPlugin } from './jira-issues.js';
export { createBase64ImagesPlugin } from './base64-images.js';
