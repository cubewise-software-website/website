# Announcement Banner — Design Spec

**Date:** 2026-04-02

## Summary

Add a sticky announcement bar above the main nav. The bar carries a single promotional message on the left and moves the utility nav links (About, Partners, Support, Forum) to the right side. The banner is hidden on mobile; those utility links remain accessible via the footer.

---

## Visual Style

- **Background:** `#f5f0ea` (warm off-white)
- **Border-bottom:** `1px solid var(--border)` (#DFE0E0)
- **Left side:** Orange pill badge (`NEW`, `background: var(--orange-gold)`, white text) + announcement text + a styled link (`→` arrow, orange, no underline)
- **Right side:** Utility links — About, Partners, Support, Forum — in `var(--charcoal)` at 12px, no underline
- **Font size:** 13px, single line, vertically centred, padded `7px 24px`

The announcement text is static, updated manually in `base.html` when content changes. No dismiss button. No rotating messages.

---

## Structure

### HTML (`src/templates/base.html`)

Add a `<div class="announcement-bar">` **above** `<header class="site-header">`:

```html
<div class="announcement-bar">
  <span class="announcement-bar__message">
    <span class="announcement-bar__badge">New</span>
    Cubewise achieves IBM Platinum Partner status for 2025 —
    <a href="/about/">Read the announcement →</a>
  </span>
  <nav class="announcement-bar__links">
    <a href="/about/">About</a>
    <a href="/partners/">Partners</a>
    <a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Support</a>
    <a href="https://forum.cubewise.com/" target="_blank" rel="noopener">Forum</a>
  </nav>
</div>
```

Remove About, Partners, Support, and Forum `<li>` entries from `.nav-links` in `base.html`.

---

## CSS (`src/assets/css/main.css`)

### New: `.announcement-bar`

```
position: sticky
top: 0
z-index: 210           ← sits above .site-header (z-index 200)
background: #f5f0ea
border-bottom: 1px solid var(--border)
padding: 7px 24px
display: flex
justify-content: space-between
align-items: center
font-size: 13px
```

### New: `.announcement-bar__badge`

```
background: var(--orange-gold)
color: var(--pearl-white)
font-size: 11px
font-weight: 700
padding: 2px 7px
border-radius: 3px
margin-right: 8px
text-transform: uppercase
letter-spacing: 0.03em
```

### New: `.announcement-bar__message a`

```
color: var(--orange-gold)
text-decoration: none
font-weight: 600
margin-left: 4px
```

### New: `.announcement-bar__links`

```
display: flex
gap: 20px
flex-shrink: 0
margin-left: 24px
```

### New: `.announcement-bar__links a`

```
color: var(--charcoal)
text-decoration: none
font-size: 12px
```

### Update: `.site-header`

Change `position: sticky; top: 0` to `position: sticky; top: 36px` — the announcement bar height is ~36px (7px padding × 2 + 13px line height + border).

### Update: `.component-subnav`

Change `top: 57px` to `top: 93px` (57px nav height + 36px banner height).

### Update: `.nav-backdrop`

The mega-menu backdrop uses `top: var(--header-height, 57px)`. Update to `top: 93px` on desktop so it covers below both sticky bars. Reset to `top: 57px` inside the mobile media query.

### Mobile (`@media (max-width: 768px)`)

```css
.announcement-bar { display: none; }
```

Reset `.site-header` back to `top: 0` and `.component-subnav` back to `top: 57px` within the same media query.

---

## Behaviour

| Scenario | Behaviour |
|---|---|
| Desktop scroll | Both announcement bar and main nav stay in view (both sticky) |
| Mobile | Announcement bar hidden; About/Partners/Support/Forum accessible via footer |
| External links | Forum opens in new tab (`target="_blank" rel="noopener"`); Support links to Atlassian portal |
| Content update | Edit text directly in `base.html` — no JS, no data files |

---

## Out of Scope

- Multiple rotating announcements
- Dismiss / close button
- CMS-driven content
