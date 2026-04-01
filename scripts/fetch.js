import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { confluenceBaseUrl, confluenceEmail, confluenceApiToken, CACHE_DIR } from '../config.js'

function authHeader() {
  const token = Buffer.from(`${confluenceEmail}:${confluenceApiToken}`).toString('base64')
  return `Basic ${token}`
}

async function fetchPages(spaceKey, contentType = 'page') {
  const pages = []
  let start = 0
  const limit = 50

  while (true) {
    const url = `${confluenceBaseUrl}/wiki/rest/api/content` +
      `?spaceKey=${spaceKey}` +
      `&expand=body.storage,ancestors,metadata.labels,version` +
      `&type=${contentType}&limit=${limit}&start=${start}`

    const res = await fetch(url, {
      headers: { Authorization: authHeader(), Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Confluence API error ${res.status}: ${res.statusText}`)

    const data = await res.json()
    pages.push(...data.results)
    if (pages.length >= data.size) break
    start += limit
  }

  return pages
}

async function fetchAttachments(pageId) {
  const url = `${confluenceBaseUrl}/wiki/rest/api/content/${pageId}/child/attachment`
  const res = await fetch(url, {
    headers: { Authorization: authHeader(), Accept: 'application/json' },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.results ?? []
}

async function downloadAttachment(attachment) {
  const url = `${confluenceBaseUrl}/wiki${attachment._links.download}`
  const res = await fetch(url, { headers: { Authorization: authHeader() } })
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

export async function fetchSpace(spaceConfig) {
  const { key: spaceKey, isDocsSpace, contentType = 'page' } = spaceConfig
  const pages = await fetchPages(spaceKey, contentType)

  await mkdir(join(CACHE_DIR, spaceKey), { recursive: true })
  await mkdir(join(CACHE_DIR, 'attachments'), { recursive: true })

  for (const page of pages) {
    if (isDocsSpace) {
      const label = spaceKey.toLowerCase().replace(/_/g, '-')
      page.metadata.labels.results.push({ name: label })
    }

    const attachments = await fetchAttachments(page.id)
    for (const att of attachments) {
      const data = await downloadAttachment(att)
      if (data) {
        await writeFile(join(CACHE_DIR, 'attachments', att.title), data)
      }
    }

    await writeFile(join(CACHE_DIR, spaceKey, `${page.id}.json`), JSON.stringify(page, null, 2))
  }

  return pages
}
