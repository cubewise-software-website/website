# Cubewise Content Architecture Framework

A single content system for Cubewise — so every page, product and persona speaks with one confident voice.

This repository holds the canonical source of truth for Cubewise's website and product copy. It is structured as a layered set of markdown files that Claude Code reads to generate consistent, on-brand content across every page, product and channel.

---

## Purpose

Build the Cubewise vibe and persona into our presence — a shared system that makes every site update faster, clearer and more on-brand.

- **One Cubewise voice.** A single character the buyer experiences across every page, product and channel.
- **Built for each persona.** Developers, analysts and executives each see the hook that speaks to them — on the same page.
- **Benefit-led content.** Pages lead with what the product means for the buyer — features support, not replace, the story.
- **Findable by AI buyers.** Structured, specific content so models describe Cubewise accurately when buyers ask.

---

## The Four-Layer Framework

Each layer answers a different question — and feeds into the next.

### Layer 1 — Brand

**Question:** Who are we? How do we sound?
**Loaded on every generation. Sets the character and rules. Never changes mid-project.**

Files:
- `brand/persona.md` (or `brand-guidelines.md`) — Voice & character
- `brand/brand-promise.md` — The feeling we create
- `brand/style-guide.md` — Mechanics & rules

**What each file contains:**

| File | Contents |
|------|----------|
| `persona.md` | Tone descriptors with good/bad examples · Assumed reader description · Personality on a spectrum (e.g. *Confident, not arrogant*) · What we stand against · Emotional target per page |
| `brand-promise.md` | One-sentence core promise (internal) · Visitor should feel: "Finally, someone built this properly." · NOT: impressed by features. INSTEAD: relieved. |
| `style-guide.md` | Product & feature name capitalisation · Headline rules (sentence case, max 8 words) · Explicit 'never use' word list · CTA copy standards · Punctuation & language mechanics · Social proof requirements |

**Examples:**
- AVOID: "Our solution empowers teams to seamlessly leverage…"
- GOOD: "Set up in 10 minutes. Done."
- GOOD: "Run ten scenarios in the time it used to take to run one."
- AVOID: "Powerful scenario modelling capabilities"

### Layer 2 — Strategy

**Question:** Who are we talking to? What do they need?
**Updated per campaign or audience shift.**

Files:
- `strategy/buyer-journey.md`
- `strategy/messaging-pillars.md`
- `strategy/personas.md`
- `strategy/sitemap.md`

**Two levels of persona:**

| Level | Example | Shapes |
|-------|---------|--------|
| **Brand persona** | FP&A Manager / Finance Lead — *JTBD: Deliver reliable planning cycles without IT dependency* | Homepage + brand voice |
| **Module persona** | TM1 Developer — *JTBD: Build models business users can use without breaking them* | Feature pages + technical copy |
| **Module persona** | Senior FP&A Analyst — *JTBD: Run scenarios fast without waiting for IT* → Top hook: Sandbox mode — 'Experiment without fear' | Power-user feature hooks |

### Layer 3 — Modules (NEW)

**Question:** What is each product / feature?
**Single source of truth — FAB matrix, positioning, language. Referenced by pages, not repeated.**

Files: `modules/pulse.md`, `modules/writeback.md`, `modules/planning.md`, etc.

**Features → Advantages → Benefits (FAB)**

| Column | Definition | Example |
|--------|------------|---------|
| **Feature** | What it does (technical — what the product can do) | Multi-dimensional writeback |
| **Advantage** | Why that's better (comparative — better than the alternative) | Changes propagate across all dimensions without breaking cube structure |
| **Benefit** | What it means for them (personal — the only one the buyer actually cares about) | "Run ten scenarios in the time it used to take to run one" |

**Full FAB example for Writeback module (FP&A Analyst persona):**

| Feature | Advantage | Benefit (copy-ready) |
|---------|-----------|----------------------|
| Sandbox writeback | Test without touching live data | "Experiment freely — the live model stays intact" |
| Multi-dim writeback | Changes propagate correctly across all dimensions | "Trust the numbers without rebuilding anything" |
| Approval workflow | Changes tracked and signed off | "Full audit trail — no more 'who changed that?'" |

**The common trap:** Teams default to features they're most proud of technically — not the ones that resonate most with buyers. A Developer sees "Multi-dimensional writeback architecture" (proud of the engineering). An FP&A Analyst asks "Can I run scenarios without fear?" (needs confidence, not complexity).

**The real value of FAB:** It's not the file — it's the conversation it forces. "What are the top 3 hooks for this persona?" usually reveals the team has never actually agreed. The file is the record of the decision — once you've had the argument.

