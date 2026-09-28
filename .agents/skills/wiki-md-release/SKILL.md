---
name: wiki-md-release
description: Release the Wiki ↔ Markdown extension - bump version, update dependencies, rebuild, package .xpi/.zip, commit as fun-ed, push to fun-ed/wiki-markdown, and create a GitHub release with assets. Use for "bump version", "release", "dependency update", "發版", "gh release" in this repo.
---

# wiki-md-release

Publishing target: `https://github.com/fun-ed/wiki-markdown`, git remote `fun-ed`. The old `origin` (`zoonderkins/wiki-markdown`) is not the release target; do not push there unless asked.

Push and `gh release` are public. Confirm version number and dependency scope with the user before step 1 if they were not stated.

## 1. Version and dependencies

```bash
npm outdated
npm install -D <pkg>@latest ...          # or `npm update` for in-range only
npm version X.Y.Z --no-git-tag-version   # package.json is the only version source
```

- `sharp` and `esbuild` are 0.x: a minor bump can break. Check build output after upgrading.
- npm may warn that esbuild's postinstall is not in `allowScripts`. Confirm with `npx esbuild --version`.
- Popup/options read the version from `browser.runtime.getManifest()`; no UI edit needed.
- Update the version table in `README.md` ("Tech Stack") to installed versions: `node -p "require('./node_modules/<pkg>/package.json').version"`.

## 2. Build and verify

```bash
npm run build                 # syncs extension/manifest.json version, regenerates bundles
npm run lint                  # expect 0 errors
node test/converter.test.js
```

Known pre-existing failure: the test crashes at the HTML table case with `TypeError: table.rows is not iterable`. Only a crash earlier than that case is a regression.

Glance at `git diff extension/lib/converter.bundle.js extension/content.js` for unexpected changes.

## 3. Commit

Generated bundles are tracked. Stage explicit paths, never `git add -A` (`.serena/`, `.memsearch/`, `CLAUDE.md` are untracked local files).

```bash
git add package.json package-lock.json extension/manifest.json \
  extension/content.js extension/lib/ README.md <other changed files>
ID=$(gh api user --jq .id)   # fun-ed must be the active gh account: gh auth status
git -c user.name="fun-ed" -c user.email="${ID}+fun-ed@users.noreply.github.com" \
  commit -m "chore: vX.Y.Z ..."
```

- Do not write identity into git config. Pass it with `-c` per commit.
- No `Co-authored-by`, no AI/generated-by trailers.
- Do not amend a pushed commit; make a new one.

## 4. Package and push

```bash
npm run package
git -c credential.helper= -c credential.helper='!gh auth git-credential' push fun-ed master
```

Artifacts:
- `dist/firefox/wiki_markdown-X.Y.Z.xpi` (unsigned)
- `dist/wiki_markdown-X.Y.Z-chrome.zip`

After packaging, `git status --short` must show no tracked changes; if bundles changed, they were stale in the commit.

## 5. GitHub release

```bash
gh release create vX.Y.Z -R fun-ed/wiki-markdown --target master --title "vX.Y.Z" \
  --notes "<changes>

Assets:
- \`wiki_markdown-X.Y.Z.xpi\`: Firefox, unsigned (Developer Edition or Nightly with \`xpinstall.signatures.required=false\`)
- \`wiki_markdown-X.Y.Z-chrome.zip\`: Chrome, load unpacked" \
  dist/firefox/wiki_markdown-X.Y.Z.xpi dist/wiki_markdown-X.Y.Z-chrome.zip
gh release view vX.Y.Z -R fun-ed/wiki-markdown --json url,assets --jq '.url, [.assets[].name]'
```

Do not change the gecko id `jira-markdown@zoonderkins` in the manifest; existing Firefox installs would stop upgrading.
