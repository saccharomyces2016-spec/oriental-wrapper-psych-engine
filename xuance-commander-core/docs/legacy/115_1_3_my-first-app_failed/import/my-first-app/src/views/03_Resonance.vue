<template>
  <div class="resonance-stage" @mousemove="handleMouseMove">
    <div class="void-bg"></div>
    <div class="nebula-layer" :style="nebulaStyle"></div>

    <!-- Header -->
    <div class="header-area" :class="{ 'fade-out': isThinking && !questionModeActive }">
      <h2 class="ink-font title">{{ currentTitle }}</h2>
      <p class="subtitle">{{ currentSubtitle }}</p>

      <div class="phase-hint" v-if="phaseHint">
        <span class="pill ink-font">{{ phaseHint }}</span>
      </div>
      <div v-if="questionFallbackMessage" class="question-fallback">
        {{ questionFallbackMessage }}
      </div>
      <div v-if="governanceDataError" class="question-fallback">
        {{ governanceDataError }}
      </div>
    </div>

    <!-- Question mode -->
    <div v-if="questionModeActive" class="question-mode">
      <div class="question-grid">
        <div v-for="q in questionCards" :key="q.id" class="question-card">
          <div class="question-label">
            <span class="theme-pill ink-font">{{ q.theme_zhLabel || q.theme_enLabel }}</span>
          </div>
          <div class="question-text">{{ q.question_text }}</div>
          <div class="choice-list">
            <button
              v-for="(c, idx) in q.choices"
              :key="`${q.id}-${idx}`"
              type="button"
              class="choice-btn"
              :class="{ selected: isChoiceSelected(q.id, c) }"
              @click="selectChoice(q, c)"
            >
              {{ c }}
            </button>
          </div>
        </div>
      </div>

      <div class="question-actions">
        <div class="question-hint">
          每題挑一個最貼近你的描述，稍後會用於後續推演。
        </div>
        <button class="confirm" :disabled="!canSubmitQuestions" @click="submitQuestionMode">
          確認並進入推演
        </button>
        <button class="confirm ghost" v-if="questionModeEnabled && !questionModeActive" @click="resetAll">
          使用舊流程
        </button>
      </div>
    </div>

    <!-- Universe -->
    <div v-else class="star-universe" :style="universeStyle" :key="layoutKey">
      <div class="star-fade">
        <button
          v-for="(t, idx) in currentOptions"
          :key="`${layoutKey}-${t.id}-${idx}`"
          class="star-node"
          type="button"
          :class="{
            picked: isPicked(t),
            disabled: isDisabled(t),
            anchor: isAnchorPhase
          }"
          :style="getStarStyle(t)"
          @click="selectToken(t)"
          v-show="!isThinking"
        >
          <div class="star-core"></div>
          <div class="star-content">
            <div class="star-label ink-font">{{ isRound1 ? displayDomainLabel(t.domain) : t.label }}</div>
            <div class="star-desc">{{ t.desc }}</div>
          </div>

          <div v-if="isPicked(t)" class="mark ink-font">已定</div>
        </button>
      </div>
    </div>

    <!-- Round2 four-symbol panel (UI only) -->
    <div v-if="isRound2" class="round2-panel-wrapper">
      <Round2FourSymbolPanelV1
        :domain-id="round2ViewModel?.domainId || ''"
        :domain-title="round2ViewModel?.domainTitle || ''"
        :options="round2ViewModel?.options || []"
        v-model="round2Answers"
      />
    </div>

    <!-- Round4 intensity panel -->
    <div v-if="isAnchorPhase" class="round4-panel">
      <div v-if="round4HasOptions" class="round4-options">
        <button
          v-for="opt in round4Options"
          :key="opt.id"
          type="button"
          class="round4-btn"
          :class="{ selected: isRound4Selected(opt) }"
          @click="selectRound4Option(opt)"
        >
          <span class="label">{{ opt.label || opt.intensity }}</span>
          <span class="desc">{{ opt.desc || opt.intensity }}</span>
        </button>
      </div>
      <div v-else-if="IS_DEV" class="round4-dev-note">
        {{ round4ControlMissing ? 'Round4 missing r3_q1_control' : 'Round4 datasource missing options' }}
      </div>
      <div v-if="selectedIntensity" class="round4-selected">
        已選擇：{{ selectedIntensity }}
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="cauldron-area" v-if="!questionModeActive">
      <div class="energy-container">
        <div class="energy-bar-bg">
          <div class="energy-bar-fill" :style="{ width: resonanceProgress + '%' }"></div>
        </div>
        <div class="energy-status">{{ resonanceStatus }}</div>
      </div>

      <div class="info-panel" v-if="!isThinking">
        <span class="ink-font info-text">
          {{ instructionText }}
          <span v-if="isRound3" class="highlight">（{{ round3ProgressText }}）</span>
        </span>

        <button
          v-if="showRound3Confirm"
          class="confirm"
          :disabled="true"
          @click.prevent
        >
          定象
        </button>

        <button
          v-if="isAnchorPhase"
          class="confirm"
          :disabled="selectedAnchors.length < 1"
          @click="finalize"
        >
          合參
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div class="computation-overlay" v-if="isThinking">
      <div class="loading-text ink-font">星移斗轉 · 天機推演中</div>
    </div>

    <!-- Reset -->
    <button class="reset-ritual" @click="resetAll" type="button">
      <div class="reset-title ink-font">另起一局</div>
      <div class="reset-sub">重開命盤（當下心境不同，結果亦異）</div>
    </button>

    <div class="dissolve" :class="{ on: isDissolving }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import { scoreDomains } from '../core/domainScoring.js'
import { getDomainAnchors, getRound2Options, getRound3Questions } from '../core/choiceEngine.js'
import { getAllThemes, getRandomQuestions, getFacetForChoice } from '../core/ontology/ontologyLoader.js'
import {
  initChoiceMetrics,
  beginQuestionSession,
  markQuestionSeen,
  recordChoice,
  finalizeQuestionSession
} from '../core/telemetry/choiceMetrics.js'
import Round2FourSymbolPanelV1 from './components/Round2FourSymbolPanel.v1.vue'
import round2FourSymbol from '../core/ontology/round2FourSymbol.v1.json' with { type: 'json' }
import round3Ipsative from '../core/ontology/round3Ipsative.v2.json' with { type: 'json' }
import round4IntensityTrigger from '../core/ontology/round4IntensityTrigger.v1.json' with { type: 'json' }
import { canonicalizeDomainId, DOMAIN_LABEL_ZH, isCanonicalDomainId } from '../core/ontology/domainCanonicalMap.js'
import { resolveDomainDisplay } from '../core/ui/domainDisplayMap.ts'
import { ensureGovDebug, updateGovDebug } from '../core/governanceDebugExpose.js'

function getRound2DomainEntry(domainId) {
  const domains = Array.isArray(round2FourSymbol?.domains) ? round2FourSymbol.domains : []
  return domains.find(d => d.domain_id === canonicalizeDomainId(domainId)) || null
}

