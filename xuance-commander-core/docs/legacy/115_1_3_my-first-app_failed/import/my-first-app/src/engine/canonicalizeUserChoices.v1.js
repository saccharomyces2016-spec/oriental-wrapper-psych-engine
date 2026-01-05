function toNum(x, def = 0) {
  const n = Number(x)
  return Number.isFinite(n) ? n : def
}

function shallowClone(obj) {
  return obj && typeof obj === 'object' ? { ...obj } : {}
}

export function canonicalizeUserChoice(raw = {}, ctx = {}) {
  const source =
    raw?.type === 'question'
      ? 'bank'
      : raw?.weights
        ? 'legacy'
        : raw?.anchor_key
          ? 'anchors'
          : 'legacy'

  const label = String(raw?.label || raw?.label_zh || raw?.choiceText || '').trim()
  const tag = String(raw?.tag || '').trim()
  const round = typeof raw?.round === 'number' ? raw.round : undefined
  const weights = shallowClone(raw?.weights)
  const meta = {
    pattern_tags: Array.isArray(raw?.pattern_tags)
      ? raw.pattern_tags
      : Array.isArray(raw?.meta?.pattern_tags)
        ? raw.meta.pattern_tags
        : [],
    behavior_facet: raw?.behavior_facet || raw?.meta?.behavior_facet || '',
    signal_key: raw?.signal_key || raw?.meta?.signal_key || '',
    confidence_weight: toNum(raw?.confidence_weight ?? raw?.meta?.confidence_weight, 1)
  }

  return {
    round,
    source,
    id: raw?.id || raw?.questionId || raw?.question_id || '',
    label,
    label_zh: raw?.label_zh || raw?.themeLabelZh || '',
    tag,
    choice_key: raw?.choice_key || raw?.key || '',
    weights,
    meta,
    raw
  }
}

export function canonicalizeUserChoices(rawChoices = [], ctx = {}) {
  if (!Array.isArray(rawChoices)) return []
  return rawChoices.map(rc => canonicalizeUserChoice(rc, ctx))
}

export default canonicalizeUserChoices
