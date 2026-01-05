#!/usr/bin/env node
// scripts/auditPatternTags.mjs
// Pattern Tag Usage Audit

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Load data
const questionBank = JSON.parse(readFileSync(join(rootDir, 'src/core/ontology/questionBank.v1.json'), 'utf-8'))
const patternToThemeMap = (await import(join(rootDir, 'src/core/ontology/patternToThemeMap.v1.js'))).patternToThemeMap

// Audit results
const ok = []
const mismatch = []
const tagUsageMatrix = {} // tag -> { themeIds: Set, mappedThemeId: string }

// Scan each question
questionBank.items.forEach(item => {
  const themeId = item.theme_id
  const questions = Array.isArray(item.questions) ? item.questions : []
  
  questions.forEach((q, qIdx) => {
    const patternTags = Array.isArray(q.pattern_tags) ? q.pattern_tags : []
    const questionText = q.question_text || 'unknown'
    
    patternTags.forEach(tag => {
      const mapping = patternToThemeMap[tag]
      const mappedThemeId = mapping?.themeId || null
      
      // Track usage
      if (!tagUsageMatrix[tag]) {
        tagUsageMatrix[tag] = {
          themeIds: new Set(),
          mappedThemeId: mappedThemeId,
          questions: []
        }
      }
      tagUsageMatrix[tag].themeIds.add(themeId)
      tagUsageMatrix[tag].questions.push({
        themeId,
        questionText: questionText.slice(0, 80)
      })
      
      // Check match
      if (mappedThemeId === themeId) {
        ok.push({
          themeId,
          questionText: questionText.slice(0, 80),
          tag,
          mappedThemeId
        })
      } else {
        mismatch.push({
          themeId,
          questionText: questionText.slice(0, 80),
          tag,
          mappedThemeId: mappedThemeId || 'NO_MAPPING',
          questionIndex: qIdx
        })
      }
    })
  })
})

// Generate report
const report = {
  meta: {
    generatedAt: new Date().toISOString(),
    totalQuestions: questionBank.items.reduce((sum, item) => sum + (Array.isArray(item.questions) ? item.questions.length : 0), 0),
    totalPatternTags: Object.keys(tagUsageMatrix).length,
    okCount: ok.length,
    mismatchCount: mismatch.length
  },
  ok: ok,
  mismatch: mismatch,
  tagUsageMatrix: Object.fromEntries(
    Object.entries(tagUsageMatrix).map(([tag, data]) => [
      tag,
      {
        mappedThemeId: data.mappedThemeId,
        usedByThemes: Array.from(data.themeIds),
        questionCount: data.questions.length
      }
    ])
  )
}

console.log(JSON.stringify(report, null, 2))



