function buildRound2VM(domainId) {
  let canonical = ''
  try {
    canonical = canonicalizeDomainId(domainId)
  } catch {
    return null
  }
  const entry = getRound2DomainEntry(domainId)
  if (!entry) return null
  const options = Array.isArray(entry.options)
    ? entry.options.map((opt, idx) => {
        const symbol = opt?.symbol || `sym_${idx}`
        const optionId = `${canonical}_${symbol}`
        return {
          id: optionId,
          option_id: optionId,
          domain_id: canonical,
          symbol,
          text: typeof opt?.text === 'string' ? opt.text : '',
          decoder: opt?.decoder || null,
          signal_map: opt?.decoder?.signal_map || {}
        }
      })
    : []
  return {
    domainId: canonical,
    domainTitle: typeof entry.title === 'string' ? entry.title : '',
    options
  }
}

const emit = defineEmits(['next'])

const USE_QUESTION_BANK = (import.meta.env.VITE_USE_QUESTION_BANK || '').toLowerCase() === 'true'
const TELEMETRY_QB =
  (import.meta.env.VITE_TELEMETRY_QB_METRICS || '').toLowerCase() === 'true'
const IS_DEV = import.meta.env.DEV
const questionModeEnabled = USE_QUESTION_BANK
const questionCards = ref([])
const questionSelections = ref({})
const questionModeFallback = ref(false)
const questionFallbackMessage = ref('')
const governanceDataError = ref('')

const questionModeActive = computed(
  () => questionModeEnabled && !questionModeFallback.value && questionCards.value.length > 0
)
const canSubmitQuestions = computed(
  () => questionCards.value.length > 0 && questionCards.value.every(q => questionSelections.value[q.id])
)

async function initQuestionMode() {
  questionModeFallback.value = false
  questionFallbackMessage.value = ''
  questionSelections.value = {}

  const themes = getAllThemes()
  const pickedThemes = themes.length ? themes.slice(0, 3) : []
  const themeIds = pickedThemes.map(t => t.id).filter(Boolean)
  const questions = await getRandomQuestions({ themeIds, limit: 6 })

  if (!questions.length) {
    questionModeFallback.value = true
    questionFallbackMessage.value = '題庫暫不可用，已切回舊流程。'
    questionCards.value = []
    return
  }

  questionCards.value = questions
  if (TELEMETRY_QB) {
    beginQuestionSession({ stage: '03', mode: 'governance' })
    questions.forEach(q => markQuestionSeen({ questionId: q.id, themeId: q.theme_id }))
  }
}

function isChoiceSelected(qId, choice) {
  return questionSelections.value[qId] === choice
}

function selectChoice(q, choice) {
  if (!q?.id) return
  questionSelections.value = {
    ...questionSelections.value,
    [q.id]: choice
  }

  if (TELEMETRY_QB) {
    const behaviorFacet = getFacetForChoice(q, choice) || ''
    recordChoice({
      questionId: q.id,
      themeId: q.theme_id,
      choiceText: choice,
      behaviorFacet
    })
  }
}

function buildQuestionUserChoices() {
  return questionCards.value
    .map(q => {
      const choiceText = questionSelections.value[q.id]
      if (!choiceText) return null
      const behaviorFacet = getFacetForChoice(q, choiceText) || ''
      return {
        type: 'question',
        themeId: q.theme_id,
        themeLabel: q.theme_enLabel || '',
        themeLabelZh: q.theme_zhLabel || '',
        questionText: q.question_text,
        choiceText,
        pattern_tags: Array.isArray(q.pattern_tags) ? q.pattern_tags : [],
        confidence_weight: typeof q.confidence_weight === 'number' ? q.confidence_weight : 1,
        behavior_facet: behaviorFacet,
        label: choiceText
      }
    })
    .filter(Boolean)
}

function submitQuestionMode() {
  if (!canSubmitQuestions.value) return
  try {
    const userChoices = buildQuestionUserChoices()
    if (TELEMETRY_QB) {
      finalizeQuestionSession()
    }
    hasFinalized.value = true
    clearDraft()
    emit('next', {
      resonance: {
        domain: '',
        domainLabel: '',
        elements: elementVector.value,
        axes: axisVector.value,
        anchors: [],
        userChoices,
        domainResult: null
      }
    })
  } catch (error) {
    console.error('[question-mode] submit failed:', error)
  }
}

/* =========================
   基本流程
========================= */
const round = ref(1)
const lastLoggedRound = ref(null)
const isThinking = ref(false)
const isDissolving = ref(false)
const hasFinalized = ref(false)
const layoutKey = ref(1)

const selectedDomain = ref(null)
const selectedR2 = ref(null)
const selectedR3 = ref([])
const selectedAnchors = ref([])
const round2Answers = ref({})
const round2Selection = ref(null)
const round2Locked = ref(false)
const round3Answers = ref([])
const round3Index = ref(0)
const round4Options = ref([])
const round4ControlMissing = ref(false)
const round4HasOptions = computed(
  () => Array.isArray(round4Options.value) && round4Options.value.length >= 2
)
const selectedIntensity = computed(
  () => selectedAnchors.value?.[0]?.intensity || selectedAnchors.value?.[0]?.label || ''
)
const loggedGovErrors = new Set()

const currentOptions = ref([])

/* 保存最近一次的資料，給 resize 重新分佈 */
const lastDataList = ref([])

/* =========================
   向量累積
========================= */
const elementVector = ref({ wood: 0, fire: 0, earth: 0, metal: 0, water: 0 })
const axisVector = ref({ move: 0, inward: 0, heat: 0, damp: 0, boundary: 0 })

function applyVectorsFromToken(t) {
  if (t?.weights) {
    for (const k in elementVector.value) {
      if (t.weights[k]) elementVector.value[k] += Number(t.weights[k])
    }
  }
  if (t?.axes) {
    for (const k in axisVector.value) {
      if (t.axes[k]) axisVector.value[k] += Number(t.axes[k])
    }
  }
}

/* =========================
   Phase
========================= */
const isRound1 = computed(() => round.value === 1)
const isRound2 = computed(() => round.value === 2)
const isRound3 = computed(() => round.value === 3)
const isAnchorPhase = computed(() => round.value >= 4)

const round2ViewModel = computed(() => {
  if (!selectedDomain.value) return null
  return buildRound2VM(selectedDomain.value)
})

// --- DEV: snapshot the actual rendered Round2 strings (no console spam) ---
if (import.meta.env.DEV && typeof window !== 'undefined') {
  try {
    const snap = window.__GOV_SNAPSHOT
    if (typeof snap === 'function') {
      const r2 = {
        domainTitle: round2ViewModel?.value?.domainTitle ?? null,
        options: Array.isArray(round2ViewModel?.value?.options)
          ? round2ViewModel.value.options.map(o => ({
              symbol: o?.symbol ?? null,
              text: o?.text ?? null
            }))
          : null
      }
      const g = typeof window.__GOV === 'object' ? window.__GOV : null
      if (g && g.ui && isRound2.value && r2.domainTitle && Array.isArray(r2.options) && r2.options.length) {
        g.ui.r2Render = r2
      }
    }
  } catch (_) {}
}

