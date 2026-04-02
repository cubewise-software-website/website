# Announcement Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky announcement bar above the main nav that carries a single promotional message on the left and utility nav links (About, Partners, Support, Forum) on the right; hidden on mobile.

**Architecture:** A new `.announcement-bar` element is inserted above `<header class="site-header">` in `base.html`. It is `position: sticky; top: 0` with `z-index: 210`, pushing the existing sticky header down to `top: 36px`. The component subnav and nav backdrop offsets are updated to match. On `≤768px` the bar is `display: none` and all offsets reset.

**Tech Stack:** Static HTML templates (`src/templates/base.html`), plain CSS (`src/assets/css/main.css`), Vitest for CSS/HTML string assertions, Playwright for browser integration tests.

---

## File Map

| File | Change |
|------|--------|
| `src/assets/css/main.css` | Add `.announcement-bar*` rules; update `.site-header`, `.component-subnav`, `.nav-backdrop` top offsets; add mobile resets |
| `src/templates/base.html` | Insert `.announcement-bar` HTML above `<header>`; remove About, Partners, Support, Forum `<li>` items from `.nav-links` |
| `tests/pages.test.js` | Add CSS selector presence tests for `.announcement-bar` classes |
| `tests/mobile.test.js` | Add Playwright visibility tests for banner on desktop and mobile |

---

## Task 1: Write failing CSS tests

**Files:**
- Modify: `tests/pages.test.js`

- [ ] **Step 1: Append the test block to `tests/pages.test.js`**

Open `tests/pages.test.js` and add at the end of the file:

```js
describe('announcement bar CSS', () => {
  it('defines .announcement-bar as sticky with z-index 210', () => {
    expect(css).toContain('.announcement-bar')
    expect(css).toContain('z-index: 210')
    expect(css).toContain('position: sticky')
  })

  it('defines .announcement-bar__badge with orange-gold background', () => {
    expect(css).toContain('.announcement-bar__badge')
    expect(css).toContain('text-transform: uppercase')
  })

  it('defines .announcement-bar__links as flex row', () => {
    expect(css).toContain('.announcement-bar__links')
    expect(css).toContain('flex-shrink: 0')
  })

  it('site-header top offset is 36px on desktop', () => {
    // After the banner is added, site-header sits below it
    // The rule will contain "top: 36px" (not "top: 0")
    // We check the CSS string contains the updated value in the site-header block
    const siteHeaderBlock = css.slice(css.indexOf('.site-header'), css.indexOf('.site-header') + 200)
    expect(siteHeaderBlock).toContain('top: 36px')
  })

  it('component-subnav top offset is 93px on desktop', () => {
    expect(css).toContain('top: 93px')
  })

  it('hides announcement bar on mobile', () => {
    expect(css).toContain('.announcement-bar { display: none; }')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test -- --reporter=verbose 2>&1 | grep -A 3 "announcement bar CSS"
```

Expected: 6 failures from the new `announcement bar CSS` suite.

---

## Task 2: Add announcement bar CSS

**Files:**
- Modify: `src/assets/css/main.css`

- [ ] **Step 1: Add `.announcement-bar` rules in the Nav section**

In `src/assets/css/main.css`, find the Nav section comment (`/* Nav */`) around line 89. Insert the following block **before** the `.site-header` rule:

```css
/* Announcement bar */
.announcement-bar {
  position: sticky;
  top: 0;
  z-index: 210;
  background: #f5f0ea;
  border-bottom: 1px solid var(--border);
  padding: 7px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
}

.announcement-bar__badge {
  background: var(--orange-gold);
  color: var(--pearl-white);
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 3px;
  margin-right: 8px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.announcement-bar__message a {
  color: var(--orange-gold);
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.announcement-bar__links {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
  margin-left: 24px;
}

.announcement-bar__links a {
  color: var(--charcoal);
  text-decoration: none;
  font-size: 0.75rem;
}

.announcement-bar__links a:hover { color: var(--dark-night); }
```

- [ ] **Step 2: Update `.site-header` top offset**

Find the `.site-header` rule (around line 92). Change `top: 0` to `top: 36px`:

```css
.site-header {
  border-bottom: 1px solid var(--border);
  background: var(--pearl-white);
  position: sticky;
  top: 36px;
  z-index: 200;
}
```

- [ ] **Step 3: Update `.component-subnav` top offset**

Find the `.component-subnav` rule (around line 253). Change `top: 57px` to `top: 93px`:

```css
  top: 93px; /* height of .announcement-bar + .site-header */
```

- [ ] **Step 4: Update `.nav-backdrop` top offset**

Find the `.nav-backdrop` rule. Change `top: var(--header-height, 57px)` to `top: 93px`:

```css
.nav-backdrop {
  position: fixed;
  top: 93px;
  left: 0;
  ...
}
```

- [ ] **Step 5: Add mobile resets in the `@media (max-width: 768px)` block**

Find the mobile media query block (around line 3479). Add these rules inside it (after the existing `.nav` mobile rules):

```css
  .announcement-bar { display: none; }
  .site-header { top: 0; }
  .component-subnav { top: 57px; }
```

