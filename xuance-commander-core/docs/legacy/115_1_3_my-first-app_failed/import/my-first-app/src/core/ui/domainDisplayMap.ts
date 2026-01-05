export interface DomainDisplay {
  char: string
  subtitle?: string
}

const FINALIZED_MAP: Record<string, DomainDisplay> = {
  domain_yuan: { char: '緣' },
  domain_cai: { char: '財' },
  domain_shen: { char: '身' },
  domain_ye: { char: '業' },
  domain_jia: { char: '家' },
  domain_ju: { char: '局' },
  domain_xin: { char: '心' },
  domain_ming: { char: '命' }
}

const LEGACY_MAP: Record<string, DomainDisplay> = {
  relationship: { char: '緣' },
  money: { char: '財' },
  health: { char: '身' },
  career: { char: '業' },
  family: { char: '家' },
  self: { char: '心' },
  study: { char: '局' },
  social: { char: '命' }
}

export function resolveDomainDisplay(domainId: string): DomainDisplay {
  const id = String(domainId || '').toLowerCase()
  return FINALIZED_MAP[id] || LEGACY_MAP[id] || { char: id || '' }
}

export default resolveDomainDisplay
