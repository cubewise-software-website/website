import { readFile, writeFile, mkdir } from 'fs/promises'
import { glob } from 'fs/promises'
import { join } from 'path'
import { load } from 'cheerio'
import { PAGES_DIR, TEMPLATES_DIR, I18N_DIR } from '../config.js'

/**
 * Extract all data-i18n keys and their English text from an HTML string.
 * Returns { key: englishText } pairs.
 */
export function extractStrings(html) {
  const $ = load(html, { decodeEntities: false })
  const result = {}

  $('[data-i18n]').each((_, el) => {
    const key = $(el).attr('data-i18n')
    result[key] = $(el).text().trim()
  })

  $('[data-i18n-attr]').each((_, el) => {
    let attrMap
    try { attrMap = JSON.parse($(el).attr('data-i18n-attr')) } catch { return }
    for (const [attr, key] of Object.entries(attrMap)) {
      result[key] = $(el).attr(attr) ?? ''
    }
  })

  return result
}

// CLI entry point
if (process.argv[1]?.endsWith('extract-strings.js')) {
  const files = []
  for await (const f of glob(`${PAGES_DIR}/**/*.html`)) files.push(f)
  files.push(join(TEMPLATES_DIR, 'base.html'))

  let all = {}
  for (const f of files) {
    const html = await readFile(f, 'utf8')
    Object.assign(all, extractStrings(html))
  }

  // Load existing en.json to preserve any manually curated values
  let existing = {}
  try {
    existing = JSON.parse(await readFile(join(I18N_DIR, 'en.json'), 'utf8'))
  } catch {}

  // Merge: existing values win (preserves manual edits), new keys added
  const merged = { ...all, ...existing }
  const sorted = Object.fromEntries(Object.keys(merged).sort().map(k => [k, merged[k]]))

  await mkdir(I18N_DIR, { recursive: true })
  await writeFile(join(I18N_DIR, 'en.json'), JSON.stringify(sorted, null, 2) + '\n')
  console.log(`✓ Wrote ${I18N_DIR}/en.json (${Object.keys(sorted).length} strings)`)
}
