#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const root = process.cwd()
const logCandidates = [path.join(root, '_telemetry.log'), path.join(root, 'scripts/_telemetry.log')]
const logPath = logCandidates.find(p => fs.existsSync(p))

if (!logPath) {
  console.log('[analytics] _telemetry.log 不存在，已安全退出')
  process.exit(0)
}

const reportsDir = path.join(root, 'reports')
fs.mkdirSync(reportsDir, { recursive: true })

// M-7.6: Formalized thresholds and weighted signals
const THRESHOLDS = {
  // Dwell time bands (ms)
  tooFast: 2000,        // < 2s: too fast, possible random click
  dwellBand: {          // Normal range
    low: 3000,
    high: 12000
  },
  tooSlow: 15000,       // > 15s: cognitive overload indicator
  
  // Change count thresholds
  changeCount: {
    low: 0.5,           // Average change count threshold for low risk
    high: 2.0           // High change count threshold
  },
  
  // Risk scoring weights
  weights: {
    tooFast: 1.0,       // Weight for too fast events
    tooSlow: 2.0,       // Weight for too slow events
    highChange: 1.5     // Weight for high change count events
  },
  
  // Streak detection
  streak: {
    overloadLen: 3      // Consecutive "hard" choices to mark session overload
  },
  
  // Legacy thresholds (kept for backward compatibility)
  dwellMs: 12000,
  hesitantRate: 0.35,
  changeCountAvg: 1.5,
  extremeShare: 0.75
}

const MIN_SAMPLE_FOR_EXTREME = 8

// M-7.5: 資料量門檻
const MIN_EVENTS_PER_QUESTION = 20
const MIN_SESSIONS = 30
const MIN_PURCHASE_FUNNEL_VIEWS = 50

const ontologyDir = path.join(root, 'src/core/ontology')
const questionBank = readJson(path.join(ontologyDir, 'questionBank.v1.json'))
const motherThemes = readJson(path.join(ontologyDir, 'motherThemes.v1.json'))
const resultLexicon = readJson(path.join(ontologyDir, 'resultLexicon.v1.json'))

const behaviorFacetKeys = Object.keys(resultLexicon?.behaviorFacets || {})
const themeTitleMap = buildThemeTitleMap(motherThemes, resultLexicon)
const questionIndex = buildQuestionIndex(questionBank)
const facetTemplate = buildFacetTemplate(behaviorFacetKeys)

const summary = {
  totals: {
    eventsTotal: 0,
    parseErrors: 0,
    sessions: 0,
    choices: 0,
    reports: 0,
    errors: 0
  },
  qb_choice: {
    avgDwellMs: 0,
    p50DwellMs: 0,
    hesitantRate: 0,
    avgChangeCount: 0
  },
  errors: {
    topMessages: []
  },
  user_report: {
    byCategory: {},
    byStage: {}
  },
  stage_view: {
    byStage: {}
  }
}

const choiceDwell = []
const choiceChangeCounts = []
let choiceHesitantCount = 0

const errorCounts = new Map()
const themeStats = new Map()
const questionStats = new Map()
const tagStats = new Map()
const funnelCounters = {
  paywall_view: 0,
  paywall_click: 0,
  checkout_start: 0,
  purchase_success: 0,
  byPlan: new Map(),
  bySourceStage: new Map()
}

// M-7.6: Session-level streak detection
const sessionChoices = [] // { sessionId, questionId, ts, dwellMs, changeCount }
const sessionOverloadFlags = new Map() // sessionId -> boolean

async function main() {
  await processLog()
  detectSessionOverloads() // M-7.6: Detect session overload streaks
  finalizeSummary()
  writeReports()
}

main().catch(err => {
  console.error('[analytics] failed', err)
  process.exit(1)
})

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.warn(`[analytics] failed to load ${filePath}:`, err.message || err)
    return null
  }
}

function buildThemeTitleMap(mt, rl) {
  const map = new Map()
  const motherItems = Array.isArray(mt?.items) ? mt.items : []
  motherItems.forEach(item => {
    const id = safeId(item?.id)
    if (!id) return
    const title = truncate(item?.zhLabel || item?.enLabel || id, 200)
    map.set(id, title)
  })

  const fallback = rl?.motherThemes || {}
  Object.entries(fallback).forEach(([id, val]) => {
    if (map.has(id)) return
    const title = truncate(val?.title || id, 200)
    map.set(id, title)
  })

  return map
}

