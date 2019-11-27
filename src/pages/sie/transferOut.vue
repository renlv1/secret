<template>
  <div class="transferOut">
    <div v-if="transferType === 2">
      <h3 class="secret-title">{{$t('transferOut.text3')}}</h3>
      <div class="secret-tab">
        <div @click="tabFn(1)" class="li interior2">{{$t('transferOut.text13')}}</div>
        <div @click="tabFn(2)" class="li rolloff2">{{$t('transferOut.text14')}}</div>
      </div>
      <p class="secret-subtitle">{{$t('transferOut.text2')}}</p>
    </div>
    <div v-if="transferType === 1">
      <h3 class="secret-title">{{$t('transferOut.text3')}}</h3>
      <div class="secret-tab">
        <div @click="tabFn(1)" class="li interior">{{$t('transferOut.text13')}}</div>
        <div @click="tabFn(2)" class="li rolloff">{{$t('transferOut.text14')}}</div>
      </div>
      <p class="secret-subtitle">{{$t('transferOut.text4')}}</p>
    </div>
    <div class="content">
      <div class="inputTipBox" v-if="transferType === 2">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('transferOut.text5')}}：</span>
        </div>
        <div class="inputTipDiv inputTipDiv-flex">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="receiveAddress" :placeholder="$t('transferOut.text6')" @focus="receiveAddressTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: receiveAddressTipShow}">{{$t('transferOut.text6')}}</span>
      </div>
      <div class="inputTipBox" v-if="transferType === 1">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('transferOut.text7')}}：</span>
        </div>
        <div class="inputTipDiv inputTipDiv-flex">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="receiveAddress" :placeholder="$t('transferOut.text8')" @focus="receiveAddressTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: receiveAddressTipShow}">{{$t('transferOut.text8')}}</span>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span v-if="transferType === 1"><i>2.</i>{{$t('transferOut.text9')}}{{userBalanceSIE | fourNumber}} SIE）</span>
          <span v-if="transferType === 2"><i>2.</i>{{$t('transferOut.text9')}}{{userBalanceSIE * (1 - outEthRate / 100) | fourNumber}} SIE）</span>
        </div>
        <div class="inputTipDiv inputTipDiv-flex">
          <input class="secret-inputTip secret-input" type="number" v-model.trim="transferNum" :placeholder="$t('transferOut.text10')" @input="checkTransferNum" @focus="transferNumTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: transferNumTipShow}">{{$t('transferOut.text10')}}</span>
      </div>
      <p class="fee" v-if="transferType === 2">{{$t('transferOut.text11')}}：<span>{{feeNumber | fourNumber}} SIE</span></p>
      <button class="secret-btn" @click="completeFun()">{{$t('transferOut.text12')}}</button>
    </div>
    <!--设置安全码弹窗-->
    <div class="myPopup" v-show="tradePasswordShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="tradePasswordShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('popoup.text1')}}</h3>
        <p class="subtitle">{{$t('popoup.text2')}}</p>
        <router-link tag="button" to="/safeSetting" class="secret-btn">{{$t('popoup.text3')}}</router-link>
      </div>
    </div>
    <div class="myPopup" v-show="bindPhoneShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="bindPhoneShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('popoup.text4')}}</h3>
        <router-link tag="button" to="/bindPhone" class="secret-btn">{{$t('popoup.text5')}}</router-link>
      </div>
    </div>
    <!--安全验证弹窗-->
    <div class="myPopup verificationPopup" v-show="verificationShow">
      <div class="myPopupBox">
        <div class="verificationForm">
          <h3 class="secret-title">{{payTitle}}</h3>
          <div class="inputTipBox">
            <div class="inputTip-title">
              <span>{{$t('popoup.text7')}}</span>
            </div>
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="password" v-model.trim="safePassword" :placeholder="$t('popoup.text8')" @focus="safePasswordTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: safePasswordTipShow}">{{$t('popoup.text8')}}</span>
          </div>
          <!--谷歌验证码-->
          <div class="inputTipBox" v-show="userInfo.openGoogleCode === 2">
            <div class="inputTip-title">
              <span>{{$t('popoup.text9')}}</span>
            </div>
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="payCode" :placeholder="$t('popoup.text10')" @focus="ggCodeTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: ggCodeTipShow}">{{$t('popoup.text10')}}</span>
          </div>
          <!--手机验证码-->
          <div class="inputTipBox" v-show="userInfo.openGoogleCode !== 2 && userInfo.openMobileCode === 2">
            <div class="inputTip-title">
              <span>{{$t('popoup.text11')}}</span>
            </div>
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="password" v-model.trim="payCode" :placeholder="$t('popoup.text12')" @focus="phoneCodeTipShow = false">
              <button class="secret-btn" ref="sendMsg" @click="sendPhoneCode()">{{$t('popoup.text13')}}</button>
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: phoneCodeTipShow}">{{$t('popoup.text12')}}</span>
          </div>
        </div>
        <div class="popupBtn">
          <button class="secret-btn" @click="verificationShow = false">{{$t('popoup.text14')}}</button>
          <button class="secret-btn" @click="confirmTransfer()">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
    <!-- 邮箱前4位-->
    <div class="myPopup verificationPopup" v-show="emailDialogShow">
      <div class="myPopupBox">
        <div class="verificationForm">
          <h3 class="secret-title">{{$t('login.getBackPwd.text11')}}</h3>
          <div class="inputTipDiv"><input type="text" :placeholder="$t('log.fiat.text16')" class="secret-inputTip secret-input" v-model.trim="fourCode"></div>
          <div class="error-desc">{{errorDesc}}</div>
        </div>
        <div class="popupBtn">
          <button class="secret-btn" @click="emailDialogShow = false">{{$t('popoup.text14')}}</button>
          <button class="secret-btn" @click="sureEmailCode">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$btn31 = #0080f4 // 按钮颜色
