import readingEngine from '../src/core/flow/readingEngine.v1.js'
import buildNarrative from '../src/core/flow/readingNarrative.v1.js'

const BANNED = [
  '你不是不努力',
  '你不是想太多',
  '其實你只是',
  '你一直以來都',
  '你天生就是',
  '這不是你的錯',
  '你只是',
  '你應該'
]

const sampleInput = {
  round1: { domain_key: 'career' },
  round2: {
    situation_answers: [
      {
        question_id: 'r2_s02_money_pressure',
        choice: '我會立刻盤點、算清楚、把計畫排出來'
      },
      {
        question_id: 'r2_s05_work_stuck',
        choice: '我會換打法：拆解、改順序、找更有效的路徑'
      },
      {
        question_id: 'r2_s10_decision_overload',
        choice: '資訊越看越亂，最後乾脆先不做'
      }
    ]
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
    anchor_answers: [
      {
        question_id: 'r4_a01',
        choice: '先停一下，拆解回饋裡可行的部分再前進'
      }
    ]
  }
}

function containsBanned(text) {
  return BANNED.some(b => text.includes(b))
}

function assertNarrative(narr) {
  if (!narr) throw new Error('narrative null')
  const { whereLine, whyLines, nextLines } = narr
  if (!whereLine || containsBanned(whereLine)) throw new Error('whereLine invalid')
  if (!Array.isArray(whyLines) || whyLines.length < 2) throw new Error('whyLines missing')
  if (!Array.isArray(nextLines) || nextLines.length < 3) throw new Error('nextLines missing')
  for (const l of [...whyLines, ...nextLines]) {
    if (!l) throw new Error('empty line')
    if (containsBanned(l)) throw new Error('banned phrase detected')
  }
  const noShould = [...whyLines, ...nextLines, whereLine].some(l => l.includes('你應該'))
  if (noShould) throw new Error('contains imperative phrasing')
}

async function main() {
  const result = readingEngine(sampleInput)
  for (let i = 0; i < 20; i++) {
    const narr = buildNarrative(result, { seed: i + 1 })
    assertNarrative(narr)
  }
  console.log('[validate:narrative] OK')
}

main().catch(err => {
  console.error('[validate:narrative] fail:', err.message || err)
  process.exitCode = 1
})