function buildQuestionIndex(qb) {
  const index = new Map()
  const items = Array.isArray(qb?.items) ? qb.items : []
  items.forEach(item => {
    const themeId = safeId(item?.theme_id)
    const theme_enLabel = truncate(item?.theme_enLabel || '', 200)
    const theme_zhLabel = truncate(item?.theme_zhLabel || '', 200)
    const questions = Array.isArray(item?.questions) ? item.questions : []
    questions.forEach((q, idx) => {
      const id = `q-${themeId || 'unknown'}-${idx}`
      index.set(id, {
        id,
        themeId,
        theme_enLabel,
        theme_zhLabel,
        question_text: truncate(q?.question_text || '', 200),
        pattern_tags: Array.isArray(q?.pattern_tags) ? q.pattern_tags.map(t => truncate(t, 60)) : [],
        choices: Array.isArray(q?.choices) ? q.choices.map(c => truncate(c, 200)) : [],
        choice_meta: Array.isArray(q?.choice_meta)
          ? q.choice_meta.map(m => ({
              choice: truncate(m?.choice || '', 200),
              behavior_facet: truncate(m?.behavior_facet || '', 60)
            }))
          : []
      })
    })
  })
  return index
}

function buildFacetTemplate(keys = []) {
  const tpl = {}
  keys.forEach(k => {
    tpl[k] = 0
  })
  tpl.other = 0
  return tpl
}

async function processLog() {
  const rl = readline.createInterface({
    input: fs.createReadStream(logPath),
    crlfDelay: Infinity
  })

  for await (const rawLine of rl) {
    const line = rawLine.trim()
    if (!line) continue
    let evt
    try {
      evt = JSON.parse(line)
    } catch {
      summary.totals.parseErrors += 1
      continue
    }
    handleEvent(evt)
  }
}

function handleEvent(evt) {
  const eventName = safeId(evt?.event)
  const kind = safeId(evt?.kind)

  if (isPayEvent(eventName)) return handlePayEvent(eventName, evt)
  if (eventName === 'qb_choice') return handleChoice(evt)
  if (eventName === 'qb_session') return handleSession()
  if (eventName === 'user_report') return handleUserReport(evt)
  if (eventName === 'stage_view') return handleStageView(evt)
  if (kind === 'error' || eventName === 'error' || safeId(evt?.type) === 'error') return handleError(evt)
}

function handleChoice(evt) {
  summary.totals.eventsTotal += 1
  summary.totals.choices += 1

  const questionId = safeId(evt?.questionId || evt?.question_id) || 'unknown'
  const themeIdFromEvt = safeId(evt?.themeId || evt?.theme_id) || ''
  const behaviorFacet = safeId(evt?.behaviorFacet) || 'other'

  const dwellMs = toNumber(evt?.dwellMs)
  if (dwellMs !== null) choiceDwell.push(dwellMs)

  const changeCount = toNumber(evt?.changeCount)
  if (changeCount !== null) choiceChangeCounts.push(changeCount)

  const hesitant = !!evt?.hesitant
  if (hesitant) choiceHesitantCount += 1

  // M-7.6: Extract sessionId and ts for streak detection
  const sessionId = safeId(evt?.sessionId || evt?.session_id) || null
  const ts = toNumber(evt?.ts || evt?.timestamp) || Date.now()

  const meta = questionIndex.get(questionId)
  const themeId = meta?.themeId || themeIdFromEvt || 'unknown'

  bumpTheme(themeId, {
    dwellMs,
    hesitant,
    behaviorFacet,
    questionId
  })

  bumpQuestion(questionId, themeId, {
    dwellMs,
    hesitant,
    changeCount,
    behaviorFacet,
    sessionId,
    ts
  })

  bumpTags(meta, { dwellMs, hesitant })
}

function handleSession() {
  summary.totals.eventsTotal += 1
  summary.totals.sessions += 1
}

