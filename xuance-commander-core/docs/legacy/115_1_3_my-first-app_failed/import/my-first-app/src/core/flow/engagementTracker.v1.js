const STORAGE_KEY = 'reading_engagement_v1'
const IDLE_MS = 60000

function now() {
  return Date.now()
}

function persist(state) {
  try {
    const payload = {
      ts: now(),
      active_ms: state.activeMs,
      idle_gaps_total_ms: state.idleGapsTotalMs,
      idle_gaps_count: state.idleGapsCount,
      scroll_depth_max: state.scrollDepthMax,
      revisit_count: state.revisitCount,
      share_click: state.shareClick,
      reading_id: state.readingId || ''
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // best effort only
  }
}

function snapshot(state) {
  const t = now()
  const activeExtra = state.isIdle ? 0 : Math.max(0, t - state.activeStart)
  return {
    active_ms: state.activeMs + activeExtra,
    idle_gaps_total_ms: state.idleGapsTotalMs,
    idle_gaps_count: state.idleGapsCount,
    scroll_depth_max: state.scrollDepthMax,
    revisit_count: state.revisitCount,
    share_click: state.shareClick,
    reading_id: state.readingId || '',
    ts: t
  }
}

export class EngagementTracker {
  constructor({ idleMs = IDLE_MS, onUpdate } = {}) {
    this.idleMs = idleMs
    this.onUpdate = typeof onUpdate === 'function' ? onUpdate : () => {}
    this.state = {
      activeMs: 0,
      idleGapsTotalMs: 0,
      idleGapsCount: 0,
      scrollDepthMax: 0,
      revisitCount: 0,
      shareClick: 0,
      readingId: '',
      isIdle: false,
      activeStart: now(),
      idleStart: null
    }
    this.idleTimer = null
    this.markActive()
  }

  setReadingId(id) {
    this.state.readingId = id || ''
  }

  markActive() {
    const t = now()
    if (this.state.isIdle) {
      const gap = Math.max(0, t - (this.state.idleStart || t))
      this.state.idleGapsTotalMs += gap
      this.state.idleGapsCount += 1
      this.state.revisitCount += 1
      this.state.activeStart = t
      this.state.isIdle = false
    }
    this.resetIdleTimer()
    this.emit()
  }

  markScroll(depthPercent) {
    if (typeof depthPercent === 'number') {
      this.state.scrollDepthMax = Math.max(this.state.scrollDepthMax, Math.min(100, Math.max(0, depthPercent)))
    }
    this.markActive()
  }

  markShare() {
    this.state.shareClick += 1
    this.markActive()
  }

  goIdle() {
    if (this.state.isIdle) return
    const t = now()
    this.state.activeMs += Math.max(0, t - this.state.activeStart)
    this.state.isIdle = true
    this.state.idleStart = t
    this.clearIdleTimer()
    this.emit()
  }

  resetIdleTimer() {
    this.clearIdleTimer()
    this.idleTimer = setTimeout(() => this.goIdle(), this.idleMs)
  }

  clearIdleTimer() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer)
      this.idleTimer = null
    }
  }

  emit() {
    const snap = snapshot(this.state)
    persist({ ...snap, readingId: this.state.readingId })
    this.onUpdate(snap)
  }

  stop() {
    this.goIdle()
    this.clearIdleTimer()
  }
}

export default EngagementTracker
