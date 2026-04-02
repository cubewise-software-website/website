import { describe, it, expect, beforeAll } from 'vitest'

const BASE = 'http://localhost:3000'

// Each entry: [path, expectedTitle]
const PAGES = [
  ['/', 'Cubewise — The Platform for IBM Planning Analytics / TM1'],
  ['/blog/', 'Blog — Cubewise'],
  ['/about/', 'About — Cubewise'],
  ['/contact/', 'Contact — Cubewise'],
  ['/docs/', 'Docs — Cubewise'],
  ['/partners/', 'Partners — Cubewise'],
  ['/pricing/', 'Pricing — Cubewise'],
  ['/platform/', 'The Cubewise Platform — IBM Planning Analytics / TM1'],
  ['/platform/developers/', 'Cubewise for Developers — IBM Planning Analytics / TM1'],
  ['/platform/administrators/', 'Cubewise for Administrators — IBM Planning Analytics / TM1'],
  ['/platform/power-users/', 'Cubewise for Power Users — IBM Planning Analytics / TM1'],
  ['/arc/', 'Arc — Cubewise Platform'],
  ['/arc/features/', 'Arc Features — Cubewise Platform'],
  ['/arc/download/', 'Download Arc — Cubewise Platform'],
  ['/arc/customers/', 'Arc Customers — Cubewise Platform'],
  ['/arc-plus/', 'Arc+ — Cubewise Platform'],
  ['/arc-plus/features/', 'Arc+ Features — Cubewise Platform'],
  ['/pulse/', 'Pulse — Cubewise Platform'],
  ['/pulse/features/', 'Pulse Features — Cubewise Platform'],
  ['/pulse/download/', 'Download Pulse — Cubewise Platform'],
  ['/pulse/customers/', 'Pulse Customers — Cubewise Platform'],
  ['/pulse/customers/aveva/', 'Aveva Customer Story — Pulse'],
  ['/pulse/customers/norgine/', 'Norgine Customer Story — Pulse'],
  ['/pulse/customers/pattonair/', 'Pattonair Customer Story — Pulse'],
  ['/pulse/customers/scc/', 'SCC Customer Story — Pulse'],
  ['/pulse/customers/stockland/', 'Stockland Customer Story — Pulse'],
  ['/slice/', 'Slice — Cubewise Platform'],
  ['/slice/features/', 'Slice Features — Cubewise Platform'],
  ['/slice/download/', 'Download Slice — Cubewise Platform'],
  ['/slice/customers/', 'Slice Customers — Cubewise Platform'],
  ['/atmosphere/', 'Atmosphere — Cubewise Platform'],
  ['/atmosphere/features/', 'Atmosphere Features — Cubewise Platform'],
  ['/atmosphere/integrations/', 'Atmosphere Integrations — Cubewise Platform'],
  ['/powerconnect/', 'PowerConnect — Cubewise Platform'],
  ['/powerconnect/features/', 'PowerConnect Features — Cubewise Platform'],
  ['/deployment/self-hosted/', 'Self-Hosted Deployment — Cubewise'],
  ['/deployment/cubewise-cloud/', 'Cubewise Cloud — Cubewise'],
]

// Fetch all pages once before running assertions
const cache = {}

beforeAll(async () => {
  await Promise.all(
    PAGES.map(async ([path]) => {
      try {
        const res = await fetch(`${BASE}${path}`, { signal: AbortSignal.timeout(5000) })
        const html = await res.text()
        cache[path] = { status: res.status, html }
      } catch {
        cache[path] = { status: null, html: '' }
      }
    })
  )
}, 30000)

describe.each(PAGES)('%s', (path, expectedTitle) => {
  it('returns HTTP 200', () => {
    expect(cache[path].status).toBe(200)
  })

  it('has site header and footer', () => {
    const { html } = cache[path]
    expect(html).toContain('class="site-header"')
    expect(html).toContain('class="site-footer"')
  })

  it('has correct page title', () => {
    expect(cache[path].html).toContain(`<title>${expectedTitle}</title>`)
  })

  it('has nav logo link', () => {
    expect(cache[path].html).toContain('class="nav-logo"')
  })

  it('has main content', () => {
    expect(cache[path].html).toContain('<main>')
  })
})
