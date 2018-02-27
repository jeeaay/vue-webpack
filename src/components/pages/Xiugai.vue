/*
 * @Author: londy
 * @Date: 2018-02-26 09:30:38
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-02-27 13:48:44
 */

<template>
  <div class="containerWrap">
    <div class="loginForm">
      <h1 class="logonTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field v-model="user" label="用户名" />
        <van-field v-model="oldPassword" type="password" label="旧密码" disabled="disabled"/>
        <van-field v-model="newPassword" type="password" label="新密码" placeholder="请输入新密码" />
        <van-button type="primary" @click.native="modify">提交</van-button>
        <van-button type="danger" @click="goback">取消</van-button>
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
      title: '修改密码',
      oldPassword: '123456',
      newPassword: '',
      user: ''
    }
  },
  mounted () {
    const self = this
    if (localStorage.getItem('real_name')) {
      this.user = localStorage.getItem('real_name')
    } else {
      this.user = ''
      setTimeout(function () {
        self.$router.push({
          path: '/'
        })
      }, 100)
    }
  },
  methods: {
    modify: function () {
      Dialog.confirm({
        title: '冒个泡',
        message: '是否确定？'
      }).then(() => {
        const self = this
        if (this.username !== '' && this.password !== '') {
          var url = 'http://api.com/v1/login'
          axios
            .post(
              url,
              qs.stringify({
                password: this.password
              })
            )
            .then(response => {
              console.log(response.data)
              setTimeout(function () {
                self.$router.push({
                  path: '/public/users'
                })
              }, 100)
            }, (response) => {
              Dialog.alert({
                title: '冒个泡',
                message: '登录超时请重新登录'
              })
              this.$router.push({
                path: '/'
              })
            })
        } else {
          Dialog.alert({
            title: '冒个泡',
            message: '请填写完整'
          }).then(() => {})
        }
      }).catch(() => {
          // on cancel
      })
    },
    goback: function () {
      Dialog.confirm({
        title: '冒个泡',
        message: '是否选择离开？'
      }).then(() => {
        this.$router.go(-1)
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
