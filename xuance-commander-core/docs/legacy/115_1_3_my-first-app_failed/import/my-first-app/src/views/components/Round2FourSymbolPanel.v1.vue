<template>
  <div class="r2-panel">
    <div class="r2-header">
      <div class="r2-title">{{ domainTitle || 'Governance 資料缺失' }}</div>
      <div class="r2-subtitle">
        <span class="mono">領域：</span><span class="domain">{{ domainId || '未知' }}</span>
        <span class="sep" v-if="domainId && domainTitle">｜</span>
        <span class="hint">以「氣・勢・界・動」四步取象（不是心理測驗問卷）</span>
      </div>
    </div>

    <div class="r2-grid" v-if="hasValidProps">
      <div
        v-for="(slot, idx) in normalizedSlots"
        :key="slot?.questionId || idx"
        class="r2-card"
      >
        <div class="r2-card-top">
          <div class="r2-symbol">{{ symbols[idx] }}</div>
          <div class="r2-card-meta">
            <div class="r2-card-name">{{ symbolNames[idx] }}</div>
            <div class="r2-card-id mono" v-if="slot?.questionId">#{{ slot.questionId }}</div>
          </div>
        </div>

        <div class="r2-card-body">
          <div class="r2-frame mono">{{ symbolFrameLineZh(symbolKeys[idx]) }}</div>
          <div class="r2-prompt" v-if="slot?.option">
            {{ toOracularPromptZh(domainTitle, symbolKeys[idx]) }}
          </div>
          <div class="r2-prompt placeholder" v-else>（此象位暫無題目，請檢查 round2 selector / mapping）</div>

          <div class="r2-options" v-if="slot?.option">
            <button
              :key="slot.option?.id || idx"
              class="r2-option"
              :class="{ active: isSelected(slot.questionId, slot.option) }"
              type="button"
              @click="select(slot.questionId, slot.option)"
            >
              <div class="r2-option-label">
                {{ slot.option?.text || `選項 ${idx + 1}` }}
              </div>
              <div class="r2-option-sub mono" v-if="slot.option?.symbol">
                symbol: {{ slot.option.symbol }}
              </div>
            </button>
          </div>

          <div class="r2-empty" v-else>
            （此題缺少 options，請確認 round2 資料來源）
          </div>
        </div>
      </div>
    </div>

    <div class="r2-empty" v-else>
      Governance 資料缺失
    </div>

    <div class="r2-footer">
      <div class="mono">提示：</div>
      <div>你是在「盤面選象」，不是在做心理學問卷。每一步只需選一個最貼近的象位。</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { symbolFrameLineZh, toOracularPromptZh } from '../../core/narrative/round2OracularText.v1.js'

const props = defineProps({
  domainId: { type: String, default: '' },
  domainTitle: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  modelValue: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

const symbolKeys = ['qi', 'shi', 'jie', 'dong']
const symbols = ['氣', '勢', '界', '動']
const symbolNames = ['氣（流）', '勢（推）', '界（形）', '動（用）']

const normalizedSlots = computed(() => {
  const opts = Array.isArray(props.options) ? props.options : []
  const bySymbol = new Map()
  opts.forEach(opt => {
    if (opt?.symbol) bySymbol.set(opt.symbol, opt)
  })
  return symbolKeys.map((symbolKey, idx) => {
    const opt = bySymbol.get(symbolKey) || opts[idx] || null
    const questionId = `${props.domainId || 'domain'}_${symbolKey || idx}`
    const normalizedOpt = opt
      ? {
          ...opt,
          id: opt.id || questionId,
          option_id: opt.option_id || questionId,
          text: typeof opt.text === 'string' ? opt.text : '',
          text_zh: typeof opt.text === 'string' ? opt.text : '',
          choice_meta: opt.choice_meta || {
            signal_key: opt.symbol || '',
            signal_map: opt.signal_map || opt?.decoder?.signal_map || {}
          }
        }
      : null
    return {
      symbolKey,
      symbol: symbols[idx],
      symbolName: symbolNames[idx],
      questionId,
      option: normalizedOpt
    }
  })
})

const hasValidProps = computed(() => {
  const opts = Array.isArray(props.options) ? props.options : []
  if (typeof props.domainTitle !== 'string' || !props.domainTitle.trim()) return false
  if (opts.length !== 4) return false
  return opts.every(opt => typeof opt?.text === 'string' && opt.text.trim().length >= 4)
})

if (import.meta.env.DEV) {
  watch(
    () => [props.domainTitle, props.options],
    () => {
      const opts = Array.isArray(props.options) ? props.options : []
      if (!hasValidProps.value) {
        if (typeof props.domainTitle !== 'string' || !props.domainTitle.trim()) {
          throw new Error('[GOV][R2] missing domainTitle')
        }
        if (opts.length !== 4) {
          throw new Error('[GOV][R2] invalid option text')
        }
        const invalid = opts.some(
          opt => typeof opt?.text !== 'string' || opt.text.trim().length < 4
        )
        if (invalid) {
          throw new Error('[GOV][R2] invalid option text')
        }
      }
    },
    { immediate: true, deep: true }
  )
}

function isSelected(questionId, opt) {
  if (!questionId || !opt) return false
  const chosen = props.modelValue?.[questionId]
  if (!chosen) return false
  return (
    chosen === opt ||
    chosen?.id === opt?.id ||
    chosen?.option_id === opt?.option_id ||
    chosen?.label === opt?.label
  )
}

function select(questionId, opt) {
  if (!questionId || !opt) return
  const next = { ...(props.modelValue || {}) }
  next[questionId] = opt
  emit('update:modelValue', next)
}
</script>

<style scoped>
.r2-panel { display: grid; gap: 12px; }
.r2-header { display: grid; gap: 4px; }
.r2-title { font-weight: 700; font-size: 16px; }
.r2-subtitle { font-size: 12px; opacity: 0.9; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.domain { font-weight: 700; }
.sep { opacity: 0.6; }
.hint { opacity: 0.9; }

.r2-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
@media (max-width: 900px) { .r2-grid { grid-template-columns: 1fr; } }

.r2-card { border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; padding: 12px; display: grid; gap: 10px; }
.r2-card-top { display: flex; gap: 10px; align-items: center; }
.r2-symbol { width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(0,0,0,0.2); display: grid; place-items: center; font-weight: 800; }
.r2-card-meta { display: grid; gap: 2px; }
.r2-card-name { font-weight: 700; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 11px; opacity: 0.85; }
.r2-card-id { opacity: 0.7; }

.r2-card-body { display: grid; gap: 10px; }
.r2-frame { font-size: 12px; opacity: 0.85; }
.r2-prompt { line-height: 1.5; }
.r2-prompt.placeholder { opacity: 0.65; font-style: italic; }
.r2-oracle-hint { padding: 6px 0; }

.r2-options { display: grid; gap: 8px; }
.r2-option { text-align: left; padding: 10px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.12); background: transparent; cursor: pointer; display: grid; gap: 4px; }
.r2-option.active { border-width: 2px; }
.r2-option-label { font-weight: 650; }
.r2-option-sub { opacity: 0.75; }

.r2-empty { opacity: 0.75; font-style: italic; }

.r2-footer { font-size: 12px; opacity: 0.9; display: grid; gap: 2px; }
</style>
