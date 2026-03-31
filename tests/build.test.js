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
  it('renders posts sorted newest first', () => {
    const posts = [
      { title: 'Old Post', path: 'blog/posts/old-post', date: '2024-01-01', slug: 'old-post' },
      { title: 'New Post', path: 'blog/posts/new-post', date: '2025-06-01', slug: 'new-post' },
    ]
    const html = generatePostList(posts)
    expect(html.indexOf('New Post')).toBeLessThan(html.indexOf('Old Post'))
    expect(html).toContain('/blog/posts/new-post/')
    expect(html).toContain('2025-06-01')
  })
})

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