const round2Questions = computed(() => {
  const vm = round2ViewModel.value
  if (!vm) return []
  const opts = Array.isArray(vm.options) ? vm.options : []
  return opts.map((opt, idx) => {
    const optionId = opt?.option_id || `${vm.domainId}_${opt?.symbol || idx}`
    const text = typeof opt?.text === 'string' ? opt.text : ''
    return {
      situation_id: optionId,
      prompt_zh: vm.domainTitle,
      options: [
        {
          ...opt,
          id: optionId,
          option_id: optionId,
          text_zh: text,
          text,
          choice_meta: { signal_key: opt?.symbol || '', signal_map: opt?.signal_map || opt?.decoder?.signal_map || {} },
          domain_id: vm.domainId
        }
      ],
      symbol: opt?.symbol || '',
      order: idx,
      domain_id: vm.domainId
    }
  })
})

function isValidRound2VM(vm) {
  if (!vm) return false
  if (typeof vm.domainTitle !== 'string' || !vm.domainTitle.trim()) return false
  const opts = Array.isArray(vm.options) ? vm.options : []
  if (opts.length !== 4) return false
  return opts.every(o => typeof o?.text === 'string' && o.text.trim().length >= 4)
}

function validateRound3Ontology() {
  const qs = round3QuestionList.value
  const requiredIds = ['r3_q1_control', 'r3_q2_risk', 'r3_q3_boundary']
  const ids = qs.map(q => q.id)
  const hasAll = requiredIds.every(id => ids.includes(id))
  const hasThree = qs.length === requiredIds.length
  const optionsValid = qs.every(q => Array.isArray(q?.options) && q.options.length === 2)
  if (!hasAll || !hasThree || !optionsValid) {
    flagGovDataIssue('[GOV][R3] invalid ontology', { ids })
    return false
  }
  return true
}

function validateRound4Ontology() {
  const controlAns = round3Answers.value.find(r => r.question_id === 'r3_q1_control')
  const triggers = Array.isArray(round4IntensityTrigger?.triggers) ? round4IntensityTrigger.triggers : []
  const matched = triggers.filter(
    t => t?.condition?.source_question === 'r3_q1_control' && t?.condition?.selected_option === controlAns?.selected_option
  )
  const options = matched.flatMap(t => (Array.isArray(t.options) ? t.options : []))
  if (!controlAns || options.length < 2) {
    flagGovDataIssue('[GOV][R4] invalid triggers', { control: controlAns?.selected_option || null, options: options.length })
    return false
  }
  return true
}

const round3QuestionList = computed(() => getRound3Questions())
const round3ProgressText = computed(() => {
  const total = round3QuestionList.value.length || 3
  const current = Math.min(round3Index.value + 1, total)
  return `${current}/${total}`
})

function displayDomainLabel(domain) {
  const disp = resolveDomainDisplay(domain)
  if (disp.char && disp.char !== domain) return disp.char
  const canonical = canonicalizeDomainId(domain)
  return DOMAIN_LABEL_ZH[canonical] || domain
}

function safeCanonicalDomain(input) {
  try {
    const raw = String(input || '')
    if (/^domain_/.test(raw)) return raw
    if (isCanonicalDomainId(raw)) return raw
    return canonicalizeDomainId(raw)
  } catch (err) {
    console.warn('[R1] domain canonicalize failed', input, err)
    return null
  }
}