- [ ] **Step 6: Run CSS tests — verify they pass**

```bash
npm test -- --reporter=verbose 2>&1 | grep -A 3 "announcement bar CSS"
```

Expected: 6 passing tests in the `announcement bar CSS` suite.

- [ ] **Step 7: Commit**

```bash
git add src/assets/css/main.css tests/pages.test.js
git commit -m "feat: add announcement bar CSS and update sticky offsets"
```

---

## Task 3: Write failing HTML tests

**Files:**
- Modify: `tests/pages.test.js`

- [ ] **Step 1: Add base.html fixture and test block**

In `tests/pages.test.js`, add after the existing `const css = readFileSync(...)` line (the `readFileSync` import is already present — do not add a duplicate import):

```js
const baseHtml = readFileSync('src/templates/base.html', 'utf8')
```

Then append at the end of the file:

```js
describe('announcement bar HTML (base template)', () => {
  it('contains .announcement-bar element', () => {
    expect(baseHtml).toContain('class="announcement-bar"')
  })

  it('contains .announcement-bar__badge', () => {
    expect(baseHtml).toContain('class="announcement-bar__badge"')
  })

  it('contains .announcement-bar__links nav', () => {
    expect(baseHtml).toContain('class="announcement-bar__links"')
  })

  it('announcement bar links include About, Partners, Support, Forum', () => {
    const barIdx = baseHtml.indexOf('announcement-bar__links')
    const barSection = baseHtml.slice(barIdx, barIdx + 600)
    expect(barSection).toContain('/about/')
    expect(barSection).toContain('/partners/')
    expect(barSection).toContain('cubewisecare.atlassian.net')
    expect(barSection).toContain('forum.cubewise.com')
  })

  it('Forum link opens in new tab', () => {
    const barIdx = baseHtml.indexOf('announcement-bar__links')
    const barSection = baseHtml.slice(barIdx, barIdx + 600)
    expect(barSection).toContain('target="_blank"')
    expect(barSection).toContain('rel="noopener"')
  })

  it('nav-links no longer contains standalone About link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    // About should not be a bare nav-links item (it moved to announcement bar)
    expect(navLinksSection).not.toContain('<li><a href="/about/">')
  })

  it('nav-links no longer contains standalone Partners link', () => {
    const navLinksIdx = baseHtml.indexOf('class="nav-links"')
    const navLinksSection = baseHtml.slice(navLinksIdx, navLinksIdx + 1000)
    expect(navLinksSection).not.toContain('<li><a href="/partners/">')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test -- --reporter=verbose 2>&1 | grep -A 3 "announcement bar HTML"
```

Expected: failures (banner not yet in HTML, utility links still in nav-links).

---

## Task 4: Update base.html

**Files:**
- Modify: `src/templates/base.html`

- [ ] **Step 1: Insert the announcement bar above `<header>`**

In `src/templates/base.html`, find `<header class="site-header">` (line 10). Insert the following block immediately before it:

```html
  <div class="announcement-bar">
    <span class="announcement-bar__message">
      <span class="announcement-bar__badge">New</span>
      Cubewise achieves IBM Platinum Partner status for 2025 —
      <a href="/about/">Read the announcement &rarr;</a>
    </span>
    <nav class="announcement-bar__links">
      <a href="/about/">About</a>
      <a href="/partners/">Partners</a>
      <a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Support</a>
      <a href="https://forum.cubewise.com/" target="_blank" rel="noopener">Forum</a>
    </nav>
  </div>
```

- [ ] **Step 2: Remove About, Partners, Support, Forum from `.nav-links`**

In `src/templates/base.html`, within `<ul class="nav-links">`, remove these four `<li>` items:

```html
        <li><a href="https://forum.cubewise.com/" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Support</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
```

- [ ] **Step 3: Run HTML tests — verify they pass**

```bash
npm test -- --reporter=verbose 2>&1 | grep -A 3 "announcement bar HTML"
```

Expected: 7 passing tests in the `announcement bar HTML` suite.

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: all vitest tests pass. No regressions.

- [ ] **Step 5: Commit**

```bash
git add src/templates/base.html tests/pages.test.js
git commit -m "feat: add announcement bar to base template, move utility links"
```

---

## Task 5: Playwright tests for banner visibility

**Files:**
- Modify: `tests/mobile.test.js`

- [ ] **Step 1: Append banner visibility tests to `tests/mobile.test.js`**

Add at the end of the file:

```js
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
})

test.describe('announcement bar — mobile', () => {
  test.use({ viewport: { width: 393, height: 851 } })

  test('announcement bar is hidden on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.announcement-bar')).toBeHidden()
  })
})
```

- [ ] **Step 2: Build the site and start the preview server**

In a separate terminal, run:

```bash
npm run build && npx serve dist
```

Leave it running (serves on port 3000).

- [ ] **Step 3: Run Playwright tests**

```bash
npm run test:mobile
```

Expected: all tests pass, including the 4 new banner tests.

- [ ] **Step 4: Commit**

```bash
git add tests/mobile.test.js
git commit -m "test: add Playwright tests for announcement bar visibility"
```
