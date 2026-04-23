---
name: Testing
description: Pre-publish checklist — heuristic, persona/journey, LLM visibility, link integrity, AI-generated-code security
type: operational
---

# Testing

Three question sets, plus link integrity and security checks. Run everything before publishing any generated page. Flag any failure as a release blocker — do not ship with known 404s, broken headings, or insecure code patterns.

---

## 1. Heuristic test — every change, pre-launch

Runs in under 5 minutes. Catches the most common content failures.

- [ ] **5-second test.** Show the page to someone unfamiliar for 5 seconds. Can they answer: *What does this company do? Who is it for?* If not, the hero fails.
- [ ] **Every headline answers "so what?"** Each `<h1>` / `<h2>` / `<h3>` states an outcome, not a feature. ("Step through your TI code line by line" — yes. "Advanced debugging capabilities" — no.)
- [ ] **Social proof adjacent to every primary CTA.** A named quote with a specific outcome sits within one viewport-height of each "Request a demo" / "Download" / "Contact" button.
- [ ] **CTA commitment matches trust level.** Awareness-stage pages offer low-commitment next steps (download, watch, explore). Decision-stage pages offer the high-commitment action (demo, contact). No "Request a demo" on a first-touch landing page.
- [ ] **Friction check.** From any page, a visitor can reach the conversion action (contact form, download, demo request) in ≤2 clicks.
- [ ] **Sentence case in headlines.** No Title Case headlines. No ALL CAPS except in the logo.
- [ ] **No banned words.** Scan for: *tools* (Cubewise products must use "software" / "components"), *empowering*, *leverage*, *seamlessly*, *best-in-class*, *revolutionary*. See `brand/style-guide.md` for the full list.
- [ ] **Product names correctly capitalised.** Arc, Arc+, Pulse, Slice, Atmosphere, PowerConnect, IBM Planning Analytics, TM1 — exactly. (Not "arc plus," "Power Connect," "tm1.")
- [ ] **First mention rule.** The page mentions *IBM Planning Analytics / TM1* in full on first reference.
- [ ] **One primary CTA per section.** No two competing primary buttons in the same viewport.
- [ ] **No placeholder text.** Search for `Lorem ipsum`, `TODO`, `{{`, `[draft]`, `<!-- -->` content in copy.
- [ ] **Images have alt text.** Every `<img>` has a meaningful `alt` (descriptive) or `alt=""` (decorative). No missing alts.
- [ ] **Icon rules.** Inline SVG only. 24×24 for list/card, 32×32 for hero/role-card. Colour via parent container, not hardcoded. No emojis, no icon fonts.

---

## 2. Journey / persona test — when a page is built or persona changes

Answers: *is this the right page for this visitor, at this stage?*

- [ ] **Information scent.** The ad/search term/LLM query that brings a visitor here matches the page H1 and hero paragraph. If the search was "TM1 debugger" and the page's H1 is "The Cubewise Platform" — scent is broken. Route them to `/arc/`.
- [ ] **One persona per page body.** The page may link to all three personas in the nav, but the body copy speaks to one. (See `strategy/personas.md`.) If in doubt: ask which persona is on the landing page of this journey? That's the owner.
- [ ] **Steps from entry to conversion action.** Count the clicks from hero to conversion action (download / demo / contact). Awareness pages should offer a next step; Decision pages should offer the action itself.
- [ ] **Next step for browsers who aren't ready.** Every page offers a lower-commitment alternative next to the primary CTA. ("Download Arc Free" next to "Read the Docs.") Never a dead end.
- [ ] **CTA progression down the page.** Hero CTA = low commitment. Middle CTA = demo / customer story. Bottom CTA = primary action. Not the same CTA repeated three times.
- [ ] **SEO search-intent match.** The page's meta title and description describe what the page actually delivers. A meta title of "The Best TM1 Platform" with a page about one component is a mismatch — and will be flagged by search and LLMs.
- [ ] **Pillar alignment.** Which of the four messaging pillars does this page lead with? If the answer is *"none,"* the page is wandering. Name the pillar explicitly (see `strategy/messaging-pillars.md`).

---

## 3. LLM visibility — quarterly audit

Increasing share of Cubewise buyers now discover and shortlist products through AI before visiting the site.

- [ ] **"What is [product]?"** Ask Claude, GPT-4/5, and Gemini: *What is Arc by Cubewise?* Answer should accurately name the category (IDE for IBM Planning Analytics / TM1), the top capabilities (debugger, editor, multi-instance management), and the positioning ("professional IDE"). Mismatch ⇒ update the product page to reinforce the missing claims.
- [ ] **"Best tool for [category]?"** Ask: *Best tools for TM1 monitoring / TM1 Excel reporting / IBM Planning Analytics DevOps.* Cubewise should appear on the shortlist. If not, check: is the positioning claim specific enough on the relevant product page? Is there structured content (H2/H3 headings, benefit language) for the model to extract?
- [ ] **Description consistency across sources.** The description Cubewise shows on its own site, on G2/Capterra/any review site, on LinkedIn, on the GitHub repo README — all consistent. Models triangulate from multiple sources.
- [ ] **`llms.txt` exists and is current.** A plain-text file at `/llms.txt` summarising what Cubewise is, what each component does, and the canonical URL for each. Update when products change.
- [ ] **Extractable claims.** Every page has at least one specific, quotable claim a model can cite: a number ("34+ connectors"), a named capability ("live migration without downtime"), or a named outcome ("reduced user locks"). Vague pages don't get cited.
- [ ] **Structured data where it fits.** Product pages have structured metadata (Organization, SoftwareApplication schema.org) that makes extraction easier.

