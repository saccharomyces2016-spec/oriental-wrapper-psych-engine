/**
 * @typedef {Object} ReadingRequest
 * @property {Object} resonance - user resonance payload (domain, userChoices, axes/elements, etc.)
 * @property {string} [mode] - "legacy" | "bank"
 * @property {string} [locale]
 * @property {Object} [birth]
 * @property {string} [name]
 *
 * @typedef {Object} MetaphysicsBlock
 * @property {number} [alpha]
 * @property {Object|null} [birthElementVector]
 * @property {Object|null} [birthDebug]
 * @property {Object|null} [nameBias]
 * @property {Object|null} [nameDebug]
 * @property {Object|null} [elementPrior] - five-element prior summary (distribution, scores, dominant, weakest, debug)
 * @property {string|null} [elementPriorError]
 * @property {Object|null} [finalElementVector]
 * Note: narrative layer reads finalElementVector + elementPrior.dominant/weakest for descriptive text only (no scoring).
 *
 * @typedef {Object} ReadingResult
 * @property {Object} psych
 * @property {MetaphysicsBlock} [metaphysics]
 * @property {Object} [debug]
 * @property {Object} [outputV2]
 */

export const __doc = 'Contract typedefs only; no runtime.'