function handleUserReport(evt) {
  summary.totals.eventsTotal += 1
  summary.totals.reports += 1

  const category = truncate(evt?.category || 'unknown', 60)
  const stage = truncate(String(evt?.stage ?? 'unknown'), 40)

  summary.user_report.byCategory[category] = (summary.user_report.byCategory[category] || 0) + 1
  summary.user_report.byStage[stage] = (summary.user_report.byStage[stage] || 0) + 1
}

function handleStageView(evt) {
  summary.totals.eventsTotal += 1
  const stage = truncate(String(evt?.stage ?? 'unknown'), 40)
  summary.stage_view.byStage[stage] = (summary.stage_view.byStage[stage] || 0) + 1
}

function handleError(evt) {
  summary.totals.eventsTotal += 1
  summary.totals.errors += 1
  const message = truncate(evt?.message || 'unknown error', 120)
  errorCounts.set(message, (errorCounts.get(message) || 0) + 1)
}

function isPayEvent(name) {
  return ['paywall_view', 'paywall_click', 'checkout_start', 'purchase_success'].includes(name)
}

function handlePayEvent(name, evt) {
  summary.totals.eventsTotal += 1
  const planId = truncate(evt?.planId || evt?.plan || 'unknown', 80)
  const priceTier = truncate(evt?.priceTier || evt?.tier || 'unknown', 80)
  const currency = truncate(evt?.currency || '', 12)
  const sourceStage = truncate(evt?.sourceStage || evt?.stage || 'unknown', 60)

  funnelCounters[name] = (funnelCounters[name] || 0) + 1
  bumpFunnelByMap(funnelCounters.byPlan, planId, name)
  bumpFunnelByMap(funnelCounters.bySourceStage, sourceStage, name)

  // preserve experiment tag for grouping if needed in future
}

function bumpFunnelByMap(map, key, eventName) {
  const safeKey = key || 'unknown'
  if (!map.has(safeKey)) {
    map.set(safeKey, {
      key: safeKey,
      paywall_view: 0,
      paywall_click: 0,
      checkout_start: 0,
      purchase_success: 0
    })
  }
  const entry = map.get(safeKey)
  entry[eventName] = (entry[eventName] || 0) + 1
}

function bumpTheme(themeId, { dwellMs, hesitant, behaviorFacet, questionId }) {
  const key = themeId || 'unknown'
  if (!themeStats.has(key)) {
    themeStats.set(key, {
      themeId: key,
      themeTitle: getThemeTitle(key),
      choices: 0,
      dwell: [],
      hesitant: 0,
      facetCounts: { ...facetTemplate },
      questionCounts: new Map()
    })
  }

  const entry = themeStats.get(key)
  entry.choices += 1
  if (dwellMs !== null) entry.dwell.push(dwellMs)
  if (hesitant) entry.hesitant += 1
  const facetKey = behaviorFacetKeys.includes(behaviorFacet) ? behaviorFacet : 'other'
  entry.facetCounts[facetKey] = (entry.facetCounts[facetKey] || 0) + 1
  entry.questionCounts.set(questionId, (entry.questionCounts.get(questionId) || 0) + 1)
}

