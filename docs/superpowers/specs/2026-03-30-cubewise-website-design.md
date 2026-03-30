# Cubewise Website Design

**Date:** 2026-03-30
**Project:** Cubewise static website with Confluence-backed Blog and Docs
**Stack:** Custom Node.js build script · GitHub Actions · GitHub Pages

---

## Overview

A static HTML website for Cubewise — a software company providing open-source and commercial tools for IBM Planning Analytics / TM1. The site is hosted on GitHub Pages. Most pages are hand-coded static HTML. Blog and Docs sections are content-managed via Confluence Cloud and regenerated automatically whenever a Confluence page is published.

### Platform Positioning

The site sells the **Cubewise Platform** — a unified suite for IBM Planning Analytics / TM1. Individual software products are presented as **components** of the platform, following a similar model to elastic.co. The homepage and platform page lead with the platform narrative; component pages detail each product.

**Components:**
| Component | Slug |
|---|---|
| Arc+ | `arc-plus` |
| Pulse | `pulse` |
| Slice | `slice` |
| Atmosphere | `atmosphere` |
| PowerConnect | `powerconnect` |

**Messaging hierarchy:**
1. **Platform** — "The Cubewise Platform for IBM Planning Analytics / TM1" (homepage hero + platform page)
2. **Components** — individual product pages under `/platform/[component]/`
3. **Outcomes** — Docs and Blog support the platform narrative with technical depth

---

## Pages

| URL | Description | Source |
|---|---|---|
| `/` | Homepage — platform hero, component overview, key outcomes | Hand-coded static HTML |
| `/platform/` | Platform overview — "One platform, five components" | Hand-coded static HTML |
| `/arc-plus/` | Arc+ component page | Hand-coded static HTML |
| `/pulse/` | Pulse component page | Hand-coded static HTML |
| `/slice/` | Slice component page | Hand-coded static HTML |
| `/atmosphere/` | Atmosphere component page | Hand-coded static HTML |
| `/powerconnect/` | PowerConnect component page | Hand-coded static HTML |
| `/pricing/` | Pricing page | Hand-coded static HTML |
| `/docs/` | Docs index — auto-generated list of all doc pages, grouped by space label | Hand-coded template, data from fetched Confluence pages |
| `/docs/[page-slug]/` | Individual doc page | Hand-coded template + Confluence content |
| `/blog/` | Blog index | Hand-coded template + Confluence content |
| `/blog/posts/[slug]/` | Individual blog post | Hand-coded template + Confluence content |
| `/partners/` | Partners page | Hand-coded static HTML |
| `/about/` | About page | Hand-coded static HTML |
| `/contact/` | Contact page | Hand-coded static HTML |

---

## Confluence CMS Scope

Only Blog and Docs content comes from Confluence. All other pages are edited directly in code.

### Blog

- **Confluence space:** `WEBSITE-BLOG`
- The root page of the space generates `/blog/` (listing index)
- Each child page generates `/blog/posts/[slugified-title]/index.html`
- Full page body is rendered from Confluence storage format

### Docs

- **Confluence spaces:** Multiple (one per product/category)
- All docs spaces are merged flat into `/docs/[page-slug]/`
- Each page is automatically labelled with its source space key (e.g. `docs-arc`, `docs-pulse`) at fetch time
- The docs template reads these labels to render a grouped sidebar, letting visitors filter by product
- Full page body is rendered from Confluence storage format

---

## Architecture

```
Confluence Cloud
  └─ page published → webhook fires
       └─ Cloudflare Worker (webhook bridge, free tier)
            └─ calls GitHub API → repository_dispatch event
                 └─ GitHub Actions workflow
                      ├─ fetch.js   — calls Confluence REST API, caches JSON + downloads attachments
                      ├─ render.js  — converts Confluence storage format → clean HTML
                      └─ build.js   — applies templates, writes /dist
                           └─ deploys dist/ to gh-pages branch
                                └─ GitHub Pages serves cubewise.com
```

A second workflow (`manual.yml`) allows triggering a full rebuild manually from GitHub UI.

---

## Repository Structure

```
website/
├── src/
│   ├── templates/
│   │   ├── base.html           # Shared layout: nav, footer
│   │   ├── page.html           # Generic static page
│   │   ├── blog-index.html     # Blog listing
│   │   ├── blog-post.html      # Individual blog post
│   │   ├── docs.html           # Docs page with grouped sidebar
│   │   └── product.html        # Product detail page
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── pages/                  # Hand-coded HTML pages (home, platform, pricing, etc.)
│       ├── index.html
│       ├── platform/
│       │   └── index.html
│       ├── arc-plus/
│       ├── pulse/
│       ├── slice/
│       ├── atmosphere/
│       ├── powerconnect/
│       ├── pricing/
│       ├── partners/
│       ├── about/
│       └── contact/
├── scripts/
│   ├── fetch.js                # Fetches content from Confluence REST API
│   ├── render.js               # Converts storage format → clean HTML
│   └── build.js                # Orchestrates fetch → render → write dist/
├── config.js                   # Space keys, section mappings, template assignments
├── cache/                      # Intermediate JSON from Confluence (git-ignored)
├── dist/                       # Generated site output (git-ignored)
├── .github/
│   └── workflows/
│       ├── build.yml           # Triggered by repository_dispatch
│       └── manual.yml          # Manual trigger via GitHub UI
├── .gitignore
└── package.json
```

