import { readdir, readFile, writeFile } from 'fs/promises'
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

rewritePaths(DIST_DIR)
  .then(() => console.log('Path rewriting complete.'))
  .catch(err => { console.error(err); process.exit(1) })
