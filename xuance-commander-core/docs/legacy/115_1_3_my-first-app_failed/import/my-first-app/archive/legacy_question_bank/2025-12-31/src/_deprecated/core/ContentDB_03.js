// src/core/ContentDB_03.js
import * as FIN from './ContentDB_03_finance.js'
import * as LOVE from './ContentDB_03_love.js'

export const DOMAIN_PACKS = {
  money: FIN,
  relationship: LOVE
}

// Round1 用於「定領域」：只列出財＋情
export const DOMAIN_ANCHORS = [
  { domain: 'money', label: FIN.DOMAIN.label, desc: FIN.DOMAIN.hint },
  { domain: 'relationship', label: LOVE.DOMAIN.label, desc: LOVE.DOMAIN.hint }
]
