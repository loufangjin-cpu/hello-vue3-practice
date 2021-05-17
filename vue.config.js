const port = 7070
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
    port
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.join(__dirname, './src')
  //     }
  //   }
  // }
  configureWebpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, './src')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue项目最佳实践'
    } else {
      config.name = 'Vue Best Practice'
    }
  },
  // webpack-chain称为链式操作，可以更细粒度控制webpack内部配置。
  chainWebpack(config) {
    // icon-svg
    // 1、重点:删除默认配置中处理svg， 新增svg目录
    config.module.rule('svg').exclude.add(resolve('./src/icons'))
    // 配置svg-sprite-loader 只包含icon 目录
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons')) // 这里进入了include内部，要结束上下文
      .end() // 回退上一级
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // #icon-[name] name是文件名
  }
}
