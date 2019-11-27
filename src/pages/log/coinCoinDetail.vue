<template>
  <div class="coinCoinDetail secret-content72">
    <v-breadcrumb :breadcrumbList="$t('log.coinCoinDetail.breadcrumbList')"></v-breadcrumb>
    <table class="detail-table">
      <tr>
        <!--交易编号-->
        <td>{{$t('log.coinCoinDetail.text1')}}</td>
        <td>{{ccDetailData.id}}</td>
      </tr>
      <tr>
        <!--交易类型-->
        <td>{{$t('log.coinCoinDetail.text2')}}</td>
        <td>{{recordType(ccDetailData.recordType)}}</td>
      </tr>
      <tr>
        <!--数量-->
        <td>{{$t('log.coinCoinDetail.text3')}}</td>
        <td>{{ccDetailData.enterPrice | fourNumber}} {{ccDetailData.sendCurrency}}</td>
      </tr>
      <tr>
        <!--充值金额 -->
        <td>{{$t('log.coinCoinDetail.text4')}}</td>
        <td>{{ccDetailData.actualPrice | fourNumber}} USD</td>
      </tr>
      <tr class="hashTr">
        <!--hash-->
        <td>{{$t('log.coinCoinDetail.text5')}}</td>
        <td><span v-if="ccDetailData.hashCode !== null">{{ccDetailData.hashCode}}</span><span v-if="ccDetailData.hashCode === null">—</span></td>
      </tr>
      <tr>
        <!--交易时间-->
        <td>{{$t('log.coinCoinDetail.text6')}}</td>
        <td>{{$changeDate(ccDetailData.transactionTime, '/', 1)}}</td>
      </tr>
      <tr>
        <!--交易状态-->
        <td>{{$t('log.coinCoinDetail.text7')}}</td>
        <td>{{orderStatus(ccDetailData.status)}}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.coinCoinDetail
  .secret-title
    margin-bottom 0
</style>

<script>
export default{
  data () {
    return {
      ccId: 0,
      ccDetailData: Object
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.ccId = this.$route.query.id
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () { // 获取订单记录详情
      let formData = new FormData()
      formData.append('id', this.ccId)
      this.$http.post(this.$api + '/transferRecord/transferToRecordById', formData).then((res) => {
        if (res.data.success) {
          this.ccDetailData = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    orderStatus (val) {
      if (val === 1) {
        return this.$t('log.text1')
      } else if (val === 2) {
        return this.$t('log.text2')
      } else if (val === 3) {
        return this.$t('log.text3')
      } else if (val === 4) {
        return this.$t('log.text4')
      } else if (val === 5) {
        return this.$t('log.text5')
      } else if (val === 6) {
        return this.$t('log.text6')
      } else if (val === 7) {
        return this.$t('log.text7')
      } else if (val === 8) {
        return this.$t('log.text8')
      } else if (val === 9) {
        return this.$t('log.text9')
      } else if (val === 17) {
        return this.$t('log.text21')
      } else if (val === 18) {
        return this.$t('log.text22')
      } else if (val === 19) {
        return this.$t('log.text23')
      }
    },
    recordType (val) {
      if (val === 1) {
        return this.$t('log.text14') // 转入
      } else if (val === 2) {
        return this.$t('log.text15') // 转出到第三方
      } else if (val === 3) {
        return this.$t('log.text16') // 转入(内部转入)
      } else if (val === 4) {
        if (this.tradeTable === 2) {
          return this.$t('log.text17') // 充值
        } else {
          return this.$t('log.text18') // 内部转出
        }
      } else if (parseInt(val) === 5) {
        return this.$t('log.text19') // 购买SIE
      }
    }
  }
}
</script>
