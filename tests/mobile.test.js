import { test, expect } from '@playwright/test'

// Key pages to check across all tests
const PAGES = [
  '/',
  '/blog/',
  '/about/',
  '/contact/',
  '/docs/',
  '/partners/',
  '/arc/',
  '/arc/features/',
  '/pulse/',
  '/platform/',
  '/platform/developers/',
]

// ─── Mobile-only tests (Pixel 5 — 393×851) ───────────────────
test.describe('mobile nav', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  test('hamburger button is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav-toggle')).toBeVisible()
  })

  test('nav links are hidden by default', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav-links')).toBeHidden()
  })

  test('clicking hamburger reveals nav links', async ({ page }) => {
    await page.goto('/')
    await page.click('.nav-toggle')
    await expect(page.locator('.nav-links')).toBeVisible()
  })

  test('clicking hamburger again hides nav links', async ({ page }) => {
    await page.goto('/')
    await page.click('.nav-toggle')
    await page.click('.nav-toggle')
    await expect(page.locator('.nav-links')).toBeHidden()
  })

  test('pressing Escape closes the nav', async ({ page }) => {
    await page.goto('/')
    await page.click('.nav-toggle')
    await page.keyboard.press('Escape')
    await expect(page.locator('.nav-links')).toBeHidden()
  })

  test('mega menu is not visible on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav-mega-menu').first()).toBeHidden()
  })
})

// ─── No horizontal overflow on mobile ────────────────────────
test.describe('mobile — no horizontal scroll', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  for (const path of PAGES) {
    test(`${path} fits viewport width`, async ({ page }) => {
      await page.goto(path)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  }
})

// ─── Desktop — hamburger hidden, nav visible ─────────────────
test.describe('desktop nav', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('hamburger button is hidden on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav-toggle')).toBeHidden()
  })

  test('nav links are visible on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav-links')).toBeVisible()
  })

  test('Platform mega menu opens on hover', async ({ page }) => {
    await page.goto('/')
    await page.hover('.nav-item-dropdown')
    await expect(page.locator('.nav-mega-menu').first()).toBeVisible()
  })
})

// ─── Mobile — key elements render on each page ───────────────
test.describe('mobile — page structure', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  for (const path of PAGES) {
    test(`${path} has header, main, footer`, async ({ page }) => {
      await page.goto(path)
      await expect(page.locator('.site-header')).toBeVisible()
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('.site-footer')).toBeVisible()
    })
  }
})

// ─── Announcement bar visibility ─────────────────────────────
test.describe('announcement bar — desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('announcement bar is visible on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.announcement-bar')).toBeVisible()
  })

  test('announcement bar shows About link', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('.announcement-bar__links a')
    await expect(links.filter({ hasText: 'About' })).toBeVisible()
  })

  test('About is no longer in the main nav links', async ({ page }) => {
    await page.goto('/')
    const navLinks = page.locator('.nav-links')
    await expect(navLinks.locator('a[href="/about/"]')).toHaveCount(0)
  })

  test('Partners is no longer in the main nav links', async ({ page }) => {
    await page.goto('/')
    const navLinks = page.locator('.nav-links')
    await expect(navLinks.locator('a[href="/partners/"]')).toHaveCount(0)
  })

  test('Support is no longer in the main nav links', async ({ page }) => {
    await page.goto('/')
    const navLinks = page.locator('.nav-links')
    await expect(navLinks.locator('a[href*="cubewisecare.atlassian.net"]')).toHaveCount(0)
  })
})

test.describe('announcement bar — mobile', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  test('announcement bar is hidden on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.announcement-bar')).toBeHidden()
  })
})
