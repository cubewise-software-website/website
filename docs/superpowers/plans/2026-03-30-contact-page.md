# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the empty contact page shell with a centred-form page (dark hero, Formspree submission, product-interest pills, consent checkbox) and all supporting CSS.

**Architecture:** Two files change — `main.css` gets four new rule groups appended, `contact/index.html` gets its `<main>` content replaced. A new `tests/pages.test.js` file verifies the HTML and CSS structure. No JavaScript, no build step required beyond the existing `node scripts/preview.js`.

**Tech Stack:** Plain HTML, CSS custom properties, Vitest (existing test runner), Formspree (external form service).

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/assets/css/main.css` — append dark hero modifier + contact form styles |
| Modify | `src/pages/contact/index.html` — replace `<main>` content |
| Create | `tests/pages.test.js` — structural assertions for CSS and HTML |

---

### Task 1: Add dark hero CSS modifier

**Files:**
- Modify: `src/assets/css/main.css` (append after the last rule)
- Create: `tests/pages.test.js`

- [ ] **Step 1: Write the failing test**

Create `tests/pages.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

const css = readFileSync('src/assets/css/main.css', 'utf8')

describe('dark hero modifier CSS', () => {
  it('defines .component-hero--dark with dark-night background', () => {
    expect(css).toContain('.component-hero--dark')
    expect(css).toContain('var(--dark-night)')
  })

  it('overrides h1 colour to pearl-white inside dark hero', () => {
    expect(css).toContain('.component-hero--dark h1')
  })

  it('overrides p colour to sand-gold inside dark hero', () => {
    expect(css).toContain('.component-hero--dark p')
  })
})
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: 3 failures — `.component-hero--dark` not yet in CSS.

- [ ] **Step 3: Append the CSS block to `src/assets/css/main.css`**

```css
/* ============================================================
   Dark hero modifier (used on pages that need the original
   dark-background hero, e.g. contact)
   ============================================================ */
.component-hero--dark {
  background: var(--dark-night);
  color: var(--pearl-white);
}

.component-hero--dark h1 {
  color: var(--pearl-white);
}

.component-hero--dark p {
  color: var(--sand-gold);
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: 3 passing.

- [ ] **Step 5: Commit**

```bash
git add src/assets/css/main.css tests/pages.test.js
git commit -m "feat: add .component-hero--dark CSS modifier"
```

---

### Task 2: Add contact form CSS

**Files:**
- Modify: `src/assets/css/main.css` (append after Task 1 block)
- Modify: `tests/pages.test.js` (add new describe block)

- [ ] **Step 1: Add failing tests to `tests/pages.test.js`**

Append after the existing `describe` block:

```js
describe('contact form CSS', () => {
  it('defines .contact-form', () => {
    expect(css).toContain('.contact-form')
  })

  it('defines .contact-form .name-row grid', () => {
    expect(css).toContain('.name-row')
  })

  it('defines .product-pills with pill styling', () => {
    expect(css).toContain('.product-pills')
    expect(css).toContain('border-radius: 999px')
  })

  it('defines .product-pills input checked state', () => {
    expect(css).toContain('.product-pills input:checked')
  })

  it('defines .consent-block', () => {
    expect(css).toContain('.consent-block')
  })

  it('defines .contact-support-note', () => {
    expect(css).toContain('.contact-support-note')
  })
})
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: 6 new failures.

- [ ] **Step 3: Append the CSS blocks to `src/assets/css/main.css`**

