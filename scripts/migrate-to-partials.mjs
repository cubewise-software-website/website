// One-shot migration: replace the duplicated nav/footer blocks in src/pages/**/*.html
// with {{header}} and {{footer}} placeholders. Page-specific <script src> tags
// (lightbox.js, download-picker.js, etc.) are preserved between {{footer}} and </body>.
//
// Idempotent: pages already containing {{header}} are skipped.
import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { join } from 'path'

const HEADER_RE = /[ \t]*<div class="announcement-bar">[\s\S]*?<\/header>\n?/
const FOOTER_BLOCK_RE = /[ \t]*<footer class="site-footer">[\s\S]*?<script>\s*\(function[\s\S]*?<\/script>\n?/
const NAV_JS_LINE_RE = /[ \t]*<script src="\/assets\/js\/nav\.js"><\/script>\n?/

async function walk(dir, out = []) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry)
    const s = await stat(p)
    if (s.isDirectory()) await walk(p, out)
    else if (entry.endsWith('.html')) out.push(p)
  }
  return out
}

function migrate(src) {
  if (src.includes('{{header}}')) return { changed: false, reason: 'already migrated' }
  if (!src.includes('<div class="announcement-bar">')) return { changed: false, reason: 'no header block' }
  if (!src.includes('<footer class="site-footer">')) return { changed: false, reason: 'no footer block' }

  // Capture page-specific scripts/markup in the footer block (between </footer> and the IIFE).
  // Strip the now-redundant nav.js line; everything else is preserved verbatim.
  const block = src.match(FOOTER_BLOCK_RE)?.[0] ?? ''
  const middle = block.split('</footer>')[1] ?? ''
  const beforeIife = middle.split(/<script>\s*\(function/)[0] ?? ''
  const preserved = beforeIife
    .replace(NAV_JS_LINE_RE, '')
    .replace(/^\s*\n+/, '')
    .replace(/\s+$/, '')

  const footerReplacement = preserved
    ? `  {{footer}}\n  ${preserved}\n`
    : `  {{footer}}\n`

  let out = src.replace(HEADER_RE, '{{header}}\n')
  out = out.replace(FOOTER_BLOCK_RE, footerReplacement)
  return { changed: out !== src, content: out, preservedLen: preserved.length }
}

const files = await walk('src/pages')
let totalChanged = 0
const summary = []
for (const f of files) {
  const src = await readFile(f, 'utf8')
  const r = migrate(src)
  if (r.changed) {
    await writeFile(f, r.content)
    totalChanged++
    summary.push(`OK   ${f}  (preserved ${r.preservedLen} chars)`)
  } else {
    summary.push(`SKIP ${f}  (${r.reason})`)
  }
}
console.log(summary.join('\n'))
console.log(`\nMigrated ${totalChanged} of ${files.length} files.`)
