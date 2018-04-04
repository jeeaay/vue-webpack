/*
 * @Author: londy
 * @Date: 2018-02-24 16:41:52
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-04 16:12:42
 */
<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="userInfo">
      <h2>审核用户</h2>
      <div class="people">
        <van-row>
          <van-col span="12" v-for="(item,index) in newusers" :key="item.user_id" @click.native="reviewUser(index)">
            <van-row>
                <van-col span="12">{{item.real_name}}</van-col>
                <van-col span="12"><van-switch v-model="checked" /></van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div class="pages">
        <van-pagination @change="onChange" v-model="currentPage" :total-items="totalUser" :items-per-page="10" />
      </div>
    </div>
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
      let url = '/newuser/?access_token=' + usertoken + '&page=' + currentPage
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
      text: false,
      checked: false,
      newusers: [],
      totalUser: 0
    }
  },
  async mounted () {
    let data = await GetUserList(this.currentPage)
    this.newusers = data.userList
    this.totalUser = data.totalUser
  },
  methods: {
    async onChange () {
      let data = await GetUserList(this.currentPage)
      this.newusers = data.userList
      this.totalUser = data.totalUser
    },
    reviewUser (index) {
      let url = '/newuser/?access_token=' + this.newusers[index].user_id + localStorage.getItem('access_token')
      this.checked[index] = true
      axios.put(url, qs.stringify({
      }))
      .then((response) => {
        Dialog.alert({
          title: '审核成功',
          message: '用户' + this.newusers[index].real_name + '审核通过'
        })
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
.van-field {
  height: 48px;
}
.van-field__control {
  background: #ccc;
}
</style>

