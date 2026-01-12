// src/core/guidance/buildGuidance.js
import interventionsDB from './interventions.json'
import chainsDB from './chains.json'
import guidancePrinciplesDB from '../ontology/guidancePrinciples.v1.json'
import motherThemesDB from '../ontology/motherThemes.v1.json'
import guidanceActionTemplatesDB from '../ontology/guidanceActionTemplates.v1.json'
import resultLexicon from '../ontology/resultLexicon.v1.json'

/**
 * L6 Guidance（給 05 用）
 * 優先用「母題」(byTheme) → 其次才走舊的 domains/chains 格式（相容）
 */
export function buildGuidance({ birth, resonance, psych, insights }) {
  const domainKey = psych?.input?.domain || resonance?.domain || 'self'
  const topElements = Array.isArray(psych?.archetype?.topElements) ? psych.archetype.topElements : []
  const age = deriveAgeFromBirth(birth)
  const ageBand = toAgeBand(age)

  // ✅ 取母題 top（你現在結構：psych.motherThemes = { hits, top, debug }）
  const mt = psych?.motherThemes
  const topThemes = Array.isArray(mt?.top) ? mt.top : (Array.isArray(mt) ? mt : [])
  const mtHits = Array.isArray(mt?.hits) ? mt.hits : []

  // ✅ 中文母題標籤 → interventions/chains 的 byTheme key
  const THEME_LABEL_TO_KEY = {
    '控制與失控恐懼': 'control_need',
    '安全感缺口': 'attachment_insecurity',
    // 目前沒有專用 key，暫映射到最接近的；若新增 commitment_anxiety 再調整此處
    '承諾壓力與未來焦慮': 'avoidance_procrastination'
  }

  const themeKeys = topThemes
    .map((t) => {
      const raw = String(t?.key || t?.id || t?.name || t?.label || '').trim()
      return THEME_LABEL_TO_KEY[raw] || raw
    })
    .filter(Boolean)
    .slice(0, 3) // ✅ A) byTheme（你現在 interventions.json / chains.json 的格式）

  const recsByPrinciples = buildRecommendationsFromPrinciples(mtHits, ageBand)
  const recsByTheme = recsByPrinciples.length ? recsByPrinciples : buildRecommendationsByTheme(themeKeys)
  const chainsByTheme = buildChainsByTheme(themeKeys)

  // ✅ B) 舊版相容：domains / chains[]
  const domainsRoot =
    interventionsDB?.domains && typeof interventionsDB.domains === 'object'
      ? interventionsDB.domains
      : null

  const domainCfg = domainsRoot?.[domainKey] || null
  const recsByDomain = pickRecommendationsFromDomain(domainCfg, topElements)
  const chainsByDomain = pickChainsFromArray(domainKey, topElements)

  // ✅ 最終輸出：優先母題，沒有才回退到 domain
  const recommendations = recsByTheme.length ? recsByTheme : recsByDomain
  const chains = chainsByTheme.length ? chainsByTheme : chainsByDomain

  const warnings = [
    '本段為行為建議與風險推演，目的在協助整理與行動。',
    '非醫療、心理治療、法律或投資建議；若有急迫風險，請尋求專業協助。'
  ]

  const riskThemeIds = new Set(['chronic_depletion', 'chronic_alertness', 'unprocessed_loss'])
  if (mtHits.some(h => riskThemeIds.has(h.themeId))) {
    warnings.push('若出現持續失眠、極端疲勞、或身體強烈警訊，請尋求專業協助。')
  }

  return {
    domain: domainKey,
    domainLabel: resonance?.domainLabel || domainKey,

    recommendations: applyResultLexicon({ recommendations, motherThemes: mtHits }).recommendations,
    interventions: recommendations, // 兩個欄位都給，避免 05 寫死其一

    chains: applyResultLexicon({ chains }).chains,
    warnings,

    debug: {
      domainKey,
      topElements,
      themeKeys,
      recCount: recommendations.length,
      chainCount: chains.length,
      mode: recsByTheme.length || chainsByTheme.length ? 'byTheme' : 'byDomainFallback',
      mtHits: mtHits.slice(0, 3),
      age,
      ageBand,
      interventionsKeys: Object.keys(interventionsDB || {}).slice(0, 20),
      chainsKeys: Object.keys(chainsDB || {}).slice(0, 20)
    }
  }
}

