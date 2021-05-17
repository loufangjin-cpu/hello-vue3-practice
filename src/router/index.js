import {
  createRouter,
  // createWebHashHistory,
  createWebHistory
  // RouteRecordRaw
} from 'vue-router'

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: () => import('@/views/home')
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
