import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'
import '../node_modules/maplibre-gl/dist/maplibre-gl.css'

import routes from './router/index.js'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.mount('#app')

