# Platform Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `src/pages/platform/index.html` to explain how the Cubewise platform components work together using a hub-and-spoke layout with Arc as the central hub.

**Architecture:** Arc gets a visually distinct hub card at the top of the component section. A short prose intro above explains the relationships. Five spoke components (Arc+, Pulse, Slice, Atmosphere, PowerConnect) appear in a 2-column grid below, each with a description of how they connect. No JS changes required.

**Tech Stack:** Static HTML, CSS custom properties (existing `main.css`). Preview via `npm run preview`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/pages/platform/index.html` | Modify | Replace body `<main>` content with new hub-and-spoke layout |
| `src/assets/css/main.css` | Modify | Add new platform-specific CSS classes |

---

### Task 1: Add CSS for the ecosystem intro section

**Files:**
- Modify: `src/assets/css/main.css` (append after the existing `.component-card p` rule near the end of the "Component grid" block, around line 395)

- [ ] **Step 1: Open `src/assets/css/main.css` and find the end of the component grid block**

Look for this line (around line 395):
```css
.component-card p { font-size: 0.9rem; color: var(--charcoal); }
```

- [ ] **Step 2: Append the platform ecosystem CSS block immediately after that line**

```css

/* ============================================================
   Platform ecosystem
   ============================================================ */

.platform-ecosystem {
  background: var(--bg-alt);
  padding: 3rem 2rem;
  text-align: center;
}

.platform-ecosystem-inner {
  max-width: 680px;
  margin: 0 auto;
}

.platform-ecosystem h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.platform-ecosystem p {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

/* Hub card (Arc) */
.platform-hub {
  padding: 2.5rem 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.platform-hub-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--charcoal);
  margin-bottom: 0.75rem;
}

.platform-hub-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 2px solid var(--orange-gold);
  border-radius: var(--radius);
  padding: 1.5rem 2rem;
  background: #fffaf4;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.platform-hub-card:hover {
  border-color: #c07010;
  box-shadow: 0 4px 16px rgba(247,142,32,0.15);
}

.platform-hub-card img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
}

.platform-hub-card-body h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.platform-hub-card-body p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.platform-hub-card-body .platform-hub-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--orange-gold);
  text-decoration: none;
}

.platform-hub-card-body .platform-hub-link:hover {
  text-decoration: underline;
}

/* Spoke grid */
.platform-spokes {
  padding: 1.5rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.platform-spokes-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--charcoal);
  margin-bottom: 0.75rem;
}

.platform-spoke-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 600px) {
  .platform-spoke-grid {
    grid-template-columns: 1fr;
  }

  .platform-hub-card {
    flex-direction: column;
    text-align: center;
  }
}

.platform-spoke-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  background: white;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.platform-spoke-card:hover {
  border-color: var(--orange-gold);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}

.platform-spoke-card img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.platform-spoke-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.platform-spoke-card p {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
}

.platform-spoke-card .spoke-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--charcoal);
  text-decoration: none;
  opacity: 0.7;
  margin-top: auto;
}

.platform-spoke-card .spoke-link:hover {
  opacity: 1;
  text-decoration: underline;
}
```

- [ ] **Step 3: Verify no syntax errors by checking the file saves cleanly** (no action needed — just confirm the file looks right in your editor)

- [ ] **Step 4: Commit**

```bash
git add src/assets/css/main.css
git commit -m "feat: add platform ecosystem CSS classes"
```

---

### Task 2: Rebuild the platform page HTML

**Files:**
- Modify: `src/pages/platform/index.html`

The current `<main>` block contains:
```html
<main>
  <section class="platform-hero">...</section>
  <section class="platform-components">
    <h2>Components</h2>
    <div class="component-grid">...</div>
  </section>
