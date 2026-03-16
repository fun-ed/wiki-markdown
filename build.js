const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EXT_DIR = path.join(ROOT, 'extension');

async function build() {
  // 1. Bundle converter library (for popup — IIFE with global name)
  await esbuild.build({
    entryPoints: [path.join(ROOT, 'src/converter/index.js')],
    bundle: true,
    outfile: path.join(EXT_DIR, 'lib/converter.bundle.js'),
    format: 'iife',
    globalName: 'JiraMdConverter',
    target: ['chrome109', 'firefox109'],
    minify: false,
    sourcemap: 'inline',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  console.log('✅ Built extension/lib/converter.bundle.js');

  // 2. Bundle content script (islands architecture — IIFE, no global)
  await esbuild.build({
    entryPoints: [path.join(ROOT, 'src/islands/index.js')],
    bundle: true,
    outfile: path.join(EXT_DIR, 'content.js'),
    format: 'iife',
    target: ['chrome109', 'firefox109'],
    minify: false,
    sourcemap: 'inline',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  console.log('✅ Built extension/content.js (islands)');

  // 3. Bundle webextension-polyfill for Chrome compatibility
  await esbuild.build({
    entryPoints: [require.resolve('webextension-polyfill')],
    bundle: true,
    outfile: path.join(EXT_DIR, 'lib/browser-polyfill.js'),
    format: 'iife',
    target: ['chrome109'],
    minify: true,
  });
  console.log('✅ Built extension/lib/browser-polyfill.js');

  // 4. Generate Chrome manifest
  generateChromeManifest();
  console.log('✅ Generated dist/chrome/manifest.json');
}

function generateChromeManifest() {
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

  const chromeDir = path.join(ROOT, 'dist', 'chrome');
  fs.mkdirSync(chromeDir, { recursive: true });
  fs.writeFileSync(path.join(chromeDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

build().catch((e) => {
  console.error('Build failed:', e);
  process.exit(1);
});
