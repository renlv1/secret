<template>
  <div class="secret-log secret-content72">
    <h3 class="secret-title">{{$t('log.reward.text1')}}</h3>
    <table class="secret-table">
      <tr>
        <td>{{$t('log.reward.text2')}}</td>
        <td>{{$t('log.reward.text3')}}</td>
        <td>{{$t('log.reward.text4')}}</td>
        <td>{{$t('log.reward.text5')}}</td>
        <td>{{$t('log.reward.text6')}}</td>
      </tr>
      <tr v-for="item in rewardLogData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.rewardAmount | fourNumber}} SIE</td>
        <td>{{rewardType(item.rewardType)}}</td>
        <td>{{isRewardType(item.isReward)}}</td>
        <td>
          <router-link :to="{path: '/home/reward/rewardDetail', query: {rewardObj: JSON.stringify(item)}}" class="secret-a">{{$t('log.text20')}}</router-link>
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
      rewardLogData: Object // 奖励记录
    }
  },
  computed: {
    propPage () {
      return this.pagesTotal
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getRewardList(1) // 奖励记录
    })
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  methods: {
    getRewardList (page) {
      let formData = new FormData()
      formData.append('pageIndex', page)
      formData.append('pageSize', 20)
      this.$http.post(this.$api + '/trainer/trainerRewardList', formData).then((res) => {
        if (res.data.success) {
          // console.log(res)
          this.rewardLogData = res.data.data.rewardList
          this.pagesTotal = res.data.data.totalPage // 总页数
          if (this.rewardLogData.length === 0) { // 如果数组为空，但是页数为1，翻页仍然显示
            this.pagesTotal = 0
          }
        } else {
          this.pagesTotal = 0
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    rewardType (num) {
      if (num === 1) {
        return this.$t('log.reward.text7')
      }
      return this.$t('log.reward.text8')
    },
    isRewardType (num) {
      if (num === 0) {
        return this.$t('log.reward.text9')
      } else if (num === 1) {
        return this.$t('log.reward.text10')
      } else if (num === 2) {
        return this.$t('log.reward.text11')
      }
      return this.$t('log.reward.text12')
    },
    parentTurnPage (page) { // 翻页
      // console.log(page)
      this.currentPage = page
      this.getRewardList(page) // 奖励记录请求
    }
  }
}
</script>