---

## 4. URLs, redirects & link integrity

Every external link, backlink, and LLM citation pointing at an old URL is a dead end the moment you rebuild. A redirect list is cheap insurance.

### URL standards

- [ ] **Dynamic not static.** All internal links use relative paths or dynamic variables (`/arc/`, not `https://www.cubewise.com/arc/`). A domain change is then one config update.
- [ ] **Slug convention.** Kebab-case, lower-case, trailing slash for directories. `/arc-plus/` not `/ArcPlus/` or `/arc-plus`.
- [ ] **One canonical URL.** Each page lives at exactly one URL. No www vs non-www split. No trailing-slash vs non-trailing-slash variants. Canonical tags present.
- [ ] **Max 3 levels deep.** `/pulse/customers/norgine/` — yes. `/platform/products/operate/pulse/customers/norgine/detail/` — no.

### Redirects

- [ ] **Register maintained.** `redirects.md` lists old URL → new URL for every retired or moved page.
- [ ] **301 not 302.** Permanent redirects only, unless the move is genuinely temporary. 302 loses SEO authority.
- [ ] **No redirect chains.** A → B → C loses authority at each hop. When B moves to C, update A to point directly at C.
- [ ] **Rebuild checklist.** Before any major rebuild: export all live URLs, diff against new structure, write redirects for every URL that changes or disappears.

### Link integrity

- [ ] **Pre-launch crawl.** Crawl the full site before every major publish. Every internal link resolves to HTTP 200. Any 404 blocks the release.
- [ ] **External links resolve.** Case studies, partner pages, doc links, support portal — every outbound link works.
- [ ] **LLM citation check.** Post-rebuild, search for your old URLs in AI tools. If they're still cited, submit updated URLs to search consoles.
- [ ] **Post-launch 404 monitor.** Analytics or crawl-tool alert on 404 spikes. A spike after publish = missed redirect.

---

## 5. Security tests for AI-generated content

TruffleHunter (2025) and Forbes (April 2026) have documented AI models producing vulnerable code and probing beyond the scope of their instructions. **Treat AI-generated code as unreviewed code — always.** Visual review is not a security review.

### Code output checks

- [ ] **No hardcoded secrets.** Run truffleHog, git-secrets, or equivalent on every commit. Scan for API keys, tokens, passwords, connection strings.
- [ ] **Input sanitisation.** Every form field, URL parameter, or user input is sanitised before use. AI-generated code frequently omits this.
- [ ] **Dependency audit.** `npm audit` (or language equivalent) on every generated `package.json` before deploy. AI often suggests outdated packages with known CVEs.
- [ ] **No `eval()` / `innerHTML` / `document.write()`.** Flag any use in generated JS. Common injection vectors.

### Agentic behaviour limits

- [ ] **Scoped instructions.** Prompts explicitly state what Claude may and may not touch. Vague prompts like "fix the site" can trigger unintended reads.
- [ ] **No autonomous outbound calls.** Generated code doesn't call undeclared endpoints. Review every `fetch()` / `axios` destination URL — verify it's intentional.
- [ ] **Least privilege for keys.** Any API key in generated code has the minimum permissions needed. Read-only where possible. Never admin-scope keys in frontend code.
- [ ] **Review before execute.** Never run generated bash / server code without reading it first.

### Site security hygiene

- [ ] **Security headers.** Every page serves: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- [ ] **HTTPS everywhere.** All internal links, form actions, API calls use `https://`. No mixed content.
- [ ] **No sensitive data in URLs.** Form submissions / user IDs / session tokens not in URL parameters.
- [ ] **Cookie flags.** Any cookie set has `Secure` and `HttpOnly` flags. Consent banners are functional, not decorative.

---

## 6. Framework alignment — on content files themselves

When updating Layer 1–4 markdown files (`brand/`, `strategy/`, `modules/`, `pages/`, `content/`), run a lighter check.

- [ ] **Cross-links valid.** This file references `brand/style-guide.md` — does that file still exist?
- [ ] **No stale product counts.** "Six specialised software" appears in multiple files. If Cubewise adds or removes a component, every occurrence needs updating.
- [ ] **Quotes match source.** A quote in `content/social-proof.md` must match what's on the live page. If the live page is updated, update the YAML.
- [ ] **New page = sitemap entry.** Any new page added to `src/pages/` must have a row in `strategy/sitemap.md` and, if it's being retired, an entry in `redirects.md`.

---

## The single hardest check

> **Would a TM1 consultant nod at this page?**

If the answer isn't yes, the copy is generic. Specificity is the whole product.
