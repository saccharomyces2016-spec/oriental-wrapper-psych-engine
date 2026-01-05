<template>
  <div class="magic-date-container">
    
    <div class="input-group">
      <label class="ink-label">生年 (西元)</label>
      <input 
        v-model="localY" 
        type="number" 
        class="ink-input-line" 
        placeholder="例如 1995"
        @input="emitUpdate"
      >
    </div>

    <div class="selection-group">
      <label class="ink-label">月令</label>
      <div class="grid-box months">
        <div 
          v-for="m in 12" 
          :key="m" 
          class="grid-item"
          :class="{ active: localM == m }"
          @click="selectMonth(m)"
        >
          <span class="num">{{ m }}</span>
          <svg v-if="localM == m" class="circle-svg" viewBox="0 0 100 100">
            <path d="M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0" class="circle-path"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="selection-group">
      <label class="ink-label">日柱</label>
      <div class="grid-box days">
        <div 
          v-for="d in 31" 
          :key="d" 
          class="grid-item small"
          :class="{ active: localD == d }"
          @click="selectDay(d)"
        >
          <span class="num">{{ d }}</span>
          <svg v-if="localD == d" class="circle-svg" viewBox="0 0 100 100">
            <path d="M 50, 50 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0" class="circle-path"></path>
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['year', 'month', 'day']);
const emit = defineEmits(['update:year', 'update:month', 'update:day']);

const localY = ref(props.year);
const localM = ref(props.month);
const localD = ref(props.day);

const emitUpdate = () => { emit('update:year', localY.value); };

const selectMonth = (m) => {
  localM.value = m;
  emit('update:month', m);
};

const selectDay = (d) => {
  localD.value = d;
  emit('update:day', d);
};
</script>

<style scoped>
.magic-date-container { width: 100%; display: flex; flex-direction: column; gap: 25px; }

.ink-label {
  display: block; font-family: 'Ma Shan Zheng', cursive;
  color: #d4af37; font-size: 1.2rem; margin-bottom: 10px; text-align: left;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.ink-input-line {
  width: 100%; background: transparent; border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff; font-size: 1.5rem; text-align: center; padding: 5px;
  font-family: 'Noto Serif TC', serif; transition: 0.3s;
}
.ink-input-line:focus { border-bottom-color: #a83232; outline: none; }

.grid-box { display: grid; gap: 8px; }
.grid-box.months { grid-template-columns: repeat(6, 1fr); }
.grid-box.days { grid-template-columns: repeat(7, 1fr); }

.grid-item {
  position: relative; height: 40px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px; transition: 0.2s;
}
.grid-item:hover { background: rgba(255, 255, 255, 0.05); }
.grid-item.active { border-color: transparent; }

.num { position: relative; z-index: 2; font-size: 0.9rem; }

.circle-svg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1; pointer-events: none;
}
.circle-path {
  fill: none;
  stroke: #a83232; stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 300; stroke-dashoffset: 300;
  animation: draw-circle 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes draw-circle { to { stroke-dashoffset: 0; } }
</style>