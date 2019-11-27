<template>
  <div class="getBackPwd myPopup">
    <div class="myPopupBox">
      <h3 class="secret-title">{{$t('login.getBackPwd.text1')}}</h3>
      <div class="stepOne" v-show="step === 1" @keyup.enter="goNext()">
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('login.getBackPwd.text2')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="text" v-model.trim="email" :placeholder="$t('login.getBackPwd.text3')" @focus="emailTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: emailTipShow}">{{$t('login.getBackPwd.text3')}}</span>
        </div>
        <button class="secret-btn" @click="goNext()">{{$t('login.getBackPwd.text4')}}</button>
      </div>
      <div class="stepTwo" v-show="step === 2">
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('login.getBackPwd.text5')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="password" v-model.trim="userPwd" :placeholder="$t('login.getBackPwd.text6')" @focus="userPwdTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: userPwdTipShow}">{{$t('login.getBackPwd.text6')}}</span>
        </div>
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('login.getBackPwd.text7')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="password" v-model.trim="rePassword" :placeholder="$t('login.getBackPwd.text8')" @focus="rePasswordTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: rePasswordTipShow}">{{$t('login.getBackPwd.text8')}}</span>
        </div>
        <ul class="secret-tab" v-if="codeTab === 4 || codeTab === 5">
          <li :class="{tabActive: codeTab === 4}" @click="codeTab = 4">{{$t('login.getBackPwd.text9')}}</li>
          <li :class="{tabActive: codeTab === 5}" @click="codeTab = 5">{{$t('login.getBackPwd.text10')}}</li>
        </ul>
        <div class="inputTipBox" :class="{inputTipBoxTab: codeTab === 4 || codeTab === 5}">
          <div class="inputTip-title">
            <span v-if="codeTab === 1">{{$t('login.getBackPwd.text9')}}</span>
            <span v-if="codeTab === 3">{{$t('login.getBackPwd.text11')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('login.getBackPwd.text12')" @focus="vCodeTipShow = false">
            <button class="secret-btn" v-show="codeTab === 3" ref="sendMsg" @click="sendPhoneCode()">{{$t('login.getBackPwd.text13')}}</button>
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: vCodeTipShow}">{{$t('login.getBackPwd.text12')}}</span>
        </div>
        <button class="secret-btn complete-btn" @click="completeFun()">{{$t('login.getBackPwd.text14')}}</button>
      </div>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('login.getBackPwd.text15')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('login.getBackPwd.text16')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$f2 = #f0f0f0 // 背景颜色
$btn31 = #0080f4 // 按钮颜色
.getBackPwd
  &.myPopup
    height calc(100% - 100px)
    top 100px
    background-color #f0f0f0
    display block
    .myPopupBox
      position absolute
      top 45%
      left 50%
      transform translate(-50%, -50%)
      .secret-btn,.secret-inputTip
        border-radius 24px
      .stepOne
        padding-bottom 150px
        .secret-btn
          margin-top 70px
      .stepTwo
        padding-bottom 40px
        .complete-btn
          margin-top 30px
        .secret-tab
          border 1px solid $btn31
          border-radius 24px
          margin-top 10px
          margin-bottom 20px
          li
            color $btn31
            &.tabActive
              color #fff
        .inputTipBoxTab
          .inputTipMsg
            top 30px
            &.inputTipMsgActive
              top 70px
</style>

<script>
export default{
  data () {
    return {
      step: 1,
      email: '',
      emailTipShow: false,
      userPwd: '',
      userPwdTipShow: false,
      rePassword: '',
      rePasswordTipShow: false,
      vCode: '',
      vCodeTipShow: false,
      codeTab: 1, // 1有谷歌没有手机，2有手机没有谷歌，3没有手机，没有谷歌，4既有手机也有谷歌
      userPhone: Number,
      openGoogleCode: 1,
      openMobileCode: 1,
      sendBtnTimes: 60,
      successShow: false // 设置成功弹窗
    }
  },
  methods: {
    goNext () {
      let regTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.email === '' || !regTest.test(this.email)) {
        this.emailTipShow = true
      } else {
        let url = `${this.$api}/user/findPasswordWeb?email=${this.email}`
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            this.step = 2
            this.openGoogleCode = res.data.data.openGoogleCode // 1未设置，2开启，3关闭
            this.openMobileCode = res.data.data.openMobileCode // 手机
            this.userPhone = res.data.data.mobile // 手机号码
            if (this.openGoogleCode === 2) {
              this.codeTab = 1 // 只有谷歌
            } else {
              this.codeTab = 3 // 谷歌和手机都没有
            }
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    completeFun () { // 完成
      if (this.userPwd === '') {
        this.userPwdTipShow = true
      }
      if (this.rePassword === '' || (this.userPwd !== this.rePassword)) {
        this.rePasswordTipShow = true
      }
      if (this.vCode === '') {
        this.vCodeTipShow = true
      }
      let formData = new FormData()
      let codeType
      formData.append('email', this.email)
      formData.append('code', this.vCode)
      formData.append('newpassword', this.userPwd)
      if (this.codeTab === 3) {
        codeType = '1' // 邮箱
      } else if (this.codeTab === 1 || this.codeTab === 4) {
        codeType = '3' // 谷歌
      }
      formData.append('type', codeType)
      if (this.userPwd !== '' && (this.userPwd === this.rePassword) && this.vCode !== '') {
        this.$http.post(this.$api + '/user/findPasswordWeb', formData).then((res) => {
          if (res.data.success) {
            this.sendBtnTimes = 0 // 关闭倒计时
            this.successShow = true
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('login.getBackPwd.text13')
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(201,0,16)'
        this.$refs.sendMsg.disabled = false
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        this.$refs.sendMsg.style.color = 'rgba(255,255,255,0.6)'
        setTimeout(() => this.countDown(), 1000)
      }
    },
    sendPhoneCode () { // 发送验证码
      let formData = new FormData()
      let sendCodeMsg // 发送提醒
      if (this.codeTab === 3) {
        formData.append('email', this.email)
        formData.append('type', 1) // 邮箱
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then(res => {
          if (res.data.success) {
            sendCodeMsg = this.$t('login.getBackPwd.text17')
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
    closeSuccessPopup () {
      this.successShow = false // 设置成功//  跳转路由(登录)
      this.$router.push({path: '/login'})
    }
  }
}
</script>
