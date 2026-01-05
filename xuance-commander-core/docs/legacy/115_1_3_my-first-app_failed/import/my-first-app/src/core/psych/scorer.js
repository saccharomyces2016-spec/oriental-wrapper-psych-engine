/**
 * Governance-only scorer: removes legacy question-mode dependencies.
 * Relies solely on weights present in resonance/user choices.
 */

import { patternToThemeMap } from '../ontology/patternToThemeMap.v1.js'
import { canonicalizeUserChoices } from '../../engine/canonicalizeUserChoices.v1.js'

const clamp01 = (n) => Math.max(0, Math.min(1, n))
const toNum = (x) => (Number.isFinite(Number(x)) ? Number(x) : 0)

function emptyTraits() {
  return {
    drive: 0,
    control: 0,
    stabilityNeed: 0,
    sensitivity: 0,
    riskAversion: 0,
    innerTension: 0
  }
}

function emptyAxes() {
  return { move: 0, inward: 0, heat: 0, damp: 0, boundary: 0 }
}

function emptyElements() {
  return { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
}

function addWeights(target, delta) {
  if (!delta || typeof delta !== 'object') return
  for (const k of Object.keys(delta)) {
    target[k] = (target[k] || 0) + toNum(delta[k])
  }
}

function normalizeElementsToUnit(e) {
  const w = toNum(e.wood)
  const f = toNum(e.fire)
  const ea = toNum(e.earth)
  const m = toNum(e.metal)
  const wa = toNum(e.water)
  const sum = w + f + ea + m + wa
  if (sum <= 0) return { wood: 0.2, fire: 0.2, earth: 0.2, metal: 0.2, water: 0.2 }
  return {
    wood: w / sum,
    fire: f / sum,
    earth: ea / sum,
    metal: m / sum,
    water: wa / sum
  }
}

function topElementsFromUnit(eUnit, topN = 2) {
  const entries = Object.entries(eUnit)
  entries.sort((a, b) => b[1] - a[1])
  return entries.slice(0, topN).map(([k]) => k)
}

function accumulateMotherThemesFromQuestions(userChoices = []) {
  const acc = new Map()
  for (const uc of userChoices) {
    const tags = Array.isArray(uc?.meta?.pattern_tags)
      ? uc.meta.pattern_tags
      : Array.isArray(uc?.pattern_tags)
        ? uc.pattern_tags
        : []
    const cw = toNum(uc?.meta?.confidence_weight ?? uc?.confidence_weight, 1) || 1
    for (const tag of tags) {
      const key = String(tag || '').trim()
      if (!key) continue
      const map = patternToThemeMap?.[key]
      if (!map?.themeId) continue
      const prev = acc.get(map.themeId) || 0
      const w = toNum(map.weight) || 1
      acc.set(map.themeId, prev + cw * w)
    }
  }

  const hits = Array.from(acc.entries())
    .map(([themeId, score]) => ({ themeId, score, source: 'question' }))
    .sort((a, b) => b.score - a.score)

  return hits
}

export async function scorePsychometrics(resonance = {}) {
  const domain = String(resonance?.domain || '').trim() || 'domain_xin'
  const domainLabel = String(resonance?.domainLabel || '').trim()

  const rawUserChoices = Array.isArray(resonance?.userChoices) ? resonance.userChoices : []
  const userChoices = canonicalizeUserChoices(rawUserChoices, { domain })

  const baseAxes = resonance?.axes || {}
  const baseElements = resonance?.elements || {}

  const traits = emptyTraits()
  const axes = emptyAxes()
  const elements = emptyElements()

  addWeights(axes, baseAxes)
  addWeights(elements, baseElements)

  // governance: only respect weights already present on choices
  for (const uc of userChoices) {
    if (uc?.weights) {
      addWeights(traits, uc.weights?.traits)
      addWeights(axes, uc.weights?.axes)
      addWeights(elements, uc.weights?.elements)
    }
  }

  const SCALE = { traits: 1.2, axes: 2.0 }
  const traits01 = {
    drive: clamp01((toNum(traits.drive) + 0.5) / SCALE.traits),
    control: clamp01((toNum(traits.control) + 0.5) / SCALE.traits),
    stabilityNeed: clamp01((toNum(traits.stabilityNeed) + 0.5) / SCALE.traits),
    sensitivity: clamp01((toNum(traits.sensitivity) + 0.5) / SCALE.traits),
    riskAversion: clamp01((toNum(traits.riskAversion) + 0.5) / SCALE.traits),
    innerTension: clamp01((toNum(traits.innerTension) + 0.5) / SCALE.traits)
  }

  const axes01 = {
    move: clamp01((toNum(axes.move) + 1) / SCALE.axes),
    inward: clamp01((toNum(axes.inward) + 1) / SCALE.axes),
    heat: clamp01((toNum(axes.heat) + 1) / SCALE.axes),
    damp: clamp01((toNum(axes.damp) + 1) / SCALE.axes),
    boundary: clamp01((toNum(axes.boundary) + 1) / SCALE.axes)
  }

  const elementsUnit = normalizeElementsToUnit(elements)

  // Mother themes derived only from provided pattern tags
  const motherThemes = accumulateMotherThemesFromQuestions(userChoices)

  return {
    input: {
      domain,
      domainLabel,
      r2Label: resonance?.r2Label || '',
      r3Labels: Array.isArray(resonance?.r3Labels) ? resonance.r3Labels : [],
      userChoices
    },
    traits: traits01,
    axes: axes01,
    elements: elementsUnit,
    archetype: {
      topElements: topElementsFromUnit(elementsUnit, 2)
    },
    motherThemes
  }
}

export default { scorePsychometrics }
