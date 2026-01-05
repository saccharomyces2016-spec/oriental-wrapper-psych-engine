<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import OriginStage from './views/01_Origin.vue'
import InputStage from './views/02_Input.vue'
import ResonanceStage from './views/03_Resonance.vue'
import ComputationStage from './views/04_Computation.vue'
import DashboardStage from './views/05_Dashboard.vue'

import { consultTheOracle } from './core/SoulArchitect.js'
import StageTransition from './ui/transitions/StageTransition.vue'
import { resolveMotionMode } from './ui/motionPolicy.js'
import { captureEvent } from './core/telemetry/telemetryClient.js'
import ReportIssueButton from './components/ReportIssueButton.vue'

/**
 * Phase：
 * 0 Origin
 * 1 Input
 * 2 Resonance
 * 3 Computation
 * 4 Dashboard
 */
const phases = [OriginStage, InputStage, ResonanceStage, ComputationStage, DashboardStage]
const stageNames = ['origin', 'input', 'resonance', 'computation', 'dashboard']
const currentPhase = ref(0)
const stageKey = ref(0) // 強制重建 Stage（重置後避免沿用舊狀態）

const birthData = ref(null)
const resonanceData = ref(null)
const destinyData = ref(null)

const oracleStatus = ref({ state: 'idle', message: '', error: null })

/* ===== 判斷是否可進 05 ===== */
const isDestinyReady = computed(() => !!destinyData.value)

/* ===== 安全切換 ===== */
const clampPhase = next => Math.max(0, Math.min(phases.length - 1, next))
const goToPhase = next => {
  currentPhase.value = clampPhase(next)
  captureEvent('stage_view', { stage: currentPhase.value })
}

/* ===== 流程 ===== */
function handleOriginNext(payload) {
  // reset flow state at entry
  birthData.value = null
  resonanceData.value = null
  destinyData.value = null
  oracleStatus.value = { state: 'idle', message: '', error: null }
  stageKey.value++
  goToPhase(1)
}

function handleInputNext(payload) {
  birthData.value = payload
  resonanceData.value = null
  destinyData.value = null
  goToPhase(2)
}

function handleResonanceNext(payload) {
  resonanceData.value = payload?.resonance ?? payload
  destinyData.value = null
  goToPhase(3)
  runOracle()
}

async function runOracle() {
  oracleStatus.value = { state: 'running', message: '推演中…', error: null }
  try {
    destinyData.value = await consultTheOracle({
      birth: birthData.value,
      resonance: resonanceData.value
    })
    oracleStatus.value = { state: 'ready', message: '完成', error: null }
  } catch (err) {
    oracleStatus.value = { state: 'error', message: '失敗', error: String(err) }
    console.error('[oracle] error:', err)
  }
}

// ✅ 推演一完成，且還停在 04（currentPhase=3），就自動進 05
watch(
  () => [currentPhase.value, destinyData.value, oracleStatus.value.state],
  ([phase, destiny, state]) => {
    if (phase === 3 && destiny && state === 'ready') {
      goToPhase(4)
    }
  }
)

function handleComputationNext() {
  if (isDestinyReady.value) goToPhase(4)
}

/* ===== 返回 ===== */
function handleBack() {
  if (currentPhase.value > 0) {
    goToPhase(currentPhase.value - 1)
  }
}

/* ===== 另起一局 ===== */
function resetAll() {
  // 如果 03 有用 localStorage/sessionStorage 記狀態，這裡先粗暴清一次（新手最穩）
  // M-8.4 Fix: But preserve anchor_used_ids for next session, only clear current session anchor
  try {
    const usedIds = sessionStorage.getItem('anchor_used_ids') // Preserve for next session
    localStorage.clear()
    sessionStorage.clear()
    // Clear current session anchor (will be regenerated for new test)
    // But preserve used IDs for next session (to avoid showing same anchors)
    if (usedIds) {
      sessionStorage.setItem('anchor_used_ids', usedIds) // Restore for next session
    }
  } catch (e) {
    console.warn('[reset] clear storage failed', e)
  }

  birthData.value = null
  resonanceData.value = null
  destinyData.value = null
  oracleStatus.value = { state: 'idle', message: '', error: null }

  goToPhase(0)

  // 強制重建整個流程（解決：03 會跳到舊回合）
  stageKey.value++
}

/* ===== 對應元件 ===== */
const stageComponent = computed(() => phases[currentPhase.value])
const stageName = computed(() => stageNames[currentPhase.value] || `phase-${currentPhase.value}`)

const stageProps = computed(() => {
  switch (currentPhase.value) {
    case 2:
      return { result: birthData.value }
    case 3:
      return { oracleStatus: oracleStatus.value }
    case 4:
      return { data: destinyData.value }
    default:
      return {}
  }
})

function handleStageNext(payload) {
  switch (currentPhase.value) {
    case 0:
      handleOriginNext()
      break
    case 1:
      handleInputNext(payload)
      break
    case 2:
      handleResonanceNext(payload)
      break
    case 3:
      handleComputationNext()
      break
    default:
      break
  }
}

const motionDebug =
  import.meta.env.DEV &&
  String(import.meta.env.VITE_DEBUG_MOTION || '').toLowerCase() === 'true'
const motionState = ref({ mode: 'full', avgFps: 60, reducedMotion: false, lowFps: false })
const telemetryReportEnabled =
  String(import.meta.env.VITE_TELEMETRY_UI_REPORT || '').toLowerCase() === 'true'

onMounted(() => {
  const res = resolveMotionMode({ debug: motionDebug })
  motionState.value = { mode: res.mode, reducedMotion: res.reducedMotion, lowFps: res.lowFps, avgFps: res.monitor?.getState?.().avgFps || 60 }
  if (motionDebug) {
    console.info('[App] motion mode', motionState.value)
  }
  if (res.monitor) res.monitor.stop()
})
</script>

<template>
  <div class="app-shell">
    <!-- 固定在左上角，避免被 05 的 panel/背景蓋住 -->
    <button
      v-if="currentPhase > 0"
      class="back-btn"
      type="button"
      @click="handleBack"
    >
      返回
    </button>

    <StageTransition :key="currentPhase + '-' + stageKey">
      <component
        :is="stageComponent"
        :key="currentPhase + '-' + stageKey + '-inner'"
        v-bind="stageProps"
        @next="handleStageNext"
        @reset="resetAll"
      />
    </StageTransition>

    <ReportIssueButton
      v-if="telemetryReportEnabled"
      :stage="stageName"
      :enabled="telemetryReportEnabled"
    />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}

/* 讓返回鍵永遠在最上層、可點 */
.back-btn {
  position: fixed;
  left: 18px;
  top: 18px;
  z-index: 99999;

  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 220, 170, 0.18);
  color: rgba(255, 235, 205, 0.92);
  letter-spacing: 2px;
  cursor: pointer;
}

.back-btn:hover {
  background: rgba(212, 175, 55, 0.12);
}
</style>
