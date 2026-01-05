import fs from 'fs'
import path from 'path'

const SRC_DIR = path.join(process.cwd(), 'src')
const TOKENS = ['questionBank', 'round2Situations', 'ContentDB', 'CONTENT_MAP', 'anchorSelector']
const IGNORED_SEGMENTS = new Set(['archive', 'legacy'])

const hits = []

function shouldSkip(filePath) {
  const parts = filePath.split(path.sep)
  return parts.some(part => IGNORED_SEGMENTS.has(part))
}

function scanDir(dir) {
  let entries = []
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch (err) {
    console.error(`Failed to read ${dir}:`, err)
    process.exit(1)
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (shouldSkip(fullPath)) continue

    if (entry.isDirectory()) {
      scanDir(fullPath)
      continue
    }

    if (!/\.(js|ts|vue)$/i.test(entry.name)) continue

    let content = ''
    try {
      content = fs.readFileSync(fullPath, 'utf8')
    } catch (err) {
      console.error(`Failed to read file ${fullPath}:`, err)
      process.exit(1)
    }

    const matchedTokens = TOKENS.filter(token => content.includes(token))
    if (matchedTokens.length) {
      hits.push({ file: path.relative(process.cwd(), fullPath), tokens: matchedTokens })
    }
  }
}

scanDir(SRC_DIR)

if (hits.length) {
  hits.forEach(hit => {
    console.error(`${hit.file}: ${hit.tokens.join(', ')}`)
  })
  process.exit(1)
}

console.log('No legacy strings found in src/')
