/**
 * Notification Island (shared utility)
 * Visual toast notifications for keyboard shortcut / context menu actions.
 */

const NOTIFICATION_ID = 'wiki-md-notification';
const DISPLAY_MS = 2000;
const FADE_MS = 300;

/**
 * Show a toast notification on the current page.
 * @param {string} text
 * @param {boolean} [isError=false]
 */
export function showNotification(text, isError = false) {
  const existing = document.getElementById(NOTIFICATION_ID);
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.id = NOTIFICATION_ID;
  el.textContent = text;

  Object.assign(el.style, {
    position: 'fixed',
    top: '16px',
    right: '16px',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    zIndex: '999999',
    background: isError ? '#de350b' : '#00875a',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transition: 'opacity 0.3s',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  });

  document.body.appendChild(el);

  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), FADE_MS);
  }, DISPLAY_MS);
}
