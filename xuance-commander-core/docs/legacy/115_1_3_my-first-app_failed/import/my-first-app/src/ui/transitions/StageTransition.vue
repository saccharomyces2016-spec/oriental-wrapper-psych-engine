<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import styleGuide from '../styleGuide.v1.json'
import { resolveMotionMode } from '../motionPolicy.js'

const props = defineProps({
  name: { type: String, default: 'stage' },
  type: { type: String, default: styleGuide?.motion?.defaultTransition || 'dissolve' }
})

const motion = ref({ mode: 'full', reducedMotion: false, lowFps: false, monitor: null })

const isSafariClient = computed(() => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const hasSafari = ua.includes('Safari')
  const hasChrome = ua.includes('Chrome') || ua.includes('Chromium')
  const hasAndroid = ua.includes('Android')
  return hasSafari && !hasChrome && !hasAndroid
})

const transitionName = computed(() => {
  if (motion.value.mode !== 'full') return 'stage-fade'
  if (props.type === 'dissolve') return 'stage-dissolve'
  if (props.type === 'star-dust') return 'stage-stardust'
  if (props.type === 'ink-spread') return 'stage-ink'
  return 'stage-dissolve'
})

const wrapperStyle = computed(() => {
  const base = {
    '--sg-duration': `${styleGuide?.motion?.durationMs || 420}ms`,
    '--sg-ease': styleGuide?.motion?.easing || 'cubic-bezier(0.2,0.8,0.2,1)',
    '--sg-fade-duration': `${styleGuide?.motion?.fadeOnlyDurationMs || 220}ms`
  }
  return base
})

const motionMode = computed(() => motion.value.mode || 'full')

onMounted(() => {
  const res = resolveMotionMode()
  motion.value = res
})

onBeforeUnmount(() => {
  if (motion.value?.monitor) motion.value.monitor.stop()
})
</script>

<template>
  <div v-if="isSafariClient" class="stage-wrapper" :class="`mode-${motionMode}`" :style="wrapperStyle">
    <slot />
  </div>
  <Transition v-else :name="transitionName" appear>
    <div class="stage-wrapper" :class="`mode-${motionMode}`" :style="wrapperStyle">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.stage-wrapper {
  width: 100%;
  height: 100%;
}

.stage-dissolve-enter-active,
.stage-dissolve-leave-active {
  transition: opacity var(--sg-duration) var(--sg-ease);
}
.stage-dissolve-enter-from,
.stage-dissolve-leave-to {
  opacity: 0;
}

.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: opacity var(--sg-fade-duration) ease;
}
.stage-fade-enter-from,
.stage-fade-leave-to {
  opacity: 0;
}

/* stubs */
.stage-stardust-enter-active,
.stage-stardust-leave-active,
.stage-ink-enter-active,
.stage-ink-leave-active {
  transition: opacity var(--sg-duration) var(--sg-ease);
}
.stage-stardust-enter-from,
.stage-stardust-leave-to,
.stage-ink-enter-from,
.stage-ink-leave-to {
  opacity: 0;
}
</style>
