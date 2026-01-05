// Governance cleanup: legacy reading engine removed. Returns minimal stub without legacy datasets.
export default async function readingEngineV1(payload = {}) {
  console.warn('[GOVERNANCE] readingEngine.v1 stubbed; legacy datasets blocked')
  return {
    domain_key: payload?.round1?.domain_key || payload?.domain || '',
    situation_profile: { top_signals: [], chosen_round2: [] },
    facet_scores: {},
    top_themes: [],
    anchors: [],
    debug: {
      source: 'readingEngine.v1',
      blocked: true
    }
  }
}

export { readingEngineV1 }
