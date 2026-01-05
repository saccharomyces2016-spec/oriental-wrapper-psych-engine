// ContentDB_finance.js
// 財（money/finance）領域題庫：Round2 / Round3
// 規格：每個 token 可選擇性帶 weights / axes，用於向量累積（03 -> 04/05）

export const FINANCE_R2 = [
  {
    id: "fin_r2_1",
    label: "進退兩難",
    desc: "想衝一把，又怕失手（暫用）",
    weights: { water: 2, earth: 1 },
    axes: { move: -1, inward: 1, boundary: 1 }
  },
  {
    id: "fin_r2_2",
    label: "錢潮不穩",
    desc: "收入忽高忽低，心很難定（暫用）",
    weights: { water: 2, wood: 1 },
    axes: { damp: 1, inward: 1 }
  },
  {
    id: "fin_r2_3",
    label: "帳目失衡",
    desc: "支出像漏水，越補越大（暫用）",
    weights: { water: 1, earth: 2 },
    axes: { damp: 1, boundary: -1 }
  },
  {
    id: "fin_r2_4",
    label: "利害相纏",
    desc: "人情與金錢綁在一起（暫用）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: -1, inward: 1 }
  },
  {
    id: "fin_r2_5",
    label: "心火燒錢",
    desc: "焦慮就想花，花完更焦慮（暫用）",
    weights: { fire: 2, water: 1 },
    axes: { heat: 2, move: 1 }
  },
  {
    id: "fin_r2_6",
    label: "資源不聚",
    desc: "明明努力，卻留不住成果（暫用）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: 1, inward: 1 }
  },
  {
    id: "fin_r2_7",
    label: "風險牽心",
    desc: "看見機會就心動，想到風險就縮（暫用）",
    weights: { wood: 1, water: 2 },
    axes: { move: 1, inward: 1 }
  },
  {
    id: "fin_r2_8",
    label: "家計牽制",
    desc: "家庭責任讓你不敢換路（暫用）",
    weights: { earth: 2, water: 1 },
    axes: { boundary: 1, inward: 1 }
  }
]

export const FINANCE_R3 = [
  {
    id: "fin_r3_1",
    label: "現金吃緊",
    desc: "月底常見底，心裡發慌（中/重）",
    weights: { water: 2, earth: 1 },
    axes: { damp: 1, inward: 1 }
  },
  {
    id: "fin_r3_2",
    label: "債壓如山",
    desc: "債務或分期讓你喘不過氣（重）",
    weights: { earth: 3, water: 1 },
    axes: { boundary: 1, inward: 2 }
  },
  {
    id: "fin_r3_3",
    label: "衝動破財",
    desc: "情緒上來就買，之後後悔（中）",
    weights: { fire: 2, water: 1 },
    axes: { heat: 2, move: 1 }
  },
  {
    id: "fin_r3_4",
    label: "投資猶疑",
    desc: "想投又怕，常錯過或追高（中）",
    weights: { water: 2, metal: 1 },
    axes: { inward: 1, boundary: 1 }
  },
  {
    id: "fin_r3_5",
    label: "收入停滯",
    desc: "薪資卡住，努力像原地跑（中）",
    weights: { earth: 2, wood: 1 },
    axes: { move: -1, inward: 1 }
  },
  {
    id: "fin_r3_6",
    label: "家用拉扯",
    desc: "家人開銷觀念不同，常起爭（中）",
    weights: { earth: 2, metal: 1 },
    axes: { boundary: -1, heat: 1 }
  },
  {
    id: "fin_r3_7",
    label: "帳本失序",
    desc: "收支沒系統，越記越亂（輕/中）",
    weights: { earth: 2, water: 1 },
    axes: { boundary: 1 }
  },
  {
    id: "fin_r3_8",
    label: "突發破局",
    desc: "醫療/修繕/意外一來就大失血（重）",
    weights: { water: 2, earth: 2 },
    axes: { damp: 1, boundary: 1 }
  }
]