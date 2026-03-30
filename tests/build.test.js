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
  it('groups pages by their docs- label', () => {
    const pages = [
      { title: 'Intro', slug: 'intro', labels: ['docs-arc'] },
      { title: 'Setup', slug: 'setup', labels: ['docs-arc'] },
      { title: 'Overview', slug: 'overview', labels: ['docs-pulse'] },
    ]
    const html = generateDocsSidebar(pages)
    expect(html).toContain('arc')
    expect(html).toContain('pulse')
    expect(html).toContain('/docs/intro/')
    expect(html).toContain('/docs/overview/')
  })

  it('falls back to "docs" group when no docs- label present', () => {
    const pages = [{ title: 'Page', slug: 'page', labels: [] }]
    const html = generateDocsSidebar(pages)
    expect(html).toContain('/docs/page/')
  })
})
