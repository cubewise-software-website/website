---
name: Sitemap
description: Locked URLs, navigation hierarchy, and page purpose per page
type: strategy
---

# Sitemap

Layer 2 — Strategy. **This file is locked.** URLs, nav structure, and page purpose do not change casually — breaking them breaks SEO authority, LLM citations, and the buyer journey.

When a page moves or is retired, an entry goes into `redirects.md` in the same commit.

---

## Primary navigation

The highest-stakes UI on the site. Present on every page.

```
LOGO  |  Solutions For ▾  |  Platform ▾  |  Downloads  |  Resources ▾  |  [Contact]

Solutions For
├ /platform/developers/
├ /platform/administrators/
├ /platform/power-users/
└ /platform/managers/

Platform
├ Develop & Operate
│   ├ /arc-plus/          — DevOps for IBM Planning Analytics
│   ├ /arc/               — The professional TM1 IDE
│   └ /pulse/             — Monitor, understand & manage
├ Analyse & Report
│   ├ /slice/             — The modern Excel add-in
│   └ /powerconnect/      — IBM PA data in Power BI
├ Integrate
│   └ /atmosphere/        — Self-service data integration
└ Deployment Options
    ├ /deployment/self-hosted/
    └ /deployment/cubewise-cloud/

Downloads
└ /downloads/

Resources
├ /blog/
├ /docs/
└ https://global.resources.cubewise.com/  (external — Resource Hub)

Contact (nav CTA)
└ /contact/
```

**Announcement-bar secondary nav** (site-wide utility links):
`/about/` · `/partners/` · external Support (Atlassian Service Desk) · external Forum (forum.cubewise.com) · language switcher (EN/FR/DE/ZH-HANS)

**Footer nav:**
`/platform/` · Support (external) · `/docs/` · `/blog/` · `/partners/` · `/about/` · `/contact/` (plus `/pricing/` on some pages)

---

## Navigation rules

- **Max 2 levels deep** in the mega-menu. No nested dropdowns.
- **Nav label must match page H1.** If nav says *"Platform,"* the page H1 says *"The Cubewise Platform."* Close enough. Mismatch breaks information scent.
- **One primary CTA in the nav.** Currently "Contact." Don't split attention with competing buttons.
- **Order = priority.** Left to right mirrors awareness → decision: Solutions For (persona) → Platform (product) → Downloads (trial) → Resources → Contact.
- **Campaign landing pages NOT in nav.** They live at `/lp/[campaign]/` (if ever created) and are only discoverable via paid traffic.

---

## Full page inventory

