export type SignalKey = string
export type SignalValue = 'LOW' | 'HIGH' | 'OVERFLOW' | 'BALANCED' | 'OVERLOAD'
export type IntensityLevel = 'BALANCED' | 'OVERLOAD'
export type FrictionLevel = 'LOW' | 'HIGH'

// Signal keys extracted from round2FourSymbol.v1.json
export const SIGNAL_KEYS: SignalKey[] = [
  'agency',
  'alignment',
  'avoidance',
  'bridge_building',
  'control',
  'experiment',
  'help_seeking',
  'momentum',
  'overload',
  'planning',
  'recovery',
  'resourcefulness',
  'responsibility',
  'risk_aversion',
  'stability',
  'validation'
]

export const INTENSITY_LEVELS: IntensityLevel[] = ['BALANCED', 'OVERLOAD']
export const FRICTION_LEVELS: FrictionLevel[] = ['LOW', 'HIGH']
export const ROUND2_SIGNAL_VALUES: SignalValue[] = ['LOW', 'HIGH', 'OVERFLOW', 'BALANCED', 'OVERLOAD']
