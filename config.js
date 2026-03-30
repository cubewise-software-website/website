export const confluenceBaseUrl = process.env.CONFLUENCE_BASE_URL
export const confluenceEmail = process.env.CONFLUENCE_EMAIL
export const confluenceApiToken = process.env.CONFLUENCE_API_TOKEN

// Add your actual Confluence space keys here.
// isDocsSpace: true means the space key is auto-injected as a label on each page.
export const spaces = [
  {
    key: 'WEBSITE-BLOG',
    section: 'blog',
    template: 'blog-post',
    indexTemplate: 'blog-index',
    isDocsSpace: false,
  },
  // Example docs spaces — replace with real keys:
  // { key: 'DOCS-ARC', section: 'docs', template: 'docs', isDocsSpace: true },
  // { key: 'DOCS-PULSE', section: 'docs', template: 'docs', isDocsSpace: true },
]

export const DIST_DIR = 'dist'
export const TEMPLATES_DIR = 'src/templates'
export const ASSETS_DIR = 'src/assets'
export const PAGES_DIR = 'src/pages'
export const CACHE_DIR = 'cache'
