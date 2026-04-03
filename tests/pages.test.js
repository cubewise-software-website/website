import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

const css = readFileSync('src/assets/css/main.css', 'utf8')
const baseHtml = readFileSync('src/templates/base.html', 'utf8')

describe('dark hero modifier CSS', () => {
  it('defines .component-hero--dark with dark-night background', () => {
    expect(css).toContain('.component-hero--dark')
    expect(css).toContain('var(--dark-night)')
  })

  it('overrides h1 colour to pearl-white inside dark hero', () => {
    expect(css).toContain('.component-hero--dark h1')
  })

  it('overrides p colour to sand-gold inside dark hero', () => {
    expect(css).toContain('.component-hero--dark p')
  })
})

describe('contact form CSS', () => {
  it('defines .contact-form', () => {
    expect(css).toContain('.contact-form')
  })

  it('defines .contact-form .name-row grid', () => {
    expect(css).toContain('.name-row')
  })

  it('defines .product-pills with pill styling', () => {
    expect(css).toContain('.product-pills')
    expect(css).toContain('border-radius: 999px')
  })

  it('defines .product-pills input checked state', () => {
    expect(css).toContain('.product-pills input:checked')
  })

  it('defines .consent-block', () => {
    expect(css).toContain('.consent-block')
  })

  it('defines .contact-support-note', () => {
    expect(css).toContain('.contact-support-note')
  })
})

const contactHtml = readFileSync('src/pages/contact/index.html', 'utf8')

describe('contact page HTML', () => {
  it('has component-hero--dark class on hero section', () => {
    expect(contactHtml).toContain('component-hero--dark')
  })

  it('posts to Formspree placeholder endpoint', () => {
    expect(contactHtml).toContain('action="https://formspree.io/f/PLACEHOLDER"')
    expect(contactHtml).toContain('method="POST"')
  })

  it('has required first name, last name, and email fields', () => {
    expect(contactHtml).toContain('name="first-name"')
    expect(contactHtml).toContain('name="last-name"')
    expect(contactHtml).toContain('name="email"')
  })

  it('has a required region select field', () => {
    expect(contactHtml).toContain('name="region"')
    expect(contactHtml).toContain('United Kingdom')
  })

  it('has product interest pills', () => {
    expect(contactHtml).toContain('class="product-pills"')
    expect(contactHtml).toContain('name="interest"')
    expect(contactHtml).toContain('Arc+')
    expect(contactHtml).toContain('TM1py')
  })

  it('has message textarea', () => {
    expect(contactHtml).toContain('name="message"')
  })

  it('has required consent checkbox', () => {
    expect(contactHtml).toContain('name="consent"')
    expect(contactHtml).toContain('once a month')
  })

  it('has support portal link', () => {
    expect(contactHtml).toContain('class="contact-support-note"')
    expect(contactHtml).toContain('cubewisecare.atlassian.net')
  })
})

describe('announcement bar CSS', () => {
  it('defines .announcement-bar as sticky with z-index 210', () => {
    expect(css).toContain('.announcement-bar')
    expect(css).toContain('z-index: 210')
    expect(css).toContain('position: sticky')
  })

  it('defines .announcement-bar__badge with orange-gold background', () => {
    expect(css).toContain('.announcement-bar__badge')
    expect(css).toContain('text-transform: uppercase')
  })

  it('defines .announcement-bar__links as flex row', () => {
    expect(css).toContain('.announcement-bar__links')
    expect(css).toContain('flex-shrink: 0')
  })

  it('site-header top offset is 36px on desktop', () => {
    // After the banner is added, site-header sits below it
    // The rule will contain "top: 36px" (not "top: 0")
    // We check the CSS string contains the updated value in the site-header block
    const siteHeaderBlock = css.slice(css.indexOf('.site-header'), css.indexOf('.site-header') + 200)
    expect(siteHeaderBlock).toContain('top: 36px')
  })

  it('component-subnav top offset is 93px on desktop', () => {
    expect(css).toContain('top: 93px')
  })

  it('hides announcement bar on mobile', () => {
    expect(css).toContain('.announcement-bar { display: none; }')
  })
})

describe('announcement bar HTML (base template)', () => {
  it('contains .announcement-bar element', () => {
    expect(baseHtml).toContain('class="announcement-bar"')
  })

  it('contains .announcement-bar__badge', () => {
    expect(baseHtml).toContain('class="announcement-bar__badge"')
  })

  it('contains .announcement-bar__links nav', () => {
    expect(baseHtml).toContain('class="announcement-bar__links"')
  })

  it('announcement bar links include About, Partners, Support, Forum', () => {
    const barIdx = baseHtml.indexOf('announcement-bar__links')
    const barSection = baseHtml.slice(barIdx, barIdx + 600)
    expect(barSection).toContain('/about/')
    expect(barSection).toContain('/partners/')
    expect(barSection).toContain('cubewisecare.atlassian.net')
    expect(barSection).toContain('forum.cubewise.com')
  })

  it('Forum link opens in new tab', () => {
    const barIdx = baseHtml.indexOf('announcement-bar__links')
    const barSection = baseHtml.slice(barIdx, barIdx + 600)
    expect(barSection).toContain('target="_blank"')
    expect(barSection).toContain('rel="noopener noreferrer"')
  })

  it('nav-links no longer contains standalone About link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    // About should not be a bare nav-links item (it moved to announcement bar)
    expect(navLinksSection).not.toContain('<li><a href="/about/">')
  })

  it('nav-links no longer contains standalone Partners link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    expect(navLinksSection).not.toContain('<li><a href="/partners/">')
  })

  it('nav-links no longer contains standalone Support link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    expect(navLinksSection).not.toContain('<li><a href="https://cubewisecare.atlassian.net')
  })

  it('nav-links no longer contains standalone Forum link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    expect(navLinksSection).not.toContain('<li><a href="https://forum.cubewise.com/')
  })
})

describe('lang-switcher CSS', () => {
  it('defines .lang-switcher', () => {
    expect(css).toContain('.lang-switcher')
  })
  it('defines .lang-switcher__dropdown', () => {
    expect(css).toContain('.lang-switcher__dropdown')
  })
  it('defines .lang-switcher__dropdown--open', () => {
    expect(css).toContain('.lang-switcher__dropdown--open')
  })
})
