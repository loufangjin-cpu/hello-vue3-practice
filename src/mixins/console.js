import Vue from 'vue';
import queryString from 'query-string';
let status = 0;
Vue.mixin({
    created() {
        const parsed = queryString.parse(window.location.search);
        const { ByDebug = false } = parsed;
        if ((ByDebug && status === 0) || process.env.NODE_ENV_test === 'test') {
            status = 1;
            // 手机端调试面板
            import('eruda')
                .then((module) => {
                    const eruda = module.default;
                    eruda.init();
                })
                .catch(() => {
                    status = 0;
                });
        }
    },
});