</main>
```

Replace the entire `<main>` block with the new structure below.

- [ ] **Step 1: Replace the `<main>` block in `src/pages/platform/index.html`**

Replace from `<main>` to `</main>` with:

```html
<main>

  <!-- Hero -->
  <section class="platform-hero">
    <h1>The Cubewise Platform</h1>
    <p>A complete suite of components for IBM Planning Analytics / TM1 — built together, deployed your way.</p>
  </section>

  <!-- Ecosystem intro -->
  <section class="platform-ecosystem">
    <div class="platform-ecosystem-inner">
      <h2>Built to work together</h2>
      <p>Arc is the central hub for IBM Planning Analytics. Every other component in the platform either extends Arc's capabilities, integrates with it to surface data and insights, or connects your existing systems to it. Together they cover the full lifecycle — from building and managing TM1 applications to reporting, monitoring, and data integration.</p>
    </div>
  </section>

  <!-- Arc hub card -->
  <div class="platform-hub">
    <p class="platform-hub-label">Central Hub</p>
    <a href="/arc/" class="platform-hub-card">
      <img src="/assets/logos/Products/Arc/Logo-arc.svg" alt="Arc">
      <div class="platform-hub-card-body">
        <h3>Arc</h3>
        <p>Faster to build and easier to manage IBM Planning Analytics applications. The TM1 development IDE that all other components connect to.</p>
        <span class="platform-hub-link">Learn more →</span>
      </div>
    </a>
  </div>

  <!-- Spoke components -->
  <div class="platform-spokes">
    <p class="platform-spokes-label">Platform Components</p>
    <div class="platform-spoke-grid">

      <a href="/arc-plus/" class="platform-spoke-card">
        <img src="/assets/logos/Products/Arc+/Arc+-01.svg" alt="Arc+">
        <h3>Arc+</h3>
        <p>Connect Arc to Pulse to unlock many new features. We call this Pulse-powered mode "Arc+".</p>
        <span class="spoke-link">Learn more →</span>
      </a>

      <a href="/pulse/" class="platform-spoke-card">
        <img src="/assets/logos/Products/Pulse/Pulse.svg" alt="Pulse">
        <h3>Pulse</h3>
        <p>Application lifecycle management for TM1. Monitor servers, migrate changes, and understand your applications — integrates directly with Arc.</p>
        <span class="spoke-link">Learn more →</span>
      </a>

      <a href="/slice/" class="platform-spoke-card">
        <img src="/assets/logos/Products/Slice/Slice.svg" alt="Slice">
        <h3>Slice</h3>
        <p>Excel add-in for TM1 reporting. Works alongside Arc for development workflows and connects with Pulse for monitoring and lifecycle management.</p>
        <span class="spoke-link">Learn more →</span>
      </a>

      <a href="/atmosphere/" class="platform-spoke-card">
        <img src="/assets/logos/Products/Atmosphere/logo-atmosphere.svg" alt="Atmosphere">
        <h3>Atmosphere</h3>
        <p>Secure data pipelines that bring cloud and ERP data into IBM Planning Analytics. Feeds Arc with always-current actuals and plans.</p>
        <span class="spoke-link">Learn more →</span>
      </a>

      <a href="/powerconnect/" class="platform-spoke-card">
        <img src="/assets/logos/Products/PowerConnect/logo-powerconnect.svg" alt="PowerConnect">
        <h3>PowerConnect</h3>
        <p>Connect TM1 to external systems and data sources, extending Arc's reach across your existing infrastructure.</p>
        <span class="spoke-link">Learn more →</span>
      </a>

    </div>
  </div>

</main>
```

- [ ] **Step 2: Verify the Atmosphere logo path exists**

Run:
```bash
ls src/assets/logos/Products/Atmosphere/
```

If `logo-atmosphere.svg` does not exist, check what SVG files are available and update the `<img src>` in the Atmosphere card to match the actual filename.

- [ ] **Step 3: Run a preview build and open in browser**

```bash
npm run preview
```

Open `http://localhost:3000/platform/` and verify:
- Hero renders correctly
- "Built to work together" prose section appears below hero
- Arc hub card shows with orange-gold border, logo, and description
- 5 spoke cards appear in a 2-column grid
- All "Learn more →" links point to the correct URLs
- Hover states work on hub card and spoke cards
- Page is readable on a narrow viewport (resize browser to ~375px width)

- [ ] **Step 4: Commit**

```bash
git add src/pages/platform/index.html
git commit -m "feat: rebuild platform page with hub-and-spoke layout"
```

---

## Self-Review

**Spec coverage:**
- ✅ Hero kept unchanged
- ✅ "Built to work together" prose section with approved text (user-edited version)
- ✅ Arc hub card with orange-gold border, logo, tagline, connection description, link
- ✅ 5 spoke cards: Arc+, Pulse, Slice, Atmosphere, PowerConnect — each with approved description
- ✅ "Learn more →" links on all cards
- ✅ 2-column responsive grid (collapses to 1-column at 600px)
- ✅ No Bedrock, no Arc Assistant

**Placeholder scan:** None found. All descriptions are final text, all paths are explicit, all class names are consistent across CSS (Task 1) and HTML (Task 2).

**Type consistency:** CSS class names used in Task 2 HTML (`.platform-hub`, `.platform-hub-card`, `.platform-hub-card-body`, `.platform-hub-label`, `.platform-hub-link`, `.platform-spokes`, `.platform-spokes-label`, `.platform-spoke-grid`, `.platform-spoke-card`, `.spoke-link`, `.platform-ecosystem`, `.platform-ecosystem-inner`) all match exactly what is defined in Task 1 CSS.

**One risk flagged:** The Atmosphere logo path (`/assets/logos/Products/Atmosphere/logo-atmosphere.svg`) needs to be verified — Task 2 Step 2 covers this.
