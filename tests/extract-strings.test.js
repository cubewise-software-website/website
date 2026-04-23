import { describe, it, expect } from 'vitest'
import { extractStrings } from '../scripts/extract-strings.js'

describe('extractStrings', () => {
  it('extracts a single data-i18n element', () => {
    const html = '<h1 data-i18n="about.heading">About Cubewise</h1>'
    expect(extractStrings(html)).toEqual({ 'about.heading': 'About Cubewise' })
  })

  it('extracts multiple elements', () => {
    const html = `
      <h1 data-i18n="home.heading">Welcome</h1>
      <p data-i18n="home.intro">We build software.</p>
    `
    expect(extractStrings(html)).toEqual({
      'home.heading': 'Welcome',
      'home.intro': 'We build software.',
    })
  })

  it('extracts data-i18n-attr entries', () => {
    const html = `<input data-i18n-attr='{"placeholder":"contact.email"}' placeholder="Your email">`
    expect(extractStrings(html)).toEqual({ 'contact.email': 'Your email' })
  })

  it('trims whitespace from text content', () => {
    const html = '<p data-i18n="key">  Hello world  </p>'
    expect(extractStrings(html)).toEqual({ key: 'Hello world' })
  })

  it('returns empty object for HTML with no data-i18n attributes', () => {
    const html = '<h1>No translation here</h1>'
    expect(extractStrings(html)).toEqual({})
  })
})
