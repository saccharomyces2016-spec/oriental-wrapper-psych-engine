import { computeBaziElementVector } from '../../src/metaphysics/baziElements.v1.js'
import { blendElementPrior, clampAlpha } from '../../src/metaphysics/priorBlend.v1.js'

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function main() {
  // coverage check
  const stems = ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui']
  const branches = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai']
  const { vector } = computeBaziElementVector({
    yearStem: stems[0],
    yearBranch: branches[0],
    monthStem: stems[1],
    monthBranch: branches[1],
    dayStem: stems[2],
    dayBranch: branches[2],
    hourStem: stems[3],
    hourBranch: branches[3]
  })
  assert(vector, 'bazi vector null')
  const sum = Object.values(vector).reduce((a, b) => a + b, 0)
  assert(Math.abs(sum - 1) < 1e-6, 'bazi vector not normalized')

  const alpha = clampAlpha(0.2)
  assert(alpha >= 0.8 && alpha <= 0.95, 'alpha clamp failed')

  const blended = blendElementPrior({ wood: 0.5, fire: 0.5, earth: 0, metal: 0, water: 0 }, vector, 0.85)
  const sum2 = Object.values(blended).reduce((a, b) => a + b, 0)
  assert(Math.abs(sum2 - 1) < 1e-6, 'blended not normalized')

  console.log('[validate:metaphysics] OK', { alpha, sampleWood: blended.wood })
}

main()
