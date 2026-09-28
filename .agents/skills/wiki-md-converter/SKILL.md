---
name: wiki-md-converter
description: Change conversion output in the Wiki ↔ Markdown extension - Confluence/Jira HTML → Markdown (Turndown plugins) or Markdown → Jira wiki markup (parser/transformer/emitter AST pipeline). Use when a table, code block, panel, mention, image, list, link, or heading converts wrong, or to support a new element.
---

# wiki-md-converter

All conversion lives in `src/converter/`. Public API is `src/converter/index.js` (`htmlToMarkdown`, `jiraToMarkdown`, `markdownToJira`, `J2M`). It is bundled only into the popup (`extension/lib/converter.bundle.js`).

The keyboard shortcut / context-menu copy does NOT use this code. It uses the DOM walker in `src/islands/shortcut-handler.js`. If the bug is reported from Ctrl+Shift+M or right-click, fix it there.

## Pick the direction

| Symptom | Where |
|---|---|
| Page HTML → Markdown wrong | Turndown plugin in `src/converter/plugins/` |
| Markdown → Jira markup wrong | `src/converter/pipeline/` |
| Jira markup → Markdown wrong | `jira2md` + regex fixes in `JiraStrategy.toMarkdown` (`strategies/jira.js`) |

## HTML → Markdown (Turndown plugins)

- One plugin per file, exporting `function xxxPlugin(turndownService)` that only calls `turndownService.addRule(name, { filter, replacement })`. No side effects. Model: `plugins/jira-issues.js`.
- New plugin: export it from `plugins/index.js` and add `service.use(...)` in `MarkdownStrategy._createService` (`strategies/markdown.js`). Order matters: later rules win over earlier ones for the same node, and the custom `confluence-tables` rules override GFM tables.
- Confluence Cloud DOM quirks already handled (do not re-solve): `th` inside `tbody`, `p`-wrapped cells, duplicate sticky header tables (`pm-table-sticky-wrapper`), sort icons in `<figure>`, images nested in `mediaSingle > media > card-view > img`, 5 code-block DOM shapes in `confluence-code.js`.
- Get real HTML from the page (DevTools "Copy outerHTML") before writing a filter. Match on stable `data-*` attributes and class names, not layout.

## Markdown → Jira (AST pipeline)

`JiraStrategy.fromMarkdown`: `parse` (`pipeline/parser.js`, line-based recursive descent, `parseBlock` + `parseInline`) → `walkAndTransform` visitors (`pipeline/transformer.js`) → `emit` (`pipeline/emitter.js`) → `_postProcess`.

- New node type: produce `{ type, children | value, ... }` in the parser, then `registerEmitter('<type>', (node, ctx) => ...)` in `emitter.js`. Unregistered types fall back to emitting children/value, so a missing emitter fails silently.
- Tree-wide fixups go in a transformer visitor (return `null` to drop a node), not in `_postProcess` regex.
- Jira wiki markup has no table alignment; alignment loss is expected.

## Verify

```bash
node test/converter.test.js   # add assert cases next to the related section
npm run build                 # regenerates extension/lib/converter.bundle.js (tracked in git)
```

- The test bundles `src/converter/index.js` for Node. Known pre-existing crash at the HTML table case: `TypeError: table.rows is not iterable` (Node DOM has no iterable `table.rows`). Put new non-table cases before that section or they will not run.
- Table/image/code-block changes still need a manual check on a real Confluence page; see `wiki-md-extension` for loading the extension.
- Commit `src/` changes together with the rebuilt bundle.
