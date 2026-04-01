# Docs Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a unified docs section at `/docs/` with 10 Confluence spaces, sidebar filter pills, client-side search, breadcrumbs, and "on this page" navigation.

**Architecture:** Config drives space→product/docType mapping. `render.js` injects labels + breadcrumb per page. `build.js` generates sidebar HTML and search-index.json. Three small client-side JS files handle filtering, search, and TOC. One static landing page with a search bar and product card grid.

**Tech Stack:** Node.js (ESM), Vitest, vanilla JS (no build step for client JS), CSS custom properties already in `main.css`.

---

## File Map

| File | Change |
|------|--------|
| `config.js` | Add 10 docs space entries |
| `scripts/render.js` | Inject product/docType labels; add breadcrumb + product + docType fields |
| `scripts/build.js` | Replace `generateDocsSidebar`; add `generateSearchIndex`; write `search-index.json` |
| `src/templates/docs.html` | Add filter pills, breadcrumb placeholder, TOC nav |
| `src/assets/css/main.css` | Add docs filter/search/landing CSS |
| `src/assets/js/docs-filter.js` | New: sidebar pill filtering + active link |
| `src/assets/js/docs-search.js` | New: landing page search dropdown |
| `src/assets/js/docs-toc.js` | New: "on this page" anchor list |
| `src/pages/docs/index.html` | New: docs landing page |
| `src/templates/base.html` | Add docs JS script tags |

---

### Task 1: Add 10 docs spaces to `config.js`

**Files:**
- Modify: `config.js`

- [ ] **Step 1: Replace the commented-out docs space block**

Open `config.js`. The current spaces array has only the CS blog entry plus commented-out doc examples. Replace the commented lines with the real entries:

```js
export const confluenceBaseUrl = process.env.CONFLUENCE_BASE_URL
export const confluenceEmail = process.env.CONFLUENCE_EMAIL
export const confluenceApiToken = process.env.CONFLUENCE_API_TOKEN

export const spaces = [
  {
    key: 'CS',
    section: 'blog',
    template: 'blog-post',
    indexTemplate: 'blog-index',
    isDocsSpace: false,
    contentType: 'blogpost',
  },
  { key: 'AIAC1', section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc',          docType: 'installation' },
  { key: 'AUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc',          docType: 'manual' },
  { key: 'AIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc-plus',     docType: 'installation' },
  { key: 'AUM1',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc-plus',     docType: 'manual' },
  { key: 'PIC',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'powerconnect', docType: 'installation' },
  { key: 'PUM1',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'powerconnect', docType: 'manual' },
  { key: 'PIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'pulse',        docType: 'installation' },
  { key: 'PUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'pulse',        docType: 'manual' },
  { key: 'SIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'slice',        docType: 'installation' },
  { key: 'SUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'slice',        docType: 'manual' },
]

export const DIST_DIR = 'dist'
export const TEMPLATES_DIR = 'src/templates'
export const ASSETS_DIR = 'src/assets'
export const PAGES_DIR = 'src/pages'
export const CACHE_DIR = 'cache'
```

- [ ] **Step 2: Commit**

```bash
git add config.js
git commit -m "config: add 10 docs spaces with product and docType fields"
```

---

### Task 2: Update `render.js` — labels, breadcrumb, product/docType fields

**Files:**
- Modify: `scripts/render.js`
- Modify: `tests/render.test.js`

- [ ] **Step 1: Write failing tests**

Add to the end of `tests/render.test.js`:

