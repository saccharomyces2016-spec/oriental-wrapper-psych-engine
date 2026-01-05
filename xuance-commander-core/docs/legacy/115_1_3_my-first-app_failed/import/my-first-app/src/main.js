import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initTelemetry, captureError } from './core/telemetry/telemetryClient.js'

const app = createApp(App)

app.use(router)
app.mount('#app')

const enabled = String(import.meta.env.VITE_TELEMETRY_ENABLED || '').toLowerCase() === 'true'
const endpoint = import.meta.env.VITE_TELEMETRY_ENDPOINT || ''
const sampleRate = Number(import.meta.env.VITE_TELEMETRY_SAMPLE_RATE || 1)
initTelemetry({ enabled, endpoint, sampleRate })

window.addEventListener('error', (e) => {
  captureError(e.error || e.message || 'window_error', { where: 'window.error' })
})
window.addEventListener('unhandledrejection', (e) => {
  captureError(e.reason || 'unhandledrejection', { where: 'unhandledrejection' })
})