**Persona prioritisation output:**
- FP&A Analyst top hook: Sandbox mode → 'Experiment without fear'
- Developer top hook: Writeback integrity → 'The model stays exactly as you built it'

### Layer 4 — Page Definitions

**Question:** What goes on this specific page?
**By exception — only create when you want precise control.**

Files: `pages/homepage.md`, `pages/features.md` + `pages/images/`

**How it works:**

1. **Sitemap first.** Define all pages + their purpose + audience stage in `sitemap.md` — this is locked.
2. **Page file = control.** Create `homepage.md` only when you want to specify slots. No file = Claude uses brand + strategy layers.
3. **Prescriptive or loose.** Each slot can have exact copy OR be left blank for Claude to draft within brand guidelines.
4. **Images included.** Reference `images/homepage-hero.jpg` in the slot — naming convention: `page-slot.ext`.

**Example — `homepage.md`:**

```markdown
# homepage.md

## Purpose
Convert first-time visitors (awareness stage)

## Priority features
1. Real-time sync  2. One-click setup  3. Permissions

## Content slots

### Hero
Headline: [leave blank — Claude drafts]
CTA_primary: "Start free trial"
Image: images/homepage-hero.jpg

### Feature_box_1
Feature: Real-time sync
Hook: [Claude drafts for FP&A persona]
```

---

## Content Assets: Quotes & CTAs

### `content/social-proof.md` — One file. Every quote. Tagged for use.

```yaml
Quote: "We went live in a week. I expected months."
Attribution: Head of FP&A, Manufacturing, 200 staff
Stage: Decision — removes implementation risk objection
Resolves: "This will take too long to set up"
Module: pulse
Use on: homepage, features
```

A CFO quote about ROI does a different job than an analyst quote about ease of use. **Stage + objection resolved is the useful tag** — not persona.

When a quote grows into a case study → add `case study: [link]` field. No restructuring needed.

### CTAs — live in `brand/style-guide.md`

No separate file needed yet — a short section in the style guide is enough.

| Stage | Use | Avoid |
|-------|-----|-------|
| Awareness | See how it works | Learn more |
| Consideration | Watch a 2-min demo | Find out more |
| Decision | Book a demo | Get started |

**Rules:**
- Two slots per page, not more.
- Primary CTA — action verb + specific outcome.
- Secondary CTA — lower commitment, e.g. Watch demo.
- Link to buyer stage, not persona.
- Never: Learn more / Click here / Get started.

Create a separate `cta-bank.md` only if CTAs are being tested across pages (A/B). Not yet.

---

## File Structure

```
src/
├── pages/
│   ├── index.html                  (homepage)
│   ├── about/
│   ├── arc/
│   │   ├── index.html
│   │   ├── features/
│   │   ├── community/
│   │   ├── customers/
│   │   ├── developers/
│   │   └── download/
│   ├── arc-plus/
│   │   ├── index.html
│   │   └── features/
│   ├── atmosphere/
│   │   ├── index.html
│   │   ├── features/
│   │   └── integrations/
│   ├── blog/
│   ├── contact/
│   ├── deployment/
│   │   ├── cubewise-cloud/
│   │   └── self-hosted/
│   ├── docs/
│   ├── downloads/
│   ├── open-source/
│   │   ├── bedrock/
│   │   ├── optimuspy/
│   │   ├── rushti/
│   │   └── tm1py/
│   ├── platform/
│   │   ├── index.html
│   │   ├── administrators/
│   │   ├── developers/
│   │   └── power-users/
│   ├── powerconnect/
│   │   ├── index.html
│   │   ├── features/
│   │   └── download/
│   ├── pulse/
│   │   ├── index.html
│   │   ├── features/
│   │   ├── download/
│   │   ├── migration/
│   │   ├── monitor/
│   │   ├── understand/
│   │   └── customers/
│   │       ├── aveva/
│   │       ├── norgine/
│   │       ├── pattonair/
│   │       ├── scc/
│   │       └── stockland/
│   └── slice/
│       ├── index.html
│       ├── features/
│       ├── customers/
│       └── download/
├── assets/
│   ├── css/
│   ├── fonts/
│   ├── js/
│   ├── logos/
│   │   └── Products/               (Arc, Arc+, Atmosphere, Bedrock, PowerConnect, Pulse, Slice, TM1py)
│   └── images/
│       ├── arc/
│       ├── arc-plus/
│       ├── atmosphere/
│       │   └── integrations/       (partner logos)
│       ├── cubewise-cloud/
│       ├── powerconnect/
│       ├── pulse/
│       │   └── customers/          (aveva, norgine, pattonair, scc, stockland)
│       └── slice/
├── templates/
│   ├── base.html
│   ├── page.html
│   ├── blog-index.html
│   ├── blog-post.html
│   └── docs.html
└── i18n/
    ├── en.json
    ├── de.json
    ├── fr.json
    └── zh-hans.json
```

