import { readFile } from 'node:fs/promises'
import path from 'node:path'

const ROUND4_PATH = path.resolve('src/core/ontology/round4Anchors.v1.json')
const FACETS = new Set([
  'adjust_strategy',
  'avoid_conflict',
  'follow_momentum',
  'observe_and_wait',
  'push_through',
  'seek_support',
  'self_prioritize',
  'withdraw_and_protect'
])

async function main() {
  const raw = await readFile(ROUND4_PATH, 'utf8')
  const data = JSON.parse(raw)
  const items = Array.isArray(data?.items) ? data.items : []

  const errors = []

  items.forEach((item, idx) => {
    const id = item?.id || `idx-${idx}`
    const choices = Array.isArray(item?.choices) ? item.choices : []
    const meta = Array.isArray(item?.choice_meta) ? item.choice_meta : []

    if (choices.length !== 4) errors.push(`${id}: expected 4 choices, got ${choices.length}`)
    if (meta.length !== 4) errors.push(`${id}: expected 4 choice_meta entries, got ${meta.length}`)

    const choiceSet = new Set(choices.map(c => String(c || '').trim()))
    meta.forEach((m, mi) => {
      const choice = String(m?.choice || '').trim()
      if (!choiceSet.has(choice)) errors.push(`${id}: choice_meta[${mi}] not in choices`)
      if (!m?.anchor_key) errors.push(`${id}: choice_meta[${mi}] missing anchor_key`)

      const facetWeights = m?.effect?.facet_weights || {}
      if (typeof facetWeights !== 'object') {
        errors.push(`${id}: choice_meta[${mi}] facet_weights missing or invalid`)
      } else {
        Object.keys(facetWeights).forEach(k => {
          if (!FACETS.has(k)) errors.push(`${id}: invalid facet key "${k}" in choice_meta[${mi}]`)
        })
      }
    })
  })

  if (errors.length) {
    console.error('[validate:round4] failed:', errors.join(' | '))
    process.exitCode = 1
    return
  }

  console.log('[validate:round4] round4Anchors.v1.json OK')
}

main().catch(err => {
  console.error('[validate:round4] error:', err)
  process.exitCode = 1
})
