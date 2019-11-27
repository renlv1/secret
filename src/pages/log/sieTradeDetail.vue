<template>
  <div class="sieTradeDetail secret-content72">
    <v-breadcrumb :breadcrumbList="$t('log.sieTradeDetail.breadcrumbList')"></v-breadcrumb>
    <table class="detail-table">
      <tr>
        <!--交易编号-->
        <td>{{$t('log.sieTradeDetail.text1')}}</td>
        <td>{{tradeDetailData.id}}</td>
      </tr>
      <tr>
        <!--交易类型-->
        <td>{{$t('log.sieTradeDetail.text2')}}</td>
        <td>{{recordType(tradeDetailData.recordType)}}</td>
      </tr>
      <tr>
        <!--交易资产-->
        <td>{{$t('log.sieTradeDetail.text3')}}</td>
        <td>{{tradeDetailData.enterPrice | fourNumber}} SIE</td>
      </tr>
      <tr v-if="tradeDetailData.recordType === 2">
        <!--手续费-->
        <td>{{$t('log.sieTradeDetail.text9')}}</td>
        <td>{{tradeDetailData.serviceCharge}} SIE</td>
      </tr>
      <tr class="hashTr" v-if="tradeDetailData.recordType === 1 || tradeDetailData.recordType === 3">
        <!--转入 就是 转出地址-->
        <td>{{$t('log.sieTradeDetail.text5')}}</td>
        <td><span>{{tradeDetailData.sendAddress}}</span></td>
      </tr>
      <tr class="hashTr" v-if="tradeDetailData.recordType === 4 || tradeDetailData.recordType === 2">
        <!--转出 就是 收款地址-->
        <td>{{$t('log.sieTradeDetail.text_6')}}</td>
        <td><span>{{tradeDetailData.receiveUserAddress}}</span></td>
      </tr>
      <tr class="hashTr">
        <!--hash-->
        <td>{{$t('log.sieTradeDetail.text6')}}</td>
        <td><span v-if="tradeDetailData.hashCode !== null">{{tradeDetailData.hashCode}}</span><span v-if="tradeDetailData.hashCode === null">—</span></td>
      </tr>
      <tr v-if="tradeDetailData.recordType === 1 || tradeDetailData.recordType === 3">
        <!--转入用户名-->
        <td>{{$t('popoup.text0')}}</td>
        <td>{{tradeDetailData.sendName}}</td>
      </tr>
      <tr v-if="tradeDetailData.recordType === 2 || tradeDetailData.recordType === 4">
        <!--转出用户名-->
        <td>{{$t('popoup.text0')}}</td>
        <td>{{tradeDetailData.receiveUserName}}</td>
      </tr>
      <tr>
        <!--交易时间-->
        <td>{{$t('log.sieTradeDetail.text7')}}</td>
        <td>{{$changeDate(tradeDetailData.transactionTime, '/', 1)}}</td>
      </tr>
      <tr>
        <!--交易状态-->
        <td>{{$t('log.sieTradeDetail.text8')}}</td>
        <td>{{orderStatus(tradeDetailData.status, tradeDetailData.recordType)}}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.sieTradeDetail
  .secret-title
    margin-bottom 0
</style>

<script>
export default{
  data () {
    return {
      tradeId: 0,
      tradeDetailData: Object
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.tradeId = this.$route.query.id
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () { // 获取订单记录详情
      let formData = new FormData()
      formData.append('id', this.tradeId)
      this.$http.post(this.$api + '/transferRecord/transferToRecordById', formData).then((res) => {
        if (res.data.success) {
          this.tradeDetailData = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
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
      } else if (val === 5) {
        return this.$t('log.text19') // 购买SIE
      }
    },
    orderStatus (val, type) {
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
      } else if (val === 9 || val === 17) {
        return this.$t('log.text9')
      } else if (val === 10 || val === 11 || val === 12 || val === 18 || val === 20) { // 10,11,12,18 显示为 "处理中"
        return this.$t('log.text10')
      } else if (val === 13) {
        if (type === 3) {
          return this.$t('log.text7')
        }
        return this.$t('log.text11')
      } else if (val === 14 || val === 15 || val === 19) { // 14,15,19 显示为"转出失败"
        if (type === 3) {
          return this.$t('log.text8')
        }
        return this.$t('log.text12')
      } else if (val === 16) {
        return this.$t('log.text13')
      }
    }
  }
}
</script>
