import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import '@arco-design/web-vue/es/message/style/index.less'
import routes from './router'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(routes)
app.mount('#app')
