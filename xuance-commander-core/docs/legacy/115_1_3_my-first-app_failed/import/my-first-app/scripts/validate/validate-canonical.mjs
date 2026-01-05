import { canonicalizeUserChoices } from '../../src/engine/canonicalizeUserChoices.v1.js'

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

const samples = [
  {
    type: 'question',
    round: 3,
    id: 'q-loss-1',
    label: '覺得身體沉重，想躲回被窩',
    pattern_tags: ['chronic_depletion'],
    confidence_weight: 1.2,
    behavior_facet: 'withdraw_and_protect'
  },
  {
    round: 2,
    id: 'r2_s02_money_pressure',
    label: '我會立刻盤點、算清楚、把計畫排出來',
    signal_key: 'control',
    confidence_weight: 0.4
  },
  {
    round: 1,
    id: 'legacy_choice',
    weights: { axes: { move: 1 }, elements: { wood: 1 } },
    label: 'legacy flow'
  }
]

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function checkMeta(meta = {}, path) {
  if (meta.behavior_facet) assert(FACETS.has(meta.behavior_facet), `${path}: invalid behavior_facet ${meta.behavior_facet}`)
  if (meta.signal_key) assert(SIGNALS.has(meta.signal_key), `${path}: invalid signal_key ${meta.signal_key}`)
  if (meta.pattern_tags) {
    for (const t of meta.pattern_tags) {
      if (!THEMES.has(t)) throw new Error(`${path}: invalid pattern_tag ${t}`)
    }
  }
  if (meta.confidence_weight !== undefined) {
    const n = Number(meta.confidence_weight)
    assert(Number.isFinite(n), `${path}: confidence_weight not number`)
    assert(n >= 0, `${path}: confidence_weight negative`)
  }
}

function main() {
  const canonical = canonicalizeUserChoices(samples, {})
  canonical.forEach((c, idx) => {
    assert(typeof c.source === 'string', `c${idx}: source missing`)
    if (c.round !== undefined) assert(typeof c.round === 'number', `c${idx}: round not number`)
    assert(c.meta, `c${idx}: meta missing`)
    checkMeta(c.meta, `c${idx}`)
  })
  console.log('[validate:canonical] OK', { count: canonical.length })
}

main()
