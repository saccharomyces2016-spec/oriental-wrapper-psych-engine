/**
 * elementNarrative.v1.js
 * 純敘事輔助：將五行最終向量轉為描述性語句（無建議/判斷）。
 */

const LABEL = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水'
}

const DOM_HINT = {
  wood: '木勢偏強，敘事底色常帶著開局、發散與探索的語氣。',
  fire: '火勢偏強，語境多帶推進、渲染與聚光的質地。',
  earth: '土勢偏強，敘事語感有承載、穩定與緩衝的節奏。',
  metal: '金勢偏強，常見收斂、界定或精修的語氣。',
  water: '水勢偏強，語境裡的感知度與流動感更明顯。'
}

const WEAK_HINT = {
  wood: '木勢較弱，開局或啟動的聲量偏低，相關語句會顯得保守。',
  fire: '火勢較弱，渲染與推進的色彩較淡，語氣更克制。',
  earth: '土勢較弱，承載與黏合的份量較輕，敘事重心可能鬆散。',
  metal: '金勢較弱，界線與精修的筆觸較少，語境偏向留白。',
  water: '水勢較弱，感知與回應的痕跡偏淡，情緒線條較內斂。'
}

function normalize(vec = null) {
  if (!vec || typeof vec !== 'object') return null
  const out = {}
  let sum = 0
  for (const [k, v] of Object.entries(vec)) {
    const key = String(k).toLowerCase()
    const val = Number(v) || 0
    out[key] = val
    sum += val
  }
  if (sum <= 0) return out
  for (const k of Object.keys(out)) out[k] = out[k] / sum
  return out
}

function pickLabel(key) {
  return LABEL[key] || key || '未定'
}

export function buildElementNarrative({ finalElementVector, dominant_element, weakest_element } = {}) {
  const vec = normalize(finalElementVector)
  const domKey = dominant_element ? String(dominant_element).toLowerCase() : null
  const weakKey = weakest_element ? String(weakest_element).toLowerCase() : null

  let elementSummary = ''
  if (vec && Object.keys(vec).length) {
    const dom = domKey || Object.entries(vec).sort((a, b) => (b[1] || 0) - (a[1] || 0))[0]?.[0]
    const weak = weakKey || Object.entries(vec).sort((a, b) => (a[1] || 0) - (b[1] || 0))[0]?.[0]
    if (dom || weak) {
      elementSummary = [
        `盤面重心落在「${pickLabel(dom)}」，`,
        `「${pickLabel(weak)}」聲量相對低。`,
        '此為敘事語境的底色，不影響分數排序。'
      ].join('')
    }
  }

  const dominantHint = domKey && DOM_HINT[domKey] ? DOM_HINT[domKey] : ''
  const weakestCaution = weakKey && WEAK_HINT[weakKey] ? WEAK_HINT[weakKey] : ''

  return { elementSummary, dominantHint, weakestCaution }
}

export default buildElementNarrative
