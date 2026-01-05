// ContentDB_health.js — 第一輪命理化調教

export const HEALTH_R2 = [
  { id:'h_r2_1', label:'形神失衡', desc:'身累心煩，兩頭皆在耗', weights:{water:2,earth:1}, axes:{damp:1,inward:1} },
  { id:'h_r2_2', label:'火氣內盛', desc:'急躁易怒睡不安，心火難息', weights:{fire:3,water:1}, axes:{heat:3} },
  { id:'h_r2_3', label:'氣脈不暢', desc:'提不起勁像堵住，越撐越悶', weights:{earth:2,water:1}, axes:{move:-1,inward:1} },
  { id:'h_r2_4', label:'節律破碎', desc:'作息亂了，恢復也跟著亂', weights:{water:2,earth:1}, axes:{damp:1,boundary:-1} },
  { id:'h_r2_5', label:'壓力積滯', desc:'越扛越重，身先替你喊痛', weights:{earth:2,metal:1}, axes:{inward:2} },
  { id:'h_r2_6', label:'界線被侵', desc:'工作家事侵入休息，無處可喘', weights:{metal:2,earth:1}, axes:{boundary:2} },
  { id:'h_r2_7', label:'寒濕困身', desc:'沉重倦怠，像被霧裹住', weights:{water:2,earth:2}, axes:{damp:2} },
  { id:'h_r2_8', label:'心神不寧', desc:'腦停不下來，放鬆像奢侈', weights:{water:2,metal:1}, axes:{inward:2} },
]

export const HEALTH_R3 = [
  { id:'h_r3_1', label:'眠關不穩', desc:'難入睡易醒多夢，晨起仍累', weights:{water:2,fire:1}, axes:{inward:1,heat:1} },
  { id:'h_r3_2', label:'筋骨緊鎖', desc:'肩頸背緊繃，越拖越深', weights:{metal:2,earth:1}, axes:{boundary:1} },
  { id:'h_r3_3', label:'脾胃失調', desc:'食慾亂胀氣多，不適反覆', weights:{earth:2,water:1}, axes:{damp:1} },
  { id:'h_r3_4', label:'焦慮擾動', desc:'胸悶坐立難安，心總在追趕', weights:{fire:2,water:1}, axes:{heat:2,move:1} },
  { id:'h_r3_5', label:'免疫起伏', desc:'小病反覆，恢復總慢半拍', weights:{water:2,earth:1}, axes:{damp:1,inward:1} },
  { id:'h_r3_6', label:'過勞見底', desc:'精神體力皆空，靠硬撐在走', weights:{earth:2,fire:1}, axes:{inward:2} },
  { id:'h_r3_7', label:'動能停滯', desc:'想動卻動不起，越拖越無力', weights:{earth:1,wood:2}, axes:{move:-1} },
  { id:'h_r3_8', label:'痛影久留', desc:'舊傷反覆提醒你，別再硬扛', weights:{metal:2,water:1}, axes:{boundary:1,inward:1} },
]