import { createApp } from 'vue'
import App from './day.vue'
import {i18n} from '@/plugin/vi18n'
import messages from './lang/messages'
// 初始化

const app = createApp(App)
app.use(i18n(
  messages
)).mount('#container')
