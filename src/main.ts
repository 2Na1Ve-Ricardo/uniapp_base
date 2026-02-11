import { createSSRApp } from 'vue'
import App from './App.vue'
import 'sard-uniapp/global.d.ts'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  return {
    app,
    pinia,
  }
}
