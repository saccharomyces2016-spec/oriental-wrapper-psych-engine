import {
  canonicalizeDomainId,
  CANONICAL_DOMAIN_IDS,
  DOMAIN_LABEL_ZH as DOMAIN_LABEL_ZH_CANONICAL
} from './domainCanonicalMap.js'

/**
 * domainAlias.v1.js
 * Backward compatible wrapper that now canonicalizes to domain_* ids.
 */
export const DOMAIN_CANONICAL = CANONICAL_DOMAIN_IDS.reduce((acc, id) => {
  acc[id] = id
  return acc
}, {})

export const DOMAIN_ALIAS = {
  relationship: 'domain_yuan',
  money: 'domain_cai',
  career: 'domain_ye',
  health: 'domain_shen',
  family: 'domain_jia',
  boundary: 'domain_ju',
  fortune: 'domain_ming',
  self: 'domain_xin',
  love: 'domain_yuan',
  work: 'domain_ye',
  body: 'domain_shen',
  home: 'domain_jia',
  mind: 'domain_xin',
  study: 'domain_ju',
  social: 'domain_ming',
  qing: 'domain_yuan',
  cai: 'domain_cai',
  ye: 'domain_ye',
  shen: 'domain_shen',
  jia: 'domain_jia',
  jie: 'domain_ju',
  yun: 'domain_ming',
  xin: 'domain_xin'
}

export function canonicalizeDomainKey(key) {
  // Preserve legacy name while returning canonical domain_* id
  const normalized = String(key || '').trim().toLowerCase()
  if (DOMAIN_ALIAS[normalized]) return DOMAIN_ALIAS[normalized]
  return canonicalizeDomainId(normalized)
}

export const DOMAIN_LABEL_ZH = DOMAIN_LABEL_ZH_CANONICAL

export default {
  canonicalizeDomainKey,
  DOMAIN_CANONICAL,
  DOMAIN_ALIAS,
  DOMAIN_LABEL_ZH
}
