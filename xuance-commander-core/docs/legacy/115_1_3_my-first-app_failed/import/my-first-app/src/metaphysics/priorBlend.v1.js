function clampAlpha(alpha = 0.85) {
  const a = Number.isFinite(alpha) ? alpha : 0.85
  return Math.min(0.95, Math.max(0.8, a))
}

function normalize(vec = {}) {
  const sum = Object.values(vec).reduce((a, b) => a + (Number(b) || 0), 0)
  if (!sum) return { ...vec }
  const out = {}
  for (const [k, v] of Object.entries(vec)) out[k] = (Number(v) || 0) / sum
  return out
}

export function blendElementPrior(userVec = {}, birthVec = null, alpha = 0.85) {
  if (!birthVec) return normalize(userVec)
  const a = clampAlpha(alpha)
  const out = {}
  for (const key of Object.keys(userVec || {})) {
    const u = Number(userVec[key]) || 0
    const b = Number(birthVec[key]) || 0
    out[key] = a * u + (1 - a) * b
  }
  return normalize(out)
}

export { clampAlpha }

export default blendElementPrior
