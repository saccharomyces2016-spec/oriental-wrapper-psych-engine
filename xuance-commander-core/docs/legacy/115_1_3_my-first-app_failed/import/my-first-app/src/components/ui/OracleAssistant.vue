<template>
  <div class="oracle-container">
    <div class="avatar">
      <div class="eye-glow"></div>
    </div>
    <div class="dialog-box">
      <p>天機不可洩漏... 但既以此身入局，便為汝指點迷津。</p>
    </div>
  </div>
</template>

<style scoped>
.oracle-container {
  display: flex; align-items: flex-end; gap: 15px;
  padding: 20px;
}
.avatar {
  width: 50px; height: 50px; background: #222; border-radius: 50%;
  border: 2px solid #555; position: relative;
  display: flex; justify-content: center; align-items: center;
}
.eye-glow {
  width: 10px; height: 10px; background: #00ffcc;
  box-shadow: 0 0 10px #00ffcc; border-radius: 50%;
}
.dialog-box {
  background: rgba(0,0,0,0.6); padding: 15px; border-radius: 10px 10px 10px 0;
  border: 1px solid #444; color: #ccc; font-size: 0.9rem;
}
</style>