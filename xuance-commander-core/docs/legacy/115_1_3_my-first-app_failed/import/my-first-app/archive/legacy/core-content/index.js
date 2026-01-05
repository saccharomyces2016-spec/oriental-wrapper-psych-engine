// src/core/content/index.js

import * as Money from './ContentDB_money.js'
import * as Relationship from './ContentDB_relationship.js'
import * as Career from './ContentDB_career.js'
import * as Health from './ContentDB_health.js'
import * as Family from './ContentDB_family.js'
import * as Self from './ContentDB_self.js'

function pickDbObject(mod) {
  // 例如：Career.ContentDB_career / Family.ContentDB_family 這種
  for (const k of Object.keys(mod)) {
    const v = mod[k]
    if (v && typeof v === 'object' && (Array.isArray(v.round2) || Array.isArray(v.round3))) {
      return v
    }
  }
  return null
}

function normalize(mod) {
  const dbObj = pickDbObject(mod)
  if (dbObj) {
    return {
      round2: Array.isArray(dbObj.round2) ? dbObj.round2 : [],
      round3: Array.isArray(dbObj.round3) ? dbObj.round3 : []
    }
  }

  // money / relationship 這種可能直接 export ROUND2/ROUND3 或 REL_R2/REL_R3
  const round2 =
    mod.round2 ||
    mod.ROUND2 ||
    mod.MONEY_R2 ||
    mod.REL_R2 ||
    mod.CAREER_R2 ||
    mod.HEALTH_R2 ||
    mod.FAMILY_R2 ||
    mod.SELF_R2 ||
    []

  const round3 =
    mod.round3 ||
    mod.ROUND3 ||
    mod.MONEY_R3 ||
    mod.REL_R3 ||
    mod.CAREER_R3 ||
    mod.HEALTH_R3 ||
    mod.FAMILY_R3 ||
    mod.SELF_R3 ||
    []

  return {
    round2: Array.isArray(round2) ? round2 : [],
    round3: Array.isArray(round3) ? round3 : []
  }
}

export const CONTENT_MAP = {
  money: normalize(Money),
  relationship: normalize(Relationship),
  career: normalize(Career),
  health: normalize(Health),
  family: normalize(Family),
  self: normalize(Self)
}