# Cubewise Website

The official website for [Cubewise](https://cubewise.com) — IBM Planning Analytics / TM1 specialists.

## Overview

Static HTML site built with a custom Node.js pipeline. Blog and Docs content is managed in Confluence Cloud and published automatically via webhook. All other pages (Platform, Pricing, Partners, About, Contact) are hand-coded HTML.

## Stack

| Layer | Technology |
|---|---|
| Pages | Static HTML + CSS |
| CMS | Confluence Cloud (Blog & Docs only) |
| Build | Node.js (custom script, no framework) |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Webhook bridge | Cloudflare Worker |

## How it works

1. A Confluence page is published
2. Confluence fires a webhook to a Cloudflare Worker
3. The Worker triggers a GitHub Actions build via `repository_dispatch`
4. The build fetches Blog and Docs content from the Confluence REST API, renders it into HTML templates, and copies the hand-coded static pages into `dist/`
5. GitHub Actions deploys `dist/` to the `gh-pages` branch
6. GitHub Pages serves the site

## Project structure

```
website/
├── scripts/
│   ├── fetch.js          # Fetches pages from Confluence REST API
│   ├── render.js         # Converts Confluence storage format → clean HTML
│   └── build.js          # Orchestrates fetch → render → write dist/
├── src/
│   ├── templates/        # HTML templates (blog, docs, base layout)
│   ├── assets/           # CSS, fonts, images, logos
│   └── pages/            # Hand-coded static pages
│       ├── index.html    # Homepage
│       ├── platform/     # Platform overview
│       ├── arc-plus/     # Arc+ component page
│       ├── pulse/        # Pulse component page
│       ├── slice/        # Slice component page
│       ├── atmosphere/   # Atmosphere component page
│       ├── powerconnect/ # PowerConnect component page
│       ├── pricing/
│       ├── partners/
│       ├── about/
│       └── contact/
├── worker/
│   └── index.js          # Cloudflare Worker webhook bridge
├── .github/
│   └── workflows/
│       ├── build.yml     # Auto build on Confluence publish
│       └── manual.yml    # Manual build trigger
├── config.js             # Confluence space keys and build config
└── docs/
    ├── brand-guidelines.md
    └── superpowers/
        ├── specs/        # Design specification
        └── plans/        # Implementation plan
```

## Local development

```bash
npm install
```

To run a local build (requires Confluence credentials):

```bash
# Create a .env file with your credentials
cp .env.example .env  # then fill in values

npx dotenv -e .env -- npm run build
npx serve dist
```

To run tests:

```bash
npm test
```

## Configuration

### config.js

Add your Confluence space keys to `config.js`:

```js
export const spaces = [
  { key: 'WEBSITE-BLOG', section: 'blog', template: 'blog-post', indexTemplate: 'blog-index', isDocsSpace: false },
  { key: 'DOCS-ARC',     section: 'docs', template: 'docs', isDocsSpace: true },
  // add more docs spaces here
]
```

### GitHub Actions secrets

Set these in **Settings → Secrets and variables → Actions**:

| Secret | Description |
|---|---|
| `CONFLUENCE_BASE_URL` | e.g. `https://cubewise.atlassian.net` |
| `CONFLUENCE_EMAIL` | Atlassian account email |
| `CONFLUENCE_API_TOKEN` | Confluence Cloud API token |

### Cloudflare Worker environment variables

Set these in the Cloudflare dashboard under the Worker's settings:

| Variable | Description |
|---|---|
| `GITHUB_REPO` | `cubewise-code/website` |
| `GITHUB_PAT` | GitHub PAT with `repo` scope |
| `CF_WORKER_SECRET` | Shared secret (must match Confluence webhook header) |

### Confluence webhook

In Confluence Cloud → Settings → Webhooks:
- **URL:** your Cloudflare Worker URL
- **Event:** Page published
- **Header:** `X-Webhook-Secret: <CF_WORKER_SECRET>`

## Platform

The site presents the **Cubewise Platform** — a suite of components for IBM Planning Analytics / TM1:

| Component | URL |
|---|---|
| Arc+ | `/arc-plus/` |
| Pulse | `/pulse/` |
| Slice | `/slice/` |
| Atmosphere | `/atmosphere/` |
| PowerConnect | `/powerconnect/` |

## Docs

- [Brand Guidelines](docs/brand-guidelines.md)
- [Design Spec](docs/superpowers/specs/2026-03-30-cubewise-website-design.md)
- [Implementation Plan](docs/superpowers/plans/2026-03-30-cubewise-website.md)
