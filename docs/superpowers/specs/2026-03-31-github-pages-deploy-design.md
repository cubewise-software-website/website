---
title: GitHub Pages Deployment via GitHub Actions
date: 2026-03-31
status: approved
---

## Overview

Set up automated deployment to GitHub Pages on every push to `master`. The deployment serves only the pre-built static files from `src/pages/` and `src/assets/` — no Confluence content fetching occurs during CI.

## Components

### `scripts/build-static.js`

A minimal Node.js script (no dependencies, no env vars) that:

1. Creates `dist/` directory
2. Copies `src/pages/` → `dist/` (hand-coded HTML pages)
3. Copies `src/assets/` → `dist/assets/` (CSS, JS, images, logos)

Uses only `fs/promises` (`cp`, `mkdir`) — the same APIs already used in `build.js`.

### `package.json`

Add one script:

```json
"build:static": "node scripts/build-static.js"
```

### `.github/workflows/deploy.yml`

Trigger: `push` to `master`

Permissions:
- `pages: write`
- `id-token: write`

Steps:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` — Node 20
3. `npm run build:static`
4. `actions/configure-pages@v5`
5. `actions/upload-pages-artifact@v3` — path: `dist/`
6. `actions/deploy-pages@v4`

## Data Flow

```
push to master
  → checkout repo
  → npm run build:static
      → src/pages/ → dist/
      → src/assets/ → dist/assets/
  → upload dist/ as Pages artifact
  → deploy to GitHub Pages
```

## Out of Scope

- Confluence content fetching (handled locally via `npm run build`)
- Cache/attachments directory (not present in CI)
- Docs search index (requires Confluence data)
