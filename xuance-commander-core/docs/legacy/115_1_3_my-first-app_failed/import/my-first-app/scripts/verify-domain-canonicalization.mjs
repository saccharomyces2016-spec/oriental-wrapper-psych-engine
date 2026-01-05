import { canonicalizeDomainId, CANONICAL_DOMAIN_IDS } from '../src/core/ontology/domainCanonicalMap.js'

const groups = {
  A: ['money', 'relationship', 'career', 'health', 'family', 'self', 'study', 'social'],
  B: ['love', 'finance', 'work', 'body', 'home', 'mind', 'boundary', 'fortune'],
  C: ['qing', 'cai', 'ye', 'shen', 'jia', 'jie', 'yun', 'xin']
}

const allowed = new Set(CANONICAL_DOMAIN_IDS)
let ok = true

for (const [label, keys] of Object.entries(groups)) {
  keys.forEach(key => {
    try {
      const mapped = canonicalizeDomainId(key)
      if (!allowed.has(mapped)) {
        console.error(`[verify-domain] ${label}:${key} mapped to unknown id ${mapped}`)
        ok = false
      }
    } catch (err) {
      console.error(`[verify-domain] ${label}:${key} failed -> ${err.message}`)
      ok = false
    }
  })
}

if (!ok) {
  process.exit(1)
}

console.log('[verify-domain] all legacy keys map to canonical domain_* ids')