function withTimeout(promise, ms = 8000, label = 'task') {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`[withTimeout] ${label} timed out after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

function clearGovDataIssue() {
  governanceDataError.value = ''
}

function flagGovDataIssue(key, payload = {}) {
  governanceDataError.value = 'Governance 資料缺失'
  if (!IS_DEV) return
  if (loggedGovErrors.has(key)) return
  loggedGovErrors.add(key)
  console.error(key, payload)
}

function buildGovStateSnapshot() {
  return {
    round: round.value,
    selectedDomain: selectedDomain.value,
    r2Answer: round2Selection.value ? { ...round2Selection.value } : null,
    r3Answers: Array.isArray(round3Answers.value) ? round3Answers.value.slice() : [],
    intensity: selectedIntensity.value || ''
  }
}

function buildGovUiSnapshot() {
  return {
    r2Options: round2Questions.value,
    r3Questions: round3QuestionList.value,
    r4Options: round4Options.value
  }
}

function pushGovDebug() {
  if (!IS_DEV) return
  updateGovDebug({
    state: buildGovStateSnapshot(),
    ui: buildGovUiSnapshot()
  })
}

initChoiceMetrics({ enabled: TELEMETRY_QB })
if (IS_DEV) {
  ensureGovDebug()
  if (typeof window !== 'undefined') {
    window.__GOV_SNAPSHOT = () => JSON.parse(JSON.stringify(window.__GOV || {}))
  }
  updateGovDebug({
    ontologies: { r2: round2FourSymbol, r3: round3Ipsative, r4: round4IntensityTrigger },
    state: buildGovStateSnapshot(),
    ui: buildGovUiSnapshot()
  })
}

watch(
  selectedDomain,
  (val) => {
    if (!IS_DEV) return
    updateGovDebug({
      ontologies: { r2: round2FourSymbol, r3: round3Ipsative, r4: round4IntensityTrigger },
      state: buildGovStateSnapshot(),
      ui: buildGovUiSnapshot()
    })
  }
)

watch(
  round,
  (r) => {
    if (!IS_DEV) return
    if (lastLoggedRound.value === r) return
    if (r !== 2 && r !== 3 && r !== 4) {
      pushGovDebug()
      return
    }
    lastLoggedRound.value = r
    if (r === 2) {
      console.groupCollapsed('[GOV][R2] entered', {
        domain: selectedDomain.value,
        options: round2Questions.value?.length ?? 0
      })
      console.groupEnd()
    } else if (r === 3) {
      console.groupCollapsed('[GOV][R3] entered', {
        questions: round3QuestionList.value?.length ?? 0,
        answers: round3Answers.value?.length ?? 0
      })
      console.groupEnd()
    } else if (r === 4) {
      console.groupCollapsed('[GOV][R4] entered', {
        anchors: round4Options.value?.length ?? 0,
        intensity: selectedIntensity.value || null
      })
      console.groupEnd()
    }
    pushGovDebug()
  },
  { immediate: true }
)

watch(
  [
    () => round2Questions.value,
    () => round3QuestionList.value,
    round4Options,
    selectedDomain,
    round2Answers,
    round3Answers,
    selectedAnchors,
    round2Selection
  ],
  () => {
    pushGovDebug()
  },
  { deep: true }
)

/* =========================
   Round3 rules
========================= */
const showRound3Confirm = computed(() => {
  if (!isRound3.value) return false
  const total = round3QuestionList.value.length
  const answered = round3Answers.value.length
  return total > 0 && answered >= total
})

const canConfirmRound3 = computed(() => {
  const total = round3QuestionList.value.length
  const answered = round3Answers.value.length
  if (answered < total) return false
  return round3Answers.value.every(r => r?.selected_option && r?.rejected_option)
})

/* =========================
   初始化：Round1
========================= */
onMounted(() => {
  if (questionModeEnabled) {
    initQuestionMode()
  }

  if (!questionModeActive.value) {
    distributeStars(getDomainAnchors())
  }

  rafId = requestAnimationFrame(tick)
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  // 重新分佈（避免 resize 後跑出安全區）
  if (lastDataList.value?.length) {
    distributeStars(lastDataList.value)
    layoutKey.value += 1
  }
}

/* =========================
   點選狀態
========================= */
function isPicked(t) {
  if (isRound1.value) return selectedDomain.value === t.domain
  if (isRound2.value) return selectedR2.value?.id === t.id
  if (isRound3.value) return !!selectedR3.value.find(x => x.option_id === (t?.option_id || t?.id))
  if (isAnchorPhase.value) return !!selectedAnchors.value.find(x => x.id === t.id)
  return false
}

function isDisabled(t) {
  if (!isRound3.value) return false
  return false
}

/* =========================
   點選流程
========================= */
async function selectToken(t) {
  if (isThinking.value) return
  if (isDisabled(t)) return

  if (isRound1.value) {
    try {
      const canonical = safeCanonicalDomain(t.domain)
      if (!canonical) {
        console.warn('[R1] skip due to invalid domain', t?.domain)
        return
      }
      selectedDomain.value = canonical
      round2Locked.value = false
      round2Selection.value = null
      round2Answers.value = {}
      await withTimeout(transitionToRound(2), 8000, 'transitionToRound')
      return
    } catch (err) {
      console.error('[R1] click failed', err)
      if (err?.stack) console.error(err.stack)
      isThinking.value = false
      return
    }
  }

  if (isRound2.value) {
    if (round2Locked.value) return
    const domainId = canonicalizeDomainId(selectedDomain.value)
    const signal_map = t?.signal_map || t?.decoder?.signal_map || {}
    round2Selection.value = {
      question_id: t?.id || t?.option_id || `${domainId}_${t?.symbol || 'opt'}`,
      option_id: t?.option_id || t?.id,
      domain_id: domainId,
      signal_map,
      symbol: t?.symbol || '',
      label: t?.label || t?.desc || ''
    }
    selectedR2.value = {
      id: round2Selection.value.option_id,
      label: round2Selection.value.label || t?.symbol || 'round2',
      question_id: round2Selection.value.question_id,
      domain: domainId,
      signal_map
    }
    round2Locked.value = true
    applyVectorsFromToken(t)
    await transitionToRound(3)
    return
  }

  if (isRound3.value) {
    handleRound3Pick(t)
    return
  }

  if (isAnchorPhase.value) {
    const exists = selectedAnchors.value.find(x => x.id === t.id)
    if (exists) {
      selectedAnchors.value = []
    } else {
      selectedAnchors.value = [t]
    }
    pushGovDebug()
  }
}

function isRound4Selected(opt) {
  if (!opt || !isAnchorPhase.value) return false
  return !!selectedAnchors.value.find(a => a.id === opt.id)
}

function selectRound4Option(opt) {
  if (!opt) return
  selectToken(opt)
}

async function confirmRound3() {
  const ready =
    round3Answers.value.length >= round3QuestionList.value.length &&
    round3Answers.value.every(r => r?.selected_option && r?.rejected_option)
  if (!ready) return
  try {
    await transitionToRound(4)
  } catch (err) {
    console.error('[R3] confirmRound3 failed', err)
    isThinking.value = false
  }
}

/* =========================
   Transition（維持你 Round2 修復）
========================= */
async function transitionToRound(next) {
  clearGovDataIssue()
  if (next === 2) {
    const vm = buildRound2VM(selectedDomain.value)
    if (!isValidRound2VM(vm)) {
      flagGovDataIssue('[GOV][R2] invalid ontology', { domain: selectedDomain.value })
      isThinking.value = false
      return
    }
  }
  if (next === 3 && !validateRound3Ontology()) {
    isThinking.value = false
    return
  }
  if (next === 4 && !validateRound4Ontology()) {
    isThinking.value = false
    return
  }
  isThinking.value = true
  try {
    await sleep(180)
    let preparedRound4 = null

    if (next === 4) {
      const opts = buildRound4Options()
      if (!Array.isArray(opts) || !opts.length) {
        flagGovDataIssue('[GOV][R4] Critical: no anchors resolved', {
          selected_domain: selectedDomain.value,
          r3_answers: round3Answers.value
        })
        isThinking.value = false
        return
      }
      preparedRound4 = opts
    }

    await nextTick()
    await new Promise(resolve => {
      requestAnimationFrame(async () => {
        round.value = next

        if (round.value === 2) {
          round2Locked.value = false
          try {
            const opts = getRound2Options(selectedDomain.value)
            distributeStars(opts)
          } catch (err) {
            flagGovDataIssue('[GOV][R2] distribute failed', { domain: selectedDomain.value, error: err?.message })
            isThinking.value = false
            return
          }
        }

        if (round.value === 3) {
          startRound3()
        }

        if (round.value >= 4) {
          selectedAnchors.value = []
          if (preparedRound4) round4Options.value = preparedRound4
          distributeStars(round4Options.value || [])
        }

        await nextTick()
        layoutKey.value += 1
        await nextTick()

        let cleared = false
        const clearThinking = () => {
          if (cleared) return
          cleared = true
          isThinking.value = false
        }

        requestAnimationFrame(() => {
          layoutKey.value += 1
          clearThinking()
        })
        setTimeout(clearThinking, 100)
        resolve()
      })
    })
  } catch (err) {
    console.error('[R1] transitionToRound failed', err)
    if (err?.stack) console.error(err.stack)
    isThinking.value = false
    return
  } finally {
    // Safety: if requestAnimationFrame path didn't run, ensure flag clears
    setTimeout(() => {
      if (isThinking.value) {
        console.warn('[R1] safety net: forcing isThinking to false')
        isThinking.value = false
      }
    }, 500)
  }
}

function startRound3() {
  round3Answers.value = []
  round3Index.value = 0
  const qs = round3QuestionList.value
  if (!qs.length) {
    flagGovDataIssue('[GOV][R3] questions missing', { ids: [] })
    isThinking.value = false
    return
  }
  showRound3Question(round3Index.value)
}

function showRound3Question(idx = 0) {
  const qs = round3QuestionList.value
  const q = qs[idx]
  if (!q) {
    flagGovDataIssue('[GOV][R3] question not found', { idx })
    isThinking.value = false
    return
  }
  const opts = Array.isArray(q.options) ? q.options : []
  if (opts.length !== 2) {
    flagGovDataIssue('[GOV][R3] expected 2 options', { id: q.id, count: opts.length })
    isThinking.value = false
    return
  }
  const domainId = canonicalizeDomainId(selectedDomain.value || 'domain_xin')
  const tokens = opts.map((opt, optIdx) => ({
    id: `${q.id}_${opt.id || optIdx}`,
    question_id: q.id,
    option_id: opt.id || String(optIdx),
    label: opt.text || opt.label || `選項${optIdx + 1}`,
    desc: q.prompt || '',
    domain: domainId
  }))
  distributeStars(tokens)
  layoutKey.value += 1
}

function handleRound3Pick(option) {
  const qs = round3QuestionList.value
  const q = qs[round3Index.value]
  if (!q) return
  const opts = Array.isArray(q.options) ? q.options : []
  const chosenId = option?.option_id || option?.id
  const chosenOpt = opts.find(o => o?.id === chosenId) || opts.find(o => `${q.id}_${o?.id}` === option?.id) || opts[0]
  const rejectedOpt = opts.find(o => o?.id !== chosenOpt?.id)
  const record = {
    question_id: q.id,
    selected_option: chosenOpt?.id || chosenId || '',
    rejected_option: rejectedOpt?.id || '',
    domain_id: canonicalizeDomainId(selectedDomain.value || 'domain_xin')
  }
  const existingIdx = round3Answers.value.findIndex(r => r.question_id === q.id)
  if (existingIdx >= 0) round3Answers.value.splice(existingIdx, 1, record)
  else round3Answers.value.push(record)

  selectedR3.value = round3Answers.value.map(r => {
    const qObj = qs.find(x => x.id === r.question_id)
    const optObj = Array.isArray(qObj?.options) ? qObj.options.find(o => o.id === r.selected_option) : null
    return {
      id: r.question_id,
      option_id: r.selected_option,
      label: optObj?.text || optObj?.label || r.selected_option
    }
  })

  applyVectorsFromToken(option)

  if (round3Index.value < qs.length - 1) {
    round3Index.value += 1
    showRound3Question(round3Index.value)
  } else {
    const total = qs.length
    if (!total) {
      console.error('[R3] auto-advance aborted: no questions')
      isThinking.value = false
      return
    }
    const ready =
      round3Answers.value.length >= total &&
      round3Answers.value.every(r => r?.selected_option && r?.rejected_option)
    if (!ready) {
      isThinking.value = false
      return
    }
    setTimeout(async () => {
      try {
        await transitionToRound(4)
      } catch (e) {
        console.error('[R3] auto-advance failed', e)
        isThinking.value = false
      }
    }, 350)
  }
}

function buildRound4Options() {
  round4ControlMissing.value = false
  const controlAns = round3Answers.value.find(r => r.question_id === 'r3_q1_control')
  if (!controlAns) {
    round4ControlMissing.value = true
    return []
  }
  const selectedOption = controlAns?.selected_option || ''
  const triggers = Array.isArray(round4IntensityTrigger?.triggers) ? round4IntensityTrigger.triggers : []
  const domainId = selectedDomain.value ? canonicalizeDomainId(selectedDomain.value) : null
  const matched = triggers.filter(
    t => t?.condition?.source_question === 'r3_q1_control' && t?.condition?.selected_option === selectedOption
  )
  const resolved = matched.flatMap(t =>
    Array.isArray(t.options)
      ? t.options.map(opt => ({
          id: opt.id,
          question_id: t.anchor_id,
          intensity: opt.intensity,
          label: opt.label || opt.intensity || opt.id,
          desc: opt.intensity || '',
          domain: domainId
        }))
      : []
  )
  if (!resolved.length) round4ControlMissing.value = true
  return resolved
}

function showRound4Options() {
  const opts = buildRound4Options()
  if (!Array.isArray(opts) || !opts.length) {
    flagGovDataIssue('[GOV][R4] missing options on restore')
    return
  }
  round4Options.value = opts
  distributeStars(opts)
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

/* =========================
   Finalize
========================= */
const selectedDomainLabel = computed(() => {
  const anchors = getDomainAnchors()
  const found = anchors.find(a => a.domain === selectedDomain.value)
  return found?.label || '命途所問'
})

function finalize() {
  if (hasFinalized.value) return
  if (!selectedAnchors.value.length) return

  try {
    // scoreDomains 可能因資料/格式/缺欄位丟錯
    // 但「不能讓它擋住 emit」——不然就會卡在 03
    let domainResult = null
    try {
      domainResult = scoreDomains({
        elements: elementVector.value,
        axes: axisVector.value,
        anchors: selectedAnchors.value.map(a => a.label),
        confidence: 0.82,
        path: [
          { round: 1, label: selectedDomainLabel.value },
          { round: 2, label: selectedR2.value?.label || '' },
          ...selectedR3.value.map(x => ({ round: 3, label: x.label }))
        ]
      })
    } catch (e) {
      console.warn('[finalize] scoreDomains failed, continue emit anyway:', e)
      domainResult = null
    }

      hasFinalized.value = true
    clearDraft()

    const round4Payload = {
      anchor_answers: selectedAnchors.value.map(a => ({
        question_id: a?.question_id || a?.id || 'round4',
        choice: a?.id || '',
        intensity: a?.intensity || ''
      }))
    }

    emit('next', {
      resonance: {
        domain: selectedDomain.value,
        domainLabel: selectedDomainLabel.value,
        elements: elementVector.value,
        axes: axisVector.value,
        anchors: selectedAnchors.value,
        userChoices: [
          { id: 'r1', label: selectedDomainLabel.value },
          ...(selectedR2.value ? [selectedR2.value] : []),
          ...selectedR3.value,
          ...selectedAnchors.value
        ],
        round2: round2Selection.value
          ? [{ ...round2Selection.value, question_id: round2Selection.value.question_id }]
          : [],
        round3: { answers: round3Answers.value.slice() },
        round4: round4Payload,
        domainResult
      }
    })
  } catch (err) {
    // 如果這裡還爆，至少把鎖打開，避免你永遠卡死
    console.error('[finalize] fatal:', err)
    hasFinalized.value = false
  }
}

/* =========================
   Reset
========================= */
async function resetAll() {
  hasFinalized.value = false
  isDissolving.value = true
  governanceDataError.value = ''
  loggedGovErrors.clear()
  clearDraft()
  questionSelections.value = {}
  if (questionModeEnabled) {
    await initQuestionMode()
  }
  await sleep(520)

  round.value = 1
  selectedDomain.value = null
  selectedR2.value = null
  selectedR3.value = []
  selectedAnchors.value = []
  round2Selection.value = null
  round2Locked.value = false
  round3Answers.value = []
  round3Index.value = 0
  round4Options.value = []

  elementVector.value = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  axisVector.value = { move: 0, inward: 0, heat: 0, damp: 0, boundary: 0 }

  if (!questionModeActive.value) {
    distributeStars(getDomainAnchors())
    layoutKey.value += 1
  }

  await sleep(380)
  isDissolving.value = false
}

// ====== R3 草稿保存（避免 dev 時 HMR / 連線抖動重置）======
const DRAFT_KEY = 'soul_r3_draft_v1'

function saveDraft() {
  try {
    const payload = {
      t: Date.now(),
      round: round.value,
      selectedDomain: selectedDomain.value,
      selectedR2: selectedR2.value,
      selectedR3: selectedR3.value,
      selectedAnchors: selectedAnchors.value,
      round2Selection: round2Selection.value,
      round3Answers: round3Answers.value,
      round3Index: round3Index.value,
      elementVector: elementVector.value,
      axisVector: axisVector.value
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
  } catch {}
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return false
    const d = JSON.parse(raw)

    // 可選：超過 24 小時就不載入
    if (d?.t && Date.now() - d.t > 24 * 60 * 60 * 1000) return false

    round.value = Number(d.round) || 1
    selectedDomain.value = d.selectedDomain ? canonicalizeDomainId(d.selectedDomain) : null
    if (!selectedDomain.value) {
      round.value = 1
      distributeStars(getDomainAnchors())
      layoutKey.value += 1
      return true
    }
    selectedR2.value = d.selectedR2 ?? null
    round2Selection.value = d.round2Selection ?? null
    selectedR3.value = Array.isArray(d.selectedR3) ? d.selectedR3 : []
    round3Answers.value = Array.isArray(d.round3Answers) ? d.round3Answers : []
    round3Index.value = Number.isFinite(d.round3Index) ? Number(d.round3Index) : 0
    selectedAnchors.value = Array.isArray(d.selectedAnchors) ? d.selectedAnchors : []

    elementVector.value = d.elementVector || elementVector.value
    axisVector.value = d.axisVector || axisVector.value

    // 依照 round 重建題面
    if (round.value === 1) {
      distributeStars(getDomainAnchors())
    } else if (round.value === 2) {
      distributeStars(getRound2Options(selectedDomain.value))
    } else if (round.value === 3) {
      round.value = 3
      startRound3()
    } else {
      round.value = 4
      showRound4Options()
    }

    layoutKey.value += 1
    return true
  } catch {
    return false
  }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY) } catch {}
}

// 進場先載入草稿（載不到就照你原本的 round1）
onMounted(() => {
  if (questionModeActive.value) return
  const ok = loadDraft()
  if (!ok) {
    const anchors = getDomainAnchors()
    distributeStars(anchors)
  }
})

watch(
  round2Answers,
  async (val) => {
    if (!isRound2.value || round2Locked.value) return
    const entries = Object.entries(val || {}).filter(([, opt]) => !!opt)
    if (!entries.length) return
    const [questionId, opt] = entries[entries.length - 1]
    try {
      const domainId = canonicalizeDomainId(selectedDomain.value || 'domain_xin')
      const signal_map = opt?.signal_map || opt?.choice_meta?.signal_map || opt?.decoder?.signal_map || {}
      round2Selection.value = {
        question_id: questionId,
        option_id: opt?.option_id || opt?.id || questionId,
        domain_id: domainId,
        signal_map,
        symbol: opt?.symbol || '',
        label: opt?.text_zh || opt?.text || opt?.label || ''
      }
      selectedR2.value = {
        id: round2Selection.value.option_id,
        label: round2Selection.value.label || opt?.symbol || 'round2',
        question_id: round2Selection.value.question_id,
        domain: domainId,
        signal_map
      }
      round2Locked.value = true
      await transitionToRound(3)
    } catch (err) {
      console.error('[round2 answers] failed to advance', err)
    }
  },
  { deep: true }
)

// 任何狀態變動就保存（很便宜、很穩）
watch(
  [
    round,
    selectedDomain,
    selectedR2,
    selectedR3,
    selectedAnchors,
    elementVector,
    axisVector,
    round2Selection,
    round3Answers,
    round3Index
  ],
  saveDraft,
  { deep: true }
)

// 在 finalize / resetAll 時清掉草稿
// - 你把 clearDraft() 加到 finalize() 成功 emit 之前
// - 你把 clearDraft() 加到 resetAll() 一開始也行


/* =========================
   文案
========================= */
const resonanceStatus = computed(() => {
  if (questionModeActive.value) return '題庫模式'
  if (isRound1.value) return '定方向'
  if (isRound2.value) return '定矛盾'
  if (isRound3.value) return '定細節'
  return '定錨'
})

const currentTitle = computed(() => {
  if (questionModeActive.value) return '內在狀態 · 問題挑選'
  if (isRound1.value) return '觀星定向'
  if (isRound2.value) return round2ViewModel.value?.domainTitle || governanceDataError.value || ''
  if (isRound3.value) return '細象入微'
  return '命途定局'
})

const currentSubtitle = computed(() => {
  if (questionModeActive.value) return '每題選一項最像你的描述'
  if (isRound1.value) return '先定所問之局，再論吉凶'
  if (isRound2.value) return round2ViewModel.value?.domainTitle || governanceDataError.value || ''
  if (isRound3.value) return '再取細節，兩選一'
  return '請選出最牽動你的強度定錨'
})

const phaseHint = computed(() => {
  if (questionModeActive.value) return '題庫模式 · 單選'
  if (isRound1.value) return '第一回合 · 定方向'
  if (isRound2.value) return '第二回合 · 定矛盾核心'
  if (isRound3.value) return '第三回合 · 單選'
  if (isAnchorPhase.value) return '最後 · 強度定錨'
  return ''
})

const instructionText = computed(() => {
  if (questionModeActive.value) return '請為每一題挑選最貼近的選項'
  if (isRound1.value) return '請先點選：你此刻所問之局'
  if (isRound2.value) return '請點選：最像你的矛盾之象'
  if (isRound3.value) return '請選：每題挑一個最貼近的選項'
  return '請選：定錨強度'
})

const resonanceProgress = computed(() => {
  const p = (Math.min(round.value, 4) - 1) / 3
  return Math.round(p * 100)
})

/* =========================
   星體分佈（費式 + 兩翼 + 安全區 clamp）
========================= */
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

function getSafeBox() {
  // star-node 固定尺寸：240x118，且以中心定位（left:-120, top:-59）
  const nodeHalfW = 120
  const nodeHalfH = 59

  const W = window.innerWidth || 1200
  const H = window.innerHeight || 800

  // 左右留白（避免貼邊/出界）
  const padX = 26
  // 上方避開 header（標題區域大約 9% + 文案高度），下方避開底部操作區
  const topSafe = Math.round(H * 0.22)
  const bottomSafe = Math.round(H * 0.18)

  const minX = -W / 2 + nodeHalfW + padX
  const maxX =  W / 2 - nodeHalfW - padX

  const minY = -H / 2 + nodeHalfH + topSafe
  const maxY =  H / 2 - nodeHalfH - bottomSafe

  return { minX, maxX, minY, maxY }
}

const distributeStars = (dataList) => {
  lastDataList.value = Array.isArray(dataList) ? dataList : []
  const list = lastDataList.value
  const count = list.length

  const phi = Math.PI * (3 - Math.sqrt(5))
  const W = window.innerWidth || 1200
  const H = window.innerHeight || 800

  // 左右更寬、上下更收（保留星際感但可讀）
  const spreadX = Math.min(W, 1400) * 0.50
  const spreadY = Math.min(H, 900)  * 0.28
  const spreadZ = Math.min(W, 1400) * 0.30

  // 兩翼偏壓：保留費式均勻，又讓左右更「開」
  const wing = 0.46

  const { minX, maxX, minY, maxY } = getSafeBox()

  currentOptions.value = list.map((item, i) => {
    const yN = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - yN * yN))
    const theta = phi * i

    let xN = Math.cos(theta) * radius
    let zN = Math.sin(theta) * radius

    xN = xN * (1 + wing) + Math.sign(xN || 1) * wing * 0.18

    // 輕微抖動避免文字剛好重疊
    const jitterX = (Math.random() - 0.5) * 14
    const jitterY = (Math.random() - 0.5) * 12
    const jitterZ = (Math.random() - 0.5) * 22

    let baseX = xN * spreadX + jitterX
    let baseY = yN * spreadY + jitterY
    let baseZ = zN * spreadZ + jitterZ

    // 安全區 clamp（關鍵：永不出界）
    baseX = clamp(baseX, minX, maxX)
    baseY = clamp(baseY, minY, maxY)

    return { ...item, baseX, baseY, baseZ }
  })
}

/* =========================
   全體一致微漂移（深度越後、漂移越小）
========================= */
const tNow = ref(0)
let rafId = 0
function tick() {
  tNow.value = performance.now()
  rafId = requestAnimationFrame(tick)
}

/* =========================
   Mouse parallax
========================= */
const mouseX = ref(0)
const mouseY = ref(0)

function handleMouseMove(e) {
  const cx = (window.innerWidth || 1200) / 2
  const cy = (window.innerHeight || 800) / 2
  mouseX.value = (e.clientX - cx) / cx
  mouseY.value = (e.clientY - cy) / cy
}

const universeStyle = computed(() => {
  if (isThinking.value) {
    return {
      transform: `translateZ(-1000px) rotateY(720deg) scale(0.12)`,
      transition: 'transform 1.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      filter: 'blur(5px)',
      opacity: 0.55
    }
  }
  const rotateY = mouseX.value * -8
  const rotateX = mouseY.value * 5
  return {
    transform: `translateZ(-520px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }
})

