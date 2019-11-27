<template>
  <div class="pepperTarin secret-content72">
    <v-breadcrumb :breadcrumbList="$t('AI.pepperTarin.breadcrumbList')"></v-breadcrumb>
    <div class="pepperTarin-content">
      <div class="qrCode"></div>
      <p>{{$t('AI.pepperTarin.text1')}}</p>
      <a class="secret-a">{{$t('AI.pepperTarin.text2')}}</a>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pepperTarin
  .pepperTarin-content
    margin-top 40px
    text-align center
    border-radius 6px
    background-color #1f222e
    padding 60px 0
    .qrCode
      display inline-block
      width 200px
      height 200px
      background-color #fff
    p
      margin-top 50px
      margin-bottom 20px
</style>

<script>
export default{
  data () {
    return {
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  }
}
</script>
