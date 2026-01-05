import strokesDB from './kangxiStrokes.v1.json' assert { type: 'json' }

const STROKES = strokesDB?.items || {}

function getStroke(ch) {
  const n = STROKES[ch]
  return Number.isFinite(n) ? n : null
}

function computeWuge(name) {
  if (!name) return null
  const chars = Array.from(name)
  if (!chars.length) return null

  const strokes = chars.map(getStroke)
  if (strokes.some(n => n === null)) return { wuge: null, debug: { missing: chars.filter((c, i) => strokes[i] === null) } }

  // Minimal Tian/Ren/Di: first + 1, sum, last + 1
  const tian = strokes[0] + 1
  const di = strokes[strokes.length - 1] + 1
  const ren = strokes.reduce((a, b) => a + b, 0)
  return { wuge: { tian, ren, di }, debug: { strokes } }
}

function mapWugeToBias(wuge) {
  if (!wuge) return { bias: null, debug: { reason: 'wuge-null' } }
  const { tian, ren, di } = wuge
  const total = tian + ren + di
  if (!total) return { bias: null, debug: { reason: 'wuge-zero' } }

  const stabilityNeed = Math.min(1, di / total)
  const control = Math.min(1, tian / total)
  const pressureSensitivity = Math.min(1, ren / total)

  return {
    bias: { stabilityNeed, control, pressureSensitivity },
    debug: { tian, ren, di }
  }
}

export function computeNameBias(name) {
  const { wuge, debug: wugeDebug } = computeWuge(name) || {}
  const mapped = mapWugeToBias(wuge)
  return {
    bias: mapped.bias,
    debug: { ...wugeDebug, ...mapped.debug }
  }
}

export default computeNameBias
