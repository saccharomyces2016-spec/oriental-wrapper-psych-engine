<script setup>
import { ref, computed } from 'vue'
import { captureEvent, getLastErrorMessage } from '../core/telemetry/telemetryClient.js'

const props = defineProps({
  stage: { type: String, default: '' },
  enabled: { type: Boolean, default: false }
})

const open = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

const form = ref({
  category: '畫面顯示異常',
  message: '',
  includeConsoleHint: false
})

const categories = [
  '畫面顯示異常',
  '結果看不懂',
  '題目不清楚',
  '卡住',
  '其他'
]

const canSubmit = computed(() => !!props.enabled && !submitting.value)

function truncate(text = '', limit = 200) {
  return String(text || '').slice(0, limit)
}

function resetForm() {
  form.value = {
    category: '畫面顯示異常',
    message: '',
    includeConsoleHint: false
  }
}

function toggle() {
  if (!props.enabled) return
  open.value = !open.value
  if (!open.value) {
    submitted.value = false
    errorMsg.value = ''
    resetForm()
  }
}

function submit() {
  if (!canSubmit.value) return
  submitting.value = true
  errorMsg.value = ''
  submitted.value = false

  const payload = {
    category: form.value.category || '其他',
    stage: props.stage || 'unknown',
    message: truncate(form.value.message, 200)
  }

  if (form.value.includeConsoleHint) {
    const hint = getLastErrorMessage()
    if (hint) payload.consoleHint = truncate(hint, 200)
  }

  try {
    captureEvent('user_report', payload)
    submitted.value = true
    resetForm()
    setTimeout(() => {
      open.value = false
      submitted.value = false
    }, 1200)
  } catch (err) {
    errorMsg.value = '送出失敗（不影響使用）'
    if (import.meta.env.DEV) console.warn('[report] submit failed', err)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div v-if="enabled" class="report-entry">
    <button class="report-btn" type="button" @click="toggle">
      意見回報
    </button>

    <div v-if="open" class="modal-overlay" @click.self="toggle">
      <div class="modal">
        <header>
          <div class="title">意見回報</div>
          <button class="close" type="button" @click="toggle">×</button>
        </header>

        <div class="body">
          <label class="field">
            <div class="label">類型</div>
            <select v-model="form.category">
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </label>

          <label class="field">
            <div class="label">所在階段</div>
            <input type="text" :value="stage || '未知'" disabled>
          </label>

          <label class="field">
            <div class="label">描述（選填，200 字內）</div>
            <textarea v-model="form.message" maxlength="200" rows="3" placeholder="簡述發生了什麼事"></textarea>
          </label>

          <label class="checkbox">
            <input v-model="form.includeConsoleHint" type="checkbox">
            <span>附上最近一次錯誤訊息摘要（不含 stack）</span>
          </label>

          <div class="status">
            <span v-if="submitted" class="ok">已送出</span>
            <span v-else-if="errorMsg" class="err">{{ errorMsg }}</span>
          </div>
        </div>

        <footer>
          <button class="ghost" type="button" @click="toggle">取消</button>
          <button class="primary" type="button" :disabled="!canSubmit" @click="submit">
            送出
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-entry {
  position: fixed;
  right: 18px;
  bottom: 72px;
  z-index: 99990;
}

.report-btn {
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 220, 170, 0.25);
  background: rgba(0, 0, 0, 0.38);
  color: rgba(255, 235, 205, 0.92);
  cursor: pointer;
  letter-spacing: 2px;
}

.report-btn:hover {
  background: rgba(212, 175, 55, 0.16);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  width: 360px;
  background: rgba(15, 15, 18, 0.95);
  border: 1px solid rgba(255, 220, 170, 0.22);
  border-radius: 14px;
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.45);
  color: #f7f0e6;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 1.05rem;
  letter-spacing: 2px;
}

.close {
  background: none;
  border: none;
  color: #f7f0e6;
  font-size: 1.2rem;
  cursor: pointer;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 0.92rem;
  color: rgba(255, 235, 205, 0.88);
}

select,
input,
textarea {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 220, 170, 0.18);
  border-radius: 10px;
  color: #f7f0e6;
  padding: 8px 10px;
}

textarea {
  resize: vertical;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 235, 205, 0.88);
  font-size: 0.9rem;
}

.status {
  min-height: 20px;
  font-size: 0.9rem;
}

.ok {
  color: #9cd67b;
}

.err {
  color: #e88c8c;
}

footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.ghost,
.primary {
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.ghost {
  background: transparent;
  border: 1px solid rgba(255, 220, 170, 0.25);
  color: rgba(255, 235, 205, 0.92);
}

.primary {
  background: rgba(212, 175, 55, 0.18);
  border: 1px solid rgba(255, 220, 170, 0.35);
  color: rgba(255, 235, 205, 0.95);
}

.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
