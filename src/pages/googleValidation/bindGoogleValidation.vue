<template>
  <div class="bindGoogleValidation secret-wrap">
    <router-link to="/userAccount" class="secret-back"><img src="../../assets/images/basic/back.png" alt="">{{$t('bindPhone.text1')}}</router-link>
    <div class="secret-wrap-ct">
      <h3 class="title">{{$t('googleValidation.text1')}}</h3>
      <div class="bindGoogleValidation-top">
        <div id="googleQrCode"></div>
        <h4>{{$route.query.openGgKey}}</h4>
        <p>{{$t('googleValidation.text2')}}</p>
      </div>
      <!--// setsafe:// 1：已设置安全问题  2：未设置安全问题-->
      <div v-show="parseInt($route.query.setsafe) === 2">
        <div class="inputTipBox inputTipBox-select inputTipBoxOne">
          <div class="inputTip-title">
            <span>{{$t('googleValidation.text16')}} 1</span>
          </div>
          <div class="inputTipDiv inputTipDiv-one">
            <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="questionOneValue">
            <a class="discount-btn" ref="discountBtn1" @click="openSelectMenu(1)"><i class="arrowDown" :class="{arrowActive: questionOneShow}"></i></a>
            <ul class="selectMenu" :class="{selectMenuActive: questionOneShow}">
              <li v-for="(item, index) in questionOneData" :key="index" @click="chooseQuestion(item.question, 1)">{{item.question}}</li>
            </ul>
          </div>
          <div class="inputTipBox input-answer-box">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerOne" @input="answerOne = answerOne.substring(0, 50); answerOne = answerOne.replace(/\s+/g, '')" :placeholder="$t('googleValidation.text7')" @focus="answerOneTipValue = ''">
              <span class="subNum">{{answerOne.length}}/50</span>
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: answerOneTipValue !== ''}">{{answerOneTipValue}}</span>
          </div>
        </div>
        <div class="inputTipBox inputTipBox-select">
          <div class="inputTip-title">
            <span>{{$t('googleValidation.text16')}} 2</span>
          </div>
          <div class="inputTipDiv inputTipDiv-two">
            <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="questionTwoValue">
            <a class="discount-btn" ref="discountBtn2" @click="openSelectMenu(2)"><i class="arrowDown" :class="{arrowActive: questionTwoShow}"></i></a>
            <ul class="selectMenu" :class="{selectMenuActive: questionTwoShow}">
              <li v-for="(item, index) in questionTwoData" :key="index" @click="chooseQuestion(item.question, 2)">{{item.question}}</li>
            </ul>
          </div>
          <div class="inputTipBox input-answer-box">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerTwo" @input="answerTwo = answerTwo.substring(0, 50); answerTwo = answerTwo.replace(/\s+/g, '')" :placeholder="$t('googleValidation.text7')" @focus="answerTwoTipValue = ''">
              <span class="subNum">{{answerTwo.length}}/50</span>
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: answerTwoTipValue !== ''}">{{answerTwoTipValue}}</span>
          </div>
        </div>
        <div class="inputTipBox inputTipBox-select">
          <div class="inputTip-title">
            <span>{{$t('googleValidation.text16')}} 3</span>
          </div>
          <div class="inputTipDiv inputTipDiv-three">
            <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="questionThreeValue">
            <a class="discount-btn" ref="discountBtn3" @click="openSelectMenu(3)"><i class="arrowDown" :class="{arrowActive: questionThreeShow}"></i></a>
            <ul class="selectMenu" :class="{selectMenuActive: questionThreeShow}">
              <li v-for="(item, index) in questionThreeData" :key="index" @click="chooseQuestion(item.question, 3)">{{item.question}}</li>
            </ul>
          </div>
          <div class="inputTipBox input-answer-box">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input input-answer" type="text" v-model.trim="answerThree" @input="answerThree = answerThree.substring(0, 50); answerThree = answerThree.replace(/\s+/g, '')" :placeholder="$t('googleValidation.text7')" @focus="answerThreeTipValue = ''">
              <span class="subNum">{{answerThree.length}}/50</span>
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: answerThreeTipValue !== ''}">{{answerThreeTipValue}}</span>
          </div>
        </div>
      </div>
      <div class="inputTipBox inputTipBox-google" :class="{marginTop50: parseInt($route.query.setsafe) === 1}">
        <div class="inputTipDiv inputTipDiv-four">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="googleCode" :placeholder="$t('googleValidation.text3')" @focus="googleCodeTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: googleCodeTipShow}">{{$t('googleValidation.text3')}}</span>
      </div>
      <button class="secret-btn secret-btn-bind" @click="completeBind()">{{$t('googleValidation.text4')}}</button>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('googleValidation.text5')}}</h3>
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
    .secret-btn-bind
      margin-top 30px
    .bindGoogleValidation-top
      background-color $f2
      padding 60px 40px
      text-align center
      border-radius 6px
      #googleQrCode
        width 200px
        height 200px
        padding 20px
        background-color #fff
        margin 0 auto
        display flex
        align-items center
        justify-content center
      h4
        font-size 18px
        font-weight normal
        color #fff
        margin-top 50px
        margin-bottom 25px
      p
        font-size 16px
    .inputTipBox
      &.inputTipBox-google
        &.marginTop50
          margin-top 50px
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
          height auto
          max-height 0
          &.selectMenuActive
            height auto
            max-height 340px
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
import $ from 'jquery'
export default{
  data () {
    return {
      lang: 'cn',
      questionList: [],
      // 问题一
      questionOneValue: this.$t('googleValidation.text6'),
      questionOneData: [],
      questionOneShow: false,
      answerOne: '',
      answerOneTipValue: '',
      // 问题二
      questionTwoValue: this.$t('googleValidation.text6'),
      questionTwoData: [],
      questionTwoShow: false,
      answerTwo: '',
      answerTwoTipValue: '',
      // 问题三
      questionThreeValue: this.$t('googleValidation.text6'),
      questionThreeData: [],
      questionThreeShow: false,
      answerThree: '',
      answerThreeTipValue: '',
      // 谷歌验证码
      googleCode: '',
      googleCodeTipShow: false,
      successShow: false // 绑定成功弹窗
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (localStorage.getItem('secretWebLang') === 'CN') {
        this.lang = 'cn'
      } else {
        this.lang = 'en'
      }
      this.getProblem() // 获取安全问题
      document.addEventListener('click', this.closeCodeMenu) // 点击其他地方关闭选择币种下拉菜单
      $('#googleQrCode').qrcode({
        render: 'canvas', //     table方式
        width: 180, //            宽度
        height: 180, //            高度
        text: this.$utf16to8(this.$route.query.openCodeUrl) // 绘制二维码
      })
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeCodeMenu) // 组件摧毁时关闭监听
  },
  methods: {
    getProblem () { // 获取安全问题
      this.$http.post(this.$api + '/user/getThreeSafeProblem', {}, {headers: {'secret-language': this.lang}}).then((res) => {
        if (res.data.success) {
          res.data.data.forEach((val) => {
            this.questionList.push({question: val})
          })
          this.questionOneData = this.questionList.concat()
          this.questionTwoData = this.questionList.concat()
          this.questionThreeData = this.questionList.concat()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    closeCodeMenu (event) { // 关闭下拉菜单弹窗
      if (!this.$refs.discountBtn1.contains(event.target)) {
        this.questionOneShow = false
      }
      if (!this.$refs.discountBtn2.contains(event.target)) {
        this.questionTwoShow = false
      }
      if (!this.$refs.discountBtn3.contains(event.target)) {
        this.questionThreeShow = false
      }
    },
    openSelectMenu (way) {
      if (way === 1) {
        this.questionOneShow = !this.questionOneShow
      } else if (way === 2) {
        this.questionTwoShow = !this.questionTwoShow
      } else {
        this.questionThreeShow = !this.questionThreeShow
      }
      this.questionOneData = []
      this.questionTwoData = []
      this.questionThreeData = []
      this.questionList.forEach((val) => {
        if (val.question !== this.questionOneValue && val.question !== this.questionTwoValue && val.question !== this.questionThreeValue) {
          this.questionOneData.push(val)
        }
      })
      this.questionList.forEach((val) => {
        if (val.question !== this.questionTwoValue && val.question !== this.questionOneValue && val.question !== this.questionThreeValue) {
          this.questionTwoData.push(val)
        }
      })
      this.questionList.forEach((val) => {
        if (val.question !== this.questionThreeValue && val.question !== this.questionOneValue && val.question !== this.questionTwoValue) {
          this.questionThreeData.push(val)
        }
      })
    },
    chooseQuestion (value, way) { // 选择问题
      if (way === 1) {
        this.questionOneValue = value
      } else if (way === 2) {
        this.questionTwoValue = value
      } else {
        this.questionThreeValue = value
      }
      this.questionOneShow = false
      this.questionTwoShow = false
      this.questionThreeShow = false
    },
    completeBind () { // 完成绑定
      if (this.questionOneValue === this.$t('googleValidation.text6')) {
        this.answerOneTipValue = this.$t('googleValidation.text6')
      } else if (this.answerOne === '') {
        this.answerOneTipValue = this.$t('googleValidation.text7')
      } else {
        this.answerOneTipValue = ''
      }
      if (this.questionTwoValue === this.$t('googleValidation.text6')) {
        this.answerTwoTipValue = this.$t('googleValidation.text6')
      } else if (this.answerTwo === '') {
        this.answerTwoTipValue = this.$t('googleValidation.text7')
      } else {
        this.answerTwoTipValue = ''
      }
      if (this.questionThreeValue === this.$t('googleValidation.text6')) {
        this.answerThreeTipShow = true
        this.answerThreeTipValue = this.$t('googleValidation.text6')
      } else if (this.answerThree === '') {
        this.answerThreeTipShow = true
        this.answerThreeTipValue = this.$t('googleValidation.text7')
      } else {
        this.answerThreeTipValue = ''
      }
      if (this.googleCode === '') {
        this.googleCodeTipShow = true
      }
      if (parseInt(this.$route.query.setsafe) === 2) { // 如果未设置安全问题
        if (this.answerOneTipValue === '' && this.answerTwoTipValue === '' && this.answerThreeTipValue === '' && this.googleCode !== '') {
          this.openGoogleFun()
        }
      } else if (parseInt(this.$route.query.setsafe) === 1) { // 如果已设置安全问题，那么只要验证谷歌样
        if (this.googleCode !== '') {
          this.openGoogleFun()
        }
      }
    },
    openGoogleFun () {
      let formData = new FormData()
      if (parseInt(this.$route.query.setsafe) === 2) {
        formData.append('question1', this.questionOneValue)
        formData.append('answer1', this.answerOne)
        formData.append('question2', this.questionTwoValue)
        formData.append('answer2', this.answerTwo)
        formData.append('question3', this.questionThreeValue)
        formData.append('answer3', this.answerThree)
      }
      formData.append('googleCode', this.googleCode)
      this.$http.post(this.$api + '/user/setSafeProblem', formData, {headers: {'secret-language': this.lang}}).then((res) => {
        if (res.data.success) {
          this.successShow = true
        } else {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    closeSuccessPopup () { // 绑定成功跳转回上个页面
      this.successShow = false
      this.$router.push('/userAccount')
    }
  }
}
</script>
