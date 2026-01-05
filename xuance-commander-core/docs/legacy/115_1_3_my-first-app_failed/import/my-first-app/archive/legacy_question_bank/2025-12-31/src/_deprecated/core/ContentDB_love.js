// ContentDB_love.js
// 情（relationship/love）領域題庫：Round2 / Round3

export const LOVE_R2 = [
  {
    id: "lov_r2_1",
    label: "進退無門",
    desc: "想靠近，又怕受傷（暫用）",
    weights: { water: 2, wood: 1 },
    axes: { inward: 1, boundary: 1 }
  },
  {
    id: "lov_r2_2",
    label: "信任起霧",
    desc: "不確定對方真心幾分（暫用）",
    weights: { water: 2, metal: 1 },
    axes: { inward: 2, damp: 1 }
  },
  {
    id: "lov_r2_3",
    label: "言語成刺",
    desc: "講著講著就變成互傷（暫用）",
    weights: { fire: 2, metal: 1 },
    axes: { heat: 2, boundary: -1 }
  },
  {
    id: "lov_r2_4",
    label: "界線不清",
    desc: "你讓太多，或對方逼太近（暫用）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: 2 }
  },
  {
    id: "lov_r2_5",
    label: "情緒翻湧",
    desc: "一點小事就大起大落（暫用）",
    weights: { water: 2, fire: 1 },
    axes: { heat: 1, damp: 1 }
  },
  {
    id: "lov_r2_6",
    label: "舊影未散",
    desc: "過去陰影帶進現在（暫用）",
    weights: { water: 2, earth: 1 },
    axes: { inward: 2 }
  },
  {
    id: "lov_r2_7",
    label: "承諾猶疑",
    desc: "談未來就想逃，卻又捨不得（暫用）",
    weights: { wood: 1, water: 2 },
    axes: { move: 1, inward: 1 }
  },
  {
    id: "lov_r2_8",
    label: "外緣牽擾",
    desc: "家人/工作/距離一直干擾（暫用）",
    weights: { earth: 2, water: 1 },
    axes: { boundary: 1, damp: 1 }
  }
]

export const LOVE_R3 = [
  {
    id: "lov_r3_1",
    label: "冷熱不均",
    desc: "一方熱、一方淡，互相猜（中）",
    weights: { water: 2, fire: 1 },
    axes: { heat: 1, damp: 1 }
  },
  {
    id: "lov_r3_2",
    label: "安全感弱",
    desc: "總怕被拋下，忍不住確認（中/重）",
    weights: { water: 2, earth: 1 },
    axes: { inward: 2 }
  },
  {
    id: "lov_r3_3",
    label: "溝通失準",
    desc: "你說A他聽B，越解釋越亂（中）",
    weights: { metal: 1, water: 2 },
    axes: { boundary: 1, damp: 1 }
  },
  {
    id: "lov_r3_4",
    label: "界線失守",
    desc: "讓步過頭或控制過頭（中/重）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: 2 }
  },
  {
    id: "lov_r3_5",
    label: "第三方影",
    desc: "前任/曖昧/朋友影響你們（重）",
    weights: { fire: 2, water: 1 },
    axes: { heat: 2, boundary: -1 }
  },
  {
    id: "lov_r3_6",
    label: "遠近難調",
    desc: "遠距或作息不同，見面成本高（中）",
    weights: { water: 2, wood: 1 },
    axes: { move: 1, damp: 1 }
  },
  {
    id: "lov_r3_7",
    label: "家長壓力",
    desc: "長輩期待、婚事節奏讓你卡（中）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: 1, inward: 1 }
  },
  {
    id: "lov_r3_8",
    label: "情緒引爆",
    desc: "一吵就失控，事後很耗（重）",
    weights: { fire: 3, water: 1 },
    axes: { heat: 3, move: 1 }
  }
]