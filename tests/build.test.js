import { describe, it, expect } from 'vitest'
import { injectTemplate, generatePostList, generateDocsSidebar, generateSearchIndex } from '../scripts/build.js'
import { applyLocale } from '../scripts/build.js'

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

describe('applyLocale', () => {
  const LOCALES = ['fr', 'de', 'zh-hans']
  const SITE = 'https://cubewise.com'

  it('replaces data-i18n text and sets lang attribute', () => {
    const html = '<html lang="en"><head></head><body><h1 data-i18n="home.heading">Welcome</h1></body></html>'
    const translations = { 'home.heading': 'Bienvenue' }
    const result = applyLocale(html, '/about/', 'fr', translations, SITE, LOCALES)
    expect(result).toContain('lang="fr"')
    expect(result).toContain('Bienvenue')
    expect(result).toContain('hreflang="fr"')
  })

  it('injects hreflang tags', () => {
    const html = '<html lang="en"><head></head><body></body></html>'
    const result = applyLocale(html, '/', 'de', {}, SITE, LOCALES)
    expect(result).toContain('hreflang="de"')
    expect(result).toContain('hreflang="x-default"')
  })

  it('rewrites internal links for fr locale', () => {
    const html = '<html lang="en"><head></head><body><a href="/about/">About</a><a href="/arc/">Arc</a></body></html>'
    const result = applyLocale(html, '/', 'fr', {}, SITE, LOCALES)
    expect(result).toContain('href="/fr/about/"')
    expect(result).toContain('href="/fr/arc/"')
  })

  it('rewrites internal links for de locale', () => {
    const html = '<html lang="en"><head></head><body><a href="/about/">About</a></body></html>'
    const result = applyLocale(html, '/', 'de', {}, SITE, LOCALES)
    expect(result).toContain('href="/de/about/"')
  })

  it('rewrites internal links for zh-hans locale', () => {
    const html = '<html lang="en"><head></head><body><a href="/about/">About</a></body></html>'
    const result = applyLocale(html, '/', 'zh-hans', {}, SITE, LOCALES)
    expect(result).toContain('href="/zh-hans/about/"')
  })

  it('does not rewrite external links', () => {
    const html = '<html lang="en"><head></head><body><a href="https://ibm.com">IBM</a></body></html>'
    const result = applyLocale(html, '/', 'fr', {}, SITE, LOCALES)
    expect(result).toContain('href="https://ibm.com"')
  })

  it('does not double-prefix links already in another locale', () => {
    const html = '<html lang="en"><head></head><body><a href="/de/about/">About DE</a></body></html>'
    const result = applyLocale(html, '/', 'fr', {}, SITE, LOCALES)
    expect(result).not.toContain('/fr/de/')
  })
})
