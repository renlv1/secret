<template>
  <div class="header">
    <a href="https://www.secretworth.com/#/home" class="header-lf">
      <img class="logo" src="../assets/images/header/logo.svg" alt="">
    </a>
    <div class="header-rt">
      <div class="header-user header-rt-item" v-show="userInfo.length !== 0">
        <div class="activeBox" @click="showMenu(1)" ref="userNameDiv">
          <img class="userImg" :src="userInfo.imgUrl" alt="">
          <span class="userName">{{userInfo.userName}}<i class="arrowDown" :class="{arrowActive: userMenuShow}"></i></span>
        </div>
        <ul class="dropDownMenu" :class="{dropDownMenuActive: userMenuShow}">
          <router-link tag="li" to="/userAccount">{{$t('header.text1')}}</router-link>
          <li @click="logout()">{{$t('header.text2')}}</li>
        </ul>
      </div>
      <div class="langBox header-rt-item">
        <div class="activeBox" @click="showMenu(2)" ref="langDiv">
          <img src="../assets/images/header/langImg.png" alt="">
          <span class="langSpan">{{langValue}}<i class="arrowDown" :class="{arrowActive: langMenuShow}"></i></span>
        </div>
        <ul class="dropDownMenu" :class="{dropDownMenuActive: langMenuShow}">
          <li :class="{lActive: language === 1}" @click="chooseLang(2)">EN</li>
          <li :class="{lActive: language === 2}" @click="chooseLang(1)">CN</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $a8 = #2d3436 // 文字颜色
  $f2 = #fff // 背景颜色
  $c26 = #f0f0f0 // 背景颜色
  .header
    height 100px
    display flex
    align-items center
    justify-content space-between
    padding 0 40px
    width 100%
    top 0
    left 0
    position fixed
    z-index 9999
    background-color #f0f0f0
    .header-lf
      padding 10px 20px
      cursor pointer
    .header-rt
      display flex
      color $a8
      .header-rt-item
        position relative
        font-size 0
        .activeBox
          height 100px
          display flex
          align-items center
          cursor pointer
          user-select none
          span
            &.langSpan
              width 80px
            font-size 18px
            padding 10px
            display flex
            align-items center
      .dropDownMenu
        height 0
        background-color $f2
        font-size 18px
        width 160px
        padding 0 20px
        border-bottom-left-radius 6px
        border-bottom-right-radius 6px
        position absolute
        top 100px
        opacity 0
        transition all .3s linear
        overflow hidden
        z-index 999
        box-shadow 0 0 2px 2px rgba(232, 232, 232, .6)
        &.dropDownMenuActive
          opacity 1
          height 80px
        li
          height 40px
          line-height 40px
          text-align center
          display block
          cursor pointer
          user-select none
          &:hover
            color #666
          &:first-child
            border-bottom 1px solid $c26
      .header-user
        margin-right 40px
        .userImg
          display inline-block
          width 48px
          height 48px
          border-radius 100%
          margin-right 10px
        .userName
          .arrowDown
            margin-left 10px
      .langBox
        img
          display inline-block
          width 24px
          height 24px
        span
          .arrowDown
            margin-left 20px
        .dropDownMenu
          width 120px
          right 0
</style>

<script>
import { i18n } from '../i18n/config'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      langValue: 'CN',
      userMenuShow: false,
      langMenuShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'language' // 語言
    ])
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeHeadMenu)
      if (localStorage.getItem('secretWebLang') === 'CN') {
        this.langValue = 'CN'
      } else {
        this.langValue = 'EN'
      }
      this.$store.dispatch('balanceAction') // 用户信息
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeHeadMenu) // 组件摧毁时关闭监听
  },
  methods: {
    closeHeadMenu (event) {
      if (!this.$refs.userNameDiv.contains(event.target)) {
        this.userMenuShow = false
      }
      if (!this.$refs.langDiv.contains(event.target)) {
        this.langMenuShow = false
      }
    },
    logout () {
      this.$store.dispatch('looutAction')
    },
    showMenu (val) {
      if (val === 1) {
        this.langMenuShow = false
        this.userMenuShow = !this.userMenuShow
      } else {
        this.userMenuShow = false
        this.langMenuShow = !this.langMenuShow
      }
    },
    chooseLang (val) {
      if (val === 1) {
        localStorage.setItem('secretWebLang', 'CN')
        i18n.locale = 'CN'
        this.langValue = 'CN'
      } else {
        localStorage.setItem('secretWebLang', 'EN')
        i18n.locale = 'EN'
        this.langValue = 'EN'
      }
      this.$store.dispatch('langAction', {lang: val})
      window.location.reload()
    }
  }
}
</script>
