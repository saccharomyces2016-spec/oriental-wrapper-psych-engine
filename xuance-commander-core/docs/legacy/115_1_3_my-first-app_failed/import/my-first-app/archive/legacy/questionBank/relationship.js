/**
 * core/psych/questionBank/relationship.js
 * 情（relationship）題庫：同樣以命中感＋可計分為主
 */

const relationship = {
  domain: 'relationship',

  questions: [
    {
      id: 'rel_r1_001',
      domain: 'relationship',
      stage: 'r1',
      ageBand: 'all',
      prompt: '你在關係裡最常出現的狀態，更像哪一種？',
      choices: [
        {
          id: 'r_r1_001_a',
          label: '我很在乎，但我會裝得沒那麼在乎',
          tag: '在乎卻裝沒事',
          weights: {
            traits: { control: +0.10, sensitivity: +0.12, innerTension: +0.10 },
            axes: { boundary: +0.08, inward: +0.08 },
            elements: { metal: +0.08, water: +0.08 }
          }
        },
        {
          id: 'r_r1_001_b',
          label: '我想靠近，但靠近後又開始想退',
          tag: '靠近又想退',
          weights: {
            traits: { innerTension: +0.18, riskAversion: +0.10, sensitivity: +0.10 },
            axes: { move: +0.06, inward: +0.10, damp: +0.06 },
            elements: { water: +0.10, earth: +0.06 }
          }
        },
        {
          id: 'r_r1_001_c',
          label: '我不怕孤單，我怕的是失控與委屈',
          tag: '怕失控委屈',
          weights: {
            traits: { control: +0.18, riskAversion: +0.10, stabilityNeed: +0.10 },
            axes: { boundary: +0.12, inward: +0.06 },
            elements: { metal: +0.10, earth: +0.06 }
          }
        }
      ]
    },

    {
      id: 'rel_r2_001',
      domain: 'relationship',
      stage: 'r2',
      ageBand: 'all',
      prompt: '關係裡讓你最難受的矛盾是哪個？',
      choices: [
        {
          id: 'r_r2_001_a',
          label: '我需要被懂，但我又不想解釋',
          tag: '需要被懂但不想說',
          weights: {
            traits: { sensitivity: +0.18, innerTension: +0.14 },
            axes: { inward: +0.10, damp: +0.08 },
            elements: { water: +0.12 }
          }
        },
        {
          id: 'r_r2_001_b',
          label: '我想被接住，但我更怕把需要交到別人手上',
          tag: '怕交出需要',
          weights: {
            traits: { riskAversion: +0.14, control: +0.10, innerTension: +0.16 },
            axes: { boundary: +0.08, inward: +0.08 },
            elements: { metal: +0.06, water: +0.10 }
          }
        },
        {
          id: 'r_r2_001_c',
          label: '我其實不怕結束，我怕的是被否定',
          tag: '怕被否定',
          weights: {
            traits: { sensitivity: +0.18, innerTension: +0.12, control: +0.06 },
            axes: { heat: +0.06, damp: +0.06 },
            elements: { fire: +0.06, water: +0.06 }
          }
        }
      ]
    }
  ],

  lexicon: {
    triggers: [
      { id: 'r_tr_001', text: '主動權', weight: { traits: { control: +0.08 } } },
      { id: 'r_tr_002', text: '被珍惜', weight: { traits: { sensitivity: +0.06 } } },
      { id: 'r_tr_003', text: '把需要交出去', weight: { traits: { innerTension: +0.06, riskAversion: +0.06 } } }
    ],
    punchlines: [
      '你不是不愛，你是不敢在愛裡失去主動權。',
      '你把距離當安全感，但溫度也一起被你隔開了。'
    ]
  }
}

export default relationship