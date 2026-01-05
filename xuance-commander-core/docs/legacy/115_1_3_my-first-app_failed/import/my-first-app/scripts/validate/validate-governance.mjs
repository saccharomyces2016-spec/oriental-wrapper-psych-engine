import fs from 'fs'

const files = [
  'src/core/ontology/round1Domains.v1.json',
  'src/core/ontology/round2FourSymbol.v1.json',
  'src/core/ontology/round3Ipsative.v2.json',
  'src/core/ontology/round4IntensityTrigger.v1.json'
]

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function validateRound1(data) {
  if (!Array.isArray(data?.items) || data.items.length !== 8) throw new Error('round1Domains items must be 8')
  data.items.forEach(item => {
    if (!item.domain_id) throw new Error('round1Domains missing domain_id')
  })
}

function validateRound2(data) {
  if (!Array.isArray(data?.domains) || data.domains.length !== 8) throw new Error('round2FourSymbol domains must be 8')
  data.domains.forEach(d => {
    if (!Array.isArray(d.options) || d.options.length !== 4) throw new Error(`round2 domain ${d.domain_id} must have 4 options`)
    d.options.forEach(opt => {
      if (!opt?.decoder?.signal_map) throw new Error(`round2 option ${opt.symbol} missing decoder.signal_map`)
    })
  })
}

function validateRound3(data) {
  if (!Array.isArray(data?.questions) || data.questions.length !== 3) throw new Error('round3Ipsative must have 3 questions')
}

function validateRound4(data) {
  const triggers = Array.isArray(data?.triggers) ? data.triggers : []
  if (!triggers.length) throw new Error('round4IntensityTrigger missing triggers')
  const hasA = triggers.some(t => t?.condition?.source_question === 'r3_q1_control' && t?.condition?.selected_option === 'A')
  const hasB = triggers.some(t => t?.condition?.source_question === 'r3_q1_control' && t?.condition?.selected_option === 'B')
  if (!hasA || !hasB) throw new Error('round4IntensityTrigger must cover r3_q1_control A/B')
}

try {
  validateRound1(loadJson(files[0]))
  validateRound2(loadJson(files[1]))
  validateRound3(loadJson(files[2]))
  validateRound4(loadJson(files[3]))
  console.log('[validate:governance] OK')
} catch (err) {
  console.error('[validate:governance] failed:', err.message)
  process.exit(1)
}
