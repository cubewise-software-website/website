import 'dotenv/config'
import { readFile, writeFile, mkdir, cp, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { fetchSpace } from './fetch.js'
import { renderPage } from './render.js'
import { spaces, DIST_DIR, TEMPLATES_DIR, ASSETS_DIR, PAGES_DIR } from '../config.js'
import { applyTranslations, applyLocaleLinks, injectHreflang, getPagePath, injectOgMeta, generateSitemap } from './i18n.js'
import { LOCALES, SITE_URL, I18N_DIR } from '../config.js'

export function injectTemplate(template, context) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? '')
}

async function loadTemplate(name) {
  return readFile(join(TEMPLATES_DIR, `${name}.html`), 'utf8')
}

async function writePage(path, html) {
  const outPath = join(DIST_DIR, path, 'index.html')
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, html)
}

const LABEL_DISPLAY = {
  'arc': 'Arc',
  'arc-plus': 'Arc+',
  'pulse': 'Pulse',
  'slice': 'Slice',
  'atmosphere': 'Atmosphere',
  'powerconnect': 'PowerConnect',
}

export function generatePostList(posts) {
  return [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(p => {
      const labels = p.labels ?? []
      const dataLabels = labels.join(' ')
      const words = (p.body ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
      const excerpt = words.length === 0 ? '' : words.slice(0, 50).join(' ') + (words.length > 50 ? '…' : '')
      const chips = labels.map(slug => {
        const name = LABEL_DISPLAY[slug] ?? (slug.charAt(0).toUpperCase() + slug.slice(1))
        return `<span class="post-label">${name}</span>`
      }).join('')
      return `<article class="post-card" data-labels="${dataLabels}">
  <h2><a href="/${p.path}/">${p.title}</a></h2>
  <time datetime="${p.date}">${p.date}</time>${excerpt ? `\n  <p class="post-excerpt">${excerpt}</p>` : ''}${chips ? `\n  <div class="post-labels">${chips}</div>` : ''}
</article>`
    })
    .join('\n')
}

const PRODUCT_ORDER = ['arc', 'arc-plus', 'powerconnect', 'pulse', 'slice', 'atmosphere']
const PRODUCT_DISPLAY = {
  'arc': 'Arc',
  'arc-plus': 'Arc+',
  'powerconnect': 'PowerConnect',
  'pulse': 'Pulse',
  'slice': 'Slice',
  'atmosphere': 'Atmosphere',
}
const DOC_TYPE_DISPLAY = {
  'installation': 'Installation &amp; Config',
  'manual': 'User Manual',
}

export function generateDocsSidebar(pages) {
  return PRODUCT_ORDER
    .map(product => {
      const productPages = pages.filter(p => p.product === product)
      if (!productPages.length) return ''

      const groups = ['installation', 'manual']
        .map(docType => {
          const typePages = productPages
            .filter(p => p.docType === docType)
            .sort((a, b) => a.title.localeCompare(b.title))
          if (!typePages.length) return ''

          const links = typePages
            .map(p => `      <li><a href="/docs/${p.slug}/" data-product="${product}" data-doc-type="${docType}">${p.title}</a></li>`)
            .join('\n')

          return `  <div class="sidebar-group" data-doc-type="${docType}">
    <h4>${PRODUCT_DISPLAY[product]} — ${DOC_TYPE_DISPLAY[docType]}</h4>
    <ul>
${links}
    </ul>
  </div>`
        })
        .filter(Boolean)
        .join('\n')

      return `<div class="sidebar-product" data-product="${product}">
${groups}
</div>`
    })
    .filter(Boolean)
    .join('\n')
}

export function generateSearchIndex(pages) {
  return pages.map(p => {
    const imgMatch = p.body.match(/<img[^>]+src="([^"]+)"/)
    return {
      title: p.title,
      slug: p.slug,
      excerpt: p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150),
      product: p.product,
      docType: p.docType,
      image: imgMatch ? imgMatch[1] : null,
    }
  })
}

export function generateBlogIndex(blogPosts) {
  return blogPosts.slice(0, 6).map(p => {
    const imgMatch = p.body.match(/<img[^>]+src="([^"]+)"/)
    const image = imgMatch ? imgMatch[1] : null
    const excerpt = p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150)
    return { title: p.title, path: p.path, date: p.date, excerpt, image }
  })
}

/**
 * Apply a locale transformation to an HTML string:
 * sets lang, translates data-i18n text, and injects hreflang tags.
 */
export function applyLocale(html, pagePath, locale, translations, siteUrl, locales) {
  let result = applyTranslations(html, translations, locale)
  result = applyLocaleLinks(result, locale, locales)
  result = injectHreflang(result, pagePath, siteUrl, locales)
  result = injectOgMeta(result, pagePath, locale, siteUrl, locales)
  return result
}

async function copyPagesWithLocales(templateVars = {}) {
  // Load locale translation files (missing locale file → empty translations = English fallback)
  const translations = {}
  for (const locale of LOCALES) {
    try {
      translations[locale] = JSON.parse(await readFile(join(I18N_DIR, `${locale}.json`), 'utf8'))
    } catch {
      translations[locale] = {}
    }
  }

  const pagePaths = []
  await walkAndWrite(PAGES_DIR, DIST_DIR, translations, '', pagePaths, templateVars)
  return pagePaths
}

