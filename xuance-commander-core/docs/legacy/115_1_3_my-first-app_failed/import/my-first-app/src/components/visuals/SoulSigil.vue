<template>
  <div class="soul-sigil">
    <div class="ring-outer"></div>
    <div class="ring-inner"></div>
    <div class="sigil-char ink-font">{{ char }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['element']);
const charMap = { metal:'金', wood:'木', water:'水', fire:'火', earth:'土' };
const char = computed(() => charMap[props.element] || '命');
</script>

<style scoped>
.soul-sigil {
  width: 100px; height: 100px;
  position: relative;
  display: flex; justify-content: center; align-items: center;
}
.ring-outer {
  position: absolute; width: 100%; height: 100%;
  border: 2px solid rgba(168, 50, 50, 0.5);
  border-radius: 50%;
  animation: spin 10s linear infinite;
}
.ring-inner {
  position: absolute; width: 70%; height: 70%;
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 50%;
  animation: spin 15s linear infinite reverse;
}
.sigil-char {
  font-size: 3rem; color: #a83232;
  text-shadow: 0 0 10px rgba(168, 50, 50, 0.5);
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>