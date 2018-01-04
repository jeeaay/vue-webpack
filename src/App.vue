
<template>
  <div id="app">
    <img src="./assets/logo.png">
    
    <router-link to="/">首页</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
require('./assets/test.sass')
export default {
  name: 'app'
}
</script>
