# Nav Mega Menu — Floating Card Design

**Date:** 2026-03-31  
**Status:** Approved

## Goal

Replace the full-viewport-width mega menu with a modern floating card that drops directly below the "Platform" nav link, similar to elastic.co's navigation pattern.

## Current State

- `.nav-mega-menu` uses `position: fixed; left: 0; right: 0; top: 61px` — the background bleeds edge-to-edge across the viewport.
- The inner content is capped at 1200px and centred, but the grey bar is full-bleed.
- No animation on open/close.
- Link hover only changes text colour.

## Design

### Positioning

Change `.nav-item-dropdown` from `position: static` to `position: relative`. The `.nav-mega-menu` becomes `position: absolute; top: calc(100% + 0.5rem); left: 0`, anchored directly below the nav item.

### Card appearance

- `width: 700px` — fixed, does not scale with viewport
- `background: white` (was `var(--light-gray)`)
- `border: 1px solid var(--border)`
- `border-radius: 10px`
- `box-shadow: 0 16px 40px rgba(0,0,0,0.12)`

### Animation

Fade + slide-up on open:
- Hidden state: `opacity: 0; transform: translateY(-4px); pointer-events: none`
- Visible state (`.is-open`): `opacity: 1; transform: translateY(0); pointer-events: auto`
- Transition: `opacity 0.15s ease, transform 0.15s ease`

### Link hover

Add a light tinted background and rounded corners on hover so links feel like interactive cards:
- `padding: 0.5rem 0.65rem`
- `border-radius: 6px`
- `background: var(--light-gray)` on hover
- Remove per-link bottom borders (replaced by padding-based spacing)

### Inner layout

Remove `max-width` and `margin: 0 auto` from `.mega-menu-inner` — no longer needed since the card has a fixed width. Reduce padding to `1.75rem 2rem`.

## Files Changed

- `src/assets/css/main.css` — CSS only, no HTML or JS changes required.

## What Does Not Change

- `nav.js` — the `is-open` class toggle continues to drive open/close state.
- HTML structure in `src/templates/base.html` — no changes needed.
- The 200ms close delay on mouse-leave is preserved.
