import { createApp } from 'vue'
import App from './day.vue'
import 'vant/lib/index.css';

// 初始化

const app = createApp(App)
app.use(App).mount('#container')
