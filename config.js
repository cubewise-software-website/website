export const confluenceBaseUrl = process.env.CONFLUENCE_BASE_URL
export const confluenceEmail = process.env.CONFLUENCE_EMAIL
export const confluenceApiToken = process.env.CONFLUENCE_API_TOKEN

export const spaces = [
  {
    key: 'CS',
    section: 'blog',
    template: 'blog-post',
    indexTemplate: 'blog-index',
    isDocsSpace: false,
    contentType: 'blogpost',
  },
  { key: 'AIAC1', section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc',          docType: 'installation' },
  { key: 'AUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc',          docType: 'manual' },
  { key: 'AIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc-plus',     docType: 'installation' },
  { key: 'AUM1',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'arc-plus',     docType: 'manual' },
  { key: 'PIC',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'powerconnect', docType: 'installation' },
  { key: 'PUM1',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'powerconnect', docType: 'manual' },
  { key: 'PIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'pulse',        docType: 'installation' },
  { key: 'PUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'pulse',        docType: 'manual' },
  { key: 'SIAC',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'slice',        docType: 'installation' },
  { key: 'SUM',   section: 'docs', template: 'docs', isDocsSpace: false, product: 'slice',        docType: 'manual' },
  { key: 'AIAC2', section: 'docs', template: 'docs', isDocsSpace: false, product: 'atmosphere',   docType: 'installation' },
  { key: 'AUM2',  section: 'docs', template: 'docs', isDocsSpace: false, product: 'atmosphere',   docType: 'manual' },
]

export const DIST_DIR = 'dist'
export const TEMPLATES_DIR = 'src/templates'
export const ASSETS_DIR = 'src/assets'
export const PAGES_DIR = 'src/pages'
export const CACHE_DIR = 'cache'

export const LOCALES = ['fr', 'de', 'zh-hans']
export const SITE_URL = 'https://cubewise.com'
export const I18N_DIR = 'src/i18n'
