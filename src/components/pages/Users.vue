/*
 * @Author: londy
 * @Date: 2018-02-24 16:41:52
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-03-29 14:38:41
 */
<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="addUser">
      <van-button type="primary" @click="add = true">
        <van-icon name="add-o" />添加用户</van-button>
    </div>
    <div class="userInfo">
      <h2>用户信息</h2>
      <div class="people">
        <van-row>
          <van-col span="12" v-for="(item,index) in users" :key="item.user_id" @click.native="openUserInfo(index)">
            <van-cell-group>
              <van-cell :title="item.user_name" is-link value="详细信息"/>
            </van-cell-group>
          </van-col>
        </van-row>
      </div>
      <div class="maske">
        <van-popup v-model="show" position="bottom">
          <div class="container">
            <h2>详细信息：</h2>
            <van-row gutter="10">
              <van-col span="12">用户ID：</van-col>
              <van-col span="12">{{userInfo.user_id}}</van-col>
              <van-col span="12">用户名：</van-col>
              <van-col span="12">
                <van-field v-model="userInfo.user_name" @keyup="onKeyup(userInfo.user_id)" @click-icon="userInfo.user_name = ''" />
              </van-col>
              <van-col span="12">用户真实信息：</van-col>
              <van-col span="12">
                <van-field v-model="userInfo.real_name" @keyup="onKeyup(userInfo.user_id)" @click-icon="userInfo.real_name = ''" />
              </van-col>
              <van-col span="12">上次登录IP：</van-col>
              <van-col span="12">{{userInfo.last_login_ip ? userInfo.last_login_ip : '暂无'}}</van-col>
              <van-col span="24">
                <van-button type="danger" style="float:right;margin-right:20px;" @click.native="deleteUser(userInfo.user_id)">删除用户</van-button>
              </van-col>
            </van-row>
          </div>
        </van-popup>
      </div>
      <div class="pages">
        <van-pagination @change="onChange" v-model="currentPage" :total-items="totalUser" :items-per-page="10" />
      </div>
    </div>
    <van-popup v-model="add" class="adduitem">
      <div class="addMaske">
        <h2>添加用户</h2>
        <van-row>
          <van-col span="24">
            <van-field label="用户名" icon="clear" id="adduser" placeholder="请输入用户名" v-model="addUser" @click-icon="username = ''" />
          </van-col>
          <van-col span="24">
            <van-field type="password" label="密码" placeholder="请输入密码" v-model="addPassword"/>
          </van-col>
          <van-col span="24">
            <van-field label="真实姓名" icon="clear" placeholder="请输入您的姓名" v-model="addReal" @click-icon="username = ''" />
          </van-col>
          <van-col span="24">
            <van-button type="default" @click="add = false" style="margin-right: 20px;">取消</van-button>
            <van-button type="primary" @click="onClickAlert">确认</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import { Dialog } from 'vant'

let GetUserList = (currentPage) => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/user/?access_token=' + usertoken + '&page=' + currentPage
      axios.get(url)
      .then(response => {
        resolve(response.data.data)
      })
    }
  })
}

export default {
  data () {
    return {
      currentPage: 1,
      show: false,
      add: false,
      text: false,
      newuser: '',
      newpeople: '',
      users: [],
      userInfo: [],
      addUser: '',
      addPassword: '',
      totalUser: 0,
      addReal: ''
    }
  },
  async mounted () {
    let data = await GetUserList(this.currentPage)
    this.users = data.userList
    this.totalUser = data.totalUser
  },
  methods: {
    async onChange () {
      let data = await GetUserList(this.currentPage)
      this.users = data.userList
      this.totalUser = data.totalUser
    },
    openUserInfo (index) {
      this.show = true
      this.userInfo = this.users[index]
    },
    onClickAlert () {
      let url = '/user/?access_token=' + localStorage.getItem('access_token')
      if (this.addUser !== '') {
        axios.post(url, qs.stringify({
          user_name: this.addUser,
          passwd: this.addPassword,
          real_name: this.addReal
        }))
        .then((response) => {
          if (response.data.error) {
            Dialog.alert({
              title: '添加用户失败',
              message: response.data.message
            })
          } else {
            Dialog.alert({
              title: '添加成功',
              message: '用户' + this.addReal + '添加成功'
            }).then(() => {
              this.$router.go(0)
            })
          }
        })
      } else {
        Dialog.alert({
          title: '错误',
          message: '请填写用户名'
        })
      }
    },
    deleteUser (id) {
      let url = '/user/' + id + '?access_token=' + localStorage.getItem('access_token')
      axios.delete(url)
        .then((response) => {
          Dialog.alert({
            title: '删除成功',
            message: response.data.data
          }).then(() => {
            this.$router.go(0)
          })
        })
    },
    onKeyup (id) {
      let url = '/user/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        if (this.userInfo.user_name !== '' && this.userInfo.real_name !== '') {
          axios.put(url, qs.stringify({
            user_name: this.userInfo.user_name,
            real_name: this.userInfo.real_name
          }))
        }
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addUser .van-icon {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 6px;
}
.people .van-col {
  margin-bottom: 10px;
  cursor: pointer;
}
.van-row {
  padding: 10px 0;
}
.adduitem {
  padding: 10px 25px 25px;
}
@media (max-width: 759px) {
  .adduitem {
    width: 90%;
  }
}
@media (min-width: 1000px) {
  .adduitem {
    width: 80%;
  }
}
@media (min-width: 1200px) {
  .adduitem {
    width: 50%;
  }
}
.maske .van-col {
  height: 100%;
  border: 1px solid #e5e5e5;
  text-align: center;
  margin-bottom: 5px;
  border-collapse: collapse;
  height: 50px;
  line-height: 50px;
}
.van-field {
  height: 48px;
}
.maske .van-cell__title {
  top: 12px;
}
.maske .van-field {
  width: 60%;
  margin: 0 auto;
}
.van-field__control {
  background: #ccc;
}
</style>

