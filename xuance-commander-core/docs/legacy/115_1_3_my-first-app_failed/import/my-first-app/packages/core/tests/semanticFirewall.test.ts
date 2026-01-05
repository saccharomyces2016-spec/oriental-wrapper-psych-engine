import { describe, expect, it } from 'vitest'
import {
  validateAnyOutput,
  validateDailyOutput,
  validateDiagnosticOutput,
} from '../src/middleware/semanticFirewall'

describe('Semantic Firewall', () => {
  it('allows inert observation in daily mode', () => {
    const result = validateDailyOutput(
      'The metal element is rigid today. Friction exists between intent and timing.'
    )
    expect(result.ok).toBe(true)
    expect(result.violations).toHaveLength(0)
  })

  it('blocks daily directive', () => {
    const result = validateDailyOutput('You should be like water.')
    expect(result.ok).toBe(false)
    expect(result.violations.some(v => v.ruleId === 'DAILY_YOU_DIRECTIVE')).toBe(true)
  })

  it('blocks daily predictive language', () => {
    const result = validateDailyOutput('You will find clarity today.')
    expect(result.ok).toBe(false)
    expect(result.violations.some(v => v.ruleId === 'DAILY_PREDICTIVE_WILL')).toBe(true)
  })

  it('blocks daily coaching/psych language', () => {
    const result = validateDailyOutput('Self-care is important. Stay strong.')
    expect(result.ok).toBe(false)
    expect(result.violations.some(v => v.ruleId === 'DAILY_COACH_PSYCH')).toBe(true)
  })

  it('blocks daily over sentence cap', () => {
    const text = 'One. Two. Three. Four. Five.'
    const result = validateDailyOutput(text)
    expect(result.ok).toBe(false)
    expect(result.violations.some(v => v.ruleId === 'DAILY_SENTENCE_CAP')).toBe(true)
  })

  it('blocks daily over token cap', () => {
    const text = Array.from({ length: 160 }, (_, i) => `word${i}`).join(' ')
    const result = validateDailyOutput(text)
    expect(result.ok).toBe(false)
    expect(result.violations.some(v => v.ruleId === 'DAILY_TOKEN_CAP')).toBe(true)
  })

  it('blocks diagnostic prescriptive language', () => {
    const result = validateDiagnosticOutput('I recommend you should take a break.')
    expect(result.ok).toBe(false)
    expect(
      result.violations.some(v => v.ruleId === 'DIAG_PRESCRIPTIVE_RECOMMEND_SUGGEST') ||
        result.violations.some(v => v.ruleId === 'DIAG_PRESCRIPTIVE_YOU_DIRECTIVE')
    ).toBe(true)
  })

  it('allows diagnostic if-then simulation', () => {
    const result = validateAnyOutput(
      'If the fire tension stays high, the water structure risks depletion.',
      'diagnostic'
    )
    expect(result.ok).toBe(true)
    expect(result.violations).toHaveLength(0)
  })
})
