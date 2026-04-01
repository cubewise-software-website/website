# Platform Page Design

**Date:** 2026-03-31  
**File:** `src/pages/platform/index.html`

## Goal

Rebuild the platform landing page to explain how the Cubewise platform components work together, replacing the current minimal hero + component grid with a hub-and-spoke layout that makes Arc's central role clear and describes how each component connects.

## Scope

- Single file change: `src/pages/platform/index.html`
- New CSS classes added to `src/assets/css/main.css`
- No new JS, no new pages, no changes to other product pages

## Components Included

Arc, Arc+, Pulse, Slice, Atmosphere, PowerConnect. Bedrock and Arc Assistant are explicitly excluded for now.

## Page Structure

### 1. Hero (keep existing)
The existing `.platform-hero` section is unchanged:
- H1: "The Cubewise Platform"
- Tagline: "A complete suite of components for IBM Planning Analytics / TM1 — built together, deployed your way."

### 2. "Built to work together" intro
A centred prose section explaining the platform at a high level. Arc is described as the central development IDE; all other components either extend it, integrate with it, or connect external systems to it. This section replaces the need for connection tags on individual cards — the relationships are explained once in plain language.

**Prose (approved):**
> Arc is the central hub for IBM Planning Analytics. Every other component in the platform either extends Arc's capabilities, integrates with it to surface data and insights, or connects your existing systems to it. Together they cover the full lifecycle — from building and managing TM1 applications to reporting, monitoring, and data integration.

### 3. Arc hub card
A visually distinct, full-width card with a stronger border treatment (using the brand `--orange-gold` or a red accent) that marks Arc as the central hub. Contains:
- "Central Hub" label (small caps)
- Arc product logo (SVG from `/assets/logos/Products/Arc/Logo-arc.svg`)
- Tagline: "Faster to build and easier to manage IBM Planning Analytics applications"
- One-sentence connection description: "The TM1 development IDE that all other components connect to."
- "Learn more →" link to `/arc/`

### 4. Platform components grid
A 2-column responsive grid of the 5 spoke components. Each card contains:
- Product logo (SVG from `/assets/logos/Products/…`)
- Product name
- Brief description (1–2 sentences) that includes how it relates to Arc or other components
- "Learn more →" link to the product page

**Card descriptions:**

| Product | Description |
|---|---|
| Arc+ | Connect Arc to Pulse to unlock many new features. We call this Pulse-powered mode “Arc+”. |
| Pulse | Application lifecycle management for TM1. Monitor servers, migrate changes, and understand your applications — integrates directly with Arc. |
| Slice | Excel add-in for TM1 reporting. Works alongside Arc for development workflows and connects with Pulse for monitoring and lifecycle management. |
| Atmosphere | Secure data pipelines that bring cloud and ERP data into IBM Planning Analytics. Feeds Arc with always-current actuals and plans. |
| PowerConnect | Connect TM1 to external systems and data sources, extending Arc's reach across your existing infrastructure. |

PowerConnect sits as a fifth card; at 2-column layout it will span the full row or be left-aligned in the last row (whichever looks cleaner in CSS).

## CSS

New classes needed in `main.css`:

- `.platform-ecosystem` — the "Built to work together" intro section (centred, `--bg-alt` background, padding)
- `.platform-hub-card` — Arc's featured card (stronger border, tinted background)
- `.platform-spokes` — section wrapper for the component grid
- `.platform-spoke-grid` — 2-column grid, `repeat(2, 1fr)`, responsive to 1-column below ~600px
- `.platform-spoke-card` — individual spoke card (border, radius, padding, hover state)

Existing `.platform-hero` and `.platform-components` classes are either reused or superseded. The old `.component-grid` + `.component-card` classes inside `.platform-components` are replaced.

## What is NOT changing

- Nav (header/footer) — unchanged
- All product sub-pages — unchanged
- Any JS — no new scripts needed
- The page URL `/platform/` — unchanged
