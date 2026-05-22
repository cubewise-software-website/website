import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { join } from 'path'

const ICONS = {
  '/platform/developers/': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  '/platform/administrators/': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  '/platform/analysts/': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  '/platform/managers/': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
  '/arc-plus/': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  '/arc/': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>',
  '/pulse/': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  '/slice/': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  '/powerconnect/': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  '/atmosphere/': '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  '/deployment/self-hosted/': '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
  '/deployment/cubewise-cloud/': '<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
  '/blog/': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  '/docs/': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  'https://global.resources.cubewise.com/': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  'https://cubewisecare.atlassian.net/servicedesk/customer/portal/13': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>',
  'https://forum.cubewise.com/': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
}

const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">'
const SVG_CLOSE = '</svg>'

function buildIcon(paths) {
  return `<span class="mega-link__icon">${SVG_OPEN}${paths}${SVG_CLOSE}</span>`
}

// Match a mega-link anchor block (single line) and capture its attrs + inner.
// Uses [^<] to stop at next tag so we stay within one anchor element.
const ANCHOR_RE = /<a ([^>]*class="mega-link"[^>]*)>(<strong[^>]*>[^<]*<\/strong><span[^>]*>[^<]*<\/span>)<\/a>/g
const HREF_RE = /href="([^"]+)"/

async function walk(dir, out = []) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry)
    const s = await stat(p)
    if (s.isDirectory()) await walk(p, out)
    else if (entry.endsWith('.html')) out.push(p)
  }
  return out
}

async function processFile(path) {
  const src = await readFile(path, 'utf8')
  if (!src.includes('class="mega-link"')) return { path, changed: false, count: 0 }
  if (src.includes('mega-link__icon')) return { path, changed: false, count: 0, skipped: 'already has icons' }

  let count = 0
  const out = src.replace(ANCHOR_RE, (match, attrs, inner) => {
    const hrefMatch = attrs.match(HREF_RE)
    if (!hrefMatch) return match
    const href = hrefMatch[1]
    const iconPaths = ICONS[href]
    if (!iconPaths) {
      console.warn(`  WARN: no icon mapping for href="${href}" in ${path}`)
      return match
    }
    count++
    return `<a ${attrs}>${buildIcon(iconPaths)}<span class="mega-link__body">${inner}</span></a>`
  })

  if (out !== src) {
    await writeFile(path, out)
    return { path, changed: true, count }
  }
  return { path, changed: false, count: 0 }
}

const files = await walk('src/pages')
let totalFiles = 0
let totalAnchors = 0
for (const f of files) {
  const r = await processFile(f)
  if (r.skipped) console.log(`SKIP ${f}: ${r.skipped}`)
  else if (r.changed) {
    totalFiles++
    totalAnchors += r.count
    console.log(`OK   ${f} (${r.count} anchors)`)
  }
}
console.log(`\nUpdated ${totalFiles} files, ${totalAnchors} anchors rewritten.`)