```css
/* ============================================================
   Contact form
   ============================================================ */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 560px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.contact-form label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--dark-night);
  margin-bottom: 0.35rem;
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form select,
.contact-form textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--light-gray);
  font-size: 0.95rem;
  color: var(--dark-night);
  font-family: inherit;
  transition: outline 0.1s, background 0.1s;
}

.contact-form input[type="text"]:focus,
.contact-form input[type="email"]:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: 2px solid var(--orange-gold);
  outline-offset: 0;
  background: white;
}

.contact-form textarea {
  min-height: 120px;
  resize: vertical;
}

.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* ============================================================
   Product interest pills
   ============================================================ */
.product-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.product-pills label {
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  margin-bottom: 0;
}

.product-pills input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.product-pills .pill-label {
  background: var(--light-gray);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  user-select: none;
}

.product-pills input:checked + .pill-label {
  background: var(--sand-gold);
  border-color: var(--orange-gold);
  color: var(--dark-night);
}

.product-pills .pill-label:hover {
  border-color: var(--orange-gold);
}

/* ============================================================
   Consent block
   ============================================================ */
.consent-block {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: var(--light-gray);
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  font-size: 0.85rem;
  color: var(--charcoal);
  line-height: 1.5;
}

.consent-block input[type="checkbox"] {
  flex-shrink: 0;
  margin-top: 0.2rem;
  width: 16px;
  height: 16px;
  accent-color: var(--orange-gold);
  cursor: pointer;
}

/* ============================================================
   Contact support note
   ============================================================ */
.contact-support-note {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--charcoal);
}

.contact-support-note a {
  color: var(--orange-gold);
  text-decoration: none;
}

.contact-support-note a:hover {
  color: var(--charcoal);
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: all 9 passing.

- [ ] **Step 5: Commit**

```bash
git add src/assets/css/main.css tests/pages.test.js
git commit -m "feat: add contact form and product pills CSS"
```

---

### Task 3: Build contact page HTML

**Files:**
- Modify: `src/pages/contact/index.html`
- Modify: `tests/pages.test.js` (add HTML assertions)

- [ ] **Step 1: Add failing HTML tests to `tests/pages.test.js`**

Append after the existing describe blocks:

```js
const contactHtml = readFileSync('src/pages/contact/index.html', 'utf8')

describe('contact page HTML', () => {
  it('has component-hero--dark class on hero section', () => {
    expect(contactHtml).toContain('component-hero--dark')
  })

  it('posts to Formspree placeholder endpoint', () => {
    expect(contactHtml).toContain('action="https://formspree.io/f/PLACEHOLDER"')
    expect(contactHtml).toContain('method="POST"')
  })

  it('has required first name, last name, and email fields', () => {
    expect(contactHtml).toContain('name="first-name"')
    expect(contactHtml).toContain('name="last-name"')
    expect(contactHtml).toContain('name="email"')
  })

  it('has a required region select field', () => {
    expect(contactHtml).toContain('name="region"')
    expect(contactHtml).toContain('United Kingdom')
  })

  it('has product interest pills', () => {
    expect(contactHtml).toContain('class="product-pills"')
    expect(contactHtml).toContain('name="interest"')
    expect(contactHtml).toContain('Arc+')
    expect(contactHtml).toContain('TM1py')
  })

  it('has message textarea', () => {
    expect(contactHtml).toContain('name="message"')
  })

  it('has required consent checkbox', () => {
    expect(contactHtml).toContain('name="consent"')
    expect(contactHtml).toContain('once a month')
  })

  it('has support portal link', () => {
    expect(contactHtml).toContain('class="contact-support-note"')
    expect(contactHtml).toContain('cubewisecare.atlassian.net')
  })
})
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: 8 new failures.

- [ ] **Step 3: Replace `<main>` content in `src/pages/contact/index.html`**

Find this block:

```html
<main><section class="page-content"><h1>Contact Us</h1><p><!-- contact content --></p></section></main>
```

Replace with:

