# Contact Page — Design Spec

**Date:** 2026-03-30
**Scope:** `src/pages/contact/index.html`, `src/assets/css/main.css`

---

## Goal

Replace the empty contact page shell with a fully functional contact form that matches the site's visual style. The form submits to Formspree.

---

## Layout

Centred single-column layout:

1. **Dark hero banner** — uses `.component-hero` with an additional `.component-hero--dark` modifier that overrides the default white background back to `var(--dark-night)` with `var(--pearl-white)` text. Contains the label "Contact", H1 "Get in touch", and tagline "We would love to hear from you."
2. **Form** — centred, max-width `560px`, white background, inside a `page-content`-style container.
3. **Support note** — below the form, a short line linking to the support portal.

---

## Form Fields

Submitted via `POST` to Formspree (`https://formspree.io/f/PLACEHOLDER` — to be replaced with real endpoint).

| Field | Type | Required |
|---|---|---|
| First name | text | Yes |
| Last name | text | Yes |
| Email | email | Yes |
| Region | select | Yes |
| What would you like to discuss? | checkboxes (pills) | No |
| Message | textarea | No |
| Marketing consent | checkbox | Yes |

**Region options:** Africa, Australia (NSW & Queensland), Australia (Victoria, SA, WA), Austria, Belgium, Netherlands, Canada, France, Germany, Hong Kong, India, People's Republic of China, Poland, Singapore, Switzerland, Taiwan, Ukraine, United Kingdom, United States - East, United States - Central, United States - West, Other

**Product interest options (pills):** Arc, Arc+, Atmosphere, PowerConnect, Pulse, Slice, TM1py, Other

**Consent copy:** "We would like to reach you via email with the latest news and best practices in FP&A and TM1 development — no more than once a month."

**Submit button label:** "Submit details"

---

## CSS Additions

Three new rule groups appended to `main.css`:

### `.component-hero--dark`
Modifier class restoring the dark treatment: `background: var(--dark-night)`, `color: var(--pearl-white)`. Applied alongside `.component-hero` on the contact page hero. Also overrides `h1` and `p` colours back to `var(--pearl-white)` and `var(--sand-gold)` respectively.

### `.contact-form`
Flex column layout, `gap: 1rem`, `max-width: 560px`, `margin: 0 auto`, `padding: 3rem 2rem`.

### `.contact-form` field styles
- Labels: `font-size: 0.85rem`, `font-weight: 600`, `color: var(--dark-night)`, `margin-bottom: 0.35rem`
- Inputs / select / textarea: `width: 100%`, `padding: 0.6rem 0.75rem`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`, `background: var(--light-gray)`, `font-size: 0.95rem`, `color: var(--dark-night)`. On focus: `outline: 2px solid var(--orange-gold)`, `background: white`.
- Textarea: `min-height: 120px`, `resize: vertical`
- Name row: `display: grid`, `grid-template-columns: 1fr 1fr`, `gap: 1rem`

### `.product-pills`
Flex wrap container for product interest checkboxes styled as toggleable pills.
- Each pill: `<label>` wrapping a hidden `<input type="checkbox">` + visible text span.
- Default: `background: var(--light-gray)`, `border: 1px solid var(--border)`, `border-radius: 999px`, `padding: 0.3rem 0.9rem`, `font-size: 0.85rem`, `cursor: pointer`.
- Checked state: `background: var(--sand-gold)`, `border-color: var(--orange-gold)`, `color: var(--dark-night)`.

### `.consent-block`
Light gray background block (`var(--light-gray)`), `padding: 0.75rem 1rem`, `border-radius: var(--radius)`, `display: flex`, `gap: 0.75rem`. Contains checkbox + consent copy at `font-size: 0.85rem`.

### `.contact-support-note`
Below form: `text-align: center`, `padding-top: 1.5rem`, `border-top: 1px solid var(--border)`, `font-size: 0.9rem`, `color: var(--charcoal)`. Link uses `var(--orange-gold)`.

---

## Form Submission Behaviour

- `method="POST"`, `action="https://formspree.io/f/PLACEHOLDER"`
- On success: Formspree redirects to a thank-you URL or shows its default confirmation. No custom success page required for now.
- Required fields use native HTML5 `required` attribute — no custom JS validation needed.

---

## Out of Scope

- Custom thank-you / confirmation page
- Backend or server-side processing
- reCAPTCHA or spam protection (Formspree provides this)
- Live chat widget
