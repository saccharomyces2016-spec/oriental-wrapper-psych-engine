
export const ContentDB_family = {
  domain: 'family',
  round2: [
    { id: 'f_r2_1', label: '承家之局', desc: '你在撐一個家', weights: { earth: 2 }, axes: { inward: 1 } },
    { id: 'f_r2_2', label: '牽扯之局', desc: '愛與壓力綁在一起', weights: { water: 1, earth: 1 }, axes: { inward: 1 } },
    { id: 'f_r2_3', label: '界線之局', desc: '太近會窒息，太遠會罪惡', weights: { metal: 1 }, axes: { boundary: 1 } }
  ],
  round3: [
    { id: 'f_r3_1', label: '情緒勒索感', desc: '你很難說不', weights: { water: 1 }, axes: { damp: 1 } },
    { id: 'f_r3_2', label: '責任過量', desc: '你扛太多不是義務的事', weights: { earth: 1 }, axes: { inward: 1 } },
    { id: 'f_r3_3', label: '想逃離', desc: '你不是不孝，是太窒息', weights: { wood: 1 }, axes: { move: 1 } }
  ]
}