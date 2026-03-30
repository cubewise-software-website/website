import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

const css = readFileSync('src/assets/css/main.css', 'utf8')

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
