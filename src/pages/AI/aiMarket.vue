<template>
  <div class="aiMarket secret-content72">
    <h3 class="secret-title">{{$t('AI.aiMarket.text1')}}</h3>
    <p class="subtitle">{{$t('AI.aiMarket.text2')}}</p>
    <ul class="secret-list">
      <li v-for="item in marketAiList" :key="item.id">
        <div class="li-img" :style="{backgroundImage:'url('+ item.imgurl +')'}"></div>
        <div class="li-btBox">
          <h3 class="title">{{language === 1 ? item.name: item.nameen}}</h3>
          <div class="li-bt">
            <span>{{$t('AI.aiMarket.text3')}}：{{item.total | fourNumber}} SIE</span>
            <div class="li-bt-btn">
              <router-link :to="{path: '/home/aiMarket/aiDetail', query: {aiId: item.id}}" class="secret-a">{{$t('AI.aiMarket.text4')}}</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $a8 = #0080f4 // 文字颜色
  .aiMarket
    .subtitle
      margin-bottom 30px
    .secret-list
      li
        .li-img
          width 60px
          height 60px
          border-radius 100%
          background-size cover
          margin-right 20px
        .li-btBox
          .li-bt
            span
              font-weight normal
              color $a8
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getMarketAi()
    })
  },
  computed: {
    ...mapGetters([
      'marketAiList',
      'language'
    ])
  },
  methods: {
    getMarketAi () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 20)
      this.$store.dispatch('getMarketAi', {formData: formData}) // 获取未开通的人工智能
    }
  }
}
</script>