function bumpQuestion(questionId, themeId, { dwellMs, hesitant, changeCount, behaviorFacet, sessionId, ts }) {
  const key = questionId || 'unknown'
  if (!questionStats.has(key)) {
    const meta = questionIndex.get(key)
    const prompt = truncate(meta?.question_text || key, 40)
    const patternTags = Array.isArray(meta?.pattern_tags) ? meta.pattern_tags : []
    const dist = {}
    if (Array.isArray(meta?.choices)) {
      meta.choices.forEach(c => {
        dist[c] = 0
      })
    }
    dist.unknown = 0

    questionStats.set(key, {
      questionId: key,
      themeId,
      themeTitle: getThemeTitle(themeId),
      prompt,
      choices: 0,
      dwell: [],
      hesitant: 0,
      changeCounts: [],
      riskScores: [], // M-7.6: Collect risk scores
      hardOverloadCount: 0, // M-7.6: Count of events with dwellMs > tooSlow
      highChangeCount: 0, // M-7.6: Count of events with changeCount >= high
      choiceDistribution: dist,
      facetDistribution: { ...facetTemplate },
      patternTags
    })
  }

  const entry = questionStats.get(key)
  entry.themeId = entry.themeId || themeId
  entry.themeTitle = getThemeTitle(entry.themeId)
  entry.choices += 1
  if (dwellMs !== null) entry.dwell.push(dwellMs)
  if (changeCount !== null) entry.changeCounts.push(changeCount)
  if (hesitant) entry.hesitant += 1

  // M-7.6: Calculate risk score for this event
  const riskScore = calculateRiskScore(dwellMs, changeCount)
  entry.riskScores.push(riskScore)

  // M-7.6: Track hard overload and high change events
  if (dwellMs !== null && dwellMs > THRESHOLDS.tooSlow) {
    entry.hardOverloadCount += 1
  }
  if (changeCount !== null && changeCount >= THRESHOLDS.changeCount.high) {
    entry.highChangeCount += 1
  }

  // M-7.6: Collect session choice for streak detection
  if (sessionId && ts !== undefined) {
    sessionChoices.push({
      sessionId: String(sessionId),
      questionId: key,
      ts: Number(ts) || Date.now(),
      dwellMs: dwellMs || 0,
      changeCount: changeCount || 0
    })
  }

  const meta = questionIndex.get(key)
  const choiceLabel = resolveChoiceLabel(meta, behaviorFacet)
  entry.choiceDistribution[choiceLabel] = (entry.choiceDistribution[choiceLabel] || 0) + 1

  const facetKey = behaviorFacetKeys.includes(behaviorFacet) ? behaviorFacet : 'other'
  entry.facetDistribution[facetKey] = (entry.facetDistribution[facetKey] || 0) + 1
}

// M-7.6: Calculate risk score for a single event
function calculateRiskScore(dwellMs, changeCount) {
  let score = 0

  if (dwellMs !== null) {
    if (dwellMs < THRESHOLDS.tooFast) {
      score += THRESHOLDS.weights.tooFast
    } else if (dwellMs > THRESHOLDS.tooSlow) {
      score += THRESHOLDS.weights.tooSlow
    }
  }

  if (changeCount !== null && changeCount >= THRESHOLDS.changeCount.high) {
    score += THRESHOLDS.weights.highChange
  }

  return score
}

// M-7.6: Detect session-level overload streaks
function detectSessionOverloads() {
  // Group choices by sessionId
  const sessionGroups = new Map()
  sessionChoices.forEach(choice => {
    if (!sessionGroups.has(choice.sessionId)) {
      sessionGroups.set(choice.sessionId, [])
    }
    sessionGroups.get(choice.sessionId).push(choice)
  })

  // Sort each session's choices by timestamp
  sessionGroups.forEach((choices, sessionId) => {
    choices.sort((a, b) => a.ts - b.ts)

    // Check for consecutive "hard" choices
    let consecutiveHard = 0
    for (const choice of choices) {
      const isHard = (choice.dwellMs > THRESHOLDS.tooSlow) || (choice.changeCount >= THRESHOLDS.changeCount.high)
      
      if (isHard) {
        consecutiveHard += 1
        if (consecutiveHard >= THRESHOLDS.streak.overloadLen) {
          sessionOverloadFlags.set(sessionId, true)
          break
        }
      } else {
        consecutiveHard = 0
      }
    }
  })
}

function bumpTags(meta, { dwellMs, hesitant }) {
  const tags = Array.isArray(meta?.pattern_tags) ? meta.pattern_tags : []
  tags.forEach(tag => {
    const key = truncate(tag, 80)
    if (!tagStats.has(key)) {
      tagStats.set(key, { tag: key, count: 0, dwell: [], hesitant: 0 })
    }
    const entry = tagStats.get(key)
    entry.count += 1
    if (dwellMs !== null) entry.dwell.push(dwellMs)
    if (hesitant) entry.hesitant += 1
  })
}

function resolveChoiceLabel(meta, behaviorFacet) {
  if (!meta) return 'unknown'
  const found = Array.isArray(meta.choice_meta)
    ? meta.choice_meta.find(
        m => m?.behavior_facet && behaviorFacet && m.behavior_facet === behaviorFacet
      )
    : null
  if (found?.choice) return found.choice

  return 'unknown'
}

