<template>
  <div class="buySie">
    <div class="priceTrend">
      <h3 class="secret-title">{{$t('buySie.text1')}}</h3>
      <p class="subtitle">{{$t('buySie.text2')}}： {{balanceData.siePrice | fourNumber}}</p>
      <div class="kLineBox">
        <div id="myChart" :style="{width: '720px', height: '360px'}"></div>
      </div>
    </div>
    <div class="buyIn">
      <h3 class="secret-title">{{$t('buySie.text3')}}</h3>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('buySie.text4')}}：</span>
          <span>{{$t('buySie.text5')}}：{{balanceData.siePrice | fourNumber}}USD</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-inputTip secret-input" type="number" v-model.trim="buyNum" :placeholder="$t('buySie.text6')" @input="checkBuyNum()" @focus="buyNumTipShow = false">
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: buyNumTipShow}">{{buyNumTip}}</span>
      </div>
      <div class="inputTipBox inputTipBox-select">
        <div class="inputTip-title">
          <span><i>2.</i>{{$t('buySie.text7')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="discount.discountValue">
          <a class="discount-btn" ref="discountBtn" @click="discount.discountSelectShow = !discount.discountSelectShow"><i class="arrowDown" :class="{arrowActive: discount.discountSelectShow}"></i></a>
          <ul class="selectMenu" :class="{selectMenuActive: discount.discountSelectShow}">
            <li :class="{liActive: discount.discountSelectIndex === index}" v-for="(item, index) in discount.discountSelectList" :key="item.name" @click="chooseDiscount(item.name, index)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span><i>3.</i>.{{$t('buySie.text8')}}：</span>
        </div>
        <input class="secret-input secret-input-bordernone" type="text" disabled readonly :placeholder="tradTotalPrice | fourNumberUsd">
      </div>
      <p class="availableBalance">{{$t('buySie.text9')}}：<span>{{userBalanceUSD | fourNumber}} USD</span></p>
      <button class="secret-btn" @click="buyFuc()">{{$t('buySie.text10')}}</button>
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
.buySie
  padding-top 60px
  .priceTrend
    .kLineBox
      width 720px
      height 360px
      margin-top 30px
      margin-bottom 50px
      border-radius 6px
      display flex
      align-items center
      justify-content center
  .buyIn
    width 660px
    .inputTipBox
      .inputTipDiv
        background-color $c26
        .select-input
          padding-right 53px
        .discount-btn
          width 100%
          padding-right 30px
          left 0
          justify-content flex-end
    .availableBalance
      margin-bottom 50px
      span
        color $btn31
  .myPopup
    .myPopup-tip
      .subtitle
        text-align left
</style>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@/components/globalDialog/dialog'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/candlestick')
export default{
  data () {
    return {
      kLineData: [],
      buyNum: '',
      buyNumTipShow: false,
      buyNumTip: this.$t('buySie.text6'),
      discount: {
        discountSelectShow: false, // 下拉显示
        discountValue: this.$t('buySie.text11'), // 优惠input显示值
        discountSelectIndex: 0,
        discountSelectList: [
          {name: this.$t('buySie.text11')},
          {name: this.$t('buySie.text12')},
          {name: this.$t('buySie.text13')},
          {name: this.$t('buySie.text18')}
        ]
      },
      verificationShow: false, // 验证弹窗
      tradePasswordShow: false,
      bindPhoneShow: false,
      safePassword: '',
      safePasswordTipShow: false,
      payCode: '', // 验证码
      ggCodeTipShow: false,
      phoneCodeTipShow: false,
      sendBtnTimes: 60
    }
  },
  watch: {
    language: function () { // 中英文切换时，优惠券下拉列表不会切换中英文
      this.discount.discountSelectList[0].name = this.$t('buySie.text11')
      this.discount.discountSelectList[1].name = this.$t('buySie.text12')
      this.discount.discountSelectList[2].name = this.$t('buySie.text13')
      this.discount.discountSelectList[3].name = this.$t('buySie.text18')
      this.discount.discountValue = this.discount.discountSelectList[this.discount.discountSelectIndex].name
    }
  },
  computed: {
    ...mapGetters([
      'balanceData', // 用户balance
      'userBalanceUSD',
      'language',
      'discountPreferential',
      'userInfo' // 用户信息
    ]),
    discountPrice () { // 优惠价格
      if (JSON.stringify(this.discountPreferential) === '{}') {
        return 0
      } else if (this.discountPreferential.aitotal && this.discount.discountSelectIndex === 1) {
        return this.discountPreferential.aitotal.amount
      } else if (this.discountPreferential.sumtotal && this.discount.discountSelectIndex === 2) {
        return this.discountPreferential.sumtotal.amount
      } else if (this.discountPreferential.pkAmount && this.discount.discountSelectIndex === 3) {
        return this.discountPreferential.pkAmount.amount
      } else {
        return 0
      }
    },
    tradTotalPrice () {
      if (this.buyNum.trim() === '') { // 未输入数量的默认值
        return 0
      }
      if (this.discountPrice === 0) {
        return this.balanceData.siePrice * parseFloat(this.buyNum)
      } else if (this.discount.discountSelectIndex === 1) {
        if (this.discountPreferential.aitotal) {
          let aiAmount = this.discountPreferential.aitotal.amount
          if (this.buyNum > aiAmount) {
            return (this.buyNum - aiAmount) * this.balanceData.siePrice + aiAmount * this.balanceData.siePrice * 0.9
          } else {
            return this.buyNum * this.balanceData.siePrice * 0.9
          }
        }
      } else if (this.discount.discountSelectIndex === 2) {
        let sumAmount = this.discountPreferential.sumtotal.amount
        if (this.buyNum > sumAmount) {
          return (this.buyNum - sumAmount) * this.balanceData.siePrice + sumAmount * this.balanceData.siePrice * 0.9
        } else {
          return this.buyNum * this.balanceData.siePrice * 0.9
        }
      } else if (this.discount.discountSelectIndex === 3) {
        let sumAmount = this.discountPreferential.pkAmount.amount
        if (this.buyNum > sumAmount) {
          console.log((this.buyNum - sumAmount) * this.balanceData.siePrice + sumAmount * this.balanceData.siePrice * 0.9)
          return (this.buyNum - sumAmount) * this.balanceData.siePrice + sumAmount * this.balanceData.siePrice * 0.9
        } else {
          return this.buyNum * this.balanceData.siePrice * 0.9
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getLineData()// 绘制K线图
      document.addEventListener('click', this.closeDiscountMenu) // 点击其他地方关闭优惠下拉菜单
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeDiscountMenu) // 组件摧毁时关闭监听
  },
  methods: {
    checkBuyNum () {
      if (!/^\d*\.{0,1}\d{0,4}$/.test(this.buyNum)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过4位小数
        this.buyNum = this.buyNum.substring(0, this.buyNum.length - 1)
      }
      if (parseInt(this.buyNum) * this.balanceData.siePrice > this.userBalanceUSD && this.userBalanceUSD !== 0) {
        this.buyNum = this.buyNum.substring(0, this.buyNum.length - 1)
      } else if (this.userBalanceUSD === 0) {
        this.buyNum = ''
      }
    },
    splitData (rawData) {
      var categoryData = []
      var values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      }
    },
    calculateMA (dayCount) {
      var result = []
      for (var i = 0, len = this.kLineData.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += this.kLineData.values[i - j][1]
        }
        result.push(sum / dayCount)
      }
      return result
    },
    drawLine () {
      var upColor = '#c31739'
      var upBorderColor = '#c31739'
      var downColor = '#28d7a8'
      var downBorderColor = '#28d7a8'
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        grid: {
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '10%'
        },
        xAxis: {
          data: this.kLineData.categoryData,
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1
            }
          }
        },
        yAxis: {
          // min: 0,
          // max: 80,
          // splitNumber: 10,
          scale: true, // Y轴起始值为数据的最小值
          splitLine: {
            lineStyle: {
              color: '#292d3d',
              width: 1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#373C52',
              width: 1
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 80,
            end: 100
          }
        ],
        series: [
          {
            type: 'candlestick',
            data: this.kLineData.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            }
          }
        ]
      })
    },
    getLineData () {
      this.$http.post(this.$api + '/tradeline/queryTradeKLine?type=2').then((res) => {
        if (res.data.success) {
          let lineArr = []
          res.data.data.forEach((item) => {
            let obj = []
            obj.push(this.$changeDate(item.startTime, '.', 4))
            obj.push(item.openPrice)
            obj.push(item.closePrice)
            obj.push(item.lowPrice)
            obj.push(item.highPrice)
            obj.push(item.volume)
            lineArr.push(obj)
          })
          lineArr = lineArr.reverse()
          this.kLineData = this.splitData(lineArr)
          this.drawLine()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    closeDiscountMenu (event) {
      if (!this.$refs.discountBtn.contains(event.target)) {
        this.discount.discountSelectShow = false
      }
    },
    chooseDiscount (val, index) { // 选择优惠券
      this.discount.discountValue = val // input显示选择的优惠
      this.discount.discountSelectShow = false // 下拉框的显示隐藏
      this.discount.discountSelectIndex = index
    },
    buyFuc () { // 买入
      if (this.userInfo.openGoogleCode !== 2) {
        Dialog({
          msg: this.$t('buySie.text19'),
          okFn: () => {
            this.$router.push('/userAccount')
          }
        })
      } else {
        if (this.buyNum.trim() === '') {
          this.buyNumTipShow = true
          this.buyNumTip = this.$t('buySie.text6')
        } else if (parseFloat(this.buyNum) < 0.1) {
          this.buyNumTipShow = true
          this.buyNumTip = this.$t('buySie.text14')
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
        if (this.discountPrice === 0) {
          let formData = new FormData()
          formData.append('buyAmount', this.buyNum)
          formData.append('tradePwd', this.safePassword)
          formData.append('code', this.payCode)
          this.$http.post(this.$api + '/tradesie/buySieTrade', formData).then((res) => {
            if (res.data.success) {
              this.$store.dispatch('errAction', {bool: true, msg: this.$t('buySie.text15')})
              this.buyNum = ''
              this.$store.dispatch('balanceAction') // 刷新余额
            } else {
              this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          let buyType = 2 // 折扣类型(达尔文)
          if (this.discount.discountSelectIndex === 2) { // 持有量
            buyType = 3
          } else if (this.discount.discountSelectIndex === 3) { // PK优惠券
            buyType = 4
          }
          let formData2 = new FormData()
          formData2.append('buyAmount', this.buyNum)
          formData2.append('type', buyType)
          formData2.append('tradePwd', this.safePassword)
          formData2.append('code', this.payCode)
          this.$http.post(this.$api + '/tradesie/buySieDiscount', formData2).then((res) => {
            if (res.data.success) {
              this.$store.dispatch('errAction', {bool: true, msg: this.$t('buySie.text15')})
              this.buyNum = ''
              this.$store.dispatch('balanceAction') // 刷新余额
            } else {
              this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
            }
          }).catch((err) => {
            console.log(err)
          })
        }
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
