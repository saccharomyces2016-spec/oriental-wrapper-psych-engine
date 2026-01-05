import assert from 'node:assert'
import { DestinyScoringEngine } from '../src/core/scoring/DestinyScoringEngine.ts'

const engine = new DestinyScoringEngine()

const baseInput = {
  round1: { domainId: 'ye' },
  round2: { signal_map: { shi: 0.9, qi: 0.1 } },
  round3: { trait: 'INTERNAL_CONTROL', rejected_option: 'EXTERNAL' },
  round4: { intensity: 'OVERLOAD' }
}

const highInternal = engine.score(baseInput)
assert.strictEqual(highInternal.friction, 'HIGH', 'High momentum + internal control should be HIGH friction')

const highExternal = engine.score({
  ...baseInput,
  round3: { trait: 'EXTERNAL_CONTROL', rejected_option: 'INTERNAL' }
})
assert.strictEqual(highExternal.friction, 'LOW', 'High momentum + external control should be LOW friction')

console.log('[DestinyScoringEngine] tests passed')
