# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy pre-built static files (`src/pages/` + `src/assets/`) to GitHub Pages on every push to `master` via GitHub Actions.

**Architecture:** A new `scripts/build-static.js` script copies static source files to `dist/` without fetching from Confluence. A GitHub Actions workflow runs this script then deploys `dist/` to GitHub Pages using the official upload/deploy actions.

**Tech Stack:** Node.js 20, `fs/promises` (`cp`, `mkdir`), GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `scripts/build-static.js` | Copy `src/pages/` and `src/assets/` to `dist/` |
| Modify | `package.json` | Add `build:static` script entry |
| Create | `.github/workflows/deploy.yml` | CI workflow: build + deploy to GitHub Pages |

---

### Task 1: Create `scripts/build-static.js`

**Files:**
- Create: `scripts/build-static.js`

- [ ] **Step 1: Write the file**

```js
import { cp, mkdir } from 'fs/promises'
import { join } from 'path'

const DIST_DIR = 'dist'

async function buildStatic() {
  await mkdir(DIST_DIR, { recursive: true })
  await mkdir(join(DIST_DIR, 'assets'), { recursive: true })
  await cp('src/pages', DIST_DIR, { recursive: true })
  await cp('src/assets', join(DIST_DIR, 'assets'), { recursive: true })
  console.log('Static build complete.')
}

buildStatic().catch(err => { console.error(err); process.exit(1) })
```

- [ ] **Step 2: Run it locally to verify output**

Run from repo root:
```bash
node scripts/build-static.js
```
Expected output: `Static build complete.`

Then verify:
```bash
ls dist/
```
Expected: `index.html` (or subdirectories from `src/pages/`) and `assets/` folder present.

- [ ] **Step 3: Commit**

```bash
git add scripts/build-static.js
git commit -m "feat: add build-static script for CI deployment"
```

---

### Task 2: Add `build:static` to `package.json`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the script**

In `package.json`, update the `"scripts"` section to add `"build:static"`:

```json
"scripts": {
  "build": "node scripts/build.js",
  "build:static": "node scripts/build-static.js",
  "preview": "node scripts/preview.js && npx serve dist",
  "test": "vitest run",
  "test:watch": "vitest"
},
```

- [ ] **Step 2: Verify it runs via npm**

```bash
npm run build:static
```
Expected output: `Static build complete.`

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: add build:static npm script"
```

---

### Task 3: Create `.github/workflows/deploy.yml`

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflows directory and file**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Write the workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build static files
        run: npm run build:static

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions workflow for GitHub Pages deployment"
```

- [ ] **Step 4: Enable GitHub Pages in repo settings**

In the GitHub repository settings:
1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

- [ ] **Step 5: Push and verify**

```bash
git push origin master
```

Then go to **Actions** tab on GitHub and confirm the `Deploy to GitHub Pages` workflow runs and succeeds. The deployed URL will be shown in the workflow output (`steps.deployment.outputs.page_url`).
