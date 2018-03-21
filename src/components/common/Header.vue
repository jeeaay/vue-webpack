/*
 * @Author: londy
 * @Date: 2018-02-27 15:31:52
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-03-20 19:29:57
 */
<template>
  <div class="public">
    <div class="mobileLogo clearfix">
      <div class="container">
        <div class="logo"><img src="../../assets/logo.jpg"></div>
        <div class="btn" @click="btn"><van-button type="primary">菜单</van-button></div>
      </div>
    </div>
    <div class="header" v-bind:class="{ 'leftSlide': leftSlider }" @click="close">
      <div class="container">
        <van-row class="top">
          <van-col span="5" class="logoTitle">{{message}}</van-col>
          <van-col span="15" class="menu">
            <van-row class="menuList">
              <van-col span="8" v-for="item in items" :key="item.id">
                <router-link :to="{name:(item.name),params:{pageName:(item.description)}}">{{item.description}}</router-link>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="4" class="user">
            <div class="userT clearfix">
              <div class="headPortrait">
                <img src="../../assets/headportrait.jpg" alt="用户头像">
              </div>
              <div class="userName">{{user}}</div>
            </div>
            <div class="dropMenu">
              <div class="drop">
                <ul>
                  <li @click="met">修改密码</li>
                  <li @click="signOut">退出登录</li>
                </ul>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div @click="close" v-bind:class="{ 'mask': mask }"></div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
      message: '案例采集管理后台',
      user: '',
      flag: true,
      leftSlider: false,
      mask: false,
      items: [
        { name: '用户管理', description: '用户管理' },
        { name: '分类管理', description: '分类管理' },
        { name: '案例管理', description: '案例管理' }
      ]
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
    met: function () {
      this.$router.push({
        path: '/public/xiugai'
      })
    },
    signOut: function () {
      Dialog.confirm({
        title: '提醒',
        message: '确认退出？'
      }).then(() => {
        localStorage.clear()
        this.$router.push({
          path: '/'
        })
      })
    },
    btn: function () {
      this.leftSlider = true
      this.mask = true
    },
    close: function () {
      this.mask = false
      this.leftSlider = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  z-index: 1;
}
.header .top {
  height: 100%;
  line-height: 70px;
}
.logoTitle {
  text-align: center;
}
.menuList a {
  color: #fff;
  display: block;
  height: 100%;
  text-align: center;
  font-size: 14px;
}
.user {
  position: relative;
}
.user:hover {
  cursor: pointer;
}
@media(min-width:760px){
.user:hover .dropMenu {
  animation: drop 0.4s ease-in-out both;
}
}
.user .headPortrait,
.user .userName {
  width: 50%;
  float: left;
}
@keyframes drop {
  0% {
    top: -200px;
  }
  100% {
    top: 70px;
  }
}
.user .headPortrait img {
  display: block;
  width: 70%;
  height: 90%;
  border-radius: 50%;
  margin: 10px auto;
}
.dropMenu {
  position: absolute;
  width: 100%;
  top: -200px;
  left: 0;
  z-index: 1;
}
.drop {
  border: 1px solid #d1dbe5;
  box-shadow: 0 0 25px #cac6c6;
}
.drop ul li {
  line-height: 150%;
  text-align: center;
  padding: 15px 0;
  color: #48576a;
}
</style>

