// src/core/domainScoring.js
// 目的：把 03 累積到的 elements / axes，轉成
// - domainProb（8 大領域機率）
// - domainTop（TOP2）
// - evidence（給 05 做「驗證句 / 避忌 / 解剖」）

const DOMAINS = ['career', 'relationship', 'social', 'study', 'money', 'family', 'health', 'self']

// 每個領域的「傾向」：不是八字，是我們系統的心理-命理混合權重
// elements: wood fire earth metal water
// axes: move inward heat damp boundary  (0~1 偏好)
const DOMAIN_PROFILE = {
  career: {
    e: { metal: 0.9, fire: 0.5, wood: 0.4, earth: 0.3, water: 0.2 },
    a: { move: 0.75, boundary: 0.60, inward: 0.35, heat: 0.55, damp: 0.35 }
  },
  relationship: {
    e: { water: 0.8, wood: 0.6, fire: 0.45, earth: 0.35, metal: 0.25 },
    a: { inward: 0.70, heat: 0.55, boundary: 0.45, move: 0.35, damp: 0.45 }
  },
  social: {
    e: { wood: 0.75, fire: 0.55, water: 0.35, earth: 0.30, metal: 0.25 },
    a: { move: 0.60, boundary: 0.40, inward: 0.35, heat: 0.55, damp: 0.40 }
  },
  study: {
    e: { metal: 0.55, water: 0.55, wood: 0.45, earth: 0.35, fire: 0.30 },
    a: { inward: 0.65, boundary: 0.55, move: 0.35, heat: 0.35, damp: 0.40 }
  },
  money: {
    e: { earth: 0.75, metal: 0.65, water: 0.55, wood: 0.35, fire: 0.30 },
    a: { boundary: 0.70, inward: 0.55, move: 0.45, heat: 0.35, damp: 0.45 }
  },
  family: {
    e: { earth: 0.80, wood: 0.55, water: 0.45, metal: 0.30, fire: 0.25 },
    a: { inward: 0.65, boundary: 0.55, move: 0.30, heat: 0.35, damp: 0.55 }
  },
  health: {
    e: { water: 0.70, earth: 0.55, wood: 0.45, metal: 0.35, fire: 0.35 },
    a: { inward: 0.75, damp: 0.60, heat: 0.45, boundary: 0.45, move: 0.25 }
  },
  self: {
    e: { metal: 0.55, water: 0.55, fire: 0.50, wood: 0.40, earth: 0.35 },
    a: { inward: 0.70, boundary: 0.55, move: 0.45, heat: 0.50, damp: 0.40 }
  }
}

function safeNum(x) {
  const n = Number(x)
  return Number.isFinite(n) ? n : 0
}

function normalize01Map(map, floor = 0.02) {
  const keys = Object.keys(map)
  const vals = keys.map(k => Math.max(0, safeNum(map[k])))
  const sum = vals.reduce((a, b) => a + b, 0)
  if (sum <= 1e-9) {
    const uni = 1 / keys.length
    const out = {}
    keys.forEach(k => (out[k] = uni))
    return out
  }
  const out = {}
  keys.forEach((k, i) => {
    out[k] = Math.max(floor, vals[i] / sum)
  })
  // 再正規化一次（因為加了 floor）
  const sum2 = keys.reduce((a, k) => a + out[k], 0)
  keys.forEach(k => (out[k] = out[k] / sum2))
  return out
}

function clamp01(n) {
  return Math.max(0, Math.min(1, safeNum(n)))
}

function normalizeAxes01(axes) {
  // 軸向量你在 03 是累加的，這裡轉成 0~1
  // 做法：用 sigmoid-ish 壓縮（不需要依賴 max）
  const k = (x) => {
    const v = safeNum(x)
    // 0 → 0.5；正值往 1；負值往 0
    const t = 1 / (1 + Math.exp(-v / 2.2))
    return clamp01(t)
  }

  return {
    move: k(axes?.move),
    inward: k(axes?.inward),
    heat: k(axes?.heat),
    damp: k(axes?.damp),
    boundary: k(axes?.boundary)
  }
}

function dotE(v, profile) {
  return (
    safeNum(v.wood) * safeNum(profile.wood) +
    safeNum(v.fire) * safeNum(profile.fire) +
    safeNum(v.earth) * safeNum(profile.earth) +
    safeNum(v.metal) * safeNum(profile.metal) +
    safeNum(v.water) * safeNum(profile.water)
  )
}

function dotA(v, profile) {
  return (
    safeNum(v.move) * safeNum(profile.move) +
    safeNum(v.inward) * safeNum(profile.inward) +
    safeNum(v.heat) * safeNum(profile.heat) +
    safeNum(v.damp) * safeNum(profile.damp) +
    safeNum(v.boundary) * safeNum(profile.boundary)
  )
}

function softmax(obj) {
  const keys = Object.keys(obj)
  const vals = keys.map(k => safeNum(obj[k]))
  const m = Math.max(...vals)
  const exps = vals.map(v => Math.exp(v - m))
  const sum = exps.reduce((a, b) => a + b, 0) || 1
  const out = {}
  keys.forEach((k, i) => (out[k] = exps[i] / sum))
  return out
}

export function scoreDomains({ elements, axes, anchors = [], confidence = 0.72 } = {}) {
  const eNorm = normalize01Map({
    wood: elements?.wood,
    fire: elements?.fire,
    earth: elements?.earth,
    metal: elements?.metal,
    water: elements?.water
  })

  const aNorm = normalizeAxes01(axes || {})

  // evidence：top2 element、最低 element、軸值
  const eSorted = Object.entries(eNorm).sort((a, b) => b[1] - a[1])
  const topElements = eSorted.slice(0, 2).map(x => x[0])
  const suppressedElement = eSorted[eSorted.length - 1][0]

  // domain raw score
  const raw = {}
  for (const d of DOMAINS) {
    const p = DOMAIN_PROFILE[d]
    const se = dotE(eNorm, p.e)     // 0~1-ish
    const sa = dotA(aNorm, p.a)     // 0~1-ish

    // anchors：若使用者最後選的錨點包含此領域，給小幅加成（但不讓它暴衝）
    const anchorHit = Array.isArray(anchors)
      ? anchors.some(x => String(x || '').includes(domainLabelHint(d)))
      : false

    const anchorBoost = anchorHit ? 0.08 : 0
    raw[d] = se * 0.58 + sa * 0.42 + anchorBoost
  }

  const domainProb = softmax(raw)
  const domainTop = Object.entries(domainProb)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(x => x[0])

  return {
    domainTop,
    domainProb,
    confidence: clamp01(confidence),
    evidence: {
      topElements,
      suppressedElement,
      axes: aNorm
    }
  }
}

function domainLabelHint(domainKey) {
  // 這是「弱耦合」比對：你的 05 顯示的是中文 label（例如 財氣之流）
  // anchors 傳入的是 label 字串（你 03 finalize 用 selectedAnchors.map(a=>a.label)）
  // 所以這裡用關鍵字去對
  const map = {
    career: '業',
    relationship: '情',
    social: '交',
    study: '文',
    money: '財',
    family: '家',
    health: '形',
    self: '心'
  }
  return map[domainKey] || ''
}