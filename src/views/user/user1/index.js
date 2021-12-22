import { createApp } from 'vue'
import App from './day.vue'
import {i18n} from '@/plugin/vi18n'
import messages from './lang/messages'
import { Button, DatetimePicker } from 'vant';
import 'vant/lib/index.css';
// 初始化

const app = createApp(App)
app.use(i18n(
  messages
))
.use(Button)
.use(DatetimePicker)
.mount('#container')
