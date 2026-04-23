---
name: Style guide
description: Mechanics and rules — capitalisation, headlines, CTAs, punctuation, never-use words
type: brand
---

# Style guide

Layer 1 — Brand. The mechanical rules that keep every page on-voice.

Voice & character live in `brand-guidelines.md`. The *feeling* we create lives in `brand/brand-promise.md`. This file is the rulebook.

---

## Product & component names

Capitalisation is non-negotiable. Inconsistent product naming is the fastest way to look unprofessional.

| Correct | Wrong |
|---------|-------|
| Arc | arc, ARC |
| Arc+ | Arc Plus, ArcPlus, Arc + |
| Pulse | pulse, PULSE |
| Slice | slice |
| Atmosphere | atmosphere, ATMOSPHERE |
| PowerConnect | Powerconnect, Power Connect, powerconnect |
| IBM Planning Analytics | IBM PA (only after first full mention) |
| TM1 | tm1 |
| Cubewise Platform | cubewise platform, the Cubewise platform |
| Cubewise Cloud | cubewise cloud |

**First-mention rule.** On every page, first reference is `IBM Planning Analytics / TM1`. After that, `IBM Planning Analytics`, `IBM PA`, or `TM1` are all acceptable.

**The word "tools".** Do not use "tools" when referring to Cubewise products (Arc, Arc+, Pulse, Slice, Atmosphere, PowerConnect). Say **software** or **components** instead. Enforced in `CLAUDE.md`.

---

## Headlines

**Sentence case. Max 8 words. Answer "so what?" in the line itself.**

| Good | Bad |
|------|-----|
| "Work with TM1 data your way." | "Empowering Your TM1 Data Experience" |
| "Build better TM1 code, faster." | "Next-Generation TM1 Development Platform" |
| "Know about the lock before your users do." | "Proactive Monitoring Capabilities" |
| "Migrate live. No downtime." | "Enterprise-Grade Migration Solutions" |

**Punctuation:**
- Full stops at the end of headline sentences — we're assertive, not hesitant.
- Em dashes (—) are fine and native to the voice. Use them for emphasis.
- No ALL CAPS except in the logo.
- No exclamation marks. Ever. We are confident, not excited.

---

## Body copy

- **Short sentences.** Twelve words is long. If it's over twenty, cut it.
- **Active voice.** "Arc debugs TI code" — not "TI code can be debugged using Arc."
- **Lead with outcome.** What it means for the reader. Features support, not replace, the story.
- **Concrete over abstract.** "Step through TI code line by line" beats "advanced debugging capabilities."
- **Specific numbers are powerful.** "34+ connectors." "70 TM1 instances." "90-day free trial." Use real figures.
- **Second person.** "You" and "your." Not "users" or "customers" in body copy.

---

## CTA copy standards

Two slots per page. Not more. Link to buyer stage, not persona.

| Stage | Use | Avoid |
|-------|-----|-------|
| Awareness | See how it works · Explore the Platform · Download Arc Free | Learn more · Get started · Find out more |
| Consideration | Watch a 2-min demo · Explore Pulse features · Read customer stories | Click here · More info · Sign up |
| Decision | Book a demo · Request a demo · Talk to us · Get in touch | Contact us (too vague) |

**Rules:**
- Primary CTA = action verb + specific outcome. "Download Arc Free," not "Download."
- Secondary CTA = lower commitment. "Read the Docs," "Watch demo," "Read customer stories."
- **Never** use: *Learn more · Click here · Get started · Submit · Find out more.*
- One primary CTA per page section. Do not split attention with two competing primary buttons.
- Download Arc: the phrase is always "**Download Arc Free**" (not "Try Arc" or "Start trial") — the 90-day free period with no credit card is a key hook.

---

## Punctuation & language mechanics

- **English spelling:** British. "Customisation," "behaviour," "organise," "analyse." Exception: product/feature names (e.g. Customer Stories). Follow source material where quoted.
- **Em dash (—) not hyphen (-) for emphasis.** Proper em dash, no surrounding spaces in some cases but the site uses surrounding spaces for legibility (e.g. " — "). Stay consistent within a page.
- **Oxford comma:** no (British convention) — unless removing it creates ambiguity.
- **Ampersand (&):** only in navigation labels ("Develop & Operate"), section headings where space is tight, and formal phrases ("IBM PA & Power BI"). In body copy, use "and."
- **Numbers:** spell out one to nine, numerals for 10+. Exception: statistics, versions, and specific counts ("90-day trial," "34+ connectors," "70 TM1 instances").
- **Lists:** bullet lists with sentence fragments (no trailing full stop) or complete sentences (with full stop) — pick one per page and stay consistent.
- **Contractions:** use them ("don't," "we'll," "you're"). They make us sound human. Avoid in legal/security copy.