const nebulaStyle = computed(() => ({
  transform: `translate(${mouseX.value * -20}px, ${mouseY.value * -15}px) scale(1.1)`
}))

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}

const getStarStyle = (t) => {
  if (isThinking.value) return { opacity: 0 }

  const W = window.innerWidth || 1200
  const ZC = Math.min(W, 1400) * 0.30

  const scale = mapRange(t.baseZ, -ZC, ZC, 0.72, 1.18)
  const opacity = mapRange(t.baseZ, -ZC, ZC, 0.66, 1.0)
  const textOpacity = mapRange(t.baseZ, -ZC, ZC, 0.62, 1.0)

  // 深度因子：後景漂移小，前景漂移稍大（自然）
  const depth01 = clamp((t.baseZ + ZC) / (2 * ZC), 0, 1) // 0..1
  const amp = 0.55 + depth01 * 0.75 // 0.55..1.30

  const tt = tNow.value * 0.001
  const seed =
    (t.id?.length || 7) * 0.37 +
    (t.baseX * 0.0007) +
    (t.baseZ * 0.0009)

  const driftX = Math.sin(tt * 0.55 + seed) * (9 * amp)
  const driftY = Math.cos(tt * 0.62 + seed * 1.3) * (6 * amp)
  const driftZ = Math.sin(tt * 0.48 + seed * 0.9) * (10 * amp)

  // hover 解耦：用 CSS 變數組 transform，避免 inline transform 跟 hover transform 打架
  return {
    '--tx': `${t.baseX + driftX}px`,
    '--ty': `${t.baseY + driftY}px`,
    '--tz': `${t.baseZ + driftZ}px`,
    '--s': scale,
    '--text-opacity': textOpacity,
    opacity,
    zIndex: Math.floor(t.baseZ)
  }
}
</script>

