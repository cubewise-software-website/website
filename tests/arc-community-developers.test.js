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

let developersHtml = ''
try {
  developersHtml = readFileSync('src/pages/arc/developers/index.html', 'utf8')
} catch {
  // file not yet created — all toContain assertions will fail as expected
}

describe('Arc Developers page', () => {
  it('has correct page title', () => {
    expect(developersHtml).toContain('Arc for Developers — Cubewise Platform')
  })

  it('has component-hero with Arc for Developers h1', () => {
    expect(developersHtml).toContain('class="component-hero"')
    expect(developersHtml).toContain('Arc for Developers')
  })

  it('has component-label Arc', () => {
    expect(developersHtml).toContain('class="component-label">Arc<')
  })

  it('has features-group section', () => {
    expect(developersHtml).toContain('class="features-group"')
    expect(developersHtml).toContain('class="features-group-inner"')
  })

  it('has all nine feature rows', () => {
    expect(developersHtml).toContain('id="development-interface"')
    expect(developersHtml).toContain('id="process-debugger"')
    expect(developersHtml).toContain('id="rules-editor"')
    expect(developersHtml).toContain('id="security-editor"')
    expect(developersHtml).toContain('id="server-parameters"')
    expect(developersHtml).toContain('id="mdx-studio"')
    expect(developersHtml).toContain('id="rest-api-tool"')
    expect(developersHtml).toContain('id="plugins-extensions"')
    expect(developersHtml).toContain('id="python-integration"')
  })

  it('has page-cta with contact link', () => {
    expect(developersHtml).toContain('class="page-cta"')
    expect(developersHtml).toContain('href="/contact/"')
  })

  it('has subnav with Developers as active and correct order', () => {
    const subnavIdx = developersHtml.indexOf('component-subnav-inner')
    const subnav = developersHtml.slice(subnavIdx, subnavIdx + 800)
    expect(subnav).toContain('href="/arc/"')
    expect(subnav).toContain('href="/arc/features/"')
    expect(subnav).toContain('href="/arc/community/"')
    expect(subnav).toContain('href="/arc/developers/" class="active"')
    expect(subnav).toContain('href="/arc/customers/"')
    expect(subnav).toContain('href="/arc/download/"')
  })

  it('has lang-switcher with correct data-current-path', () => {
    expect(developersHtml).toContain('data-current-path="/arc/developers/"')
  })
})
