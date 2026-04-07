import { describe, it, expect } from 'vitest'
import { applyTranslations, applyLocaleLinks, injectHreflang, getPagePath, injectOgMeta, generateSitemap } from '../scripts/i18n.js'

describe('getPagePath', () => {
  it('converts src/pages/about/index.html to /about/', () => {
    expect(getPagePath('src/pages/about/index.html')).toBe('/about/')
  })

  it('converts src/pages/index.html to /', () => {
    expect(getPagePath('src/pages/index.html')).toBe('/')
  })

  it('converts src/pages/arc/features/index.html to /arc/features/', () => {
    expect(getPagePath('src/pages/arc/features/index.html')).toBe('/arc/features/')
  })

  it('handles Windows backslashes', () => {
    expect(getPagePath('src\\pages\\about\\index.html')).toBe('/about/')
  })
})

describe('applyTranslations', () => {
  it('replaces text content of elements with data-i18n attribute', () => {
    const html = '<h1 data-i18n="about.heading">About Cubewise</h1>'
    const translations = { 'about.heading': 'À propos de Cubewise' }
    const result = applyTranslations(html, translations)
    expect(result).toContain('À propos de Cubewise')
    expect(result).toContain('data-i18n="about.heading"')
  })

  it('replaces text content when key has HTML entities in original', () => {
    const html = '<p data-i18n="nav.platform">Platform &amp; More</p>'
    const translations = { 'nav.platform': 'Plateforme' }
    const result = applyTranslations(html, translations)
    expect(result).toContain('Plateforme')
  })

  it('leaves elements unchanged when key is missing from translations', () => {
    const html = '<h1 data-i18n="missing.key">Original Text</h1>'
    const result = applyTranslations(html, {})
    expect(result).toContain('Original Text')
  })

  it('replaces the specified attribute when data-i18n-attr is used', () => {
    const html = '<input data-i18n-attr=\'{"placeholder":"contact.email"}\' placeholder="Your email">'
    const translations = { 'contact.email': 'Votre e-mail' }
    const result = applyTranslations(html, translations)
    expect(result).toContain('placeholder="Votre e-mail"')
  })

  it('sets lang attribute on html element', () => {
    const html = '<html lang="en"><body></body></html>'
    const result = applyTranslations(html, {}, 'fr')
    expect(result).toContain('lang="fr"')
  })

  it('updates data-current-locale on lang-switcher when locale provided', () => {
    const html = '<div class="lang-switcher" data-current-locale="en" data-current-path="/about/"></div>'
    const result = applyTranslations(html, {}, 'fr')
    expect(result).toContain('data-current-locale="fr"')
  })

  it('sets zh-Hans (BCP 47) lang attribute for zh-hans locale', () => {
    const html = '<html lang="en"><body></body></html>'
    const result = applyTranslations(html, {}, 'zh-hans')
    expect(result).toContain('lang="zh-Hans"')
    expect(result).not.toContain('lang="zh-hans"')
  })
})

describe('applyLocaleLinks', () => {
  const LOCALES = ['fr', 'de', 'zh-hans']

  it('prefixes internal absolute hrefs with /fr/', () => {
    const html = '<a href="/about/">About</a>'
    expect(applyLocaleLinks(html, 'fr', LOCALES)).toContain('href="/fr/about/"')
  })

  it('prefixes internal absolute hrefs with /de/', () => {
    const html = '<a href="/about/">About</a>'
    expect(applyLocaleLinks(html, 'de', LOCALES)).toContain('href="/de/about/"')
  })

  it('prefixes internal absolute hrefs with /zh-hans/', () => {
    const html = '<a href="/about/">About</a>'
    expect(applyLocaleLinks(html, 'zh-hans', LOCALES)).toContain('href="/zh-hans/about/"')
  })

  it('rewrites multiple links in one pass', () => {
    const html = '<a href="/arc/">Arc</a><a href="/pulse/">Pulse</a><a href="/contact/">Contact</a>'
    const result = applyLocaleLinks(html, 'fr', LOCALES)
    expect(result).toContain('href="/fr/arc/"')
    expect(result).toContain('href="/fr/pulse/"')
    expect(result).toContain('href="/fr/contact/"')
  })

  it('does not double-prefix already locale-prefixed hrefs (fr)', () => {
    const html = '<a href="/fr/about/">About</a>'
    const result = applyLocaleLinks(html, 'fr', LOCALES)
    expect(result).toContain('href="/fr/about/"')
    expect(result).not.toContain('/fr/fr/')
  })

  it('does not double-prefix already locale-prefixed hrefs (de)', () => {
    const html = '<a href="/de/about/">About</a>'
    const result = applyLocaleLinks(html, 'de', LOCALES)
    expect(result).not.toContain('/de/de/')
  })

  it('does not double-prefix already locale-prefixed hrefs (zh-hans)', () => {
    const html = '<a href="/zh-hans/about/">About</a>'
    const result = applyLocaleLinks(html, 'zh-hans', LOCALES)
    expect(result).not.toContain('/zh-hans/zh-hans/')
  })

  it('does not modify external hrefs', () => {
    const html = '<a href="https://example.com">External</a>'
    expect(applyLocaleLinks(html, 'fr', LOCALES)).toContain('href="https://example.com"')
  })

  it('does not modify empty hrefs (used by lang-switcher options)', () => {
    const html = '<a href="">Empty</a>'
    expect(applyLocaleLinks(html, 'fr', LOCALES)).toContain('href=""')
  })

  it('prefixes root href correctly for all locales', () => {
    const html = '<a href="/">Home</a>'
    expect(applyLocaleLinks(html, 'fr', LOCALES)).toContain('href="/fr/"')
    expect(applyLocaleLinks(html, 'de', LOCALES)).toContain('href="/de/"')
    expect(applyLocaleLinks(html, 'zh-hans', LOCALES)).toContain('href="/zh-hans/"')
  })
})

