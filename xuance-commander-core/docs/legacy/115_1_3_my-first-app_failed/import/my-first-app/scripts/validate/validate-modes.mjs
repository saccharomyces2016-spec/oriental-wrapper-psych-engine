import { scorePsychometrics } from '../../src/core/psych/scorer.js'
import buildOutputV2 from '../../src/core/content/resultTemplates/readingOutputV2.js'

const legacyInput = {
  resonance: {
    domain: 'career',
    userChoices: [
      { round: 1, label: '事業', weights: { axes: { move: 1 } } },
      { round: 2, label: '卡位之局', weights: { axes: { inward: 1 } } },
      { round: 3, label: '長期疲乏', weights: { elements: { water: 1 } } }
    ]
  }
}

const bankInput = {
  resonance: {
    domain: 'career',
    userChoices: [
      { round: 1, label: '事業' },
      {
        round: 2,
        label: '我會立刻盤點、算清楚、把計畫排出來',
        signal_key: 'control',
        confidence_weight: 0.4
      },
      {
        round: 3,
        label: '覺得身體沉重，想躲回被窩',
        pattern_tags: ['chronic_depletion'],
        behavior_facet: 'withdraw_and_protect',
        confidence_weight: 1.2
      }
    ]
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function runCase(input) {
  const psych = scorePsychometrics(input.resonance)
  const keys = Object.keys(psych || {})
  assert(keys.includes('traits') && keys.includes('axes') && keys.includes('elements'), 'missing core keys')
  const dummyResult = {
    domain_key: input.resonance.domain,
    situation_profile: { top_signals: [], chosen_round2: [] },
    facet_scores: {},
    top_themes: psych?.motherThemes?.hits || [],
    anchors: [],
    debug: { round3_answers: input.resonance.userChoices || [] }
  }
  const outV2 = buildOutputV2(dummyResult, { seed: 1 })
  assert(outV2?.version === 'v2', 'output v2 missing')
  return { psych, outV2 }
}

function main() {
  const legacy = runCase(legacyInput)
  const bank = runCase(bankInput)
  const legacyKeys = Object.keys(legacy.psych)
  const bankKeys = Object.keys(bank.psych)
  assert(legacyKeys.join(',') === bankKeys.join(','), 'schema mismatch between modes')
  console.log('[validate:modes] OK', { modes: ['legacy', 'bank'], fields: legacyKeys })
}

try {
  main()
} catch (err) {
  console.error('[validate:modes] fail:', err.message || err)
  process.exitCode = 1
}
