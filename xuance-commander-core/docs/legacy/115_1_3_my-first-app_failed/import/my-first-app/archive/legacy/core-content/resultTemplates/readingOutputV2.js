import buildNarrative from '../../flow/readingNarrative.v1.js'

const VARIANT_ID = 'v2_scene_01'

function isoNow(ts) {
  return new Date(ts || Date.now()).toISOString()
}

function safeTop(arr, n = 3) {
  if (!Array.isArray(arr)) return []
  return arr.slice(0, n).filter(Boolean)
}

function plateId(domain, signal, facet) {
  const d = domain || 'unknown'
  const s = signal || 'nosignal'
  const f = facet || 'nofacet'
  return `${d}__${s}__${f}`
}

function buildRender(readingResult, { seed }) {
  const narrative = buildNarrative(readingResult, { seed })
  const where = narrative?.whereLine || '盤面資訊不足'
  const why = Array.isArray(narrative?.whyLines) ? narrative.whyLines.join(' ') : '局未成形，等待更多訊號。'
  const loosen = Array.isArray(narrative?.nextLines) ? narrative.nextLines.slice(0, 3) : ['補充資料', '檢核題面', '等待系統重算']

  return {
    title: { zh: '盤面敘示', en: null },
    sections: [
      { id: 'where', style: 'scene', text_zh: where },
      { id: 'why', style: 'logic', text_zh: why },
      { id: 'loosen', style: 'levers', items_zh: loosen }
    ],
    disclaimer_zh: '此為行為推演，僅供整理現況，不構成預言或建議。'
  }
}

export function buildReadingOutputV2(readingResult, { seed = null, variant_id = VARIANT_ID, now_ts } = {}) {
  if (!readingResult || typeof readingResult !== 'object') return null
  const ts = typeof now_ts === 'number' ? now_ts : Date.now()

  const signals = safeTop(readingResult?.situation_profile?.top_signals, 3)
  const themes = safeTop(readingResult?.top_themes, 3)
  const facets = Object.entries(readingResult?.facet_scores || {})
    .map(([facet, score]) => ({ facet, score: Number(score) || 0 }))
    .sort((a, b) => b.score - a.score)

  const topSignal = signals[0]?.signal_key || 'nosignal'
  const topFacet = facets[0]?.facet || 'nofacet'
  const domainKey = readingResult.domain_key || null

  const plate_id = plateId(domainKey, topSignal, topFacet)

  const round2Chosen = Array.isArray(readingResult?.situation_profile?.chosen_round2)
    ? readingResult.situation_profile.chosen_round2.map(c => ({
        question_id: c.question_id,
        choice: c.choice,
        signal_key: c.signal_key || null
      }))
    : []

  const round4Chosen = Array.isArray(readingResult?.anchors)
    ? readingResult.anchors.map(a => ({
        question_id: a.question_id || a.anchor_key || '',
        choice: a.choice || '',
        anchor_key: a.anchor_key || null
      }))
    : []

  const anchorsDetail = Array.isArray(readingResult?.anchors)
    ? readingResult.anchors.map(a => ({
        anchor_key: a.anchor_key || '',
        question_id: a.question_id || a.anchor_key || '',
        choice: a.choice || '',
        nudges: {
          themes: [], // placeholder until engine exposes deltas
          facets: []
        }
      }))
    : []

  return {
    version: 'v2',
    generated_at: isoNow(ts),
    reading_id: plate_id,
    source: {
      engine_version: 'readingEngine.v1',
      narrative_version: 'readingNarrative.v2',
      variant_id,
      seed
    },
    inputs: {
      domain_key: domainKey,
      round2: {
        answered_ids: round2Chosen.map(c => c.question_id).filter(Boolean),
        chosen: round2Chosen
      },
      round3: {
        answered: Array.isArray(readingResult?.debug?.round3_answers)
          ? readingResult.debug.round3_answers
          : []
      },
      round4: {
        answered_ids: round4Chosen.map(c => c.question_id).filter(Boolean),
        chosen: round4Chosen
      }
    },
    plate: {
      top_themes: themes,
      facets,
      signals,
      anchors: anchorsDetail
    },
    render: buildRender(readingResult, { seed }),
    telemetry_schema: {
      active_time_ms: { min_valid: 8000, max_idle_gap_ms: 45000 },
      events: ['result_view', 'scroll_depth', 'expand_debug', 'copy_text', 'share_click', 'backtrack_to_section'],
      labels: {
        plate_id,
        variant_id,
        domain_key: domainKey,
        top_theme_id: themes[0]?.theme_id || null
      }
    },
    debug: {
      plate_id,
      notes: ['v2 template generated'],
      raw: readingResult
    }
  }
}

export default buildReadingOutputV2
