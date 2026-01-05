// src/core/content/ContentDB_index.js
import { ROUND2 as R2_money, ROUND3 as R3_money } from './ContentDB_money.js'
import { ROUND2 as R2_relationship, ROUND3 as R3_relationship } from './ContentDB_relationship.js'

import { ROUND2 as R2_career, ROUND3 as R3_career } from './ContentDB_career.js'
import { ROUND2 as R2_study, ROUND3 as R3_study } from './ContentDB_study.js'
import { ROUND2 as R2_social, ROUND3 as R3_social } from './ContentDB_social.js'
import { ROUND2 as R2_family, ROUND3 as R3_family } from './ContentDB_family.js'
import { ROUND2 as R2_health, ROUND3 as R3_health } from './ContentDB_health.js'
import { ROUND2 as R2_self, ROUND3 as R3_self } from './ContentDB_self.js'

const DB = {
  money: { round2: R2_money, round3: R3_money },
  relationship: { round2: R2_relationship, round3: R3_relationship },

  career: { round2: R2_career, round3: R3_career },
  study: { round2: R2_study, round3: R3_study },
  social: { round2: R2_social, round3: R3_social },
  family: { round2: R2_family, round3: R3_family },
  health: { round2: R2_health, round3: R3_health },
  self: { round2: R2_self, round3: R3_self }
}

export function getContentRounds(domainKey) {
  // 若 domainKey 不存在，就回傳空陣列（避免整個炸掉）
  return DB[domainKey] || { round2: [], round3: [] }
}