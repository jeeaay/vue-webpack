
<template>
  <div id="app">
    <transition name="fold">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
require('./assets/test.sass')
export default {
  name: 'app'
}
</script>
