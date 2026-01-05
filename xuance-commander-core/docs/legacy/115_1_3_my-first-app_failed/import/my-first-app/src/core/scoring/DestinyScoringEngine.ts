import { normalizeSignalMap } from './normalize.js'
import type {
  DestinyInput,
  DestinySignature,
  FrictionLevel,
  IntensityLevel,
  Round3Structure
} from '../types/destiny.js'

function computeFriction(signalVector: Record<string, number>, r3: Round3Structure): FrictionLevel {
  const momentum = signalVector['shi'] || 0
  const highMomentum = momentum >= 0.5
  const trait = String(r3?.trait || '').toUpperCase()
  const isInternal = trait === 'INTERNAL_CONTROL'
  if (highMomentum && isInternal) return 'HIGH'
  return 'LOW'
}

function buildCode(domainId: string, trait: string, friction: FrictionLevel, intensity: IntensityLevel) {
  const parts = [
    String(domainId || 'UNKNOWN').toUpperCase(),
    trait ? String(trait).toUpperCase() : 'UNSPECIFIED',
    friction,
    intensity
  ]
  return parts.join('_')
}

export class DestinyScoringEngine {
  score(input: DestinyInput): DestinySignature {
    const norm = normalizeSignalMap(input?.round2?.signal_map || {})
    const friction = computeFriction(norm.vector, input?.round3 || {})
    const intensity: IntensityLevel = input?.round4?.intensity || 'BALANCED'
    const trait = String(input?.round3?.trait || '').toUpperCase()
    const code = buildCode(input?.round1?.domainId || 'UNKNOWN', trait, friction, intensity)

    return {
      code,
      friction,
      intensity,
      archetype: [],
      debug: {
        normalizedSignalMap: norm,
        trait,
        momentum: norm.vector['shi'] || 0,
        rejected_option: input?.round3?.rejected_option
      }
    }
  }
}

export default DestinyScoringEngine
