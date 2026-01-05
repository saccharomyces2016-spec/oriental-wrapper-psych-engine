export interface NormalizedVector {
  vector: Record<string, number>
  sum: number
}

export function normalizeSignalMap(map: Record<string, number> = {}): NormalizedVector {
  const vector: Record<string, number> = {}
  let sum = 0
  for (const [k, v] of Object.entries(map)) {
    const num = Number(v) || 0
    if (num > 0) {
      vector[k] = num
      sum += num
    } else {
      vector[k] = 0
    }
  }
  if (sum > 0) {
    for (const k of Object.keys(vector)) {
      vector[k] = vector[k] / sum
    }
  }
  return { vector, sum }
}

export default normalizeSignalMap
