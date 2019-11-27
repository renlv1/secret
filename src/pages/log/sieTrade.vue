<template>
  <div class="secret-log secret-content72">
    <h3 class="secret-title">{{$t('log.sieTrade.text1')}}</h3>
    <table class="secret-table">
      <tr>
        <td>{{$t('log.sieTrade.text2')}}</td>
        <td>{{$t('log.sieTrade.text3')}}</td>
        <td>{{$t('log.sieTrade.text4')}}</td>
        <td>{{$t('log.sieTrade.text5')}}</td>
        <td>{{$t('log.sieTrade.text6')}}</td>
      </tr>
      <tr v-for="item in tradeSieLogData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.amount | fourNumber}} {{item.sendCurrency}}</td>
        <td>{{recordType(item.recordType)}}</td>
        <td>{{orderStatus(item.orderStatus, item.recordType)}}</td>
        <td>
          <router-link :to="{path: '/home/sieTrade/sieTradeDetail', query: {id: item.id}}" class="secret-a">{{$t('log.text20')}}</router-link>
        </td>
      </tr>
    </table>
    <v-turnPage :propsPage="propPage" @orderLogTrunPage="parentTurnPage" ref="turnPage"></v-turnPage>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
export default{
  data () {
    return {
      currentPage: 1, // 当前页
      pagesTotal: 1, // 总页数
      tradeSieLogData: Object // SIE交易记录
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  computed: {
    propPage () {
      return this.pagesTotal
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getTransferLog(1) // 默认SIE交易记录请求
    })
  },
  methods: {
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
    getTransferLog (page) { // 获取订单记录
      let formData = new FormData()
      formData.append('page', page)
      formData.append('pageSize', 20)
      formData.append('type', 1)
      this.$http.post(this.$api + '/transferRecord/transferToRecordList', formData).then((res) => {
        if (res.data.success) {
          this.tradeSieLogData = res.data.data.transferRecordVoList
          this.pagesTotal = res.data.data.totalPage // 总页数
          if (this.tradeSieLogData.length === 0) { // 如果数组为空，但是页数为1，翻页仍然显示
            this.pagesTotal = 0
          }
        } else {
          this.pagesTotal = 0
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    parentTurnPage (page) { // 翻页
      // console.log(page)
      this.currentPage = page
      this.getTransferLog(page) // SIE交易记录请求
    }
  }
}
</script>