/* =========================
 * byTheme：把「母題」翻成建議卡
========================= */
function buildRecommendationsByTheme(themeKeys) {
  const byTheme = interventionsDB?.byTheme || {}
  const out = []

  for (const key of themeKeys) {
    const t = byTheme?.[key]
    if (!t) continue

    out.push({
      id: `theme:${key}`,
      title: t.title || key,
      whatItMeans: t.whatItMeans || '',
      actions: Array.isArray(t.actions) ? t.actions : [],
      avoid: Array.isArray(t.avoid) ? t.avoid : [],
      source: 'byTheme',
      themeKey: key
    })
  }

  return out
}

/* =========================
 * Mother theme -> principles -> micro actions
========================= */
function buildRecommendationsFromPrinciples(themeHits, ageBand) {
  if (!Array.isArray(themeHits) || !themeHits.length) return []
  const themeLookup = new Map(
    Array.isArray(motherThemesDB?.items) ? motherThemesDB.items.map(t => [t.id, t]) : []
  )
  const principlesMap = new Map(
    Array.isArray(guidancePrinciplesDB?.items)
      ? guidancePrinciplesDB.items.map(i => [i.motherThemeId, i.principles || []])
      : []
  )

  const picked = [...themeHits]
    .filter(x => x?.themeId)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 2)

  const out = []

  for (const hit of picked) {
    const principles = principlesMap.get(hit.themeId) || []
    if (!principles.length) continue

    const theme = themeLookup.get(hit.themeId) || {}
    const title = theme.zhLabel || theme.enLabel || hit.themeId
    const tpl = pickActionTemplates(hit.themeId, ageBand)
    const actions = principles.flatMap((pr, idx) => actionsFromTemplates(pr, tpl, idx))

    out.push({
      id: `principle:${hit.themeId}`,
      title: `母題 · ${title}`,
      whatItMeans: theme.description || '',
      actions,
      avoid: [],
      source: 'guidancePrinciples',
      themeId: hit.themeId,
      score: hit.score
    })
  }

  return out
}

function actionsFromTemplates(principle, tplSet, idx = 0) {
  const p = String(principle || '').trim()
  if (!p) return []
  const today = Array.isArray(tplSet.today) ? tplSet.today : []
  const week = Array.isArray(tplSet.week) ? tplSet.week : []

  const pick = (arr) => {
    if (!arr.length) return null
    return arr[idx % arr.length] || arr[0]
  }

  const render = (tpl) => String(tpl || '').replace(/\{\{\s*principle\s*\}\}/gi, p)

  const out = []
  const tToday = pick(today)
  const tWeek = pick(week)
  if (tToday) out.push(render(tToday))
  if (tWeek) out.push(render(tWeek))
  return out
}

function pickActionTemplates(themeId, ageBand) {
  const items = Array.isArray(guidanceActionTemplatesDB?.items) ? guidanceActionTemplatesDB.items : []
  const found = items.find(i => i.motherThemeId === themeId)
  if (!found) return { today: [], week: [] }

  const base = found.actionTemplates || { today: [], week: [] }
  const bands = found.ageBands || {}
  const byBand = ageBand && bands[ageBand] ? bands[ageBand] : bands.any || null

  if (byBand) {
    return {
      today: Array.isArray(byBand.today) && byBand.today.length ? byBand.today : base.today || [],
      week: Array.isArray(byBand.week) && byBand.week.length ? byBand.week : base.week || []
    }
  }

  return { today: base.today || [], week: base.week || [] }
}

/* =========================
 * byTheme：把「母題」翻成連鎖預測
========================= */
function buildChainsByTheme(themeKeys) {
  const byTheme = chainsDB?.byTheme || {}
  const out = []

  // 先只取最核心的 1 條（你要多條就把 slice(0,1) 改大）
  const pick = themeKeys.slice(0, 1)

  for (const key of pick) {
    const t = byTheme?.[key]
    if (!t) continue

    out.push({
      id: `chain:${key}`,
      title: `若母題「${key}」未處理`,
      themeKey: key,
      short: Array.isArray(t.short) ? t.short : [],
      mid: Array.isArray(t.mid) ? t.mid : [],
      long: Array.isArray(t.long) ? t.long : [],
      source: 'byTheme'
    })
  }

  return out
}

