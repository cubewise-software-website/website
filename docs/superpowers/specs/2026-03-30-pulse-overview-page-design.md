# Pulse Overview Page — Design Spec

**Date:** 2026-03-30
**Scope:** `src/pages/pulse/index.html` and `src/assets/css/main.css`
**Source reference:** `current_site/Pulse.html` (exported from live site)

---

## Goal

Populate the Pulse overview page shell with content migrated from the current live site. The page should communicate what Pulse is, showcase its four feature areas with animated GIFs, and include customer testimonials. No blog/news section.

---

## Hero Section

- **Label (`.component-label`):** Pulse
- **H1:** The application lifecycle management software for IBM Planning Analytics
- **Tagline (`<p>`):** Monitor what is happening. Migrate faster with confidence. Understand what happened.
- **CTAs:** "Read the Docs" (primary, `/docs/`) + "Get in Touch" (secondary, `/contact/`) — already in shell

---

## Feature Rows (inside `.component-detail`)

Four alternating rows. Layout: odd rows image-left/text-right, even rows text-left/image-right.

Each row contains:
- An animated GIF (from `src/assets/images/pulse/`)
- A heading (h2)
- 3–4 bullet points from the original feature list

| # | Heading | GIF | Bullets |
|---|---------|-----|---------|
| 1 | Monitor all your TM1 servers | `pulse-7-new-ui.gif` | 24/7 monitoring, Real-time notification of model changes, Keep your history and favourites, Reduce support calls |
| 2 | Understand your applications | `pulse-troubleshoot-errors.gif` | Impact analysis, Interactive model navigation, Troubleshoot errors faster, TM1 user analysis |
| 3 | Migrate faster with confidence | `pulse-rollback.gif` | Migrate changes to production live, Rollback changes quickly, Improve your testing procedures, Separation of duties between TM1 team and IT |
| 4 | Continuously improve TM1 | `pulse-7-license-report.gif` | Improve performance and up-time, Make your users more productive, Speed-up TM1 development, Identify users who require training |

---

## Testimonials Section

Three customer quotes in a horizontal row (wraps on mobile). Each card contains:
- Customer logo (`<img>`)
- Pull quote (`<blockquote>`)
- Company name

| Customer | Logo file | Quote |
|----------|-----------|-------|
| Pattonair | `pattonair-logo.png` | "Pulse has helped us to significantly reduce user locks and allowed us to be notified via email if any user is locked in TM1 for more than 5 min." |
| SCC | `scc-logo.png` | "Pulse gives us as developers the option to migrate packages live without the need to bring down services." |
| Aveva | `image-asset-7.png` | "Pulse has given us great confidence knowing that everything necessary will have been migrated." |

---

## CSS Additions (`main.css`)

Three new rule groups appended to the existing stylesheet:

### `.feature-row`
Flexbox row, `gap: 3rem`, `align-items: center`, `margin-bottom: 4rem`.
`.feature-row:nth-child(even)` uses `flex-direction: row-reverse` for alternating layout.

### `.feature-row-text` / `.feature-row-media`
50/50 flex split (`flex: 1`). Media side: `img` is `width: 100%`, `border-radius: var(--radius)`, `box-shadow`.
Text side: `h2` at ~1.5rem, `ul` with modest `line-height`.

### `.testimonial-row` / `.testimonial-card`
Flex row, `gap: 2rem`, `flex-wrap: wrap`. Each card: `flex: 1`, `min-width: 240px`, `padding`, light border, `border-radius`.
Logo: `max-height: 32px`, `margin-bottom: 1rem`.
Quote: italic, `font-size: 0.95rem`, `color: var(--charcoal)`.

---

## Assets

All images already copied to `src/assets/images/pulse/`:
- `pulse.svg`
- `pulse-7-new-ui.gif`
- `pulse-troubleshoot-errors.gif`
- `pulse-rollback.gif`
- `pulse-7-license-report.gif`
- `pattonair-logo.png`
- `scc-logo.png`
- `image-asset-7.png`

---

## Out of Scope

- Blog / "What's new" section — excluded per user decision
- Features sub-page (`/pulse/features/`) — separate task
- Mobile responsive tweaks beyond `flex-wrap`
