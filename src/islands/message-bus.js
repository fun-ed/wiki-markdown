/**
 * Message Bus
 * Decoupled event-driven communication layer for islands.
 * Each island registers handlers; the bus routes incoming extension messages.
 *
 * Follows Mediator Pattern — islands don't know about each other,
 * they only interact through the bus.
 */

/** @type {Map<string, (message: any) => Promise<any>>} */
const handlers = new Map();

/**
 * Register a message handler for a specific message type.
 * @param {string} messageType
 * @param {(message: any) => Promise<any>} handler
 */
export function registerHandler(messageType, handler) {
  if (handlers.has(messageType)) {
    console.warn(`[MessageBus] Overwriting handler for "${messageType}"`);
  }
  handlers.set(messageType, handler);
}

/**
 * Initialize the message bus — connects to browser.runtime.onMessage.
 * Must be called once during content script initialization.
 */
export function initMessageBus() {
  browser.runtime.onMessage.addListener((message, _sender) => {
    const handler = handlers.get(message.type);
    if (handler) {
      return handler(message);
    }
    return false; // Not handled
  });
}

/**
 * Send a message to the background script.
 * @param {Object} message
 * @returns {Promise<any>}
 */
export function sendToBackground(message) {
  return browser.runtime.sendMessage(message);
}
