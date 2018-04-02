/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:04
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-02 09:03:00
 */
<template>
  <div class="containerWrap">
    <div class="loginForm">
      <h1 class="logonTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" @keyup.enter.native="login"/>

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" @keyup.enter.native="login"/>
        <div class="loginBtn">
          <van-button type="primary" @click.native="login()">提交</van-button>
          <van-button type="danger">取消</van-button>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      title: '请先登录',
      checked: true,
      username: '',
      password: ''
    }
  },
  mounted () {
    let nowTime = new Date()
    let token = localStorage.getItem('access_token')
    if (token && (nowTime.getTime() < localStorage.getItem('expires_time') * 1000)) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      this.$router.push({path: '/public/cases'})
    }
  },
  methods: {
    login () {
      const self = this
      if (this.username !== '' && this.password !== '') {
        axios.post('/apis/login', qs.stringify({
          username: this.username,
          password: this.password
        }))
        .then(response => {
          if (response.data.error) {
            Dialog.alert({
              title: '登录失败',
              message: response.data.message
            })
          } else {
            let responseData = response.data
            localStorage.setItem('access_token', responseData.access_token)
            localStorage.setItem('expires_time', responseData.time)
            localStorage.setItem('userID', responseData.user_id)
            localStorage.setItem('real_name', responseData.real_name)
            setTimeout(function () {
              self.$router.push({
                path: '/public/cases'
              })
            }, 100)
          }
        })
      } else {
        Dialog.alert({
          title: '登录失败',
          message: '请填写用户名和密码'
        })
      }
    }
  }
}
</script>
<style lang="css" scoped>
.van-field,
.van-checkbox {
  margin-bottom: 15px;
}
.van-button--danger {
  margin-left: 15px;
}
.loginForm {
  position: absolute;
  left: 50%;
  top: 16%;
  margin-left: -275px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  padding: 20px 35px;
  width: 550px;
  height: 320px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
@media (max-width: 759px) {
  .loginForm {
    position: static;
    width: 100%;
    margin: 0px auto;
  }
  .containerWrap {
    padding: 50px 15px;
  }
}
.logonTitle {
  text-align: center;
  font-size: 30px;
}
.van-button--normal {
  padding: 0 25px;
}
.loginBtn{
  text-align: center;
}
</style>
