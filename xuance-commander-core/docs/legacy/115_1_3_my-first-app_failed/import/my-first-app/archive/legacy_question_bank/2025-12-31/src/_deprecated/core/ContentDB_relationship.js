// ContentDB_relationship.js — 第一輪命理化調教（不改 id / weights / axes）

export const REL_R2 = [
  { id:'r_r2_1', label:'進退無門', desc:'想靠近取暖，亦怕再傷一次', weights:{water:2,wood:1}, axes:{inward:1,boundary:1} },
  { id:'r_r2_2', label:'信霧未散', desc:'真心幾分不敢問透，怕答案刺骨', weights:{water:2,metal:1}, axes:{inward:2,damp:1} },
  { id:'r_r2_3', label:'言刃成刺', desc:'話一出口便互傷，句句都見鋒', weights:{fire:2,metal:1}, axes:{heat:2,boundary:-1} },
  { id:'r_r2_4', label:'界線失度', desc:'你讓太多或他逼太近，皆難長久', weights:{earth:2,metal:1}, axes:{boundary:2} },
  { id:'r_r2_5', label:'情潮翻湧', desc:'小事被放大，心浪一波接一波', weights:{water:2,fire:1}, axes:{heat:1,damp:1} },
  { id:'r_r2_6', label:'舊影入局', desc:'過往陰影帶進現在，越走越沉', weights:{water:2,earth:1}, axes:{inward:2} },
  { id:'r_r2_7', label:'承諾猶疑', desc:'談未來便想退，卻又捨不得散', weights:{water:2,wood:1}, axes:{move:1,inward:1} },
  { id:'r_r2_8', label:'外緣牽擾', desc:'家人工作距離皆作梗，心難安放', weights:{earth:2,water:1}, axes:{boundary:1,damp:1} },
]

// 先給一個空的 R3，避免系統下一步取用時又噴錯（之後 D-5 再補完整題庫）
export const REL_R3 = []

// ✅ 這個就是你 index.js 正在 import 的名字：ContentDB_relationship
export const ContentDB_relationship = {
  R2: REL_R2,
  R3: REL_R3
}