---

## Never use

Words and phrases that immediately break the voice:

| Never use | Why |
|-----------|-----|
| *Tools* (for Cubewise products) | Use *software* or *components* |
| *Empower / empowering* | Empty word. What does it mean? |
| *Seamlessly* | Tells the reader nothing specific |
| *Leverage* | Management-speak. Use *use.* |
| *Solution* (generic) | Say what the thing actually is |
| *Unleash / unlock* (hype) | We are confident, not breathless |
| *Revolutionary / game-changing* | Customers can say this. We don't. |
| *Best-in-class / world-class* | Prove it with specifics instead |
| *Robust* | Means nothing. Say what it actually does |
| *Utilise* | Use *use.* |
| *Synergy / synergise* | No |
| *Mission-critical* | Overused and vague |
| *Cutting-edge / bleeding-edge* | TM1 is 40 years old. Stop trying. |
| *Transform your journey* | No |

**Exceptions to the "never" list:** if a real customer quote uses one of these words, keep it. Their voice ≠ ours.

---

## Social proof requirements

Every page with a primary CTA should have social proof adjacent to it. Rules:

- **Named customer.** First name + last name + role + company. Or company name + industry for corporate quotes. Never anonymous.
- **Specific outcome.** A quote saying "great product" is worthless. One mentioning a number ("reduced user locks," "70 instances," "week not months") is gold.
- **Match stage to page stage.** A Decision-stage CTA needs a Decision-stage quote (risk removed, outcome delivered). See `content/social-proof.md` for tagging.
- **One, not three.** Next to an inline CTA, one quote beats a grid. Save grids for the testimonials section.

---

## Links & URLs

- **Relative paths only.** `/arc/` not `https://www.cubewise.com/arc/`. A domain change is then one config update, not a site-wide rewrite.
- **Trailing slash** on directory URLs (`/arc/`, not `/arc`). Consistent across the site.
- **Nav labels = page H1.** If the nav says "Platform," the page's H1 says "The Cubewise Platform" (close enough). Mismatch breaks information scent.
- **Outbound links** (partners, support, forum, resource hub) open in a new tab with `target="_blank" rel="noopener noreferrer"`.

---

## Iconography

Inline SVG only. Never emojis, never icon fonts.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.75"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

Sizes: 24×24 for list/card contexts. 32×32 for hero/role-card contexts. Colour via parent container (typically `color: var(--sand-gold)` or `var(--orange-gold)`).

---

## Colour application rules

Derived from `brand-guidelines.md`. Orange Gold is the brand. Use it sparingly — it loses meaning if everything is orange.

- **Primary brand colour:** Orange Gold `#F78E20` — CTAs, highlights, brand accents.
- **Secondary:** Sand Gold `#FADEC1` for soft accents; Charcoal `#434B53` for text-on-white bridges.
- **Backgrounds:** Pearl White `#FFFFFB` (primary), Light Gray `#F1F2F2` (cards), Dark Night `#202E3A` (dark sections).
- **Never** put Charcoal on Dark Night — the contrast fails.
- **Never** recolour the Cubewise logo.

---

## Accessibility floor

- All text ≥ 4.5:1 contrast against its background.
- All icons have meaningful alt text or `aria-label` when carrying meaning; decorative icons get `alt=""`.
- All CTAs keyboard-focusable with a visible focus ring.
- No text inside `<img>` tags — use real HTML text. (Relevant for testimonial cards.)

---

## Localisation

The site supports EN / FR / DE / ZH-HANS. Every piece of copy must have a `data-i18n` key that matches an entry in `src/i18n/{locale}.json`. When drafting copy:

1. Name the key following existing pattern: `{page}.{slot}` (e.g. `home.hero-heading`, `arc.feature-build-bullet-1`).
2. Populate `en.json` first. Translations follow.
3. Never hardcode a string that might need translation.
