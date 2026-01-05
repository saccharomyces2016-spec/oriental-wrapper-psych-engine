import round1Domains from './ontology/round1Domains.v1.json' with { type: 'json' }
import round2FourSymbol from './ontology/round2FourSymbol.v1.json' with { type: 'json' }
import round3Ipsative from './ontology/round3Ipsative.v2.json' with { type: 'json' }
import { canonicalizeDomainId, CANONICAL_DOMAIN_IDS } from './ontology/domainCanonicalMap.js'

function safeRound1Items() {
  return Array.isArray(round1Domains?.items) ? round1Domains.items : []
}

export function getDomainAnchors() {
  return safeRound1Items().map((item, idx) => {
    const domain_id = canonicalizeDomainId(item?.domain_id || item?.internal_key)
    const descRaw = String(item?.description || '').trim()
    const [labelFromDesc, desc] = descRaw.includes('｜') ? descRaw.split('｜') : ['', descRaw]
    const label = labelFromDesc || item?.zhLabel || item?.internal_key || `domain-${idx}`
    return {
      id: domain_id,
      domain: domain_id,
      label,
      desc: desc || label,
      short_label: item?.short_label || '',
      zhLabel: item?.zhLabel || ''
    }
  })
}

export function getRound2Options(domainKey) {
  const domainId = canonicalizeDomainId(domainKey)
  const domains = Array.isArray(round2FourSymbol?.domains) ? round2FourSymbol.domains : []
  const found = domains.find(d => d.domain_id === domainId)
  if (!found) {
    const available = domains.map(d => d?.domain_id).filter(Boolean).join(',')
    throw new Error(`[round2] domain not found for ${domainId}; available: ${available}`)
  }
  const opts = Array.isArray(found.options) ? found.options : []
  return opts.map((opt) => ({
    id: `${domainId}_${opt.symbol}`,
    domain: domainId,
    label: opt?.text || opt?.symbol || '未命名',
    desc: opt?.text || '',
    symbol: opt?.symbol || '',
    option_id: `${domainId}_${opt.symbol}`,
    decoder: opt?.decoder || null,
    signal_map: opt?.decoder?.signal_map || null
  }))
}

export function getRound3Questions() {
  const qs = Array.isArray(round3Ipsative?.questions) ? round3Ipsative.questions : []
  return qs.map(q => ({
    ...q,
    domain_id: q?.domain_id && CANONICAL_DOMAIN_IDS.includes(q.domain_id) ? q.domain_id : null
  }))
}

export default {
  getDomainAnchors,
  getRound2Options,
  getRound3Questions
}
