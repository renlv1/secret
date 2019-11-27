<template>
  <div class="register myPopup">
    <div class="myPopupBox">
      <h3 class="secret-title">{{$t('register.text1')}}</h3>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span>{{$t('register.text2')}}</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="userName" :placeholder="$t('register.text3')" @focus="userNameTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: userNameTipShow}">{{$t('register.text3')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span>{{$t('register.text4')}}</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="email" :placeholder="$t('register.text5')" @focus="emailTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: emailTipShow}">{{$t('register.text5')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span>{{$t('register.text6')}}<i>{{$t('register.text7')}}</i></span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="password" v-model.trim="userPwd" :placeholder="$t('register.text8')" @focus="userPwdTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: userPwdTipShow}">{{$t('register.text8')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span>{{$t('register.text9')}}</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="password" v-model.trim="userPwdAgain" :placeholder="$t('register.text10')" @focus="userPwdAgainTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: userPwdAgainTipShow}">{{$t('register.text10')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span>{{$t('register.text11')}}</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('register.text12')" @focus="vCodeTipShow = false">
          <button class="secret-btn" ref="sendMsg" @click="sendPhoneCode()">{{$t('register.text13')}}</button>
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: vCodeTipShow}">{{$t('register.text12')}}</span>
      </div>
      <button class="secret-btn complete-btn" @click="completeFun()">{{$t('register.text14')}}</button>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('register.text15')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('register.text16')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.register
  &.myPopup
    height calc(100% - 100px)
    top 100px
    background-color #f0f0f0
    overflow auto
    @media (max-width: 1366px)
      display block
    .myPopupBox
      position absolute
      left 50%
      transform translate(-50%)
      padding-top 40px
      padding-bottom 40px
      .complete-btn
        border-radius 24px
      .inputTipBox
        .inputTip-title
          span
            i
              font-size 16px
</style>

<script>
export default{
  data () {
    return {
      userName: '',
      userNameTipShow: false,
      email: '',
      emailTipShow: false,
      userPwd: '',
      userPwdTipShow: false,
      userPwdAgain: '',
      userPwdAgainTipShow: false,
      vCode: '',
      vCodeTipShow: false,
      successShow: false,
      sendBtnTimes: 60
    }
  },
  methods: {
    completeFun () {
      let regTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.userName === '') {
        this.userNameTipShow = true
      }
      if (this.email === '' || !regTest.test(this.email)) {
        this.emailTipShow = true
      }
      if (this.userPwd === '') {
        this.userPwdTipShow = true
      }
      if (this.userPwdAgain.trim() === '' || (this.userPwd !== this.userPwdAgain)) {
        this.userPwdAgainTipShow = true
      }
      if (this.vCode === '') {
        this.vCodeTipShow = true
      }
      let formData = new FormData()
      formData.append('username', this.userName)
      formData.append('password', this.userPwd)
      formData.append('verifyCode', this.vCode)
      formData.append('email', this.email)
      if (this.userName.trim() !== '' && this.userPwd.trim() !== '' && (this.userPwd === this.userPwdAgain) && this.email.trim() !== '' && regTest.test(this.email) && this.vCode !== '') {
        this.$http.post(this.$api + '/register/registerUser', formData).then((res) => {
          if (res.data.success) {
            this.successShow = true
            this.sendBtnTimes = 0 // 关闭倒计时
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
        this.$refs.sendMsg.innerHTML = this.$t('register.text13')
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
      let sendCodeMsg // 发送提醒
      let regTest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.email.trim() === '' || !regTest.test(this.email)) {
        this.emailTipShow = true
      } else {
        let formData = new FormData()
        formData.append('email', this.email)
        formData.append('type', 1) // 邮箱
        this.$http.post(`${this.$api}/register/sendEmailCode`, formData).then(res => {
          if (res.data.success) {
            sendCodeMsg = this.$t('register.text17')
          } else {
            sendCodeMsg = res.data.msg
          }
          this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
        }).catch((err) => {
          console.log(err)
        })
        this.countDown()
      }
    },
    closeSuccessPopup () {
      this.successShow = false // 设置成功//  跳转路由(登录)
      this.$router.push({path: '/login'})
    }
  }
}
</script>
