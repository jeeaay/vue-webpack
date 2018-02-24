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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
