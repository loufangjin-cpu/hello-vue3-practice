const utils = require('./utils');

function getApi(path) {
    return async (req) => {
        const data = await utils.requireUncached(path)(req);
        return data;
    };
}

const mockConfig = {
    enable: false, // 是否启用mock
    api: {
        '/klian/test/test': true, // 可以单独关闭 也可以直接设置
    },
};

Object.keys(mockConfig.api).forEach((key) => {
    if (mockConfig.api[key] === true) {
        mockConfig.api[key] = getApi(`.${key}`);
    }
});

module.exports = mockConfig;
