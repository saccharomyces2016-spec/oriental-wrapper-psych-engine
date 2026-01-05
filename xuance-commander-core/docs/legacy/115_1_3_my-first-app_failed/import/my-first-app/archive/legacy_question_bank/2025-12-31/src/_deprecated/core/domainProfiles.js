// src/core/domainProfiles.js
// 8大領域錨點 + 五行映射 + 軸向量偏好（可調參）

export const DOMAINS = [
  'career',
  'relationship',
  'social',
  'study',
  'money',
  'family',
  'health',
  'self'
]

export const DOMAIN_LABELS = {
  career: '業途之局',
  relationship: '情緣之結',
  social: '交感之網',
  study: '文運之關',
  money: '財氣之流',
  family: '家脈之承',
  health: '形神之耗',
  self: '心志之向'
}

// 使用者選到的錨點文字 -> domain key
export const ANCHOR_TO_DOMAIN = Object.fromEntries(
  Object.entries(DOMAIN_LABELS).map(([k, v]) => [v, k])
)

/**
 * D_e: 五行偏好向量（primary=1.0, secondary=0.6, suppressed=-0.4）
 * 元素鍵：wood, fire, earth, metal, water
 */
export const DOMAIN_ELEMENT_PROFILE = {
  career:       { wood: 0.0, fire: -0.4, earth: 1.0, metal: 0.6, water: 0.0 }, // 土+金, 火抑
  relationship: { wood: 0.0, fire:  0.6, earth: 0.0, metal: -0.4, water: 1.0 }, // 水+火, 金抑
  social:       { wood: 1.0, fire:  0.0, earth: -0.4, metal: 0.0, water: 0.6 }, // 木+水, 土抑
  study:        { wood: 1.0, fire:  0.0, earth: 0.0, metal: 0.6, water: -0.4 }, // 木+金, 水抑
  money:        { wood: -0.4, fire: 0.0, earth: 0.6, metal: 0.0, water: 1.0 }, // 水+土, 木抑
  family:       { wood: -0.4, fire: 0.0, earth: 1.0, metal: 0.0, water: 0.6 }, // 土+水, 木抑
  health:       { wood: 0.0, fire: -0.4, earth: 0.6, metal: 0.0, water: 1.0 }, // 水+土, 火抑
  self:         { wood: 0.6, fire:  1.0, earth: 0.0, metal: 0.0, water: -0.4 }  // 火+木, 水抑
}

/**
 * D_a: 軸向量偏好（0..1）
 * 軸鍵：move, inward, heat, damp, boundary
 * 這些值不需要「真理」，只要「一致」；後續可用使用者回饋微調。
 */
export const DOMAIN_AXIS_PROFILE = {
  career:       { move: 0.55, inward: 0.45, heat: 0.45, damp: 0.45, boundary: 0.75 },
  relationship: { move: 0.55, inward: 0.55, heat: 0.60, damp: 0.55, boundary: 0.45 },
  social:       { move: 0.70, inward: 0.35, heat: 0.55, damp: 0.45, boundary: 0.40 },
  study:        { move: 0.55, inward: 0.55, heat: 0.45, damp: 0.40, boundary: 0.65 },
  money:        { move: 0.50, inward: 0.50, heat: 0.45, damp: 0.55, boundary: 0.55 },
  family:       { move: 0.45, inward: 0.60, heat: 0.40, damp: 0.55, boundary: 0.55 },
  health:       { move: 0.40, inward: 0.75, heat: 0.35, damp: 0.60, boundary: 0.50 },
  self:         { move: 0.60, inward: 0.55, heat: 0.65, damp: 0.40, boundary: 0.50 }
}

/**
 * 軸向量權重（總和不必=1，但建議加起來=1）
 */
export const AXIS_WEIGHTS = {
  boundary: 0.30,
  move: 0.20,
  inward: 0.20,
  heat: 0.15,
  damp: 0.15
}
