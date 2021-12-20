// language文件夹下的index.js 
// zh, en, id 分别为三种语言文件
import { createI18n } from 'vue-i18n';
import {locales} from '@/plugin/vant-local'
function toLowerCaseKey(obj) {
  // iOS safari 10.2之前 语言代码为小写
  Object.keys(obj).forEach((key) => {
      obj[key.toLowerCase()] = obj[key];
  });
  return obj;
}
export const i18n = function(msgs) {
  let messages = { ...msgs };
  let locale = localStorage.getItem('language') || 'zhCN' // 设置地区
  locales(locale)
    // iOS safari 10.2之前 语言代码为小写
    messages = toLowerCaseKey({ ...msgs });
    return createI18n({
      locale,
      messages, // 语言包
    });
}
