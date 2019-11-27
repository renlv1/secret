<template>
  <div class="holdings secret-content72">
    <h3 class="secret-title">{{$t('holdings.text1')}}</h3>
    <div class="holdings-top">
      <p>{{$t('holdings.text2')}}</p>
      <p>{{totalAchievement | fourNumber}} SIE</p>
      <p>{{$t('holdings.text3')}}：{{timesTemp}}</p>
    </div>
    <table class="secret-table">
      <tr class="secret-table-title">{{$t('holdings.text4')}}</tr>
      <tr>
        <td>{{$t('holdings.text5')}}</td>
        <td>{{$t('holdings.text6')}}</td>
        <td>{{$t('holdings.text7')}}</td>
        <td>{{$t('holdings.text8')}}</td>
      </tr>
      <tr v-for="(item, index) in achievementData" :key="index">
        <td>{{(nowPage - 1) * 10 + index + 1}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.buyDarwinAchievement | fourNumber}} SIE</td>
        <td>{{item.buySieAchievement | fourNumber}} SIE</td>
      </tr>
    </table>
    <v-turnPage :propsPage="pagesTotal" @achievementTrunPage="parentTurnPage"></v-turnPage>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$f2 = #1f222e // 背景颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.holdings
  .holdings-top
    border-radius 6px
    background-color $f2
    padding 30px 40px
    margin-top 40px
    border 1px solid $border
    p
      margin-bottom 20px
      &:nth-child(2)
        font-weight bold
        font-size 20px
      &:last-child
        font-size 16px
        margin-bottom 0
  .secret-table
    tr
      td
        flex 1.2
        &:nth-child(2), &:nth-child(3)
          flex 1.8
        &:nth-child(4)
          flex 2.4
</style>

<script>
export default{
  data () {
    return {
      pagesTotal: 1, // 查看业绩总页数
      nowPage: 1, // 当前页数
      totalAchievement: 0, // 总持有量
      achievementData: Object,
      timesTemp: '' // 昨日时间戳
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      this.getAchievement(1)
      this.getDate() // 获取昨天时间
    })
  },
  methods: {
    getDate () {
      let yesTime = Date.parse(new Date(new Date() - 24 * 60 * 60 * 1000))
      this.timesTemp = this.$changeDate(yesTime, '/', 4)
    },
    getAchievement (page) { // 获取订单记录
      let url = `${this.$api}/user/getAchievement?page=${page}&pageSize=10`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.achievementData = res.data.data.teamAchievement // 列表
          this.totalAchievement = parseFloat(res.data.data.totalAchievement) // 总业绩
          this.pagesTotal = res.data.data.totalPage
        } else {
          this.pagesTotal = 0
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    parentTurnPage (page) {
      this.nowPage = page
      this.getAchievement(page)
    }
  }
}
</script>
