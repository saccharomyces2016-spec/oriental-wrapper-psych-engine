import { runReading } from '../engine/readingFacade.v1.js'
import { mapToMotherThemes } from './psych/motherThemeMapper.js'
import { buildGuidance } from './guidance/buildGuidance.js'

import { buildNarrativePrompt } from './ai/promptBuilder.js'
import { generateLocalNarrative } from './ai/localNarrative.js'
import { generateAiNarrative } from './ai/aiNarrative.js'

const DEBUG_ORACLE_CACHE =
  String(import.meta.env.VITE_DEBUG_ORACLE_CACHE || '').toLowerCase() === 'true'
const DEBUG_FORCE_ORACLE_FAIL =
  String(import.meta.env.VITE_DEBUG_FORCE_ORACLE_FAIL || '').toLowerCase() === 'true'
const ORACLE_CACHE = new Map()

/* =========================
 * 主入口
 * ========================= */
export async function consultTheOracle({ birth, resonance } = {}) {
  try {
    const cacheKey = makeCacheKey({ birth, resonance })
    if (ORACLE_CACHE.has(cacheKey)) {
      const cached = ORACLE_CACHE.get(cacheKey)
      if (DEBUG_ORACLE_CACHE) console.log('[oracle] cache hit', cacheKey)
      return normalizeDestinyData(cached)
    }

    if (DEBUG_FORCE_ORACLE_FAIL) throw new Error('Forced oracle failure (debug)') // 用來測試 fallback，不用真的把系統弄壞

    const safeResonance = resonance || {}

    // --- L2：心理測量 ---
    const { psych } = await runReading({ resonance: safeResonance })

    // --- M-2-B：母題映射（掛進 psych，不污染 L2 計分）---
    const profile = deriveProfileFromBirth(birth)
    const mappedMotherThemes = mapToMotherThemes({ resonance: safeResonance, profile })
    psych.motherThemes = mergeMotherThemes({
      questionHits: Array.isArray(psych?.motherThemes?.hits) ? psych.motherThemes.hits : [],
      mapped: mappedMotherThemes
    })

    // --- L4：融合推理（規則版骨架） ---
    const fusion = synthesize({ birth, resonance: safeResonance, psych })

    // --- L6：指引/連鎖預測 ---
    const guidance = buildGuidance({ birth, resonance: safeResonance, psych, insights: fusion })

    // --- M-3：提示詞 + 本地 fallback 報告 ---
    const narrativePrompt = buildNarrativePrompt({ psych, insights: fusion, guidance })
    const narrativeTextLocal = generateLocalNarrative({ psych, insights: fusion, guidance })

    // ✅ 把「事實」整理成 AI 的 facts（避免亂編）
    const facts = {
      info: { title: fusion.title, label: fusion.label },
      domain: psych?.input?.domain || safeResonance.domain,
      domainLabel: psych?.input?.domainLabel || safeResonance.domainLabel,
      r2: psych?.input?.r2Label || '',
      r3: Array.isArray(psych?.input?.r3Labels) ? psych.input.r3Labels : [],
      motherThemes: psych?.motherThemes?.top || psych?.motherThemes?.hits || [],
      highlights: fusion.highlights || [],
      guidance: {
        recommendations: guidance?.recommendations || guidance?.interventions || [],
        chains: guidance?.chains || [],
        warnings: guidance?.warnings || []
      }
    }

    // ✅ AI 敘事（失敗自動 fallback 本地）
    const narrative = await generateAiNarrative({
      narrativePrompt,
      facts,
      fallbackText: narrativeTextLocal
    })

    // ✅ 保險：避免 narrative 結構怪掉
    const safeNarrative =
      narrative && (narrative.text || narrative.prompt)
        ? narrative
        : { mode: 'fallback', prompt: narrativePrompt || '', text: narrativeTextLocal || '' }

    // --- M-8.4: 選取錨點語句（含 state_tags 提取與反規律機制）---
    const topMotherThemes = psych?.motherThemes?.top || psych?.motherThemes?.hits || []
    const sessionId = safeResonance?.sessionId || birth?.sessionId || null
    const stateTags = []
    const anchors = {
      primary: null,
      secondary: null,
      debug: { sessionId, topMotherThemes }
    }

    // --- 組裝給前端 ---
    const result = normalizeDestinyData({
      info: { title: fusion.title, label: fusion.label },
      resonance: safeResonance,
      psych,
      insights: {
        text: fusion.text,
        highlights: fusion.highlights,
        imagePrompt: fusion.imagePrompt || ''
      },
      guidance,
      narrative: {
        prompt: safeNarrative.prompt,
        text: safeNarrative.text,
        mode: safeNarrative.mode,
        json: safeNarrative.json || null,
        meta: safeNarrative.meta || {}
      },
      // M-8.4: 加入錨點語句（含 variantKey）
      anchors: {
        primary: anchors.primary ? {
          id: anchors.primary.id,
          text: anchors.primary.text || '',
          variantKey: anchors.primary.variantKey || 'default'
        } : null,
        secondary: anchors.secondary ? {
          id: anchors.secondary.id,
          text: anchors.secondary.text || '',
          variantKey: anchors.secondary.variantKey || 'default'
        } : null,
        debug: DEBUG_ORACLE_CACHE ? anchors.debug : undefined
      }
    }) // 先把輸出整理成安全格式，後面要存快取與回傳

    if (DEBUG_ORACLE_CACHE) console.log('[oracle] cache miss', cacheKey)
    const isFallback = result?.narrative?.mode === 'fallback'
  if (isFallback) {
    if (DEBUG_ORACLE_CACHE) console.log('[oracle] skip cache (fallback)', cacheKey)
  } else {
      ORACLE_CACHE.set(cacheKey, result) // 把結果存起來，下次相同輸入不用重算
      trimOracleCache()
    }
    return result // 把結果回傳給 05_Dashboard 使用
  } catch (error) {
    console.error('[consultTheOracle] fatal:', error)
    return normalizeDestinyData(
      makeFallbackDestinyData({ birth, resonance, error, source: 'consultTheOracle' })
    )
  }
}

