<template>
  <div class="containerWrap">
    <div class="loginForm">
      <h1 class="logonTitle">{{ title }}</h1>
      <van-cell-group class="">
        <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        <van-row>
          <van-checkbox v-model="checked">记住密码？</van-checkbox>
        </van-row>
        <van-button type="primary" v-on:click="$router.push('/public')">提交</van-button>
        <van-button type="danger">取消</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '请先登录',
      checked: true
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
