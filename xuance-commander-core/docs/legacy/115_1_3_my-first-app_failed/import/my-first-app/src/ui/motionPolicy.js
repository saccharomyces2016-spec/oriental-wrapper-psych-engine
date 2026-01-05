import styleGuide from './styleGuide.v1.json'

const MOTION_CFG = styleGuide?.motion || {}
const DEBUG_MOTION =
  import.meta.env.DEV &&
  (String(import.meta.env.VITE_DEBUG_MOTION || '').toLowerCase() === 'true')

export function getReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export function createFpsMonitor({ fpsFloor = MOTION_CFG.fpsFloor || 45, sampleWindowMs = MOTION_CFG.fpsSampleWindowMs || 900 } = {}) {
  let rafId = null
  const samples = []
  let last = null
  const state = {
    avgFps: 60,
    isLowFps: false
  }

  const loop = (ts) => {
    if (last != null) {
      const delta = ts - last
      const fps = delta > 0 ? 1000 / delta : 60
      samples.push({ ts, fps })
      const cutoff = ts - sampleWindowMs
      while (samples.length && samples[0].ts < cutoff) samples.shift()
      const avg = samples.reduce((a, b) => a + b.fps, 0) / (samples.length || 1)
      state.avgFps = avg
      state.isLowFps = avg < fpsFloor
    }
    last = ts
    rafId = requestAnimationFrame(loop)
  }

  return {
    start() {
      if (rafId != null) return
      rafId = requestAnimationFrame(loop)
    },
    stop() {
      if (rafId != null) cancelAnimationFrame(rafId)
      rafId = null
      samples.length = 0
      last = null
    },
    getState() {
      return { ...state }
    }
  }
}

export function resolveMotionMode({ debug = DEBUG_MOTION } = {}) {
  const reducedMotion = styleGuide?.accessibility?.respectReducedMotion ? getReducedMotion() : false
  const monitor = createFpsMonitor()
  monitor.start()
  const s = monitor.getState()
  const lowFps = s.isLowFps

  let mode = 'full'
  if (reducedMotion) mode = 'reduced'
  else if (lowFps) mode = 'low'

  if (debug) {
    console.info('[motionPolicy]', { reducedMotion, lowFps, avgFps: s.avgFps, mode })
  }

  return { reducedMotion, lowFps, mode, monitor }
}