describe('injectHreflang', () => {
  it('inserts hreflang link tags into <head>', () => {
    const html = '<html><head><title>Test</title></head><body></body></html>'
    const result = injectHreflang(html, '/about/', 'https://cubewise.com', ['fr', 'de', 'zh-hans'])
    expect(result).toContain('<link rel="alternate" hreflang="en" href="https://cubewise.com/about/"')
    expect(result).toContain('<link rel="alternate" hreflang="fr" href="https://cubewise.com/fr/about/"')
    expect(result).toContain('<link rel="alternate" hreflang="de" href="https://cubewise.com/de/about/"')
    expect(result).toContain('<link rel="alternate" hreflang="zh-Hans" href="https://cubewise.com/zh-hans/about/"')
    expect(result).toContain('<link rel="alternate" hreflang="x-default" href="https://cubewise.com/about/"')
  })

  it('handles root path correctly', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectHreflang(html, '/', 'https://cubewise.com', ['fr'])
    expect(result).toContain('href="https://cubewise.com/"')
    expect(result).toContain('href="https://cubewise.com/fr/"')
  })
})

describe('injectOgMeta', () => {
  const LOCALES = ['fr', 'de', 'zh-hans']

  it('injects og:locale for the current locale (English)', () => {
    const html = '<html><head><title>Test</title></head><body></body></html>'
    const result = injectOgMeta(html, '/about/', 'en', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:locale" content="en_US"')
  })

  it('injects og:locale for a non-English locale', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectOgMeta(html, '/about/', 'fr', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:locale" content="fr_FR"')
  })

  it('injects og:locale:alternate for all other locales', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectOgMeta(html, '/about/', 'en', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:locale:alternate" content="fr_FR"')
    expect(result).toContain('<meta property="og:locale:alternate" content="de_DE"')
    expect(result).toContain('<meta property="og:locale:alternate" content="zh_CN"')
    expect(result).not.toContain('<meta property="og:locale:alternate" content="en_US"')
  })

  it('injects og:url for English page', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectOgMeta(html, '/about/', 'en', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:url" content="https://cubewise.com/about/"')
  })

  it('injects locale-prefixed og:url for locale page', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectOgMeta(html, '/about/', 'fr', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:url" content="https://cubewise.com/fr/about/"')
  })

  it('injects correct og:url for zh-hans page', () => {
    const html = '<html><head></head><body></body></html>'
    const result = injectOgMeta(html, '/', 'zh-hans', 'https://cubewise.com', LOCALES)
    expect(result).toContain('<meta property="og:url" content="https://cubewise.com/zh-hans/"')
  })
})

describe('generateSitemap', () => {
  const LOCALES = ['fr', 'de', 'zh-hans']
  const SITE_URL = 'https://cubewise.com'

  it('generates valid XML declaration and urlset', () => {
    const xml = generateSitemap(['/about/'], SITE_URL, LOCALES)
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('includes <loc> for each page', () => {
    const xml = generateSitemap(['/about/', '/contact/'], SITE_URL, LOCALES)
    expect(xml).toContain('<loc>https://cubewise.com/about/</loc>')
    expect(xml).toContain('<loc>https://cubewise.com/contact/</loc>')
  })

  it('includes xhtml:link alternates for all locales', () => {
    const xml = generateSitemap(['/about/'], SITE_URL, LOCALES)
    expect(xml).toContain('hreflang="en" href="https://cubewise.com/about/"')
    expect(xml).toContain('hreflang="fr" href="https://cubewise.com/fr/about/"')
    expect(xml).toContain('hreflang="de" href="https://cubewise.com/de/about/"')
    expect(xml).toContain('hreflang="zh-Hans" href="https://cubewise.com/zh-hans/about/"')
    expect(xml).toContain('hreflang="x-default" href="https://cubewise.com/about/"')
  })

  it('handles root path', () => {
    const xml = generateSitemap(['/'], SITE_URL, LOCALES)
    expect(xml).toContain('<loc>https://cubewise.com/</loc>')
    expect(xml).toContain('href="https://cubewise.com/fr/"')
  })
})
