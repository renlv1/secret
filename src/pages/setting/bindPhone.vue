<template>
  <div class="bindPhone secret-wrap">
    <a class="secret-back" @click="$router.go(-1)"><img src="../../assets/images/basic/back.png" alt="">{{$t('bindPhone.text1')}}</a>
    <div class="secret-wrap-ct">
      <h3 class="title">{{$t('bindPhone.text2')}}</h3>
      <div class="inputTipBox inputTipBox-select">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('bindPhone.text3')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="codeValue">
          <a class="discount-btn" ref="discountBtn" @click="codeSelectShow = !codeSelectShow"><i class="arrowDown" :class="{arrowActive: codeSelectShow}"></i></a>
          <ul class="selectMenu" :class="{selectMenuActive: codeSelectShow}">
            <li v-for="(item, index) in areaCodeData" :key="index" @click="chooseCode(item.code, index)">{{item.value}}</li>
          </ul>
        </div>
      </div>
      <div class="inputTipBox" style="z-index: 0">
        <div class="inputTip-title">
          <span><i>2.</i>{{$t('bindPhone.text4')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="phoneNum" :placeholder="$t('bindPhone.text5')" @focus="phoneNumTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: phoneNumTipShow}">{{$t('bindPhone.text5')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span><i>3.</i>{{$t('bindPhone.text6')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="vCode" :placeholder="$t('bindPhone.text7')" @focus="vCodeTipShow = false">
          <button class="secret-btn" ref="sendMsg" @click="sendPhoneCode()">{{$t('bindPhone.text8')}}</button>
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: vCodeTipShow}">{{$t('bindPhone.text9')}}</span>
      </div>
      <button class="secret-btn complete-btn" @click="completeFun()">{{$t('bindPhone.text10')}}</button>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('bindPhone.text11')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('bindPhone.text12')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$btn31 = #c31739 // 按钮颜色
$border = #33384d // 边框颜色*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.bindPhone
  margin-top 100px
  .inputTipBox
    padding-bottom 40px
    &.inputTipBox-select
      .inputTipDiv
        .secret-input.secret-input-bordernone
          border 1px solid $border
          background-color $c26
        .selectMenu.selectMenuActive
          height 140px
          z-index 999
          overflow-x hidden
          overflow-y auto
          &::-webkit-scrollbar
            width 0px
            height 0px
        .discount-btn
          right 0
          background-color $btn31
          border-bottom-right-radius 6px
          border-top-right-radius 6px
          .arrowDown
            background url("../../assets/images/basic/arrow_down_white.png") no-repeat
        .selectMenuActive
          height 100px
</style>

<script>
export default{
  data () {
    return {
      codeValue: '+86', // 区号
      areaCodeNum: '86',
      codeSelectShow: false, // 区号下拉菜单
      areaCodeData: [],
      phoneNum: '', // 手机号
      phoneNumTipShow: false,
      vCode: '',
      vCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeCodeMenu) // 点击其他地方关闭选择币种下拉菜单
      this.getAreaCode()
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeCodeMenu) // 组件摧毁时关闭监听
  },
  methods: {
    closeCodeMenu (event) {
      if (!this.$refs.discountBtn.contains(event.target)) {
        this.codeSelectShow = false
      }
    },
    getAreaCode () { // 获取区号
      let timestamp = Date.parse(new Date())
      this.$http.post(this.$api + '/app/globalParam?lastUpdateDate=' + timestamp).then((res) => {
        if (res.data.success) {
          this.areaCodeData = res.data.data.phonecode.cn
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    chooseCode (value) { // 选择区号
      this.areaCodeNum = value
      this.codeValue = '+' + value
      this.codeSelectShow = false
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('bindPhone.text8')
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
    sendPhoneCode () {
      if (this.phoneNum === '') {
        this.phoneNumTipShow = true
      } else {
        let sendCodeMsg
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'register', 'mobile': this.phoneNum, 'phoneCode': this.areaCodeNum}))
        this.$http.post(this.$api + '/user/sendSmsCode', formData).then((res) => {
          if (res.data.success) {
            sendCodeMsg = this.$t('bindPhone.text13')
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
    completeFun () { // 完成
      if (this.phoneNum === '') {
        this.phoneNumTipShow = true
      } else if (this.vCode === '') {
        this.vCodeTipShow = true
      } else {
        let formData = new FormData()
        formData.append('phonecode', this.areaCodeNum)
        formData.append('phone', this.phoneNum)
        formData.append('code', this.vCode)
        this.$http.post(this.$api + '/user/modifyUserInfo', formData).then((res) => {
          if (res.data.success) {
            this.sendBtnTimes = 0 // 关闭倒计时
            this.successShow = true
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: this.$t('bindPhone.text14')})
          }
        }).catch((err) => {
          console.log(err)
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