<style scoped>
.resonance-stage{
  width:100%;
  min-height:100vh;
  position:relative;
  overflow:hidden;
  perspective:1000px;
  background:#000;
}

.void-bg{
  position:absolute; inset:0;
  background: radial-gradient(circle at 50% 50%, #1a1f25 0%, #000 100%);
}

.nebula-layer{
  position:absolute; width:120%; height:120%;
  top:-10%; left:-10%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  opacity:0.22;
}

.header-area{
  position:absolute; top:9%;
  width:100%; text-align:center;
  z-index:20;
  pointer-events:none;
  transition: opacity 0.5s;
}
.header-area.fade-out{ opacity:0; }

.title{
  font-size: 2.6rem;
  color: rgba(255,235,205,0.92);
  margin:0;
  letter-spacing: 6px;
  text-shadow: 0 2px 0 rgba(0,0,0,0.65);
}
.subtitle{
  color: rgba(210,200,180,0.72);
  margin-top: 10px;
  font-size: 1rem;
  letter-spacing: 3px;
}

.phase-hint{
  margin-top: 14px;
  display:flex;
  justify-content:center;
}
.phase-hint .pill{
  display:inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,220,170,0.16);
  background: rgba(0,0,0,0.22);
  color: rgba(255,235,205,0.82);
  letter-spacing: 4px;
  font-size: 0.92rem;
  text-shadow: 0 1px 0 rgba(0,0,0,0.65);
}

