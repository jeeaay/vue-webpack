// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { Radio, Loading, Uploader, Panel, Row, Col, Field, Icon, Button, Switch, Checkbox, CheckboxGroup, Cell, CellGroup, Pagination, Popup, Dialog } from 'vant'
Vue.use(Panel)
Vue.use(Loading)
Vue.use(Uploader)
Vue.use(Radio)
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
axios.defaults.timeout = 2000
// axios.defaults.baseURL = 'https://case.lmzg.com/v1/'

// // http request 拦截器
axios.interceptors.request.use(
  config => {
    vu.isLoading = true
    // let token = localStorage.getItem('access_token')
    // let nowTime = new Date()
    // if (token && (nowTime.getTime() < localStorage.getItem('expires_time') * 1000)) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    //   config.headers.Authorization = token
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// http response 拦截器
axios.interceptors.response.use(
  response => {
    vu.isLoading = false
    if (response.data.error) {
      switch (response.data.error) {
        case 401:
          Dialog.alert({
            title: '401 Error: 鉴权失败',
            message: response.data.message
          }).then(() => {
            localStorage.clear()
            router.replace({
              path: '/',
              query: { redirect: router.currentRoute.fullPath }
            })
          })
          break
        case 404:
          // 401 清除token信息并跳转到登录页面
          Dialog.alert({
            title: '404 Error: 页面不存在',
            message: response.data.message
          }).then(() => {
            router.go(-1)
          })
          break
        default:
          Dialog.alert({
            title: 'Error',
            message: response.data.message
          })
      }
    }
    return response
  },
  error => {
    Dialog.alert({
      title: '错误',
      message: '请重新登录'
    }).then(() => {
      localStorage.clear()
      router.replace({
        path: '/',
        query: { redirect: router.currentRoute.fullPath }
      })
    })
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
let vu = new Vue({
  el: '#app',
  router,
  template: '<App :isLoading=\'isLoading\' />',
  components: { App },
  data () {
    return {
      isLoading: false
    }
  }
})
