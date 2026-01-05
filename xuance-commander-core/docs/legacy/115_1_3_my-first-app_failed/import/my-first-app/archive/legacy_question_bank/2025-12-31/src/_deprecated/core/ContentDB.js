// ContentDB.js
// Round1：8 大領域錨點（domain key 必須固定）
// 其他舊欄位保留（FACETS / TOKEN_POOL）避免你專案其它地方 import 會炸

export const DOMAIN_ANCHORS = [
  { id: 'd_money',        domain: 'money',        label: '財氣之流',   category: 'domain', desc: '財之所動' },
  { id: 'd_relationship', domain: 'relationship', label: '情緣之結',   category: 'domain', desc: '情之所牽' },
  { id: 'd_career',       domain: 'career',       label: '業途之局',   category: 'domain', desc: '事之所繫' },
  { id: 'd_family',       domain: 'family',       label: '家脈之承',   category: 'domain', desc: '根之所繫' },
  { id: 'd_health',       domain: 'health',       label: '形神之耗',   category: 'domain', desc: '身心所感' },
  { id: 'd_self',         domain: 'self',         label: '心志之向',   category: 'domain', desc: '意之所指' },
  { id: 'd_study',        domain: 'study',        label: '文運之關',   category: 'domain', desc: '學之所試' },
  { id: 'd_social',       domain: 'social',       label: '交感之網',   category: 'domain', desc: '人之所連' }
]

// 保留兼容：你專案若還有人 import FACETS/TOKEN_POOL，不會爆
export const FACETS = []
export const TOKEN_POOL = []