// src/core/content/resultTemplates/anchorSelector.js
// M-8.3: Anchor selection logic
// M-8.4: Anti-pattern mechanism (sessionStorage + timestamp seed)

import { getTemplateItems } from './loader.js'

/**
 * Get used anchor IDs from sessionStorage (for next session, not current)
 * @param {number} maxCount - Maximum number of IDs to keep
 * @returns {Set<string>} Set of used anchor IDs
 */
function getUsedAnchorIds(maxCount = 20) {
  try {
    const key = 'anchor_used_ids'
    const stored = sessionStorage.getItem(key)
    if (!stored) return new Set()
    const ids = JSON.parse(stored)
    return new Set(Array.isArray(ids) ? ids.slice(-maxCount) : [])
  } catch {
    return new Set()
  }
}

/**
 * Get current session anchor (for same test, not across sessions)
 * @returns {Object|null} Current anchor { id, variantKey } or null
 */
function getCurrentSessionAnchor() {
  try {
    const key = 'anchor_current_session'
    const stored = sessionStorage.getItem(key)
    if (!stored) return null
    return JSON.parse(stored)
  } catch {
    return null
  }
}

/**
 * Save current session anchor (for same test, not across sessions)
 * @param {string} anchorId - Anchor ID
 * @param {string} variantKey - Variant key
 */
function saveCurrentSessionAnchor(anchorId, variantKey) {
  try {
    const key = 'anchor_current_session'
    sessionStorage.setItem(key, JSON.stringify({ id: anchorId, variantKey }))
  } catch {
    // Ignore storage errors
  }
}

/**
 * Save used anchor ID to sessionStorage (for next session)
 * @param {string} anchorId - Anchor ID to save
 * @param {number} maxCount - Maximum number of IDs to keep
 */
function saveUsedAnchorId(anchorId, maxCount = 20) {
  try {
    const key = 'anchor_used_ids'
    const existing = getUsedAnchorIds(maxCount)
    existing.add(anchorId)
    const ids = Array.from(existing).slice(-maxCount)
    sessionStorage.setItem(key, JSON.stringify(ids))
  } catch {
    // Ignore storage errors
  }
}

/**
 * Mark current session anchor as used (call this when test is completed)
 * This moves the anchor from "current session" to "used for next session"
 */
