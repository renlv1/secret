<template>
  <div class="home">
    <ul class="nav">
      <li class="nav-item" v-for="nav in $t('home.navList')" :key="nav.title" :class="{navItemActive: nav.isOpen, height54: nav.title === 'Asset management'}">
        <a class="nav-item-a" @click="nav.isOpen = !nav.isOpen">
          <img :src="nav.imgSrc" alt="">
          <h3 class="secret-title">{{nav.title}}</h3>
        </a>
        <ul>
          <router-link tag="li" :to="item.path" v-for="item in nav.menu" :key="item.name">{{item.name}}</router-link>
        </ul>
      </li>
    </ul>
    <div class="home-rt">
      <router-view/>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #2d3436 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
.home
  width 1200px
  min-height 100%
  margin 0 auto
  margin-top 100px
  background-color $c26
  border-radius 12px
  display flex
  overflow hidden
  .nav
    width 300px
    min-height 100%
    padding 60px 40px
    margin-right 40px
    background-color $f2
    border-right 1px solid #e5e5e5
    .nav-item
      max-height 32px
      overflow hidden
      transition all .3s linear
      margin-bottom 60px
      &.height54
        max-height 54px
      &.navItemActive
        max-height 450px
      &:last-child
        margin-bottom 0
      .nav-item-a
        display flex
        align-items center
        cursor pointer
        user-select none
        img
          display inline-block
          width 32px
          height 32px
          margin-right 20px
        h3.secret-title
          margin-bottom 0
      ul
        padding-left 52px
        li
          line-height 1
          margin-top 30px
          cursor pointer
          user-select none
  .home-rt
    padding-bottom 50px
</style>

<script>
export default{
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('balanceAction') // 登录成功后获取用户信息
    })
  }
}
</script>
