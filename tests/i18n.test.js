import { describe, it, expect } from 'vitest'
import { applyTranslations, injectHreflang, getPagePath } from '../scripts/i18n.js'

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