async function walkAndWrite(srcDir, distDir, translations, relDir = '', pagePaths = [], templateVars = {}) {
  const entries = await readdir(join(srcDir, relDir))
  for (const entry of entries) {
    const rel = relDir ? `${relDir}/${entry}` : entry
    const srcPath = join(srcDir, rel)
    const s = await stat(srcPath)
    if (s.isDirectory()) {
      await walkAndWrite(srcDir, distDir, translations, rel, pagePaths, templateVars)
    } else if (entry.endsWith('.html')) {
      const raw = await readFile(srcPath, 'utf8')
      const html = injectTemplate(raw, templateVars)
      const pagePath = getPagePath(`src/pages/${rel}`)
      pagePaths.push(pagePath)

      // English — write verbatim (with hreflang and og:meta added)
      let enHtml = injectHreflang(html, pagePath, SITE_URL, LOCALES)
      enHtml = injectOgMeta(enHtml, pagePath, 'en', SITE_URL, LOCALES)
      const enOut = join(distDir, rel)
      await mkdir(dirname(enOut), { recursive: true })
      await writeFile(enOut, enHtml)

      // Locales
      for (const locale of LOCALES) {
        const localeHtml = applyLocale(html, pagePath, locale, translations[locale], SITE_URL, LOCALES)
        const localeOut = join(distDir, locale, rel)
        await mkdir(dirname(localeOut), { recursive: true })
        await writeFile(localeOut, localeHtml)
      }
    } else {
      // Non-HTML files (images, etc.) — copy as-is to English dist only
      const out = join(distDir, rel)
      await mkdir(dirname(out), { recursive: true })
      await cp(srcPath, out)
    }
  }
}

async function build() {
  await mkdir(DIST_DIR, { recursive: true })

  const allRendered = []
  for (const spaceConfig of spaces) {
    try {
      const pages = await fetchSpace(spaceConfig)
      for (const page of pages) {
        allRendered.push(renderPage(page, spaceConfig))
      }
    } catch (err) {
      console.warn(`Skipping space ${spaceConfig.key}: ${err.message}`)
    }
  }

  const blogPosts = allRendered.filter(p => p.section === 'blog' && !p.isRoot)
  if (!blogPosts.length) throw new Error('No blog posts found — announcement bar requires at least one post')
  const latestPost = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0]
  const announcementTitle = latestPost.title
  const announcementPath = `/${latestPost.path}/`
  const docPages = allRendered.filter(p => p.section === 'docs')
  const baseTemplate = await loadTemplate('base')

  for (const rendered of allRendered) {
    let contentTemplate = await loadTemplate(rendered.template)
    let content

    if (rendered.isRoot && rendered.section === 'blog') {
      const postList = generatePostList(blogPosts)
      content = injectTemplate(contentTemplate, { ...rendered, postList })
    } else if (rendered.section === 'docs') {
      const sidebar = generateDocsSidebar(docPages)
      content = injectTemplate(contentTemplate, { ...rendered, sidebar })
    } else {
      content = injectTemplate(contentTemplate, rendered)
    }

    const html = injectTemplate(baseTemplate, { title: rendered.title, content, pagePath: `/${rendered.path}/`, announcementTitle, announcementPath })
    await writePage(rendered.path, html)
  }

  // Copy attachment images
  await mkdir(join(DIST_DIR, 'assets', 'images'), { recursive: true })
  try {
    await cp('cache/attachments', join(DIST_DIR, 'assets', 'images'), { recursive: true })
  } catch { /* no attachments yet */ }

  // Copy src/assets → dist/assets
  try {
    await cp(ASSETS_DIR, join(DIST_DIR, 'assets'), { recursive: true })
  } catch { /* no assets yet */ }

  // Copy hand-coded pages → dist/ (English) and dist/{locale}/ (translated)
  const postList = blogPosts.length ? generatePostList(blogPosts) : ''
  const staticPaths = await copyPagesWithLocales({ postList, announcementTitle, announcementPath })

  // Write docs search index
  if (docPages.length) {
    const searchIndex = generateSearchIndex(docPages)
    await writeFile(join(DIST_DIR, 'assets', 'search-index.json'), JSON.stringify(searchIndex, null, 2))
  }

  // Write blog index for recent articles widgets
  if (blogPosts.length) {
    const blogIndex = generateBlogIndex(blogPosts)
    await writeFile(join(DIST_DIR, 'assets', 'blog-index.json'), JSON.stringify(blogIndex, null, 2))
  }

  // Generate multilingual sitemap
  const renderedPaths = allRendered.map(p => `/${p.path}/`)
  const allPaths = [...new Set([...staticPaths, ...renderedPaths])]
  const sitemapXml = generateSitemap(allPaths, SITE_URL, LOCALES)
  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemapXml)
  console.log(`Sitemap: ${allPaths.length} URLs`)

  console.log('Build complete.')
}

// Only run when executed directly, not when imported by tests
if (process.argv[1]?.endsWith('build.js')) {
  build().catch(err => { console.error(err); process.exit(1) })
}
