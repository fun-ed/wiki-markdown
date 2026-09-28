# Wiki ↔ Markdown

Cross-browser extension (Firefox + Chrome) for bidirectional wiki markup ↔ Markdown conversion, with base64 image embedding, self-contained HTML export (with lightbox), and organized attachment downloads.

## Features

### Tab 1: Copy as Markdown
- Extract full page or selected content as clean Markdown
- **Configurable image mode** (via Settings):
  - **Base64 (default):** images embedded as data URIs — single self-contained `.md` file
  - **Local path:** images downloaded to `images/` folder with relative path references
- Images at highest resolution (srcset 2x + Atlassian CDN 4096px)
- YAML front matter metadata (title, URL, author, labels, issue key, status)
- Download as `.md` (filename = page title) or copy to clipboard
- Export all images at original resolution
- Export as single self-contained HTML with click-to-zoom lightbox

### Tab 2: MD ↔ Wiki Markup Converter
- Side-by-side bidirectional text conversion
- Enhanced table handling (`||header||` / `|cell|`)
- Nested mixed lists, multi-line blockquotes (`{quote}`), inline code (`{{...}}`)
- Fenced code blocks with language syntax

### Tab 3: Fill Page from Markdown
- Paste or upload `.md` files
- Auto-detect editor type (ProseMirror / TinyMCE / textarea)
- Preview converted wiki markup before inserting

### Tab 4: Attachments
- Scan page for all images and file attachments
- Checkbox selection — choose which items to download
- Select All / deselect individually
- Downloads into organized folder: `Downloads/{pageTitle}/images/` and `{pageTitle}/attachments/`
- Automatic highest resolution selection for Atlassian media CDN

