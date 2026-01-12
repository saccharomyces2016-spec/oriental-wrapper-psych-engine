// src/core/content/ContentDB_relationship.js

export const ROUND2 = [
  { id: 'rel_r2_1', label: '靠近即傷', desc: '想親近，但一靠近就痛',
    weights: { water: 1.0, fire: 0.4 }, axes: { inward: 0.8, boundary: 0.3 } },
  { id: 'rel_r2_2', label: '界線不明', desc: '你讓太多，對方要更多',
    weights: { earth: 0.7, water: 0.6 }, axes: { boundary: -0.8, inward: 0.4 } },
  { id: 'rel_r2_3', label: '情緒換承諾', desc: '吵了才有回應，久了更累',
    weights: { fire: 0.9, water: 0.5 }, axes: { heat: 0.8, boundary: -0.2 } },
  { id: 'rel_r2_4', label: '信任難立', desc: '你怕再一次失望',
    weights: { metal: 0.6, water: 0.8 }, axes: { inward: 0.8, boundary: 0.5 } },
  { id: 'rel_r2_5', label: '付出失衡', desc: '你付出多，心裡不平',
    weights: { wood: 0.7, earth: 0.5 }, axes: { inward: 0.5, boundary: -0.4 } },
  { id: 'rel_r2_6', label: '價值相左', desc: '不是不愛，是路不同',
    weights: { metal: 0.7, earth: 0.4 }, axes: { boundary: 0.6, move: 0.2 } },
  { id: 'rel_r2_7', label: '冷熱失衡', desc: '一個想黏，一個想躲',
    weights: { fire: 0.5, water: 0.8 }, axes: { heat: 0.5, inward: 0.6, boundary: 0.2 } },
  { id: 'rel_r2_8', label: '舊傷未解', desc: '過去的刺，現在還在痛',
    weights: { water: 1.1, earth: 0.4 }, axes: { inward: 0.9, damp: 0.3 } }
]

export const ROUND3 = [
  { id: 'rel_r3_1', label: '溝通失真', desc: '你說A，他聽成B',
    weights: { metal: 0.6, water: 0.5 }, axes: { boundary: 0.4, inward: 0.2 } },
  { id: 'rel_r3_2', label: '忽冷忽熱', desc: '熱的時候很熱，冷的時候像消失',
    weights: { fire: 0.7, water: 0.7 }, axes: { heat: 0.6, inward: 0.4 } },
  { id: 'rel_r3_3', label: '安全感低', desc: '你需要確認，卻不敢要',
    weights: { water: 0.9, earth: 0.4 }, axes: { inward: 0.8, boundary: 0.2 } },
  { id: 'rel_r3_4', label: '被比較感', desc: '你覺得自己總是不如別人',
    weights: { metal: 0.7, water: 0.4 }, axes: { inward: 0.7 } },
  { id: 'rel_r3_5', label: '承諾恐懼', desc: '你怕定下來，就失去自己',
    weights: { metal: 0.6, wood: 0.4, water: 0.5 }, axes: { boundary: 0.6, inward: 0.6 } },
  { id: 'rel_r3_6', label: '容易爆炸', desc: '小事累積，最後大爆',
    weights: { fire: 1.0, earth: 0.3 }, axes: { heat: 0.9, boundary: -0.2 } },
  { id: 'rel_r3_7', label: '難以拒絕', desc: '你怕拒絕就失去關係',
    weights: { earth: 0.6, water: 0.5 }, axes: { boundary: -0.6, inward: 0.5 } },
  { id: 'rel_r3_8', label: '渴望被懂', desc: '你不是要黏，是要被理解',
    weights: { water: 0.9, wood: 0.4 }, axes: { inward: 0.8, move: 0.1 } }
]

// ✅ 給 index.js 用的「穩定匯出名」：ContentDB_relationship


export const ContentDB_relationship = {
  domain: 'relationship',
  ROUND2,
  ROUND3,
  round2: ROUND2, // 額外 alias，避免你其他地方吃 round2 / round3
  round3: ROUND3
}