import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockPage = (id, title, ancestors = []) => ({
  id,
  title,
  ancestors,
  body: { storage: { value: '<p>content</p>' } },
  metadata: { labels: { results: [] } },
  version: { when: '2025-01-01T00:00:00.000Z' },
  _links: {},
})

const mockConfluenceResponse = (results, size) => ({
  ok: true,
  json: async () => ({ results, size }),
})

const mockAttachmentResponse = () => ({
  ok: true,
  json: async () => ({ results: [] }),
})

describe('fetch.js', () => {
  beforeEach(() => {
    process.env.CONFLUENCE_BASE_URL = 'https://test.atlassian.net'
    process.env.CONFLUENCE_EMAIL = 'test@test.com'
    process.env.CONFLUENCE_API_TOKEN = 'token123'
    vi.stubGlobal('fetch', vi.fn())
    vi.mock('fs/promises', () => ({
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('fetches all pages from a space', async () => {
    const pages = [mockPage('1', 'Page One'), mockPage('2', 'Page Two')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 2))
      .mockResolvedValue(mockAttachmentResponse())

    const { fetchSpace } = await import('../scripts/fetch.js')
    const spaceConfig = { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false }
    const result = await fetchSpace(spaceConfig)

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Page One')
  })

  it('injects space key as a label for isDocsSpace spaces', async () => {
    const pages = [mockPage('1', 'Doc Page')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 1))
      .mockResolvedValue(mockAttachmentResponse())

    const { fetchSpace } = await import('../scripts/fetch.js')
    const spaceConfig = { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: true }
    const result = await fetchSpace(spaceConfig)

    const labels = result[0].metadata.labels.results.map(l => l.name)
    expect(labels).toContain('docs-arc')
  })

  it('uses Basic auth header', async () => {
    const pages = [mockPage('1', 'Page')]
    global.fetch
      .mockResolvedValueOnce(mockConfluenceResponse(pages, 1))
      .mockResolvedValue(mockAttachmentResponse())

    const { fetchSpace } = await import('../scripts/fetch.js')
    await fetchSpace({ key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false })

    const [, options] = global.fetch.mock.calls[0]
    expect(options.headers.Authorization).toMatch(/^Basic /)
  })
})