.star-universe{
  position:absolute; top:50%; left:50%;
  width:0; height:0;
  transform-style: preserve-3d;
}

/* 用 button 讓 focus-visible 生效，維持原視覺 */
.star-node{
  position:absolute;
  width: 240px;
  height: 118px;
  left:-120px; top:-59px;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  border: none;
  background: transparent;
  padding: 0;

  cursor:pointer;
  user-select: none;
  transform-style: preserve-3d;

  /* 核心：用 CSS 變數組 transform，hover 才能乾淨放大 */
  transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(var(--s));
  transition: opacity 0.24s ease, transform 0.18s ease;

  will-change: transform, opacity;
}

.star-core{
  width: 8px; height: 8px;
  border-radius:50%;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 0 16px rgba(255,255,255,0.32);
  margin-bottom: 10px;
  transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.star-content{
  text-align:center;
  opacity: var(--text-opacity);
  transition: opacity 0.18s ease;
}

.star-label{
  font-size: 1.9rem;
  color: rgba(255,235,205,0.92);
  letter-spacing: 6px;
  margin-bottom: 6px;
  font-weight: 520;

  text-shadow:
    0 2px 0 rgba(0,0,0,0.78),
    0 0 22px rgba(0,0,0,0.45);
}

.star-desc{
  font-size: 1.02rem;
  color: rgba(210,200,180,0.76);
  font-family: 'Noto Serif TC', serif;
  white-space: nowrap;
  letter-spacing: 1px;

  text-shadow:
    0 1px 0 rgba(0,0,0,0.78),
    0 0 18px rgba(0,0,0,0.35);
}

/* states */
.star-node.picked .star-core{
  background: rgba(212,175,55,0.92);
  box-shadow: 0 0 18px rgba(212,175,55,0.22);
  transform: scale(1.35);
}
.star-node.picked .star-label{
  color: rgba(212,175,55,0.92);
}

.star-node.disabled{
  pointer-events:none;
  opacity: 0.35 !important;
  filter: grayscale(0.2);
}
.star-node.anchor .star-label{
  letter-spacing: 5px;
}

.mark{
  position:absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,220,170,0.14);
  background: rgba(0,0,0,0.22);
  color: rgba(255,235,205,0.78);
  letter-spacing: 4px;
  font-size: 0.82rem;
}

