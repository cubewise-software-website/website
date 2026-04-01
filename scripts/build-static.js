import { cp, mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { join, extname } from 'path'

const DIST_DIR = 'dist'
const BASE_PATH = '/website'

async function rewritePaths(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await rewritePaths(fullPath)
    } else if (entry.isFile() && extname(entry.name) === '.html') {
      let content = await readFile(fullPath, 'utf8')
      content = content.replaceAll('href="/', `href="${BASE_PATH}/`)
      content = content.replaceAll('src="/', `src="${BASE_PATH}/`)
      await writeFile(fullPath, content, 'utf8')
    }
  }
}

async function buildStatic() {
  await mkdir(DIST_DIR, { recursive: true })
  await mkdir(join(DIST_DIR, 'assets'), { recursive: true })
  await cp('src/pages', DIST_DIR, { recursive: true })
  await cp('src/assets', join(DIST_DIR, 'assets'), { recursive: true })
  await rewritePaths(DIST_DIR)
  console.log('Static build complete.')
}

if (process.argv[1]?.endsWith('build-static.js')) {
  buildStatic().catch(err => { console.error(err); process.exit(1) })
}
