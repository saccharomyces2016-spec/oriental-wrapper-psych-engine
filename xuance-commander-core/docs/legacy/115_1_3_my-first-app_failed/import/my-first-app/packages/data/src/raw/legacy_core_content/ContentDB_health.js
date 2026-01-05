
export const ContentDB_health = {
  domain: 'health',
  round2: [
    { id: 'h_r2_1', label: '形神之耗', desc: '身扛得住，心先撐不住', weights: { water: 1, earth: 1 }, axes: { inward: 1 } },
    { id: 'h_r2_2', label: '火盛之局', desc: '急、燥、睡不沉', weights: { fire: 2 }, axes: { heat: 1 } },
    { id: 'h_r2_3', label: '氣滯之局', desc: '你不是病，是卡太久', weights: { metal: 1 }, axes: { boundary: 1 } }
  ],
  round3: [
    { id: 'h_r3_1', label: '失眠', desc: '腦停不下來', weights: { fire: 1 }, axes: { heat: 1 } },
    { id: 'h_r3_2', label: '久累', desc: '累到麻木', weights: { earth: 1 }, axes: { inward: 1 } },
    { id: 'h_r3_3', label: '敏感', desc: '小事也會刺', weights: { water: 1 }, axes: { damp: 1 } }
  ]
}