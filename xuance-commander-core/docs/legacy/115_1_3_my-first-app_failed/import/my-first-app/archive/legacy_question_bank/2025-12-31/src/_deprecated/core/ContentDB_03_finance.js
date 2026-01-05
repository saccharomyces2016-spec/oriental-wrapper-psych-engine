// src/core/ContentDB_finance.js
// 財（money/finance）領域題庫：Round2（矛盾核心）/ Round3（細節與強度）

export const ROUND2_FINANCE = [
  {
    id: 'fin_r2_1',
    label: '收放失衡',
    desc: '想存又想花，進退兩難',
    weights: { earth: 2, metal: 2, water: 1 },
    axes: { boundary: 2, inward: 1 }
  },
  {
    id: 'fin_r2_2',
    label: '風險難定',
    desc: '怕錯過，又怕受傷',
    weights: { wood: 2, fire: 1, water: 2 },
    axes: { move: 2, damp: 1 }
  },
  {
    id: 'fin_r2_3',
    label: '現金乾涸',
    desc: '錢流卡住，壓力逼近',
    weights: { earth: 3, water: 1 },
    axes: { damp: 2, inward: 1 }
  },
  {
    id: 'fin_r2_4',
    label: '債影相隨',
    desc: '負擔牽連，心難安定',
    weights: { earth: 2, water: 2 },
    axes: { boundary: 1, damp: 2 }
  },
  {
    id: 'fin_r2_5',
    label: '價值搖擺',
    desc: '不知該投資自己，還是守住安全',
    weights: { metal: 2, wood: 2 },
    axes: { boundary: 1, move: 1, inward: 1 }
  },
  {
    id: 'fin_r2_6',
    label: '機會過門',
    desc: '機會來過，卻抓不住節奏',
    weights: { wood: 2, fire: 2 },
    axes: { move: 2, heat: 1 }
  },
  {
    id: 'fin_r2_7',
    label: '帳目成網',
    desc: '收入支出牽扯，越理越亂',
    weights: { earth: 2, metal: 1, water: 2 },
    axes: { inward: 2, damp: 1 }
  },
  {
    id: 'fin_r2_8',
    label: '心火催促',
    desc: '焦急想翻身，反而判斷失準',
    weights: { fire: 3, water: 1 },
    axes: { heat: 2, move: 1 }
  }
]

export const ROUND3_FINANCE = [
  {
    id: 'fin_r3_1',
    label: '月度赤字',
    desc: '每月都差一點，(中)',
    weights: { earth: 2, water: 1 },
    axes: { damp: 1, inward: 1 }
  },
  {
    id: 'fin_r3_2',
    label: '支出失控',
    desc: '衝動消費後懊悔，(中)',
    weights: { fire: 2, water: 1 },
    axes: { heat: 1, move: 1 }
  },
  {
    id: 'fin_r3_3',
    label: '家用牽扯',
    desc: '家庭開銷拉扯你，(中)',
    weights: { earth: 2, wood: 1 },
    axes: { boundary: 1, inward: 1 }
  },
  {
    id: 'fin_r3_4',
    label: '收入不穩',
    desc: '案量/業績波動大，(重)',
    weights: { water: 2, wood: 1 },
    axes: { damp: 1, move: 1 }
  },
  {
    id: 'fin_r3_5',
    label: '投資猶疑',
    desc: '看懂了卻不敢下手，(中)',
    weights: { metal: 2, water: 1 },
    axes: { boundary: 1, inward: 1 }
  },
  {
    id: 'fin_r3_6',
    label: '追高殺低',
    desc: '情緒交易，越做越亂，(重)',
    weights: { fire: 2, wood: 1, water: 1 },
    axes: { heat: 2, move: 1 }
  },
  {
    id: 'fin_r3_7',
    label: '債務月付',
    desc: '月付壓迫感強，(重)',
    weights: { earth: 2, water: 2 },
    axes: { damp: 2, inward: 1 }
  },
  {
    id: 'fin_r3_8',
    label: '財路未明',
    desc: '想開源，但方向散，(中)',
    weights: { wood: 2, earth: 1 },
    axes: { move: 1, inward: 1 }
  },
  {
    id: 'fin_r3_9',
    label: '金流中斷',
    desc: '有大筆支出逼近，(重)',
    weights: { earth: 3, water: 1 },
    axes: { damp: 2 }
  },
  {
    id: 'fin_r3_10',
    label: '安全焦慮',
    desc: '總覺得不夠，睡不安，(重)',
    weights: { earth: 2, metal: 1, water: 2 },
    axes: { inward: 2, boundary: 1 }
  },
  {
    id: 'fin_r3_11',
    label: '被迫支援',
    desc: '替人扛帳或被借錢，(中)',
    weights: { earth: 2, wood: 1 },
    axes: { boundary: 2 }
  },
  {
    id: 'fin_r3_12',
    label: '目標模糊',
    desc: '不知道要存到哪、投到哪，(輕)',
    weights: { metal: 1, water: 1 },
    axes: { inward: 1 }
  }
]