```js
describe('renderPage docs enhancements', () => {
  const mockPage = (overrides = {}) => ({
    id: '123',
    title: 'Getting Started',
    ancestors: [],
    body: { storage: { value: '<p>Hello world</p>' } },
    metadata: { labels: { results: [] } },
    version: { when: '2025-06-01T10:00:00.000Z' },
    ...overrides,
  })

  it('injects product and docType as labels for docs pages', () => {
    const spaceConfig = { key: 'AIAC1', section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc', docType: 'installation' }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.labels).toContain('arc')
    expect(result.labels).toContain('installation')
  })

  it('exposes product and docType on the returned object', () => {
    const spaceConfig = { key: 'PUM', section: 'docs', template: 'docs', isDocsSpace: false, product: 'pulse', docType: 'manual' }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.product).toBe('pulse')
    expect(result.docType).toBe('manual')
  })

  it('generates a breadcrumb string for docs pages', () => {
    const spaceConfig = { key: 'AUM', section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc', docType: 'manual' }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.breadcrumb).toContain('Docs')
    expect(result.breadcrumb).toContain('Arc')
    expect(result.breadcrumb).toContain('User Manual')
    expect(result.breadcrumb).toContain('Getting Started')
  })

  it('breadcrumb is empty string for non-docs pages', () => {
    const spaceConfig = { key: 'CS', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false, contentType: 'blogpost' }
    const result = renderPage(mockPage({ ancestors: [{ id: '1' }] }), spaceConfig)
    expect(result.breadcrumb).toBe('')
  })

  it('product and docType are null for non-docs pages', () => {
    const spaceConfig = { key: 'CS', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false, contentType: 'blogpost' }
    const result = renderPage(mockPage({ ancestors: [{ id: '1' }] }), spaceConfig)
    expect(result.product).toBeNull()
    expect(result.docType).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: 5 new failures — `result.labels` missing injected labels, `result.product` is undefined, etc.

- [ ] **Step 3: Update `scripts/render.js`**

Replace the entire file content with:

```js
import { load } from 'cheerio'

const PRODUCT_DISPLAY = {
  'arc': 'Arc',
  'arc-plus': 'Arc+',
  'powerconnect': 'PowerConnect',
  'pulse': 'Pulse',
  'slice': 'Slice',
}

