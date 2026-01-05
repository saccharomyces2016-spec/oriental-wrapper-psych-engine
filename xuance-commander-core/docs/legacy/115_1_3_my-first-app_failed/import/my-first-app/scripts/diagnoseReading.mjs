import { readFile } from 'node:fs/promises'
import path from 'node:path'
import readingEngine from '../src/core/flow/readingEngine.v1.js'

const ROOT = process.cwd()
const SAMPLE_PATH = path.resolve(ROOT, 'readingSelections.sample.json')
const R2_PATH = path.resolve(ROOT, 'src/core/ontology/round2Situations.v1.json')
const R4_PATH = path.resolve(ROOT, 'src/core/ontology/round4Anchors.v1.json')

async function loadJson(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    return null
  }
}

function buildOptionMaps(r2, r4) {
  const r2List = Array.isArray(r2?.questions) ? r2.questions : []
  const r2IdSet = new Set()
  const r2Options = new Map()
  r2List.forEach(q => {
    if (!q?.situation_id) return
    r2IdSet.add(q.situation_id)
    const map = new Map()
    ;(q.options || []).forEach(opt => {
      const key = String(opt?.key || '').trim().toUpperCase()
      if (!key) return
      const text = String(opt?.text_zh || opt?.text_en || key).trim()
      map.set(key, text)
    })
    r2Options.set(q.situation_id, map)
  })

  const r4List = Array.isArray(r4?.items) ? r4.items : []
  const r4IdSet = new Set()
  const r4Options = new Map()
  r4List.forEach(q => {
    if (!q?.id) return
    r4IdSet.add(q.id)
    const map = new Map()
    ;(q.choice_meta || []).forEach((meta, idx) => {
      const key = String.fromCharCode(65 + idx)
      const text = String(meta?.choice || key).trim()
      map.set(key, text)
    })
    r4Options.set(q.id, map)
  })

  return { r2IdSet, r2Options, r4IdSet, r4Options }
}

function normalizeRound2(raw, maps, notes) {
  const out = []
  const invalidIds = []
  const invalidChoices = []
  const letterOnly = []

  const src = raw?.round2 || raw?.situation_answers ? raw : raw?.round2 ? raw.round2 : raw
  let answers = []
  if (Array.isArray(src?.situation_answers)) answers = src.situation_answers
  else if (Array.isArray(src)) answers = src
  else if (src?.situation_answers && typeof src.situation_answers === 'object') {
    answers = Object.entries(src.situation_answers).map(([id, choice]) => ({
      question_id: id,
      choice
    }))
  } else if (src && typeof src === 'object' && !Array.isArray(src)) {
    answers = Object.entries(src).map(([id, choice]) => ({ question_id: id, choice }))
  }

  for (const ans of answers) {
    const id = ans?.question_id || ans?.situation_id || ans?.id
    if (!id || !maps.r2IdSet.has(id)) {
      invalidIds.push(id || 'unknown')
      continue
    }
    const val = String(ans?.choice || ans?.option || ans?.choiceKey || ans?.key || '').trim()
    if (!val) {
      invalidChoices.push(id)
      continue
    }
    const upper = val.toUpperCase()
    const optMap = maps.r2Options.get(id) || new Map()
    let choiceText = ''
    if (optMap.has(upper)) {
      letterOnly.push(id)
      choiceText = optMap.get(upper)
    } else if ([...optMap.values()].includes(val)) {
      choiceText = val
    } else {
      invalidChoices.push(id)
      continue
    }
    out.push({ question_id: id, choice: choiceText, choice_key: upper })
  }

  return { answers: out, invalidIds, invalidChoices, letterOnly }
}

function normalizeRound4(raw, maps) {
  const out = []
  const invalidIds = []
  const invalidChoices = []

  const src = raw?.round4 || raw?.anchor_answers ? raw : raw?.round4 ? raw.round4 : raw
  let answers = []
  if (Array.isArray(src?.anchor_answers)) answers = src.anchor_answers
  else if (Array.isArray(src)) answers = src
  else if (src?.anchor_answers && typeof src.anchor_answers === 'object') {
    answers = Object.entries(src.anchor_answers).map(([id, choice]) => ({
      question_id: id,
      choice
    }))
  } else if (src && typeof src === 'object' && !Array.isArray(src)) {
    answers = Object.entries(src).map(([id, choice]) => ({ question_id: id, choice }))
  }

  for (const ans of answers) {
    const id = ans?.question_id || ans?.anchor_id || ans?.id
    if (!id || !maps.r4IdSet.has(id)) {
      invalidIds.push(id || 'unknown')
      continue
    }
    const val = String(ans?.choice || ans?.option || ans?.choiceKey || ans?.key || '').trim()
    if (!val) {
      invalidChoices.push(id)
      continue
    }
    const optMap = maps.r4Options.get(id) || new Map()
    const upper = val.toUpperCase()
    let choiceText = ''
    if (optMap.has(upper)) choiceText = optMap.get(upper)
    else if ([...optMap.values()].includes(val)) choiceText = val
    else {
      invalidChoices.push(id)
      continue
    }
    out.push({ question_id: id, choice: choiceText, choice_key: upper })
  }

  return { answers: out, invalidIds, invalidChoices }
}

