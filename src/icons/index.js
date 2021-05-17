// svg文件自动导入
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)