const DOC_TYPE_DISPLAY = {
  'installation': 'Installation & Config',
  'manual': 'User Manual',
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractLabels(page) {
  return page.metadata?.labels?.results?.map(l => l.name) ?? []
}

function renderStorageFormat(storageHtml) {
  const $ = load(storageHtml, { xmlMode: false })

  $('ac\\:structured-macro').remove()
  $('ac\\:placeholder').remove()

  $('ac\\:image').each((_, el) => {
    const attachment = $(el).find('ri\\:attachment')
    const filename = attachment.attr('ri:filename')
    if (filename) {
      const img = $('<img>').attr('src', `/assets/images/${filename}`).attr('alt', filename)
      $(el).replaceWith(img)
    } else {
      $(el).remove()
    }
  })

  $('ac\\:link').each((_, el) => {
    const riPage = $(el).find('ri\\:page')
    const pageTitle = riPage.attr('ri:content-title')
    if (pageTitle) {
      const linkText = $(el).find('ac\\:plain-text-link-body').text() || pageTitle
      const href = `/docs/${slugify(pageTitle)}/`
      const a = $('<a>').attr('href', href).text(linkText)
      $(el).replaceWith(a)
    } else {
      $(el).remove()
    }
  })

  return $('body').html() ?? ''
}

function buildPath(page, spaceConfig, isRoot) {
  const { section } = spaceConfig
  if (isRoot && section === 'blog') return 'blog'
  if (section === 'blog') return `blog/posts/${slugify(page.title)}`
  if (section === 'docs') return `docs/${slugify(page.title)}`
  return slugify(page.title)
}

function buildBreadcrumb(title, spaceConfig) {
  const product = PRODUCT_DISPLAY[spaceConfig.product] ?? spaceConfig.product
  const type = DOC_TYPE_DISPLAY[spaceConfig.docType] ?? spaceConfig.docType
  return `<a href="/docs/">Docs</a> &rsaquo; ${product} &rsaquo; ${type} &rsaquo; ${title}`
}

export function renderPage(page, spaceConfig) {
  const labels = extractLabels(page)
  if (spaceConfig.product) labels.push(spaceConfig.product)
  if (spaceConfig.docType) labels.push(spaceConfig.docType)

  const isRoot = page.ancestors.length === 0
  const path = buildPath(page, spaceConfig, isRoot)
  const body = renderStorageFormat(page.body.storage.value)
  const date = page.version?.when
    ? new Date(page.version.when).toISOString().split('T')[0]
    : ''

  const isDocsPage = spaceConfig.section === 'docs'

  return {
    path,
    title: page.title,
    body,
    labels,
    template: isRoot && spaceConfig.section === 'blog'
      ? spaceConfig.indexTemplate
      : spaceConfig.template,
    date,
    slug: slugify(page.title),
    isRoot,
    section: spaceConfig.section,
    product: spaceConfig.product ?? null,
    docType: spaceConfig.docType ?? null,
    breadcrumb: isDocsPage ? buildBreadcrumb(page.title, spaceConfig) : '',
  }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: All tests pass including the 5 new ones.

- [ ] **Step 5: Commit**

```bash
git add scripts/render.js tests/render.test.js
git commit -m "feat: inject product/docType labels and breadcrumb in renderPage"
```

---

### Task 3: Replace `generateDocsSidebar` in `build.js`

**Files:**
- Modify: `scripts/build.js`
- Modify: `tests/build.test.js`

- [ ] **Step 1: Write failing tests**

Replace the existing `describe('generateDocsSidebar', ...)` block in `tests/build.test.js` with:

```js
describe('generateDocsSidebar', () => {
  const pages = [
    { title: 'Installing Arc', slug: 'installing-arc', product: 'arc', docType: 'installation' },
    { title: 'Arc Overview', slug: 'arc-overview', product: 'arc', docType: 'manual' },
    { title: 'Install Pulse', slug: 'install-pulse', product: 'pulse', docType: 'installation' },
  ]

  it('wraps each product in a sidebar-product div with data-product', () => {
    const html = generateDocsSidebar(pages)
    expect(html).toContain('<div class="sidebar-product" data-product="arc">')
    expect(html).toContain('<div class="sidebar-product" data-product="pulse">')
  })

  it('wraps each docType in a sidebar-group div with data-doc-type', () => {
    const html = generateDocsSidebar(pages)
    expect(html).toContain('<div class="sidebar-group" data-doc-type="installation">')
    expect(html).toContain('<div class="sidebar-group" data-doc-type="manual">')
  })

  it('adds data-product and data-doc-type attributes to each link', () => {
    const html = generateDocsSidebar(pages)
    expect(html).toContain('href="/docs/installing-arc/"')
    expect(html).toContain('data-product="arc"')
    expect(html).toContain('data-doc-type="installation"')
  })

  it('omits products with no pages', () => {
    const html = generateDocsSidebar(pages)
    expect(html).not.toContain('data-product="slice"')
    expect(html).not.toContain('data-product="powerconnect"')
  })

  it('renders product display names in group headings', () => {
    const html = generateDocsSidebar(pages)
    expect(html).toContain('Arc — Installation &amp; Config')
    expect(html).toContain('Arc — User Manual')
    expect(html).toContain('Pulse — Installation &amp; Config')
  })
})
```

- [ ] **Step 2: Run tests to confirm the new tests fail**

```bash
npm test -- --reporter=verbose 2>&1 | grep -E "FAIL|PASS|✓|✗|×" | head -20
```

Expected: The 5 new `generateDocsSidebar` tests fail.

- [ ] **Step 3: Replace `generateDocsSidebar` in `scripts/build.js`**

Find the existing `generateDocsSidebar` function (lines 32–56) and replace it entirely:

```js
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
```

- [ ] **Step 4: Run all tests**

```bash
npm test -- --reporter=verbose 2>&1 | tail -25
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/build.js tests/build.test.js
git commit -m "feat: replace generateDocsSidebar with product/docType grouped version"
```

---

### Task 4: Add `generateSearchIndex` to `build.js` and write `search-index.json`

**Files:**
- Modify: `scripts/build.js`
- Modify: `tests/build.test.js`

- [ ] **Step 1: Write failing tests**

Add to the end of `tests/build.test.js`:

```js
import { generateSearchIndex } from '../scripts/build.js'

describe('generateSearchIndex', () => {
  it('produces one entry per page with required fields', () => {
    const pages = [
      { title: 'Installing Arc', slug: 'installing-arc', body: '<p>Follow these steps to install Arc.</p>', product: 'arc', docType: 'installation' },
    ]
    const index = generateSearchIndex(pages)
    expect(index).toHaveLength(1)
    expect(index[0].title).toBe('Installing Arc')
    expect(index[0].slug).toBe('installing-arc')
    expect(index[0].product).toBe('arc')
    expect(index[0].docType).toBe('installation')
  })

  it('strips HTML tags from excerpt', () => {
    const pages = [
      { title: 'Page', slug: 'page', body: '<h2>Section</h2><p>Plain text here.</p>', product: 'arc', docType: 'manual' },
    ]
    const index = generateSearchIndex(pages)
    expect(index[0].excerpt).not.toContain('<')
    expect(index[0].excerpt).toContain('Plain text here')
  })

  it('truncates excerpt to 150 characters', () => {
    const longText = 'a'.repeat(300)
    const pages = [
      { title: 'Page', slug: 'page', body: `<p>${longText}</p>`, product: 'arc', docType: 'manual' },
    ]
    const index = generateSearchIndex(pages)
    expect(index[0].excerpt.length).toBeLessThanOrEqual(150)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- --reporter=verbose 2>&1 | grep -E "generateSearchIndex|FAIL" | head -10
```

Expected: 3 failures — `generateSearchIndex` is not exported.

- [ ] **Step 3: Add `generateSearchIndex` to `scripts/build.js`**

Add this function after the `generateDocsSidebar` function (before the `async function build()` line):

```js
export function generateSearchIndex(pages) {
  return pages.map(p => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150),
    product: p.product,
    docType: p.docType,
  }))
}
```

- [ ] **Step 4: Write `search-index.json` in the `build()` function**

In the `build()` function, locate the block that copies assets (the `cp(ASSETS_DIR, ...)` call) and add the search index write **after** it so `dist/assets/` exists:

```js
  // Copy src/assets → dist/assets
  try {
    await cp(ASSETS_DIR, join(DIST_DIR, 'assets'), { recursive: true })
  } catch { /* no assets yet */ }

  // Write docs search index
  const docPages = allRendered.filter(p => p.section === 'docs')
  if (docPages.length) {
    const searchIndex = generateSearchIndex(docPages)
    await writeFile(join(DIST_DIR, 'assets', 'search-index.json'), JSON.stringify(searchIndex, null, 2))
  }
```

Note: remove the existing `const docPages = allRendered.filter(p => p.section === 'docs')` line earlier in `build()` if it exists — it moves to here.

- [ ] **Step 5: Run all tests**

```bash
npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add scripts/build.js tests/build.test.js
git commit -m "feat: add generateSearchIndex and write search-index.json during build"
```

---

### Task 5: Update `src/templates/docs.html`

**Files:**
- Modify: `src/templates/docs.html`

- [ ] **Step 1: Replace the template**

Replace the entire content of `src/templates/docs.html` with:

```html
<div class="docs-layout">
  <aside class="docs-sidebar">
    <div class="docs-filter-pills">
      <div class="filter-row" id="filter-product">
        <button class="filter-pill active" data-filter-product="all">All</button>
        <button class="filter-pill" data-filter-product="arc">Arc</button>
        <button class="filter-pill" data-filter-product="arc-plus">Arc+</button>
        <button class="filter-pill" data-filter-product="powerconnect">PowerConnect</button>
        <button class="filter-pill" data-filter-product="pulse">Pulse</button>
        <button class="filter-pill" data-filter-product="slice">Slice</button>
      </div>
      <div class="filter-row" id="filter-type">
        <button class="filter-pill active" data-filter-type="all">All</button>
        <button class="filter-pill" data-filter-type="installation">Installation &amp; Config</button>
        <button class="filter-pill" data-filter-type="manual">User Manual</button>
      </div>
    </div>
    {{sidebar}}
  </aside>
  <article class="docs-content">
    <nav class="docs-breadcrumb">{{breadcrumb}}</nav>
    <h1>{{title}}</h1>
    <nav class="docs-toc" id="docs-toc"></nav>
    {{body}}
  </article>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/templates/docs.html
git commit -m "feat: update docs template with filter pills, breadcrumb, TOC placeholder"
```

---

### Task 6: Add docs CSS to `main.css`

**Files:**
- Modify: `src/assets/css/main.css`

- [ ] **Step 1: Add CSS rules**

Append the following block to the end of `src/assets/css/main.css`:

```css
/* ============================================================
   Docs filter pills
   ============================================================ */
.docs-filter-pills {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.filter-pill {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--charcoal);
  cursor: pointer;
  transition: border-color 0.12s ease, color 0.12s ease;
  font-family: inherit;
}

.filter-pill:hover { border-color: var(--orange-gold); color: var(--orange-gold); }
.filter-pill.active { border-color: var(--orange-gold); color: var(--orange-gold); font-weight: 600; }

/* ============================================================
   Docs breadcrumb
   ============================================================ */
.docs-breadcrumb {
  font-size: 0.82rem;
  color: var(--charcoal);
  margin-bottom: 1.25rem;
  opacity: 0.7;
}

.docs-breadcrumb a { color: inherit; text-decoration: none; }
.docs-breadcrumb a:hover { color: var(--orange-gold); opacity: 1; }

/* ============================================================
   Docs TOC ("on this page")
   ============================================================ */
.docs-toc {
  background: var(--light-gray);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  font-size: 0.85rem;
}

.docs-toc::before {
  content: 'On this page';
  display: block;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--charcoal);
  margin-bottom: 0.5rem;
}

.docs-toc ul { list-style: none; }
.docs-toc li { margin-bottom: 0.25rem; }
.docs-toc a { text-decoration: none; color: var(--charcoal); }
.docs-toc a:hover { color: var(--orange-gold); }
.docs-toc li.toc-h3 { padding-left: 0.75rem; font-size: 0.82rem; }

/* ============================================================
   Docs landing page
   ============================================================ */
.docs-hero {
  text-align: center;
  padding: 4rem 2rem 2rem;
  max-width: 680px;
  margin: 0 auto;
}

.docs-hero h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
.docs-hero p  { color: var(--charcoal); margin-bottom: 2rem; }

.docs-search-wrap {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
}

.docs-search-input {
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.95rem;
  font-family: inherit;
  background: var(--pearl-white);
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}

.docs-search-input:focus {
  border-color: var(--orange-gold);
  box-shadow: 0 0 0 3px rgba(184,124,38,0.12);
}

.docs-search-results {
  display: none;
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: var(--pearl-white);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 50;
  overflow: hidden;
}

.docs-search-results.is-open { display: block; }

.docs-search-result {
  display: block;
  padding: 0.65rem 1rem;
  text-decoration: none;
  color: var(--dark-night);
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
}

.docs-search-result:last-child { border-bottom: none; }
.docs-search-result:hover,
.docs-search-result.is-active { background: var(--light-gray); }

.docs-search-result-title { font-weight: 600; font-size: 0.9rem; display: block; }

.docs-search-result-meta {
  font-size: 0.78rem;
  color: var(--charcoal);
  display: flex;
  gap: 0.5rem;
  margin-top: 0.15rem;
}

.docs-search-badge {
  background: var(--light-gray);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 500;
}

/* ============================================================
   Docs product grid (landing page)
   ============================================================ */
.docs-product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 960px;
  margin: 3rem auto;
  padding: 0 2rem 4rem;
}

@media (max-width: 700px) {
  .docs-product-grid { grid-template-columns: 1fr; }
}

@media (min-width: 701px) and (max-width: 960px) {
  .docs-product-grid { grid-template-columns: 1fr 1fr; }
}

.docs-product-card {
  background: var(--pearl-white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: box-shadow 0.15s ease;
}

.docs-product-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

.docs-product-card img {
  height: 36px;
  width: auto;
  margin-bottom: 0.75rem;
  display: block;
}

.docs-product-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--dark-night);
}

.docs-product-card a {
  display: block;
  font-size: 0.875rem;
  text-decoration: none;
  color: var(--charcoal);
  padding: 0.3rem 0;
  transition: color 0.12s;
}

.docs-product-card a:hover { color: var(--orange-gold); }
```

- [ ] **Step 2: Run existing CSS tests to confirm nothing broke**

```bash
npm test -- tests/pages.test.js --reporter=verbose 2>&1 | tail -15
```

Expected: All existing CSS tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/main.css
git commit -m "feat: add docs filter pills, breadcrumb, TOC, search, and product grid CSS"
```

---

### Task 7: Create `docs-filter.js`

**Files:**
- Create: `src/assets/js/docs-filter.js`

- [ ] **Step 1: Create the file**

```js
(function () {
  const productRow = document.getElementById('filter-product')
  const typeRow = document.getElementById('filter-type')
  if (!productRow || !typeRow) return

  let activeProduct = 'all'
  let activeType = 'all'

  function applyFilters() {
    document.querySelectorAll('.sidebar-product').forEach(productEl => {
      const product = productEl.dataset.product
      const productMatch = activeProduct === 'all' || product === activeProduct
      productEl.querySelectorAll('.sidebar-group').forEach(groupEl => {
        const docType = groupEl.dataset.docType
        const typeMatch = activeType === 'all' || docType === activeType
        groupEl.style.display = productMatch && typeMatch ? '' : 'none'
      })
      const anyVisible = [...productEl.querySelectorAll('.sidebar-group')]
        .some(g => g.style.display !== 'none')
      productEl.style.display = anyVisible ? '' : 'none'
    })
  }

  productRow.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill[data-filter-product]')
    if (!pill) return
    productRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'))
    pill.classList.add('active')
    activeProduct = pill.dataset.filterProduct
    applyFilters()
  })

  typeRow.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill[data-filter-type]')
    if (!pill) return
    typeRow.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'))
    pill.classList.add('active')
    activeType = pill.dataset.filterType
    applyFilters()
  })

  // Highlight active page link
  const currentPath = window.location.pathname.replace(/\/?$/, '/')
  document.querySelectorAll('.sidebar-product a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/?$/, '/')
    if (href === currentPath) {
      a.classList.add('active')
      // Auto-filter to this page's product+type
      const product = a.dataset.product
      const docType = a.dataset.docType
      if (product) {
        const productPill = productRow.querySelector(`[data-filter-product="${product}"]`)
        if (productPill) { productPill.click() }
      }
      if (docType) {
        const typePill = typeRow.querySelector(`[data-filter-type="${docType}"]`)
        if (typePill) { typePill.click() }
      }
    }
  })
})()
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/js/docs-filter.js
git commit -m "feat: add docs sidebar filter pills JS"
```

---

### Task 8: Create `docs-search.js`

**Files:**
- Create: `src/assets/js/docs-search.js`

- [ ] **Step 1: Create the file**

```js
(function () {
  const input = document.querySelector('.docs-search-input')
  const resultsEl = document.querySelector('.docs-search-results')
  if (!input || !resultsEl) return

  const PRODUCT_DISPLAY = {
    'arc': 'Arc', 'arc-plus': 'Arc+', 'powerconnect': 'PowerConnect',
    'pulse': 'Pulse', 'slice': 'Slice',
  }
  const DOC_TYPE_DISPLAY = {
    'installation': 'Installation & Config', 'manual': 'User Manual',
  }

  let index = null
  let activeIdx = -1
  let debounceTimer = null

  function loadIndex() {
    if (index !== null) return Promise.resolve()
    return fetch('/assets/search-index.json')
      .then(r => r.json())
      .then(data => { index = data })
      .catch(() => { index = [] })
  }

  function score(entry, query) {
    const q = query.toLowerCase()
    const titleMatch = entry.title.toLowerCase().includes(q)
    const excerptMatch = entry.excerpt.toLowerCase().includes(q)
    if (titleMatch) return 2
    if (excerptMatch) return 1
    return 0
  }

  function renderResults(results) {
    activeIdx = -1
    if (!results.length) {
      resultsEl.classList.remove('is-open')
      return
    }
    resultsEl.innerHTML = results.map((r, i) => `
      <a class="docs-search-result" href="/docs/${r.slug}/" data-idx="${i}">
        <span class="docs-search-result-title">${r.title}</span>
        <span class="docs-search-result-meta">
          <span class="docs-search-badge">${PRODUCT_DISPLAY[r.product] ?? r.product}</span>
          <span class="docs-search-badge">${DOC_TYPE_DISPLAY[r.docType] ?? r.docType}</span>
        </span>
      </a>`).join('')
    resultsEl.classList.add('is-open')
  }

  function search(query) {
    if (!query.trim() || !index) { resultsEl.classList.remove('is-open'); return }
    const scored = index
      .map(e => ({ entry: e, score: score(e, query) }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.entry)
    renderResults(scored)
  }

  input.addEventListener('focus', () => {
    loadIndex().then(() => { if (input.value.trim()) search(input.value) })
  })

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => search(input.value), 150)
  })

  input.addEventListener('keydown', e => {
    const items = resultsEl.querySelectorAll('.docs-search-result')
    if (!items.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIdx = Math.min(activeIdx + 1, items.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIdx = Math.max(activeIdx - 1, -1)
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      items[activeIdx].click()
      return
    } else if (e.key === 'Escape') {
      resultsEl.classList.remove('is-open')
      return
    }
    items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx))
  })

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !resultsEl.contains(e.target)) {
      resultsEl.classList.remove('is-open')
    }
  })
})()
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/js/docs-search.js
git commit -m "feat: add docs search dropdown JS"
```

---

### Task 9: Create `docs-toc.js`

**Files:**
- Create: `src/assets/js/docs-toc.js`

- [ ] **Step 1: Create the file**

```js
(function () {
  const tocEl = document.getElementById('docs-toc')
  if (!tocEl) return

  const content = document.querySelector('.docs-content')
  if (!content) return

  const headings = [...content.querySelectorAll('h2, h3')]
  if (headings.length < 2) { tocEl.style.display = 'none'; return }

  let idCounter = 0
  const items = headings.map(h => {
    if (!h.id) { h.id = 'toc-' + (++idCounter) }
    return `<li class="toc-${h.tagName.toLowerCase()}">
      <a href="#${h.id}">${h.textContent}</a>
    </li>`
  }).join('\n')

  const ul = document.createElement('ul')
  ul.innerHTML = items
  tocEl.appendChild(ul)
})()
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/js/docs-toc.js
git commit -m "feat: add docs on-this-page TOC JS"
```

---

### Task 10: Create docs landing page and wire JS into templates

**Files:**
- Create: `src/pages/docs/index.html`
- Modify: `src/templates/base.html`

- [ ] **Step 1: Create `src/pages/docs/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Docs — Cubewise</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>