.myPopup
  .error-desc
    text-align: center
    color $btn31
    margin-top: 10px
  .input-box
    .input
      display: block;
      width: 100%;
      height: 48px;
      padding: 0 20px;
      border-radius: 6px;
      font-size: 18px;
      background-color: transparent;
      color: #fff;
      outline: none;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
.transferOut
  padding-top 60px
  .content
    width 660px
    .secret-btn
      margin-top 50px
    .fee
      margin-bottom 60px
      span
        color $btn31
</style>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@/components/globalDialog/dialog'
export default{
  data () {
    return {
      navActive: 1,
      payTitle: '',
      emailDialogShow: false,
      fourCode: '',
      errorDesc: '',
      receiveAddress: '', // 收货地址
      receiveAddressTipShow: false,
      transferNum: '', // 转出数量
      transferNumTipShow: false,
      verificationShow: false, // 验证弹窗
      tradePasswordShow: false,
      bindPhoneShow: false,
      safePassword: '',
      safePasswordTipShow: false,
      payCode: '', // 验证码
      ggCodeTipShow: false,
      phoneCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false, // 续费成功弹窗
      codeType: '' // 验证码类型（谷歌验证码。手机验证码）
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'userBalanceSIE',
      'outEthRate',
      'siePrice'
    ]),
    transferType () {
      return parseInt(this.navActive) // 1为内部转账，2为转出到第三方
    },
    feeNumber () {
      if (this.transferNum === '') {
        return 0
      }
      if ((parseFloat(this.transferNum) * this.outEthRate / 100) * this.siePrice < 3) {
        return 3 / this.siePrice
      } else {
        return parseFloat(this.transferNum) * this.outEthRate / 100
      }
    }
  },
  watch: {
    transferType: function () { // 监听type，切换时置地址和数量空
      this.receiveAddress = ''
      this.transferNum = ''
      this.receiveAddressTipShow = false
      this.transferNumTipShow = false
    }
  },
  methods: {
    tabFn (index) {
      this.navActive = index
    },
    sureEmailCode () {
      this.errorDesc = ''
      if (this.fourCode === '') {
        this.errorDesc = this.$t('log.fiat.text16')
      } else {
        this.$http.post(`${this.$api}/transferRecord/checkMailTransfer?receiveUser=${this.receiveAddress}&emailPrefix=${this.fourCode}`).then((res) => {
          if (res.data.success === true) {
            this.payTitle = `${this.$t('log.fiat.text17')} ${res.data.data.receiveUser} ${this.$t('log.fiat.text18')}`
            this.verificationShow = true
            this.emailDialogShow = false
          } else {
            this.errorDesc = res.data.msg
          }
        })
      }
    },
    checkTransferNum () {
      function fourNum (value) {
        if (!isNaN(value) && value !== null) {
          let f = Math.floor(value * 10000) / 10000
          let s = f.toString()
          let rs = s.indexOf('.')
          if (rs < 0) {
            rs = s.length
            s += '.'
          }
          while (s.length <= rs + 4) {
            s += '0'
          }
          return s
        }
      }
      if (this.transferType === 2) {
        if (fourNum(this.userBalanceSIE * (1 - this.outEthRate / 100)) < parseFloat(this.transferNum)) {
          this.transferNum = fourNum(Number(this.userBalanceSIE * (1 - this.outEthRate / 100)))
        }
      }
    },
    completeFun () {
      this.fourCode = ''
      this.errorDesc = ''
      console.log(this.userInfo.openGoogleCode)
      if (this.userInfo.openGoogleCode !== 2) {
        Dialog({
          msg: this.$t('buySie.text19'),
          okFn: () => {
            this.$router.push('/userAccount')
          }
        })
      } else {
        if (this.receiveAddress === '') {
          this.receiveAddressTipShow = true
        }
        if (this.transferNum === '') {
          this.transferNumTipShow = true
        }
        if (this.receiveAddress !== '' && this.transferNum !== '') {
          if (this.userInfo.openTradePassword === 1) {
            this.tradePasswordShow = true
          } else if (this.userInfo.openTradePassword === 2) {
            if (this.userInfo.openMobileCode !== 2 && this.userInfo.openGoogleCode !== 2) {
              this.bindPhoneShow = true
            } else {
              if (this.transferType === 1) {
                this.emailDialogShow = true
              } else {
                this.verificationShow = true // 弹出验证窗
              }
            }
          }
        }
      }
    },
    confirmTransfer () { // 确认支付
      if (this.safePassword === '') {
        this.safePasswordTipShow = true
      }
      if (this.payCode === '') {
        if (this.userInfo.openGoogleCode === 2) {
          this.ggCodeTipShow = true
        } else {
          this.phoneCodeTipShow = true
        }
      }
      if (this.safePassword !== '' && this.payCode !== '') {
        let msgTip
        let formData = new FormData()
        formData.append('receiveAddress', this.receiveAddress)
        formData.append('amount', this.transferNum)
        formData.append('type', this.transferType) // 类型 1:内部转出 2：以太坊转出
        formData.append('tradePwd', this.safePassword)
        formData.append('codeType', 2) // 1：手机验证码 2：谷歌验证码
        formData.append('code', this.payCode) // 验证码
        if (this.transferType === 1) {
          formData.append('emailPrefix', this.fourCode) // 邮箱前4位
        }
        this.$http.post('/transferRecord/transferOut', formData).then((res) => {
          this.receiveAddress = ''
          this.transferNum = ''
          if (res.data.success) {
            msgTip = this.$t('log.text11')
          } else {
            msgTip = res.data.msg
          }
          this.$store.dispatch('errAction', {bool: true, msg: msgTip}) // 弹窗提示
        })
        this.verificationShow = false // 关闭验证弹窗
        this.safePassword = '' // 清空支付密码
        this.payCode = '' // 清空验证码
        this.sendBtnTimes = 0 // 发送按钮倒计时
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('buySie.text17')
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
    sendPhoneCode () { // 发送手机验证码
      let sendCodeMsg
      let formData = new FormData()
      formData.append('json', JSON.stringify({'type': 'code'}))
      this.$http.post(this.$api + '/user/sendSmsCode', formData).then((res) => {
        if (res.data.success) {
          sendCodeMsg = this.$t('buySie.text16')
        } else {
          sendCodeMsg = res.data.msg
        }
        this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
      }).catch((err) => {
        console.log(err)
      })
      this.countDown()
    }
  }
}
</script>
