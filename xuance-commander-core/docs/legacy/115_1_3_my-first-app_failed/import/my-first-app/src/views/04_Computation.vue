<template>
  <div class="ritual-stage">
    <div class="veil"></div>

    <div class="core">
      <div class="sigil"></div>

      <div class="text ink-font">
        <div class="line main">命局演算中</div>
        <div class="line sub">{{ statusText }}</div>
      </div>

      <!-- 錯誤提示（不常見，但保留） -->
      <div v-if="isError" class="error">
        天機混沌，請稍候再試
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'

const props = defineProps({
  isReady: { type: Boolean, default: false },
  oracleStatus: { type: Object, default: () => ({}) },
  enteredAt: { type: Number, default: 0 },
  minMs: { type: Number, default: 0 } // 測試期可設 0
})

const emit = defineEmits(['next'])

/* ===== 顯示文字 ===== */
const statusText = computed(() => {
  if (props.oracleStatus?.state === 'error') return '推演受阻'
  if (props.oracleStatus?.state === 'ready') return '命盤已定'
  return '星移斗轉，氣機交會'
})

const isError = computed(() => props.oracleStatus?.state === 'error')

/* ===== 核心邏輯：Ready 就跳 ===== */
function tryAdvance() {
  if (!props.isReady) return

  const elapsed = Date.now() - (props.enteredAt || 0)
  const wait = Math.max(0, (props.minMs || 0) - elapsed)

  setTimeout(() => {
    emit('next')
  }, wait)
}

watch(() => props.isReady, tryAdvance)
onMounted(tryAdvance)
</script>

<style scoped>
.ritual-stage{
  position:relative;
  min-height:100vh;
  background:#05060a;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

.veil{
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 50% 40%, rgba(255,215,160,0.08), transparent 55%),
    radial-gradient(circle at 20% 80%, rgba(180,200,255,0.05), transparent 60%);
}

.core{
  position:relative;
  z-index:2;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:22px;
}

/* 中央符印（極簡） */
.sigil{
  width:92px;
  height:92px;
  border-radius:50%;
  border:1px solid rgba(255,220,170,0.45);
  box-shadow:
    0 0 0 1px rgba(255,220,170,0.18) inset,
    0 0 26px rgba(212,175,55,0.25);
  position:relative;
  animation: spin 6s linear infinite;
}

.sigil::after{
  content:'';
  position:absolute;
  inset:14px;
  border-radius:50%;
  border:1px dashed rgba(255,220,170,0.35);
  opacity:0.7;
}

@keyframes spin{
  from{ transform:rotate(0deg); }
  to{ transform:rotate(360deg); }
}

/* 文字 */
.text{
  text-align:center;
}

.line.main{
  font-size:1.25rem;
  letter-spacing:6px;
  color:rgba(255,235,205,0.95);
}

.line.sub{
  margin-top:10px;
  font-size:0.9rem;
  letter-spacing:3px;
  color:rgba(210,200,180,0.65);
}

.error{
  margin-top:16px;
  color:#d87a7a;
  font-size:0.9rem;
  letter-spacing:2px;
}

.ink-font{
  font-family:'Noto Serif TC', serif;
}
</style>