<template>
  <div class="coupon secret-content72">
    <h3 class="secret-title">{{$t('coupon.text1')}}</h3>
    <p class="subtitle">{{$t('coupon.text2')}}</p>
    <ul class="secret-list">
      <li>
        <div class="li-btBox">
          <h3 class="title">{{$t('coupon.text3')}}：</h3>
          <div class="li-bt">
            <span>{{aitotalAmount | fourNumber}}</span>
            <div class="li-bt-btn">
              <router-link :to="{path: 'coupon/couponExchange', query: {type: 2}}" class="secret-a">{{$t('coupon.text4')}}</router-link>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="li-btBox">
          <h3 class="title">{{$t('coupon.text5')}}：</h3>
          <div class="li-bt">
            <span>{{sumtotalAmount | fourNumber}}</span>
            <div class="li-bt-btn">
              <router-link :to="{path: 'coupon/couponExchange', query: {type: 1}}" class="secret-a">{{$t('coupon.text4')}}</router-link>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="li-btBox">
          <h3 class="title">{{$t('coupon.text13')}}：</h3>
          <div class="li-bt">
            <span>{{pkAmount | fourNumber}}</span>
            <div class="li-bt-btn">
              <router-link :to="{path: 'coupon/couponExchange', query: {type: 3}}" class="secret-a">{{$t('coupon.text4')}}</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <table class="secret-table">
      <tr class="secret-table-title">{{$t('coupon.text6')}}</tr>
      <tr>
        <td>{{$t('coupon.text7')}}</td>
        <td>{{$t('coupon.text8')}}</td>
        <td>{{$t('coupon.text9')}}</td>
        <td>{{$t('coupon.text10')}}</td>
        <td>{{$t('coupon.text11')}}</td>
      </tr>
      <tr v-for="item in couponList" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{tradeType(item.tradeType)}}</td>
        <td>{{item.enterPrice}}</td>
        <td>{{item.amount}}</td>
        <td>{{$changeDate(item.transactionTime, '/', 1)}}</td>
      </tr>
    </table>
    <v-turnPage :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage"></v-turnPage>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$border = #33384d // 边框颜色*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$border = #e5e5e5 // 边框颜色
.coupon
  .subtitle
    margin-bottom 30px
  .secret-list
    li
      background-color $c26
      border 1px solid $border
      .li-btBox
        .title
          color $cor52
        .li-bt
          span
            color $a8
            font-size 20px
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      currentPage: 1 // 当前页
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCouponList(1)
    })
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  computed: {
    ...mapGetters([
      'totalPage', // 总页数
      'couponList',
      'aitotalAmount', // 达尔文优惠券
      'sumtotalAmount', // 持有量优惠券
      'pkAmount' // PK优惠券
    ])
  },
  methods: {
    tradeType (val) {
      switch (val) {
        case 1:
          return this.$t('coupon.text12')
        case 2:
          return this.$t('coupon.text3')
        case 3:
          return this.$t('coupon.text5')
        case 4:
          return this.$t('coupon.text13')
      }
    },
    getCouponList (page) {
      let formData = new FormData()
      formData.append('pageIndex', page)
      formData.append('pageSize', 20)
      formData.append('queryType', 6) // 查询类型 0 所有 5购买 6兑换
      this.$store.dispatch('getCouponLog', {formData: formData})
    },
    parentTurnPage (page) { // 翻页
      // console.log(page)
      this.currentPage = page
      this.getCouponList(page) // 法币充值记录请求
    }
  }
}
</script>
