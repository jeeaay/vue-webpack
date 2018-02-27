/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:04
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-02-27 15:36:43
 */
<template>
  <div class="containerWrap">
    <div class="loginForm">
      <h1 class="logonTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        <van-row>
          <van-checkbox v-model="checked">记住密码？</van-checkbox>
        </van-row>
        <van-button type="primary" @click="login">提交</van-button>
        <van-button type="danger">取消</van-button>
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
  mounted () {},
  methods: {
    login: function () {
      const self = this
      if (this.username !== '' && this.password !== '') {
        var url = 'http://api.com/v1/login'
        axios.post(url, qs.stringify({
          username: this.username,
          password: this.password
        }))
        .then(response => {
          console.log(response.data)
          let responseData = response.data
          localStorage.setItem('access_token', responseData.access_token)
          localStorage.setItem('expires_time', responseData.time)
          localStorage.setItem('userID', responseData.user_id)
          localStorage.setItem('real_name', responseData.real_name)
          setTimeout(function () {
            self.$router.push({
              path: '/public/users'
            })
          }, 100)
        })
        .catch(error => {
          Dialog.alert({
            title: '冒个泡',
            message: '用户名或者密码不正确'
          }, error).then(() => {
          })
        })
      } else {
        Dialog.alert({
          title: '冒个泡',
          message: '请填写完整'
        }).then(() => {
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
  top: 50%;
  margin-left: -275px;
  margin-top: -160px;
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
    margin-left: 0px;
    margin-top: 0px;
  }
  .containerWrap {
    padding: 20px 15px;
  }
}
.logonTitle {
  text-align: center;
  font-size: 30px;
}
.van-button--normal {
  padding: 0 25px;
}
</style>
