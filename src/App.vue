<template>
  <div id="app">
    <input type="text" name="username" style="display:none;">
    <input type="password" name="password" style="display:none;">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
    <v-tip></v-tip>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    vHeader: resolve => require(['./components/header.vue'], resolve),
    vFooter: resolve => require(['./components/footer.vue'], resolve),
    vTip: resolve => require(['./components/tipPopup.vue'], resolve) // 错误提示
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'assets/css/reset.styl'
@import 'assets/css/common.styl'
</style>
