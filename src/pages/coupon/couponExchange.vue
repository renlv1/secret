<template>
  <div class="couponExchange secret-content66">
    <v-breadcrumb :breadcrumbList="$t('couponExchange.breadcrumbList')"></v-breadcrumb>
    <ul class="secret-list">
      <li @click="checkedCoupon(2)">
        <div class="li-lf">
          <h3 class="title">{{$t('couponExchange.text1')}}：</h3>
          <p>{{aitotalAmount | fourNumber}}</p>
        </div>
        <div class="li-rt">
          <a class="copy-btn" :class="{checked: exchangeType === 2}"></a>
        </div>
      </li>
      <li @click="checkedCoupon(1)">
        <div class="li-lf">
          <h3 class="title">{{$t('couponExchange.text2')}}：</h3>
          <p>{{sumtotalAmount | fourNumber}}</p>
        </div>
        <div class="li-rt">
          <a class="copy-btn" :class="{checked: exchangeType === 1}"></a>
        </div>
      </li>
      <li @click="checkedCoupon(3)">
        <div class="li-lf">
          <h3 class="title">{{$t('coupon.text13')}}：</h3>
          <p>{{pkAmount | fourNumber}}</p>
        </div>
        <div class="li-rt">
          <a class="copy-btn" :class="{checked: exchangeType === 3}"></a>
        </div>
      </li>
    </ul>
    <div class="inputTipBox couponExchange-inputTipBox">
      <div class="inputTip-title">
        <span v-if="exchangeType === 2">{{$t('couponExchange.text3')}}{{aitotalAmount * sieRatio | fourNumber}} SIE）</span>
        <span v-if="exchangeType === 1">{{$t('couponExchange.text3')}}{{sumtotalAmount * sieRatio | fourNumber}} SIE）</span>
        <span v-if="exchangeType === 3">{{$t('couponExchange.text3')}}{{pkAmount * sieRatio | fourNumber}} SIE）</span>
      </div>
      <div class="inputTipDiv inputTipDiv-flex">
        <input class="secret-inputTip secret-input" type="number" v-model.trim="exchangeNum" :placeholder="$t('couponExchange.text4')" @input="checkExchangeNum()" @focus="exchangeNumTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: exchangeNumTipShow}">{{inputTip}}</span>
    </div>
    <button class="secret-btn couponExchange-btn" @click="completeFun()">{{$t('couponExchange.text5')}}</button>
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
          <h3 class="secret-title">{{$t('popoup.text6')}}</h3>
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
          <button class="secret-btn" @click="confirmBuy()">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
    <!--兑换成功弹窗-->
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="successShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('couponExchange.text7')}}</h3>
        <router-link tag="button" to="/home/coupon" class="secret-btn">{{$t('popoup.text15')}}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$border = #33384d // 边框颜色*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$border = #e5e5e5 // 边框颜色
.couponExchange
  .secret-list
    margin-top 40px
    li
      background-color $c26
      border 1px solid $border
      cursor pointer
      .li-lf
        .title
          color $cor52
        p
          color $a8
          font-size 20px
          font-weight bold
      .li-rt
        .copy-btn
          border-radius 3px
          background-color $border
          &.checked
            background url("../../assets/images/basic/checked.png") no-repeat
            background-size cover
  .couponExchange-inputTipBox
    margin-top 60px
  .couponExchange-btn
    margin-top 50px
</style>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@/components/globalDialog/dialog'
export default{
  data () {
    return {
      exchangeType: 2, // 2兑换达尔文，1持有量
      exchangeNum: '',
      exchangeNumTipShow: false,
      inputTip: this.$t('couponExchange.text4'),
      verificationShow: false, // 验证弹窗
      tradePasswordShow: false,
      bindPhoneShow: false,
      safePassword: '',
      safePasswordTipShow: false,
      payCode: '', // 验证码
      ggCodeTipShow: false,
      phoneCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false // 兑换成功弹窗
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.type) {
        this.exchangeType = parseInt(this.$route.query.type)
      }
      this.$store.dispatch('exchangeRatio')
    })
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'aitotalAmount', // 达尔文优惠券
      'sumtotalAmount', // 持有量优惠券
      'pkAmount', // PK优惠券
      'language', // 语言
      'sieRatio' // 优惠值兑换SIE比例
    ])
  },
  watch: {
    language: function () { // 监听语言切换，不然提示消息不改变成英文或者中文
      this.inputTip = this.$t('couponExchange.text4')
    }
  },
  methods: {
    checkExchangeNum () {
      if (!/^\d*\.{0,1}\d{0,1}$/.test(this.exchangeNum)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过4位小数
        this.exchangeNum = this.exchangeNum.substring(0, this.exchangeNum.length - 1)
      }
      if (/^0\d+/.test(this.exchangeNum)) { // "0" + "数字"开头
        this.exchangeNum = '0'
      }
    },
    checkedCoupon (val) {
      this.exchangeType = val
      this.exchangeNumTipShow = false
    },
    completeFun () {
      if (this.userInfo.openGoogleCode !== 2) {
        Dialog({
          msg: this.$t('buySie.text19'),
          okFn: () => {
            this.$router.push('/userAccount')
          }
        })
      } else {
        if (this.exchangeNum === '') {
          this.exchangeNumTipShow = true
        } else if (parseFloat(this.exchangeNum) > (this.aitotalAmount * this.sieRatio) && this.exchangeType === 2) { // 如果超出则提醒
          this.exchangeNumTipShow = true
          this.inputTip = this.$t('couponExchange.text6')
        } else if (parseFloat(this.exchangeNum) > this.sumtotalAmount * this.sieRatio && this.exchangeType === 1) {
          this.exchangeNumTipShow = true
          this.inputTip = this.$t('couponExchange.text6')
        } else if (parseFloat(this.exchangeNum) > this.pkAmount * this.sieRatio && this.exchangeType === 3) {
          this.exchangeNumTipShow = true
          this.inputTip = this.$t('couponExchange.text6')
        } else if (this.userInfo.openTradePassword === 1) {
          this.tradePasswordShow = true
        } else if (this.userInfo.openTradePassword === 2) {
          if (this.userInfo.openMobileCode !== 2 && this.userInfo.openGoogleCode !== 2) {
            this.bindPhoneShow = true
          } else {
            this.verificationShow = true // 弹出验证窗
          }
        }
      }
    },
    confirmBuy () { // 确认支付
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
        formData.append('amount', this.exchangeNum / 0.1)
        formData.append('type', this.exchangeType)
        formData.append('tradePwd', this.safePassword)
        formData.append('code', this.payCode)
        this.$http.post('/userDiscount/discountToSie', formData).then((res) => {
          if (res.data.success) {
            this.successShow = true
            this.$store.dispatch('balanceAction') // 兑换成功后获取用户信息
          } else {
            msgTip = res.data.msg
            this.$store.dispatch('errAction', {bool: true, msg: msgTip}) // 弹窗提示
          }
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
