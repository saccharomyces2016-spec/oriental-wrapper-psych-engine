import fs from 'fs'

const round4Path = new URL('../src/core/ontology/round4IntensityTrigger.v1.json', import.meta.url)
const round4 = JSON.parse(fs.readFileSync(round4Path, 'utf8'))

const triggers = Array.isArray(round4?.triggers) ? round4.triggers : []
const errors = []

function ensureCondition(option) {
  const cond = option?.condition || {}
  if (cond.source_question !== 'r3_q1_control') return false
  return cond.selected_option === 'A' || cond.selected_option === 'B'
}

const conditions = new Set()
triggers.forEach(t => {
  if (ensureCondition(t)) conditions.add(t.condition.selected_option)
  const opts = Array.isArray(t?.options) ? t.options : []
  if (opts.length < 2) errors.push(`trigger ${t?.anchor_id || 'unknown'} has insufficient options (${opts.length})`)
})

if (!conditions.has('A')) errors.push('missing trigger for r3_q1_control option A')
if (!conditions.has('B')) errors.push('missing trigger for r3_q1_control option B')

if (errors.length) {
  errors.forEach(e => console.error('[verify-round4-coverage]', e))
  process.exit(1)
}

console.log('[verify-round4-coverage] OK')
