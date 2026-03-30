// Builds the site without fetching from Confluence — for local preview only.
import { mkdir, cp, rm } from 'fs/promises'
import { join } from 'path'
import { DIST_DIR, ASSETS_DIR, PAGES_DIR } from '../config.js'

// Wipe dist/ first so stale files don't linger
await rm(DIST_DIR, { recursive: true, force: true })
await mkdir(DIST_DIR, { recursive: true })

try { await cp(ASSETS_DIR, join(DIST_DIR, 'assets'), { recursive: true }) } catch {}
try { await cp(PAGES_DIR, DIST_DIR, { recursive: true }) } catch {}

console.log('Preview build complete → dist/')
