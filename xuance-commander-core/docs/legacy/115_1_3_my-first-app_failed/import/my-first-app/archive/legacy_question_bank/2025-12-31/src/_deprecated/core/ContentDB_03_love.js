// src/core/ContentDB_love.js
// 情（relationship/love）領域題庫：Round2（矛盾核心）/ Round3（細節與強度）

export const ROUND2_LOVE = [
  {
    id: 'love_r2_1',
    label: '靠近即刺',
    desc: '想親近，又怕受傷',
    weights: { water: 2, metal: 2 },
    axes: { boundary: 2, inward: 1 }
  },
  {
    id: 'love_r2_2',
    label: '熱冷交替',
    desc: '忽遠忽近，心不安',
    weights: { fire: 2, water: 2 },
    axes: { heat: 2, damp: 1 }
  },
  {
    id: 'love_r2_3',
    label: '承諾難立',
    desc: '想定下來，又怕失去自由',
    weights: { wood: 2, metal: 2 },
    axes: { move: 2, boundary: 1 }
  },
  {
    id: 'love_r2_4',
    label: '界線不明',
    desc: '付出過多，卻得不到回應',
    weights: { earth: 2, water: 2 },
    axes: { boundary: 2, damp: 1 }
  },
  {
    id: 'love_r2_5',
    label: '信任搖晃',
    desc: '想相信，卻總在猜',
    weights: { water: 3, metal: 1 },
    axes: { inward: 2, boundary: 1 }
  },
  {
    id: 'love_r2_6',
    label: '舊影未散',
    desc: '過往經驗牽制當下',
    weights: { water: 2, earth: 1, metal: 1 },
    axes: { damp: 2, inward: 1 }
  },
  {
    id: 'love_r2_7',
    label: '言不達意',
    desc: '想講清楚，卻越講越亂',
    weights: { metal: 2, fire: 1, earth: 1 },
    axes: { boundary: 1, heat: 1, inward: 1 }
  },
  {
    id: 'love_r2_8',
    label: '欲求不齊',
    desc: '你要的與對方要的不同',
    weights: { wood: 2, earth: 2 },
    axes: { boundary: 2, move: 1 }
  }
]

export const ROUND3_LOVE = [
  {
    id: 'love_r3_1',
    label: '冷戰成常',
    desc: '沉默拉長，(中)',
    weights: { water: 2, earth: 1 },
    axes: { inward: 2 }
  },
  {
    id: 'love_r3_2',
    label: '猜疑增生',
    desc: '訊息、行蹤都在意，(重)',
    weights: { water: 2, metal: 1 },
    axes: { boundary: 2, inward: 1 }
  },
  {
    id: 'love_r3_3',
    label: '承諾拉扯',
    desc: '談未來就焦躁，(中)',
    weights: { wood: 1, metal: 2 },
    axes: { move: 1, boundary: 1 }
  },
  {
    id: 'love_r3_4',
    label: '情緒炸裂',
    desc: '小事就爆，(重)',
    weights: { fire: 3, water: 1 },
    axes: { heat: 2, move: 1 }
  },
  {
    id: 'love_r3_5',
    label: '付出失衡',
    desc: '你一直給，對方不接，(中)',
    weights: { earth: 2, water: 1 },
    axes: { boundary: 2 }
  },
  {
    id: 'love_r3_6',
    label: '親密退潮',
    desc: '靠近就想躲，(中)',
    weights: { metal: 2, water: 1 },
    axes: { boundary: 2, inward: 1 }
  },
  {
    id: 'love_r3_7',
    label: '價值衝突',
    desc: '金錢/家庭觀不同，(中)',
    weights: { earth: 2, wood: 1 },
    axes: { boundary: 2 }
  },
  {
    id: 'love_r3_8',
    label: '第三方影',
    desc: '曖昧/前任干擾，(重)',
    weights: { water: 2, fire: 1, metal: 1 },
    axes: { damp: 1, heat: 1, boundary: 1 }
  },
  {
    id: 'love_r3_9',
    label: '溝通斷線',
    desc: '越談越偏題，(中)',
    weights: { metal: 2, earth: 1 },
    axes: { inward: 1, boundary: 1 }
  },
  {
    id: 'love_r3_10',
    label: '安全感缺',
    desc: '需要確認很多次，(重)',
    weights: { earth: 2, water: 2 },
    axes: { inward: 2, damp: 1 }
  },
  {
    id: 'love_r3_11',
    label: '相處耗竭',
    desc: '在一起反而更累，(重)',
    weights: { earth: 2, water: 1, metal: 1 },
    axes: { damp: 2, inward: 1 }
  },
  {
    id: 'love_r3_12',
    label: '期待落差',
    desc: '你想要的，他給不了，(中)',
    weights: { wood: 1, earth: 2 },
    axes: { boundary: 2 }
  }
]