<script setup>
import { ref } from 'vue'
import MagicDateInput from '../components/ui/MagicDateInput.vue'
import { calculateInnate } from '../core/SoulArchitect.js'

const emit = defineEmits(['next'])
const isLocking = ref(false)
const form = ref({ name: '', year: '', month: '', day: '', hour: '' })

function handleLock() {
  if (isLocking.value) return

  // 1. 驗證輸入
  if (!form.value.name || !form.value.year || !form.value.month || !form.value.day) {
    alert('請賜下名諱與完整生辰，方可推演...')
    return
  }

  // 2. 鎖定畫面，播放儀式動畫
  isLocking.value = true

  // 3. 模擬推演延遲 (2秒)
  setTimeout(() => {
    try {
      const birthResult = calculateInnate(form.value)
      emit('next', birthResult)
    } catch (error) {
      console.error('推演失敗:', error)
      isLocking.value = false
      alert('天機混沌，請稍後再試。')
    }
  }, 2000)
}
</script>

<template>
  <div class="ink-stage">
    <!-- 背景：霧化墨暈 + 暗金星塵 -->
    <div class="bg-veil" aria-hidden="true"></div>
    <div class="bg-stars" aria-hidden="true"></div>

    <div class="content">
      <div class="title-area" :class="{ 'fade-out': isLocking }">
        <div class="seal-topline ink-font">生辰校準</div>
        <h1 class="ink-title brush-font">八字銘刻</h1>
        <p class="ink-subtitle ink-font">推演天地 · 探尋本源</p>
      </div>

      <div class="card" :class="{ 'stamp-active': isLocking }">
        <!-- 名諱 -->
        <div class="field">
          <label class="label brush-font">緣主尊姓</label>
          <div class="input-shell">
            <input
              v-model="form.name"
              type="text"
              class="ink-input"
              placeholder="請輸入名諱"
              autocomplete="name"
            />
            <span class="input-underline" aria-hidden="true"></span>
          </div>
        </div>

        <!-- 生辰 -->
        <div class="field">
          <label class="label brush-font">生辰</label>
          <div class="date-shell">
            <MagicDateInput
              v-model:year="form.year"
              v-model:month="form.month"
              v-model:day="form.day"
            />
          </div>
        </div>

        <!-- 啟動 -->
        <div class="action">
          <button class="stamp-btn" type="button" @click="handleLock">
            <span class="stamp-face">
              <span class="stamp-text brush-font" v-if="!isLocking">結印</span>
              <span class="stamp-text brush-font processing" v-else>推演</span>
            </span>
            <span class="stamp-ring" aria-hidden="true"></span>
          </button>

          <p class="hint ink-font">點擊鈐印 · 啟動法陣</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 字體 */
.ink-font{ font-family: 'Noto Serif TC', serif; letter-spacing: 2px; }
.brush-font{ font-family: 'Ma Shan Zheng', cursive; letter-spacing: 2px; }

/* 版面容器 */
.ink-stage{
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 42px 16px 64px;
  background: #05060a;
  display: flex;
  justify-content: center;
}

/* 背景層：霧與星塵 */
.bg-veil{
  position:absolute; inset:-25%;
  background:
    radial-gradient(circle at 25% 20%, rgba(255,220,170,0.08), transparent 55%),
    radial-gradient(circle at 75% 80%, rgba(170,160,255,0.08), transparent 55%),
    radial-gradient(circle at 55% 35%, rgba(255,255,255,0.05), transparent 55%);
  filter: blur(18px);
  transform: scale(1.05);
  opacity: 0.9;
}
.bg-stars{
  position:absolute; inset:0;
  background-image:
    radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
    radial-gradient(rgba(255,220,170,0.08) 1px, transparent 1px);
  background-size: 120px 120px, 180px 180px;
  background-position: 10px 20px, 80px 130px;
  opacity: 0.18;
}

/* 主內容 */
.content{
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  text-align: center;
}

/* 標題 */
.title-area{ transition: opacity 0.9s ease, filter 0.9s ease; }
.fade-out{ opacity: 0; filter: blur(8px); }