function pickTop(arr, n = 3) {
  return (arr || []).slice(0, n)
}

function classifySignalsZero(r2Diag) {
  if (r2Diag.letterOnly.length) return 'A) Round2 choice仍為A/B/C/D，需要換成文字'
  if (r2Diag.invalidIds.length) return 'B) Round2 question_id不存在於 round2Situations'
  if (r2Diag.invalidChoices.length) return 'C) Round2 choiceText 未在該題 options.text_zh 中'
  return 'D) Engine對 Round2 的 lookup 可能仍使用其他結構，檢查 scoreRound2() / choice_meta'
}

async function main() {
  const [r2, r4] = await Promise.all([loadJson(R2_PATH), loadJson(R4_PATH)])
  if (!r2 || !r4) {
    console.error('Failed to load ontology files')
    process.exit(1)
  }
  const maps = buildOptionMaps(r2, r4)

  const sample =
    (await loadJson(SAMPLE_PATH)) || {
      round1: { domain_key: 'career' },
      round2: {
        situation_answers: {
          r2_s02_money_pressure: 'B',
          r2_s05_work_stuck: 'C',
          r2_s10_decision_overload: 'A'
        }
      },
      round3: {
        theme_answers: [
          {
            theme_id: 'chronic_depletion',
            question_index: 0,
            choice: '覺得身體沉重，想躲回被窩'
          },
          {
            theme_id: 'loss_of_agency',
            question_index: 0,
            choice: '加倍兼職，試圖對抗命運'
          }
        ]
      },
      round4: {
        anchor_answers: {
          r4_a01: 'A'
        }
      }
    }

  const r2Diag = normalizeRound2(sample?.round2 || sample, maps, [])
  const r4Diag = normalizeRound4(sample?.round4 || sample, maps)

  const payload = {
    round1: sample?.round1 || { domain_key: 'career' },
    round2: { situation_answers: r2Diag.answers.map(a => ({ question_id: a.question_id, choice: a.choice })) },
    round3: sample?.round3 || { theme_answers: [] },
    round4: { anchor_answers: r4Diag.answers.map(a => ({ question_id: a.question_id, choice: a.choice })) }
  }

  const result = readingEngine(payload)

  const signals = result?.situation_profile?.top_signals || []
  const reasons = !signals.length ? classifySignalsZero(r2Diag) : ''

  console.log('=== Reading Engine Diagnosis ===')
  console.log(`Domain: ${payload.round1.domain_key || 'unknown'}`)
  console.log(`Round2 answers: ${r2Diag.answers.length} | Round4 answers: ${r4Diag.answers.length}`)
  console.log('Round2 detail:')
  r2Diag.answers.forEach(a => {
    console.log(` - ${a.question_id}: ${a.choice_key || '?'} => ${a.choice}`)
  })
  console.log('Signals:', signals.map(s => `${s.signal_key}:${s.score}`).join(', ') || 'None')
  console.log('Top themes:', pickTop(result?.top_themes).map(t => `${t.theme_id}:${t.score}`).join(', ') || 'None')
  const facetArr = Object.entries(result?.facet_scores || {})
    .map(([facet, score]) => ({ facet, score }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
  console.log(
    'Facets:',
    pickTop(facetArr).map(f => `${f.facet}:${f.score}`).join(', ') || 'None'
  )
  if (r2Diag.invalidIds.length) console.log('Invalid Round2 IDs:', r2Diag.invalidIds.join(', '))
  if (r2Diag.invalidChoices.length) console.log('Invalid Round2 choices:', r2Diag.invalidChoices.join(', '))
  if (!signals.length) {
    console.log('⚠️ Signals=0原因推斷：', reasons)
    console.log('建議查看：src/core/flow/readingEngine.v1.js -> scoreRound2() / choice_meta 匹配')
  }
}

main().catch(err => {
  console.error('[diagnoseReading] error:', err)
  process.exitCode = 1
})
