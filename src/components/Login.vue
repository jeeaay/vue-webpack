<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <van-cell-group class="">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                @click-icon="username = ''"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
            />
            <van-row>
                <van-checkbox v-model="checked">记住密码？</van-checkbox>             
            </van-row>
            <van-button type="primary">提交</van-button>
            <van-button type="danger">取消</van-button>
        </van-cell-group>
        
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

<style lang="sass" scoped>
.van-field, .van-checkbox
    margin-bottom: 15px
.van-button--danger
    margin-left: 15px
.van-button--normal
    padding: 0 25px
</style>
