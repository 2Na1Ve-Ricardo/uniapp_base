import { createSSRApp } from 'vue'
import App from './App.vue'
import 'sard-uniapp/global.d.ts'
import '@unocss/reset/tailwind.css'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
