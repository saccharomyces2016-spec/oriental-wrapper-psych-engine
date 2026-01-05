export type FrictionLevel = 'LOW' | 'HIGH'
export type IntensityLevel = 'BALANCED' | 'OVERLOAD'

export interface Round1Input {
  domainId: string
}

export interface Round2State {
  signal_map: Record<string, number>
}

export interface Round3Structure {
  trait?: 'INTERNAL_CONTROL' | 'EXTERNAL_CONTROL' | string
  rejected_option?: string
}

export interface Round4State {
  intensity?: IntensityLevel
}

export interface DestinyInput {
  round1: Round1Input
  round2: Round2State
  round3: Round3Structure
  round4: Round4State
}

export interface DestinySignature {
  code: string
  friction: FrictionLevel
  intensity: IntensityLevel
  archetype: string[]
  debug?: Record<string, unknown>
}
