import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/core/ontology')
const round1 = JSON.parse(fs.readFileSync(path.join(base, 'round1Domains.v1.json'), 'utf8'))
const round2 = JSON.parse(fs.readFileSync(path.join(base, 'round2FourSymbol.v1.json'), 'utf8'))
const round3 = JSON.parse(fs.readFileSync(path.join(base, 'round3Ipsative.v2.json'), 'utf8'))
const round4 = JSON.parse(fs.readFileSync(path.join(base, 'round4IntensityTrigger.v1.json'), 'utf8'))

function fail(msg) {
  console.error('[smoke-flow]', msg)
  process.exit(1)
}

const domainId = 'domain_yuan'

// Round1
if (!Array.isArray(round1?.items) || !round1.items.find(i => i.domain_id === domainId)) {
  fail('round1Domains missing domain_yuan')
}

// Round2
const r2Domain = (round2?.domains || []).find(d => d.domain_id === domainId)
if (!r2Domain) fail('round2FourSymbol missing domain_yuan')
if (!Array.isArray(r2Domain.options) || r2Domain.options.length !== 4) {
  fail('round2FourSymbol domain_yuan must have 4 options')
}
r2Domain.options.forEach(opt => {
  if (!opt?.decoder?.signal_map) fail(`round2 option ${opt.symbol} missing decoder.signal_map`)
})

// Round3
if (!Array.isArray(round3?.questions) || round3.questions.length !== 3) {
  fail('round3Ipsative must have 3 questions')
}
round3.questions.forEach(q => {
  if (!Array.isArray(q?.options) || q.options.length !== 2) fail(`round3 question ${q.id} missing A/B`)
})

// Round4
const triggers = Array.isArray(round4?.triggers) ? round4.triggers : []
const hasA = triggers.some(t => t?.condition?.source_question === 'r3_q1_control' && t.condition.selected_option === 'A' && Array.isArray(t.options) && t.options.length)
const hasB = triggers.some(t => t?.condition?.source_question === 'r3_q1_control' && t.condition.selected_option === 'B' && Array.isArray(t.options) && t.options.length)
if (!hasA || !hasB) fail('round4IntensityTrigger missing coverage for r3_q1_control A/B')

console.log('[smoke-flow] OK')
