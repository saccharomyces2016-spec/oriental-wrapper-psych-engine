/**
 * Single-source of truth for pattern_tag governance.
 * Canonical form: snake_case `[a-z0-9_]+`, lower-case.
 */
import { patternToThemeMap } from './patternToThemeMap.v1.js'

export const PATTERN_TAG_ALIAS_MAP = {
  'boundary_ leak': 'boundary_leak',
  'boundary leak': 'boundary_leak',
  'caregiver _guilt': 'caregiver_guilt',
  'commitment weight': 'commitment_weight',
  'decision-making': 'decision_making',
  'eldest daughter syndrome': 'eldest_daughter_syndrome',
  'emotional contagion': 'emotional_contagion',
  'execution _gap': 'execution_gap',
  'fixer mentality': 'fixer_mentality',
  'hedonic treadmill': 'hedonic_treadmill',
  'herd behavior': 'herd_behavior',
  'imposter syndrome': 'imposter_syndrome',
  'innovation fear': 'innovation_fear',
  'integrity_ anxiety': 'integrity_anxiety',
  'investment fear': 'investment_fear',
  'loss aversion': 'loss_aversion',
  'over _promising': 'over_promising',
  'pleasure denial': 'pleasure_denial',
  'refusal difficulty': 'refusal_difficulty',
  'safety_ behavior': 'safety_behavior',
  'self censorship': 'self_censorship',
  'tall _poppy_ syndrome': 'tall_poppy_syndrome',
  'approval seeking': 'approval_seeking'
}

export function normalizePatternTag(tag = '') {
  if (!tag) return ''
  let t = String(tag || '').trim().toLowerCase()

  // legacy aliases (before clean-up)
  if (PATTERN_TAG_ALIAS_MAP[t]) t = PATTERN_TAG_ALIAS_MAP[t]

  t = t.replace(/[-]+/g, '_')
  t = t.replace(/\s+/g, '_')
  t = t.replace(/_+/g, '_')
  t = t.replace(/[^\da-z_]/g, '')
  t = t.replace(/_+/g, '_').replace(/^_+|_+$/g, '')

  if (PATTERN_TAG_ALIAS_MAP[t]) t = PATTERN_TAG_ALIAS_MAP[t]
  return t
}

const THEME_IDS = [
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
]

const EXTRA_PATTERN_TAGS = [
  'boundary_leak',
  'caregiver_guilt',
  'commitment_weight',
  'eldest_daughter_syndrome',
  'emotional_contagion',
  'execution_gap',
  'fixer_mentality',
  'fomo',
  'hedonic_treadmill',
  'herd_behavior',
  'imposter_syndrome',
  'innovation_fear',
  'integrity_anxiety',
  'investment_fear',
  'loss_aversion',
  'over_promising',
  'pleasure_denial',
  'refusal_difficulty',
  'safety_behavior',
  'self_censorship',
  'tall_poppy_syndrome',
  'approval_seeking',
  'conformity',
  'social_anxiety'
]

export const PATTERN_TAG_ENUMS = Array.from(
  new Set(
    [
      ...Object.keys(patternToThemeMap || {}).map(normalizePatternTag),
      ...THEME_IDS,
      ...Object.values(PATTERN_TAG_ALIAS_MAP).map(normalizePatternTag),
      ...EXTRA_PATTERN_TAGS
    ].filter(Boolean)
  )
).sort()

export default {
  normalizePatternTag,
  PATTERN_TAG_ENUMS,
  PATTERN_TAG_ALIAS_MAP
}
