import 'dotenv/config'
import { readFile, writeFile, mkdir, cp } from 'fs/promises'
import { join, dirname } from 'path'
import { fetchSpace } from './fetch.js'
import { renderPage } from './render.js'
import { spaces, DIST_DIR, TEMPLATES_DIR, ASSETS_DIR, PAGES_DIR } from '../config.js'

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

export function generatePostList(posts) {
  return [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(p => `<article class="post-card">
  <h2><a href="/${p.path}/">${p.title}</a></h2>
  <time datetime="${p.date}">${p.date}</time>
</article>`)
    .join('\n')
}

const PRODUCT_ORDER = ['arc', 'arc-plus', 'powerconnect', 'pulse', 'slice']
const PRODUCT_DISPLAY = {
  'arc': 'Arc',
  'arc-plus': 'Arc+',
  'powerconnect': 'PowerConnect',
  'pulse': 'Pulse',
  'slice': 'Slice',
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
  return pages.map(p => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150),
    product: p.product,
    docType: p.docType,
  }))
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

    const html = injectTemplate(baseTemplate, { title: rendered.title, content })
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

  // Copy hand-coded pages → dist/
  try {
    await cp(PAGES_DIR, DIST_DIR, { recursive: true })
  } catch { /* no pages yet */ }

  // Write docs search index
  if (docPages.length) {
    const searchIndex = generateSearchIndex(docPages)
    await writeFile(join(DIST_DIR, 'assets', 'search-index.json'), JSON.stringify(searchIndex, null, 2))
  }

  console.log('Build complete.')
}

// Only run when executed directly, not when imported by tests
if (process.argv[1]?.endsWith('build.js')) {
  build().catch(err => { console.error(err); process.exit(1) })
}