| URL | Purpose | Audience stage | Persona | Layer 4 page file? |
|-----|---------|----------------|---------|---------------------|
| `/` | Homepage — platform overview, 6 products, 3 roles | Awareness | All | `pages/homepage.md` |
| `/about/` | Who Cubewise is, the team, the story | Consideration | All | (none yet) |
| `/contact/` | Talk to a Cubewise specialist | Decision | All | (none yet) |
| `/platform/` | The Cubewise Platform overview (hub-and-spoke) | Awareness → Consideration | All | (none yet) |
| `/platform/developers/` | Cubewise for Developers (Arc + Arc+) | Consideration | Developer | (none yet) |
| `/platform/administrators/` | Cubewise for Administrators (Pulse + Arc+) | Consideration | Administrator | (none yet) |
| `/platform/power-users/` | Cubewise for Power Users (Slice, Atmosphere, PowerConnect) | Consideration | Power User | (none yet) |
| `/platform/managers/` | Cubewise for Managers (Pulse, Arc+, Atmosphere) | Consideration | Manager | (none yet) |
| `/arc/` | Arc product overview | Awareness → Consideration | Developer | (none yet) |
| `/arc/features/` | All Arc features in depth | Consideration | Developer | (none yet) |
| `/arc/community/` | Arc community / forum | Consideration | Developer | (none yet) |
| `/arc/developers/` | Arc for open-source / TM1Py developers | Consideration | Developer | (none yet) |
| `/arc/customers/` | Arc customer stories | Decision | Developer | (none yet) |
| `/arc/download/` | Download Arc free (90 days) | Decision | Developer | (none yet) |
| `/arc-plus/` | Arc+ product overview | Awareness → Consideration | Developer / Admin | (none yet) |
| `/arc-plus/features/` | All Arc+ features | Consideration | Developer / Admin | (none yet) |
| `/pulse/` | Pulse product overview | Awareness → Consideration | Administrator | (none yet) |
| `/pulse/features/` | All Pulse features | Consideration | Administrator | (none yet) |
| `/pulse/monitor/` | Pulse monitoring deep-dive | Consideration | Administrator | (none yet) |
| `/pulse/understand/` | Pulse understand deep-dive | Consideration | Administrator | (none yet) |
| `/pulse/migration/` | Pulse migration deep-dive | Consideration | Administrator | (none yet) |
| `/pulse/customers/` | Pulse customer stories index | Decision | Administrator | (none yet) |
| `/pulse/customers/aveva/` | Aveva story | Decision | Administrator | (none yet) |
| `/pulse/customers/norgine/` | Norgine story | Decision | Administrator | (none yet) |
| `/pulse/customers/pattonair/` | Pattonair story | Decision | Administrator | (none yet) |
| `/pulse/customers/scc/` | SCC story | Decision | Administrator | (none yet) |
| `/pulse/customers/stockland/` | Stockland story | Decision | Administrator | (none yet) |
| `/pulse/download/` | Download Pulse | Decision | Administrator | (none yet) |
| `/slice/` | Slice product overview | Awareness → Consideration | Power User | (none yet) |
| `/slice/features/` | All Slice features | Consideration | Power User | (none yet) |
| `/slice/customers/` | Slice customer stories | Decision | Power User | (none yet) |
| `/slice/download/` | Download Slice | Decision | Power User | (none yet) |
| `/atmosphere/` | Atmosphere product overview | Awareness → Consideration | Power User | (none yet) |
| `/atmosphere/features/` | All Atmosphere integrations / features | Consideration | Power User | (none yet) |
| `/atmosphere/integrations/` | Specific integration deep-dives | Consideration | Power User | (none yet) |
| `/powerconnect/` | PowerConnect product overview | Awareness → Consideration | Power User | (none yet) |
| `/powerconnect/features/` | All PowerConnect features | Consideration | Power User | (none yet) |
| `/powerconnect/download/` | Download PowerConnect | Decision | Power User | (none yet) |
| `/deployment/self-hosted/` | Self-hosted deployment option | Decision | All | (none yet) |
| `/deployment/cubewise-cloud/` | Managed Cubewise Cloud deployment | Decision | All | (none yet) |
| `/downloads/` | All downloads hub | Decision | All | (none yet) |
| `/blog/` | Blog index | Consideration | All | (none yet) |
| `/docs/` | Documentation hub | Consideration → Decision | All | (none yet) |
| `/partners/` | Cubewise partners | Consideration | All | (none yet) |
| `/pricing/` | Pricing (currently stub) | Decision | All | (none yet) |
| `/open-source/` | Open-source projects | Consideration | Developer | (none yet) |
| `/open-source/bedrock/` | Bedrock (TM1 framework) | Consideration | Developer | (none yet) |
| `/open-source/optimuspy/` | OptimusPy | Consideration | Developer | (none yet) |
| `/open-source/rushti/` | RushTI | Consideration | Developer | (none yet) |
| `/open-source/tm1py/` | TM1Py (Python SDK) | Consideration | Developer | (none yet) |

**Locales.** Every URL above also exists at `/fr/...`, `/de/...`, `/zh-hans/...`. The browser-language sniff at `/` redirects accordingly (see `src/pages/index.html`).

---

## Slug conventions

- **Kebab-case, lower-case.** `/power-users/`, `/arc-plus/`, `/cubewise-cloud/`.
- **Trailing slash on directories.** `/arc/` not `/arc`.
- **No deep nesting.** Max 3 levels: `/pulse/customers/norgine/`. No `/platform/products/develop/arc/features/list/`.
- **One canonical URL per page.** No www/non-www split. No trailing-slash variants. Canonical tags set from day one.

---

## What you own vs. what stays fluid

| Locked in this file | Fluid — Claude can update freely |
|---------------------|----------------------------------|
| Page URLs / slugs | Copy within each page |
| Nav items and order | Section order within a page |
| Nav label wording and style | Internal links between pages |
| Page groupings & hierarchy | Meta titles and descriptions |
| | Blog and resource content |
| | Page-level hooks and CTAs |

If a change touches the left column, it touches this file — and `redirects.md`.

---

## External destinations (not on this domain)

These links appear in site navigation but point off-site. They are stable and should not be proxied through our routes.

| Where it appears | URL |
|------------------|-----|
| Announcement bar · footer | `https://cubewisecare.atlassian.net/servicedesk/customer/portal/13` — Support |
| Announcement bar | `https://forum.cubewise.com/` — Community Forum |
| Resources mega-menu | `https://global.resources.cubewise.com/` — Resource Hub |
| GitHub repo (in brand-guidelines) | `https://github.com/cubewise-code/website.git` |

---

## Known gaps / open decisions

- **`/pricing/`** is a stub. Decision needed: static pricing page, tier cards, or "contact for quote" with a reasoning paragraph.
- **Arc+ has no `/arc-plus/download/`** page — intentional? (Arc+ is Arc + Pulse licensed, not a separate download.) Confirm and note here.
- **No `/about/` page file** (Layer 4) yet — the page exists but has no spec. Consider creating when refreshed.
- **Campaign landing pages (`/lp/*`)** — none exist yet. If created, they must NOT appear in nav.
