# Nav Mega Menu — Floating Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-viewport-width mega menu with a modern floating card anchored below the "Platform" nav link.

**Architecture:** Pure CSS change to the mega menu block in `main.css`. The existing JS (`nav.js`) toggles the `is-open` class and is unchanged. The HTML structure in `base.html` is unchanged. The `display: none` / `display: block` toggle is replaced with an opacity/transform animation driven by the same class.

**Tech Stack:** CSS custom properties (already defined in `main.css`), no build step required — edit and refresh browser.

---

### Task 1: Make `.nav-item-dropdown` a positioning context

**Files:**
- Modify: `src/assets/css/main.css:94`

- [ ] **Step 1: Edit the rule**

In [main.css](src/assets/css/main.css), change line 94 from:

```css
.nav-item-dropdown { position: static; }
```

to:

```css
.nav-item-dropdown { position: relative; }
```

- [ ] **Step 2: Verify visually**

Open any page (e.g. `src/pages/index.html`) in a browser. Hover "Platform". The menu should still appear (may still be full-width at this point — that's expected, just confirm it hasn't broken anything).

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/main.css
git commit -m "style: set nav-item-dropdown to position relative"
```

---

### Task 2: Redesign `.nav-mega-menu` as a floating card

**Files:**
- Modify: `src/assets/css/main.css:102-114`

- [ ] **Step 1: Replace the `.nav-mega-menu` and `.nav-item-dropdown.is-open` rules**

Find and replace these two rules (lines 102–114):

```css
.nav-mega-menu {
  display: none;
  position: fixed;
  top: 61px;
  left: 0;
  right: 0;
  background: var(--light-gray);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  z-index: 99;
}

.nav-item-dropdown.is-open .nav-mega-menu { display: block; }
```

With:

```css
.nav-mega-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 700px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
  z-index: 99;
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.nav-item-dropdown.is-open .nav-mega-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

- [ ] **Step 2: Verify visually**

Hover "Platform". You should see a white card ~700px wide dropping from below the nav link with a soft shadow and rounded corners. The full-bleed grey bar should be gone. The card should animate in smoothly.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/main.css
git commit -m "style: redesign mega menu as floating card with fade animation"
```

---

### Task 3: Update `.mega-menu-inner` layout

**Files:**
- Modify: `src/assets/css/main.css:116-123`

- [ ] **Step 1: Replace the `.mega-menu-inner` rule**

Find and replace (lines 116–123):

```css
.mega-menu-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}
```

With:

```css
.mega-menu-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  padding: 1.75rem 2rem;
}
```

- [ ] **Step 2: Verify visually**

Hover "Platform". The two columns should sit comfortably inside the card with balanced spacing — not too cramped, not over-spaced.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/main.css
git commit -m "style: tighten mega-menu-inner spacing for card layout"
```

---

### Task 4: Update `.mega-link` hover to tinted card style

**Files:**
- Modify: `src/assets/css/main.css:134-161`

- [ ] **Step 1: Replace the `.mega-link` block**

Find and replace lines 134–161 (all mega-link rules):

```css
.mega-link {
  display: block;
  text-decoration: none;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border);
  color: inherit;
  transition: color 0.15s;
}

.mega-link:last-child { border-bottom: none; }

.mega-link strong {
  display: block;
  color: var(--dark-night);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  transition: color 0.15s;
}

.mega-link span {
  display: block;
  color: var(--charcoal);
  font-size: 0.85rem;
  line-height: 1.4;
}

.mega-link:hover strong { color: var(--orange-gold); }
```

With:

```css
.mega-link {
  display: block;
  text-decoration: none;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
  color: inherit;
  transition: background 0.12s ease;
}

.mega-link strong {
  display: block;
  color: var(--dark-night);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  transition: color 0.12s ease;
}

.mega-link span {
  display: block;
  color: var(--charcoal);
  font-size: 0.85rem;
  line-height: 1.4;
}

.mega-link:hover { background: var(--light-gray); }
.mega-link:hover strong { color: var(--orange-gold); }
```

- [ ] **Step 2: Verify visually**

Hover individual links inside the card. Each link should highlight with a light grey background tint and the title should turn orange-gold. No divider lines between links.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/main.css
git commit -m "style: update mega-link hover to tinted card style"
```
