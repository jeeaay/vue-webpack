<template>
  <div class="van-uploader">
    <slot />
    <input
      ref="input"
      type="file"
      class="van-uploader__input"
      v-bind="$attrs"
      @change="onChange"
    >
  </div>
</template>

<script>
export default {
  name: 'uploader',
  methods: {
    onChange (event) {
      this.$emit('uploadImgFile', event.target.files[0])
    }
  }
}
</script>
<style scoped>
.van-uploader{position:relative;display:inline-block}.van-uploader__input{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}.van-uploader input[type=file]::-webkit-file-upload-button{cursor:pointer}
</style>
