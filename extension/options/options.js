// Options page: persistent settings via browser.storage.local

const DEFAULTS = {
  embedBase64: true,
  htmlInlineImages: true,
  includeMetadata: true,
};

const STORAGE_KEY = 'wikiMdSettings';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  const settings = await loadSettings();
  applyToUI(settings);
  setupListeners();
  updateLocalPathVisibility(settings.embedBase64);
  document.getElementById('appVersion').textContent = 'v' + browser.runtime.getManifest().version;
}

async function loadSettings() {
  try {
    const result = await browser.storage.local.get(STORAGE_KEY);
    return { ...DEFAULTS, ...result[STORAGE_KEY] };
  } catch {
    return { ...DEFAULTS };
  }
}

function applyToUI(settings) {
  document.getElementById('optEmbedBase64').checked = settings.embedBase64;
  document.getElementById('optHtmlInlineImages').checked = settings.htmlInlineImages;
  document.getElementById('optIncludeMetadata').checked = settings.includeMetadata;
}

function setupListeners() {
  // Auto-save on any checkbox change
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const cb of checkboxes) {
    cb.addEventListener('change', saveFromUI);
  }

  // Show/hide local path info based on base64 toggle
  document.getElementById('optEmbedBase64').addEventListener('change', (e) => {
    updateLocalPathVisibility(e.target.checked);
  });

  // Reset button
  document.getElementById('btnReset').addEventListener('click', async () => {
    await browser.storage.local.set({ [STORAGE_KEY]: { ...DEFAULTS } });
    applyToUI(DEFAULTS);
    updateLocalPathVisibility(DEFAULTS.embedBase64);
    showSaved('Defaults restored');
  });
}

async function saveFromUI() {
  const settings = {
    embedBase64: document.getElementById('optEmbedBase64').checked,
    htmlInlineImages: document.getElementById('optHtmlInlineImages').checked,
    includeMetadata: document.getElementById('optIncludeMetadata').checked,
  };
  await browser.storage.local.set({ [STORAGE_KEY]: settings });
  showSaved('Settings saved');
}

function updateLocalPathVisibility(isBase64) {
  document.getElementById('localPathInfo').style.display = isBase64 ? 'none' : 'block';
}

function showSaved(text) {
  const el = document.getElementById('saveStatus');
  el.textContent = text;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 2000);
}
