function canExpose() {
  return typeof window !== 'undefined' && import.meta?.env?.DEV
}

export function exposeGovernanceOntologies(payload = {}) {
  if (!canExpose()) return
  try {
    window.__GOV = {
      ...payload,
      ts: new Date().toISOString()
    }
  } catch (err) {
    console.error('[GOV][expose] failed', err)
  }
}

export function updateGovDebug(payload = {}) {
  if (!canExpose()) return
  try {
    const prev = typeof window.__GOV === 'object' ? window.__GOV : {}
    window.__GOV = {
      ...prev,
      ...payload,
      ts: new Date().toISOString()
    }
  } catch (err) {
    console.error('[GOV][update] failed', err)
  }
}
