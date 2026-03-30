# Pulse Overview Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate the Pulse overview page shell with hero copy, four alternating feature rows with GIFs, and a customer testimonials section.

**Architecture:** Two files change — `main.css` gets three new rule groups for layout, `pulse/index.html` gets its `<main>` content filled in. No JavaScript, no build step required. Images are already in `src/assets/images/pulse/`.

**Tech Stack:** Plain HTML, CSS custom properties, static site (11ty). Preview via `node scripts/preview.js` if available, or open the built file directly.

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/assets/css/main.css` — append feature-row and testimonial styles |
| Modify | `src/pages/pulse/index.html` — fill hero tagline + component-detail content |

---

### Task 1: Add feature-row CSS

**Files:**
- Modify: `src/assets/css/main.css` (append after the last rule, currently ends at `.footer-copy`)

- [ ] **Step 1: Open `src/assets/css/main.css` and append the following block at the end of the file**

```css
/* ============================================================
   Feature rows (product overview pages)
   ============================================================ */
.feature-row {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
}

.feature-row:nth-child(even) {
  flex-direction: row-reverse;
}

.feature-row-media {
  flex: 1;
}

.feature-row-media img {
  width: 100%;
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  display: block;
}

.feature-row-text {
  flex: 1;
}

.feature-row-text h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--dark-night);
}

.feature-row-text ul {
  list-style: none;
  padding: 0;
}

.feature-row-text ul li {
  padding: 0.35rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: var(--charcoal);
  line-height: 1.5;
}

.feature-row-text ul li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--orange-gold);
}