<header class="site-header">
  <nav class="nav">
    <a href="/" class="nav-logo">
      <img src="/assets/logos/Cubewise_Code_RGB.svg" alt="Cubewise" height="32">
    </a>
    <ul class="nav-links">
      <li class="nav-item-dropdown">
        <a href="/platform/">Platform</a>
        <div class="nav-mega-menu">
          <div class="mega-menu-inner">
            <div class="mega-col">
              <h4 class="mega-heading">Cubewise For&hellip;</h4>
              <a href="/platform/developers/" class="mega-link"><strong>Developers</strong></a>
              <a href="/platform/administrators/" class="mega-link"><strong>Administrators</strong></a>
              <a href="/platform/power-users/" class="mega-link"><strong>Power Users</strong></a>
            </div>
            <div class="mega-col">
              <h4 class="mega-heading">Platform Components</h4>
              <a href="/arc-plus/" class="mega-link"><strong>Arc+</strong></a>
              <a href="/pulse/" class="mega-link"><strong>Pulse</strong></a>
              <a href="/slice/" class="mega-link"><strong>Slice</strong></a>
              <a href="/atmosphere/" class="mega-link"><strong>Atmosphere</strong></a>
              <a href="/powerconnect/" class="mega-link"><strong>PowerConnect</strong></a>
            </div>
          </div>
        </div>
      </li>
      <li><a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Support</a></li>
      <li><a href="/docs/">Docs</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/partners/">Partners</a></li>
      <li><a href="/about/">About</a></li>
      <li class="nav-cta-item"><a href="/contact/" class="nav-cta">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <div class="docs-hero">
    <h1>Documentation</h1>
    <p>Find guides, installation instructions, and user manuals for all Cubewise software.</p>
    <div class="docs-search-wrap">
      <input type="search" class="docs-search-input" placeholder="Search docs&hellip;" autocomplete="off" aria-label="Search documentation">
      <div class="docs-search-results" role="listbox"></div>
    </div>
  </div>

  <div class="docs-product-grid">

    <div class="docs-product-card">
      <img src="/assets/logos/Products/Arc/Logo-arc.svg" alt="Arc">
      <h3>Arc</h3>
      <a href="/docs/?product=arc&amp;type=installation">Installation &amp; Configuration</a>
      <a href="/docs/?product=arc&amp;type=manual">User Manual</a>
    </div>

    <div class="docs-product-card">
      <img src="/assets/logos/Products/Arc+/Arc+-01.svg" alt="Arc+">
      <h3>Arc+</h3>
      <a href="/docs/?product=arc-plus&amp;type=installation">Installation &amp; Configuration</a>
      <a href="/docs/?product=arc-plus&amp;type=manual">User Manual</a>
    </div>

    <div class="docs-product-card">
      <img src="/assets/logos/Products/PowerConnect/logo-powerconnect.svg" alt="PowerConnect">
      <h3>PowerConnect</h3>
      <a href="/docs/?product=powerconnect&amp;type=installation">Installation &amp; Configuration</a>
      <a href="/docs/?product=powerconnect&amp;type=manual">User Manual</a>
    </div>

    <div class="docs-product-card">
      <img src="/assets/logos/Products/Pulse/Pulse.svg" alt="Pulse">
      <h3>Pulse</h3>
      <a href="/docs/?product=pulse&amp;type=installation">Installation &amp; Configuration</a>
      <a href="/docs/?product=pulse&amp;type=manual">User Manual</a>
    </div>

    <div class="docs-product-card">
      <img src="/assets/logos/Products/Slice/Slice.svg" alt="Slice">
      <h3>Slice</h3>
      <a href="/docs/?product=slice&amp;type=installation">Installation &amp; Configuration</a>
      <a href="/docs/?product=slice&amp;type=manual">User Manual</a>
    </div>

  </div>
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="/assets/logos/Cubewise_Code_RGB.svg" alt="Cubewise" height="24">
      <p>IBM Planning Analytics / TM1 specialists.</p>
    </div>
    <nav class="footer-nav">
      <a href="/platform/">Platform</a>
      <a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Support</a>
      <a href="/docs/">Docs</a>
      <a href="/blog/">Blog</a>
      <a href="/partners/">Partners</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>
    <p class="footer-copy">&copy; Cubewise</p>
  </div>
