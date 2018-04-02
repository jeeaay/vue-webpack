
<template>
  <div id="app">
      <transition name="slide">
        <router-view></router-view>
      </transition>
      <div class="loading" v-show="isLoading">
        <van-loading type="spinner" color="white" size="40px"/>
      </div>
  </div>
</template>

<script>
require('./assets/style.sass')
export default {
  name: 'app',
  props: ['isLoading']
}
</script>
<style lang="css" scoped>
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .5s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
.loading{
  width: 100%;
  height: 100%;
  position:fixed;
  top:0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 9999;
}
.van-loading{
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
}
</style>
