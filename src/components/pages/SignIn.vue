/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:04
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-09 08:44:23
 */
<template>
  <div class="containerWrap">
    <div class="JoinIn">
      <h1 class="signInTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field v-model="username" required label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''"/>
        <van-field v-model="realname" required label="真实姓名" placeholder="请输入真实姓名"/>
        <van-field v-model="password" required type="password" label="密码" placeholder="请输入密码"/>
        <van-field v-model="repassword" required type="password" label="确认密码" placeholder="请再次输入密码" @keyup.enter.native="JoinIn"/>
        <div class="signInBtn">
          <van-button type="primary" @click.native="JoinIn()">提交</van-button>
          <van-button type="primary" @click.native="logon()">登陆</van-button>
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
      title: '请填写注册信息',
      username: '',
      password: '',
      realname: '',
      repassword: ''
    }
  },
  methods: {
    JoinIn () {
      const self = this
      if (this.username !== '' && this.realname !== '') {
        if (this.password === this.repassword) {
          axios.post('/newuser', qs.stringify({
            user_name: this.username,
            passwd: this.password,
            real_name: this.realname
          }))
          .then(response => {
            if (response.data.error) {
              Dialog.alert({
                title: '注册失败',
                message: response.data.message
              })
            } else {
              Dialog.alert({
                title: '注册成功',
                message: response.data.message
              })
              setTimeout(function () {
                self.$router.push({
                  path: '/'
                })
              }, 100)
            }
          })
        } else {
          Dialog.alert({
            title: '注册失败',
            message: '两次输入的密码不一致'
          })
        }
      } else {
        Dialog.alert({
          title: '注册失败',
          message: '请填写用户名和真实姓名'
        })
      }
    },
    logon () {
      this.$router.push({
        path: '/'
      })
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
.JoinIn {
  position: absolute;
  left: 50%;
  top: 16%;
  margin-left: -275px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  padding: 20px 35px;
  width: 550px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.signInTitle{
    text-align: center;
}
@media (max-width: 759px) {
  .JoinIn {
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
.signInBtn{
  text-align: center;
}
</style>
