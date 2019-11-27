<template>
  <div class="rechargeDetail secret-content66">
    <v-breadcrumb :breadcrumbList="breadcrumbList"></v-breadcrumb>
    <ul class="rechargeDetail-list">
      <li v-if="depositDetail.problemId === null" :class="{reTitle: depositDetail.status === 4}">{{orderStatus2(depositDetail.status, depositDetail.payStatus)}}</li>
      <li v-if="depositDetail.problemId !== null" :class="{reTitle: depositDetail.status === 4}">{{orderStatus3(depositDetail.problemStatus)}}</li>
      <li>
        <div>
          <div class="li-top">
            <h3 class="secret-title">{{$t('rechargeDetail.text1')}}：</h3>
            <span class="price" id="price">{{depositDetail.receiveAmount | fourNumber}} {{depositDetail.depositCurrency}}</span>
            <a class="copy-btn" ref="priceCopy" @click="copyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#price"></a>
          </div>
          <p>{{$t('rechargeDetail.text2')}}：{{depositDetail.depositAmount | fourNumber}}USD</p>
        </div>
      </li>
      <li>
        <h3 class="secret-title">{{$t('rechargeDetail.text3')}}：{{depositDetail.giveRealName}}</h3>
        <p>{{depositDetail.giveBankName}}<span>{{branchBankInfo[0]}}</span></p>
        <p id="bankNum">{{depositDetail.giveAccount}}<a class="copy-btn" ref="bankNumCopy" @click="copyAddress(2)" data-clipboard-action="copy" data-clipboard-target="#bankNum"></a></p>
        <p>{{branchBankInfo[1]}}</p>
      </li>
      <li v-show="depositDetail.status === 3 || depositDetail.status === 5">
        <h3 class="secret-title" v-if="bossInfo">{{$t('rechargeDetail.text4')}}：{{bossInfo.realname}}</h3>
        <p v-if="bossInfo">{{bossInfo.bankname}}<span>{{bossInfo.subbank}}</span></p>
        <p id="bossBankNum">{{bossInfo ? bossInfo.number: ''}}<a class="copy-btn" ref="bossBankNumCopy" @click="copyAddress(3)" data-clipboard-action="copy" data-clipboard-target="#bossBankNum"></a></p>
        <p v-if="bossInfo">{{bossInfo.subbankaddress}}</p>
        <p v-if="bossInfo">{{$t('rechargeDetail.text5')}}：{{bossInfo.username}}</p>
        <p v-if="depositDetail.iban">iban：{{depositDetail.iban}}</p>
        <p v-if="depositDetail.swift">swift：{{depositDetail.swift}}</p>
      </li>
    </ul>
    <div class="rechargeDetail-btn">
      <!--我已打款-->
      <button class="secret-btn" v-if="depositDetail.payStatus === 3 && depositDetail.status === 3" @click="alreadyPayShow = true">{{$t('rechargeDetail.text6')}}</button>
      <!--取消订单-->
      <button class="secret-btn rechargeDetail-btn-gray" v-if="depositDetail.status === 1" @click="cancleOrderShow = true">{{$t('rechargeDetail.text7')}}</button>
      <!--申诉-->
      <router-link tag="button" :to="{path: '/home/fiat/rechargeDetail/appeal', query: {orderId: depositId, way: $route.query.way}}" class="secret-btn"
                   v-if="depositDetail.payStatus === 4 && depositDetail.problemId === null">{{$t('rechargeDetail.text8')}}</router-link>
      <!--申诉详情-->
      <router-link tag="button" :to="{path: '/home/fiat/rechargeDetail/appealDetail', query: {orderId: depositId, problemId: depositDetail.problemId, way: $route.query.way}}"
                   class="secret-btn" v-if="depositDetail.problemId !== null">{{$t('rechargeDetail.text9')}}</router-link>
    </div>
    <!--确认已转账弹窗-->
    <div class="myPopup" v-show="alreadyPayShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="alreadyPayShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('rechargeDetail.text10')}}</h3>
        <p class="subtitle">{{$t('rechargeDetail.text11')}}</p>
        <button class="secret-btn" @click="confirmFunc">{{$t('rechargeDetail.text12')}}</button>
      </div>
    </div>
    <!--取消订单-->
    <div class="myPopup" v-show="cancleOrderShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="cancleOrderShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('rechargeDetail.text13')}}</h3>
        <p class="subtitle">{{$t('rechargeDetail.text14')}}</p>
        <button class="secret-btn" @click="cancleOrder()">{{$t('rechargeDetail.text12')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$f2 = #1f222e // 背景颜色
$btn31 = #c31739 // 按钮颜色*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.rechargeDetail
  .rechargeDetail-list
    li
      display block
      border-radius 8px
      background-color $f2
      margin-top 30px
      padding 40px 48px
      border  1px solid #e5e5e5
      &:first-child
        height 60px
        display flex
        align-items center
        padding 0 48px
        color $btn31
      &.reTitle
        color $btn31
      &:nth-child(2)
        height 120px
        display flex
        align-items center
        padding 0 48px
      .copy-btn
        width 22px
        height 22px
        vertical-align top
        background url("../../assets/images/basic/copy.png") no-repeat
        background-position center
      .li-top
        font-size 0
        margin-bottom 18px
        h3
          font-size 18px
          display inline
          color $btn31
        .price
          font-size 18px
          font-weight bold
          color $btn31
          margin-right 20px
      p
        margin-bottom 10px
        &:last-child
          margin-bottom 0
        span
          margin-left 20px
        .copy-btn
          margin-left 20px
  .rechargeDetail-btn
    display flex
    margin-top 60px
    .secret-btn
      .rechargeDetail-btn-gray
        background-color $f2
</style>

<script>
export default{
  data () {
    return {
      copyBtn: null,
      copyBtn2: null,
      copyBtn3: null,
      depositId: Number,
      depositDetail: [],
      bossInfo: Object,
      iban: '',
      swift: '',
      branchBankInfo: [],
      alreadyPayShow: false, // 我已打款弹窗
      cancleOrderShow: false // 取消订单弹窗
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  computed: {
    breadcrumbList () { // 判断是从法币充值记录进来的，还是USD充值记录进来
      if (parseInt(this.$route.query.way) === 1) {
        return this.$t('rechargeDetail.breadcrumbList1')
      }
      return this.$t('rechargeDetail.breadcrumbList2')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.depositId = this.$route.query.orderId // 充值USD传过来ID
      this.getDepositDetail()
      this.copyBtn = new this.Clipboard(this.$refs.priceCopy)
      this.copyBtn2 = new this.Clipboard(this.$refs.bankNumCopy) // 复制
      this.copyBtn3 = new this.Clipboard(this.$refs.bossBankNumCopy) // 复制
    })
  },
  methods: {
    orderStatus2 (status, payStatus) {
      if (status === 1) {
        return this.$t('log.fiat.text7')
      } else if (status === 2) {
        return this.$t('log.fiat.text8')
      } else if (status === 3) {
        if (payStatus === 3) {
          return this.$t('rechargeDetail.text23')
        } else if (payStatus === 4) {
          return this.$t('rechargeDetail.text24')
        } else if (payStatus === 5) {
          return this.$t('rechargeDetail.text25')
        }
        return this.$t('log.fiat.text9')
      } else if (status === 4) {
        return this.$t('log.fiat.text10')
      } else if (status === 5) {
        return this.$t('log.fiat.text11')
      } else if (status === 6) {
        return this.$t('log.fiat.text12')
      }
    },
    orderStatus3 (val) {
      if (val === 0) {
        return this.$t('log.fiat.text13') // 待处理
      } else if (val === 1) {
        return this.$t('log.fiat.text14') // 处理中
      } else if (val === 2) {
        return this.$t('log.fiat.text15') // 已解决
      }
    },
    copyAddress (val) {
      if (val === 1) {
        let clipboard = this.copyBtn
        clipboard.on('success', () => {
          alert('复制成功')
          clipboard.destroy()
          this.copyBtn = new this.Clipboard(this.$refs.priceCopy) // 复制
        })
      } else if (val === 2) {
        let clipboard = this.copyBtn2
        clipboard.on('success', () => {
          alert('复制成功')
          clipboard.destroy()
          this.copyBtn2 = new this.Clipboard(this.$refs.bankNumCopy) // 复制
        })
      } else if (val === 3) {
        let clipboard = this.copyBtn3
        clipboard.on('success', () => {
          alert('复制成功')
          clipboard.destroy()
          this.copyBtn3 = new this.Clipboard(this.$refs.bossBankNumCopy) // 复制
        })
      }
    },
    getDepositDetail () { // 获取USD充值订单详情
      let formData = new FormData()
      formData.append('depositId', this.depositId)
      this.$http.post(this.$api + '/deposit/depositDetail', formData).then((res) => {
        if (res.data.success) {
          this.depositDetail = res.data.data
          this.branchBankInfo = this.depositDetail.remark.split(',')
          this.bossInfo = JSON.parse(res.data.data.bossBankAccount)
          this.iban = res.data.mapData.iban
          this.swift = res.data.mapData.swift
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认已转账
    confirmFunc () {
      this.alreadyPayShow = false
      let formData = new FormData()
      formData.append('depositId', this.depositId)
      formData.append('confirmState', 3)
      this.$http.post(this.$api + '/deposit/depositConfirmByStemp', formData).then(res => {
        if (res.data.success) {
          this.getDepositDetail() // 刷新数据
        } else {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
        }
      }).catch(err => {
        console.log(err)
      })
    },
    cancleOrder () { // 取消订单
      let tipMsg
      this.cancleOrderShow = false
      const url = `${this.$api}/deposit/cancleDeposit?depositId=${this.depositId}`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          tipMsg = this.$t('rechargeDetail.text21')
          this.getDepositDetail() // 刷新数据
        } else {
          tipMsg = res.data.msg
        }
        this.$store.dispatch('errAction', {bool: true, msg: tipMsg}) // 弹窗提示
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
