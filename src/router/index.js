import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Login from '@/views/Login/index.vue'
// import Layout from '@/views/Layout/index.vue'
// import Home from '@/views/Home/Home.vue'
// import User from '@/views/User/User.vue'
// import UserEdit from '@/views/User/userEdit.vue'
// import UserFollowing from '@/views/User/UserFolowing.vue'
// import UserFans from '@/views/User/UserFans.vue'
// import UserChat from '@/views/User/UserChat.vue'
// import Search from '@/views/Search/index.vue'
// import SearchRes from '@/views/Search/searchResult.vue'
// import ArtitleDetail from '@/views/ArtitleDetail/index.vue'
Vue.use(VueRouter)

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    // 路由懒加载：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
    // Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        meta: { isRecord: true, top: 0 }, // isRecord是否需要设置滚动位置
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/User/index.vue')
      }
    ]
  },
  {
    path: '/user_edit',
    component: () => import('@/views/User/userEdit.vue')
  },
  {
    path: '/user_following',
    component: () => import('@/views/User/UserFolowing.vue')
  },
  {
    path: '/user_fans',
    component: () => import('@/views/User/UserFans.vue')
  },
  {
    path: '/user_chat',
    component: () => import('@/views/User/UserChat.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search/index.vue'),
  },
  {
    path: '/search/:keywords',
    component: () => import('@/views/Search/searchResult.vue')
  },
  {
    path: '/artitle_detail',
    component: () => import('@/views/ArtitleDetail/index.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 有 token，不能去登录页
  // 无 token，需要用户的 “权限” 的才能去登录页
  if (store.state.token && to.path === '/login') {
    // 已经有 token了，阻止跳转，原地呆着
    next(false)
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  // 如果当前的路由的元信息中，isRecord 的值为 true
  if (to.meta.isRecord) {
    setTimeout(() => {
      // 则把元信息中的 top 值设为滚动条纵向滚动的位置
      window.scrollTo(0, to.meta.top)
    }, 0)
  }
})

export default router
