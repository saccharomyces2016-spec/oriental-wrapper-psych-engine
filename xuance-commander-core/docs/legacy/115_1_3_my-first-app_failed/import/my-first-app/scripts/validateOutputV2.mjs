import readingEngine from '../src/core/flow/readingEngine.v1.js'
import buildOutputV2 from '../src/core/content/resultTemplates/readingOutputV2.js'

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

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function validateOutput(out) {
  assert(out?.version === 'v2', 'version not v2')
  assert(typeof out.generated_at === 'string', 'generated_at missing')
  assert(typeof out.reading_id === 'string', 'reading_id missing')
  assert(out?.source?.engine_version, 'source.engine_version missing')
  assert(out?.source?.variant_id, 'source.variant_id missing')
  assert(out?.inputs?.round2, 'inputs.round2 missing')
  assert(Array.isArray(out.inputs.round2.answered_ids), 'inputs.round2.answered_ids type')
  assert(Array.isArray(out.inputs.round2.chosen), 'inputs.round2.chosen type')
  assert(Array.isArray(out.inputs.round3?.answered), 'inputs.round3.answered type')
  assert(Array.isArray(out.inputs.round4?.answered_ids), 'inputs.round4.answered_ids type')
  assert(Array.isArray(out.inputs.round4?.chosen), 'inputs.round4.chosen type')
  assert(Array.isArray(out.plate?.top_themes), 'plate.top_themes type')
  assert(Array.isArray(out.plate?.facets), 'plate.facets type')
  assert(Array.isArray(out.plate?.signals), 'plate.signals type')
  assert(Array.isArray(out.plate?.anchors), 'plate.anchors type')
  assert(out.render?.title?.zh, 'render.title.zh missing')
  assert(Array.isArray(out.render?.sections), 'render.sections type')
  assert(out.telemetry_schema?.labels?.plate_id, 'telemetry_schema.labels.plate_id missing')
  assert(out.debug?.raw, 'debug.raw missing')
}

async function main() {
  const result = readingEngine(sampleInput)
  const out = buildOutputV2(result, { seed: 1 })
  validateOutput(out)
  console.log('[validate:outputv2] OK', {
    plate_id: out.reading_id,
    signals: out.plate.signals.length,
    themes: out.plate.top_themes.length
  })
}

main().catch(err => {
  console.error('[validate:outputv2] fail:', err.message || err)
  process.exitCode = 1
})
