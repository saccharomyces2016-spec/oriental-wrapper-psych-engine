<template>
  <div class="interpret-stage">
    <div class="veil-bg"></div>

    <section class="panel">
      <h2 class="title ink-font">財局拆解</h2>
      <p class="subtitle">非問吉凶，乃照其勢</p>

      <!-- 一、總論 -->
      <div class="block">
        <h3 class="block-title ink-font">一、當前財之大勢</h3>
        <p class="text">
          {{ overviewText }}
        </p>
      </div>

      <!-- 二、你落在哪一種局 -->
      <div class="block">
        <h3 class="block-title ink-font">二、你正落之局</h3>
        <p class="text emphasis">
          {{ corePatternText }}
        </p>
      </div>

      <!-- 三、內在矛盾 -->
      <div class="block">
        <h3 class="block-title ink-font">三、心中相扯之處</h3>
        <ul class="list">
          <li v-for="(x,i) in conflictTexts" :key="i">{{ x }}</li>
        </ul>
      </div>

      <!-- 四、氣機結構 -->
      <div class="block">
        <h3 class="block-title ink-font">四、氣機分布</h3>
        <p class="text">
          {{ elementText }}
        </p>
      </div>

      <!-- 五、命理師直言 -->
      <div class="block final">
        <h3 class="block-title ink-font">五、直言一句</h3>
        <p class="oracle">
          {{ oracleLine }}
        </p>
      </div>

      <div class="footer-note">
        此為象法推演，用以照見與整理，非投資建議。
      </div>

      <button class="next-btn ink-font" @click="$emit('next')">
        入命後段
      </button>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  resonance: { type: Object, required: true }
})

/* =========================
   一、總論
========================= */
const overviewText = computed(() => {
  return `你此番所問為「財」，然並非單純多寡之問。
而是卡在「是否該動」與「是否能承」之間。
財氣已現，但仍未完全成局，正處於進退皆有代價之時。`
})

/* =========================
   二、核心財局（關鍵）
========================= */
const corePatternText = computed(() => {
  const axes = props.resonance.axes || {}
  if (axes.inward > axes.move) {
    return '此局為「守財未化」。你不是沒能力，而是每一步都在等一個不會出錯的時機。'
  }
  return '此局為「動財未穩」。你已在行動，但心中始終擔心一步錯、滿盤皆失。'
})

/* =========================
   三、內在矛盾（悸動來源）
========================= */
const conflictTexts = computed(() => {
  return [
    '你並非不想要更多，而是害怕一旦選錯，就再也回不到現在的位置。',
    '你看得懂風險，卻也因此遲疑太久。',
    '你真正焦慮的不是錢，而是「選擇後，是否還能承擔後果」。'
  ]
})

/* =========================
   四、五行氣機（命理化但可讀）
========================= */
const elementText = computed(() => {
  const e = props.resonance.elements || {}
  return `木氣代表起念，火氣代表行動，金氣代表控制，土氣代表承載，水氣代表不安。
你此局之中，土與金偏重，顯示你極重穩定與可控；
而木火不足，表示真正推你向前的，不是渴望，而是壓力。`
})

/* =========================
   五、命理師直言（最重要）
========================= */
const oracleLine = computed(() => {
  return '你不是缺機會，是每一次機會出現時，你都在計算失去的可能。'
})
</script>

<style scoped>
.interpret-stage{
  min-height:100vh;
  background:#000;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:flex-start;
  padding:80px 16px;
}

.veil-bg{
  position:absolute;
  inset:0;
  background: radial-gradient(circle at 50% 20%, #1c2228 0%, #000 75%);
}

.panel{
  position:relative;
  z-index:2;
  max-width:720px;
  width:100%;
  background: rgba(0,0,0,0.35);
  border:1px solid rgba(255,220,170,0.14);
  border-radius:20px;
  padding:36px 28px 42px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.55);
}

.title{
  font-size:2.2rem;
  letter-spacing:6px;
  text-align:center;
  color:rgba(255,235,205,0.92);
}

.subtitle{
  margin-top:10px;
  text-align:center;
  color:rgba(210,200,180,0.65);
  letter-spacing:2px;
}

.block{
  margin-top:32px;
}

.block-title{
  font-size:1.15rem;
  letter-spacing:4px;
  color:rgba(255,235,205,0.88);
}

.text{
  margin-top:12px;
  line-height:1.9;
  color:rgba(210,200,180,0.78);
  white-space:pre-wrap;
}

.emphasis{
  color:rgba(212,175,55,0.9);
}

.list{
  margin-top:12px;
  padding-left:18px;
  line-height:1.85;
  color:rgba(210,200,180,0.75);
}

.oracle{
  margin-top:14px;
  font-size:1.15rem;
  line-height:1.9;
  color:rgba(255,235,205,0.95);
  letter-spacing:1px;
}

.footer-note{
  margin-top:28px;
  font-size:0.85rem;
  color:rgba(210,200,180,0.5);
  text-align:center;
}

.next-btn{
  margin-top:32px;
  width:100%;
  padding:14px 0;
  border-radius:999px;
  border:1px solid rgba(255,220,170,0.18);
  background:rgba(0,0,0,0.35);
  color:rgba(255,235,205,0.9);
  letter-spacing:4px;
  cursor:pointer;
}

.next-btn:hover{
  background:rgba(212,175,55,0.12);
}

.ink-font{
  font-family:'Noto Serif TC', serif;
}
</style>