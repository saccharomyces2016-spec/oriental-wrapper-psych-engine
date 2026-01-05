import readingEngine from '../src/core/flow/readingEngine.v1.js'

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

async function main() {
  const output = readingEngine(sampleInput)
  // round-trip to ensure pure JSON shape
  JSON.parse(JSON.stringify(output))

  const signals = output?.situation_profile?.top_signals || []
  const themes = output?.top_themes || []
  const anchors = output?.anchors || []
  console.log('[validate:reading] OK', {
    domain: output.domain_key,
    signals: signals.length,
    themes: themes.length,
    anchors: anchors.length
  })
}

main().catch(err => {
  console.error('[validate:reading] error:', err)
  process.exitCode = 1
})