function finalizeSummary() {
  summary.qb_choice.avgDwellMs = average(choiceDwell)
  summary.qb_choice.p50DwellMs = median(choiceDwell)
  summary.qb_choice.hesitantRate = summary.totals.choices
    ? Number((choiceHesitantCount / summary.totals.choices).toFixed(3))
    : 0
  summary.qb_choice.avgChangeCount = average(choiceChangeCounts, { precision: 2, round: false })

  const errors = Array.from(errorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([message, count]) => ({ message, count }))
  summary.errors.topMessages = errors
}

function buildThemeReport() {
  return Array.from(themeStats.values()).map(entry => ({
    themeId: entry.themeId,
    themeTitle: entry.themeTitle,
    choices: entry.choices,
    avgDwellMs: average(entry.dwell),
    p50DwellMs: median(entry.dwell),
    hesitantRate: entry.choices ? Number((entry.hesitant / entry.choices).toFixed(3)) : 0,
    changeCountAvg: average(collectChangeCounts(entry.themeId), { precision: 2, round: false }),
    facetCounts: fillFacets(entry.facetCounts),
    topQuestions: buildTopQuestions(entry.questionCounts)
  }))
}

function buildQuestionReport() {
  return Array.from(questionStats.values()).map(entry => {
    const total = entry.choices || 0
    const riskScoreAvg = entry.riskScores && entry.riskScores.length > 0
      ? Number(average(entry.riskScores, { precision: 3, round: false }).toFixed(3))
      : 0
    const hardOverloadRate = total > 0
      ? Number((entry.hardOverloadCount / total).toFixed(3))
      : 0
    const highChangeRate = total > 0
      ? Number((entry.highChangeCount / total).toFixed(3))
      : 0

    return {
      questionId: entry.questionId,
      themeId: entry.themeId,
      themeTitle: entry.themeTitle,
      prompt: truncate(entry.prompt, 40),
      choices: entry.choices,
      avgDwellMs: average(entry.dwell),
      p50DwellMs: median(entry.dwell),
      hesitantRate: entry.choices ? Number((entry.hesitant / entry.choices).toFixed(3)) : 0,
      changeCountAvg: average(entry.changeCounts, { precision: 2, round: false }),
      // M-7.6: New risk metrics
      riskScoreAvg,
      hardOverloadRate,
      highChangeRate,
      choiceDistribution: entry.choiceDistribution,
      facetDistribution: fillFacets(entry.facetDistribution),
      patternTags: Array.from(new Set(entry.patternTags)).map(t => truncate(t, 80))
    }
  })
}

function buildTagReport() {
  return Array.from(tagStats.values()).map(entry => ({
    tag: entry.tag,
    count: entry.count,
    avgDwellMs: average(entry.dwell),
    p50DwellMs: median(entry.dwell),
    hesitantRate: entry.count ? Number((entry.hesitant / entry.count).toFixed(3)) : 0
  }))
}

function buildFunnelReport() {
  const views = funnelCounters.paywall_view || 0
  const clicks = funnelCounters.paywall_click || 0
  const checkouts = funnelCounters.checkout_start || 0
  const successes = funnelCounters.purchase_success || 0

  const byPlanId = mapFunnelEntries(funnelCounters.byPlan)
  const bySourceStage = mapFunnelEntries(funnelCounters.bySourceStage)

  return {
    paywall_view_count: views,
    paywall_click_count: clicks,
    checkout_start_count: checkouts,
    purchase_success_count: successes,
    conversion: {
      click_per_view: rate(clicks, views),
      checkout_per_click: rate(checkouts, clicks),
      success_per_checkout: rate(successes, checkouts)
    },
    byPlanId,
    bySourceStage
  }
}

