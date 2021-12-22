import en from './en';
import zh from './zh';
import zhCN from './zh-CN';

const langs = {
    en,
    zh: zh,
    zhCN: zhCN,
};

const messages = {};

Object.keys(langs).forEach((lang) => {
    messages[lang] = { ...langs[lang] };
});

export default messages;