import { readFile } from 'node:fs/promises'
import path from 'node:path'

const ROUND2_PATH = path.resolve('src/core/ontology/round2Situations.v1.json')
const SIGNALS = new Set([
  'stability',
  'control',
  'responsibility',
  'overload',
  'opportunity_grab',
  'agency',
  'avoidance',
  'risk_aversion',
  'reinvention',
  'planning',
  'negotiation',
  'bridge_building',
  'alignment',
  'validation',
  'resourcefulness',
  'recovery',
  'help_seeking',
  'experiment',
  'commitment',
  'co_navigation',
  'momentum',
  'unknown'
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

async function main() {
  const raw = await readFile(ROUND2_PATH, 'utf8')
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
      if (!m?.signal_key) errors.push(`${id}: choice_meta[${mi}] missing signal_key`)
      if (m?.signal_key && !SIGNALS.has(m.signal_key)) errors.push(`${id}: choice_meta[${mi}] invalid signal_key ${m.signal_key}`)
      const cw = m?.confidence_weight
      if (cw !== undefined) {
        if (!Number.isFinite(cw) || cw < 0) errors.push(`${id}: choice_meta[${mi}] invalid confidence_weight`)
      }
      const tags = Array.isArray(m?.pattern_tags) ? m.pattern_tags : []
      tags.forEach(t => {
        if (!THEMES.has(t)) errors.push(`${id}: choice_meta[${mi}] invalid pattern_tag ${t}`)
      })
    })
  })

  if (errors.length) {
    console.error('[validate:round2] failed:', errors.join(' | '))
    process.exitCode = 1
    return
  }

  console.log('[validate:round2] round2Situations.v1.json OK')
}

main().catch(err => {
  console.error('[validate:round2] error:', err)
  process.exitCode = 1
})
