import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { patternToThemeMap } from '../../src/core/ontology/patternToThemeMap.v1.js'
import {
  normalizePatternTag,
  PATTERN_TAG_ENUMS,
  PATTERN_TAG_ALIAS_MAP
} from '../../src/core/ontology/patternTag.v1.js'

const QB_PATH = path.resolve('src/core/ontology/questionBank.v1.json')
const FACETS = new Set([
  'withdraw_and_protect',
  'push_through',
  'follow_momentum',
  'observe_and_wait',
  'seek_support',
  'adjust_strategy',
  'avoid_conflict',
  'self_prioritize'
])
const THEMES = new Set([
  'chronic_depletion',
  'loss_of_agency',
  'hyper_responsibility',
  'fear_based_stability',
  'identity_diffusion',
  'suppressed_needs',
  'chronic_alertness',
  'unprocessed_loss',
  'meaning_vacuum',
  'self_erosion'
])
const PATTERNS = new Set(PATTERN_TAG_ENUMS || [])

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function main() {
  const raw = await readFile(QB_PATH, 'utf8')
  const qb = JSON.parse(raw)
  const items = Array.isArray(qb?.items) ? qb.items : []
  let count = 0

  items.forEach((theme, ti) => {
    const qs = Array.isArray(theme?.questions) ? theme.questions : []
    qs.forEach((q, qi) => {
      const metas = Array.isArray(q?.choice_meta) ? q.choice_meta : []
      metas.forEach((m, mi) => {
        count += 1
        const facet = m?.behavior_facet
        assert(FACETS.has(facet), `[theme ${theme.theme_id}] q${qi} choice${mi} invalid facet ${facet}`)
        const tags = Array.isArray(q?.pattern_tags) ? q.pattern_tags : []
        tags.forEach(tag => {
          const raw = String(tag || '')
          const norm = normalizePatternTag(raw)
          const aliasTarget = PATTERN_TAG_ALIAS_MAP[raw.trim().toLowerCase()] || (norm !== raw ? norm : null)
          if (aliasTarget && aliasTarget !== raw) {
            console.info(`[validate:questionbank] info: pattern_tag mapped ${raw} -> ${aliasTarget} @ theme ${theme.theme_id} q${qi}`)
          }
          const canonical = norm || raw
          if (!PATTERNS.has(canonical) && !THEMES.has(canonical)) {
            console.warn(`[validate:questionbank] warn: pattern_tag not in enums ${raw} @ theme ${theme.theme_id} q${qi}; try ${canonical}`)
          }
        })
        if (m?.confidence_weight !== undefined) {
          const n = Number(m.confidence_weight)
          assert(Number.isFinite(n), `[theme ${theme.theme_id}] q${qi} choice${mi} confidence not number`)
          assert(n > 0, `[theme ${theme.theme_id}] q${qi} choice${mi} confidence non-positive`)
        }
      })
    })
  })

  console.log('[validate:questionbank] OK', { choices: count })
}

main().catch(err => {
  console.error('[validate:questionbank] fail:', err.message || err)
  process.exitCode = 1
})
