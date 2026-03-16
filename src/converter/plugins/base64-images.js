/**
 * Plugin: Base64 Image Inlining
 * Replaces <img> src with data URIs from a pre-fetched map.
 * Factory function: creates a plugin bound to a specific URL→dataURI map.
 * @param {Map<string,string>} imageBase64Map - URL → data URI mapping
 * @returns {TurndownPlugin}
 */
export function createBase64ImagesPlugin(imageBase64Map) {
  return function base64ImagesPlugin(turndownService) {
    turndownService.addRule('base64Images', {
      filter: 'img',
      replacement(_content, node) {
        const src = node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        const resolvedSrc = imageBase64Map.get(src) || src;
        return `![${alt}](${resolvedSrc})`;
      },
    });
  };
}