/* =========================
 * 舊版相容：domains / chains[]
========================= */
function pickRecommendationsFromDomain(domainCfg, topElements) {
  if (!domainCfg) return []
  const list =
    (Array.isArray(domainCfg?.interventions) ? domainCfg.interventions : null) ||
    (Array.isArray(domainCfg?.recommendations) ? domainCfg.recommendations : null) ||
    (Array.isArray(domainCfg?.items) ? domainCfg.items : null) ||
    []

  if (!list.length) return []

  const scored = list.map((it) => {
    const tags = Array.isArray(it.tags) ? it.tags : []
    const match = topElements.reduce((acc, e) => acc + (tags.includes(e) ? 1 : 0), 0)
    return { ...it, _score: match }
  })

  scored.sort((a, b) => (b._score - a._score))
  return scored.slice(0, 3).map(({ _score, ...rest }) => rest)
}

function pickChainsFromArray(domainKey, topElements) {
  const all =
    (Array.isArray(chainsDB?.chains) ? chainsDB.chains : null) ||
    (Array.isArray(chainsDB) ? chainsDB : null) ||
    []

  if (!all.length) return []

  const pool = all.filter((c) => c && c.domain === domainKey)
  if (!pool.length) return []

  const scored = pool.map((c) => {
    const tags = Array.isArray(c.tags) ? c.tags : []
    const match = topElements.reduce((acc, e) => acc + (tags.includes(e) ? 1 : 0), 0)
    return { ...c, _score: match }
  })

  scored.sort((a, b) => (b._score - a._score))
  const best = scored[0]
  const { _score, ...clean } = best
  return [clean]
}

function deriveAgeFromBirth(birth) {
  const y = Number(birth?.year)
  const m = Number(birth?.month)
  const d = Number(birth?.day)
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null
  const now = new Date()
  let age = now.getFullYear() - y
  const mm = now.getMonth() + 1
  const dd = now.getDate()
  if (mm < m || (mm === m && dd < d)) age -= 1
  if (!Number.isFinite(age) || age < 0 || age > 120) return null
  return age
}

function toAgeBand(age) {
  if (!Number.isFinite(age)) return null
  if (age <= 12) return '0-12'
  if (age <= 18) return '13-18'
  if (age <= 25) return '19-25'
  if (age <= 35) return '26-35'
  if (age <= 45) return '36-45'
  if (age <= 60) return '46-60'
  if (age <= 80) return '61-80'
  return '81-100'
}

/* =========================
 * 顯示語言 formatter
========================= */
const LEX_MT = resultLexicon?.motherThemes || {}
const LEX_FACET = resultLexicon?.behaviorFacets || {}
const LEX_FALLBACK = resultLexicon?.fallback || {}
const DEV = import.meta.env?.DEV
const warnedKeys = new Set()

function applyResultLexicon({ recommendations = [], chains = [], motherThemes = [] } = {}) {
  const recs = recommendations.map((r) => mapRecommendation(r))
  const chs = chains.map((c) => mapChain(c))
  return { recommendations: recs, chains: chs, motherThemes }
}

function mapRecommendation(rec = {}) {
  const mtId = rec.themeId || rec.themeKey || ''
  const lex = mtId && LEX_MT[mtId] ? LEX_MT[mtId] : null
  if (!lex && mtId) warnOnce(`lexicon.motherThemes missing ${mtId}`)
  return {
    ...rec,
    title: lex?.title || rec.title || LEX_FALLBACK.recommendationTitle || '此局',
    whatItMeans: Array.isArray(lex?.interpretation)
      ? lex.interpretation.join(' ')
      : rec.whatItMeans || LEX_FALLBACK.recommendationText || ''
  }
}

function mapChain(chain = {}) {
  const mtId = chain.themeId || chain.themeKey || ''
  const lex = mtId && LEX_MT[mtId] ? LEX_MT[mtId] : null
  if (!lex && mtId) warnOnce(`lexicon.chain missing ${mtId}`)
  return {
    ...chain,
    title: lex?.title ? `若「${lex.title}」未調整` : chain.title || LEX_FALLBACK.chainTitle || '未定之局',
    short: Array.isArray(chain.short) && chain.short.length ? chain.short : [LEX_FALLBACK.chainText || '保持留步觀局。']
  }
}

export function formatBehaviorFacet(facet) {
  const f = String(facet || '').trim()
  if (!f) return LEX_FALLBACK.facet || ''
  if (!LEX_FACET[f]) warnOnce(`lexicon.behaviorFacet missing ${f}`)
  return LEX_FACET[f] || LEX_FALLBACK.facet || ''
}

function warnOnce(msg) {
  if (!DEV) return
  if (warnedKeys.has(msg)) return
  warnedKeys.add(msg)
  console.warn('[resultLexicon]', msg)
}
