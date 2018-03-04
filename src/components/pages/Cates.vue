/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:12
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-02-27 13:46:46
 */
<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="catesContent">
      <van-button type="primary" @click="addCate = true">
        <van-icon name="add-o" />添加分类</van-button>
    </div>
    <h2>分类列表</h2>
    <van-row class="catesList">
      <van-col span="12" v-for="(cate,index) in cates" :key="cate.cate_id" @click.native="modCaseInfo(index)">
        <van-cell :title="cate.cate_name" is-link value="编辑" @click="cateed = true"/>
      </van-col>
    </van-row>
    <!-- <div class="pages">
      <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
    </div> -->
    <van-popup v-model="addCate" class="addcate">
      <h2>添加分类</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类名称：" placeholder="请输入分类名称" />
        </van-col>
        <van-col span="24">
          <van-button type="default" @click="addCate = false" style="margin-right: 20px;">取消</van-button>
          <van-button type="primary" @click.native="onClickCate()">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup v-model="cateed" class="cateb">
      <h2>编辑分类</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类名称：" value="修改分类名称" icon="clear" @click-icon="username = ''"/>
          <van-field label="分类描述：" type="textarea" value="修改分类描述" icon="clear" rows="1" autosize @click-icon="username = ''"/>
        </van-col>
        <van-col span="24" class="marginMid">
          <van-button type="default" @click="cateb = false" style="margin-right: 20px;">取消</van-button>
          <van-button type="danger" @click="cateb = false">删除</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
// import qs from 'qs'
export default {
  data () {
    return {
      currentPage: true,
      addCate: false,
      cateed: false,
      cates: []
    }
  },
  mounted () {
    if (localStorage.getItem('access_token')) {
      var usertoken = localStorage.getItem('access_token')
      var url = 'http://api.com/v1/cate/?access_token='
      axios.get(url + usertoken + '&page=1')
      .then(response => {
        console.log(response.data)
        let cateArr = []
        for (var i in response.data.data) {
          cateArr.push(response.data.data[i])
        }
        this.cates = cateArr
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
  }
  // methods: {
  //   openUserInfo (index) {
  //     this.show = true
  //     this.userInfo = this.users[index]
  //   },
  //   onClickAlert () {
  //     var usertoken = localStorage.getItem('access_token')
  //     var url = 'http://api.com/v1/user/?access_token='
  //     axios.post(url + usertoken, qs.stringify({
  //       user_name: this.addUser,
  //       passwd: this.addPassword,
  //       real_name: this.addReal
  //     }))
  //     .then((response) => {
  //       let newUser = {
  //         user_id: response.data.data,
  //         user_name: this.addUser,
  //         real_name: this.addReal,
  //         last_login_ip: ''
  //       }
  //       this.users.push(newUser)
  //       this.add = false
  //       // console.log(response)
  //     })
  //   },
  //   deleteUser (id) {
  //     // var usertoken = localStorage.getItem('access_token')
  //     // var url = 'http://api.com/v1/user/?access_token='
  //     // axios.post(url + usertoken)
  //     // .then((response) => {
  //     let index = this.users.findIndex(item => {
  //       return item.user_id === id
  //     })
  //     this.users.splice(index, 1)
  //     this.show = false
  //     // })
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.catesContent .van-icon-add-o {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 6px;
}
.marginMid{
  padding-top: 10px;
}
.catesList .van-col {
  margin-bottom: 10px;
  cursor: pointer;
}
.catesList {
  padding: 10px 0;
}
.addcate,.cateb {
  padding: 10px 25px;
}
@media (max-width: 759px) {
  .addcate,.cateb {
    width: 90%;
  }
}
@media (min-width: 1000px) {
  .addcate,.cateb {
    width: 80%;
  }
}
@media (min-width: 1200px) {
  .addcate,.cateb {
    width: 50%;
  }
}
</style>