function mergeMotherThemes({ questionHits = [], mapped = {} } = {}) {
  const acc = new Map()

  const addHit = (hit, sourceLabel) => {
    if (!hit?.themeId) return
    const prev = acc.get(hit.themeId) || { themeId: hit.themeId, score: 0, reason: [], source: sourceLabel }
    const score = (prev.score || 0) + Number(hit.score || 0)
    const reason = Array.isArray(prev.reason) ? prev.reason.slice() : []
    if (hit.reason?.length) reason.push(...hit.reason)
    acc.set(hit.themeId, { ...prev, score, reason, source: sourceLabel || hit.source })
  }

  // mapped hits (from mapper)
  if (Array.isArray(mapped?.hits)) {
    for (const h of mapped.hits) addHit(h, 'mapped')
  }

  // question-derived hits
  if (Array.isArray(questionHits)) {
    for (const h of questionHits) addHit(h, h.source || 'question')
  }

  const hits = Array.from(acc.values()).sort((a, b) => (b.score || 0) - (a.score || 0))
  const topLen = Array.isArray(mapped?.top) ? mapped.top.length : 6
  const top = hits.slice(0, topLen || 6)

  return {
    hits,
    top,
    debug: {
      mapped,
      questionHits
    }
  }
}

function normalizeDestinyData(data = {}) {
  const info = data.info || {}
  const resonance = data.resonance || {}
  const psych = data.psych || {}
  const insights = data.insights || {}
  const guidance = data.guidance || {}
  const narrative = data.narrative || {}

  return {
    info: {
      title: info.title || '',
      label: info.label || ''
    },
    resonance,
    psych,
    insights: {
      text: insights.text || '',
      highlights: Array.isArray(insights.highlights) ? insights.highlights : [],
      imagePrompt: insights.imagePrompt || ''
    },
    guidance: {
      ...(guidance || {}),
      recommendations: Array.isArray(guidance.recommendations) ? guidance.recommendations : [],
      chains: Array.isArray(guidance.chains) ? guidance.chains : [],
      warnings: Array.isArray(guidance.warnings) ? guidance.warnings : []
    },
    narrative: {
      prompt: narrative.prompt || '',
      text: narrative.text || '',
      mode: narrative.mode || 'fallback',
      json: narrative.json || null,
      meta: buildNarrativeMeta(narrative.meta)
    }
  }
}