</footer>

<script src="/assets/js/nav.js"></script>
<script src="/assets/js/docs-search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Add docs JS scripts to `src/templates/base.html`**

In `src/templates/base.html`, find the existing script tag line:

```html
  <script src="/assets/js/nav.js"></script>
```

Replace it with:

```html
  <script src="/assets/js/nav.js"></script>
  <script src="/assets/js/docs-filter.js"></script>
  <script src="/assets/js/docs-toc.js"></script>
```

These scripts no-op on non-docs pages (they check for the presence of `#filter-product` and `#docs-toc` before running).

- [ ] **Step 3: Commit**

```bash
git add src/pages/docs/index.html src/templates/base.html
git commit -m "feat: add docs landing page and wire docs JS into base template"
```

---

### Task 11: Run full build and verify

**Files:**
- No code changes — verify and fix if needed

- [ ] **Step 1: Run all tests**

```bash
npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: All tests pass.

- [ ] **Step 2: Run the build**

```bash
npm run build 2>&1
```

Expected: `Build complete.` with a skip warning for CS blog posts only. No errors.

- [ ] **Step 3: Verify key output files exist**

```bash
ls dist/docs/ | head -10
ls dist/assets/search-index.json
```

Expected: Multiple slugified page directories under `dist/docs/`, and `dist/assets/search-index.json` exists.

- [ ] **Step 4: Verify search index content**

```bash
node -e "const s=require('./dist/assets/search-index.json'); console.log('entries:', s.length); console.log('sample:', JSON.stringify(s[0], null, 2))"
```

Expected: Multiple entries, each with `title`, `slug`, `excerpt`, `product`, `docType` fields.

- [ ] **Step 5: Spot-check a built docs page**

```bash
node -e "const fs=require('fs'); const pages=fs.readdirSync('dist/docs'); const first=pages[0]; const html=fs.readFileSync('dist/docs/'+first+'/index.html','utf8'); console.log('breadcrumb:', html.includes('docs-breadcrumb')); console.log('filter-pills:', html.includes('docs-filter-pills')); console.log('toc:', html.includes('docs-toc')); console.log('sidebar-product:', html.includes('sidebar-product'))"
```

Expected: All four `true`.

- [ ] **Step 6: Refresh browser and verify `/docs/` landing page looks correct**

Check:
- Search bar is centred and styled
- 5 product cards in a grid
- Each card has logo, name, and two links

- [ ] **Step 7: Commit**

If no fixes were needed, there is nothing to commit. If you had to fix something, commit it with a descriptive message.
