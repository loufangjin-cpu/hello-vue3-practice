const glob = require('glob')
const fs = require('fs')
const path = require('path')

function existFile(filepath) {
  return fs.existsSync(path.resolve(__dirname, filepath))
}

// function copyFile (origin, target) {
//   fs.copyFileSync(origin, target)
// }

// 持久化队列
// const persistenceQueue = []
// 持久化缓存路径
const persistenceCacheDir = 'public/'

module.exports = {
  getEntries: (option) => {
    const globPath = './src/views/**/__config.+(j)s'
    const entries = {}
    const persistenceQueue = []
    const prerenderQueue = []
    const regExp = new RegExp(`${option.pageFilter || '.*'}`)
    glob
      .sync(globPath)
      .filter((p) => regExp.test(p))
      .forEach((entry) => {
        const config = require(entry)
        const dirs = entry.split('/')
        const tmp = dirs.slice(3, dirs.length - 1)
        const basename = tmp[tmp.length - 1]
        const pathname = tmp.join('/')

        let outputPath = `${pathname}.html`
        console.log('outputPath', outputPath)
        if (config.project) {
          outputPath = `${config.project}/${pathname}.html`
        }

        if (process.env.VUE_APP_OFFLINE && !config.offline) return
        if (process.env.VUE_APP_PRERENDER && !config.prerender) return

        entries[pathname] = Object.assign(
          {
            entry: `src/views/${pathname}/index.js`,
            template: `template/index.html`,
            title: '测试title',
            favicon: path.resolve(__dirname, './src/public/favicon.png'),
            filename: `${basename}/index.html`,
            chunksSortMode: 'manual',
            // chunks: isDev ? ['libs', 'vendors', pathname] : ['libs', 'vendors', pathname],
            path: pathname,
            minify: {
              // 压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true // 删除空白符与换行符
            }
          },
          config
        )
      })
    return {
      entries,
      persistenceQueue,
      prerenderQueue
    }
  }
}
