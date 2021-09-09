const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const chalk = require('chalk')
const log = console.log
const qs = require('query-string')

const isDev = process.env.NODE_ENV === 'development'
const argv = require('yargs').alias('p', 'page').argv
const config = require('./config')
let pageFilter = argv.page
if (typeof pageFilter === 'boolean') {
  pageFilter = '.*'
}
const entries = config.getEntries({
  pageFilter
})
const pages = entries.entries
console.log('pages', pages)

console.time('build spend')
if (!Object.keys(pages).length) {
  throw new Error('无可构建内容')
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
const chainWebpack = (config) => {
  Object.keys(pages).forEach((page) => {
    // 去掉prefetch 业务自己决定 https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
    config.plugins.delete(`prefetch-${pages[page].path}`)
    config.plugins.delete(`preload-${pages[page].path}`)
  })
  // webpack-chain称为链式操作，可以更细粒度控制webpack内部配置。
  if (isDev) {
    // 为开发环境修改配置...
    config.devServer
      // .stats('errors-only')
      .proxy({})
      .port(8082)
      .host('0.0.0.0')
      .contentBase(path.join(__dirname, 'src'))
      .hotOnly(true)
      .set('onListening', (server) => {
        const port = server.listeningApp.address().port
        log('see:')
        for (const n in pages) {
          let params = ''
          if (pages[n].getTestQueryParams) {
            params = '?' + qs.stringify(pages[n].getTestQueryParams())
          }
          log(
            chalk.underline.blue(
              `${`http://localhost:${port}`}/${pages[n].path}${params}`
            ) + `  --- ${pages[n].desc || pages[n].title}`
          )
        }
        log('\n')
      })
      .end()
  } else {
    // 为生产环境修改配置...
    config
      .plugin('hashedIdPlugin')
      .use(
        new webpack.HashedModuleIdsPlugin({
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 20
        })
      )
      .end()
  }
  //
  config.module
    .rule('url')
    .test(/\.(atlas|jsonp)$/)
    .use('url')
    .loader('url-loader')
    .tap((options) => {
      options = {
        limit: 1024 * 3,
        ...options
      }
      console.log(options)
      return options
    })
    .end()
  // icon-svg
  // 默认svg, url-load对图片进行处理base64格式
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
module.exports = {
  publicPath: '/',
  pages,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.join(__dirname, './src')
  //     }
  //   }
  // }
  configureWebpack: (config) => {
    config.devtool = isDev
      ? 'cheap-module-eval-source-map'
      : 'hidden-source-map'
    Object.keys(pages).forEach((page) => {
      // config.entry[page].unshift(path.resolve(__dirname, 'src/main.ts'))
      config.entry[page]
      return page
    })
    // if (useMock) {
    //   config.entry['mock'] = '@/mock'
    // }
    config.resolve.alias['@'] = path.join(__dirname, './src')
    config.optimization = {
      concatenateModules: !isDev,
      runtimeChunk: false,
      minimizer: [
        // new TerserPlugin({
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true,
        //   terserOptions: {
        //     mangle: {
        //       ie8: false,
        //       // fixed https://bugs.webkit.org/show_bug.cgi?id=171041
        //       safari10: true
        //     },
        //     output: {
        //       comments: false
        //     }
        //   }
        // })
      ],
      splitChunks: {
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /([\\/]node_modules[\\/]|css)/,
            // 名字必须chunk-开头, reason： vue-cli中默认加了chunk-vendors chunk-common的入口
            name: 'chunk-vendors',
            chunks: 'initial',
            priority: 2,
            enforce: true,
            minChunks: 2
          },
          common: {
            test: /\.(js|ts)$/,
            name: 'chunk-common',
            chunks: 'initial',
            reuseExistingChunk: true,
            priority: 1,
            minChunks: 2
          }
        }
      }
    }
  },
  pluginOptions: {
    dll: {
      // 入口配置
      entry: {
        libs: [
          'vue',
          'vue-router',
          'axios',
          // '@sentry/browser',
          'query-string',
          'js-cookie',
          'weixin-js-sdk',
          'clipboard',
          'vant'
        ]
      },
      // 输入目录
      output: path.join(__dirname, './public/libs'),
      cacheFilePath: path.join(__dirname, './public/libs'),
      // open: simpleMode ? false : 'auto', // process.env.NODE_ENV === 'production',
      // mordern模式 针对非module模块插入会有问题，所以手动插入
      inject: false
    }
  },
  chainWebpack
}
