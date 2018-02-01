<template>
  <div class="header">
    <div class="container">
      <van-row class="top">
        <van-col span="3" class="logoTitle">{{message}}</van-col>
        <van-col span="18" class="menu">
          <van-row class="menuList">
            <van-col span="8" v-for="item in items" :key="item.id">
              <router-link :to="{name:(item.name),params:{pageName:(item.description)}}">{{item.description}}</router-link>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="3" class="user">
          <div class="headPortrait">
            <img src="../../assets/headportrait.jpg" alt="用户头像">
          </div>
          <div class="userName">username</div>
          <div class="dropMenu">
            <div class="drop">
              <ul>
                <li v-for="useritem in useritems" :key="useritem.id">
                  <router-link :to="{name:(useritem.name),params:{pageName:(useritem.description)}}">{{useritem.description}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '案例采集管理后台',
      items: [
        { name: '用户管理', description: '用户管理' },
        { name: '分类管理', description: '分类管理' },
        { name: '案例管理', description: '案例管理' }
      ],
      useritems: [
        { name: '用户信息', description: '用户信息' },
        { name: '修改密码', description: '修改密码' }
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.user:hover .dropMenu {
  animation: drop 0.4s ease-in-out both;
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
  height: atuo;
  top: -200px;
  left: 0;
  padding-top: 10px;
  z-index: -1;
}
.drop {
  border: 1px solid #d1dbe5;
  box-shadow: 0 0 25px #cac6c6;
}
.drop ul li {
  line-height: 150%;
}
.drop ul li a {
  display: block;
  text-align: center;
  padding: 15px 0;
  color: #48576a;
}
</style>

