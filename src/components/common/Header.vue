/*
 * @Author: londy
 * @Date: 2018-02-27 15:31:52
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-09 08:09:50
 */
<template>
  <div class="public">
    <div class="mobileLogo clearfix">
      <div class="container">
        <div class="logo"><img src="../../assets/logo.png"></div>
        <div class="btn" @click="btn"><van-button type="primary">菜单</van-button></div>
      </div>
    </div>
    <div class="header" v-bind:class="{ 'leftSlide': leftSlider }" @click="close">
      <div class="container">
        <van-row class="top">
          <van-col span="5" class="logoTitle">{{message}}</van-col>
          <van-col span="15" class="menu">
            <van-row class="menuList">
              <van-col span="6" v-for="item in items" :key="item.id">
                <router-link :to="{name:(item.name),params:{pageName:(item.description)}}">{{item.description}}</router-link>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="4" class="user">
            <div class="userT clearfix">
              <div class="headPortrait">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTA5NjQzRTkzMkZGMTFFOEI1NUI4MDAzRjMxQjE1QUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTA5NjQzRTgzMkZGMTFFOEI1NUI4MDAzRjMxQjE1QUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM4RTQ1QjhDMzJGRTExRTg5OUI0RTEwREM0Nzg1MjVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM4RTQ1QjhEMzJGRTExRTg5OUI0RTEwREM0Nzg1MjVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7i06/wAABhRJREFUeNrMWmtsFFUU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" alt="用户头像">
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
  max-width: 100%;
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

