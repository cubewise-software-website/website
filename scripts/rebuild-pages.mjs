// Fast partial rebuild: just re-runs walkAndWrite from src/pages → dist.
// Skips the remote CMS fetch, so blog/docs aren't touched.
import { readFile } from 'fs/promises'
import { join } from 'path'
import { injectTemplate } from './build.js'
import { I18N_DIR, LOCALES } from '../config.js'
import { applyTranslations, applyLocaleLinks, injectHreflang, getPagePath, injectOgMeta } from './i18n.js'
import { readdir, stat, writeFile, mkdir, cp } from 'fs/promises'
import { dirname } from 'path'

const SITE_URL = 'https://cubewise.com'
const PAGES_DIR = 'src/pages'
const DIST_DIR = 'dist'
const TEMPLATES_DIR = 'src/templates'

const headerPartial = await readFile(join(TEMPLATES_DIR, '_header.html'), 'utf8')
const footerPartial = await readFile(join(TEMPLATES_DIR, '_footer.html'), 'utf8')

function applyLocale(html, pagePath, locale, translations, siteUrl, locales) {
  let result = applyTranslations(html, translations, locale)
  result = applyLocaleLinks(result, locale, locales)
  result = injectHreflang(result, pagePath, siteUrl, locales)
  result = injectOgMeta(result, pagePath, locale, siteUrl, locales)
  return result
}

async function walk(srcDir, distDir, translations, rel = '') {
  for (const entry of await readdir(join(srcDir, rel))) {
    const r = rel ? `${rel}/${entry}` : entry
    const src = join(srcDir, r)
    const s = await stat(src)
    if (s.isDirectory()) { await walk(srcDir, distDir, translations, r); continue }
    if (entry.endsWith('.html')) {
      const raw = await readFile(src, 'utf8')
      const pagePath = getPagePath(`src/pages/${r}`)
      const header = injectTemplate(headerPartial, { pagePath, announcementTitle: '', announcementPath: '' })
      const footer = footerPartial
      const html = injectTemplate(raw, { header, footer })
      let enHtml = injectHreflang(html, pagePath, SITE_URL, LOCALES)
      enHtml = injectOgMeta(enHtml, pagePath, 'en', SITE_URL, LOCALES)
      const enOut = join(distDir, r)
      await mkdir(dirname(enOut), { recursive: true })
      await writeFile(enOut, enHtml)
      for (const locale of LOCALES) {
        const lh = applyLocale(html, pagePath, locale, translations[locale], SITE_URL, LOCALES)
        const lo = join(distDir, locale, r)
        await mkdir(dirname(lo), { recursive: true })
        await writeFile(lo, lh)
      }
    } else {
      const out = join(distDir, r)
      await mkdir(dirname(out), { recursive: true })
      await cp(src, out)
    }
  }
}

const translations = {}
for (const locale of LOCALES) {
  try { translations[locale] = JSON.parse(await readFile(join(I18N_DIR, `${locale}.json`), 'utf8')) }
  catch { translations[locale] = {} }
}
await walk(PAGES_DIR, DIST_DIR, translations)
console.log('Static pages rebuilt.')
