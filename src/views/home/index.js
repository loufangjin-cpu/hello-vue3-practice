import { createApp } from 'vue'
import App from './day.vue'
// 初始化

const app = createApp(App)
app.use(App).mount('#container')