/* hover：適度放大 + 更清楚（老人也能讀） */
.star-node:hover{
  opacity: 1 !important;
  transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(calc(var(--s) * 1.10));
}
.star-node:hover .star-core{
  transform: scale(1.55);
  background: rgba(212,175,55,0.72);
  box-shadow: 0 0 20px rgba(212,175,55,0.18);
}
.star-node:hover .star-content{
  opacity: 1 !important;
}
.star-node:hover .star-label{
  color: rgba(255,235,205,0.98);
  text-shadow:
    0 2px 0 rgba(0,0,0,0.82),
    0 0 28px rgba(212,175,55,0.12);
}
.star-node:hover .star-desc{
  color: rgba(225,215,195,0.92);
}

.round4-panel{
  position:absolute;
  bottom:18%;
  left:50%;
  transform: translateX(-50%);
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
  z-index:60;
}
.round4-options{
  display:flex;
  gap:10px;
}
.round4-btn{
  padding:10px 16px;
  border-radius:12px;
  border:1px solid rgba(255,220,170,0.16);
  background: rgba(0,0,0,0.35);
  color: rgba(255,235,205,0.9);
  letter-spacing:2px;
  cursor:pointer;
  min-width:140px;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.round4-btn .label{ display:block; font-weight:600; }
.round4-btn .desc{ display:block; font-size:0.9rem; color: rgba(210,200,180,0.76); }
.round4-btn.selected{
  border-color: rgba(212,175,55,0.55);
  background: rgba(212,175,55,0.12);
  transform: translateY(-2px);
}
.round4-dev-note{
  color: #f2c97d;
  font-size: 0.9rem;
  opacity:0.8;
}
.round4-selected{
  color: rgba(212,175,55,0.9);
  letter-spacing:2px;
}

/* focus：鍵盤操作也有質感 */
.star-node:focus-visible{
  outline: none;
  transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(calc(var(--s) * 1.10));
}
.star-node:focus-visible .star-core{
  transform: scale(1.55);
  background: rgba(212,175,55,0.72);
  box-shadow: 0 0 26px rgba(212,175,55,0.22);
}
.star-node:focus-visible .star-label{
  color: rgba(255,235,205,0.98);
}

/* bottom */
.cauldron-area{
  position:absolute;
  bottom: 7%;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  z-index: 50;
  pointer-events: none;
}

.energy-container{
  width: 320px;
  text-align:center;
}
.energy-bar-bg{
  width:100%;
  height: 2px;
  background: rgba(255,255,255,0.10);
}
.energy-bar-fill{
  height:100%;
  background: rgba(212,175,55,0.72);
  transition: width 0.45s ease;
  box-shadow: 0 0 12px rgba(212,175,55,0.14);
}
.energy-status{
  margin-top: 8px;
  color: rgba(210,200,180,0.68);
  font-size: 0.9rem;
  letter-spacing: 4px;
}

.info-panel{
  margin-top: 14px;
  display:flex;
  align-items:center;
  gap: 10px;
  pointer-events: auto;
}

.info-text{
  color: rgba(210,200,180,0.70);
  font-size: 1rem;
  letter-spacing: 2px;
}
.highlight{
  color: rgba(212,175,55,0.90);
  font-weight: 700;
  margin-left: 6px;
}

.confirm{
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,220,170,0.16);
  background: rgba(0,0,0,0.22);
  color: rgba(255,235,205,0.86);
  letter-spacing: 4px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}
.confirm:hover{ transform: translateY(-1px); }
.confirm:disabled{
  opacity: 0.35;
  cursor:not-allowed;
}

/* overlay */
.computation-overlay{
  position:absolute; inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:100;
  pointer-events:none;
}
.loading-text{
  font-size: 1.7rem;
  color: rgba(255,235,205,0.92);
  letter-spacing: 8px;
  animation: pulse 1.6s infinite;
  text-shadow: 0 2px 0 rgba(0,0,0,0.65);
}
@keyframes pulse{
  0%{ opacity: 0.25; }
  50%{ opacity: 1; }
  100%{ opacity: 0.25; }
}

.star-fade-enter-active,
.star-fade-leave-active{
  transition: all 0.5s ease;
}
.star-fade-enter-from,
.star-fade-leave-to{
  opacity:0;
  transform: scale(0.05);
}

/* reset button */
.reset-ritual{
  position: fixed;
  right: 18px;
  bottom: 16px;
  z-index: 120;
  border-radius: 16px;
  border: 1px solid rgba(255,220,170,0.14);
  background: rgba(0,0,0,0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px 12px;
  width: 190px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 14px 40px rgba(0,0,0,0.45);
  transition: transform 0.2s, opacity 0.2s;
}
.reset-ritual:hover{ transform: translateY(-1px); }
.reset-title{
  color: rgba(255,235,205,0.86);
  letter-spacing: 4px;
  font-size: 0.98rem;
}
.reset-sub{
  margin-top: 4px;
  color: rgba(210,200,180,0.60);
  font-size: 0.82rem;
  letter-spacing: 0.6px;
  line-height: 1.35;
}

/* dissolve */
.dissolve{
  position:absolute; inset:0;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,235,205,0.12), transparent 58%),
    radial-gradient(circle at 30% 80%, rgba(212,175,55,0.10), transparent 55%);
  opacity:0;
  pointer-events:none;
  transition: opacity 0.45s ease;
  z-index: 110;
}
.dissolve.on{ opacity: 1; }

.ink-font{ font-family:'Noto Serif TC', serif; }

.question-mode{
  position:relative;
  z-index:10;
  max-width:960px;
  margin: 180px auto 120px;
  padding: 20px;
}

.question-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap:18px;
}

.question-card{
  background: rgba(0,0,0,0.35);
  border:1px solid rgba(255,220,170,0.15);
  border-radius:16px;
  padding:16px;
  box-shadow: 0 12px 38px rgba(0,0,0,0.35);
}

.question-label{
  margin-bottom:10px;
}

.theme-pill{
  display:inline-block;
  padding:6px 10px;
  border-radius:999px;
  background: rgba(255,235,205,0.08);
  border:1px solid rgba(255,235,205,0.2);
  color: rgba(255,235,205,0.9);
  font-size:0.85rem;
  letter-spacing:2px;
}

.question-text{
  font-size:1rem;
  color: rgba(245,240,230,0.88);
  line-height:1.4;
  margin-bottom:12px;
}

.choice-list{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.choice-btn{
  text-align:left;
  width:100%;
  background: rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:10px;
  color: rgba(235,230,220,0.9);
  padding:10px 12px;
  cursor:pointer;
  transition: all 0.16s ease;
}

.choice-btn:hover{
  border-color: rgba(255,235,205,0.4);
  background: rgba(255,235,205,0.08);
}

.choice-btn.selected{
  border-color: rgba(255,200,120,0.8);
  background: rgba(255,200,120,0.15);
  box-shadow: 0 0 12px rgba(255,200,120,0.25);
}

.question-actions{
  margin-top:24px;
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.question-hint{
  color: rgba(220,210,200,0.72);
  font-size:0.95rem;
}

.confirm.ghost{
  background: transparent;
  border-color: rgba(255,235,205,0.35);
  color: rgba(255,235,205,0.82);
}

.question-fallback{
  margin-top:10px;
  color: rgba(255,220,200,0.75);
  font-size:0.95rem;
}
</style>
