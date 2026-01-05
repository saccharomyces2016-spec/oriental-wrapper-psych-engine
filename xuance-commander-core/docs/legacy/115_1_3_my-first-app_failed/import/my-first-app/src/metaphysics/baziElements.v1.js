const STEM_TO_ELEMENT = {
  jia: 'wood',
  yi: 'wood',
  bing: 'fire',
  ding: 'fire',
  wu: 'earth',
  ji: 'earth',
  geng: 'metal',
  xin: 'metal',
  ren: 'water',
  gui: 'water'
}

const BRANCH_TO_ELEMENT = {
  zi: 'water',
  chou: 'earth',
  yin: 'wood',
  mao: 'wood',
  chen: 'earth',
  si: 'fire',
  wu: 'fire',
  wei: 'earth',
  shen: 'metal',
  you: 'metal',
  xu: 'earth',
  hai: 'water'
}

function emptyVec() {
  return { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
}

function normalize(vec) {
  const sum = Object.values(vec).reduce((a, b) => a + b, 0)
  if (!sum) return { ...vec }
  const out = {}
  for (const k of Object.keys(vec)) out[k] = vec[k] / sum
  return out
}

function add(vec, elem, amt = 1) {
  if (!elem || !vec.hasOwnProperty(elem)) return
  vec[elem] += amt
}

export function computeBaziElementVector(birth = {}) {
  const { yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch } = birth
  const stems = [yearStem, monthStem, dayStem, hourStem].filter(Boolean)
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch].filter(Boolean)

  if (!stems.length && !branches.length) {
    return { vector: null, debug: { reason: 'missing stems/branches' } }
  }

  const vec = emptyVec()
  stems.forEach(s => add(vec, STEM_TO_ELEMENT[String(s).toLowerCase()] || ''))
  branches.forEach(b => add(vec, BRANCH_TO_ELEMENT[String(b).toLowerCase()] || ''))

  return { vector: normalize(vec), debug: { stems, branches } }
}

export default computeBaziElementVector
