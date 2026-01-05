import { buildElementNarrative } from '../narrative/elementNarrative.v1.js'

const DOMAIN_LABELS = {
  love: '情勢之局',
  body: '身體之局',
  home: '家宅之局',
  career: '事業之局',
  money: '財動之局',
  mind: '心智之局',
  path: '路徑之局',
  luck: '運勢之局'
}

const BANNED_PHRASES = [
  '你不是不努力',
  '你不是想太多',
  '其實你只是',
  '你一直以來都',
  '你天生就是',
  '這不是你的錯',
  '你只是',
  '你應該'
]

function safeTop(arr, n = 3) {
  if (!Array.isArray(arr)) return []
  return arr.slice(0, n).filter(Boolean)
}

function pickTopFacet(facets = {}) {
  const entries = Object.entries(facets || {})
    .map(([facet, score]) => ({ facet, score: Number(score) || 0 }))
    .sort((a, b) => b.score - a.score)
  return entries.slice(0, 3)
}

function seedRng(seed = 1) {
  let v = seed >>> 0
  return () => {
    v = (v * 1664525 + 1013904223) % 4294967296
    return v / 4294967296
  }
}

function pick(arr, rng) {
  if (!Array.isArray(arr) || !arr.length) return ''
  const idx = Math.floor((rng ? rng() : Math.random()) * arr.length)
  return arr[idx] || arr[0]
}

function sanitize(text, fallback) {
  if (!text) return fallback || ''
  for (const banned of BANNED_PHRASES) {
    if (text.includes(banned)) return fallback || text.replace(banned, '')
  }
  return text
}

