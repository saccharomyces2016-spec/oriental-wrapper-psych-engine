import { createRouter, createWebHistory } from 'vue-router'

// 簡單指向 Origin 即可，因為流程由 App.vue 接管
import Origin from '../views/01_Origin.vue'

const routes = [
  { path: '/', name: 'Home', component: Origin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router