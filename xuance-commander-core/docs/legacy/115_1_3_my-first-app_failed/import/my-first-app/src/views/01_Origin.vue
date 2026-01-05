<script setup>
const emit = defineEmits(['next'])

const STORAGE_PATTERNS = [/domain/i, /round/i, /question/i, /content/i, /contentdb/i, /round2situations/i, /questionbank/i]
const LEGACY_DOMAIN_REGEX = /\b(money|relationship|career|health|family|self|study|social|love|finance|work|body|home|mind|boundary|fortune|qing|cai|ye|shen|jia|jie|yun|xin)\b/i

function cleanStorage(storage) {
  if (!storage) return
  const keys = []
  try {
    for (let i = 0; i < storage.length; i++) keys.push(storage.key(i))
  } catch {}
  keys.forEach(k => {
    const key = String(k || '')
    const lower = key.toLowerCase()
    const shouldRemove = STORAGE_PATTERNS.some(rx => rx.test(lower))
    if (shouldRemove) {
      try { storage.removeItem(key) } catch {}
      return
    }
    try {
      const val = storage.getItem(key) || ''
      if (LEGACY_DOMAIN_REGEX.test(val)) storage.removeItem(key)
    } catch {}
  })
}

function startJourney() {
  try {
    cleanStorage(localStorage)
    cleanStorage(sessionStorage)

    const snapshot = JSON.stringify({
      ls: Object.keys(localStorage ?? {}),
      ss: Object.keys(sessionStorage ?? {})
    })
    if (LEGACY_DOMAIN_REGEX.test(snapshot)) {
      throw new Error('legacy domain key detected in storage after cleanup')
    }

    emit('next', {
      reset: true,
      baseline: {
        round: 1,
        selectedDomain: null,
        round2Answers: {},
        round3Answers: [],
        intensity: null
      }
    })
  } catch (err) {
    console.error('[origin] startJourney failed', err)
    alert('啟動流程時偵測到舊資料，請重新整理後再試。')
  }
}
</script>

<template>
  <div class="origin-container">
    <div class="center-content">
      <h1 class="main-title ink-font">五行解析</h1>
      <p class="subtitle">「萬物自有其時，靈魂自有其色」</p>
      <div class="divider"></div>
      <p class="intro-text">
        汝之座標正與歲月重疊。<br>
        撥開煙雲，窺見那抹被塵世遮蔽的本原。
      </p>
      
      <button class="start-btn ink-font" type="button" @click="startJourney">
        探索因緣 <span class="arrow">→</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.origin-container {
  width: 100%;
  min-height: 100vh;              /* 關鍵：用視窗高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 24px 0;                /* 小螢幕避免貼邊 */
}
.main-title {
  font-size: 5rem; margin: 0; color: #fff;
  text-shadow: 0 0 20px rgba(255,255,255,0.3);
  letter-spacing: 10px;
}
.subtitle {
  color: #888; letter-spacing: 4px; margin-top: 10px; font-size: 1.1rem;
}
.divider {
  width: 2px; height: 60px; background: linear-gradient(to bottom, transparent, #555, transparent);
  margin: 30px auto;
}
.intro-text {
  color: #aaa; line-height: 2; font-size: 1rem; letter-spacing: 2px; margin-bottom: 50px;
}
.start-btn {
  padding: 15px 40px;
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff; font-size: 1.2rem; letter-spacing: 4px;
  transition: all 0.5s ease;
  background: transparent;
}
.start-btn:hover {
  border-color: #fff; background: rgba(255,255,255,0.05);
  box-shadow: 0 0 20px rgba(255,255,255,0.2);
  letter-spacing: 8px;
}
</style>
