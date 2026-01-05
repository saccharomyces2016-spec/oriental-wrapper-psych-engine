#!/usr/bin/env node
import round1Domains from '../src/core/ontology/round1Domains.v1.json' with { type: 'json' }
import round2FourSymbol from '../src/core/ontology/round2FourSymbol.v1.json' with { type: 'json' }
import round3Ipsative from '../src/core/ontology/round3Ipsative.v2.json' with { type: 'json' }
import round4IntensityTrigger from '../src/core/ontology/round4IntensityTrigger.v1.json' with { type: 'json' }

function assert(condition, msg) {
  if (!condition) throw new Error(msg)
}

function main() {
  const domains = Array.isArray(round1Domains?.domains)
    ? round1Domains.domains
    : Array.isArray(round1Domains?.items)
        ? round1Domains.items
        : []
  assert(domains.length === 8, `[smoke][r1] expected 8 domains, got ${domains.length}`)
  domains.forEach(d => assert(/^domain_/.test(d?.id || d?.domain_id || ''), `[smoke][r1] non-canonical id ${d?.id || d?.domain_id}`))

  const r2Domains = Array.isArray(round2FourSymbol?.domains) ? round2FourSymbol.domains : []
  assert(r2Domains.length === 8, `[smoke][r2] expected 8 domains, got ${r2Domains.length}`)
  r2Domains.forEach(d => {
    assert(Array.isArray(d?.options) && d.options.length === 4, `[smoke][r2] domain ${d?.domain_id} options ${d?.options?.length}`)
    d.options.forEach(opt => {
      const sm = opt?.decoder?.signal_map
      assert(sm && ['qi', 'shi', 'jie', 'dong'].every(k => typeof sm[k] === 'string'), `[smoke][r2] missing signal_map for ${d?.domain_id}/${opt?.symbol}`)
    })
  })

  const qs = Array.isArray(round3Ipsative?.questions) ? round3Ipsative.questions : []
  assert(qs.length === 3, `[smoke][r3] expected 3 questions, got ${qs.length}`)
  const expectedIds = ['r3_q1_control', 'r3_q2_risk', 'r3_q3_boundary']
  expectedIds.forEach(id => assert(qs.find(q => q.id === id), `[smoke][r3] missing ${id}`))
  qs.forEach(q => assert(Array.isArray(q.options) && q.options.length === 2, `[smoke][r3] ${q.id} options invalid`))

  const triggers = Array.isArray(round4IntensityTrigger?.triggers) ? round4IntensityTrigger.triggers : []
  const byCond = c => triggers.find(t => t?.condition?.source_question === 'r3_q1_control' && t?.condition?.selected_option === c)
  const triggerA = byCond('A')
  const triggerB = byCond('B')
  assert(triggerA && Array.isArray(triggerA.options) && triggerA.options.length > 0, '[smoke][r4] missing options for control A')
  assert(triggerB && Array.isArray(triggerB.options) && triggerB.options.length > 0, '[smoke][r4] missing options for control B')

  console.log('[smoke-ui-governance] OK')
}

try {
  main()
} catch (err) {
  console.error('[smoke-ui-governance] FAIL', err?.message || err)
  process.exit(1)
}
