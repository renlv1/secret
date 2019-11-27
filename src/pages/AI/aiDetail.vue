<template>
  <div class="aiDetail secret-content72">
    <v-breadcrumb :breadcrumbList="$t('AI.aiDetail.breadcrumbList')"></v-breadcrumb>
    <ul class="secret-list">
      <li>
        <div class="li-lf">
          <h3 class="secret-title" v-if="aiObj">{{language === 1 ? aiObj.name: aiObj.nameen}}</h3>
          <!--除了达尔文之外都隐藏开通，开通价格自动续费-->
          <div v-if="parseInt($route.query.aiId) === 1">
            <p class="title">{{$t('AI.aiDetail.text1')}}：{{aiTotal.showSieTotal | fourNumber}}SIE</p>
            <div class="chekedBox" @click="isCheck = !isCheck">
              <a class="checked-btn" :class="{checked: isCheck}"></a>
              <span>{{$t('AI.aiDetail.text2')}}</span>
            </div>
          </div>
        </div>
        <div class="li-rt" v-if="parseInt($route.query.aiId) === 1">
          <button class="secret-btn" @click="openAI()" v-if="aiObj.total !== 0">{{$t('AI.aiDetail.text3')}}</button>
        </div>
      </li>
      <li>
        <h3 class="secret-title">{{language === 1 ? aiObj.name: aiObj.nameen}} {{$t('AI.aiDetail.text4')}}</h3>
        <p class="info" v-html="language === 1 ? aiObj.content: aiObj.contenten"></p>
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
          <button class="secret-btn" @click="confirmOpenAi()">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('AI.aiDetail.text5')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('popoup.text15')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$border = #e5e5e5 // 边框颜色
.aiDetail
  .secret-list
    margin-top 40px
    li
      height auto
      padding 30px 40px
      .li-lf
        font-size 16px
        .title
          margin-bottom 10px
        .chekedBox
          display flex
          align-items center
          font-size 0
          cursor pointer
          user-select none
          .checked-btn
            display inline-block
            width 16px
            height 16px
            border-radius 3px
            background-color $border
            &.checked
              background url("../../assets/images/basic/checked.png") no-repeat
              background-size cover
          span
            margin-left 10px
            font-size 16px
      .li-rt
        padding-top 50px
        .secret-btn
          width 140px
          height 40px
          border-radius 4px
      &:last-child
        display block
        padding-bottom 70px
        .secret-title
          margin-bottom 25px
        .info
          line-height 1.5
</style>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@/components/globalDialog/dialog'
export default{
  data () {
    return {
      isCheck: false,
      aiObj: Object,
      aiTotal: Object,
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
      successShow: false // 开通成功弹窗
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'language'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.getNotBuyRobot()
      this.showAiTotal()
    })
  },
  methods: {
    getNotBuyRobot () {
      this.$http.post(`${this.$api}/product/queryNotBuyRobot?pageIndex=1&pageSize=20`).then(res => {
        let ret = res.data
        if (ret.state === 'success' && ret.success === true) {
          let productsArr = ret.data.products
          productsArr.forEach((item) => {
            if (item.id === parseInt(this.$route.query.aiId)) {
              this.aiObj = item
            }
          })
        }
      })
    },
    showAiTotal () {
      this.$http.post(`${this.$api}/product/showOpenRobotAiTotal?productid=${this.$route.query.aiId}`).then((res) => {
        if (res.data.success) {
          this.aiTotal = res.data.data
        }
      })
    },
    openAI () { // 点击开通弹窗
      if (this.userInfo.openGoogleCode !== 2) {
        Dialog({
          msg: this.$t('buySie.text19'),
          okFn: () => {
            this.$router.push('/userAccount')
          }
        })
      } else {
        let formData = new FormData()
        let isAuth = 1
        if (this.ischeck === true) {
          isAuth = 2
        } else {
          isAuth = 1
        }
        if (this.userInfo.openTradePassword === 1) {
          this.tradePasswordShow = true
        } else if (this.userInfo.openTradePassword === 2) {
          if (this.userInfo.openMobileCode !== 2 && this.userInfo.openGoogleCode !== 2) {
            this.bindPhoneShow = true
          } else {
            formData.append('openorrenew', 1)
            formData.append('productid', this.$route.query.aiId)
            this.$http.post(`${this.$api}/product/openRobotAi?openorrenew=1&isAuth=${isAuth}&productid=${this.$route.query.aiId}`).then((res) => {
              if (res.data.success) {
                this.orderId = res.data.data.id
                this.verificationShow = true // 弹出验证窗
              } else {
                this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 错误提示
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      }
    },
    confirmOpenAi () {
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
        let url = `${this.$api}/transaction/paymentByOrderId?orderid=${this.orderId}&tradePwd=${this.safePassword}&code=${this.payCode}`
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            this.successShow = true
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
          }
        }).catch((err) => {
          console.log(err)
        })
        this.verificationShow = false // 关闭验证弹窗
        this.safePassword = '' // 清空支付密码
        this.payCode = '' // 清空验证码
        this.sendBtnTimes = 0 // 发送按钮倒计时
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = this.$t('popoup.text13') // 发送
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
    closeSuccessPopup () { // 开通成功跳转我的人工智能
      this.successShow = false
      this.$router.push('/home/myAi')
    }
  }
}
</script>
