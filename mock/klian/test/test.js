module.exports = async function response(req) {
    return {
        ret: 1,
        data: {
            ent: {
                text: '返回文本',
            },
        },
        msg: '这是一个测试数据',
    };
};