@media (max-width: 700px) {
  .feature-row,
  .feature-row:nth-child(even) {
    flex-direction: column;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/css/main.css
git commit -m "feat: add feature-row CSS for product overview pages"
```

---

### Task 2: Add testimonial CSS

**Files:**
- Modify: `src/assets/css/main.css` (append after the feature-row block added in Task 1)

- [ ] **Step 1: Append the following block at the end of `src/assets/css/main.css`**

```css
/* ============================================================
   Testimonials
   ============================================================ */
.testimonial-section {
  padding: 3rem 0 1rem;
}

.testimonial-section h2 {
  font-size: 1.25rem;
  color: var(--charcoal);
  margin-bottom: 2rem;
  font-weight: 600;
}

.testimonial-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.testimonial-card {
  flex: 1;
  min-width: 220px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.testimonial-card img {
  max-height: 32px;
  width: auto;
  margin-bottom: 1rem;
  display: block;
}

.testimonial-card blockquote {
  font-style: italic;
  font-size: 0.95rem;
  color: var(--charcoal);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.testimonial-card cite {
  font-size: 0.85rem;
  font-style: normal;
  color: var(--dark-night);
  font-weight: 600;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/css/main.css
git commit -m "feat: add testimonial CSS"
```

---

### Task 3: Fill in pulse/index.html hero

**Files:**
- Modify: `src/pages/pulse/index.html`

- [ ] **Step 1: Replace the hero section in `src/pages/pulse/index.html`**

Find this block (lines 81–87):
```html
  <section class="component-hero">
    <div class="component-label">Cubewise Platform</div>
    <h1>Pulse</h1>
    <p><!-- tagline --></p>
    <a href="/docs/" class="btn btn-primary">Read the Docs</a>
    <a href="/contact/" class="btn btn-secondary">Get in Touch</a>
  </section>
```

Replace with:
```html
  <section class="component-hero">
    <div class="component-label">Pulse</div>
    <h1>The application lifecycle management software for IBM Planning Analytics</h1>
    <p>Monitor what is happening. Migrate faster with confidence. Understand what happened.</p>
    <a href="/docs/" class="btn btn-primary">Read the Docs</a>
    <a href="/contact/" class="btn btn-secondary">Get in Touch</a>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/pulse/index.html
git commit -m "feat: add Pulse hero copy"
```

---

### Task 4: Add feature rows to pulse/index.html

**Files:**
- Modify: `src/pages/pulse/index.html`

- [ ] **Step 1: Replace the empty `component-detail` section**

Find this block:
```html
  <section class="component-detail">
    <!-- Features / detail content -->
  </section>
```

Replace with:
```html
  <section class="component-detail">

    <div class="feature-row">
      <div class="feature-row-media">
        <img src="/assets/images/pulse/pulse-7-new-ui.gif" alt="Pulse monitoring dashboard showing TM1 server status">
      </div>
      <div class="feature-row-text">
        <h2>Monitor all your TM1 servers</h2>
        <ul>
          <li>24/7 monitoring</li>
          <li>Real-time notification of model changes</li>
          <li>Keep your history and favourites</li>
          <li>Reduce support calls</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-row-media">
        <img src="/assets/images/pulse/pulse-troubleshoot-errors.gif" alt="Pulse error troubleshooting interface">
      </div>
      <div class="feature-row-text">
        <h2>Understand your applications</h2>
        <ul>
          <li>Impact analysis</li>
          <li>Interactive model navigation</li>
          <li>Troubleshoot errors faster</li>
          <li>TM1 user analysis</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-row-media">
        <img src="/assets/images/pulse/pulse-rollback.gif" alt="Pulse migration and rollback interface">
      </div>
      <div class="feature-row-text">
        <h2>Migrate faster with confidence</h2>
        <ul>
          <li>Migrate changes to production live</li>
          <li>Rollback changes quickly</li>
          <li>Improve your testing procedures</li>
          <li>Separation of duties between TM1 team and IT</li>
        </ul>
      </div>
    </div>

    <div class="feature-row">
      <div class="feature-row-media">
        <img src="/assets/images/pulse/pulse-7-license-report.gif" alt="Pulse license report and analytics">
      </div>
      <div class="feature-row-text">
        <h2>Continuously improve TM1</h2>
        <ul>
          <li>Improve performance and up-time</li>
          <li>Make your users more productive</li>
          <li>Speed-up TM1 development</li>
          <li>Identify users who require training</li>
        </ul>
      </div>
    </div>

    <div class="testimonial-section">
      <h2>Trusted by IBM Planning Analytics teams worldwide</h2>
      <div class="testimonial-row">
        <div class="testimonial-card">
          <img src="/assets/images/pulse/pattonair-logo.png" alt="Pattonair">
          <blockquote>"Pulse has helped us to significantly reduce user locks and allowed us to be notified via email if any user is locked in TM1 for more than 5 min."</blockquote>
          <cite>Pattonair</cite>
        </div>
        <div class="testimonial-card">
          <img src="/assets/images/pulse/scc-logo.png" alt="SCC">
          <blockquote>"Pulse gives us as developers the option to migrate packages live without the need to bring down services."</blockquote>
          <cite>SCC</cite>
        </div>
        <div class="testimonial-card">
          <img src="/assets/images/pulse/image-asset-7.png" alt="Aveva">
          <blockquote>"Pulse has given us great confidence knowing that everything necessary will have been migrated."</blockquote>
          <cite>Aveva</cite>
        </div>
      </div>
    </div>

  </section>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/pulse/index.html
git commit -m "feat: add Pulse feature rows and testimonials"
```

---

## Self-Review Notes

- Spec requires hero label "Pulse" → Task 3 ✓
- Spec requires H1 as the product headline → Task 3 ✓
- Spec requires 4 alternating feature rows with correct GIF/text pairings → Task 4 ✓
- Spec requires 3 testimonial cards (Pattonair, SCC, Aveva) with exact quotes → Task 4 ✓
- Spec requires `.feature-row:nth-child(even)` reversal for alternating layout → Task 1 ✓
- Note: `.feature-row:nth-child(even)` counts position among all siblings inside `.component-detail`. With 4 `.feature-row` divs followed by `.testimonial-section`, rows 1–4 are children 1–4, so even (rows 2 and 4) correctly reverse. ✓
- No blog section — confirmed out of scope ✓
