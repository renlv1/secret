<template>
  <div class="secret-log secret-content72">
    <h3 class="secret-title">{{$t('log.fiat.text1')}}</h3>
    <table class="secret-table">
      <tr>
        <td>{{$t('log.fiat.text2')}}</td>
        <td>{{$t('log.fiat.text3')}}</td>
        <td>{{$t('log.fiat.text4')}}</td>
        <td>{{$t('log.fiat.text5')}}</td>
        <td>{{$t('log.fiat.text6')}}</td>
      </tr>
      <tr v-for="item in frenchLogData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.depositAmount | fourNumber}} USD</td>
        <td>{{$changeDate(item.createAt, '/', 1)}}</td>
        <td v-if="item.problemId === null">{{orderStatus2(item.status, item.payStatus)}}</td>
        <td v-if="item.problemId !== null">{{orderStatus3(item.problemStatus)}}</td>
        <td>
          <!--// way是1充值进来的充值详情,2是法币充值记录进来的充值详情-->
          <router-link :to="{path: '/home/fiat/rechargeDetail', query: {orderId: item.id, way: 2}}" class="secret-a">{{$t('log.text20')}}</router-link>
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
      frenchLogData: Object // 法币充值记录
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
      this.getFrenchLog(1) // 默认法币充值选项
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
    getFrenchLog (page) { // 法币充值记录
      let formData = new FormData()
      formData.append('pageIndex', page)
      formData.append('pageSize', 20)
      this.$http.post(this.$api + '/deposit/queryDepositList', formData).then((res) => {
        if (res.data.success) {
          // console.log(res)
          this.frenchLogData = res.data.data
          this.pagesTotal = res.data.mapData.totalpage // 总页数
          if (this.frenchLogData.length === 0) { // 如果数组为空，但是页数为1，翻页仍然显示
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
      this.getFrenchLog(page) // 法币充值记录请求
    }
  }
}
</script>