### Keyboard Shortcuts & Context Menu
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+M` | Copy current page as Markdown |
| `Ctrl+Shift+J` | Insert clipboard Markdown into page |
| Right-click → "Copy Page as Markdown" | Full page |
| Right-click → "Copy Selection as Markdown" | Selection only |

### HTML Export with Lightbox
- Self-contained HTML: all CSS inlined, all images as base64
- Click any image to zoom (full-screen overlay)
- Keyboard accessible: `Esc` to close
- Shows image dimensions and alt text

### Settings Page
- Accessible via gear icon in popup header, or `about:addons` → Preferences
- **Embed images as base64** (default: ON) — controls Copy/Download MD behavior
- **Inline images in HTML export** (default: ON)
- **Include metadata** (default: ON) — YAML front matter
- Auto-save on change, Reset Defaults button

### Theme Support
- Auto light/dark following system preference
- Manual toggle: Dark → Light → System

## Architecture

Modular design with isolated islands, composable plugins, and a custom AST pipeline.

### Design Patterns
| Pattern | Where | Purpose |
|---------|-------|---------|
| **Strategy** | `converter/strategies/` | MarkdownStrategy, JiraStrategy |
| **Island Architecture** | `src/islands/` | 7 self-contained islands + MessageBus |
| **Plugin System** | `converter/plugins/` | 7 composable Turndown plugins |
| **AST Pipeline** | `converter/pipeline/` | Custom parser → Visitor transformer → emitter registry |
| **Mediator** | `islands/message-bus.js` | Decoupled inter-island communication |
| **Factory** | `plugins/base64-images.js` | Configurable plugin creation |

### Project Structure
```
src/
├── converter/
│   ├── index.js                    # Facade — public API
│   ├── strategies/
│   │   ├── markdown.js             # HTML→MD (Turndown + plugins)
│   │   └── jira.js                 # Jira↔MD (AST pipeline + jira2md)
│   ├── plugins/
│   │   ├── index.js                # Plugin registry
│   │   ├── confluence-panels.js
│   │   ├── confluence-code.js      # 5 rules for Server/Cloud code blocks
│   │   ├── confluence-tables.js   # Cloud tables (th in tbody, p-wrapped cells)
│   │   ├── confluence-mentions.js
│   │   ├── jira-issues.js
│   │   └── base64-images.js
│   └── pipeline/
│       ├── parser.js               # MD → AST (recursive-descent)
│       ├── transformer.js          # AST visitors (Visitor Pattern)
│       └── emitter.js              # AST → Jira markup
├── islands/
│   ├── index.js                    # Orchestrator
│   ├── message-bus.js              # Message routing (Mediator)
│   ├── extractor.js                # Content + metadata extraction
│   ├── inserter.js                 # Editor insertion strategies
│   ├── html-exporter.js            # HTML export + lightbox
│   ├── attachment-collector.js     # Attachment scanning
│   ├── shortcut-handler.js         # Keyboard/context menu
│   └── notification.js             # Toast notifications
extension/
├── manifest.json                   # MV3, gecko min 142.0
├── background.js                   # Image fetch, downloads, shortcuts, menus
├── content.js                      # Bundled islands (auto-generated)
├── popup/{html,css,js}             # 4-tab UI
├── options/{html,css,js}           # Settings page
├── lib/
│   ├── converter.bundle.js         # Bundled converter
│   └── browser-polyfill.js         # Chrome compat
└── icons/icon-{16..128}.png
```

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| [Turndown](https://github.com/mixmark-io/turndown) | 7.2.4 | HTML → Markdown |
| [@truto/turndown-plugin-gfm](https://github.com/trutohq/turndown-plugin-gfm) | 1.0.5 | GFM tables |
| [jira2md](https://github.com/metysj/jira2md) | 3.0.1 | Jira → Markdown |
| [webextension-polyfill](https://github.com/nicedoc/webextension-polyfill) | 0.12.0 | Chrome API compat |
| [esbuild](https://esbuild.github.io/) | 0.28.2 | Bundling |

## Development

### Setup
```bash
npm install
```

### Build

Version is managed in `package.json` — all other files (manifest, UI, zip filenames) sync automatically on build.

```bash
npm run build              # bundle only (for dev)
npm run package:firefox    # build + package → dist/firefox/wiki_markdown-{version}.xpi
npm run package:chrome     # build + package → dist/wiki_markdown-{version}-chrome.zip
npm run package            # both
```

### Bump version
```bash
npm version 1.1.0 --no-git-tag-version
npm run package   # everything updates automatically
```

### Commands
| Command | Description |
|---------|-------------|
| `npm run build` | Bundle converter + islands + polyfill, sync manifest version |
| `npm run start:firefox` | Launch Firefox with extension loaded |
| `npm run lint` | Validate with web-ext |
| `npm run package:firefox` | Build `.xpi` |
| `npm run package:chrome` | Build Chrome `.zip` |
| `npm run package` | Build both |

### Testing
```bash
node test/converter.test.js
```

### Install locally

#### Firefox

**Option A — Permanent install (requires [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [Nightly](https://www.mozilla.org/firefox/channel/desktop/#nightly)):**

> The `.xpi` from this project is **unsigned**. Standard Firefox (Release/Beta) blocks unsigned extensions entirely — there is no workaround. You must use Developer Edition or Nightly.

```bash
npm run package:firefox
```
1. Open **Firefox Developer Edition** or **Nightly**
2. Go to `about:config` → search `xpinstall.signatures.required` → set to `false`
3. Go to `about:addons` → gear icon → "Install Add-on From File..."
4. Select `dist/firefox/wiki_markdown-{version}.xpi`

The extension persists across restarts.

**Option B — Temporary (any Firefox edition, including Release):**
```bash
npm run build
```
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on" → select `extension/manifest.json`
3. Extension works until Firefox restarts

#### Chrome
```bash
npm run package:chrome
```
1. Go to `chrome://extensions` → enable "Developer mode"
2. Click "Load unpacked" → select `dist/chrome/`

### Sign for distribution (optional)

To distribute a signed `.xpi` installable on standard Firefox:

1. Get API credentials at [addons.mozilla.org/developers/addon/api/key](https://addons.mozilla.org/developers/addon/api/key/)
2. Sign:
```bash
npx web-ext sign -s extension --channel=unlisted \
  --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
```
3. Signed `.xpi` appears in `web-ext-artifacts/`

## Contributing

1. Fork & clone
2. `npm install && npm run build`
3. Load extension locally (see Install above)
4. Make changes in `src/` — follow existing patterns:
   - One responsibility per file; add new plugins/strategies instead of modifying existing ones
   - Islands don't import each other — communicate only via `message-bus.js`
   - Each Turndown plugin is a standalone file with `filter` + `replacement` only
5. `npm run build` and test manually on a Confluence/Jira page
6. `node test/converter.test.js` to run unit tests
7. Submit a PR

## License

MIT
