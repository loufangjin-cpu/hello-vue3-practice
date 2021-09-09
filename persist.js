/**
 * 本地持久化copy
 */
const fs = require('fs')
const path = require('path')
const util = require('util')
const resolve = (file) => path.resolve(__dirname, file)
const config = require('./config.js')
const mkdir = require('mkdirp')
const mkdirp = util.promisify(mkdir)
const entries = config.getEntries({
  pageFilter: '.*',
  useMock: false
})
// 需要取消持久化页面的pattern，如： [/620/g, /activity/g]
const blockList = []

const pages = entries.entries

// 将需要持久化页面从dist复制到public
Object.keys(pages).forEach((n) => {
  const conf = pages[n]
  if (conf.persistence) {
    const dirP = path.dirname(`public/${conf.filename}`)
    mkdirp(dirP).then((resp) => {
      fs.copyFileSync(
        resolve(`dist/${conf.filename}`),
        resolve(`public/${conf.filename}`)
      )
      console.log(`${conf.filename} has done!`)
    })
  }
})

// 将不需要持久化页面删除
if (blockList.length) {
  entries.persistenceQueue.forEach((n) => {
    const conf = n.config
    const filename = n.outputPath
    if (conf.persistence) {
      if (blockList.filter((block) => filename.match(block)).length) {
        fs.unlinkSync(`public/${filename}`)
        console.log(`${filename} has been deleted!`)
      }
    }
  })
}
