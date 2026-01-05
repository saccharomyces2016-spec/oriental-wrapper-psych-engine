// src/core/psych/motherThemeMapper.js
import MotherThemes from './motherThemes.v1.json'

/**
 * resonance（03 產物）可能包含：
 *  - domain: 'money' | 'relationship' ...
 *  - userChoices: [{round:1,label,...},{round:2,label,...},{round:3,label,...}...]
 *  - elements / axes ...（可選）
 *
 * profile（02 出生資料）可能包含：
 *  - age / year ...（目前你未必有 age，先容錯）
 *  - gender（如果你之後加：male/female/any）
 */

/** 把年齡轉 ageBand（沒有年齡就回 null，mapper 仍可運作） */
export function toAgeBand(age) {
  const n = Number(age)
  if (!Number.isFinite(n) || n < 0) return null
  if (n <= 12) return '0-12'
  if (n <= 18) return '13-18'
  if (n <= 25) return '19-25'
  if (n <= 35) return '26-35'
  if (n <= 45) return '36-45'
  if (n <= 60) return '46-60'
  if (n <= 80) return '61-80'
  return '81-100'
}

/**
 * 核心：建立母題權重
 * 回傳：
 *  {
 *    hits: [{ themeId, score, reason[] }...]  // 依分數排序
 *    top:  [{...}]                           // 前 N
 *    debug: {...}                            // 可選
 *  }
 */
export function mapToMotherThemes({ resonance = {}, profile = {} } = {}) {
  const themes = Array.isArray(MotherThemes?.themes) ? MotherThemes.themes : []
  const domain = String(resonance?.domain || '').trim()
  const gender = String(profile?.gender || 'any').trim() || 'any'
  const ageBand = toAgeBand(profile?.age)

  const userChoices = Array.isArray(resonance?.userChoices) ? resonance.userChoices : []
  const r2Label = String(userChoices?.[1]?.label || '').trim()
  const r3Labels = userChoices.slice(2).map(x => String(x?.label || '').trim()).filter(Boolean)

  // —— 可控規則：依 Round2 / Round3 字詞 → 母題加權 ——
  const signals = collectSignals({ domain, r2Label, r3Labels })

  const scored = themes.map(t => {
    const reason = []
    let score = 0

    // 1) domain 命中（很重要）
    if (Array.isArray(t.domain) && domain && t.domain.includes(domain)) {
      score += 3.0
      reason.push(`domain:${domain}`)
    }

    // 2) gender 篩選（female/male 只在匹配時加分；不匹配就降權到 0）
    if (t.gender && t.gender !== 'any') {
      if (gender === t.gender) {
        score += 1.5
        reason.push(`gender:${gender}`)
      } else {
        // 不匹配：直接視為不可用（避免混入）
        score = 0
        reason.push(`gender_mismatch:${gender}->${t.gender}`)
      }
    }

    // 3) ageBand 篩選（有年齡才用，沒有就略過）
    if (score > 0 && ageBand && Array.isArray(t.ageBand)) {
      if (t.ageBand.includes(ageBand)) {
        score += 1.0
        reason.push(`ageBand:${ageBand}`)
      } else {
        score -= 0.8
        reason.push(`ageBand_out:${ageBand}`)
      }
    }

    // 4) keyword 命中（從 signals 比對）
    if (score > 0 && Array.isArray(t.keywords) && t.keywords.length) {
      const hitCount = countKeywordHits(t.keywords, signals)
      if (hitCount > 0) {
        score += Math.min(2.5, hitCount * 0.6)
        reason.push(`keywords_hit:${hitCount}`)
      }
    }

    // 5) 長尾加權（signals 裡若有 longTail flag）
    if (score > 0 && signals._flags?.includes('highSensitive') && t.id === 'MT23') {
      score += 1.5
      reason.push('flag:highSensitive')
    }
    if (score > 0 && signals._flags?.includes('extremeAvoidance') && t.id === 'MT24') {
      score += 1.5
      reason.push('flag:extremeAvoidance')
    }

    return { themeId: t.id, name: t.name, score: round2(score), reason }
  })

  const hits = scored
    .filter(x => x.score > 0.6)
    .sort((a, b) => b.score - a.score)

  return {
    hits,
    top: hits.slice(0, 6),
    debug: {
      domain,
      gender,
      ageBand,
      r2Label,
      r3Labels,
      signals
    }
  }
}

/* =========================
 * Signals：把人類語句壓成系統訊號
 * ========================= */
function collectSignals({ domain, r2Label, r3Labels }) {
  const text = [domain, r2Label, ...r3Labels].join(' ')
  const s = new Set()

  // 通用（你可持續擴充）
  if (/焦|慌|怕|不安|緊張|心悸|失眠|煩/.test(text)) s.add('焦慮不安')
  if (/拖|延|懶|開始不了|提不起勁/.test(text)) s.add('拖延')
  if (/比較|自卑|不夠好|被看不起|否定/.test(text)) s.add('自我價值低')
  if (/爆|吵|忍太久|失控|後悔/.test(text)) s.add('爆發後悔')
  if (/拒絕|迎合|委屈|付出太多|被利用/.test(text)) s.add('界線困難')
  if (/靠近|疏遠|冷|距離|不敢要|怕被拋/.test(text)) s.add('親密恐懼')
  if (/承諾|未來|結婚|責任|買房|生小孩/.test(text)) s.add('承諾壓力')
  if (/風險|不敢動|觀望|保守|怕賠|算很久/.test(text)) s.add('風險敏感')
  if (/漏財|窟窿|周轉|卡|帳單|洞|債/.test(text)) s.add('現金流破口')
  if (/方向|迷惘|不知道|換來換去/.test(text)) s.add('方向迷霧')
  if (/過勞|燃盡|累|壓力大/.test(text)) s.add('耗竭')
  if (/家|家人|牽制|內疚/.test(text)) s.add('家庭牽制')
  if (/誤解|講不清|你說A他聽B|越解釋越糟/.test(text)) s.add('溝通失真')
  if (/孤立|不合群|格格不入|假裝/.test(text)) s.add('社交耗損')

  // 長尾 flags（先粗略）
  const flags = []
  if (/高敏感|共感|太容易被影響|過載/.test(text)) flags.push('highSensitive')
  if (/不動|安全就好|不想承擔|等一個不用負責/.test(text)) flags.push('extremeAvoidance')

  return { list: Array.from(s), _flags: flags }
}

function countKeywordHits(keywords, signals) {
  const list = signals?.list || []
  let n = 0
  for (const k of keywords) {
    const kk = String(k).trim()
    if (!kk) continue
    if (list.some(sig => sig.includes(kk) || kk.includes(sig))) n += 1
  }
  return n
}

function round2(x) {
  return Math.round(x * 100) / 100
}
