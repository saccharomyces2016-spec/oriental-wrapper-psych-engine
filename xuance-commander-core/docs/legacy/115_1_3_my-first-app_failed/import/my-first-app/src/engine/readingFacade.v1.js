import { scorePsychometrics } from '../core/psych/scorer.js'
import { getQuestionMode } from '../config/questionMode.v1.js'
import { computeBaziElementVector } from '../metaphysics/baziElements.v1.js'
import { computeNameBias } from '../metaphysics/nameStudies.v1.js'
import { blendElementPrior, clampAlpha } from '../metaphysics/priorBlend.v1.js'
import { computeElementPrior, normalizeFourPillars } from './elementPrior.v1.js'

function buildOutputStub(readingResult, extra = {}) {
  return {
    ...readingResult,
    meta: { ...(readingResult?.meta || {}), ...extra, source: 'governance-stub' }
  }
}

export async function runReading(request = {}) {
  const mode = request.mode || getQuestionMode()
  const resonance = request.resonance || {}

  const psych = await scorePsychometrics(resonance)
  const birthElements = request.birth ? computeBaziElementVector(request.birth) : { vector: null, debug: null }
  const nameBias = request.name ? computeNameBias(request.name) : { bias: null, debug: null }

  const normalizeKeysLower = (vec = null) => {
    if (!vec || typeof vec !== 'object') return null
    const out = {}
    for (const [k, v] of Object.entries(vec)) out[String(k).toLowerCase()] = Number(v) || 0
    return out
  }

  let elementPrior = null
  let elementPriorError = null
  try {
    const rawPillars =
      request?.birth?.pillars ??
      request?.birth?.fourPillars ??
      request?.pillars ??
      request?.fourPillars ??
      null

    if (rawPillars) {
      const pillars = normalizeFourPillars(rawPillars)
      elementPrior = computeElementPrior(pillars, request?.metaphysicsConfig?.elementPriorConfig || {})
    }
  } catch (e) {
    elementPriorError = (e && e.message) ? e.message : String(e)
  }

  const userElements = psych?.elements || {}
  const alpha = clampAlpha(request?.alpha ?? 0.85)
  const priorElements = normalizeKeysLower(elementPrior?.element_distribution) || birthElements.vector || null
  const finalElements = blendElementPrior(userElements, priorElements, alpha)
  psych.elements = finalElements
  const dummyReadingResult = {
    domain_key: resonance.domain || psych?.input?.domain || null,
    situation_profile: { top_signals: [], chosen_round2: [] },
    facet_scores: {},
    top_themes: Array.isArray(psych?.motherThemes?.hits)
      ? psych.motherThemes.hits.map(h => ({ theme_id: h.themeId || h.theme_id || h.id || '', score: h.score }))
      : [],
    anchors: [],
    debug: {
      round3_answers: resonance.userChoices || [],
      metaphysics: {
        alpha,
        birthElementVector: birthElements.vector,
        birthDebug: birthElements.debug,
        nameBias: nameBias.bias,
        nameDebug: nameBias.debug,
        userElementVector: userElements,
        priorElementVector: priorElements,
        elementPrior: elementPrior ? {
          distribution: elementPrior.element_distribution,
          scores: elementPrior.element_scores,
          dominant: elementPrior.dominant_element,
          weakest: elementPrior.weakest_element,
          debug: elementPrior.debug
        } : null,
        elementPriorError,
        finalElementVector: finalElements
      }
    }
  }
  const outputV2 = buildOutputStub(dummyReadingResult, { seed: request?.seed || null })

  if (outputV2 && typeof outputV2 === 'object') {
    outputV2.meta = outputV2.meta || {}
    outputV2.meta.element_prior = elementPrior ? {
      distribution: elementPrior.element_distribution,
      dominant: elementPrior.dominant_element,
      weakest: elementPrior.weakest_element
    } : null
    outputV2.meta.final_element_vector = finalElements || null
    outputV2.meta.alpha = alpha
  }

  return {
    psych,
    metaphysics: dummyReadingResult.debug.metaphysics,
    outputV2,
    debug: {
      mode,
      userChoicesCount: Array.isArray(resonance.userChoices) ? resonance.userChoices.length : 0,
      metaphysics: dummyReadingResult.debug.metaphysics
    }
  }
}

export default runReading
