<template>
  <div class="aiManage secret-content72">
    <v-breadcrumb :breadcrumbList="$t('AI.aiManage.breadcrumbList')"></v-breadcrumb>
    <div class="renew">
      <h3 v-if="currentAiObj.product">{{language === 1 ? currentAiObj.product.name: currentAiObj.product.nameen}}</h3>
      <p v-if="parseInt($route.query.aiId) !== 3">{{$t('AI.aiManage.text1')}}：{{$changeDate(currentAiObj.userEndTime, '/', 1)}}</p>
      <p v-if="parseInt($route.query.aiId) === 3">{{$t('AI.aiManage.text1')}}：—</p>
      <!--除了达尔文之外都隐藏续费或者开启自动续费-->
      <div v-if="parseInt($route.query.aiId) === 1">
        <p class="renew-tip" v-if="parseInt(currentAiObj.isAuth) === 2">{{$t('AI.aiManage.text2')}}{{aiPriceData.showSieTotalRenew}} SIE/{{$t('AI.aiManage.text3')}}）</p>
        <p class="renew-tip" v-if="parseInt(currentAiObj.isAuth) === 1">{{$t('AI.aiManage.text4')}}{{aiPriceData.showSieTotalRenew}} SIE/{{$t('AI.aiManage.text3')}}）</p>
        <div class="renew-btn">
          <router-link tag="button" :to="{path: '/home/myAi/renewAdvance', query: {aiId: $route.query.aiId, renewPrice: aiPriceData.showSieTotalRenew}}" class="secret-btn">{{$t('AI.aiManage.text5')}}</router-link>
          <button class="secret-btn" v-if="parseInt(currentAiObj.isAuth) === 2" @click="closeRenewShow = true">{{$t('AI.aiManage.text6')}}</button>
          <button class="secret-btn" v-if="parseInt(currentAiObj.isAuth) === 1" @click="closeRenewShow = true">{{$t('AI.aiManage.text7')}}</button>
        </div>
      </div>
    </div>
    <table class="secret-table">
      <tr class="secret-table-title" v-if="currentAiObj.product">{{language === 1 ? currentAiObj.product.name: currentAiObj.product.nameen}} {{$t('AI.aiManage.text8')}}</tr>
      <tr>
        <td>{{$t('AI.aiManage.text9')}}</td>
        <td>{{$t('AI.aiManage.text10')}}</td>
        <td>{{$t('AI.aiManage.text11')}}</td>
        <td>{{$t('AI.aiManage.text12')}}</td>
        <td>{{$t('AI.aiManage.text13')}}</td>
      </tr>
      <tr v-for="item in aiLogData" v-if="item.status !== 1" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{tradeType(item.orderType)}}</td>
        <td>{{tradeStatus(item.status)}}</td>
        <td>{{$changeDate(item.createAt, '/', 1)}}</td>
        <td>{{item.orderAmount}} {{item.currency}}</td>
      </tr>
    </table>
    <div class="myPopup" v-show="closeRenewShow">
      <div class="myPopup-tip">
        <div class="myPopup-content">
          <h3 class="title">{{currentAiObj.isAuth === 1? $t('AI.aiManage.text14'):  $t('AI.aiManage.text15')}}</h3>
          <p class="subtitle">{{currentAiObj.isAuth === 1? $t('AI.aiManage.text16'):  $t('AI.aiManage.text17')}}</p>
        </div>
        <div class="myPopup-btnBox">
          <button class="secret-btn" @click="closeRenewShow = false">{{$t('popoup.text14')}}</button>
          <button class="secret-btn" @click="closeOpenRenew()">{{$t('popoup.text15')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$cor52 = #2d3436 // 字体颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色*/

$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #2d3436 // 字体颜色
.aiManage
  .renew
    border-radius 8px
    background-color #f0f0f0
    padding 30px 40px
    margin-top 40px
    h3
      font-weight normal
      margin-bottom 22px
    p
      font-size 16px
      margin-bottom 5px
      &.renew-tip
        margin-bottom 0
    .renew-btn
      font-size 0
      margin-top 30px
      display flex
      .secret-btn
        display inline-block
        width 140px
        height 40px
        font-size 16px
        border-radius 4px
        &:first-child
          margin-right 30px
  .secret-table
    tr
      td
        &:nth-child(2), &:nth-child(3)
          flex 1.2
        &:nth-child(4), &:last-child
          flex 1.9
  .myPopup
    .myPopup-tip
      width 480px
      padding 60px 0 0 0
      overflow hidden
      .myPopup-content
        padding 0 40px
        .subtitle
          margin-bottom 80px
      .myPopup-btnBox
        display flex
        .secret-btn
          height 60px
          border-radius 0
          &:first-child
            color $cor52
            border-top 1px solid $c26
            background-color #f0f0f0
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      currentAiObj: Object,
      closeRenewShow: false
    }
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  computed: {
    ...mapGetters([
      'myAiList',
      'aiLogData',
      'aiPriceData',
      'language'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.getOppenAiLog()
      this.oppenAiPrice()
      this.getMyAi() // 获取我的人工智能列表中---当前人工智能的管理数据
    })
  },
  methods: {
    getMyAi () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 20)
      this.$http.post(this.$api + '/product/queryBuyRobot', formData).then((res) => {
        if (res.data.success) {
          let darwinSetsArr = res.data.data.darwinSets
          darwinSetsArr.forEach((item) => {
            if (parseInt(this.$route.query.aiId) === item.product.id) {
              this.currentAiObj = item
            }
          })
        }
      })
    },
    getOppenAiLog () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 20)
      formData.append('productid', this.$route.query.aiId)
      this.$store.dispatch('oppenAiLog', {formData: formData}) // 开通人工智能
    },
    oppenAiPrice () {
      let formData = new FormData()
      formData.append('productid', this.$route.query.aiId)
      this.$store.dispatch('oppenAiPrice', {formData: formData}) // 开通人工智能的价格
    },
    tradeType (val) { // 交易类型
      switch (val) {
        case 1 :
          return this.$t('AI.aiManage.text18')
        case 2 :
          return this.$t('AI.aiManage.text19')
        case 3 :
          return this.$t('AI.aiManage.text20')
        default:
          return this.$t('AI.aiManage.text21')
      }
    },
    tradeStatus (val) { // 交易类型
      switch (val) {
        case 1 :
          return this.$t('AI.aiManage.text22')
        case 2 :
          return this.$t('AI.aiManage.text23')
        case 3 :
          return this.$t('AI.aiManage.text24')
        case 4 :
          return this.$t('AI.aiManage.text25')
        default:
          return this.$t('AI.aiManage.text21')
      }
    },
    closeOpenRenew () {
      let isauth
      let popupMsg
      if (this.currentAiObj.isAuth === 1) {
        isauth = 2
        popupMsg = this.$t('AI.aiManage.text26')
      } else {
        isauth = 1
        popupMsg = this.$t('AI.aiManage.text27')
      }
      this.$http.post(`${this.$api}/product/updateRobot?isauth=${isauth}&darwinsetid=${this.currentAiObj.id}`).then((res) => {
        if (res.data.success) {
          this.closeRenewShow = false
          this.$store.dispatch('errAction', {bool: true, msg: popupMsg})
          this.getMyAi()
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
