# Cubewise Website

The official website for [Cubewise Software](https://code.cubewise.com) — IBM Planning Analytics / TM1 specialists.

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

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18 or later | Used for the build pipeline and scripts |
| npm | Comes with Node.js | Run `npm install` after cloning |
| Git | Any recent version | For branching and pull requests |

Check your versions:

```bash
node -v   # should print v18 or higher
npm -v
git --version
```

## Local development

**Install dependencies** after cloning:

```bash
npm install
```

**Preview the site locally** (no Confluence credentials needed — uses hand-coded pages only):

```bash
npm run preview
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Full build** (requires Confluence credentials for Blog and Docs content):

```bash
# Copy the example env file and fill in your credentials
cp .env.example .env

npx dotenv -e .env -- npm run build
npx serve dist
```

### Build commands — which one when

The site is hosted at `cubewise-code.github.io/website/`, so the deploy build rewrites every internal path to start with `/website/`. That output is correct for GitHub Pages but **breaks when served at `/` locally** — CSS, JS, and images all 404. Use the right command for the job:

| Command | What it does | When to use | Internal paths |
|---------|--------------|-------------|----------------|
| `npm run preview` | Runs `preview.js` (no Confluence fetch, no path rewrite) + serves `dist/` | **Local preview — default** | `/assets/...` |
| `npm run build` | Full build: fetches Confluence, renders Blog and Docs, copies static pages | Local full build (needs `.env`) | `/assets/...` |
| `npm run build:static` | Copies `src/pages/` into `dist/` and rewrites every internal path to `/website/...` | **GitHub Pages deploy only** — do not serve at root | `/website/assets/...` |
| `npm run build:github` | `npm run build` + `scripts/rewrite-paths.js` (same path rewrite as above) | GitHub Pages deploy with Confluence content | `/website/assets/...` |

**Rule of thumb:** if a local preview ever looks like unstyled HTML (no CSS, broken images), you almost certainly ran a `build:*` command. Run `npm run preview` to regenerate `dist/` with correct paths.

**Run tests:**

```bash
npm test                # unit tests (Vitest)
npm run test:mobile     # browser integration tests (Playwright) — requires a server running on port 3000
```

## Contributing — local changes and pull requests

1. **Create a branch** from `master`:

   ```bash
   git checkout master
   git pull
   git checkout -b your-branch-name
   ```

2. **Make your changes.** Hand-coded pages are in `src/pages/`. Styles are in `src/assets/css/main.css`. The base template (used for Blog and Docs pages) is in `src/templates/base.html`.

3. **Preview locally** to check your changes look correct:

   ```bash
   npm run preview
   ```

   Do not use `npm run build:static` or `npm run build:github` for local preview — those builds rewrite every asset path to `/website/...` for the GitHub Pages deploy, and the page will render unstyled when served at `/`.

4. **Run tests** to make sure nothing is broken:

   ```bash
   npm test
   ```

5. **Commit your changes:**

   ```bash
   git add <files>
   git commit -m "description of what you changed"
   ```

6. **Push your branch and open a pull request:**

   ```bash
   git push -u origin your-branch-name
   ```

   Then go to [github.com/cubewise-code/website](https://github.com/cubewise-code/website), open a pull request from your branch into `master`, and request a review.

7. Once approved and merged to `master`, the site deploys automatically via GitHub Actions.

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

> **Required for GitHub Pages deployment.** The `deploy.yml` workflow fetches Blog and Docs content from Confluence on every push to `master`. If any of these secrets are missing, the build step will fail and the site will not deploy.

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