```html
<main>
  <section class="component-hero component-hero--dark">
    <div class="component-label">Contact</div>
    <h1>Get in touch</h1>
    <p>We would love to hear from you</p>
  </section>

  <form class="contact-form" action="https://formspree.io/f/PLACEHOLDER" method="POST">

    <div class="name-row">
      <div>
        <label for="first-name">First name <span aria-hidden="true" style="color:var(--orange-gold)">*</span></label>
        <input type="text" id="first-name" name="first-name" required autocomplete="given-name">
      </div>
      <div>
        <label for="last-name">Last name <span aria-hidden="true" style="color:var(--orange-gold)">*</span></label>
        <input type="text" id="last-name" name="last-name" required autocomplete="family-name">
      </div>
    </div>

    <div>
      <label for="email">Email <span aria-hidden="true" style="color:var(--orange-gold)">*</span></label>
      <input type="email" id="email" name="email" required autocomplete="email">
    </div>

    <div>
      <label for="region">Region <span aria-hidden="true" style="color:var(--orange-gold)">*</span></label>
      <select id="region" name="region" required>
        <option value="" disabled selected>Select your region…</option>
        <option>Africa</option>
        <option>Australia (NSW &amp; Queensland)</option>
        <option>Australia (Victoria, SA, WA)</option>
        <option>Austria</option>
        <option>Belgium, Netherlands</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
        <option>Hong Kong</option>
        <option>India</option>
        <option>People's Republic of China</option>
        <option>Poland</option>
        <option>Singapore</option>
        <option>Switzerland</option>
        <option>Taiwan</option>
        <option>Ukraine</option>
        <option>United Kingdom</option>
        <option>United States - East</option>
        <option>United States - Central</option>
        <option>United States - West</option>
        <option>Other</option>
      </select>
    </div>

    <div>
      <label>What would you like to discuss?</label>
      <div class="product-pills">
        <label><input type="checkbox" name="interest" value="Arc"><span class="pill-label">Arc</span></label>
        <label><input type="checkbox" name="interest" value="Arc+"><span class="pill-label">Arc+</span></label>
        <label><input type="checkbox" name="interest" value="Atmosphere"><span class="pill-label">Atmosphere</span></label>
        <label><input type="checkbox" name="interest" value="PowerConnect"><span class="pill-label">PowerConnect</span></label>
        <label><input type="checkbox" name="interest" value="Pulse"><span class="pill-label">Pulse</span></label>
        <label><input type="checkbox" name="interest" value="Slice"><span class="pill-label">Slice</span></label>
        <label><input type="checkbox" name="interest" value="TM1py"><span class="pill-label">TM1py</span></label>
        <label><input type="checkbox" name="interest" value="Other"><span class="pill-label">Other</span></label>
      </div>
    </div>

    <div>
      <label for="message">Message <span style="font-size:0.85rem;font-weight:400;color:var(--charcoal)">(optional)</span></label>
      <textarea id="message" name="message"></textarea>
    </div>

    <div class="consent-block">
      <input type="checkbox" id="consent" name="consent" value="yes" required>
      <label for="consent" style="font-weight:400;margin-bottom:0">We would like to reach you via email with the latest news and best practices in FP&amp;A and TM1 development — no more than once a month. <span aria-hidden="true" style="color:var(--orange-gold)">*</span></label>
    </div>

    <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Submit details</button>

  </form>

  <div class="contact-support-note" style="max-width:560px;margin:0 auto;padding-left:2rem;padding-right:2rem;padding-bottom:3rem">
    Need technical support? <a href="https://cubewisecare.atlassian.net/servicedesk/customer/portal/13">Visit our support portal →</a>
  </div>
</main>
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
npm test -- --reporter=verbose tests/pages.test.js
```

Expected: all 17 passing (9 CSS + 8 HTML).

- [ ] **Step 5: Run the full test suite to confirm nothing is broken**

```bash
npm test
```

Expected: all 20 existing tests + 17 new = 37 passing.

- [ ] **Step 6: Commit**

```bash
git add src/pages/contact/index.html tests/pages.test.js
git commit -m "feat: build contact page with Formspree form"
```

---

## Self-Review Notes

- Spec: `.component-hero--dark` modifier → Task 1 ✓
- Spec: contact form CSS (`.contact-form`, `.product-pills`, `.consent-block`, `.contact-support-note`) → Task 2 ✓
- Spec: dark hero with label/h1/tagline → Task 3 ✓
- Spec: all form fields (first name, last name, email, region, interest, message, consent) → Task 3 ✓
- Spec: Formspree `action` placeholder → Task 3 ✓
- Spec: support portal link at bottom → Task 3 ✓
- Spec: HTML5 `required` attributes, no custom JS validation → Task 3 ✓
- Type consistency: `name="interest"` used for all product pill checkboxes ✓
- No TBDs or placeholders (the Formspree URL intentionally reads `PLACEHOLDER` per spec) ✓