function buildTopQuestions(questionCounts) {
  const arr = Array.from(questionCounts.entries())
    .map(([questionId, count]) => {
      const meta = questionIndex.get(questionId)
      const prompt = truncate(meta?.question_text || questionId, 80)
      return { questionId, prompt, count }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
  return arr
}

function collectChangeCounts(themeId) {
  const list = []
  questionStats.forEach(entry => {
    if (entry.themeId !== themeId) return
    if (Array.isArray(entry.changeCounts)) {
      entry.changeCounts.forEach(cc => {
        const num = toNumber(cc)
        if (num !== null) list.push(num)
      })
    }
  })
  return list
}

function fillFacets(counts = {}) {
  const filled = {}
  behaviorFacetKeys.forEach(key => {
    filled[key] = counts[key] || 0
  })
  filled.other = counts.other || 0
  return filled
}

function buildQuestionProposals(byQuestionReport = []) {
  const proposals = []
  byQuestionReport.forEach(item => {
    const signals = {
      avgDwellMs: item.avgDwellMs,
      hesitantRate: item.hesitantRate,
      changeCountAvg: item.changeCountAvg
    }
    const total = item.choices || 0
    const choiceDist = item.choiceDistribution || {}
    const counts = Object.values(choiceDist || {}).map(n => Number(n) || 0)
    const maxCount = counts.length ? Math.max(...counts) : 0
    const minCount = counts.length ? Math.min(...counts) : 0
    const maxShare = total ? maxCount / total : 0
    const minShare = total ? minCount / total : 0

    // M-7.5: 資料量檢查
    const hasEnoughData = total >= MIN_EVENTS_PER_QUESTION
    const baseConfidence = confidenceFor(total, { strong: false })

    const triggers = []

    // M-7.6: Use formalized thresholds for cognitive overload detection
    const hardOverloadRate = item.hardOverloadRate || 0
    const riskScoreAvg = item.riskScoreAvg || 0
    
    if ((signals.avgDwellMs >= THRESHOLDS.dwellMs || hardOverloadRate > 0.2) && 
        signals.hesitantRate >= THRESHOLDS.hesitantRate) {
      let confidence = confidenceFor(total, { strong: signals.avgDwellMs >= THRESHOLDS.dwellMs * 1.2 || hardOverloadRate > 0.3 })
      if (!hasEnoughData) {
        confidence = 'low'
      }
      triggers.push({
        diagnosis: 'cognitive_overload',
        suggestedAction: 'split',
        explanation:
          '長停留且猶豫率偏高，疑似題幹或選項資訊量過重，建議拆成較小子題或簡化敘述。',
        confidence,
        reason: hasEnoughData ? null : 'insufficient_data'
      })
    }

    // M-7.6: Use formalized thresholds for ambiguous choices detection
    const highChangeRate = item.highChangeRate || 0
    if (
      (signals.changeCountAvg >= THRESHOLDS.changeCountAvg || highChangeRate > 0.15) &&
      total >= MIN_SAMPLE_FOR_EXTREME &&
      (maxShare >= THRESHOLDS.extremeShare || minShare <= 1 - THRESHOLDS.extremeShare)
    ) {
      let confidence = confidenceFor(total, { strong: maxShare >= THRESHOLDS.extremeShare + 0.1 || highChangeRate > 0.25 })
      if (!hasEnoughData) {
        confidence = 'low'
      }
      triggers.push({
        diagnosis: 'ambiguous_choices',
        suggestedAction: 'rewrite',
        explanation:
          '改選次數偏高且選項分布極端，疑似措辭模糊或誘導，建議重寫選項平衡語意。',
        confidence,
        reason: hasEnoughData ? null : 'insufficient_data'
      })
    }

    triggers.forEach((t, idx) => {
      const suggestedChange = t.suggestedAction === 'split'
        ? '將題目拆成較小的子題，或簡化題幹與選項的資訊量'
        : t.suggestedAction === 'rewrite'
          ? '重寫選項措辭，讓語意更平衡、減少歧義'
          : '調整題目設計'

      proposals.push({
        id: `q:${item.questionId}:${t.diagnosis}:${idx}`,
        targetType: 'question',
        targetId: item.questionId,
        themeId: item.themeId || 'unknown', // M-7.5: 加入 themeId
        signals,
        diagnosis: t.diagnosis,
        suggestedAction: t.suggestedAction,
        explanation: t.explanation,
        confidence: t.confidence,
        reason: t.reason || null,
        status: 'pending',
        metricsSnapshot: {
          events: total,
          avgDwellMs: item.avgDwellMs || 0,
          hesitantRate: item.hesitantRate || 0,
          avgChangeCount: item.changeCountAvg || 0,
          topChoiceRate: maxShare,
          // M-7.6: Include new risk metrics
          riskScoreAvg: item.riskScoreAvg || 0,
          hardOverloadRate: item.hardOverloadRate || 0,
          highChangeRate: item.highChangeRate || 0
        },
        suggestedChange
      })
    })
  })
  return proposals
}

function buildThemeProposals(byThemeReport = [], questionProposals = []) {
  const proposals = []
  const themeProblemSets = new Map()
  questionProposals.forEach(p => {
    const qMeta = questionIndex.get(p.targetId)
    const themeId = qMeta?.themeId || questionStats.get(p.targetId)?.themeId || ''
    const qid = p.targetId
    if (!themeId || !qid) return
    if (!themeProblemSets.has(themeId)) themeProblemSets.set(themeId, new Set())
    themeProblemSets.get(themeId).add(qid)
  })

  byThemeReport.forEach(entry => {
    const abnormalCount = themeProblemSets.get(entry.themeId)?.size || 0
    if (abnormalCount < 2) return
    const signals = {
      avgDwellMs: entry.avgDwellMs,
      hesitantRate: entry.hesitantRate,
      changeCountAvg: entry.changeCountAvg || 0
    }
    const totalChoices = entry.choices || 0
    const hasEnoughData = totalChoices >= MIN_EVENTS_PER_QUESTION * 2 // theme 需要更多資料
    let confidence = abnormalCount >= 3 ? 'high' : 'medium'
    if (!hasEnoughData) {
      confidence = 'low'
    }

    proposals.push({
      id: `t:${entry.themeId}:density`,
      targetType: 'theme',
      targetId: entry.themeId,
      signals,
      diagnosis: 'theme_density_issue',
      suggestedAction: 'rebalance',
      explanation:
        '同一主題有多題同時出現負荷或歧義跡象，建議調整題組密度或拆分題目焦點。',
      confidence,
      reason: hasEnoughData ? null : 'insufficient_data',
      status: 'pending',
      metricsSnapshot: {
        events: totalChoices,
        avgDwellMs: entry.avgDwellMs || 0,
        hesitantRate: entry.hesitantRate || 0,
        avgChangeCount: entry.changeCountAvg || 0,
        topChoiceRate: 0 // theme 層級不適用
      },
      suggestedChange: '調整此主題的題目密度，或將部分題目拆分到其他主題'
    })
  })

  return proposals
}

function buildProposalSummary(questionProposals, themeProposals) {
  const all = [...questionProposals, ...themeProposals]
  const countsByAction = {}
  let highConfidence = 0
  let mediumConfidence = 0
  let lowConfidence = 0
  all.forEach(p => {
    countsByAction[p.suggestedAction] = (countsByAction[p.suggestedAction] || 0) + 1
    if (p.confidence === 'high') highConfidence += 1
    else if (p.confidence === 'medium') mediumConfidence += 1
    else lowConfidence += 1
  })

  const totalSessions = summary.totals.sessions || 0
  const minSessionsMet = totalSessions >= MIN_SESSIONS
  const questionsWithEnoughData = questionProposals.filter(p => {
    const events = p.metricsSnapshot?.events || 0
    return events >= MIN_EVENTS_PER_QUESTION
  }).length
  const totalQuestions = questionProposals.length
  const minEventsPerQuestionMetRatio = totalQuestions > 0 ? questionsWithEnoughData / totalQuestions : 0

  const warnings = []
  if (!minSessionsMet) {
    warnings.push(`整體 session 數 (${totalSessions}) 低於門檻 (${MIN_SESSIONS})，不建議產生 high-confidence proposals`)
  }
  if (minEventsPerQuestionMetRatio < 0.5 && totalQuestions > 0) {
    warnings.push(`超過半數題目資料量不足 (${questionsWithEnoughData}/${totalQuestions} 達標)`)
  }

  // M-7.5: 若整體 session 不足，移除所有 high-confidence proposals
  if (!minSessionsMet) {
    all.forEach(p => {
      if (p.confidence === 'high') {
        p.confidence = 'medium'
        highConfidence -= 1
        mediumConfidence += 1
      }
    })
  }

  return {
    totals: {
      proposals: all.length,
      high: highConfidence,
      medium: mediumConfidence,
      low: lowConfidence
    },
    gating: {
      minSessionsMet,
      minEventsPerQuestionMetRatio: Number(minEventsPerQuestionMetRatio.toFixed(3))
    },
    warnings,
    bySuggestedAction: countsByAction
  }
}

function confidenceFor(sampleSize, { strong = false } = {}) {
  if (sampleSize >= 30 || strong) return 'high'
  if (sampleSize >= 12) return 'medium'
  return 'low'
}

function rate(n, d) {
  if (!d) return 0
  return Number((n / d).toFixed(3))
}

function mapFunnelEntries(map = new Map()) {
  return Array.from(map.values()).map(entry => ({
    key: entry.key,
    paywall_view_count: entry.paywall_view || 0,
    paywall_click_count: entry.paywall_click || 0,
    checkout_start_count: entry.checkout_start || 0,
    purchase_success_count: entry.purchase_success || 0,
    conversion: {
      click_per_view: rate(entry.paywall_click || 0, entry.paywall_view || 0),
      checkout_per_click: rate(entry.checkout_start || 0, entry.paywall_click || 0),
      success_per_checkout: rate(entry.purchase_success || 0, entry.checkout_start || 0)
    }
  }))
}

function writeReports() {
  const summaryPath = path.join(reportsDir, 'analytics.summary.json')
  const byThemePath = path.join(reportsDir, 'analytics.byTheme.json')
  const byQuestionPath = path.join(reportsDir, 'analytics.byQuestion.json')
  const byTagPath = path.join(reportsDir, 'analytics.byTag.json')
  const funnelPath = path.join(reportsDir, 'analytics.funnel.json')
  const proposalsByQuestionPath = path.join(reportsDir, 'proposals.byQuestion.json')
  const proposalsByThemePath = path.join(reportsDir, 'proposals.byTheme.json')
  const proposalsSummaryPath = path.join(reportsDir, 'proposals.summary.json')

  const byThemeReport = buildThemeReport()
  const byQuestionReport = buildQuestionReport()
  const byTagReport = buildTagReport()
  const funnelReport = buildFunnelReport()
  const questionProposals = buildQuestionProposals(byQuestionReport)
  const themeProposals = buildThemeProposals(byThemeReport, questionProposals)
  const proposalsSummary = buildProposalSummary(questionProposals, themeProposals)

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
  fs.writeFileSync(byThemePath, JSON.stringify(byThemeReport, null, 2))
  fs.writeFileSync(byQuestionPath, JSON.stringify(byQuestionReport, null, 2))
  fs.writeFileSync(funnelPath, JSON.stringify(funnelReport, null, 2))
  fs.writeFileSync(proposalsByQuestionPath, JSON.stringify(questionProposals, null, 2))
  fs.writeFileSync(proposalsByThemePath, JSON.stringify(themeProposals, null, 2))
  fs.writeFileSync(proposalsSummaryPath, JSON.stringify(proposalsSummary, null, 2))

  if (byTagReport.length) {
    fs.writeFileSync(byTagPath, JSON.stringify(byTagReport, null, 2))
  }
}

function getThemeTitle(themeId) {
  if (!themeId) return 'unknown'
  return themeTitleMap.get(themeId) || themeId
}

function truncate(str, max = 200) {
  const text = String(str || '')
  if (text.length <= max) return text
  return text.slice(0, max)
}

function safeId(value) {
  const str = String(value || '').trim()
  return str || ''
}

function toNumber(value) {
  if (value === undefined || value === null) return null
  const n = Number(value)
  if (Number.isNaN(n)) return null
  return n
}

function average(list, { precision = 1, round = true } = {}) {
  if (!Array.isArray(list) || !list.length) return 0
  const val = list.reduce((a, b) => a + b, 0) / list.length
  return round ? Math.round(val) : Number(val.toFixed(precision))
}

function median(list) {
  if (!Array.isArray(list) || !list.length) return 0
  const sorted = [...list].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) return Math.round((sorted[mid - 1] + sorted[mid]) / 2)
  return sorted[mid]
}
