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

  it('replaces + with plus', () => {
    expect(slugify('Arc+')).toBe('arc-plus')
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

  it('renders a blog child page to blog/posts/[slug] path', () => {
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const page = mockPage({ ancestors: [{ id: '1' }] })
    const result = renderPage(page, spaceConfig)
    expect(result.path).toBe('blog/posts/getting-started')
    expect(result.template).toBe('blog-post')
    expect(result.isRoot).toBe(false)
  })

  it('renders a docs page to docs/[slug] path', () => {
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
