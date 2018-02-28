<template>
  <div class="lmContainer">
    <v-head></v-head>
    <div class="container">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
export default {
  components: {
    vHead
  }
}
</script>

<style lang="css" scoped>
.slide-leave-active {
  transform: translate(0, 0);
  opacity: 0;
}
.slide-enter-active {
  opacity: 1;
  transition: all .5s ease-in-out;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}
</style>
