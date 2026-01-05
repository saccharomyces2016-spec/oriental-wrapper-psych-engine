import { captureEvent } from './telemetryClient.js'

const state = {
  enabled: false,
  session: null
}

export function initChoiceMetrics({ enabled = false } = {}) {
  state.enabled = !!enabled
}

export function beginQuestionSession({ stage = '03', mode = 'governance' } = {}) {
  if (!state.enabled) return
  const normalizedMode = String(mode || '').toLowerCase() === 'questionbank' ? 'governance' : mode
  const testStartTimestamp = Date.now()
  state.session = {
    stage,
    mode: normalizedMode || 'governance',
    startedAt: testStartTimestamp,
    questions: new Map()
  }
  
  // M-8.4 Fix: Save testStartTimestamp to sessionStorage for anchor selection
  try {
    sessionStorage.setItem('test_start_timestamp', String(testStartTimestamp))
  } catch {
    // Ignore storage errors
  }
}

export function markQuestionSeen({ questionId, themeId }) {
  if (!state.enabled || !state.session) return
  const qid = questionId || ''
  if (!qid) return
  if (!state.session.questions.has(qid)) {
    state.session.questions.set(qid, {
      questionId: qid,
      themeId: themeId || '',
      firstSeenAt: Date.now(),
      answeredAt: null,
      changeCount: 0,
      finalChoice: '',
      behaviorFacet: ''
    })
  }
}

export function recordChoice({ questionId, themeId, choiceText, behaviorFacet }) {
  if (!state.enabled || !state.session) return null
  const qid = questionId || ''
  if (!qid) return null
  if (!state.session.questions.has(qid)) {
    markQuestionSeen({ questionId: qid, themeId })
  }
  const entry = state.session.questions.get(qid)
  entry.changeCount += 1
  entry.answeredAt = Date.now()
  entry.finalChoice = String(choiceText || '').slice(0, 300)
  entry.behaviorFacet = String(behaviorFacet || '').slice(0, 100)
  const dwellMs = entry.firstSeenAt ? entry.answeredAt - entry.firstSeenAt : 0
  const hesitant = entry.changeCount >= 2 || dwellMs >= 12000

  captureEvent('qb_choice', {
    questionId: entry.questionId,
    themeId: entry.themeId,
    behaviorFacet: entry.behaviorFacet,
    dwellMs,
    changeCount: entry.changeCount,
    hesitant
  })

  return { ...entry, dwellMs, hesitant }
}

export function finalizeQuestionSession() {
  if (!state.enabled || !state.session) return null
  const entries = Array.from(state.session.questions.values())
  if (!entries.length) return null
  const dwellList = entries.map(e => (e.firstSeenAt && e.answeredAt ? e.answeredAt - e.firstSeenAt : 0))
  const hesitantCount = entries.filter(e => e.changeCount >= 2 || (e.firstSeenAt && e.answeredAt && e.answeredAt - e.firstSeenAt >= 12000)).length
  const avgDwellMs = dwellList.length ? Math.round(dwellList.reduce((a, b) => a + b, 0) / dwellList.length) : 0

  const summary = {
    stage: state.session.stage,
    mode: state.session.mode,
    totalQuestions: entries.length,
    hesitantCount,
    avgDwellMs
  }

  captureEvent('qb_session', summary)
  state.session = null
  return summary
}
