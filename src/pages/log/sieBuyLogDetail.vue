<template>
  <div class="sieBuyLogDetail secret-content72">
    <v-breadcrumb :breadcrumbList="$t('log.sieBuyLogDetail.breadcrumbList')"></v-breadcrumb>
    <table class="detail-table">
      <tr>
        <!--交易编号-->
        <td>{{$t('log.sieBuyLog.text2')}}</td>
        <td>{{sieBuyDetailData.id}}</td>
      </tr>
      <tr>
        <!--价格-->
        <td>{{$t('log.sieBuyLog.text3')}}</td>
        <td>{{sieBuyDetailData.unitPrice}} USD</td>
      </tr>
      <tr>
        <!--数量-->
        <td>{{$t('log.sieBuyLogDetail.text1')}}</td>
        <td>{{sieBuyDetailData.amount | fourNumber}}</td>
      </tr>
      <tr>
        <!--总价格 -->
        <td>{{$t('log.sieBuyLogDetail.text2')}}</td>
        <td>{{sieBuyDetailData.enterPrice | fourNumber}} USD</td>
      </tr>
      <tr class="hashTr">
        <!--交易时间-->
        <td>{{$t('log.sieBuyLogDetail.text3')}}</td>
        <td>{{$changeDate(sieBuyDetailData.transactionTime, '/', 1)}}</td>
      </tr>
      <tr>
        <!--交易状态-->
        <td>{{$t('log.sieBuyLogDetail.text4')}}</td>
        <td>{{orderStatus(sieBuyDetailData.orderStatus)}}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .sieBuyLogDetail
    .secret-title
      margin-bottom 0
</style>

<script>
export default{
  data () {
    return {
      sieBuyDetailData: Object
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.sieBuyObj) {
        this.sieBuyDetailData = JSON.parse(this.$route.query.sieBuyObj)
      }
    })
  },
  methods: {
    orderStatus (val) { // 购买记录
      if (val === 16) {
        return this.$t('log.sieBuyLog.text7')
      } else {
        return ''
      }
    }
  }
}
</script>
