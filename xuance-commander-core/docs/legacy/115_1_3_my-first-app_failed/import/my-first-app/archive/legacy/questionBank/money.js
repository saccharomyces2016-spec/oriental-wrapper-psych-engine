/**
 * core/psych/questionBank/money.js
 * 財（money）題庫：偏「命中感」與「可計分」
 *
 * 注意：
 * - 文字盡量繁體、可讀、不文言
 * - 選項 tag 會影響你 05 的「路徑回聲」與 hookLine 命中
 * - weights 只是初版，後續可用 Gemini 的研究資料大幅強化
 */

const money = {
  domain: 'money',

  // 題庫（可按 r1/r2/r3 拆三回合）
  questions: [
    {
      id: 'money_r1_001',
      domain: 'money',
      stage: 'r1',
      ageBand: 'all',
      prompt: '你對「變有錢」的第一反應，更像哪一種？',
      choices: [
        {
          id: 'm_r1_001_a',
          label: '想像得到畫面，但遲遲不敢真的開始',
          tag: '想要但不敢動',
          weights: {
            traits: { drive: +0.05, riskAversion: +0.18, innerTension: +0.12, control: +0.06 },
            axes: { inward: +0.18, move: -0.06, damp: +0.08, boundary: +0.04 },
            elements: { earth: +0.12, water: +0.10, wood: -0.02 }
          }
        },
        {
          id: 'm_r1_001_b',
          label: '會開始做，但做一半就開始懷疑是不是走錯',
          tag: '行動後自我否決',
          weights: {
            traits: { drive: +0.10, sensitivity: +0.12, innerTension: +0.14, riskAversion: +0.10 },
            axes: { move: +0.10, damp: +0.10, heat: +0.05 },
            elements: { wood: +0.08, water: +0.08, fire: +0.04 }
          }
        },
        {
          id: 'm_r1_001_c',
          label: '我會先算風險，把每個洞都補到我安心',
          tag: '先求不敗',
          weights: {
            traits: { riskAversion: +0.22, control: +0.18, stabilityNeed: +0.16, drive: -0.03 },
            axes: { boundary: +0.10, inward: +0.12, damp: +0.08 },
            elements: { metal: +0.12, earth: +0.10, water: +0.06 }
          }
        }
      ]
    },

    {
      id: 'money_r2_001',
      domain: 'money',
      stage: 'r2',
      ageBand: 'all',
      prompt: '如果真的出現一個「看起來能翻身」的機會，你最卡的是哪一句心聲？',
      choices: [
        {
          id: 'm_r2_001_a',
          label: '我其實一直在等一個不需要我負責的成功',
          tag: '等不必負責的成功',
          weights: {
            traits: { innerTension: +0.22, riskAversion: +0.14, drive: -0.06, stabilityNeed: +0.10 },
            axes: { inward: +0.18, damp: +0.10 },
            elements: { water: +0.14, earth: +0.08 }
          }
        },
        {
          id: 'm_r2_001_b',
          label: '我怕的是：一旦選錯，後果會把我整個人一起拖下去',
          tag: '怕一錯就沉',
          weights: {
            traits: { riskAversion: +0.24, sensitivity: +0.18, innerTension: +0.16, control: +0.08 },
            axes: { damp: +0.14, boundary: +0.06, inward: +0.06 },
            elements: { water: +0.16, metal: +0.06 }
          }
        },
        {
          id: 'm_r2_001_c',
          label: '我知道該動，但我更怕：動了之後才發現自己承接不起來',
          tag: '怕承接不起',
          weights: {
            traits: { stabilityNeed: +0.18, innerTension: +0.16, riskAversion: +0.12 },
            axes: { inward: +0.10, move: +0.06 },
            elements: { earth: +0.16, water: +0.06 }
          }
        }
      ]
    },

    {
      id: 'money_r3_001',
      domain: 'money',
      stage: 'r3',
      ageBand: 'all',
      prompt: '你最容易在「財」上被哪種狀況擊穿？（選一個最像的）',
      choices: [
        {
          id: 'm_r3_001_a',
          label: '帳目、負債、周轉壓力：像看不見的帳追著跑',
          tag: '看不見的帳',
          weights: {
            traits: { sensitivity: +0.12, innerTension: +0.14, riskAversion: +0.10, stabilityNeed: +0.10 },
            axes: { damp: +0.10, inward: +0.08 },
            elements: { water: +0.12, earth: +0.08 }
          }
        },
        {
          id: 'm_r3_001_b',
          label: '一有小失誤就開始自責，然後整個節奏亂掉',
          tag: '小錯就崩',
          weights: {
            traits: { control: +0.12, innerTension: +0.16, sensitivity: +0.14 },
            axes: { boundary: +0.06, heat: +0.06, damp: +0.06 },
            elements: { metal: +0.08, water: +0.10 }
          }
        },
        {
          id: 'm_r3_001_c',
          label: '別人一句話、一個比較，就讓我覺得自己走得太慢',
          tag: '被比較刺到',
          weights: {
            traits: { drive: +0.08, sensitivity: +0.12, innerTension: +0.10 },
            axes: { heat: +0.08, move: +0.06 },
            elements: { fire: +0.08, wood: +0.06 }
          }
        }
      ]
    }
  ],

  // 不是題目：給「命中感」用的觸發詞庫（後續可擴大）
  lexicon: {
    triggers: [
      { id: 'm_tr_001', text: '不犯錯', weight: { traits: { riskAversion: +0.08, control: +0.06 } } },
      { id: 'm_tr_002', text: '承擔不起', weight: { traits: { stabilityNeed: +0.08, innerTension: +0.06 } } },
      { id: 'm_tr_003', text: '被帳追著跑', weight: { traits: { sensitivity: +0.06, innerTension: +0.06 } } }
    ],
    punchlines: [
      '你不是缺機會，是每次機會來了，你先在心裡把自己判輸一次。',
      '你不是真的保守，你是把「失敗的後果」想得太完整。'
    ]
  }
}

export default money