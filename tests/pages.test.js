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
