# Partners Page Design

**Date:** 2026-03-31
**Page:** `/partners/`
**File:** `src/pages/partners/index.html`

---

## Overview

A partner program information page for prospective partners. The goal is to communicate the value of partnering with Cubewise and drive visitors to contact Cubewise to register. There is a single partnership tier — no tiers or levels to present.

---

## Page Structure

Three sections in order:

### 1. Hero

- Uses the existing `component-hero component-hero--dark` classes (dark navy background, white text)
- Label: "Partners"
- Headline: "Grow your business with Cubewise"
- Subtext: "Join our partner program and offer your clients best-in-class IBM Planning Analytics / TM1 software."

### 2. Benefits List

Headed "What's included". Seven benefits displayed as a vertical list of white cards, each with an icon, name (bold), and one-line description.

| Benefit | Description |
|---|---|
| Reseller Margin | Competitive discounts on Cubewise licenses to resell to your clients. |
| Technical Training | Access to product training and certification resources for your team. |
| Demo Licenses | Not-for-resale licenses so you can demo and evaluate products internally. |
| Deal Registration | Register your opportunities for pricing protection and support. |
| Co-Marketing | Joint marketing support and visibility across Cubewise channels. |
| Dedicated Support | A priority technical support channel for partner enquiries. |
| Sales Enablement | Access to sales decks, datasheets, and ready-to-use collateral. |

Layout: `max-width: 640px`, centred. Each benefit is a `<li>` with flex layout — icon left, text right.

### 3. CTA Block

- Headline: "Ready to partner with us?"
- Body: "Contact us to register for the Cubewise Partner Program and a member of our team will be in touch."
- Button: "Contact us to register →" linking to `/contact/`
- Background: light warm tone (`#f0ede6`) to visually separate from the benefits section

---

## Implementation Notes

- The page follows the same hand-coded static HTML pattern as all other pages in `src/pages/`
- Nav and footer are copied verbatim from other pages (no shared template for hand-coded pages)
- No new CSS classes needed — use existing `component-hero`, `component-hero--dark`, `btn`, `btn-primary` from `main.css`; add minimal page-specific styles inline or in a `<style>` block
- No JavaScript required
- The CTA button links to `/contact/` — no new form or backend needed

---

## Out of Scope

- Partner directory / listing of existing partners
- Partner login or portal
- Multiple partner tiers
