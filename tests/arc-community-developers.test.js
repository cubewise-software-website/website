import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

let communityHtml = ''
try {
  communityHtml = readFileSync('src/pages/arc/community/index.html', 'utf8')
} catch {
  // file not yet created — all toContain assertions will fail as expected
}

describe('Arc Community page', () => {
  it('has correct page title', () => {
    expect(communityHtml).toContain('Arc Community — Cubewise Platform')
  })

  it('has component-hero with Arc Community Edition h1', () => {
    expect(communityHtml).toContain('class="component-hero"')
    expect(communityHtml).toContain('Arc Community Edition')
  })

  it('has component-label Arc', () => {
    expect(communityHtml).toContain('class="component-label"')
    expect(communityHtml).toContain('class="component-label">Arc<')
  })

  it('has features-group section', () => {
    expect(communityHtml).toContain('class="features-group"')
    expect(communityHtml).toContain('class="features-group-inner"')
  })

  it('has all six feature rows', () => {
    expect(communityHtml).toContain('id="cube-viewer"')
    expect(communityHtml).toContain('id="subset-editor"')
    expect(communityHtml).toContain('id="history-favourites"')
    expect(communityHtml).toContain('id="desktop-application"')
    expect(communityHtml).toContain('id="summary-views"')
    expect(communityHtml).toContain('id="to-do-list"')
  })

  it('has page-cta with download link', () => {
    expect(communityHtml).toContain('class="page-cta"')
    expect(communityHtml).toContain('href="/arc/download/"')
  })

  it('has subnav with Community as active and correct order', () => {
    const subnavIdx = communityHtml.indexOf('component-subnav-inner')
    const subnav = communityHtml.slice(subnavIdx, subnavIdx + 800)
    expect(subnav).toContain('href="/arc/"')
    expect(subnav).toContain('href="/arc/features/"')
    expect(subnav).toContain('href="/arc/community/" class="active"')
    expect(subnav).toContain('href="/arc/developers/"')
    expect(subnav).toContain('href="/arc/customers/"')
    expect(subnav).toContain('href="/arc/download/"')
  })

  it('has lang-switcher with correct data-current-path', () => {
    expect(communityHtml).toContain('data-current-path="/arc/community/"')
  })
})
