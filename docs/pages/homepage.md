---
name: Homepage page spec
description: Slot-based spec for /index.html — audience, priority features, locked/fluid content per slot
type: page
---

# homepage.md

Layer 4 — Page Definitions. The slot-level spec for `/` (`src/pages/index.html`). Claude honours locked slots verbatim and drafts fluid slots within Layers 1–3.

---

## Purpose

Convert first-time visitors (Awareness stage) into a deeper session on a product page or `/platform/`. The homepage is not the place to close a deal; it's the place to earn a second click.

---

## Audience

**All three personas arrive here.** The homepage must speak to each without diluting for any. Route quickly:

- Developer → `/arc/` via product card + "Developers" role card.
- Administrator → `/pulse/` via product card + "Administrators" role card.
- Power User / Finance → `/slice/`, `/atmosphere/`, `/powerconnect/` via product cards + "Power Users & Finance Teams" role card.

Brand persona (FP&A Manager / Finance Lead) is the implicit owner of the hero and tagline tone — see `brand/brand-promise.md`.

---

## Primary pillar

**Pillar 1 — Built for TM1, by TM1 people** (see `strategy/messaging-pillars.md`).

Supporting: **Pillar 2 — One platform, built to work together.**

---

## Priority products (order in the products grid)

1. **Arc** — the IDE; drives the most developer traffic and is the entry point for 90-day free trials.
2. **Arc+** — the DevOps story; enables cross-sell of Pulse.
3. **Pulse** — the Administrator lead; anchors the pillar-3 message.
4. **Slice** — the Finance/Excel story; broadest appeal.
5. **Atmosphere** — the newest component; needs surface area.
6. **PowerConnect** — the Power BI bridge; rounds out the Finance story.

---

## Page CTAs — stage match

- **Primary** (all sections): *"Explore the Platform"* → `/platform/`.
- **Secondary** (hero): *"Downloads"* → `/downloads/`.
- **Bottom CTA primary:** *"Get in touch"* → `/contact/`.
- **Bottom CTA secondary:** *"Explore the Platform"* → `/platform/`.

CTA rules live in `brand/style-guide.md`. Homepage sits in Awareness — no "Request a demo" in the hero.

---

## Content slots

### Hero (locked)

```
Label:    "Everything your TM1 team needs. In one platform."
H1:       "The Cubewise Platform"
Body:     "Six specialised software for IBM Planning Analytics — built by TM1 experts, trusted by finance and technology teams worldwide."
CTA_1:    "Explore the Platform" → /platform/
CTA_2:    "Downloads" → /downloads/
```

**Notes.**
- Do NOT change "software" to "tools" — see `CLAUDE.md`.
- "Six" is a hard number. If the product count changes, update here AND `platform/index.html` AND every product-card section.
- H1 and nav label ("Platform") match by design — information scent.

---

### Products grid — six cards (locked structure, fluid taglines)

Each card: product logo · tagline · three bullets · CTA `"Learn about [Product] →"`.

**Card order and taglines (locked — matches live site):**

| Product | Tagline | Top three bullets |
|---------|---------|-------------------|
| Arc | The professional IDE for IBM Planning Analytics development | Full-featured TI process editor with debugging · Autocomplete, snippets & code templates · Manage users, security & server settings |
| Arc+ | DevOps for IBM Planning Analytics | Impact analysis & best practice rules · Automated unit testing for TI processes · Deployment packages & migration logs |
| Pulse | Monitor, understand and manage your TM1 environment | Real-time monitoring & alerting · Chore & user activity audit trails · Live migration without downtime |
| Slice | The modern Excel add-in for IBM Planning Analytics | Cross-drill, dynamic columns & DBRW support · Sandbox & writeback directly from Excel · Seamless upgrade from Perspectives |
| Atmosphere | Self-service data integration for Finance teams | Connect ERP, CRM & cloud data sources · No-code integration workflows · 34+ pre-built connectors |
| PowerConnect | IBM Planning Analytics data in Microsoft Power BI | Live connection to TM1 cubes in Power BI · Works with Power BI Desktop & Service · Browse dimensions & cubes visually |

