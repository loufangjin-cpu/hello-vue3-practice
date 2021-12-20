const glob = require('glob')
// const fs = require('fs')
const path = require('path')

module.exports = {
  getEntries: (option) => {
    const globPath = './src/views/**/__config.+(j)s'
    const entries = {}
    // 过滤出要启动的页面 比如 yarn serve about
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
        entries[pathname] = Object.assign(
          {
            entry: `src/views/${pathname}/index.js`,
            template: `template/index.html`,
            title: '测试title',
            favicon: path.resolve(__dirname, './src/public/favicon.png'),
            filename: `${basename}/index.html`,
            chunksSortMode: 'manual',
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
      entries
    }
  }
}
