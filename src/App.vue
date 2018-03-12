
<template>
  <div id="app">
      <transition name="slide">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
require('./assets/style.sass')
export default {
  name: 'app'
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
</style>
