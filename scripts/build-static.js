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

if (process.argv[1]?.endsWith('build-static.js')) {
  buildStatic().catch(err => { console.error(err); process.exit(1) })
}
