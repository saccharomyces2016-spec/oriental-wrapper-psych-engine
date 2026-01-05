import fs from 'fs'
import path from 'path'

const ROOTS = ['src', 'scripts', 'server']
const BANNED_MODULES = ['questionBank', 'ContentDB', 'round2Situations', 'round2DomainMap']
const BANNED_DOMAINS = ['money', 'relationship', 'career', 'health', 'family', 'self', 'study', 'social']
const ALLOWED_DIR_HINTS = ['archive', 'legacy', 'reports', 'docs', `core${path.sep}content`, `core${path.sep}flow`]
const TARGET_DOMAIN_FILES = [
  'src/views/03_Resonance.vue',
  'src/core/choiceEngine.js'
]

const errors = []

function shouldSkip(file) {
  return ALLOWED_DIR_HINTS.some(hint => {
    if (file.includes(hint)) return true
    return file.includes(`${path.sep}${hint}${path.sep}`)
  })
}

function scanFile(file) {
  if (!fs.existsSync(file)) return
  if (shouldSkip(file)) return
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split('\n')
  lines.forEach(line => {
    const trimmed = line.trim()
    if (trimmed.startsWith('import') || trimmed.includes('require(')) {
      BANNED_MODULES.forEach(mod => {
        if (trimmed.toLowerCase().includes(mod.toLowerCase())) {
          errors.push(`${file} contains banned import ${mod} -> ${trimmed}`)
        }
      })
    }
  })
  if (TARGET_DOMAIN_FILES.includes(file)) {
    const lc = content.toLowerCase()
    BANNED_DOMAINS.forEach(dom => {
      const re = new RegExp(`\\b${dom}\\b`, 'i')
      if (re.test(lc) && !lc.includes('font-family')) {
        errors.push(`${file} contains banned domain string "${dom}"`)
      }
    })
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      walk(full)
    } else if (/\.(js|ts|vue|mjs|cjs)$/.test(e.name)) {
      scanFile(full)
    }
  }
}

ROOTS.forEach(walk)

if (errors.length) {
  errors.forEach(e => console.error('[verify-no-legacy-imports]', e))
  process.exit(1)
}

console.log('[verify-no-legacy-imports] OK')
