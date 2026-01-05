<script setup>
const emit = defineEmits(['reset'])
</script>

<template>
  <button class="reset-btn ink-font" @click="emit('reset')">
    另起一局
  </button>
</template>

<style scoped>
.reset-btn{
  position:fixed;
  right:24px;
  bottom:24px;
  padding:12px 18px;
  border-radius:14px;
  background:rgba(0,0,0,0.35);
  border:1px solid rgba(255,220,170,0.18);
  color:rgba(255,235,205,0.9);
  letter-spacing:3px;
  cursor:pointer;
}
.reset-btn:hover{
  background:rgba(212,175,55,0.12);
}
.ink-font{ font-family:'Noto Serif TC', serif; }
</style>