function makeFallbackDestinyData({ birth, resonance, error, source = 'unknown' }) {
  const safeResonance = resonance || {}
  const errString = toErrorString(error) || 'Unknown error'
  const src =
    source === 'consultTheOracle' || source === 'aiNarrative' ? source : 'unknown'
  const domainLabel = safeResonance.domainLabel || '此局'
  const userChoices = Array.isArray(safeResonance.userChoices) ? safeResonance.userChoices : []
  const r2 = userChoices?.[1]?.label ? `矛盾：${userChoices[1].label}` : ''
  const r3Labels = userChoices
    .slice(2)
    .map((x) => String(x?.label || '').trim())
    .filter(Boolean)
  const r3 = r3Labels.length ? `細象：${r3Labels.join('、')}` : ''
  const fallbackNarrativeText = [`目前顯示的是保底報告（${domainLabel}）。`, r2, r3]
    .filter(Boolean)
    .join(' ')
  const fallbackInsightText = [
    '系統繁忙或訊號不穩，先提供保底推演讓畫面不中斷。',
    '請稍後重試，或重新提交問題以獲得最新結果。'
  ].join('\n')

  return {
    info: { title: '命盤回響', label: safeResonance.domainLabel || '' },
    resonance: safeResonance,
    psych: { error: errString },
    insights: { text: fallbackInsightText, highlights: [], imagePrompt: '' },
    guidance: { recommendations: [], interventions: [], chains: [], warnings: [] },
    narrative: {
      prompt: '',
      text: fallbackNarrativeText,
      mode: 'fallback',
      json: null,
      meta: {
        error: errString,
        severity: 'recoverable',
        userMessage: '系統繁忙，已改用保底推演結果。',
        errorType: 'fallback',
        status: null,
        timeoutMs: null,
        retried: false,
        source: src,
        time: new Date().toISOString()
      }
    }
  }
}

function toErrorString(error) {
  if (!error) return ''
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message || error.toString()

  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

function buildNarrativeMeta(meta = {}) {
  const m = meta || {}
  const hasErrorType = !!m.errorType
  return {
    error: m.error || '',
    userMessage: m.userMessage || '',
    severity: m.severity || (hasErrorType ? 'recoverable' : ''),
    errorType: m.errorType || null,
    status: typeof m.status === 'number' ? m.status : null,
    timeoutMs: Number.isFinite(m.timeoutMs) ? m.timeoutMs : null,
    retried: !!m.retried,
    source: m.source || '',
    time: m.time || new Date().toISOString()
  }
}

function makeCacheKey({ birth, resonance }) {
  try {
    const keyObj = {
      v: 1,
      birth: birth
        ? {
            year: birth.year,
            month: birth.month,
            day: birth.day,
            hour: birth.hour,
            name: birth.name
          }
        : null,
      resonance: resonance
        ? {
            domain: resonance.domain,
            domainLabel: resonance.domainLabel,
            userChoices: resonance.userChoices
          }
        : null
    }
    return JSON.stringify(keyObj)
  } catch (err) {
    console.warn('[oracle] cache key stringify failed, fallback to timestamp', err)
    return `fallback-${Date.now()}`
  }
}

function trimOracleCache() {
  const MAX = 20
  if (ORACLE_CACHE.size <= MAX) return
  const oldestKey = ORACLE_CACHE.keys().next().value
  ORACLE_CACHE.delete(oldestKey)
}

export function clearOracleCache() {
  ORACLE_CACHE.clear()
  if (DEBUG_ORACLE_CACHE) console.log('[oracle] cache cleared')
}

export function getOracleCacheSize() {
  return ORACLE_CACHE.size
}

/* =========================
 * M-2-B 小工具：從 birth 推 profile（可缺省）
 * ========================= */
function deriveProfileFromBirth(birth) {
  const gender = String(birth?.gender || 'any').trim() || 'any'

  const y = Number(birth?.year)
  const m = Number(birth?.month)
  const d = Number(birth?.day)

  let age = null
  if (Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)) {
    const now = new Date()
    let a = now.getFullYear() - y
    const mm = now.getMonth() + 1
    const dd = now.getDate()
    if (mm < m || (mm === m && dd < d)) a -= 1
    if (Number.isFinite(a) && a >= 0 && a <= 120) age = a
  }

  return { gender, age }
}

/* =========================
 * L4：融合層（The Alchemist）
 * ========================= */
