import fs from 'fs'
import path from 'path'

const TARGET_FILES = ['src/views/01_Origin.vue', 'src/App.vue', 'src/views/03_Resonance.vue']
const STORAGE_PATTERNS = [/domain/i, /round/i, /question/i, /content/i, /contentdb/i, /round2situations/i, /questionbank/i]
const LEGACY_DOMAIN_REGEX = /\b(money|relationship|career|health|family|self|study|social|love|finance|work|body|home|mind|boundary|fortune|qing|cai|ye|shen|jia|jie|yun|xin)\b/i
const ROUND1_ALLOWED_REGEX = /domain_(yuan|cai|shen|ye|jia|ju|xin|ming)/

const ROOTS = ['src', 'scripts', 'server']
const BANNED_MODULES = ['questionBank', 'ContentDB', 'round2Situations', 'round2DomainMap']
const LEGACY_TOKENS = ['money', 'relationship', 'career', 'health', 'family', 'self', 'study', 'social', 'love', 'finance', 'work', 'body', 'home', 'mind', 'boundary', 'fortune', 'qing', 'cai', 'ye', 'shen', 'jia', 'jie', 'yun', 'xin']
const SKIP_DIRS = ['archive', 'legacy', 'reports', 'docs']

const errors = []
const warnings = []

function fileHas(content, regex) {
  return regex.test(content)
}

function verifyPatterns() {
  TARGET_FILES.forEach(file => {
    if (!fs.existsSync(file)) {
      errors.push(`[verify-entry-nolegacy] missing file ${file}`)
      return
    }
    const content = fs.readFileSync(file, 'utf8')
    if (file.includes('01_Origin.vue')) {
      STORAGE_PATTERNS.forEach(rx => {
        if (!fileHas(content, rx)) errors.push(`[verify-entry-nolegacy] ${file} missing storage pattern ${rx}`)
      })
      if (!fileHas(content, LEGACY_DOMAIN_REGEX)) errors.push(`[verify-entry-nolegacy] ${file} missing LEGACY_DOMAIN_REGEX guard`)
    }
    if (file.includes('App.vue')) {
      if (!content.includes('stageKey.value++')) errors.push('[verify-entry-nolegacy] App.vue should bump stageKey in handleOriginNext')
    }
    if (file.includes('03_Resonance.vue')) {
      if (!fileHas(content, ROUND1_ALLOWED_REGEX)) errors.push('[verify-entry-nolegacy] 03_Resonance.vue missing allowed domain_* regex guard')
    }
  })
}

function shouldSkip(file) {
  return SKIP_DIRS.some(h => file.includes(`${path.sep}${h}${path.sep}`))
}

function scanLegacyImports() {
  const bannedHits = []
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (shouldSkip(full)) continue
        walk(full)
      } else if (/\.(js|ts|vue|mjs|cjs)$/.test(e.name)) {
        const content = fs.readFileSync(full, 'utf8')
        const lines = content.split('\n').filter(l => l.trim().startsWith('import') || l.includes('require('))
        lines.forEach(line => {
          BANNED_MODULES.forEach(mod => {
            if (line.toLowerCase().includes(mod.toLowerCase())) {
              bannedHits.push(`${full}: ${line.trim()}`)
            }
          })
        })
      }
    }
  }
  ROOTS.forEach(walk)
  return bannedHits
}

function scanLegacyTokens() {
  const counts = {}
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (shouldSkip(full)) continue
        walk(full)
      } else if (/\.(js|ts|vue|mjs|cjs|json)$/.test(e.name)) {
        const content = fs.readFileSync(full, 'utf8').toLowerCase()
        LEGACY_TOKENS.forEach(tok => {
          const re = new RegExp(`\\b${tok}\\b`, 'g')
          const match = content.match(re)
          if (match?.length) counts[tok] = (counts[tok] || 0) + match.length
        })
      }
    }
  }
  ROOTS.forEach(walk)
  return counts
}

verifyPatterns()
const bannedImports = scanLegacyImports()
if (bannedImports.length) warnings.push(`[verify-entry-nolegacy] legacy imports (non-fatal): ${bannedImports.length}`)

const tokenCounts = scanLegacyTokens()
const topTokens = Object.entries(tokenCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([tok, cnt]) => `${tok}:${cnt}`)
if (topTokens.length) console.log('[verify-entry-nolegacy] legacy token counts (non-fatal):', topTokens.join(', '))

warnings.forEach(w => console.warn(w))

console.log('[verify-entry-nolegacy] OK')
