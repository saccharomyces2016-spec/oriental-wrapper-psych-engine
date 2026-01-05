#!/usr/bin/env node
// scripts/generateAnchorSamples.mjs
// M-8.4: Generate anchor output sampling report

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Load anchor statements
const anchorStatementsPath = join(rootDir, 'src/core/content/resultTemplates/anchor_statements.v1.json')
const anchorStatements = JSON.parse(readFileSync(anchorStatementsPath, 'utf-8'))

// Load state tag extractor logic (simplified version)
function extractStateTags({ psych = {}, resonance = {}, guidance = {} } = {}) {
  const tags = new Set()
  const traits = psych?.traits || {}
  const axes = psych?.axes || {}
  
  if (traits.drive > 0.7 || axes.heat > 0.7 || axes.move > 0.7) tags.add('high_arousal')
  if (traits.drive < 0.3 || axes.move < 0.3) tags.add('low_arousal')
  if (traits.control > 0.7) tags.add('high_control')
  if (traits.control < 0.3) tags.add('low_control')
  if (traits.control > 0.7 && traits.innerTension > 0.6) tags.add('over_control')
  if (traits.riskAversion > 0.7 || axes.inward > 0.7) tags.add('avoidance')
  if (traits.riskAversion > 0.7 && traits.drive < 0.4) tags.add('procrastination')
  if (traits.stabilityNeed > 0.7 && traits.control > 0.6) tags.add('high_obligation')
  if (traits.stabilityNeed > 0.7 && traits.control > 0.6) tags.add('over_responsibility')
  if (traits.innerTension > 0.7 && traits.control > 0.6) tags.add('overthinking')
  if (traits.sensitivity > 0.7 && traits.riskAversion > 0.6) tags.add('emotional_suppression')
  if (traits.sensitivity > 0.7) tags.add('people_pleasing')
  if (axes.inward > 0.7 && traits.riskAversion > 0.6) tags.add('social_withdrawal')
  if (traits.innerTension > 0.7 && traits.drive < 0.4) tags.add('exhaustion')
  if (traits.stabilityNeed > 0.7 && traits.innerTension > 0.7) tags.add('sleep_debt')
  if (traits.riskAversion > 0.7 && traits.drive < 0.5) tags.add('self_doubt')
  if (traits.innerTension > 0.7) tags.add('anxiety')
  if (traits.stabilityNeed > 0.7 && traits.drive > 0.6 && traits.innerTension > 0.7) tags.add('neglected_needs')
  if (traits.riskAversion > 0.7 && traits.control < 0.5) tags.add('uncertainty')
  if (traits.stabilityNeed > 0.7 && traits.control < 0.4) tags.add('external_validation')
  if (traits.control < 0.3 && traits.drive < 0.4) tags.add('lack_of_agency')
  if (axes.inward > 0.7) tags.add('withdrawal')
  
  return Array.from(tags)
}

// Simple seeded random
function seedRandom(seed = 1) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

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

function selectAnchor(motherThemes, stateTags, seed) {
  const allAnchors = anchorStatements.items || []
  if (!allAnchors.length) return null
  
  const random = seedRandom(seed)
  
  // Score anchors
  const scored = allAnchors.map(anchor => {
    let score = 0
    const anchorTheme = anchor.mother_theme || ''
    
    if (Array.isArray(motherThemes) && motherThemes.length) {
      const topTheme = motherThemes[0]
      const themeId = topTheme?.themeId || topTheme?.id || topTheme?.key || String(topTheme || '')
      
      if (anchorTheme === themeId || anchorTheme === themeId.replace('_', '-')) {
        score += 10
      }
      if (anchorTheme.includes(themeId.split('_')[0]) || themeId.includes(anchorTheme.split('_')[0])) {
        score += 5
      }
    }
    
    if (Array.isArray(stateTags) && stateTags.length && Array.isArray(anchor.state_tags)) {
      const matches = stateTags.filter(tag => anchor.state_tags.includes(tag)).length
      score += matches * 2
    }
    
    if (anchor.confidence === 'high') score += 3
    else if (anchor.confidence === 'medium-high') score += 2
    else if (anchor.confidence === 'medium') score += 1
    
    return { anchor, score }
  })
  
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return random() - 0.5
  })
  
  const selectedAnchor = scored[0]?.anchor || null
  if (!selectedAnchor) return null
  
  const variant = selectVariant(selectedAnchor, random)
  
  return {
    id: selectedAnchor.id,
    label: selectedAnchor.label,
    mother_theme: selectedAnchor.mother_theme,
    text: variant.text,
    variantKey: variant.variantKey,
    state_tags: selectedAnchor.state_tags || [],
    confidence: selectedAnchor.confidence,
    do_not_say: selectedAnchor.do_not_say || []
  }
}