export function buildReadingNarrative(readingResult, opts = {}) {
  if (!readingResult || typeof readingResult !== 'object') return null
  const rng = seedRng(typeof opts.seed === 'number' ? opts.seed : Date.now())

  const domainKey = readingResult.domain_key || '當下'
  const domainLabel = DOMAIN_LABELS[domainKey] || domainKey
  const signals = safeTop(readingResult?.situation_profile?.top_signals, 3)
  const themes = safeTop(readingResult?.top_themes, 3)
  const facets = pickTopFacet(readingResult?.facet_scores)

  const leadSignal = signals[0]?.signal_key || '未明信號'
  const leadTheme = themes[0]?.theme_id || '未定母題'
  const leadFacet = facets[0]?.facet || '未定節奏'
  const finalElementVector =
    readingResult?.metaphysics?.finalElementVector ||
    readingResult?.outputV2?.meta?.final_element_vector ||
    null
  const dominantElement =
    readingResult?.metaphysics?.elementPrior?.dominant ||
    readingResult?.outputV2?.meta?.element_prior?.dominant ||
    null
  const weakestElement =
    readingResult?.metaphysics?.elementPrior?.weakest ||
    readingResult?.outputV2?.meta?.element_prior?.weakest ||
    null
  const elementNarrative = buildElementNarrative({
    finalElementVector,
    dominant_element: dominantElement,
    weakest_element: weakestElement
  })

  const whereTemplates = [
    `盤面落在「${domainLabel}」，重力點來自 ${leadSignal}，節奏略向 ${leadFacet} 傾斜。`,
    `${domainLabel} 正成局，${leadSignal} 佔上風，其他訊號圍繞它運行。`,
    `${domainLabel} 的盤面正在收斂，主導訊號是 ${leadSignal}，節點由 ${leadFacet} 掌握。`,
    `${leadSignal} 把 ${domainLabel} 拉成一個偏向 ${leadFacet} 的局，仍有調整空間。`,
    `此局核心是 ${leadSignal}，位置在「${domainLabel}」，權重落在 ${leadFacet} 軸上。`,
    `整體像一張向 ${leadSignal} 傾斜的網，節奏點在 ${leadFacet}，範圍是「${domainLabel}」。`,
    `${domainLabel} 的局被 ${leadSignal} 拉緊，支撐點在 ${leadFacet}，尚未封死。`,
    `盤面鎖在 ${domainLabel}，${leadSignal} 是主要訊噪，${leadFacet} 成為節奏閥門。`,
    `${domainLabel} 目前由 ${leadSignal} 定調，${leadFacet} 在其中扮演節奏調節。`,
    `局勢集中在「${domainLabel}」，${leadSignal} 拉扯，${leadFacet} 承壓。`
  ]

  const whyTemplates = [
    `${leadSignal} 的訊號在同一軸上反覆累積，優先序因此偏向 ${leadFacet}。`,
    `多個訊號疊在 ${leadSignal} 上，導致資源分配與 ${leadFacet} 方向同步。`,
    `此局來源是對 ${leadSignal} 的持續回應，節奏被鎖在 ${leadFacet} 的處理路徑。`,
    `過往決策多圍繞 ${leadSignal} 排序，讓 ${leadFacet} 位置承擔更多。`,
    `${leadSignal} 長期佔用頻寬，其他訊號只能沿著 ${leadFacet} 的節奏排隊。`,
    `以 ${leadSignal} 為主的輸入堆疊，讓 ${leadFacet} 成為分配節點而漸漸固定。`,
    `因應 ${leadSignal} 的策略重複使用，局面自然收束到 ${leadFacet} 軌道。`,
    `在 ${domainLabel}，${leadSignal} 成為排序標準，其他元素被迫跟著 ${leadFacet}。`,
    `你並未預設結果，但 ${leadSignal} 的訊號權重過高，使 ${leadFacet} 成為既定路徑。`,
    `局勢累積方式很一致：先回應 ${leadSignal}，再沿 ${leadFacet} 調度，久而久之形成慣性。`
  ]

  const nextTemplates = [
    `鬆動點：在 ${leadFacet} 的節奏上插入一個空白時段，讓 ${leadSignal} 的輸入降低。`,
    `鬆動點：改變 ${leadFacet} 的排序規則，先處理非 ${leadSignal} 的訊號一次。`,
    `鬆動點：把 ${leadSignal} 的資料源暫停或降頻，觀察 ${leadFacet} 是否自動換軌。`,
    `鬆動點：將 ${leadFacet} 的承重交給次要訊號，測試盤面是否重新分配。`,
    `鬆動點：把 ${leadFacet} 的決策拆小一級，降低 ${leadSignal} 對整局的牽制。`,
    `鬆動點：在 ${domainLabel} 裡設定一個「不回應 ${leadSignal}」的時間窗，看節奏如何改變。`,
    `鬆動點：把 ${leadFacet} 的指標換成量化數據，減少 ${leadSignal} 帶來的主觀噪音。`,
    `鬆動點：讓第二訊號暫時領頭，觀察 ${leadFacet} 位置是否鬆開。`,
    `鬆動點：縮短 ${leadFacet} 的迴圈時間，避免 ${leadSignal} 把節奏拉太長。`,
    `鬆動點：為 ${leadFacet} 設一個上限，防止 ${leadSignal} 佔滿所有空間。`
  ]

  const whereLine = sanitize(pick(whereTemplates, rng), whereTemplates[0])
  const whyLine = sanitize(pick(whyTemplates, rng), whyTemplates[0])
  const whyLine2 = sanitize(pick(whyTemplates.filter(t => t !== whyLine), rng), whyTemplates[1] || whyTemplates[0])

  const next1 = sanitize(pick(nextTemplates, rng), nextTemplates[0])
  const next2 = sanitize(pick(nextTemplates.filter(t => t !== next1), rng), nextTemplates[1] || nextTemplates[0])
  const next3 = sanitize(
    pick(nextTemplates.filter(t => t !== next1 && t !== next2), rng),
    nextTemplates[2] || nextTemplates[0]
  )
  const elementLines = []
  if (elementNarrative?.elementSummary) elementLines.push(sanitize(elementNarrative.elementSummary, elementNarrative.elementSummary))
  if (elementNarrative?.dominantHint) elementLines.push(sanitize(elementNarrative.dominantHint, elementNarrative.dominantHint))
  if (elementNarrative?.weakestCaution) elementLines.push(sanitize(elementNarrative.weakestCaution, elementNarrative.weakestCaution))

  return {
    whereLine,
    whyLines: [whyLine, whyLine2, ...elementLines],
    nextLines: [next1, next2, next3]
  }
}

export default buildReadingNarrative
