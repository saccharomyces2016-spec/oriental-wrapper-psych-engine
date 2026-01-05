// src/core/content/ContentDB_money.js

export const ROUND2 = [
  { id:'m_r2_1', label:'漏財之局', desc:'錢一直流失，卻說不清從哪裡漏',
    weights:{ water:0.8, earth:0.5 }, axes:{ damp:0.6, inward:0.4 } },
  { id:'m_r2_2', label:'守財太緊', desc:'不敢花也不敢投，怕一動就錯',
    weights:{ metal:0.7, water:0.5 }, axes:{ boundary:0.7, inward:0.5 } },
  { id:'m_r2_3', label:'衝動破局', desc:'明知不該買/不該賭，還是忍不住',
    weights:{ fire:0.9, water:0.4 }, axes:{ heat:0.8, move:0.4 } },
  { id:'m_r2_4', label:'家計牽制', desc:'自己的盤被家庭/關係綁住，動彈不得',
    weights:{ earth:0.9, water:0.4 }, axes:{ inward:0.5, boundary:0.2 } },
  { id:'m_r2_5', label:'算太多停太久', desc:'一直驗算、一直比較，最後什麼都沒做',
    weights:{ metal:0.6, earth:0.5 }, axes:{ inward:0.6, move:-0.2 } },
  { id:'m_r2_6', label:'收入焦慮', desc:'不是賺不到，是怕下一次突然斷',
    weights:{ water:0.9, metal:0.4 }, axes:{ damp:0.7, inward:0.6 } },
  { id:'m_r2_7', label:'承諾壓力', desc:'一背責任就喘不過氣，錢變成枷鎖',
    weights:{ earth:0.8, metal:0.4 }, axes:{ inward:0.5, boundary:0.4 } },
  { id:'m_r2_8', label:'目標迷霧', desc:'想變好，但不知道要先攻哪一塊',
    weights:{ wood:0.6, water:0.5 }, axes:{ move:0.3, damp:0.4 } }
]

export const ROUND3 = [
  { id:'m_r3_1', label:'債務壓迫', desc:'欠款/貸款/卡費像陰影跟著你',
    weights:{ water:0.8, earth:0.5 }, axes:{ inward:0.6, damp:0.5 } },
  { id:'m_r3_2', label:'現金流斷點', desc:'一個意外就全盤緊',
    weights:{ water:0.9, metal:0.3 }, axes:{ damp:0.6, inward:0.4 } },
  { id:'m_r3_3', label:'投資恐懼', desc:'怕買在高點、怕賣在低點',
    weights:{ metal:0.7, water:0.5 }, axes:{ inward:0.6 } },
  { id:'m_r3_4', label:'人情破財', desc:'不好意思拒絕，錢一直出去',
    weights:{ earth:0.6, water:0.4 }, axes:{ boundary:-0.5, inward:0.3 } },
  { id:'m_r3_5', label:'自我懲罰性消費', desc:'壓力大就想用花錢換喘息',
    weights:{ fire:0.7, water:0.4 }, axes:{ heat:0.5, damp:0.3 } },
  { id:'m_r3_6', label:'工時換錢疲乏', desc:'靠硬撐賺來的錢，身心先垮',
    weights:{ earth:0.7, fire:0.4 }, axes:{ inward:0.4 } },
  { id:'m_r3_7', label:'資訊過載', desc:'看太多資訊，反而更不敢下決定',
    weights:{ metal:0.6, water:0.4 }, axes:{ inward:0.5 } },
  { id:'m_r3_8', label:'習慣性拖延', desc:'知道要做，但就是一直延後',
    weights:{ water:0.6, earth:0.4 }, axes:{ inward:0.5, move:-0.2 } }
]

// ✅ 給 index.js 用的「穩定匯出名」：ContentDB_money


export const ContentDB_money = {
  domain: 'money',
  ROUND2,
  ROUND3,
  round2: ROUND2,
  round3: ROUND3
}