import {
  createRouter,
  // createWebHashHistory,
  createWebHistory
  // RouteRecordRaw
} from 'vue-router'
console.log('pubilc')
// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
         {
           path: '/home/:name?',
           name: 'Home',
           meta: {
             title: '首页',
             keepAlive: true
           },
           component: () => import('@/views/home')
         },
         {
           path: '/virtual-scroll',
           name: 'VirtualScroll',
           meta: {
             title: '虚拟长列表',
             keepAlive: true
           },
           component: () => import('@/views/virtual-scroll')
         },
         {
           path: '/login',
           name: 'Login',
           meta: {
             title: '登录',
             keepAlive: true
           },
           component: () => import('@/views/login')
         },
         {
           path: '/reactive',
           name: 'Reactive',
           meta: {
             title: '响应式迷里版',
             keepAlive: true
           },
           component: () => import('@/views/reactive')
         },
         {
           path: '/about',
           component: () => import('@/views/about'),
           name: 'About',
           meta: {
             title: 'About',
             icon: 'denglong',
             roles: ['admin', 'editor']
           }
         },
         {
           path: '/model',
           component: () => import('@/views/model')
         },
         {
           path: '/:pathMatch(.*)*',
           component: () => import('@/views/no-found')
         }
       ]
// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
  {
    path: '/about',
    component: () => import('@/views/about'),
    name: 'About',
    meta: {
      title: 'About',
      icon: 'denglong',
      roles: ['admin', 'editor']
    }
  }
]
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(), // 生产环境nginx配置
  routes: constRoutes
})
export default router
