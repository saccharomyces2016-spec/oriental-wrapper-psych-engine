import { describe, it, expect } from 'vitest'
import { DestinyScoringEngine } from '../src/core/scoring/DestinyScoringEngine.ts'
import type { DestinyInput } from '../src/core/types/destiny.js'

describe('DestinyScoringEngine - Core Verification', () => {
  const engine = new DestinyScoringEngine()

  describe('1a) Deterministic output for identical input', () => {
    it('should return identical output for same input', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.9, qi: 0.1 } },
        round3: { trait: 'INTERNAL_CONTROL', rejected_option: 'EXTERNAL' },
        round4: { intensity: 'OVERLOAD' }
      }

      const result1 = engine.score(input)
      const result2 = engine.score(input)
      const result3 = engine.score(input)

      expect(result1).toEqual(result2)
      expect(result2).toEqual(result3)
      expect(result1.code).toBe(result2.code)
      expect(result1.friction).toBe(result2.friction)
      expect(result1.intensity).toBe(result2.intensity)
    })

    it('should handle empty signal_map deterministically', () => {
      const input: DestinyInput = {
        round1: { domainId: 'cai' },
        round2: { signal_map: {} },
        round3: { trait: 'EXTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result1 = engine.score(input)
      const result2 = engine.score(input)

      expect(result1).toEqual(result2)
    })
  })

  describe('1b) HIGH friction when R2 state contradicts R3 trait', () => {
    it('should return HIGH friction for high momentum + INTERNAL_CONTROL', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.9 } }, // High momentum
        round3: { trait: 'INTERNAL_CONTROL', rejected_option: 'EXTERNAL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.friction).toBe('HIGH')
    })

    it('should return HIGH friction when momentum >= 0.5 and trait is INTERNAL_CONTROL', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.5 } }, // Exactly 0.5
        round3: { trait: 'INTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.friction).toBe('HIGH')
    })
  })

  describe('1c) LOW friction when R2 and R3 are aligned', () => {
    it('should return LOW friction for high momentum + EXTERNAL_CONTROL', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.9 } }, // High momentum
        round3: { trait: 'EXTERNAL_CONTROL', rejected_option: 'INTERNAL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.friction).toBe('LOW')
    })

    it('should return LOW friction for low momentum + INTERNAL_CONTROL', () => {
      // Note: normalizeSignalMap normalizes values, so we need multiple signals
      // to ensure shi < 0.5 after normalization
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.3, qi: 0.7 } }, // After normalization: shi = 0.3/1.0 = 0.3 (< 0.5)
        round3: { trait: 'INTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.friction).toBe('LOW')
      expect(result.debug?.momentum).toBeLessThan(0.5)
    })

    it('should return LOW friction when momentum is missing', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { qi: 0.9 } }, // No 'shi' key
        round3: { trait: 'INTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.friction).toBe('LOW')
    })
  })

  describe('1d) Signature.code format stability', () => {
    it('should generate code in format: DOMAIN_TRAIT_FRICTION_INTENSITY', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 0.3, qi: 0.7 } },
        round3: { trait: 'EXTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      // Code format: DOMAIN_TRAIT_FRICTION_INTENSITY
      // Note: trait may contain underscores (e.g., EXTERNAL_CONTROL), so split gives more parts
      expect(result.code).toMatch(/^YE_EXTERNAL_CONTROL_LOW_BALANCED$/)
      expect(result.code).toContain('YE')
      expect(result.code).toContain('EXTERNAL_CONTROL')
      expect(result.code).toContain('LOW')
      expect(result.code).toContain('BALANCED')
      // Verify it starts with domain and ends with intensity
      expect(result.code.startsWith('YE_')).toBe(true)
      expect(result.code.endsWith('_BALANCED')).toBe(true)
    })

    it('should handle missing domainId with UNKNOWN', () => {
      const input: DestinyInput = {
        round1: { domainId: '' },
        round2: { signal_map: {} },
        round3: { trait: 'INTERNAL_CONTROL' },
        round4: { intensity: 'OVERLOAD' }
      }

      const result = engine.score(input)
      expect(result.code).toContain('UNKNOWN')
    })

    it('should handle missing trait with UNSPECIFIED', () => {
      const input: DestinyInput = {
        round1: { domainId: 'cai' },
        round2: { signal_map: {} },
        round3: {},
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      expect(result.code).toContain('UNSPECIFIED')
    })

    it('should uppercase domain and trait, but intensity is passed as-is', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: {} },
        round3: { trait: 'internal_control' },
        round4: { intensity: 'OVERLOAD' } // Must be uppercase in input
      }

      const result = engine.score(input)
      // Domain and trait are uppercased, but intensity is used as-is from input
      expect(result.code).toBe('YE_INTERNAL_CONTROL_LOW_OVERLOAD')
      expect(result.code).toContain('YE')
      expect(result.code).toContain('INTERNAL_CONTROL')
      expect(result.code).toContain('LOW')
      expect(result.code).toContain('OVERLOAD')
    })
  })

  describe('Edge cases', () => {
    it('should handle missing round4 intensity with default BALANCED', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: {} },
        round3: { trait: 'EXTERNAL_CONTROL' },
        round4: {}
      }

      const result = engine.score(input)
      expect(result.intensity).toBe('BALANCED')
    })

    it('should normalize signal_map values correctly', () => {
      const input: DestinyInput = {
        round1: { domainId: 'ye' },
        round2: { signal_map: { shi: 100, qi: 200 } }, // Large values
        round3: { trait: 'INTERNAL_CONTROL' },
        round4: { intensity: 'BALANCED' }
      }

      const result = engine.score(input)
      // After normalization, shi should be 100/300 = 0.333... < 0.5, so LOW friction
      expect(result.friction).toBe('LOW')
      expect(result.debug?.momentum).toBeLessThan(0.5)
    })
  })
})

