const state = {
  enabled: false,
  endpoint: '',
  sampleRate: 1,
  sessionId: '',
  lastSent: new Map(),
  lastErrorMessage: ''
}

const THROTTLE_MS = 30 * 1000
const MAX_LEN = 300
const PAY_EVENT_TYPES = new Set(['view', 'click', 'checkout_start', 'purchase_success'])

function getSessionId() {
  try {
    const key = 'telemetry_session_id'
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)
    localStorage.setItem(key, id)
    return id
  } catch {
    return 'anon'
  }
}

export function initTelemetry({ enabled = false, endpoint = '', sampleRate = 1 } = {}) {
  state.enabled = !!enabled && !!endpoint
  state.endpoint = endpoint
  state.sampleRate = Number(sampleRate) || 1
  state.sessionId = getSessionId()
}

function shouldSend(message) {
  if (!state.enabled) return false
  if (Math.random() > state.sampleRate) return false
  const now = Date.now()
  const last = state.lastSent.get(message) || 0
  if (now - last < THROTTLE_MS) return false
  state.lastSent.set(message, now)
  return true
}

function sanitize(obj = {}) {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') out[k] = v.slice(0, MAX_LEN)
    else if (typeof v === 'number' || typeof v === 'boolean') out[k] = v
  }
  return out
}

async function send(kind, payload) {
  if (!state.enabled) return
  try {
    await fetch(state.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, sessionId: state.sessionId, ts: Date.now(), ...sanitize(payload) })
    })
  } catch (err) {
    if (import.meta.env?.DEV) console.warn('[telemetry] send failed', err)
  }
}

export function captureError(error, context = {}) {
  const message = String(error?.message || error || 'unknown error')
  state.lastErrorMessage = message
  if (!state.enabled) return
  if (!shouldSend(`err:${message}`)) return
  const payload = {
    type: 'error',
    message,
    stack: String(error?.stack || '').slice(0, MAX_LEN),
    ...context
  }
  send('error', payload)
}

export function captureEvent(name, payload = {}) {
  if (!state.enabled) return
  const key = `evt:${name}`
  if (!shouldSend(key)) return
  send('event', { event: name, ...payload })
}

export function capturePayEvent(type, payload = {}) {
  const safeType = String(type || '').toLowerCase()
  const eventKey = PAY_EVENT_TYPES.has(safeType) ? `paywall_${safeType}` : ''
  if (!eventKey) return
  captureEvent(eventKey, payload)
}

export function getLastErrorMessage() {
  return state.lastErrorMessage
}
