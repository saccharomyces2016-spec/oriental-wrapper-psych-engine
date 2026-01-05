export function ensureGovDebug() {
  if (typeof window === 'undefined' || !import.meta.env.DEV) return null
  const w = window
  if (!w.__GOV) w.__GOV = {}
  if (!w.__GOV.ontologies) w.__GOV.ontologies = {}
  if (!w.__GOV.state) w.__GOV.state = {}
  if (!w.__GOV.ui) w.__GOV.ui = {}
  if (!w.__GOV.meta) w.__GOV.meta = {}
  w.__GOV.meta.ts = Date.now()
  w.__GOV.meta.href = typeof location !== 'undefined' ? location.href : ''
  return w.__GOV
}

function shallowMerge(base, patch) {
  const out = Object.assign({}, base || {})
  for (const [k, v] of Object.entries(patch || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = Object.assign({}, out[k] || {}, v)
    } else {
      out[k] = v
    }
  }
  return out
}

let _pending = null
let _timer = null

function _flush() {
  const patch = _pending
  _pending = null
  if (_timer) {
    clearTimeout(_timer)
    _timer = null
  }
  if (!patch) return
  const g = ensureGovDebug()
  if (!g) return
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      g[k] = Object.assign(g[k] || {}, v)
    } else {
      g[k] = v
    }
  }
  g.meta = g.meta || {}
  g.meta.ts = Date.now()
  g.meta.href = typeof location !== 'undefined' ? location.href : ''
}

export function updateGovDebug(patch = {}) {
  if (typeof window === 'undefined' || !import.meta.env.DEV) return
  _pending = shallowMerge(_pending, patch)
  if (_timer) return
  _timer = setTimeout(_flush, 120)
}
