// ContentDB_money.js — 第一輪命理化調教（不改 id / weights / axes）

export const MONEY_R2 = [
  { id:'m_r2_1', label:'進退成卦', desc:'想乘勢起局，亦怕失手破財', weights:{water:2,earth:1}, axes:{inward:1,boundary:1} },
  { id:'m_r2_2', label:'財潮不定', desc:'入帳如潮汐，忽盈忽虧難安', weights:{water:2,wood:1}, axes:{damp:1,inward:1} },
  { id:'m_r2_3', label:'漏財之局', desc:'支出如暗漏，補一處又開一處', weights:{earth:2,water:1}, axes:{boundary:-1,damp:1} },
  { id:'m_r2_4', label:'利害相纏', desc:'人情牽銀兩，越理越亂難割', weights:{earth:2,metal:1}, axes:{boundary:-1,inward:1} },
  { id:'m_r2_5', label:'心火燒庫', desc:'焦慮起時易破費，破費後更焦', weights:{fire:2,water:1}, axes:{heat:2,move:1} },
  { id:'m_r2_6', label:'聚不成財', desc:'辛苦可見，卻難留存成庫', weights:{earth:2,metal:1}, axes:{boundary:1,inward:1} },
  { id:'m_r2_7', label:'風險牽心', desc:'見機會就心動，想風險便退縮', weights:{water:2,wood:1}, axes:{move:1,inward:1} },
  { id:'m_r2_8', label:'家計牽制', desc:'責任壓肩，不敢換路與加注', weights:{earth:2,water:1}, axes:{boundary:1,inward:1} },
]

export const MONEY_R3 = [
  { id:'m_r3_1', label:'庫氣見底', desc:'月底常空，心慌如潮', weights:{water:2,earth:1}, axes:{damp:1,inward:1} },
  { id:'m_r3_2', label:'債影壓身', desc:'債務分期如山，喘息皆難', weights:{earth:3,water:1}, axes:{boundary:1,inward:2} },
  { id:'m_r3_3', label:'情緒破財', desc:'一煩就花，花完更悔', weights:{fire:2,water:1}, axes:{heat:2,move:1} },
  { id:'m_r3_4', label:'投機兩難', desc:'想投怕失，常錯過或追高', weights:{water:2,metal:1}, axes:{inward:1,boundary:1} },
  { id:'m_r3_5', label:'財路停滯', desc:'收入卡關，像原地耗力', weights:{earth:2,wood:1}, axes:{move:-1,inward:1} },
  { id:'m_r3_6', label:'家用相爭', desc:'家中花費觀念不同，易起口舌', weights:{earth:2,metal:1}, axes:{boundary:-1,heat:1} },
  { id:'m_r3_7', label:'帳簿無序', desc:'收支不成法，越記越亂', weights:{earth:2,water:1}, axes:{boundary:1} },
  { id:'m_r3_8', label:'突發失血', desc:'意外一來便大出，難即回補', weights:{water:2,earth:2}, axes:{damp:1,boundary:1} },
]