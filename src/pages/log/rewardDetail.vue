<template>
  <div class="rewardDetail secret-content72">
    <v-breadcrumb :breadcrumbList="$t('log.rewardDetail.breadcrumbList')"></v-breadcrumb>
    <table class="detail-table">
      <tr>
        <!--奖励编号-->
        <td>{{$t('log.rewardDetail.text0')}}</td>
        <td>{{rewardLogDetailData.id}}</td>
      </tr>
      <tr>
        <!--奖励类型-->
        <td>{{$t('log.reward.text4')}}</td>
        <td>{{rewardType(rewardLogDetailData.rewardType)}}</td>
      </tr>
      <tr>
        <!--奖励资产-->
        <td>{{$t('log.reward.text3')}}</td>
        <td>{{rewardLogDetailData.rewardAmount | fourNumber}} SIE</td>
      </tr>
      <tr>
        <!--训练次数 -->
        <td>{{$t('log.rewardDetail.text1')}}</td>
        <td>{{rewardLogDetailData.trainCount}}</td>
      </tr>
      <tr>
        <!--开通用户-->
        <td>{{$t('log.rewardDetail.text2')}}</td>
        <td>{{rewardLogDetailData.userName}}</td>
      </tr>
      <tr>
        <!--交易时间-->
        <td>{{$t('log.rewardDetail.text3')}}</td>
        <td>{{$changeDate(rewardLogDetailData.createAt, '/', 1)}}</td>
      </tr>
      <tr>
        <!--状态-->
        <td>{{$t('log.reward.text5')}}</td>
        <td>{{isRewardType(rewardLogDetailData.isReward)}}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .rewardDetail
    .secret-title
      margin-bottom 0
</style>

<script>
export default{
  data () {
    return {
      rewardLogDetailData: Object
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.rewardObj) {
        this.rewardLogDetailData = JSON.parse(this.$route.query.rewardObj)
      }
    })
  },
  methods: {
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
    }
  }
}
</script>
