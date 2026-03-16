// Quick smoke test for converter functions
// Build CJS bundle to temp file, then require it
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const outfile = path.join(__dirname, '.converter-test-bundle.cjs');
esbuild.buildSync({
  entryPoints: [path.join(__dirname, '../src/converter/index.js')],
  bundle: true,
  outfile,
  format: 'cjs',
  platform: 'node',
});

const { htmlToMarkdown, jiraToMarkdown, markdownToJira } = require(outfile);
fs.unlinkSync(outfile);

function assert(condition, msg) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

// ─── HTML → Markdown ─────────────────────────────────────────────
console.log('\n--- HTML → Markdown ---');

const md1 = htmlToMarkdown('<h1>Title</h1><p>Hello <strong>world</strong></p>');
assert(md1.includes('# Title'), 'H1 heading converts');
assert(md1.includes('**world**'), 'Bold converts');

const md2 = htmlToMarkdown('<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>');
assert(md2.includes('| A'), 'Table header converts');
assert(md2.includes('| 1'), 'Table body converts');
assert(md2.includes('---'), 'Table separator present');

const md3 = htmlToMarkdown('<ul><li>item1</li><li>item2</li></ul>');
assert(md3.includes('-   item1') || md3.includes('- item1'), 'Bullet list converts');

const md4 = htmlToMarkdown('<pre><code class="language-js">const x = 1;</code></pre>');
assert(md4.includes('```'), 'Code block converts');
assert(md4.includes('const x = 1'), 'Code content preserved');

// With metadata
const md5 = htmlToMarkdown('<p>test</p>', {
  metadata: { title: 'My Page', labels: ['dev', 'api'] },
});
assert(md5.includes('---'), 'Front matter present');
assert(md5.includes('title:'), 'Title in front matter');

// ─── Jira Wiki → Markdown ────────────────────────────────────────
console.log('\n--- Jira Wiki → Markdown ---');

const jmd1 = jiraToMarkdown('h1. Main Title');
assert(jmd1.includes('# Main Title'), 'h1. converts to #');

const jmd2 = jiraToMarkdown('h3.Sub Heading');
assert(jmd2.includes('### Sub Heading'), 'h3. with no space converts');

const jmd3 = jiraToMarkdown('* item1\n** nested\n* item2');
assert(jmd3.includes('* item1'), 'Bullet list');
assert(jmd3.includes('  * nested'), 'Nested bullet');

const jmd4 = jiraToMarkdown('||Header1||Header2||\n|cell1|cell2|');
assert(jmd4.includes('Header1'), 'Table header');
assert(jmd4.includes('cell1'), 'Table cell');

const jmd5 = jiraToMarkdown('{code:javascript}\nconst x = 1;\n{code}');
assert(jmd5.includes('```javascript'), 'Code block with language');
assert(jmd5.includes('const x = 1'), 'Code content');

// ─── Markdown → Jira Wiki ────────────────────────────────────────
console.log('\n--- Markdown → Jira Wiki ---');

const j1 = markdownToJira('# Main Title');
assert(j1.includes('h1.') && j1.includes('Main Title'), '# converts to h1.');

const j2 = markdownToJira('## Sub Title');
assert(j2.includes('h2.') && j2.includes('Sub Title'), '## converts to h2.');

const j3 = markdownToJira('**bold** and *italic*');
assert(j3.includes('*bold*'), 'Bold converts to *...*');
assert(j3.includes('_italic_'), 'Italic converts to _..._');

const j4 = markdownToJira('```python\nprint("hi")\n```');
assert(j4.includes('{code:python}'), 'Code block with lang');
assert(j4.includes('print("hi")'), 'Code content preserved');

const j5 = markdownToJira('| Name | Age |\n| --- | --- |\n| Alice | 30 |');
assert(j5.includes('||'), 'Table headers use ||');
assert(j5.includes('Alice'), 'Table data preserved');

const j6 = markdownToJira('* item1\n* item2\n  * nested');
assert(j6.includes('* item1'), 'Bullet list');

// ─── Enhanced MD → Jira edge cases ───────────────────────────────
console.log('\n--- Enhanced MD → Jira Edge Cases ---');

// Multi-line blockquote
const j7 = markdownToJira('> Line one\n> Line two\n> Line three');
assert(j7.includes('{quote}'), 'Multi-line blockquote uses {quote} macro');
assert(j7.includes('Line one') && j7.includes('Line two'), 'Blockquote content preserved');

// Single-line blockquote
const j8 = markdownToJira('> Simple quote');
assert(j8.includes('bq.'), 'Single-line blockquote uses bq.');

// Inline code
const j9 = markdownToJira('Use `npm install` to install');
assert(j9.includes('{{npm install}}'), 'Inline code uses {{...}}');

// Nested mixed lists: unordered with ordered sub-items
const j10 = markdownToJira('- item1\n  1. sub-ordered\n  2. sub-ordered2\n- item2');
assert(j10.includes('* item1'), 'Top-level unordered');
assert(j10.includes('# sub-ordered') || j10.includes('## sub-ordered'), 'Nested ordered under unordered');

// Multiple headings
const j11 = markdownToJira('# H1\n## H2\n### H3\n#### H4');
assert(j11.includes('h1. H1'), 'H1');
assert(j11.includes('h2. H2'), 'H2');
assert(j11.includes('h3. H3'), 'H3');
assert(j11.includes('h4. H4'), 'H4');

// Table with multiple rows
const j12 = markdownToJira('| A | B | C |\n| --- | --- | --- |\n| 1 | 2 | 3 |\n| 4 | 5 | 6 |');
assert(j12.includes('||A||B||C||'), 'Multi-col header');
assert(j12.includes('|1|2|3|'), 'Row 1');
assert(j12.includes('|4|5|6|'), 'Row 2');

// Code block without language
const j13 = markdownToJira('```\nplain code\n```');
assert(j13.includes('{code}'), 'Code block without lang');
assert(j13.includes('plain code'), 'Code content');
assert(!j13.includes('{code:}'), 'No empty language specifier');

console.log('\n--- Done ---');
