<template>
  <div class="accountManage secret-content72">
    <h3 class="secret-title">{{$t('tradeAccount.text1')}}</h3>
    <ul class="secret-list">
      <li v-for="(item, index) in userBankList" :key="index">
        <div class="li-btBox">
          <h3 class="title">{{item.currency}}{{$t('tradeAccount.text2')}}</h3>
          <div class="li-bt">
            <span>{{$t('tradeAccount.text3')}}：<i>{{item.countNum}}</i></span>
            <div class="li-bt-btn">
              <router-link :to="{path: '/home/tradeAccount/tradeAccountManage', query: {currencyType: item.currency}}" class="secret-a">{{$t('tradeAccount.text4')}}</router-link>
              <router-link :to="{path: '/home/tradeAccount/addTradeAccount', query: {currencyType: item.currency}}" class="secret-a" v-if="item.countNum < 6">{{$t('tradeAccount.text5')}}</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$a8 = #2d3436 // 文字颜色
.accountManage
  .secret-list
    li
      .li-btBox
        .li-bt
          span
            font-size 16px
            color $a8
</style>

<script>
export default{
  data () {
    return {
      userBankList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.queryUserBankIndex()
    })
  },
  methods: {
    // 请求银行卡信息列表
    queryUserBankIndex () {
      this.$http.post(`${this.$api}/bank/userBankIndex`).then((res) => {
        if (res.data.success && JSON.stringify(res.data.data) !== '[]') {
          this.userBankList = res.data.data
        }
      })
    }
  }
}
</script>
