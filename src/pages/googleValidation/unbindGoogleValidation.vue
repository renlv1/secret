<template>
  <div class="bindGoogleValidation secret-wrap">
    <router-link to="/userAccount" class="secret-back"><img src="../../assets/images/basic/back.png" alt="">{{$t('bindPhone.text1')}}</router-link>
    <div class="secret-wrap-ct">
      <h3 class="title">{{$t('googleValidation.text8')}}</h3>
      <ul class="secret-tab">
        <li :class="{tabActive: closeWay === 2}" @click="closeWay = 2">{{$t('googleValidation.text9')}}</li>
        <li :class="{tabActive: closeWay === 3}" @click="closeWay = 3">{{$t('googleValidation.text10')}}</li>
      </ul>
      <div class="googleCloseBox" v-if="closeWay === 2">
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('googleValidation.text11')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="password" v-model.trim="safePassword" :placeholder="$t('googleValidation.text12')" @focus="safePasswordTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: safePasswordTipShow}">{{$t('googleValidation.text12')}}</span>
        </div>
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('googleValidation.text13')}}</span>
          </div>
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="text" v-model.trim="googleCode" :placeholder="$t('googleValidation.text3')" @focus="googleCodeTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: googleCodeTipShow}">{{$t('googleValidation.text3')}}</span>
        </div>
        <button class="secret-btn" @click="comfirmClose()">{{$t('bindPhone.text12')}}</button>
      </div>
      <div v-if="closeWay === 3">
        <div class="noSet" v-if="setsafe === 2">{{$t('googleValidation.text14')}}</div>
        <div v-if="setsafe === 1">
          <div class="inputTipBox inputTipBox-select inputTipBoxOne">
            <div class="inputTip-title">
              <span>{{$t('googleValidation.text16')}} 1</span>
            </div>
            <div class="inputTipDiv inputTipDiv-one">
              <input class="secret-input secret-input-bordernone" type="text" readonly disabled :placeholder="questionList[0]">
            </div>
            <div class="inputTipBox input-answer-box">
              <div class="inputTipDiv">
                <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerOne" @input="answerOne = answerOne.substring(0, 50)" :placeholder="$t('googleValidation.text7')" @focus="answerOneTipShow = false">
                <span class="subNum">{{answerOne.length}}/50</span>
              </div>
              <span class="inputTipMsg" :class="{inputTipMsgActive: answerOneTipShow}">{{$t('googleValidation.text7')}}</span>
            </div>
          </div>
          <div class="inputTipBox inputTipBox-select">
            <div class="inputTip-title">
              <span>{{$t('googleValidation.text16')}} 2</span>
            </div>
            <div class="inputTipDiv inputTipDiv-two">
              <input class="secret-input secret-input-bordernone" type="text" readonly disabled :placeholder="questionList[1]">
            </div>
            <div class="inputTipBox input-answer-box">
              <div class="inputTipDiv">
                <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerTwo" @input="answerTwo = answerTwo.substring(0, 50)" :placeholder="$t('googleValidation.text7')" @focus="answerTwoTipShow = false">
                <span class="subNum">{{answerTwo.length}}/50</span>
              </div>
              <span class="inputTipMsg" :class="{inputTipMsgActive: answerTwoTipShow}">{{$t('googleValidation.text7')}}</span>
            </div>
          </div>
          <div class="inputTipBox inputTipBox-select">
            <div class="inputTip-title">
              <span>{{$t('googleValidation.text16')}} 3</span>
            </div>
            <div class="inputTipDiv inputTipDiv-three">
              <input class="secret-input secret-input-bordernone" type="text" readonly disabled :placeholder="questionList[2]">
            </div>
            <div class="inputTipBox input-answer-box">
              <div class="inputTipDiv">
                <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerThree" @input="answerThree = answerThree.substring(0, 50)" :placeholder="$t('googleValidation.text7')" @focus="answerThreeTipShow = false">
                <span class="subNum">{{answerThree.length}}/50</span>
              </div>
              <span class="inputTipMsg" :class="{inputTipMsgActive: answerThreeTipShow}">{{$t('googleValidation.text7')}}</span>
            </div>
          </div>
          <button class="secret-btn secret-btn-bind" @click="completeBind()">{{$t('bindPhone.text12')}}</button>
        </div>
      </div>
    </div>
    <!--关闭成功-->
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('googleValidation.text15')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('bindPhone.text12')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*$a8 = #7a8199 // 文字颜色
  $f2 = #1f222e // 背景颜色
  $c26 = #1a1c26 // 背景颜色
  $cor52 = #525666 // 字体颜色
  $btn31 = #c31739 // 按钮颜色
  $border = #33384d // 边框颜色*/
  $a8 = #2d3436 // 文字颜色
  $f2 = #fff // 背景颜色
  $c26 = #fff // 背景颜色
  $cor52 = #b3b3b3 // 字体颜色
  $btn31 = #0080f4 // 按钮颜色
  $border = #e5e5e5 // 边框颜色
  .bindGoogleValidation
    margin-top 100px
    .secret-wrap-ct
      width 720px
      .noSet
        padding 80px 0
        text-align center
      .googleCloseBox
        padding 40px
        background-color $f2
        border-radius 6px
        margin-top 40px
        .secret-inputTip
          background-color $f2
        .secret-btn
          margin-bottom 15px
      .secret-btn-bind
        margin-top 30px
      .inputTipBox
        &.inputTipBox-google
          .inputTipMsg
            top 13px
            &.inputTipMsgActive
              top 52px
        &.inputTipBoxOne
          margin-top 40px
        &.inputTipBox-select
          padding-bottom 10px
        .inputTipDiv
          border-radius 6px
          &.inputTipDiv-one
            z-index 30
          &.inputTipDiv-two
            z-index 29
          &.inputTipDiv-three
            z-index 28
          &.inputTipDiv-four
            z-index 27
          .selectMenu
            z-index 50
          .discount-btn
            right: 0;
            background-color: #c31739;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
            .arrowDown
              background url("../../assets/images/basic/arrow_down_white.png") no-repeat
        .input-answer-box
          margin-top 30px
          .inputTipDiv
            z-index 18
          .input-answer
            padding-right 80px
          .subNum
            position absolute
            right 20px
            top 13px
          .inputTipMsg
            top 14px
            &.inputTipMsgActive
              top 52px
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      lang: 'cn',
      questionList: [],
      // 安全密码
      safePassword: '',
      safePasswordTipShow: false,
      // 谷歌验证码
      googleCode: '',
      googleCodeTipShow: false,
      // 问题一
      answerOne: '',
      answerOneTipShow: false,
      // 问题二
      answerTwo: '',
      answerTwoTipShow: false,
      // 问题三
      answerThree: '',
      answerThreeTipShow: false,
      // 选择关闭谷歌的方式
      closeWay: 2,
      setsafe: 2, // 1：已设置安全问题  2：未设置安全问题
      successShow: false // 关闭成功弹窗
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  mounted () {
    this.$nextTick(() => {
      if (localStorage.getItem('secretWebLang') === 'CN') {
        this.lang = 'cn'
      } else {
        this.lang = 'en'
      }
      this.getMyQuestion()
      this.$store.dispatch('balanceAction') // 获取用户信息
    })
  },
  methods: {
    getMyQuestion () { //  查询我的安全问题(
      this.$http.post(this.$api + '/user/querySafeProblem', {}, {headers: {'secret-language': this.lang}}).then((res) => {
        if (res.data.success) {
          this.questionList = res.data.data
          this.setsafe = res.data.mapData.setsafe
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    comfirmClose () { // 谷歌验证码和安全密码关闭谷歌验证码
      if (this.safePassword === '') {
        this.safePasswordTipShow = true
      }
      if (this.googleCode === '') {
        this.googleCodeTipShow = true
      }
      if (this.safePassword !== '' && this.googleCode !== '') {
        this.closeGoogle()
      }
    },
    completeBind () { // 完成绑定
      if (this.answerOne === '') {
        this.answerOneTipShow = true
      }
      if (this.answerTwo === '') {
        this.answerTwoTipShow = true
      }
      if (this.answerThree === '') {
        this.answerThreeTipShow = true
      }
      if (this.answerOne !== '' && this.answerTwo !== '' && this.answerThree !== '') {
        this.closeGoogle()
      }
    },
    closeGoogle () {
      let formData = new FormData()
      formData.append('type', this.closeWay) // 开启谷歌验证码
      if (this.closeWay === 2) { // 通过谷歌验证码和安全密码关闭谷歌验证码
        formData.append('tradePwd', this.safePassword)
        formData.append('googleCode', this.googleCode)
      } else { // type===3通过安全密码关闭谷歌验证码
        formData.append('question1', this.questionList[0])
        formData.append('answer1', this.answerOne)
        formData.append('question2', this.questionList[1])
        formData.append('answer2', this.answerTwo)
        formData.append('question3', this.questionList[2])
        formData.append('answer3', this.answerThree)
      }
      this.$http.post(this.$api + '/user/googleOpenClose', formData, {headers: {'secret-language': this.lang}}).then((res) => {
        if (res.data.success) {
          this.successShow = true
        } else {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    closeSuccessPopup () { // 关闭谷歌验证码成功跳转回上个页面
      this.successShow = false
      this.$router.push('/userAccount')
    }
  }
}
</script>
