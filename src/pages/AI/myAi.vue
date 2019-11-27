<template>
  <div class="myAi secret-content72">
    <h3 class="secret-title">{{$t('AI.myAi.text1')}}</h3>
    <p class="subtitle">{{$t('AI.myAi.text2')}}</p>
    <ul class="secret-list">
      <li v-for="item in myAiList" :key="item.id">
        <div class="li-img" :style="{backgroundImage:'url('+ item.product.imgurl +')'}"></div>
        <div class="li-btBox">
          <h3 class="title">{{language === 1 ? item.product.name: item.product.nameen}}</h3>
          <div class="li-bt">
            <span v-if="item.status !== 2 && item.product.id !== 3">{{$t('AI.myAi.text3')}}：{{$changeDate(item.userEndTime, '/', 1)}}</span>
            <span v-if="item.status !== 2 && item.product.id === 3">{{$t('AI.myAi.text3')}}：—</span>
            <span v-if="item.status === 2">{{$t('AI.myAi.text4')}}</span>
            <div class="li-bt-btn" v-if="item.status !== 2">
              <!--, query: {aiObj: JSON.stringify({productId: item.product.id, aiName: item.product.name, endTime: item.userEndTime, isAuth: item.isAuth})}-->
              <router-link :to="{path: 'myAi/aiManage', query: {aiId: item.product.id}}" class="secret-a">{{$t('AI.myAi.text5')}}</router-link>
              <!--只有达尔文能聊-->
              <router-link v-if="item.product.id === 1" :to="{path: 'myAi/aiExperience', query: {aiImg: item.product.imgurl, productId: item.product.id}}" class="secret-a">{{$t('AI.myAi.text6')}}</router-link>
            </div>
            <div class="li-bt-btn" v-if="item.status === 2">
              <router-link class="secret-a" :to="{path: '/home/myAi/renewAdvance', query: {aiId: item.product.id, renewPrice: aiPriceData.showSieTotalRenew, type: 1}}">{{$t('AI.myAi.text7')}}</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$a8 = #2d3436 // 文字颜色
.myAi
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
      this.getMyAi()
      this.oppenAiPrice()
    })
  },
  computed: {
    ...mapGetters([
      'myAiList',
      'aiPriceData',
      'language'
    ])
  },
  methods: {
    getMyAi () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 20)
      this.$store.dispatch('getMyAi', {formData: formData}) // 获取已开通的人工智能
    },
    oppenAiPrice () {
      let formData = new FormData()
      formData.append('productid', this.$route.query.aiId)
      this.$store.dispatch('oppenAiPrice', {formData: formData}) // 开通人工智能的价格
    }
  }
}
</script>
