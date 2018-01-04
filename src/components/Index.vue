<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <a class="list-group-item" v-link='"/about"'>About</a>
    <div class="layout">
      <van-row gutter="20">
        <van-col span="8"><p>span: 8</p></van-col>
        <van-col span="8"><p>span: 8</p></van-col>
        <van-col span="8"><p>span: 8</p></van-col>
      </van-row>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'HelloWorld ！',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

