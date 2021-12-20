const utils = require('./utils');

function mocker(app) {
    app.use(async function middleware(req, res, next) {
        const mockConfig = utils.requireUncached('./mock.config');
        if (mockConfig.enable) {
            console.log('Mocker enter');
            const path = req.path.split('?')[0];
            console.log('req:', req.path);
            if (mockConfig.api[path]) {
                console.log('mock:', req.path);
                const data = await mockConfig.api[path](req);
                data._debug = {
                    msg: '这是一个mock数据',
                };
                res.json(data);
                return;
            }
        }
        next();
    });
}

module.exports = mocker;
