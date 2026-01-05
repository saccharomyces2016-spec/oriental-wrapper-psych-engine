/**
 * core/psych/questionBank/index.js
 * 題庫/詞彙庫統一入口
 *
 * 設計目標：
 * - 以 domain + stage + ageBand 做分派
 * - 題目不綁 UI（UI 只拿 prompt/choices 顯示）
 * - 每個選項都可對 traits / axes / elements 做加權（供 scorer 使用）
 */

import money from './money.js'
import relationship from './relationship.js'

export const AGE_BANDS = {
  teen: 'teen',     // 12-17
  young: 'young',   // 18-29
  adult: 'adult',   // 30-54
  senior: 'senior', // 55+
  all: 'all'
}

/**
 * 依年齡回傳 ageBand（如果你暫時沒有 age，就回 all）
 */
export function toAgeBand(age) {
  const n = Number(age)
  if (!Number.isFinite(n)) return AGE_BANDS.all
  if (n < 18) return AGE_BANDS.teen
  if (n < 30) return AGE_BANDS.young
  if (n < 55) return AGE_BANDS.adult
  return AGE_BANDS.senior
}

/**
 * Registry：集中管理每個領域的題庫
 * - domain: money / relationship / ...
 */
const BANK = {
  money,
  relationship
}

/**
 * 取得題庫（可依 stage、ageBand 篩選）
 *
 * @param {Object} args
 * @param {string} args.domain - 'money' | 'relationship' | ...
 * @param {string} [args.stage] - 'r1' | 'r2' | 'r3'（你目前 03 是三回合）
 * @param {number} [args.age] - 年齡（可選）
 * @returns {Array<Question>}
 */
export function getQuestions({ domain, stage, age } = {}) {
  const mod = BANK[domain]
  if (!mod) return []

  const ageBand = toAgeBand(age)
  const list = Array.isArray(mod.questions) ? mod.questions : []

  return list.filter(q => {
    const stageOk = !stage || q.stage === stage
    const band = q.ageBand || AGE_BANDS.all
    const ageOk = band === AGE_BANDS.all || band === ageBand
    return stageOk && ageOk
  })
}

/**
 * 取得「詞彙/觸發器」庫（不是題目，給 scorer 做語氣/命中感）
 *
 * @param {Object} args
 * @param {string} args.domain
 */
export function getLexicon({ domain } = {}) {
  const mod = BANK[domain]
  if (!mod) return { triggers: [], punchlines: [] }
  return {
    triggers: mod.lexicon?.triggers || [],
    punchlines: mod.lexicon?.punchlines || []
  }
}

/* ---------------------------------
  型別說明（文件用，不影響執行）
---------------------------------- */
/**
 * @typedef {Object} Question
 * @property {string} id - 唯一 id
 * @property {string} domain - money/relationship/...
 * @property {string} stage - r1/r2/r3
 * @property {string} ageBand - teen/young/adult/senior/all
 * @property {string} prompt - 題幹（繁中）
 * @property {Array<Choice>} choices - 選項
 * @property {Object} [meta] - 可放權重策略、排序、展示提示等
 */

/**
 * @typedef {Object} Choice
 * @property {string} id
 * @property {string} label - 顯示文字（繁中）
 * @property {string} [tag] - 簡短標籤（用於「路徑回聲」/命中詞）
 * @property {Object} [weights] - 對 traits/axes/elements 的加權（scorer 用）
 *
 * weights 格式（建議）
 * {
 *   traits: { riskAversion:+0.2, control:+0.1, sensitivity:+0.15, drive:-0.05, innerTension:+0.1 },
 *   axes:   { move:+0.2, inward:+0.1, heat:-0.05, damp:+0.1, boundary:+0.05 },
 *   elements:{ wood:+0.1, fire:-0.05, earth:+0.15, metal:+0.1, water:+0.2 }
 * }
 */