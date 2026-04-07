import { load } from 'cheerio'

/**
 * Given a source file path like "src/pages/about/index.html",
 * returns the page's URL path like "/about/".
 */
export function getPagePath(filePath) {
  // Normalise Windows backslashes
  const normalized = filePath.replace(/\\/g, '/')
  // Strip leading "src/pages" prefix and trailing "index.html"
  const stripped = normalized.replace(/^src\/pages/, '').replace(/index\.html$/, '')
  return stripped || '/'
}

/**
 * Apply a translations object to HTML.
 * - Elements with data-i18n="key" have their text content replaced.
 * - Elements with data-i18n-attr='{"attr":"key"}' have the named attribute replaced.
 * - If locale is provided, sets lang attribute on <html> and updates data-current-locale.
 */
export function applyTranslations(html, translations, locale) {
  const $ = load(html, { decodeEntities: false })

  // Replace text content
  $('[data-i18n]').each((_, el) => {
    const key = $(el).attr('data-i18n')
    if (translations[key] !== undefined) {
      $(el).text(translations[key])
    }
  })

  // Replace attributes
  $('[data-i18n-attr]').each((_, el) => {
    let attrMap
    try { attrMap = JSON.parse($(el).attr('data-i18n-attr')) } catch { return }
    for (const [attr, key] of Object.entries(attrMap)) {
      if (translations[key] !== undefined) {
        $(el).attr(attr, translations[key])
      }
    }
  })

  if (locale) {
    const langAttr = locale === 'zh-hans' ? 'zh-Hans' : locale
    $('html').attr('lang', langAttr)
    $('.lang-switcher').attr('data-current-locale', locale)
  }

  return $.html()
}

/**
 * Rewrite all internal absolute hrefs on a locale page to include the locale prefix.
 * e.g. "/about/" → "/fr/about/" when locale is "fr".
 * Skips hrefs that are already locale-prefixed or are not root-relative.
 */
export function applyLocaleLinks(html, locale, locales) {
  const $ = load(html, { decodeEntities: false })
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')
    if (!href || !href.startsWith('/')) return
    if (locales.some(l => href.startsWith(`/${l}/`) || href === `/${l}`)) return
    $(el).attr('href', `/${locale}${href}`)
  })
  return $.html()
}

/**
 * Inject hreflang <link> tags into <head>.
 * pagePath is the locale-agnostic path, e.g. "/about/".
 */
export function injectHreflang(html, pagePath, siteUrl, locales) {
  const $ = load(html, { decodeEntities: false })

  const base = siteUrl.replace(/\/$/, '')
  const tags = [
    `<link rel="alternate" hreflang="en" href="${base}${pagePath}" />`,
    ...locales.map(locale => {
      const hreflang = locale === 'zh-hans' ? 'zh-Hans' : locale
      return `<link rel="alternate" hreflang="${hreflang}" href="${base}/${locale}${pagePath}" />`
    }),
    `<link rel="alternate" hreflang="x-default" href="${base}${pagePath}" />`,
  ]

  $('head').append('\n  ' + tags.join('\n  '))

  return $.html()
}