function synthesize({ birth, resonance, psych }) {
  const domain = psych?.input?.domain || ''
  const r2Label = psych?.input?.r2Label || ''
  const r3Labels = psych?.input?.r3Labels || []

  const {
    drive,
    control,
    stabilityNeed,
    sensitivity,
    riskAversion,
    innerTension
  } = psych.traits || {}

  // ===== 標題 / 卦象名（05 Header 用）=====
  const title =
    domain === 'money'
      ? '財局回響'
      : domain === 'relationship'
        ? '情局回響'
        : '命盤回響'

  const label = makeLabel({ domain, innerTension, riskAversion })

  // ===== 主文（白話＋命理感，不走文言）=====
  const lines = []

  if (domain === 'money') {
    if (riskAversion >= 0.7) {
      lines.push('你現在卡住的，不是賺不賺得到，而是「一旦選錯，會不會全盤皆輸」。')
    } else {
      lines.push('你並非沒有財路，而是財路一出現，你就開始計算失去的可能。')
    }
  } else if (domain === 'relationship') {
    if (control >= 0.65) {
      lines.push('你不是不想靠近，是你很怕在關係裡失去主動權。')
    } else {
      lines.push('你想要連結，但你更怕：靠近後才發現自己不被珍惜。')
    }
  } else {
    lines.push('你不是缺答案，而是每個答案都伴隨代價。')
  }

  lines.push('你的內在同時存在「推進」與「保護」兩股力量，這讓你在關鍵時刻容易停在臨界點。')

  if (innerTension >= 0.65) {
    lines.push('這種拉扯感不是偶發，而是你長期的決策模式。')
  }

  if (r2Label) {
    lines.push(`你在第二回合選的「${r2Label}」，正是這個模式最明顯的出口。`)
  }

  if (r3Labels.length) {
    lines.push(`而你後續點的「${r3Labels.join('、')}」，並不是細節，而是觸發器。`)
  }

  lines.push('這不是要你立刻改變，而是讓你看清：你一直在替未來的自己，提前承擔風險。')

  const highlights = [
    innerTension >= 0.65 ? '內在拉扯強，決策成本高' : '內在相對一致，行動阻力較小',
    riskAversion >= 0.7 ? '風險敏感度高，偏向先求不敗' : '能承擔不確定性，較敢嘗試',
    control >= 0.65 ? '需要明確界線，失控會引發焦慮' : '界線彈性高，關係或局勢變化容忍度高'
  ]

  const imagePrompt = buildImagePrompt({ domain, psych })

  return {
    title,
    label,
    text: lines.join('\n\n'),
    highlights,
    imagePrompt
  }
}

/* =========================
 * L4 小工具
 * ========================= */
function makeLabel({ domain, innerTension, riskAversion }) {
  if (domain === 'money') {
    if (innerTension >= 0.65 && riskAversion >= 0.65) return '守中待變'
    if (riskAversion >= 0.65) return '慎行之局'
    return '動中求穩'
  }
  if (domain === 'relationship') {
    if (innerTension >= 0.65) return '進退相持'
    if (riskAversion >= 0.65) return '自保為先'
    return '情勢可進'
  }
  return '勢未定型'
}

function buildImagePrompt({ domain, psych }) {
  const elems = psych?.archetype?.topElements?.join(', ') || 'balanced'
  if (domain === 'money') {
    return `dark cosmic chart, gold accents, ${elems} elements, sense of calculation and restraint`
  }
  if (domain === 'relationship') {
    return `dark cosmic chart, soft gold light, ${elems} elements, tension between distance and closeness`
  }
  return `dark cosmic chart, minimal gold lines, ${elems} elements`
}

/**
 * ✅ 02_Input.vue 需要的：把使用者輸入轉成「出生資料」(最小可用版)
 * 之後要接姓名學/八字/真太陽時校正，都可以在這裡擴充
 */
export function calculateInnate(form) {
  const year = Number(form?.year)
  const month = Number(form?.month)
  const day = Number(form?.day)

  const hourRaw = form?.hour
  const hour =
    hourRaw === '' || hourRaw === null || hourRaw === undefined
      ? -1
      : Number(hourRaw)

  if (!form?.name || !Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error('Invalid birth form payload')
  }

  return {
    name: String(form.name).trim(),
    year,
    month,
    day,
    hour,
    meta: {
      source: '02_Input',
      tz: 'Asia/Taipei'
    }
  }
}
