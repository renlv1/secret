<template>
  <div class="secret-log secret-content72">
    <h3 class="secret-title">{{$t('log.sieBuyLog.text1')}}</h3>
    <table class="secret-table">
      <tr>
        <td>{{$t('log.sieBuyLog.text2')}}</td>
        <td>{{$t('log.sieBuyLog.text3')}}</td>
        <td>{{$t('log.sieBuyLog.text4')}}</td>
        <td>{{$t('log.sieBuyLog.text5')}}</td>
        <td>{{$t('log.sieBuyLog.text6')}}</td>
      </tr>
      <tr v-for="item in sieBuyLogData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.unitPrice}} USD</td>
        <td>{{item.amount | fourNumber}}</td>
        <td>{{orderStatus(item.orderStatus)}}</td>
        <td>
          <router-link :to="{path: '/home/sieBuyLog/sieBuyLogDetail', query: {sieBuyObj: JSON.stringify(item)}}" class="secret-a">{{$t('log.text20')}}</router-link>
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
      sieBuyLogData: Object // 奖励记录
    }
  },
  computed: {
    propPage () {
      return this.pagesTotal
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      this.getSieBuyLog(1) // 奖励记录
    })
  },
  methods: {
    orderStatus (val) { // 购买记录
      if (val === 16) {
        return this.$t('log.sieBuyLog.text7')
      } else {
        return ''
      }
    },
    getSieBuyLog (page) {
      let formData = new FormData()
      formData.append('pageIndex', page)
      formData.append('pageSize', 20)
      formData.append('queryType', 5)
      this.$http.post(this.$api + '/tradesie/queryOrderList', formData).then((res) => {
        if (res.data.success) {
          this.sieBuyLogData = res.data.data
          this.pagesTotal = res.data.mapData.totalPage // 总页数
          if (this.sieBuyLogData.length === 0) { // 如果数组为空，但是页数为1，翻页仍然显示
            this.pagesTotal = 0
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    parentTurnPage (page) { // 翻页
      this.currentPage = page
      this.getSieBuyLog(page) // 奖励记录请求
    }
  }
}
</script>