.seal-topline{
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid rgba(255,220,170,0.22);
  border-radius: 999px;
  background: rgba(0,0,0,0.25);
  color: rgba(255,235,205,0.88);
  font-size: 0.88rem;
  margin-bottom: 14px;
  backdrop-filter: blur(10px);
}

.ink-title{
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 3.4rem);
  color: rgba(255,255,255,0.94);
  text-shadow: 0 0 22px rgba(255,255,255,0.10);
}
.ink-subtitle{
  margin: 10px 0 26px;
  color: rgba(255,255,255,0.62);
  font-size: 0.98rem;
}

/* 卡片（黑玉感） */
.card{
  border: 1px solid rgba(255,220,170,0.14);
  background: rgba(0,0,0,0.30);
  border-radius: 18px;
  padding: 18px 16px 20px;
  backdrop-filter: blur(12px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 18px 40px rgba(0,0,0,0.50);
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s ease, filter 1.2s ease;
}

/* 欄位 */
.field{ text-align: left; margin-bottom: 18px; }
.label{
  display:block;
  color: rgba(255,220,170,0.85);
  font-size: 1.05rem;
  margin-bottom: 10px;
}

/* 名諱輸入 */
.input-shell{ position: relative; }
.ink-input{
  width: 100%;
  background: rgba(0,0,0,0.18);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 12px 14px;
  color: rgba(255,255,255,0.92);
  font-size: 1.1rem;
  font-family: 'Noto Serif TC', serif;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.ink-input::placeholder{ color: rgba(255,255,255,0.28); }
.ink-input:focus{
  border-color: rgba(255,220,170,0.35);
  box-shadow: 0 0 0 3px rgba(255,220,170,0.08);
}
.input-underline{
  position:absolute;
  left: 14px;
  right: 14px;
  bottom: 10px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,220,170,0.35), transparent);
  opacity: 0.65;
  pointer-events:none;
}

/* 生辰區 */
.date-shell{
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 12px 12px 10px;
  background: rgba(0,0,0,0.18);
}

/* 動作區 */
.action{
  margin-top: 14px;
  text-align: center;
}

/* 鈐印按鈕（呼應儀式感） */
.stamp-btn{
  position: relative;
  width: 92px;
  height: 92px;
  border-radius: 16px;
  border: 1px solid rgba(255,220,170,0.26);
  background: rgba(0,0,0,0.22);
  cursor: pointer;
  display: grid;
  place-items: center;
  margin: 0 auto;
  box-shadow:
    0 0 0 1px rgba(255,220,170,0.08) inset,
    0 0 22px rgba(255,200,140,0.10);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.stamp-btn:hover{
  transform: translateY(-1px);
  border-color: rgba(255,235,190,0.48);
  box-shadow:
    0 0 0 1px rgba(255,235,190,0.12) inset,
    0 0 28px rgba(255,210,160,0.16);
  background: rgba(0,0,0,0.32);
}
.stamp-btn:active{ transform: translateY(0) scale(0.98); }

.stamp-face{
  width: 78px;
  height: 78px;
  border-radius: 14px;
  border: 1px dashed rgba(255,220,170,0.30);
  display:grid;
  place-items:center;
}
.stamp-text{
  writing-mode: vertical-rl;
  font-size: 1.9rem;
  color: rgba(255,220,170,0.92);
  text-shadow: 0 0 16px rgba(255,220,170,0.12);
}
.processing{ letter-spacing: 4px; }

.stamp-ring{
  position:absolute;
  inset: 10px;
  border-radius: 14px;
  pointer-events:none;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.35) inset;
}

/* 提示 */
.hint{
  margin-top: 14px;
  color: rgba(255,255,255,0.55);
  font-size: 0.9rem;
}

/* 鎖定動畫：像鈐印落下 */
.stamp-active{
  animation: stamp-press 1.5s forwards;
}
@keyframes stamp-press {
  0% { transform: scale(1); opacity: 1; filter: blur(0); }
  20% { transform: scale(0.98); opacity: 0.92; }
  100% { transform: scale(1.06); opacity: 0; filter: blur(18px); }
}
</style>
