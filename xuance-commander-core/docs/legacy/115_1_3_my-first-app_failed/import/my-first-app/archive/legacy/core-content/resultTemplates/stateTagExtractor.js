// src/core/content/resultTemplates/stateTagExtractor.js
// M-8.4: Extract state tags from existing intermediate results

/**
 * Extract state tags from psych, resonance, and other intermediate results
 * @param {Object} params
 * @param {Object} params.psych - Psychometrics result
 * @param {Object} params.resonance - Resonance data
 * @param {Object} params.guidance - Guidance data
 * @returns {Array<string>} Array of state tags
 */
export function extractStateTags({ psych = {}, resonance = {}, guidance = {} } = {}) {
  const tags = new Set()

  // 1. Arousal level (from traits and axes)
  const traits = psych?.traits || {}
  const axes = psych?.axes || {}
  
  // High arousal indicators
  if (traits.drive > 0.7 || axes.heat > 0.7 || axes.move > 0.7) {
    tags.add('high_arousal')
  }
  
  // Low arousal indicators
  if (traits.drive < 0.3 || axes.move < 0.3) {
    tags.add('low_arousal')
  }

  // 2. Control patterns
  if (traits.control > 0.7) {
    tags.add('high_control')
  }
  if (traits.control < 0.3) {
    tags.add('low_control')
  }
  if (traits.control > 0.7 && traits.innerTension > 0.6) {
    tags.add('over_control')
  }

  // 3. Avoidance patterns
  if (traits.riskAversion > 0.7 || axes.inward > 0.7) {
    tags.add('avoidance')
  }
  if (traits.riskAversion > 0.7 && traits.drive < 0.4) {
    tags.add('procrastination')
  }

  // 4. Obligation and responsibility
  if (traits.stabilityNeed > 0.7 && traits.control > 0.6) {
    tags.add('high_obligation')
  }
  if (traits.stabilityNeed > 0.7 && traits.innerTension > 0.6) {
    tags.add('over_responsibility')
  }

  // 5. Cognitive patterns
  if (traits.innerTension > 0.7 && traits.control > 0.6) {
    tags.add('overthinking')
  }
  if (traits.sensitivity > 0.7 && traits.riskAversion > 0.6) {
    tags.add('emotional_suppression')
  }

  // 6. Social patterns (from domain and guidance)
  const domain = psych?.input?.domain || resonance?.domain || ''
  if (domain === 'relationship' || domain === 'social' || domain === 'family') {
    if (traits.sensitivity > 0.7) {
      tags.add('people_pleasing')
    }
    if (axes.inward > 0.7 && traits.riskAversion > 0.6) {
      tags.add('social_withdrawal')
    }
  }

  // 7. Relationship-specific
  if (domain === 'relationship') {
    if (traits.sensitivity > 0.7 && traits.riskAversion > 0.6) {
      tags.add('relationship_anxiety')
    }
    if (traits.control > 0.6 && traits.innerTension > 0.6) {
      tags.add('need_for_control')
    }
  }

  // 8. Exhaustion indicators
  if (traits.innerTension > 0.7 && traits.drive < 0.4) {
    tags.add('exhaustion')
  }
  if (traits.stabilityNeed > 0.7 && traits.innerTension > 0.7) {
    tags.add('sleep_debt')
  }

  // 9. Self-doubt patterns
  if (traits.riskAversion > 0.7 && traits.drive < 0.5) {
    tags.add('self_doubt')
  }

  // 10. Anxiety indicators
  if (traits.innerTension > 0.7) {
    tags.add('anxiety')
  }
  if (traits.innerTension > 0.7 && traits.control > 0.6) {
    tags.add('anxiety')
  }

  // 11. Neglected needs
  if (traits.stabilityNeed > 0.7 && traits.drive > 0.6 && traits.innerTension > 0.7) {
    tags.add('neglected_needs')
  }

  // 12. Uncertainty
  if (traits.riskAversion > 0.7 && traits.control < 0.5) {
    tags.add('uncertainty')
  }

  // 13. External validation
  if (traits.stabilityNeed > 0.7 && traits.control < 0.4) {
    tags.add('external_validation')
  }

  // 14. Lack of agency
  if (traits.control < 0.3 && traits.drive < 0.4) {
    tags.add('lack_of_agency')
  }

  // 15. Withdrawal
  if (axes.inward > 0.7) {
    tags.add('withdrawal')
  }

  return Array.from(tags)
}








