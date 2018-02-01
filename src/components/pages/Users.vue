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
          <van-col span="12">
            <van-cell-group>
              <van-cell title="用户1" is-link value="详细内容" @click="show = true" />
            </van-cell-group>
          </van-col>
          <van-col span="12">
            <van-cell-group>
              <van-cell title="用户2" is-link value="详细内容" @click="show = true" />
            </van-cell-group>
          </van-col>
          <van-col span="12">
            <van-cell-group>
              <van-cell title="用户1" is-link value="详细内容" @click="show = true" />
            </van-cell-group>
          </van-col>
          <van-col span="12">
            <van-cell-group>
              <van-cell title="用户1" is-link value="详细内容" @click="show = true" />
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
              <van-col span="12">1</van-col>
              <van-col span="12">用户名：</van-col>
              <van-col span="12">
                <van-field v-model="newuser" icon="clear" @click-icon="newuser = ''" />
              </van-col>
              <van-col span="12">用户真实信息：</van-col>
              <van-col span="12">
                <van-field v-model="newpeople" icon="clear" @click-icon="newpeople = ''" />
              </van-col>
              <van-col span="12">上次登录IP：</van-col>
              <van-col span="12">192.168.7.1</van-col>
              <van-col span="24">
                <van-button type="danger" style="float:right;margin-right:20px;">删除用户</van-button>
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
            <van-field label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />
          </van-col>
          <van-col span="24">
            <van-field type="password" label="密码" placeholder="请输入密码" />
          </van-col>
          <van-col span="24">
            <van-field label="真实姓名" icon="clear" placeholder="请输入您的姓名" @click-icon="username = ''" />
          </van-col>
          <van-col span="24">
            <van-button type="default" @click="add = false" style="margin-right: 20px;">取消</van-button>
            <van-button type="primary" @click="onClickAlert,add = false">确认</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: true,
      show: false,
      add: false,
      text: false,
      newuser: '昵称',
      newpeople: '真实姓名'
    }
  },
  methods: {

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