// Generate sample psych profiles
function generateSamplePsych(seed) {
  const random = seedRandom(seed)
  return {
    traits: {
      drive: random(),
      control: random(),
      stabilityNeed: random(),
      sensitivity: random(),
      riskAversion: random(),
      innerTension: random()
    },
    axes: {
      move: random(),
      inward: random(),
      heat: random(),
      damp: random(),
      boundary: random()
    }
  }
}

// Generate sample mother themes
function generateSampleMotherThemes(seed) {
  const themes = [
    'control_vs_exhaustion',
    'avoidance_stagnation',
    'attachment_insecurity',
    'chronic_depletion',
    'identity_diffusion'
  ]
  const random = seedRandom(seed)
  const selected = themes[Math.floor(random() * themes.length)]
  return [{ themeId: selected, score: 0.8 }]
}

// Generate 30 samples
const samples = []
for (let i = 0; i < 30; i++) {
  const seed = 1000 + i
  const psych = generateSamplePsych(seed)
  const stateTags = extractStateTags({ psych })
  const motherThemes = generateSampleMotherThemes(seed)
  const anchor = selectAnchor(motherThemes, stateTags, seed)
  
  samples.push({
    sampleId: i + 1,
    seed,
    anchor: anchor ? {
      id: anchor.id,
      label: anchor.label,
      text: anchor.text,
      variantKey: anchor.variantKey,
      mother_theme: anchor.mother_theme,
      state_tags: anchor.state_tags,
      confidence: anchor.confidence,
      do_not_say: anchor.do_not_say
    } : null,
    psych: {
      traits: Object.fromEntries(
        Object.entries(psych.traits).map(([k, v]) => [k, Number(v.toFixed(2))])
      ),
      axes: Object.fromEntries(
        Object.entries(psych.axes).map(([k, v]) => [k, Number(v.toFixed(2))])
      )
    },
    extractedStateTags: stateTags,
    motherThemes: motherThemes.map(mt => mt.themeId)
  })
}

// Generate report
const report = {
  meta: {
    generatedAt: new Date().toISOString(),
    totalSamples: samples.length,
    note: 'This is a sampling report for manual review. Check for: similarity, vagueness, forbidden words, over-assertiveness.'
  },
  samples
}

// Output report
console.log(JSON.stringify(report, null, 2))

// Also output a human-readable summary
console.error('\n=== Anchor Output Sampling Report ===\n')
samples.forEach(sample => {
  if (!sample.anchor) {
    console.error(`Sample ${sample.sampleId}: No anchor selected`)
    return
  }
  console.error(`Sample ${sample.sampleId}:`)
  console.error(`  ID: ${sample.anchor.id}`)
  console.error(`  Label: ${sample.anchor.label}`)
  console.error(`  Mother Theme: ${sample.anchor.mother_theme}`)
  console.error(`  Variant Key: ${sample.anchor.variantKey}`)
  console.error(`  Text: "${sample.anchor.text}"`)
  console.error(`  State Tags: ${sample.anchor.state_tags.join(', ') || 'none'}`)
  console.error(`  Confidence: ${sample.anchor.confidence}`)
  console.error(`  Do Not Say: ${sample.anchor.do_not_say.join(', ') || 'none'}`)
  console.error('')
})



















