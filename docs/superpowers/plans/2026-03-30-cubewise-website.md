# Cubewise Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML website for Cubewise where Blog and Docs are content-managed via Confluence Cloud, everything else is hand-coded, and the site auto-rebuilds on Confluence publish via GitHub Actions + GitHub Pages.

**Architecture:** A custom Node.js build script fetches pages from Confluence Cloud REST API, converts Confluence storage format to clean HTML, injects content into hand-coded templates, and writes static files to `dist/`. GitHub Actions runs the build on webhook trigger (via Cloudflare Worker bridge) and deploys to the `gh-pages` branch.

**Tech Stack:** Node.js 18+ (ESM), Cheerio (HTML parsing), Vitest (tests), GitHub Actions, GitHub Pages, Cloudflare Workers

---

## File Map

| File | Responsibility |
|---|---|
| `package.json` | Project config, scripts, dependencies |
| `config.js` | Confluence space keys, section mappings, directory constants |
| `scripts/fetch.js` | Call Confluence REST API, paginate, download attachments, cache to disk |
| `scripts/render.js` | Convert Confluence storage format → clean HTML, slugify, extract labels, build paths |
| `scripts/build.js` | Orchestrate fetch+render, inject templates, write `dist/`, copy assets |
| `tests/render.test.js` | Unit tests for render.js (pure functions — easy to test) |
| `tests/fetch.test.js` | Unit tests for fetch.js with mocked `fetch` global |
| `tests/build.test.js` | Unit tests for template injection and index generators |
| `src/templates/base.html` | Shared nav + footer wrapper, `{{title}}` and `{{content}}` slots |
| `src/templates/blog-post.html` | Blog post layout: title, date, body |
| `src/templates/blog-index.html` | Blog listing: intro body + `{{postList}}` |
| `src/templates/docs.html` | Docs page: `{{sidebar}}` + body content |
| `src/templates/page.html` | Generic content page |
| `src/assets/css/main.css` | Site-wide styles |
| `src/pages/index.html` | Homepage — platform hero, component cards, outcomes (hand-coded) |
| `src/pages/platform/index.html` | Platform overview — "One platform, five components" (hand-coded) |
| `src/pages/arc-plus/index.html` | Arc+ component page (hand-coded) |
| `src/pages/pulse/index.html` | Pulse component page (hand-coded) |
| `src/pages/slice/index.html` | Slice component page (hand-coded) |
| `src/pages/atmosphere/index.html` | Atmosphere component page (hand-coded) |
| `src/pages/powerconnect/index.html` | PowerConnect component page (hand-coded) |
| `src/pages/pricing/index.html` | Pricing (hand-coded shell) |
| `src/pages/partners/index.html` | Partners (hand-coded shell) |
| `src/pages/about/index.html` | About (hand-coded shell) |
| `src/pages/contact/index.html` | Contact (hand-coded shell) |
| `.github/workflows/build.yml` | Webhook-triggered build + deploy workflow |
| `.github/workflows/manual.yml` | Manual `workflow_dispatch` build |
| `worker/index.js` | Cloudflare Worker: validates Confluence webhook, triggers GitHub `repository_dispatch` |
| `.gitignore` | Ignore `dist/`, `cache/`, `node_modules/` |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `config.js`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "cubewise-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "cheerio": "^1.0.0"
  },
  "devDependencies": {
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, `package-lock.json` written.

- [ ] **Step 3: Create config.js**

```js
export const confluenceBaseUrl = process.env.CONFLUENCE_BASE_URL
export const confluenceEmail = process.env.CONFLUENCE_EMAIL
export const confluenceApiToken = process.env.CONFLUENCE_API_TOKEN

// Add your actual Confluence space keys here.
// isDocsSpace: true means the space key is auto-injected as a label on each page.
export const spaces = [
  {
    key: 'WEBSITE-BLOG',
    section: 'blog',
    template: 'blog-post',
    indexTemplate: 'blog-index',
    isDocsSpace: false,
  },
  // Example docs spaces — replace with real keys:
  // { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: true },
  // { key: 'DOCS-PULSE', section: 'docs', template: 'docs', isDocsSpace: true },
]

export const DIST_DIR = 'dist'
export const TEMPLATES_DIR = 'src/templates'
export const ASSETS_DIR = 'src/assets'
export const PAGES_DIR = 'src/pages'
export const CACHE_DIR = 'cache'
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
cache/
.env
```

- [ ] **Step 5: Create directory structure**

Run:
```bash
mkdir -p scripts tests src/templates src/assets/css src/assets/js src/assets/images src/pages/platform src/pages/arc-plus src/pages/pulse src/pages/slice src/pages/atmosphere src/pages/powerconnect src/pages/pricing src/pages/partners src/pages/about src/pages/contact .github/workflows worker
```

- [ ] **Step 6: Commit**

```bash
git init
git add package.json package-lock.json config.js .gitignore
git commit -m "chore: project scaffold"
```

---

## Task 2: render.js — Pure Functions

**Files:**
- Create: `scripts/render.js`
- Create: `tests/render.test.js`

- [ ] **Step 1: Write failing tests for slugify**

Create `tests/render.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { slugify, renderPage } from '../scripts/render.js'

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('IBM TM1 & Planning Analytics')).toBe('ibm-tm1-planning-analytics')
  })

  it('collapses multiple hyphens', () => {
    expect(slugify('foo  --  bar')).toBe('foo-bar')
  })
})

describe('renderPage', () => {
  const mockPage = (overrides = {}) => ({
    id: '123',
    title: 'Getting Started',
    ancestors: [],
    body: { storage: { value: '<p>Hello world</p>' } },
    metadata: { labels: { results: [] } },
    version: { when: '2025-06-01T10:00:00.000Z' },
    ...overrides,
  })

  it('renders a blog root page to blog/ path', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.path).toBe('blog')
    expect(result.template).toBe('blog-index')
    expect(result.isRoot).toBe(true)
  })

  it('renders a blog child page to blog/posts/[slug]/ path', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const page = mockPage({ ancestors: [{ id: '1' }] })
    const result = renderPage(page, spaceConfig)
    expect(result.path).toBe('blog/posts/getting-started')
    expect(result.template).toBe('blog-post')
    expect(result.isRoot).toBe(false)
  })

  it('renders a docs page to docs/[slug]/ path', () => {
    const spaceConfig = { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: true }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.path).toBe('docs/getting-started')
  })

  it('extracts the date from version.when', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const result = renderPage(mockPage(), spaceConfig)
    expect(result.date).toBe('2025-06-01')
  })

  it('strips ac:structured-macro elements', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const page = mockPage({
      ancestors: [{ id: '1' }],
      body: { storage: { value: '<p>Keep this</p><ac:structured-macro ac:name="toc"></ac:structured-macro>' } },
    })
    const result = renderPage(page, spaceConfig)
    expect(result.body).toContain('Keep this')
    expect(result.body).not.toContain('ac:structured-macro')
  })

  it('rewrites ac:image with ri:attachment to <img> with local path', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const page = mockPage({
      ancestors: [{ id: '1' }],
      body: { storage: { value: '<ac:image><ri:attachment ri:filename="diagram.png" /></ac:image>' } },
    })
    const result = renderPage(page, spaceConfig)
    expect(result.body).toContain('<img')
    expect(result.body).toContain('src="/assets/images/diagram.png"')
  })

  it('extracts labels from page metadata', () => {
    const spaceConfig = { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: false }
    const page = mockPage({
      metadata: { labels: { results: [{ name: 'docs-arc' }, { name: 'featured' }] } },
    })
    const result = renderPage(page, spaceConfig)
    expect(result.labels).toEqual(['docs-arc', 'featured'])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: All tests fail with "Cannot find module '../scripts/render.js'"

- [ ] **Step 3: Create scripts/render.js**

```js
import { load } from 'cheerio'

export function slugify(title) {
  return title
    .toLowerCase()
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

export function renderPage(page, spaceConfig) {
  const labels = extractLabels(page)
  const isRoot = page.ancestors.length === 0
  const path = buildPath(page, spaceConfig, isRoot)
  const body = renderStorageFormat(page.body.storage.value)
  const date = page.version?.when
    ? new Date(page.version.when).toISOString().split('T')[0]
    : ''

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
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All tests in `tests/render.test.js` PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/render.js tests/render.test.js
git commit -m "feat: add render.js with storage format converter and tests"
```

---

## Task 3: fetch.js — Confluence API Client

**Files:**
- Create: `scripts/fetch.js`
- Create: `tests/fetch.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/fetch.test.js`:

```js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// We test the internal helpers by importing and unit-testing fetchPages behaviour.
// fetch is stubbed globally so no real HTTP calls are made.

describe('fetch.js', () => {
  const mockPage = (id, title, ancestors = []) => ({
    id,
    title,
    ancestors,
    body: { storage: { value: '<p>content</p>' } },
    metadata: { labels: { results: [] } },
    version: { when: '2025-01-01T00:00:00.000Z' },
    _links: {},
  })

  const mockConfluenceResponse = (results, size) => ({
    ok: true,
    json: async () => ({ results, size }),
  })

  const mockAttachmentResponse = () => ({
    ok: true,
    json: async () => ({ results: [] }),
  })

  beforeEach(() => {
    process.env.CONFLUENCE_BASE_URL = 'https://test.atlassian.net'
    process.env.CONFLUENCE_EMAIL = 'test@test.com'
    process.env.CONFLUENCE_API_TOKEN = 'token123'
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches all pages from a space', async () => {
    const pages = [mockPage('1', 'Page One'), mockPage('2', 'Page Two')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 2))  // content fetch
      .mockResolvedValue(mockAttachmentResponse())               // attachment fetches

    // Mock fs/promises to avoid writing to disk
    vi.mock('fs/promises', () => ({
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
    }))

    const { fetchSpace } = await import('../scripts/fetch.js')
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const result = await fetchSpace(spaceConfig)

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Page One')
  })

  it('injects docs space key as a label for isDocsSpace spaces', async () => {
    const pages = [mockPage('1', 'Doc Page')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 1))
      .mockResolvedValue(mockAttachmentResponse())

    vi.mock('fs/promises', () => ({
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
    }))

    const { fetchSpace } = await import('../scripts/fetch.js')
    const spaceConfig = { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: true }
    const result = await fetchSpace(spaceConfig)

    const labels = result[0].metadata.labels.results.map(l => l.name)
    expect(labels).toContain('docs-arc')
  })

  it('uses Basic auth header', async () => {
    const pages = [mockPage('1', 'Page')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 1))
      .mockResolvedValue(mockAttachmentResponse())

    vi.mock('fs/promises', () => ({
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
    }))

    const { fetchSpace } = await import('../scripts/fetch.js')
    await fetchSpace({ key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false })

    const [, options] = global.fetch.mock.calls[0]
    expect(options.headers.Authorization).toMatch(/^Basic /)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test tests/fetch.test.js`
Expected: FAIL — "Cannot find module '../scripts/fetch.js'"

- [ ] **Step 3: Create scripts/fetch.js**

```js
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { confluenceBaseUrl, confluenceEmail, confluenceApiToken, CACHE_DIR } from '../config.js'

function authHeader() {
  const token = Buffer.from(`${confluenceEmail}:${confluenceApiToken}`).toString('base64')
  return `Basic ${token}`
}

async function fetchPages(spaceKey) {
  const pages = []
  let start = 0
  const limit = 50

  while (true) {
    const url = `${confluenceBaseUrl}/wiki/rest/api/content` +
      `?spaceKey=${spaceKey}` +
      `&expand=body.storage,ancestors,metadata.labels,version` +
      `&type=page&limit=${limit}&start=${start}`

    const res = await fetch(url, {
      headers: { Authorization: authHeader(), Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Confluence API error ${res.status}: ${res.statusText}`)

    const data = await res.json()
    pages.push(...data.results)
    if (pages.length >= data.size) break
    start += limit
  }

  return pages
}

async function fetchAttachments(pageId) {
  const url = `${confluenceBaseUrl}/wiki/rest/api/content/${pageId}/child/attachment`
  const res = await fetch(url, {
    headers: { Authorization: authHeader(), Accept: 'application/json' },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.results ?? []
}

async function downloadAttachment(attachment) {
  const url = `${confluenceBaseUrl}${attachment._links.download}`
  const res = await fetch(url, { headers: { Authorization: authHeader() } })
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

export async function fetchSpace(spaceConfig) {
  const { key: spaceKey, isDocsSpace } = spaceConfig
  const pages = await fetchPages(spaceKey)

  await mkdir(join(CACHE_DIR, spaceKey), { recursive: true })
  await mkdir(join(CACHE_DIR, 'attachments'), { recursive: true })

  for (const page of pages) {
    if (isDocsSpace) {
      // Space key is already prefixed e.g. DOCS-ARC → label: docs-arc
      const label = spaceKey.toLowerCase().replace(/_/g, '-')
      page.metadata.labels.results.push({ name: label })
    }

    const attachments = await fetchAttachments(page.id)
    for (const att of attachments) {
      const data = await downloadAttachment(att)
      if (data) {
        await writeFile(join(CACHE_DIR, 'attachments', att.title), data)
      }
    }

    await writeFile(join(CACHE_DIR, spaceKey, `${page.id}.json`), JSON.stringify(page, null, 2))
  }

  return pages
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test tests/fetch.test.js`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch.js tests/fetch.test.js
git commit -m "feat: add fetch.js for Confluence API with tests"
```

---

## Task 4: build.js — Orchestrator

**Files:**
- Create: `scripts/build.js`
- Create: `tests/build.test.js`

- [ ] **Step 1: Write failing tests for template injection and index generators**

Create `tests/build.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { injectTemplate, generatePostList, generateDocsSidebar } from '../scripts/build.js'

describe('injectTemplate', () => {
  it('replaces {{key}} with context values', () => {
    const result = injectTemplate('<h1>{{title}}</h1>', { title: 'Hello' })
    expect(result).toBe('<h1>Hello</h1>')
  })

  it('leaves unknown keys as empty string', () => {
    const result = injectTemplate('{{missing}}', {})
    expect(result).toBe('')
  })

  it('replaces all occurrences', () => {
    const result = injectTemplate('{{x}} and {{x}}', { x: 'A' })
    expect(result).toBe('A and A')
  })
})

describe('generatePostList', () => {
  it('renders a list of posts sorted newest first', () => {
    const posts = [
      { title: 'Old Post', path: 'blog/posts/old-post', date: '2024-01-01', slug: 'old-post' },
      { title: 'New Post', path: 'blog/posts/new-post', date: '2025-06-01', slug: 'new-post' },
    ]
    const html = generatePostList(posts)
    const newIdx = html.indexOf('New Post')
    const oldIdx = html.indexOf('Old Post')
    expect(newIdx).toBeLessThan(oldIdx)
    expect(html).toContain('/blog/posts/new-post/')
    expect(html).toContain('2025-06-01')
  })
})

describe('generateDocsSidebar', () => {
  it('groups pages by their docs- label', () => {
    const pages = [
      { title: 'Intro', slug: 'intro', labels: ['docs-arc'] },
      { title: 'Setup', slug: 'setup', labels: ['docs-arc'] },
      { title: 'Overview', slug: 'overview', labels: ['docs-pulse'] },
    ]
    const html = generateDocsSidebar(pages)
    expect(html).toContain('arc')
    expect(html).toContain('pulse')
    expect(html).toContain('/docs/intro/')
    expect(html).toContain('/docs/overview/')
  })

  it('falls back to "docs" group when no docs- label present', () => {
    const pages = [
      { title: 'Page', slug: 'page', labels: [] },
    ]
    const html = generateDocsSidebar(pages)
    expect(html).toContain('/docs/page/')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test tests/build.test.js`
Expected: FAIL — "Cannot find module '../scripts/build.js'"

- [ ] **Step 3: Create scripts/build.js**

```js
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

export function generateDocsSidebar(pages) {
  const groups = {}
  for (const page of pages) {
    const label = page.labels.find(l => l.startsWith('docs-')) ?? 'docs'
    if (!groups[label]) groups[label] = []
    groups[label].push(page)
  }

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, groupPages]) => {
      const groupName = label.replace(/^docs-/, '').replace(/-/g, ' ')
      const links = [...groupPages]
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(p => `    <li><a href="/docs/${p.slug}/">${p.title}</a></li>`)
        .join('\n')
      return `<div class="sidebar-group">
  <h4>${groupName}</h4>
  <ul>
${links}
  </ul>
</div>`
    })
    .join('\n')
}

async function build() {
  await mkdir(DIST_DIR, { recursive: true })

  const allRendered = []
  for (const spaceConfig of spaces) {
    const pages = await fetchSpace(spaceConfig)
    for (const page of pages) {
      allRendered.push(renderPage(page, spaceConfig))
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

  console.log('Build complete.')
}

// Only run build() when executed directly, not when imported by tests
if (process.argv[1]?.endsWith('build.js')) {
  build().catch(err => { console.error(err); process.exit(1) })
}
```

- [ ] **Step 4: Run all tests**

Run: `npm test`
Expected: All tests in `render.test.js`, `fetch.test.js`, and `build.test.js` PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build.js tests/build.test.js
git commit -m "feat: add build.js orchestrator with tests"
```

---

## Task 5: HTML Templates

**Files:**
- Create: `src/templates/base.html`
- Create: `src/templates/blog-post.html`
- Create: `src/templates/blog-index.html`
- Create: `src/templates/docs.html`
- Create: `src/templates/page.html`
- Create: `src/assets/css/main.css`

- [ ] **Step 1: Create src/templates/base.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} — Cubewise</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Cubewise</a>
      <ul class="nav-links">
        <li><a href="/platform/">Platform</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    {{content}}
  </main>
  <footer class="site-footer">
    <p>&copy; Cubewise. IBM Planning Analytics / TM1 specialists.</p>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Create src/templates/blog-post.html**

```html
<article class="blog-post">
  <header class="post-header">
    <h1>{{title}}</h1>
    <time datetime="{{date}}">{{date}}</time>
  </header>
  <div class="post-body">
    {{body}}
  </div>
</article>
```

- [ ] **Step 3: Create src/templates/blog-index.html**

```html
<section class="blog-intro">
  {{body}}
</section>
<section class="blog-listing">
  <h2>All Posts</h2>
  {{postList}}
</section>
```

- [ ] **Step 4: Create src/templates/docs.html**

```html
<div class="docs-layout">
  <aside class="docs-sidebar">
    {{sidebar}}
  </aside>
  <article class="docs-content">
    <h1>{{title}}</h1>
    {{body}}
  </article>
</div>
```

- [ ] **Step 5: Create src/templates/page.html**

```html
<article class="page-content">
  <h1>{{title}}</h1>
  {{body}}
</article>
```

- [ ] **Step 6: Create src/assets/css/main.css**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
  background: #fff;
}

/* Nav */
.site-header { border-bottom: 1px solid #e5e7eb; padding: 1rem 2rem; }
.nav { display: flex; align-items: center; gap: 2rem; max-width: 1200px; margin: 0 auto; }
.nav-logo { font-weight: 700; font-size: 1.2rem; text-decoration: none; color: #1a1a1a; }
.nav-links { display: flex; list-style: none; gap: 1.5rem; }
.nav-links a { text-decoration: none; color: #4b5563; }
.nav-links a:hover { color: #1a1a1a; }

/* Main */
main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }

/* Footer */
.site-footer { border-top: 1px solid #e5e7eb; padding: 2rem; text-align: center; color: #6b7280; margin-top: 4rem; }

/* Blog */
.blog-post, .blog-intro { max-width: 720px; margin: 0 auto; }
.post-header { margin-bottom: 2rem; }
.post-header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
.post-header time { color: #6b7280; font-size: 0.9rem; }
.post-body { line-height: 1.8; }
.post-body h2, .post-body h3 { margin: 2rem 0 1rem; }
.post-body p { margin-bottom: 1rem; }
.post-body img { max-width: 100%; border-radius: 4px; }
.blog-listing { max-width: 720px; margin: 3rem auto 0; }
.blog-listing h2 { margin-bottom: 1.5rem; }
.post-card { border-bottom: 1px solid #e5e7eb; padding: 1.5rem 0; }
.post-card h2 { font-size: 1.2rem; margin-bottom: 0.25rem; }
.post-card a { text-decoration: none; color: #1a1a1a; }
.post-card a:hover { color: #2563eb; }
.post-card time { color: #6b7280; font-size: 0.85rem; }

/* Docs */
.docs-layout { display: grid; grid-template-columns: 260px 1fr; gap: 3rem; }
.docs-sidebar { padding-top: 0.5rem; }
.sidebar-group { margin-bottom: 2rem; }
.sidebar-group h4 { text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 0.5rem; }
.sidebar-group ul { list-style: none; }
.sidebar-group li { margin-bottom: 0.25rem; }
.sidebar-group a { text-decoration: none; color: #4b5563; font-size: 0.9rem; }
.sidebar-group a:hover { color: #2563eb; }
.docs-content h1 { font-size: 2rem; margin-bottom: 1.5rem; }
.docs-content h2, .docs-content h3 { margin: 2rem 0 1rem; }
.docs-content p { margin-bottom: 1rem; }
.docs-content img { max-width: 100%; border-radius: 4px; }
.docs-content code { background: #f3f4f6; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.88em; }
.docs-content pre { background: #1e293b; color: #e2e8f0; padding: 1.25rem; border-radius: 6px; overflow-x: auto; margin-bottom: 1rem; }
.docs-content pre code { background: none; padding: 0; color: inherit; }
```

- [ ] **Step 7: Verify templates render with a smoke test**

Run: `npm test`
Expected: All tests still pass (templates don't affect existing tests).

- [ ] **Step 8: Commit**

```bash
git add src/templates/ src/assets/css/main.css
git commit -m "feat: add HTML templates and base CSS"
```

---

## Task 6: Static Hand-Coded Pages

**Files:**
- Create: `src/pages/index.html`
- Create: `src/pages/platform/index.html`
- Create: `src/pages/arc-plus/index.html`
- Create: `src/pages/pulse/index.html`
- Create: `src/pages/slice/index.html`
- Create: `src/pages/atmosphere/index.html`
- Create: `src/pages/powerconnect/index.html`
- Create: `src/pages/pricing/index.html`
- Create: `src/pages/partners/index.html`
- Create: `src/pages/about/index.html`
- Create: `src/pages/contact/index.html`

These are shells — nav and footer are duplicated in each file because static pages bypass the template engine and are copied directly to `dist/`. The nav uses "Platform" (not "Products") throughout.

**Shared nav snippet** (use in every page):
```html
<nav class="nav">
  <a href="/" class="nav-logo">Cubewise</a>
  <ul class="nav-links">
    <li><a href="/platform/">Platform</a></li>
    <li><a href="/pricing/">Pricing</a></li>
    <li><a href="/docs/">Docs</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li><a href="/partners/">Partners</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
```

**Shared footer snippet** (use in every page):
```html
<footer class="site-footer">
  <p>&copy; Cubewise. IBM Planning Analytics / TM1 specialists.</p>
</footer>
```

- [ ] **Step 1: Create src/pages/index.html (Homepage)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cubewise — The Platform for IBM Planning Analytics / TM1</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Cubewise</a>
      <ul class="nav-links">
        <li><a href="/platform/">Platform</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="hero">
      <h1>The platform for IBM Planning Analytics / TM1</h1>
      <p>Five powerful components. One unified platform. Built by TM1 specialists.</p>
      <a href="/platform/" class="btn btn-primary">Explore the Platform</a>
      <a href="/docs/" class="btn btn-secondary">Read the Docs</a>
    </section>
    <section class="components-overview">
      <h2>One platform, five components</h2>
      <div class="component-grid">
        <a href="/arc-plus/" class="component-card">
          <h3>Arc+</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/pulse/" class="component-card">
          <h3>Pulse</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/slice/" class="component-card">
          <h3>Slice</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/atmosphere/" class="component-card">
          <h3>Atmosphere</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/powerconnect/" class="component-card">
          <h3>PowerConnect</h3>
          <p><!-- tagline --></p>
        </a>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <p>&copy; Cubewise. IBM Planning Analytics / TM1 specialists.</p>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Create src/pages/platform/index.html (Platform overview)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Cubewise Platform — IBM Planning Analytics / TM1</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Cubewise</a>
      <ul class="nav-links">
        <li><a href="/platform/">Platform</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="platform-hero">
      <h1>The Cubewise Platform</h1>
      <p>A complete suite of components for IBM Planning Analytics / TM1 — built together, deployed your way.</p>
    </section>
    <section class="platform-components">
      <h2>Components</h2>
      <div class="component-grid">
        <a href="/arc-plus/" class="component-card">
          <h3>Arc+</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/pulse/" class="component-card">
          <h3>Pulse</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/slice/" class="component-card">
          <h3>Slice</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/atmosphere/" class="component-card">
          <h3>Atmosphere</h3>
          <p><!-- tagline --></p>
        </a>
        <a href="/powerconnect/" class="component-card">
          <h3>PowerConnect</h3>
          <p><!-- tagline --></p>
        </a>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <p>&copy; Cubewise. IBM Planning Analytics / TM1 specialists.</p>
  </footer>
</body>
</html>
```

- [ ] **Step 3: Create component page shells**

Create the following five files. Each follows the same structure — only `<title>`, `<h1>`, and the `<nav>` active link class differ. Use this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Component Name] — Cubewise Platform</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="/" class="nav-logo">Cubewise</a>
      <ul class="nav-links">
        <li><a href="/platform/" class="active">Platform</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/docs/">Docs</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="component-hero">
      <div class="component-label">Cubewise Platform</div>
      <h1>[Component Name]</h1>
      <p><!-- tagline --></p>
      <a href="/docs/" class="btn btn-primary">Read the Docs</a>
      <a href="/contact/" class="btn btn-secondary">Get in Touch</a>
    </section>
    <section class="component-detail">
      <!-- Features / detail content -->
    </section>
  </main>
  <footer class="site-footer">
    <p>&copy; Cubewise. IBM Planning Analytics / TM1 specialists.</p>
  </footer>
</body>
</html>
```

Files to create with their component names substituted:
- `src/pages/arc-plus/index.html` → `[Component Name]` = `Arc+`
- `src/pages/pulse/index.html` → `[Component Name]` = `Pulse`
- `src/pages/slice/index.html` → `[Component Name]` = `Slice`
- `src/pages/atmosphere/index.html` → `[Component Name]` = `Atmosphere`
- `src/pages/powerconnect/index.html` → `[Component Name]` = `PowerConnect`

- [ ] **Step 4: Create remaining static page shells**

Create `src/pages/pricing/index.html`, `src/pages/partners/index.html`, `src/pages/about/index.html`, and `src/pages/contact/index.html` using the shared nav/footer snippets above, with the appropriate `<title>` and `<h1>`:

- `src/pages/pricing/index.html` → title: `Pricing — Cubewise`, h1: `Pricing`
- `src/pages/partners/index.html` → title: `Partners — Cubewise`, h1: `Partners`
- `src/pages/about/index.html` → title: `About — Cubewise`, h1: `About Cubewise`
- `src/pages/contact/index.html` → title: `Contact — Cubewise`, h1: `Contact Us`

- [ ] **Step 5: Add component card and platform CSS to main.css**

Append to `src/assets/css/main.css`:

```css
/* Platform / Components */
.hero, .platform-hero { text-align: center; padding: 5rem 2rem; }
.hero h1, .platform-hero h1 { font-size: 3rem; margin-bottom: 1rem; line-height: 1.2; }
.hero p, .platform-hero p { font-size: 1.2rem; color: #4b5563; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
.btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 0.25rem; }
.btn-primary { background: #1d4ed8; color: #fff; }
.btn-primary:hover { background: #1e40af; }
.btn-secondary { background: #f3f4f6; color: #1a1a1a; }
.btn-secondary:hover { background: #e5e7eb; }

.components-overview, .platform-components { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
.components-overview h2, .platform-components h2 { font-size: 2rem; text-align: center; margin-bottom: 2.5rem; }
.component-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.component-card { display: block; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: inherit; transition: border-color 0.15s, box-shadow 0.15s; }
.component-card:hover { border-color: #1d4ed8; box-shadow: 0 2px 8px rgba(29,78,216,0.1); }
.component-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #1d4ed8; }
.component-card p { font-size: 0.9rem; color: #6b7280; }

.component-hero { text-align: center; padding: 5rem 2rem 3rem; }
.component-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #1d4ed8; margin-bottom: 0.75rem; font-weight: 600; }
.component-hero h1 { font-size: 3rem; margin-bottom: 1rem; }
.component-detail { max-width: 960px; margin: 0 auto; padding: 3rem 2rem; }
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/ src/assets/css/main.css
git commit -m "feat: add platform and component page shells with platform-first messaging"
```

---

## Task 7: GitHub Actions Workflows

**Files:**
- Create: `.github/workflows/build.yml`
- Create: `.github/workflows/manual.yml`

- [ ] **Step 1: Create .github/workflows/build.yml**

```yaml
name: Build and Deploy

on:
  repository_dispatch:
    types: [confluence-publish]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build site
        run: npm run build
        env:
          CONFLUENCE_BASE_URL: ${{ secrets.CONFLUENCE_BASE_URL }}
          CONFLUENCE_EMAIL: ${{ secrets.CONFLUENCE_EMAIL }}
          CONFLUENCE_API_TOKEN: ${{ secrets.CONFLUENCE_API_TOKEN }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: cubewise.com
```

- [ ] **Step 2: Create .github/workflows/manual.yml**

```yaml
name: Manual Build and Deploy

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build site
        run: npm run build
        env:
          CONFLUENCE_BASE_URL: ${{ secrets.CONFLUENCE_BASE_URL }}
          CONFLUENCE_EMAIL: ${{ secrets.CONFLUENCE_EMAIL }}
          CONFLUENCE_API_TOKEN: ${{ secrets.CONFLUENCE_API_TOKEN }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: cubewise.com
```

> **Note:** Remove the `cname:` line if the site will be served from the default `*.github.io` URL rather than a custom domain.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/
git commit -m "feat: add GitHub Actions build and deploy workflows"
```

---

## Task 8: Cloudflare Worker (Webhook Bridge)

**Files:**
- Create: `worker/index.js`

- [ ] **Step 1: Create worker/index.js**

```js
export default {
  async fetch(request, env) {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    // Validate shared secret
    const secret = request.headers.get('X-Webhook-Secret')
    if (secret !== env.CF_WORKER_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Trigger GitHub Actions repository_dispatch
    const response = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${env.GITHUB_PAT}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Cubewise-Webhook-Bridge',
        },
        body: JSON.stringify({ event_type: 'confluence-publish' }),
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return new Response(`GitHub API error: ${text}`, { status: 502 })
    }

    return new Response('OK', { status: 200 })
  },
}
```

- [ ] **Step 2: Deploy the Worker to Cloudflare**

Prerequisites: Cloudflare account, `wrangler` CLI installed globally (`npm install -g wrangler`).

```bash
cd worker
npx wrangler init --yes
```

Add to `wrangler.toml`:
```toml
name = "cubewise-webhook-bridge"
main = "index.js"
compatibility_date = "2024-01-01"
```

Deploy:
```bash
npx wrangler deploy
```

Expected output: Worker URL printed, e.g. `https://cubewise-webhook-bridge.{account}.workers.dev`

- [ ] **Step 3: Set Worker environment variables in Cloudflare dashboard**

Go to **Cloudflare Dashboard → Workers → cubewise-webhook-bridge → Settings → Variables**. Add:

| Variable | Value |
|---|---|
| `CF_WORKER_SECRET` | Any strong random string (e.g. `openssl rand -hex 32`) |
| `GITHUB_PAT` | GitHub Personal Access Token with `repo` scope |
| `GITHUB_REPO` | `{org}/{repo}` e.g. `cubewise/website` |

Mark all three as **Encrypted**.

- [ ] **Step 4: Configure Confluence webhook**

In Confluence Cloud: **Settings → System → Webhooks → Create webhook**.

- URL: the Worker URL from Step 2
- Event: **Page published**
- Add header: `X-Webhook-Secret` = same value as `CF_WORKER_SECRET`

- [ ] **Step 5: Add GitHub Actions secrets**

In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**. Add:

| Secret | Value |
|---|---|
| `CONFLUENCE_BASE_URL` | `https://{org}.atlassian.net` |
| `CONFLUENCE_EMAIL` | Atlassian account email |
| `CONFLUENCE_API_TOKEN` | API token from `id.atlassian.com/manage-profile/security/api-tokens` |

- [ ] **Step 6: Commit worker**

```bash
cd ..
git add worker/
git commit -m "feat: add Cloudflare Worker webhook bridge"
```

---

## Task 9: End-to-End Smoke Test

- [ ] **Step 1: Run a local build with real Confluence credentials**

Create a `.env` file (already git-ignored):
```
CONFLUENCE_BASE_URL=https://your-org.atlassian.net
CONFLUENCE_EMAIL=your@email.com
CONFLUENCE_API_TOKEN=your-api-token
```

Run:
```bash
node -e "import('./scripts/build.js')" --env-file=.env
```

Or with a tool like `dotenv-cli`:
```bash
npx dotenv -e .env -- npm run build
```

Expected: `dist/` directory created with `blog/index.html`, `blog/posts/*/index.html`, `docs/*/index.html`, and all static pages.

- [ ] **Step 2: Inspect the output**

```bash
find dist -name "*.html" | sort
```

Expected output should include:
```
dist/index.html
dist/products/index.html
dist/pricing/index.html
dist/partners/index.html
dist/about/index.html
dist/contact/index.html
dist/blog/index.html
dist/blog/posts/[your-post-slug]/index.html
dist/docs/[your-doc-slug]/index.html
```

- [ ] **Step 3: Serve dist/ locally to verify rendering**

```bash
npx serve dist
```

Open `http://localhost:3000` and verify:
- Navigation renders on all pages
- Blog index shows post listing
- Blog posts show title, date, body
- Docs pages show sidebar grouped by space label
- Images (if any) load correctly

- [ ] **Step 4: Trigger a manual GitHub Actions build**

Push the repo to GitHub, then go to **Actions → Manual Build and Deploy → Run workflow**.

Verify the workflow succeeds and the `gh-pages` branch is updated.

- [ ] **Step 5: Test the webhook end-to-end**

Publish a test page in Confluence. Verify:
1. Cloudflare Worker receives the webhook (check Worker logs in Cloudflare dashboard)
2. GitHub Actions `Build and Deploy` workflow is triggered automatically
3. Site is updated within ~2 minutes of publishing

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: end-to-end smoke test complete"
```
