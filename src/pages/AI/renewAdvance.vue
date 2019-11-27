<template>
  <div class="renewAdvance secret-content72">
    <div class="breadcrumb">
      <router-link :to="{path: '/home/myAi'}">{{$t('AI.renewAdvance.text1')}}<i></i></router-link>
      <router-link v-if="currentAiObj.product" :to="{path: '/home/myAi/aiManage', query: {aiId: currentAiObj.product.id}}">{{$t('AI.renewAdvance.text2')}}<i></i></router-link>
      <a v-if="!$route.query.type">{{$t('AI.renewAdvance.text3')}}</a>
      <a v-if="$route.query.type">{{$t('AI.renewAdvance.text4')}}</a>
    </div>
    <ul>
      <li class="fst-li">
        <h3 v-if="currentAiObj.product">{{currentAiObj.product.name}}{{$t('AI.renewAdvance.text5')}}</h3>
        <p>{{$t('AI.renewAdvance.text6')}}：{{$changeDate(currentAiObj.userEndTime, '/', 1)}}</p>
        <span>{{$t('AI.renewAdvance.text7')}}：{{renewPrice}} SIE/{{$t('AI.renewAdvance.text11')}}</span>
      </li>
      <li class="scd-li">
        <div class="inputTipBox">
          <div class="inputTip-title">
            <span>{{$t('AI.renewAdvance.text8')}}：</span>
          </div>
          <div class="inputTipDiv inputTipDiv-flex">
            <input class="secret-inputTip secret-input" type="text" v-model.trim="incrementYear" :placeholder="$t('AI.renewAdvance.text9')" @input="checkNum" @focus="incrementYearTipShow = false">
            <span>{{$t('AI.renewAdvance.text11')}}</span>
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: incrementYearTipShow}">{{$t('AI.renewAdvance.text9')}}</span>
        </div>
        <p class="endTime">{{$t('AI.renewAdvance.text12')}}：{{expireDate}}</p>
        <p class="cost">{{$t('AI.renewAdvance.text13')}}：{{ incrementYear === '' ? 0 : parseInt(incrementYear) * renewPrice | fourNumber}} SIE</p>
        <button class="secret-btn" @click="sureFun()">{{$t('popoup.text15')}}</button>
      </li>
    </ul>
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
          <button class="secret-btn" @click="confirmRenew()">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('AI.renewAdvance.text14')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('popoup.text15')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*
$f2 = #1f222e // 背景颜色
$cor52 = #525666 // 字体颜色
*/

$a8 = #2d3436 // 文字颜色
$f2 = #f0f0f0 // 背景颜色
$cor52 = #2d3436 // 字体颜色
$c26 = #fff // 背景颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.renewAdvance
  ul
    margin-top 40px
    li
      padding 30px 40px
      margin-bottom 30px
      border-radius 6px
      border 1px solid #e5e5e5
      &.fst-li
        font-size 0
        h3
          font-size 18px
          font-weight normal
          margin-bottom 30px
        p
          font-size 16px
          margin-bottom 10px
        span
          font-size 16px
      &.scd-li
        padding-bottom 60px
        .inputTipBox
          .inputTipDiv
            display flex
            align-items center
            background-color #fff
            .secret-inputTip
              background-color #fff
            span
              font-size 20px
              margin-left 20px
        .endTime
          color #999
        .cost
          font-size 20px
          color $btn31
          margin-top 60px
          margin-bottom 40px
</style>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@/components/globalDialog/dialog'
export default{
  data () {
    return {
      renewPrice: 0,
      currentAiObj: Object,
      incrementYear: '',
      incrementYearTipShow: false,
      orderId: '',
      verificationShow: false, // 验证弹窗
      tradePasswordShow: false,
      bindPhoneShow: false,
      safePassword: '',
      safePasswordTipShow: false,
      payCode: '', // 验证码
      ggCodeTipShow: false,
      phoneCodeTipShow: false,
      sendBtnTimes: 60,
      successShow: false // 续费成功弹窗
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renewPrice = parseFloat(this.$route.query.renewPrice)
      this.getMyAi() // 获取我的人工智能列表中---当前人工智能的管理数据
    })
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ]),
    expireDate () {
      if (this.incrementYear !== '') {
        return this.$changeDate((this.currentAiObj.userEndTime + 31536000000 * parseInt(this.incrementYear)), '/', 1)
      } else {
        return this.$changeDate(this.currentAiObj.userEndTime, '/', 1)
      }
    }
  },
  methods: {
    checkNum () { // 让用户输入增值年限为整数
      let re = /^\d*$/
      if (!re.test(this.incrementYear)) {
        isNaN(parseInt(this.incrementYear)) ? this.incrementYear = '' : this.incrementYear = parseInt(this.incrementYear)
      }
      if (/^0\d+/.test(this.incrementYear)) { // "0" + "数字"开头
        this.incrementYear = 0
      }
      if (this.incrementYear.length >= 6) {
        this.incrementYear = this.incrementYear.substring(0, this.incrementYear.length - 1)
      }
    },
    getMyAi () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 20)
      this.$http.post(this.$api + '/product/queryBuyRobot', formData).then((res) => {
        if (res.data.success) {
          let darwinSetsArr = res.data.data.darwinSets
          darwinSetsArr.forEach((item) => {
            if (parseInt(this.$route.query.aiId) === item.product.id) {
              this.currentAiObj = item
            }
          })
        }
      })
    },
    sureFun () {
      if (this.userInfo.openGoogleCode !== 2) {
        Dialog({
          msg: this.$t('buySie.text19'),
          okFn: () => {
            this.$router.push('/userAccount')
          }
        })
      } else {
        let renewYear
        if (this.incrementYear === '') {
          this.incrementYearTipShow = true
        } else if (this.userInfo.openTradePassword === 1) {
          this.tradePasswordShow = true
        } else if (this.userInfo.openTradePassword === 2) {
          if (this.userInfo.openMobileCode !== 2 && this.userInfo.openGoogleCode !== 2) {
            this.bindPhoneShow = true
          } else {
            if (this.$route.query.type && parseInt(this.$route.query.type) === 1) {
              renewYear = 1
            } else {
              renewYear = this.incrementYear
            }
            this.$http.post(this.$api + '/product/renewRobotAi?renewyear=' + renewYear + '&productid=' + this.currentAiObj.product.id).then((res) => { // 提前续费生成订单
              if (res.data.success) {
                this.verificationShow = true // 弹出验证窗
                this.orderId = res.data.data.id
              } else {
                this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      }
    },
    confirmRenew () {
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
        let url = `${this.$api}/transaction/paymentByOrderId?orderid=${this.orderId}&tradePwd=${this.safePassword}&code=${this.payCode}` // 提前续费
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            this.successShow = true
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
          }
        }).catch((err) => {
          console.log(err)
        })
        this.verificationShow = false // 关闭安全验证弹窗
        this.safePassword = '' // 清空支付密码
        this.payCode = '' // 清空验证码
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('popoup.text13')
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
          sendCodeMsg = this.$t('popoup.text16')
        } else {
          sendCodeMsg = res.data.msg
        }
        this.$store.dispatch('errAction', {bool: true, msg: sendCodeMsg}) // 弹窗提示
      }).catch((err) => {
        console.log(err)
      })
      this.countDown()
    },
    closeSuccessPopup () { // 续费成功跳转我的人工智能
      this.successShow = false
      this.incrementYear = ''
      this.sendBtnTimes = 0 // 发送按钮倒计时
      this.$router.push('/home/myAi')
    }
  }
}
</script>