---

## Workflow

Local markdown files → GitHub → Claude reads and generates.

1. **Edit locally.** Open any `.md` file in your editor. Change a word, a priority, a CTA. Save.
2. **Commit to GitHub.** Files are plain text — diffs are readable. Every change is tracked and reversible.
3. **Brief Claude.** "Build the homepage for the FP&A persona" — Claude reads all layers and generates.
4. **Review & lock.** If copy is right, paste exact text back into the page `.md` to lock it permanently.
5. **Run tests.** Ask Claude to run the `testing.md` checklist against the generated page before publishing.

---

## Sitemap & Navigation

The highest-stakes UI element on the site — present on every page, shapes how buyers think about you.

**Primary navigation structure:**

```
LOGO  |  Product  |  Use cases  |  Resources  |  [Free trial]  Sign in

├ /product
│  ├ /features
│  ├ /modules
│  └ /integrations
├ /use-cases
│  ├ /fp-and-a
│  └ /developers
├ /resources
│  ├ /blog
│  └ /case-studies
└ /about

* /lp/[campaign]   NOT in nav
```

### What you own vs what stays fluid

| Locked in `sitemap.md` | Fluid — Claude can update |
|------------------------|---------------------------|
| Page URLs / slugs | Copy within each page |
| Nav items and their order | Section order within a page |
| Nav CTA text and style | Internal links between pages |
| Page groupings & hierarchy | Meta titles and descriptions |
| | Blog and resources content |
| | Page-level CTAs and hooks |

**Navigation rules:**
- Max 2 nav levels — no nested dropdowns.
- Campaign landing pages NOT in nav.
- Order = priority. Left to right mirrors awareness → decision. Product first.
- One nav CTA. One primary button. Don't split attention with two competing actions.
- Label = H1. Nav label must match page H1. Mismatch breaks information scent — visitors bounce.

---

## Testing Framework

Three types of test — run at different stages, answering different questions. All live in `testing.md`.

| Test | When to run | What it checks |
|------|-------------|----------------|
| **Heuristic** | Pre-launch, any change | 5-second clarity test · Every headline answers 'so what?' · Social proof adjacent to every CTA · CTA commitment matches trust level · Friction: ≤2 clicks to conversion |
| **Journey / Persona** | When page is built or persona changes | Scent: ad language matches landing page · Steps from entry to conversion action · Next step for browsers who aren't ready · CTA progression down the page · SEO: search intent matches page intent |
| **LLM Visibility** | Quarterly audit | Ask Claude/GPT: 'What is [product]?' — accurate? · Ask: 'Best tools for [category]?' — included? · Description consistent across all sources? · `llms.txt` file exists and is current · Specific claims (extractable) on every page |

---

## The New Top of Funnel: LLM Discovery

Many buyers now find and evaluate products through AI before visiting any website.