---

## Build Script Design

### fetch.js

- Iterates over all configured Confluence spaces in `config.js`
- Calls `GET /wiki/rest/api/content?spaceKey={key}&expand=body.storage,ancestors,metadata.labels`
- Downloads page attachments (images) to `cache/attachments/`
- Writes raw page data to `cache/[spaceKey]/[pageId].json`
- For docs spaces: appends the space key as a label to each page's metadata

### render.js

- Reads each cached page JSON
- Converts Confluence storage format HTML to clean HTML:
  - Strips Confluence-specific macros
  - Rewrites attachment image URLs to `/assets/images/[filename]`
  - Slugifies page titles to produce URL paths
- Outputs a render context object per page: `{ path, title, body, labels, template }`

### build.js

- Calls `fetch.js` then `render.js`
- For each rendered page, selects the template from `config.js` based on space/section
- Injects render context into template using simple `{{variable}}` substitution
- Writes `dist/[path]/index.html`
- Copies `src/assets/` → `dist/assets/`
- Copies `src/pages/` hand-coded HTML → `dist/`

### config.js

```js
export const spaces = [
  { key: 'WEBSITE-BLOG', section: 'blog',  template: 'blog-post', indexTemplate: 'blog-index' },
  { key: 'DOCS-SPACE-A', section: 'docs',  template: 'docs', isDocsSpace: true },
  { key: 'DOCS-SPACE-B', section: 'docs',  template: 'docs', isDocsSpace: true },
  // add more docs spaces here
]
```

---

## Cloudflare Worker (Webhook Bridge)

Confluence Cloud cannot directly call the GitHub `repository_dispatch` API (requires auth). A small Cloudflare Worker sits in between:

1. Confluence fires a webhook to the Worker's URL on page publish
2. The Worker validates a shared secret (`CF_WORKER_SECRET`) in the request
3. The Worker calls `POST https://api.github.com/repos/cubewise-code/website/dispatches` with a GitHub PAT
4. GitHub Actions picks up the `repository_dispatch` event and runs `build.yml`

The Worker is ~20 lines of JavaScript, deployed on Cloudflare's free tier.

**Cloudflare Worker environment variables** (set in Cloudflare dashboard, not GitHub):

| Variable | Description |
|---|---|
| `GITHUB_PAT` | GitHub personal access token with `repo` scope (to trigger `repository_dispatch`) |
| `CF_WORKER_SECRET` | Shared secret — must match the value set in GitHub Actions secrets |
| `GITHUB_REPO` | `cubewise-code/website` |

---

## GitHub Actions Workflows

### build.yml (webhook-triggered)

```yaml
on:
  repository_dispatch:
    types: [confluence-publish]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: node scripts/build.js
        env:
          CONFLUENCE_BASE_URL: ${{ secrets.CONFLUENCE_BASE_URL }}
          CONFLUENCE_EMAIL: ${{ secrets.CONFLUENCE_EMAIL }}
          CONFLUENCE_API_TOKEN: ${{ secrets.CONFLUENCE_API_TOKEN }}
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### manual.yml

Same job, triggered via `workflow_dispatch` for on-demand full rebuilds.

---

## GitHub Actions Secrets

| Secret | Description |
|---|---|
| `CONFLUENCE_BASE_URL` | e.g. `https://cubewise.atlassian.net` |
| `CONFLUENCE_EMAIL` | Atlassian account email for API auth |
| `CONFLUENCE_API_TOKEN` | Confluence Cloud API token |
| `CF_WORKER_SECRET` | Shared secret to validate webhook origin |

---

## Content Rendering Notes

- Confluence storage format is a subset of HTML with custom macros. The render step strips macros that have no web equivalent (e.g. `ac:structured-macro`).
- Images are downloaded at build time and served locally — no runtime dependency on Confluence CDN.
- Internal Confluence links between pages are rewritten to the corresponding website URLs.
- The docs sidebar groups pages by their `docs-[space-key]` label and sorts alphabetically within each group.

---

## Out of Scope

- Search functionality (can be added later via a client-side index like Pagefind)
- Authentication / private pages
- Forms backend for Contact page (can use a third-party service like Formspree)
- Incremental builds (full rebuild on every publish event)
