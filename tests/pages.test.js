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
