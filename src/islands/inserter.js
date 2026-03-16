/**
 * Inserter Island
 * Responsible for inserting content into Jira/Confluence editors.
 * Detects editor type and uses appropriate insertion strategy.
 *
 * Handles: insertMarkdownToJira, insertFromClipboard
 */
import { registerHandler } from './message-bus.js';
import { showNotification } from './notification.js';

export function initInserterIsland() {
  registerHandler('insertMarkdownToJira', (msg) =>
    Promise.resolve(insertToEditor(msg.jiraMarkup, msg.html))
  );
  registerHandler('insertFromClipboard', () => handleInsertFromClipboard());
}

// ─── Editor Detection & Insertion ────────────────────────────────

/**
 * Insert content into the active editor.
 * Uses strategy selection based on detected editor type.
 */
function insertToEditor(jiraMarkup, html) {
  // Strategy 1: ProseMirror (Jira Cloud / Confluence Cloud new editor)
  const proseMirror = document.querySelector('.ProseMirror[contenteditable="true"]');
  if (proseMirror) {
    return insertViaProseMirror(proseMirror, html, jiraMarkup);
  }

  // Strategy 2: TinyMCE (Confluence legacy editor)
  const tinymce = document.querySelector('#tinymce, .mce-content-body');
  if (tinymce) {
    return insertViaTinyMCE(html);
  }

  // Strategy 3: Plain textarea (fallback)
  const textarea = document.querySelector(
    'textarea[name="description"], textarea[name="comment"], textarea.wiki-edit'
  );
  if (textarea) {
    textarea.value = jiraMarkup;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    return { success: true, method: 'textarea' };
  }

  return { success: false, error: 'No editable field found. Please open an editor first.' };
}

function insertViaProseMirror(editor, html, jiraMarkup) {
  try {
    editor.focus();
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor);
    sel.removeAllRanges();
    sel.addRange(range);

    const clipboardData = new DataTransfer();
    clipboardData.setData('text/html', html);
    clipboardData.setData('text/plain', jiraMarkup);

    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData,
    });

    editor.dispatchEvent(pasteEvent);
    return { success: true, method: 'prosemirror-paste' };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function insertViaTinyMCE(html) {
  try {
    if (window.tinymce && window.tinymce.activeEditor) {
      window.tinymce.activeEditor.setContent(html);
      return { success: true, method: 'tinymce' };
    }
    return { success: false, error: 'TinyMCE not accessible' };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function handleInsertFromClipboard() {
  try {
    const md = await navigator.clipboard.readText();
    if (!md || !md.trim()) {
      showNotification('Clipboard is empty', true);
      return { success: false };
    }
    const escDiv = document.createElement('div');
    escDiv.textContent = md;
    const result = insertToEditor(md, `<pre>${escDiv.innerHTML}</pre>`);
    if (result.success) showNotification('Inserted from clipboard!');
    return result;
  } catch (e) {
    showNotification('Insert failed: ' + e.message, true);
    return { success: false, error: e.message };
  }
}