Bullets can be updated per module file (`modules/{product}.md`) but stay benefit-led and max three.

---

### Roles section — three cards (locked structure)

Pattern: icon · role heading · body paragraph · product links.

| Role | H3 | Products linked |
|------|----|-----------------|
| Developers | "Developers" | Arc · Arc+ |
| Administrators | "Administrators" | Pulse · Arc+ |
| Power Users & Finance Teams | "Power Users & Finance Teams" | Slice · Atmosphere · PowerConnect |

**Heading:** *"Built for every role on your TM1 team"*
**Sub-heading:** *"Whether you build, administer, or consume IBM Planning Analytics, the Cubewise Platform has a product for you."*

Body copy per role draws from `strategy/personas.md` top hooks.

---

### Testimonials — three slots (fluid — pull from social-proof.md)

Section heading: *"Trusted by TM1 teams around the world"*

Three testimonials, each: quote · name · role/company · product link.

**Current live selection:**
1. Garry Cook, Informa — Arc (game-changer quote).
2. Pattonair, Aerospace & Defence — Pulse (user locks quote).
3. Anne-Marie Rodd, GHD — Slice (cross-drill / increased engagement quote).

**Rotation rule.** Always cover at least one Developer-facing quote (Arc/Arc+), one Administrator-facing quote (Pulse), one Power-User-facing quote (Slice/Atmosphere/PowerConnect). That tri-persona balance is what qualifies this section for the homepage.

Pull selection from `content/social-proof.md` where `use on: homepage` is set.

---

### Bottom CTA (locked structure, fluid heading)

```
H2:    "Ready to transform how your team works with IBM Planning Analytics?"
Body:  "Talk to a Cubewise specialist to find the right products for your team."
CTA_1: "Get in touch" → /contact/
CTA_2: "Explore the Platform" → /platform/
```

The word *"transform"* here is acceptable in a closing question — it's not hype-first body copy. If you rewrite this heading, keep the structure (aspiration question + softer supporting line) and avoid promising specific outcomes.

---

### Announcement bar (dynamic)

Pulled from `config.js` / announcement data. Keep the message short enough that the language switcher and secondary nav links remain visible at 1280px+.

---

### Navigation (fully locked)

Navigation structure is locked in `strategy/sitemap.md`. Not fluid.

---

## Images required

| Slot | Image | Notes |
|------|-------|-------|
| Products grid — Arc card | `/assets/logos/Products/Arc/Logo-arc.svg` | SVG, inherits brand colour |
| Products grid — Arc+ card | `/assets/logos/Products/Arc+/Arc+-01.svg` | |
| Products grid — Pulse card | `/assets/logos/Products/Pulse/Pulse.svg` | |
| Products grid — Slice card | `/assets/logos/Products/Slice/Slice.svg` | |
| Products grid — Atmosphere card | `/assets/logos/Products/Atmosphere/Atmosphere.svg` | |
| Products grid — PowerConnect card | `/assets/logos/Products/PowerConnect/logo-powerconnect.svg` | |
| Footer | `/assets/logos/Cubewise_Code_RGB.svg` | |

No hero image currently — text + CTAs only. If one is added, place spec under `pages/images/homepage-hero.[ext]` and reference here.

---

## Testing checklist (before publish)

Runs through `testing.md`.

- [ ] Hero H1 and nav label consistent.
- [ ] "Six" products — cards, nav, platform page all agree.
- [ ] No use of "tools" (must be "software" or "components").
- [ ] Three testimonials span three personas.
- [ ] Primary CTA present above the fold and in the bottom section.
- [ ] Language switcher present in announcement bar.
- [ ] All six product cards link to live product pages.
- [ ] Bottom CTA heading does not duplicate hero wording.
- [ ] 5-second clarity test: can a first-time visitor answer "what does Cubewise sell?" from the hero alone?
- [ ] LLM check: asking Claude "what is Cubewise?" surfaces the homepage's claims accurately.
