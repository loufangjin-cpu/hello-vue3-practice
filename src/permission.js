import router from './router'
import store from './store'
console.log('store', store.state.moduleB)

// import { useRouter } from 'vue-router'

// const whiteList = ['/login'] // 无需令牌白名单
router.beforeEach(async (to, from) => {
  console.log('to', to)
  console.log('from', from)
  // 先请求获取用户信息
  // const { roles } = await store.dispatch('user/getInfo')

  // 根据当前用户角色过滤出可访问路由
  // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

  // window.location.replace('/login')
  // if (to.path === '/login') {
  //   // return '/home'
  // }
  // 是否获取到用户角色
  // const hasRoles = ''
  // if (!hasRoles) {
  //   // 添加至路由器
  //   router.addRoutes(accessRoutes)
  // }
})
