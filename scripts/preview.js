// Builds the site without fetching from Confluence — for local preview only.
import { mkdir, cp, rm, writeFile, readFile, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { DIST_DIR, ASSETS_DIR, PAGES_DIR } from '../config.js'
import { applyTranslations, applyLocaleLinks, injectHreflang, getPagePath, injectOgMeta } from './i18n.js'
import { LOCALES, SITE_URL, I18N_DIR } from '../config.js'

// Wipe dist/ first so stale files don't linger
await rm(DIST_DIR, { recursive: true, force: true })
await mkdir(DIST_DIR, { recursive: true })

try { await cp(ASSETS_DIR, join(DIST_DIR, 'assets'), { recursive: true }) } catch {}

async function walkAndWrite(srcDir, distDir, translations, relDir = '') {
  const entries = await readdir(join(srcDir, relDir))
  for (const entry of entries) {
    const rel = relDir ? `${relDir}/${entry}` : entry
    const srcPath = join(srcDir, rel)
    const s = await stat(srcPath)
    if (s.isDirectory()) {
      await walkAndWrite(srcDir, distDir, translations, rel)
    } else if (entry.endsWith('.html')) {
      const html = await readFile(srcPath, 'utf8')
      const pagePath = getPagePath(`src/pages/${rel}`)
      let enHtml = injectHreflang(html, pagePath, SITE_URL, LOCALES)
      enHtml = injectOgMeta(enHtml, pagePath, 'en', SITE_URL, LOCALES)
      const enOut = join(distDir, rel)
      await mkdir(dirname(enOut), { recursive: true })
      await writeFile(enOut, enHtml)
      for (const locale of LOCALES) {
        let localeHtml = applyTranslations(html, translations[locale] ?? {}, locale)
        localeHtml = applyLocaleLinks(localeHtml, locale, LOCALES)
        localeHtml = injectHreflang(localeHtml, pagePath, SITE_URL, LOCALES)
        localeHtml = injectOgMeta(localeHtml, pagePath, locale, SITE_URL, LOCALES)
        const localeOut = join(distDir, locale, rel)
        await mkdir(dirname(localeOut), { recursive: true })
        await writeFile(localeOut, localeHtml)
      }
    } else {
      const out = join(distDir, rel)
      await mkdir(dirname(out), { recursive: true })
      await cp(srcPath, out)
    }
  }
}

const pageTranslations = {}
for (const locale of LOCALES) {
  try {
    pageTranslations[locale] = JSON.parse(await readFile(join(I18N_DIR, `${locale}.json`), 'utf8'))
  } catch {
    pageTranslations[locale] = {}
  }
}
await walkAndWrite(PAGES_DIR, DIST_DIR, pageTranslations)

// Write mock indexes for local preview (real build fetches these from Confluence)
await mkdir(join(DIST_DIR, 'assets'), { recursive: true })
const mockSearchIndex = [
  { title: 'Arc Installation Guide', slug: 'arc-installation', excerpt: 'Step-by-step instructions for installing Arc on your system.', product: 'arc', docType: 'installation', image: null },
  { title: 'Arc User Manual', slug: 'arc-manual', excerpt: 'Complete user manual for the Arc TM1 IDE.', product: 'arc', docType: 'manual', image: null },
  { title: 'Arc+ Installation Guide', slug: 'arc-plus-installation', excerpt: 'How to install and configure Arc+ for DevOps workflows.', product: 'arc-plus', docType: 'installation', image: null },
  { title: 'Arc+ User Manual', slug: 'arc-plus-manual', excerpt: 'User guide for Arc+ DevOps features and pipelines.', product: 'arc-plus', docType: 'manual', image: null },
  { title: 'Pulse Installation Guide', slug: 'pulse-installation', excerpt: 'Installing Pulse to monitor and manage IBM Planning Analytics.', product: 'pulse', docType: 'installation', image: null },
  { title: 'Pulse User Manual', slug: 'pulse-manual', excerpt: 'How to use Pulse dashboards, alerts, and audit logs.', product: 'pulse', docType: 'manual', image: null },
  { title: 'Slice Installation Guide', slug: 'slice-installation', excerpt: 'Setting up the Slice Excel add-in for IBM Planning Analytics.', product: 'slice', docType: 'installation', image: null },
  { title: 'Slice User Manual', slug: 'slice-manual', excerpt: 'Working with slices, writeback, and data entry in Excel.', product: 'slice', docType: 'manual', image: null },
  { title: 'PowerConnect Installation Guide', slug: 'powerconnect-installation', excerpt: 'Connecting IBM Planning Analytics data to Power BI.', product: 'powerconnect', docType: 'installation', image: null },
  { title: 'PowerConnect User Manual', slug: 'powerconnect-manual', excerpt: 'Building Power BI reports with live TM1 data using PowerConnect.', product: 'powerconnect', docType: 'manual', image: null },
]
await writeFile(join(DIST_DIR, 'assets', 'search-index.json'), JSON.stringify(mockSearchIndex, null, 2))
await writeFile(join(DIST_DIR, 'assets', 'blog-index.json'), '[]')

console.log('Preview build complete → dist/')
