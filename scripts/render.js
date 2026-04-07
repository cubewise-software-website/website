import { load } from 'cheerio'

const PRODUCT_DISPLAY = {
  'arc': 'Arc',
  'arc-plus': 'Arc+',
  'powerconnect': 'PowerConnect',
  'pulse': 'Pulse',
  'slice': 'Slice',
}

const DOC_TYPE_DISPLAY = {
  'installation': 'Installation & Config',
  'manual': 'User Manual',
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractLabels(page) {
  return page.metadata?.labels?.results?.map(l => l.name) ?? []
}

function renderStorageFormat(storageHtml) {
  const $ = load(storageHtml, { xmlMode: false })

  $('ac\\:structured-macro').remove()
  $('ac\\:placeholder').remove()

  $('ac\\:image').each((_, el) => {
    const attachment = $(el).find('ri\\:attachment')
    const filename = attachment.attr('ri:filename')
    if (filename) {
      const img = $('<img>').attr('src', `/assets/images/${filename}`).attr('alt', filename)
      $(el).replaceWith(img)
    } else {
      $(el).remove()
    }
  })

  $('ac\\:link').each((_, el) => {
    const riPage = $(el).find('ri\\:page')
    const pageTitle = riPage.attr('ri:content-title')
    if (pageTitle) {
      const linkText = $(el).find('ac\\:plain-text-link-body').text() || pageTitle
      const href = `/docs/${slugify(pageTitle)}/`
      const a = $('<a>').attr('href', href).text(linkText)
      $(el).replaceWith(a)
    } else {
      $(el).remove()
    }
  })

  return $('body').html() ?? ''
}

function buildPath(page, spaceConfig, isRoot) {
  const { section } = spaceConfig
  if (isRoot && section === 'blog') return 'blog'
  if (section === 'blog') return `blog/posts/${slugify(page.title)}`
  if (section === 'docs') return `docs/${slugify(page.title)}`
  return slugify(page.title)
}

function buildBreadcrumb(title, spaceConfig) {
  const product = PRODUCT_DISPLAY[spaceConfig.product] ?? spaceConfig.product
  const type = DOC_TYPE_DISPLAY[spaceConfig.docType] ?? spaceConfig.docType
  return `<a href="/docs/">Docs</a> &rsaquo; ${product} &rsaquo; ${type} &rsaquo; ${title}`
}

export function renderPage(page, spaceConfig) {
  const labels = extractLabels(page)
  if (spaceConfig.product) labels.push(spaceConfig.product)
  if (spaceConfig.docType) labels.push(spaceConfig.docType)

  const isRoot = page.ancestors.length === 0 && spaceConfig.contentType !== 'blogpost'
  const path = buildPath(page, spaceConfig, isRoot)
  const body = renderStorageFormat(page.body.storage.value)
  const date = page.version?.when
    ? new Date(page.version.when).toISOString().split('T')[0]
    : ''

  const isDocsPage = spaceConfig.section === 'docs'

  return {
    path,
    title: page.title,
    body,
    labels,
    template: isRoot && spaceConfig.section === 'blog'
      ? spaceConfig.indexTemplate
      : spaceConfig.template,
    date,
    slug: slugify(page.title),
    isRoot,
    section: spaceConfig.section,
    product: spaceConfig.product ?? null,
    docType: spaceConfig.docType ?? null,
    breadcrumb: isDocsPage ? buildBreadcrumb(page.title, spaceConfig) : '',
  }
}
