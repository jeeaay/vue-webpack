<template>
  <div class="lmContainer">
    <v-head></v-head>
    <div class="container">
      <transition name="move" mode="out-in">
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
