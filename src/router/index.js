import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: { title: 'Hello World!' },
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      meta: { title: 'About Liming' },
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: '请登录' },
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
