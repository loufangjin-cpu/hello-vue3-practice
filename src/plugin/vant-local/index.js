import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'


export const locales = function (a) {
    if (a == 'en') {
        Locale.use('en', enUS)
    }
    if (a == 'zhCN') {
        Locale.use('cn', zhCN)
    }
}
