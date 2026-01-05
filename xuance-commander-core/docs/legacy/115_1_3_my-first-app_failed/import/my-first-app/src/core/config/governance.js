const ENV_VAL =
  (typeof process !== 'undefined' && process.env?.VITE_GOVERNANCE_MODE) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOVERNANCE_MODE) ||
  'true'

export const GOVERNANCE_MODE = String(ENV_VAL).toLowerCase() === 'true'

export function assertGovernanceDisabled(message = 'Legacy dataset blocked by governance mode') {
  if (GOVERNANCE_MODE) {
    throw new Error(message)
  }
}

export default {
  GOVERNANCE_MODE,
  assertGovernanceDisabled
}
