import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'
import 'element-plus/theme-chalk/index.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
