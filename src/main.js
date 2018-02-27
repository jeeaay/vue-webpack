// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { Row, Col, Field, Icon, Button, Switch, Checkbox, CheckboxGroup, Cell, CellGroup, Pagination, Popup, Dialog } from 'vant'

Vue.use(Field)
Vue.use(Row)
Vue.use(Col)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://api.com/'

// // http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     let token = localStorage.getItem('access_token')
//     if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//       config.headers.Authorization = token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          localStorage.clear()
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