| SEO model (familiar) | LLM model (emerging) |
|----------------------|----------------------|
| Buyer searches | Buyer asks Claude/GPT |
| Sees your link | Model recommends (or doesn't) |
| Clicks through | Buyer arrives pre-formed opinion |
| Reads your site | Converts — or already ruled you out |
| Converts (maybe) | |

**What this means:** A buyer asks "best tool for FP&A planning" — the model gives a shortlist. If you're not on it, or your description is vague, you've lost that buyer before they ever visited you. Specific, consistent, factual content is what gets extracted.

---

## URLs, Redirects & Link Integrity

Part of `testing.md`.

**Why this matters:** Every external link, backlink, and LLM citation pointing at an old URL is a dead end the moment you rebuild. A redirect list is cheap insurance — without one, SEO authority built over time evaporates.

### URL standards

- **Dynamic not static.** All internal links use relative paths or dynamic variables — never hardcoded absolute URLs. A domain change = one config update.
- **Slug convention.** Agree on a format before launch: `/use-cases/fp-and-a` not `/UseCases/FPandA`. Inconsistency compounds fast.
- **One canonical URL.** Each page lives at exactly one URL. No www vs non-www split, no trailing-slash variants. Set canonical tags from day one.
- **No deep nesting.** Max 3 levels deep: `/product/features/writeback` — not `/product/modules/planning/features/writeback/detail`.

### Redirect management

- **Redirect register.** Maintain `redirects.md`: old URL → new URL for every page that moves or is retired. Keep alongside `sitemap.md`.
- **301 not 302.** Permanent redirects (301) pass SEO authority. Use 302 only for genuinely temporary moves.
- **Rebuild checklist.** Before any rebuild: export all live URLs, diff against new structure, write redirects for every URL that changes or disappears.
- **No redirect chains.** A → B → C loses authority at each hop. When B moves to C, update A to point directly at C.

### Link integrity tests

- **Pre-launch crawl.** Crawl the full site before every major publish. Every internal link must resolve to a 200 response. Any 404 is a release blocker.
- **External link audit.** Check all outbound links — case studies, partner pages, doc links — resolve correctly.
- **LLM citation check.** After a rebuild, search for your old URLs in AI tools. Some models cache citations. Submit updated URLs to search consoles promptly.
- **Post-launch monitor.** Set up 404 monitoring in analytics or a crawl tool. A spike in 404s after a publish means a redirect was missed.

`redirects.md` — one file listing every old URL and its new destination. Maintain alongside `sitemap.md`. Required before every rebuild.

---

## Security Tests for AI-Generated Sites

Part of `testing.md`.

**Why this matters specifically for AI-generated code:** TruffleHunter (2025) found Claude autonomously scanning and probing company infrastructure during agentic tasks it was never asked to do. Forbes (April 2026) reported cybersecurity experts warning that Claude produces vulnerable code patterns — hardcoded credentials, insecure API calls, missing input sanitisation — that pass a visual review but fail a security scan.

### Code output checks

- **No hardcoded secrets.** Scan every generated file for API keys, tokens, passwords, connection strings. Use a tool like truffleHog or git-secrets before any commit.
- **Input sanitisation.** Any form field, URL parameter, or user input must be sanitised before use. AI-generated code frequently omits this.
- **Dependency audit.** Run `npm audit` or equivalent on every generated `package.json` before deploy. AI often suggests outdated packages with known CVEs.
- **No `eval()` or `innerHTML`.** Flag any use of `eval()`, `innerHTML`, or `document.write()` in generated JS. These are common injection vectors.

### Agentic behaviour limits

- **Scope your instructions.** Be explicit about what Claude is and isn't allowed to touch. Vague prompts like 'fix the site' can trigger unintended reads of unrelated files or systems.
- **No autonomous outbound calls.** Generated code should not make outbound API calls to undeclared endpoints. Review all `fetch()` and `axios` calls — verify every destination URL is intentional.
- **Least privilege for API keys.** Any API key used by generated code should have the minimum permissions needed. Read-only where possible. Never admin-scope keys in frontend code.
- **Review before run.** Never execute generated bash scripts or server code without reading it first. AI-generated automation scripts can include destructive operations.

### Site security hygiene

- **Security headers.** Check generated pages include: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`. AI frequently omits these.
- **HTTPS everywhere.** All internal links, form actions, API calls use `https://`. Mixed content breaks trust signals and leaks data.
- **No sensitive data in URLs.** Form submissions, user IDs, session tokens must not appear in URL parameters — they end up in server logs, browser history, and referrer headers.
- **Cookie and consent flags.** Any cookies set by generated code must have `Secure` and `HttpOnly` flags. Consent banners must be functional — not just decorative.

> **Treat AI-generated code as unreviewed code — always.** A passing visual review is not a security review. Run a scanner. Every time. Before every deploy.

---

## What Good Looks Like

- **One voice, every page.** Cubewise sounds like Cubewise — across products, pages, and personas.
- **Findable by AI and humans alike.** Structured, specific content means models — and buyers — describe Cubewise accurately.
- **Precision where it matters.** Lock exact copy on pages that need it; stay flexible everywhere else.
- **Measurable and improvable.** Every page has a clear bar. We know when it works, and we can make it better.
- **The right message for each buyer.** Developers, analysts, and executives each see the hook that matters to them.
- **A system that compounds.** Every decision lives in GitHub. New team members inherit the thinking — nothing gets lost.

---

## How Claude Code Uses This Repository

When asked to draft or update site content, Claude Code should:

1. **Always load Layer 1 (`brand/`)** — voice, promise, and style rules apply to every generation.
2. **Load the relevant Layer 2 (`strategy/`) files** for the target persona, buyer stage, and page location.
3. **Load Layer 3 (`modules/`) FAB matrix** for any product/feature being referenced — quote benefits, not features.
4. **Check for a Layer 4 (`pages/`) file** — if it exists, honour its slots and locked copy. If not, draft within Layers 1–3.
5. **Pull social proof from `content/social-proof.md`** — match quote stage to page stage, place adjacent to CTA.
6. **Run `testing.md` checklist** against every generated page before declaring it ready.
7. **Respect `sitemap.md` and `redirects.md`** — never invent URLs or break existing link integrity.
8. **Apply security checks from `testing.md`** to any generated code — no hardcoded secrets, sanitise inputs, no `eval()`.