export function markCurrentAnchorAsUsed() {
  try {
    const current = getCurrentSessionAnchor()
    if (current && current.id) {
      saveUsedAnchorId(current.id, 20)
      // Clear current session anchor (test is done)
      sessionStorage.removeItem('anchor_current_session')
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Simple seeded random number generator
 * @param {number} seed - Seed value
 * @returns {Function} Random function
 */
function seedRandom(seed = 1) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

/**
 * Select anchors based on mother themes and state
 * @param {Object} params
 * @param {Array} params.motherThemes - Array of mother theme objects with { themeId, score, ... }
 * @param {Array} params.stateTags - Optional state tags array
 * @param {string|number} params.sessionSeed - Optional session/user seed for consistency
 * @param {Set} params.usedAnchorIds - Set of already used anchor IDs (for deduplication, optional - will use sessionStorage if not provided)
 * @param {boolean} params.enableSecondary - Whether to return secondary anchor
 * @param {number} params.testStartTimestamp - Test start timestamp to mix into seed (M-8.4)
 * @returns {Object} { primary: anchor, secondary: anchor|null, debug: {...} }
 */
export function selectAnchors({ motherThemes = [], stateTags = [], sessionSeed = null, usedAnchorIds = null, enableSecondary = false, testStartTimestamp = null } = {}) {
  const allAnchors = getTemplateItems('anchor_statements')
  if (!allAnchors.length) {
    return { primary: null, secondary: null, debug: { reason: 'no_anchors_available' } }
  }

  // M-8.4 Fix: Check if we already have an anchor for this session (hard guarantee)
  const currentSessionAnchor = getCurrentSessionAnchor()
  if (currentSessionAnchor) {
    // Find the anchor and variant
    const anchor = allAnchors.find(a => a.id === currentSessionAnchor.id)
    if (anchor) {
      const variants = Array.isArray(anchor.variants) ? anchor.variants : []
      const acknowledge = anchor.safe_tone_template?.acknowledge || ''
      
      let text = acknowledge
      let variantKey = 'default'
      
      if (currentSessionAnchor.variantKey && currentSessionAnchor.variantKey !== 'default') {
        const variantIndex = parseInt(currentSessionAnchor.variantKey.replace('variant_', ''))
        if (variants[variantIndex]) {
          text = variants[variantIndex]
          variantKey = currentSessionAnchor.variantKey
        }
      }
      
      return {
        primary: {
          id: anchor.id,
          text,
          variantKey,
          mother_theme: anchor.mother_theme
        },
        secondary: null,
        debug: {
          reason: 'from_current_session',
          totalAnchors: allAnchors.length
        }
      }
    }
  }

  // M-8.4: Get used anchor IDs from sessionStorage if not provided (for next session only)
  const usedIds = usedAnchorIds || getUsedAnchorIds(20)

  // M-8.4 Fix: Get testStartTimestamp from sessionStorage if not provided
  let finalTestStartTimestamp = testStartTimestamp
  if (!finalTestStartTimestamp) {
    try {
      const stored = sessionStorage.getItem('test_start_timestamp')
      if (stored) {
        finalTestStartTimestamp = Number(stored)
      }
    } catch {
      // Ignore storage errors
    }
  }
  
  // M-8.4: Mix test start timestamp into seed to avoid always same result
  const baseSeed = sessionSeed ? (typeof sessionSeed === 'string' ? hashString(sessionSeed) : Number(sessionSeed)) : Date.now()
  const timestampSeed = finalTestStartTimestamp ? Number(finalTestStartTimestamp) : Date.now()
  const seed = (baseSeed + timestampSeed) % 2147483647
  const random = seedRandom(seed)

  // M-8.4: Filter out used anchors (for next session, not current)
  const availableAnchors = allAnchors.filter(a => !usedIds.has(a.id))

  if (!availableAnchors.length) {
    // If all anchors used, reset and use all
    const resetAnchors = allAnchors
    return selectFromAvailable(resetAnchors, motherThemes, stateTags, random, enableSecondary, true)
  }

  return selectFromAvailable(availableAnchors, motherThemes, stateTags, random, enableSecondary, true)
}

/**
 * Select variant text from anchor
 * @param {Object} anchor - Anchor object
 * @param {Function} random - Random function
 * @returns {Object} { text, variantKey }
 */
function selectVariant(anchor, random) {
  const variants = Array.isArray(anchor.variants) ? anchor.variants : []
  const acknowledge = anchor.safe_tone_template?.acknowledge || ''
  
  if (variants.length > 0) {
    const variantIndex = Math.floor(random() * variants.length)
    return {
      text: variants[variantIndex] || acknowledge,
      variantKey: `variant_${variantIndex}`
    }
  }
  
  return {
    text: acknowledge,
    variantKey: 'default'
  }
}

function selectFromAvailable(availableAnchors, motherThemes, stateTags, random, enableSecondary, saveToSession = false) {
  // Score anchors by mother theme match
  const scored = availableAnchors.map(anchor => {
    let score = 0
    const anchorTheme = anchor.mother_theme || ''

    // Match by mother theme
    if (Array.isArray(motherThemes) && motherThemes.length) {
      const topTheme = motherThemes[0]
      const themeId = topTheme?.themeId || topTheme?.id || topTheme?.key || String(topTheme || '')
      
      // Direct match
      if (anchorTheme === themeId || anchorTheme === themeId.replace('_', '-')) {
        score += 10
      }
      
      // Partial match (e.g., control_vs_exhaustion matches control_need)
      if (anchorTheme.includes(themeId.split('_')[0]) || themeId.includes(anchorTheme.split('_')[0])) {
        score += 5
      }
    }

    // Match by state tags
    if (Array.isArray(stateTags) && stateTags.length && Array.isArray(anchor.state_tags)) {
      const matches = stateTags.filter(tag => anchor.state_tags.includes(tag)).length
      score += matches * 2
    }

    // Confidence boost
    if (anchor.confidence === 'high') score += 3
    else if (anchor.confidence === 'medium-high') score += 2
    else if (anchor.confidence === 'medium') score += 1

    return { anchor, score }
  })

  // Sort by score (descending), then shuffle within same score groups
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return random() - 0.5 // Randomize within same score
  })

  // Select primary anchor (highest score)
  const primaryAnchor = scored[0]?.anchor || null
  const primaryVariant = primaryAnchor ? selectVariant(primaryAnchor, random) : null
  const primary = primaryAnchor ? {
    id: primaryAnchor.id,
    text: primaryVariant.text,
    variantKey: primaryVariant.variantKey,
    mother_theme: primaryAnchor.mother_theme
  } : null

  // Select secondary anchor (different mother_theme, if enabled)
  let secondary = null
  if (enableSecondary && primaryAnchor) {
    const primaryTheme = primaryAnchor.mother_theme || ''
    const candidates = scored
      .slice(1)
      .filter(item => {
        const theme = item.anchor.mother_theme || ''
        return theme !== primaryTheme && theme.length > 0
      })
    
    if (candidates.length) {
      // Pick from top 3 candidates with randomization
      const topCandidates = candidates.slice(0, Math.min(3, candidates.length))
      const secondaryAnchor = topCandidates[Math.floor(random() * topCandidates.length)]?.anchor || null
      if (secondaryAnchor) {
        const secondaryVariant = selectVariant(secondaryAnchor, random)
        secondary = {
          id: secondaryAnchor.id,
          text: secondaryVariant.text,
          variantKey: secondaryVariant.variantKey,
          mother_theme: secondaryAnchor.mother_theme
        }
      }
    }
  }

  // M-8.4 Fix: Save current session anchor (for same test, hard guarantee)
  if (saveToSession && primary?.id) {
    saveCurrentSessionAnchor(primary.id, primary.variantKey)
    // Note: Do NOT save to usedAnchorIds here - that's for next session only
  }

  return {
    primary,
    secondary,
    debug: {
      totalAnchors: availableAnchors.length,
      scoredCount: scored.length,
      primaryScore: scored[0]?.score || 0,
      primaryTheme: primary?.mother_theme || '',
      secondaryTheme: secondary?.mother_theme || '',
      usedCount: usedIds.size
    }
  }
}

/**
 * Simple string hash for seed generation
 * @param {string} str - String to hash
 * @returns {number} Hash value
 */
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

