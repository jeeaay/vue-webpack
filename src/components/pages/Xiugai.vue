/*
 * @Author: londy
 * @Date: 2018-02-26 09:30:38
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-03-20 14:36:02
 */

<template>
  <div class="containerWrap">
    <div class="loginForm">
      <h1 class="logonTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field disabled v-model="user" label="用户名" />
        <van-field v-model="oldPassword" type="password" label="旧密码" placeholder="请输入旧密码"/>
        <van-field v-model="newPassword" type="password" label="新密码" placeholder="请输入新密码" />
        <van-button type="primary" @click="modify">提交</van-button>
        <van-button type="danger" @click="goback">返回上一级</van-button>
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
      oldPassword: '',
      newPassword: '',
      user: localStorage.getItem('real_name')
    }
  },
  mounted () {
  },
  methods: {
    modify: function () {
      if (this.newPassword !== '' && this.oldPassword !== '') {
        let url = '/apis/user/' + localStorage.getItem('userID') + '?access_token=' + localStorage.getItem('access_token')
        axios.put(url, qs.stringify({
          old_passwd: this.oldPassword,
          new_passwd: this.newPassword
        })).then((response) => {
          console.log(response)
          if (response.data.error) {
            Dialog.alert({
              title: '修改失败',
              message: response.data.message
            })
          } else {
            Dialog.alert({
              title: '修改成功',
              message: response.data.data
            })
          }
        })
      } else {
        Dialog.alert({
          title: '修改失败',
          message: '请填写完整！'
        })
      }
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
  top: 16%;
  margin-left: -275px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  padding: 20px 35px 45px;
  width: 550px;
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
