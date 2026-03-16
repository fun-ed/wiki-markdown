// Package Chrome extension: copy extension files + swap manifest
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const EXT_DIR = path.join(ROOT, 'extension');
const CHROME_DIST = path.join(ROOT, 'dist', 'chrome');

// Clean and create output dir
fs.rmSync(CHROME_DIST, { recursive: true, force: true });
fs.mkdirSync(CHROME_DIST, { recursive: true });

// Read Firefox manifest and transform for Chrome
const manifest = JSON.parse(fs.readFileSync(path.join(EXT_DIR, 'manifest.json'), 'utf-8'));

delete manifest.browser_specific_settings;
manifest.permissions = manifest.permissions.map((p) => (p === 'menus' ? 'contextMenus' : p));
manifest.background = { service_worker: 'background.js', type: 'module' };

if (manifest.optional_host_permissions) {
  manifest.optional_permissions = (manifest.optional_permissions || []).concat(
    manifest.optional_host_permissions
  );
  delete manifest.optional_host_permissions;
}

fs.writeFileSync(path.join(CHROME_DIST, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Copy all extension files except manifest.json
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'manifest.json') continue;
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(EXT_DIR, CHROME_DIST);

// Create zip using execFileSync (safe, no shell injection)
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
const zipFile = path.join(ROOT, 'dist', `wiki_markdown-${pkg.version}-chrome.zip`);
try { fs.unlinkSync(zipFile); } catch {}
execFileSync('zip', ['-r', zipFile, '.'], { cwd: CHROME_DIST, stdio: 'inherit' });
console.log(`✅ Chrome extension packaged: dist/wiki_markdown-${pkg.version}-chrome.zip`);
