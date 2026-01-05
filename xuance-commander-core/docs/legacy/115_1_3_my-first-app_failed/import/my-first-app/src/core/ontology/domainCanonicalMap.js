/**
 * @typedef {'domain_yuan'|'domain_cai'|'domain_shen'|'domain_ye'|'domain_jia'|'domain_ju'|'domain_ming'|'domain_xin'} CanonicalDomainId
 */

export const CANONICAL_DOMAIN_IDS = [
  'domain_yuan',
  'domain_cai',
  'domain_shen',
  'domain_ye',
  'domain_jia',
  'domain_ju',
  'domain_ming',
  'domain_xin'
]

// Single source of truth for mapping legacy keys to canonical domain_* ids.
/** @type {Record<string, CanonicalDomainId>} */
const LEGACY_TO_CANONICAL = {
  domain_yuan: 'domain_yuan',
  domain_cai: 'domain_cai',
  domain_shen: 'domain_shen',
  domain_ye: 'domain_ye',
  domain_jia: 'domain_jia',
  domain_ju: 'domain_ju',
  domain_ming: 'domain_ming',
  domain_xin: 'domain_xin',

  // Group A
  money: 'domain_cai',
  relationship: 'domain_yuan',
  career: 'domain_ye',
  health: 'domain_shen',
  family: 'domain_jia',
  self: 'domain_xin',
  study: 'domain_ju',
  social: 'domain_ming',

  // Group B
  love: 'domain_yuan',
  finance: 'domain_cai',
  work: 'domain_ye',
  body: 'domain_shen',
  home: 'domain_jia',
  mind: 'domain_xin',
  boundary: 'domain_ju',
  fortune: 'domain_ming',

  // Group C
  qing: 'domain_yuan',
  cai: 'domain_cai',
  ye: 'domain_ye',
  shen: 'domain_shen',
  jia: 'domain_jia',
  jie: 'domain_ju',
  yun: 'domain_ming',
  xin: 'domain_xin'
}

/** @type {Record<CanonicalDomainId, string>} */
export const DOMAIN_LABEL_ZH = {
  domain_yuan: '情',
  domain_cai: '財',
  domain_shen: '身',
  domain_ye: '業',
  domain_jia: '家',
  domain_ju: '界',
  domain_ming: '命',
  domain_xin: '心'
}

export function isCanonicalDomainId(value) {
  return CANONICAL_DOMAIN_IDS.includes(value)
}

export function canonicalizeDomainId(input) {
  const key = String(input || '').trim().toLowerCase()
  if (!key) {
    throw new Error('[domain canonicalize] empty domain key')
  }
  const mapped = LEGACY_TO_CANONICAL[key]
  if (mapped) return mapped
  throw new Error(`[domain canonicalize] unknown domain key "${input}"`)
}

export default {
  canonicalizeDomainId,
  CANONICAL_DOMAIN_IDS,
  DOMAIN_LABEL_ZH
}
