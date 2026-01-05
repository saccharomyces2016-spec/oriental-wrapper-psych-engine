import { computeElementPrior, normalizeFourPillars } from '../../src/engine/elementPrior.v1.js'

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function main() {
  const pillars = normalizeFourPillars({ year: '甲子', month: '丙寅', day: '丁卯', hour: '戊辰' })
  const res = computeElementPrior(pillars)
  const distSum = Object.values(res.element_distribution).reduce((a, b) => a + b, 0)
  assert(Math.abs(distSum - 1) < 1e-6, 'element distribution not normalized')

  const haiAll = computeElementPrior(normalizeFourPillars({ year: '癸亥', month: '癸亥', day: '癸亥', hour: '癸亥' }))
  const hiddenSum = haiAll.debug.branchDebug[0].parts.reduce((a, p) => a + p.weight, 0)
  assert(Math.abs(hiddenSum - 1) < 1e-6, '亥藏干權重未正規化')

  const summer = computeElementPrior(normalizeFourPillars({ year: '甲午', month: '甲午', day: '甲午', hour: '甲午' }))
  const neutral = computeElementPrior(normalizeFourPillars({ year: '甲午', month: '甲午', day: '甲午', hour: '甲午' }), {
    seasonMultipliers: { wang: 1, xiang: 1, xiu: 1, qiu: 1, si: 1 }
  })
  assert(summer.element_scores.Fire > neutral.element_scores.Fire, 'season multiplier not applied to Fire')

  console.log('[validate:elements] OK', {
    sum: distSum.toFixed(6),
    sampleDominant: res.dominant_element,
    summerFire: summer.element_scores.Fire.toFixed(3)
  })
}

main()
