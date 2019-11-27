<template>
  <div class="login" @keyup.enter="loginFuc()">
    <div class="login-lf">
      <h3 class="title">{{$t('login.text1')}}</h3>
      <ul class="list">
        <router-link tag="li" :to="{path: '/noticeCenter/noticeDetail', query: {noticeId: item.id}}" v-for="(item, index) in noticeData" :key="item.id">
          <h4>{{item.title}}</h4>
          <div class="list-content" v-if="index === 0" v-html="item.content"></div>
        </router-link>
      </ul>
      <router-link to="/noticeCenter" class="moreNotice">{{$t('login.text2')}}</router-link>
    </div>
    <div class="login-rt">
      <h3 class="title">{{$t('login.text3')}}</h3>
      <p class="subtitle">{{$t('login.text4')}}</p>
      <div class="inputTipBox">
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model="userName" :placeholder="$t('login.text5')" @blur="checkInputBlur(1)">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: errTipShow}">{{$t('login.text5')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="password" v-model="userPwd" :placeholder="$t('login.text6')" @blur="checkInputBlur(2)">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: errTipShow2}">{{$t('login.text6')}}</span>
      </div>
      <button class="secret-btn" @click="loginFuc()">{{$t('login.text3')}}</button>
      <div class="forgetBox">
        <router-link class="secret-a" to="/getBackPwd">{{$t('login.text7')}}</router-link>
        <router-link class="secret-a" to="/register">{{$t('login.text8')}}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 背景颜色
$btn31 = #0080f4 // 按钮颜色
.login
  width 1000px
  height 600px
  margin 0 auto
  border-radius 12px
  margin-top 120px
  background-color #fff
  color $a8
  display flex
  overflow hidden
  .login-lf
    flex 1
    padding 60px
    .title
      margin-bottom 20px
      color #2d3436
      font-size 24px
    .list
      li
        margin-bottom 20px
        cursor pointer
        h4
          color #2d3436
          font-weight normal
        .list-content
          margin-top 20px
          margin-bottom 50px
          color #2d3436
          overflow hidden
          line-height 1.5
          display -webkit-box
          -webkit-line-clamp 3
          -webkit-box-orient vertical
          height 80px
    .moreNotice
      color $btn31
      cursor pointer
      user-select none
      font-size 16px
      &:active
        opacity .6
  .login-rt
    width 420px
    padding 60px 40px
    background-color #fff
    border 1px solid #e6e6e6
    .title
      font-size 24px
      color #2d3436
      margin-bottom 30px
    .subtitle
      margin-bottom 60px
      color #2d3436
    .inputTipBox
      padding-bottom 40px
      .secret-inputTip
        border 1px solid #e5e5e5
        padding 0 30px
        border-radius 24px
      .inputTipMsg
        top 14px
        &.inputTipMsgActive
          top 55px
    button.secret-btn
      margin-top 20px
      border-radius 24px
    .forgetBox
      display flex
      justify-content space-between
      margin-top 40px
      .secret-a
        line-height 1
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      userName: '',
      userPwd: '',
      errTipShow: false,
      errTipShow2: false
    }
  },
  computed: {
    ...mapGetters([
      'noticeData' // 公告列表
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.getNoticeList(1)
      this.$http.post(this.$api + '/user/balance').then((res) => { // 判断是否登录，登录过跳到首页，否则跳转登录
        if (res.data.success) {
          this.$router.push({ path: '/home' })
        }
      })
    })
  },
  methods: {
    checkInputBlur (val) {
      if (val === 1) {
        if (this.userName.trim() === '') {
          this.errTipShow = true
        } else {
          this.errTipShow = false
        }
      } else if (val === 2) {
        if (this.userPwd.trim() === '') {
          this.errTipShow2 = true
        } else {
          this.errTipShow2 = false
        }
      }
    },
    loginFuc () {
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('password', this.userPwd)
      if (this.userName.trim() !== '' && this.userPwd.trim() !== '') {
        this.$store.dispatch('loginAction', {formData: formData})
      } else {
        this.checkInputBlur(1)
        this.checkInputBlur(2)
      }
    },
    getNoticeList (page) {
      let formData = new FormData()
      formData.append('pageIndex', page)
      formData.append('pageSize', 6)
      this.$store.dispatch('noticeAction', {formData: formData})
    }
  }
}
</script>
