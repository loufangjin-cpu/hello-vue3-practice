import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'


export const locales = function (a) {
    const localInfo = {
        'en': enUS,
        'zhCN': zhCN
    }
    Locale.use(a, localInfo[a])
}
