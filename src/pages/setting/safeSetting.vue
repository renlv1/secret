<template>
  <div class="bindPhone secret-wrap">
    <a class="secret-back" @click="$router.go(-1)"><img src="../../assets/images/basic/back.png" alt="">{{$t('safeSetting.text1')}}</a>
    <div class="secret-wrap-ct">
      <h3 class="title">{{$t('safeSetting.text2')}}</h3>
      <div class="inputTipBox inputTipBox-safe" style="z-index: 0">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('safeSetting.text3')}}</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="password" v-model.trim="safePwd" :placeholder="$t('safeSetting.text4')" @focus="safePwdTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: safePwdTipShow}">{{$t('safeSetting.text4')}}</span>
      </div>
      <p class="safePwdTip">{{$t('safeSetting.text3_1')}}</p>
      <div class="inputTipBox" style="z-index: 0">
        <div class="inputTip-title">
          <span><i>2.</i>{{$t('safeSetting.text5')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="password" v-model.trim="reSafePwd" :placeholder="$t('safeSetting.text6')" @focus="reSafePwdTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: reSafePwdTipShow}">{{$t('safeSetting.text6')}}</span>
      </div>
      <div class="inputTipBox" :class="{inputTipBoxTab: codeTab === 4 || codeTab === 5}">
        <div class="inputTip-title" v-if="codeTab === 1">
          <span><i>3.</i>{{$t('safeSetting.text9')}}：</span>
        </div>
        <div class="inputTip-title" v-if="codeTab === 3">
          <span><i>3.</i>{{$t('safeSetting.text10')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('safeSetting.text11')" @focus="vCodeTipShow = false">
          <button class="secret-btn" ref="sendMsg" v-show="codeTab === 2 || codeTab === 3 || codeTab === 5" @click="sendPhoneCode()">{{$t('bindPhone.text8')}}</button>
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: vCodeTipShow}">{{$t('safeSetting.text11')}}</span>
      </div>
      <button class="secret-btn complete-btn" @click="completeFun()">{{$t('safeSetting.text12')}}</button>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('safeSetting.text13')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('safeSetting.text14')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*  $f2 = #1f222e // 背景颜色
  $c26 = #1a1c26 // 背景颜色
  $btn31 = #c31739 // 按钮颜色
  $border = #33384d // 边框颜色*/
  $f2 = #fff // 背景颜色
  $c26 = #fff // 背景颜色
  $btn31 = #0080f4 // 按钮颜色
  $border = #e5e5e5 // 边框颜色
  .bindPhone
    margin-top 100px
    .safePwdTip
      font-size 16px
      margin-bottom 30px
    .inputTipBox
      padding-bottom 40px
      &.inputTipBox-safe
        padding-bottom 30px
      &.inputTipBoxTab
        .inputTipMsg
          top 12px
          &.inputTipMsgActive
            top 52px
    .secret-tab
      margin-bottom: 40px;
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      codeTab: 1, // 1有谷歌没有手机，2有手机没有谷歌，3没有手机，没有谷歌，4既有手机也有谷歌
      safePwd: '', // 安全密码
      safePwdTipShow: false,
      reSafePwd: '', // 确认安全密码
      reSafePwdTipShow: false,
      vCode: '',
      vCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  watch: {
    userInfo: function () {
      this.popUpTips()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('balanceAction') // 获取用户信息
    })
  },
  methods: {
    // 未开google验证码 使用邮箱验证
    popUpTips () {
      if (this.userInfo.openGoogleCode !== 2) {
        this.codeTab = 3
      }
    },
    // 去掉短信验证
    /* codeWayFun () {
      if (this.userInfo.openGoogleCode === 2) {
        this.codeTab = 1 // 只有谷歌
        if (this.userInfo.openMobileCode === 2) {
          this.codeTab = 4 // 谷歌和手机都有
        }
      } else if (this.userInfo.openMobileCode === 2) {
        this.codeTab = 2 // 只有手机
      } else {
        this.codeTab = 3 // 谷歌和手机都没有
      }
    }, */
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('bindPhone.text8')
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(0, 131, 245, 0.9)'
        this.$refs.sendMsg.disabled = false
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        this.$refs.sendMsg.style.color = 'rgba(43, 52, 54, 0.9)'
        setTimeout(() => this.countDown(), 1000)
      }
    },
    sendPhoneCode () { // 发送验证码
      let formData = new FormData()
      let sendCodeMsg // 发送提醒
      if (this.codeTab === 3) {
        formData.append('email', this.userInfo.email)
        formData.append('type', 1) // 邮箱
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then(res => {
          if (res.data.success) {
            sendCodeMsg = this.$t('safeSetting.text15')
          } else {
            sendCodeMsg = res.data.msg
          }
          this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.codeTab === 2 || this.codeTab === 5) {
        formData.append('json', JSON.stringify({'type': 'code'}))
        this.$http.post(this.$api + '/user/sendSmsCode', formData).then((res) => {
          if (res.data.success) {
            sendCodeMsg = this.$t('safeSetting.text15')
          } else {
            sendCodeMsg = res.data.msg
          }
          this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
        }).catch((err) => {
          console.log(err)
        })
      }
      this.countDown()
    },
    completeFun () {
      if (this.safePwd === '') {
        this.safePwdTipShow = true
      }
      if (this.reSafePwd === '' || this.safePwd !== this.reSafePwd) {
        this.reSafePwdTipShow = true
      }
      if (this.vCode === '') {
        this.vCodeTipShow = true
      }
      if (this.safePwd !== '' && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/).test(this.safePwd) && this.safePwd === this.reSafePwd && this.vCode !== '') {
        let codeType
        if (this.codeTab === 3) {
          codeType = 1 // 邮箱
        } else if (this.codeTab === 1 || this.codeTab === 4) {
          codeType = 3 // 谷歌
        }
        let formData = new FormData()
        formData.append('tradePwd', this.safePwd)
        formData.append('verifyCode', this.vCode)
        formData.append('type', codeType)
        this.$http.post(this.$api + '/user/setTractionPwdNew', formData).then(res => {
          if (res.data.success) {
            this.sendBtnTimes = 0 // 关闭倒计时
            this.successShow = true
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
          }
        })
      }
    },
    closeSuccessPopup () {
      this.successShow = false // 设置成功//  跳转路由(登录)
      this.$router.go(-1)
    }
  }
}
</script>
