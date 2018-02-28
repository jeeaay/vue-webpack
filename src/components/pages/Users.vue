/*
 * @Author: londy
 * @Date: 2018-02-24 16:41:52
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-02-27 17:03:40
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
                <van-field v-model="userInfo.user_name" icon="clear" @click-icon="userInfo.user_name = ''" />
              </van-col>
              <van-col span="12">用户真实信息：</van-col>
              <van-col span="12">
                <van-field v-model="userInfo.real_name" icon="clear" @click-icon="userInfo.real_name = ''" />
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
        <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
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
export default {
  data () {
    return {
      currentPage: true,
      show: false,
      add: false,
      text: false,
      newuser: '',
      newpeople: '',
      users: [],
      userInfo: [],
      addUser: '',
      addPassword: '',
      addReal: ''
    }
  },
  mounted () {
    if (localStorage.getItem('access_token')) {
      var usertoken = localStorage.getItem('access_token')
      var url = 'http://api.com/v1/user/?access_token='
      axios.get(url + usertoken + '&page=1')
      .then(response => {
        let userArr = []
        for (var i in response.data.data) {
          userArr.push(response.data.data[i])
        }
        this.users = userArr
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
      setTimeout(function () {
        self.$router.push({
          path: '/'
        })
      }, 100)
    }
  },
  methods: {
    openUserInfo (index) {
      this.show = true
      this.userInfo = this.users[index]
    },
    onClickAlert () {
      var usertoken = localStorage.getItem('access_token')
      var url = 'http://api.com/v1/user/?access_token='
      axios.post(url + usertoken, qs.stringify({
        user_name: this.addUser,
        passwd: this.addPassword,
        real_name: this.addReal
      }))
      .then((response) => {
        console.log(response)
        if (response.data.error) {
          Dialog.alert({
            title: '冒个泡',
            message: '用户名已存在'
          })
          this.addUser = ''
          console.log(response.data.error)
        } else {
          let newUser = {
            user_id: response.data.data,
            user_name: this.addUser,
            real_name: this.addReal
          }
          this.users.push(newUser)
          this.add = false
          Dialog.alert({
            title: '提醒',
            message: '添加成功'
          })
        }
      }, (response) => {
        console.log('error')
        this.$router.push({
          path: '/'
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteUser (id) {
      var usertoken = localStorage.getItem('access_token')
      var url = 'http://api.com/v1/user/' + id + '?access_token='
      axios.post(url + usertoken)
      .then((response) => {
        let index = this.users.findIndex(item => {
          return item.user_id === id
        })
        this.users.splice(index, 1)
        this.show = false
      })
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
  padding: 10px 25px;
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

