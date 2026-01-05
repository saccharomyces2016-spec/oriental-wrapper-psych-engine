#!/usr/bin/env node
// scripts/analyzeAnchorPerformance.mjs
// M-8.4: Analyze anchor performance and identify weak anchors

import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Load anchor statements
const anchorStatementsPath = join(rootDir, 'src/core/content/resultTemplates/anchor_statements.v1.json')
const anchorStatements = JSON.parse(readFileSync(anchorStatementsPath, 'utf-8'))

// Load telemetry log if exists
const telemetryLogPath = join(rootDir, '_telemetry.log')
let telemetryEvents = []

if (existsSync(telemetryLogPath)) {
  const logContent = readFileSync(telemetryLogPath, 'utf-8')
  const lines = logContent.split('\n').filter(Boolean)
  telemetryEvents = lines.map(line => {
    try {
      return JSON.parse(line)
    } catch {
      return null
    }
  }).filter(Boolean)
}

// Analyze anchor performance
const anchorStats = new Map()

// Initialize stats for all anchors
anchorStatements.items.forEach(anchor => {
  anchorStats.set(anchor.id, {
    id: anchor.id,
    label: anchor.label,
    mother_theme: anchor.mother_theme,
    shownCount: 0,
    totalDwellMs: 0,
    dwellCount: 0,
    avgDwellMs: 0,
    milestones: {
      '2s': 0,
      '5s': 0,
      '10s': 0,
      'left': 0
    },
    variants: new Map()
  })
})

// Process telemetry events
telemetryEvents.forEach(event => {
  if (event.event === 'anchor_shown' && event.anchor_id) {
    const stats = anchorStats.get(event.anchor_id)
    if (stats) {
      stats.shownCount++
      const variantKey = event.variant_key || 'default'
      if (!stats.variants.has(variantKey)) {
        stats.variants.set(variantKey, { count: 0, totalDwell: 0, dwellCount: 0 })
      }
      const variantStats = stats.variants.get(variantKey)
      variantStats.count++
    }
  }
  
  if (event.event === 'anchor_dwell_ms' && event.anchor_id) {
    const stats = anchorStats.get(event.anchor_id)
    if (stats && event.dwell_ms) {
      stats.totalDwellMs += event.dwell_ms
      stats.dwellCount++
      stats.avgDwellMs = stats.dwellCount > 0 ? Math.round(stats.totalDwellMs / stats.dwellCount) : 0
      
      const milestone = event.milestone || 'left'
      if (stats.milestones.hasOwnProperty(milestone)) {
        stats.milestones[milestone]++
      }
    }
  }
})

// Calculate performance metrics
const MIN_SAMPLES = 10 // Minimum samples to consider
const LOW_DWELL_THRESHOLD = 2000 // 2 seconds - considered low engagement
const VERY_LOW_DWELL_THRESHOLD = 1000 // 1 second - very low engagement

const results = {
  meta: {
    analyzedAt: new Date().toISOString(),
    totalEvents: telemetryEvents.length,
    anchorShownEvents: telemetryEvents.filter(e => e.event === 'anchor_shown').length,
    anchorDwellEvents: telemetryEvents.filter(e => e.event === 'anchor_dwell_ms').length,
    minSamples: MIN_SAMPLES,
    lowDwellThreshold: LOW_DWELL_THRESHOLD,
    veryLowDwellThreshold: VERY_LOW_DWELL_THRESHOLD
  },
  anchors: Array.from(anchorStats.values()).map(stats => ({
    id: stats.id,
    label: stats.label,
    mother_theme: stats.mother_theme,
    shownCount: stats.shownCount,
    avgDwellMs: stats.avgDwellMs,
    milestones: stats.milestones,
    variants: Array.from(stats.variants.entries()).map(([key, v]) => ({
      key,
      count: v.count,
      avgDwell: v.dwellCount > 0 ? Math.round(v.totalDwell / v.dwellCount) : 0
    })),
    performance: {
      hasEnoughSamples: stats.shownCount >= MIN_SAMPLES,
      isLowEngagement: stats.shownCount >= MIN_SAMPLES && stats.avgDwellMs < LOW_DWELL_THRESHOLD,
      isVeryLowEngagement: stats.shownCount >= MIN_SAMPLES && stats.avgDwellMs < VERY_LOW_DWELL_THRESHOLD,
      recommendation: stats.shownCount < MIN_SAMPLES 
        ? 'need_more_data' 
        : stats.avgDwellMs < VERY_LOW_DWELL_THRESHOLD 
          ? 'consider_rewrite_or_remove'
          : stats.avgDwellMs < LOW_DWELL_THRESHOLD
            ? 'consider_improvement'
            : 'acceptable'
    }
  })),
  weakAnchors: Array.from(anchorStats.values())
    .filter(stats => 
      stats.shownCount >= MIN_SAMPLES && 
      stats.avgDwellMs < LOW_DWELL_THRESHOLD
    )
    .map(stats => ({
      id: stats.id,
      label: stats.label,
      mother_theme: stats.mother_theme,
      shownCount: stats.shownCount,
      avgDwellMs: stats.avgDwellMs,
      recommendation: stats.avgDwellMs < VERY_LOW_DWELL_THRESHOLD 
        ? 'consider_rewrite_or_remove'
        : 'consider_improvement'
    }))
}

// Output results
console.log(JSON.stringify(results, null, 2))

// Also output human-readable summary
console.error('\n=== Anchor Performance Analysis ===\n')
console.error(`Total Events: ${results.meta.totalEvents}`)
console.error(`Anchor Shown Events: ${results.meta.anchorShownEvents}`)
console.error(`Anchor Dwell Events: ${results.meta.anchorDwellEvents}\n`)

if (results.weakAnchors.length > 0) {
  console.error(`Weak Anchors (${results.weakAnchors.length}):`)
  results.weakAnchors.forEach(anchor => {
    console.error(`  - ${anchor.id} (${anchor.label})`)
    console.error(`    Mother Theme: ${anchor.mother_theme}`)
    console.error(`    Shown: ${anchor.shownCount} times`)
    console.error(`    Avg Dwell: ${anchor.avgDwellMs}ms`)
    console.error(`    Recommendation: ${anchor.recommendation}`)
    console.error('')
  })
} else {
  console.error('No weak anchors identified (need more data or all anchors performing well)')
}



















