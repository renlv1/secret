<template>
  <div class="tradeAccountManage secret-content66">
    <h3 class="secret-title">{{$route.query.currencyType}}{{$t('tradeAccountManage.text1')}}（{{accountList.length}}/6）</h3>
    <router-link tag="button" :to="{path: '/home/tradeAccount/addTradeAccount', query: {currencyType: $route.query.currencyType}}" class="secret-btn">{{$t('tradeAccountManage.text2')}}</router-link>
    <ul class="tradeAccountManage-list">
      <li v-for="(item, index) in accountList" :key="index">
        <h4>{{item.bankName}}<span>{{item.subBankName}}</span></h4>
        <p>{{item.realName}}</p>
        <p>{{item.bankNumber}}</p>
        <p>{{item.bankAddress}}</p>
        <p v-if="item.iban">iban：{{item.iban}}</p>
        <p class="li-last-p" v-if="item.swift">swift：{{item.swift}}</p>
        <div class="tradeAccountManage-list-btnBox">
          <router-link :to="{path: '/home/tradeAccount/addTradeAccount', query: {id: item.id}}" class="secret-a">{{$t('tradeAccountManage.text3')}}</router-link>
          <a class="secret-a" @click="deletePopupShow = true; deleteId = item.id">{{$t('tradeAccountManage.text4')}}</a>
        </div>
      </li>
    </ul>
    <!--删除弹窗-->
    <div class="myPopup" v-show="deletePopupShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="deletePopupShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('tradeAccountManage.text5')}}</h3>
        <p class="subtitle">{{$t('tradeAccountManage.text6')}}</p>
        <button class="secret-btn" @click="delBankInfo()">{{$t('tradeAccountManage.text7')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$f2 = #fff // 背景颜色
.tradeAccountManage
  .tradeAccountManage-list
    margin-top 40px
    margin-bottom 40px
    overflow hidden
    li
      width 100%
      min-height 190px
      float left
      background-color $f2
      padding 30px
      border 1px solid #e5e5e5
      border-radius 6px
      position relative
      margin-right 0
      margin-bottom 30px
      &.activeLi
        border 1px solid $btn31
      h4
        font-weight normal
        color #fff
        margin-bottom 15px
        span
          margin-left 30px
      p
        font-size 16px
        margin-bottom 15px
        &.li-last-p
          margin-bottom 0
      .tradeAccountManage-list-btnBox
        font-size 0
        position absolute
        top 50%
        transform translate(0, -50%)
        right 30px
        .secret-a
          font-weight bold
          font-size 16px
          padding 10px
          &:first-child
            margin-right 20px
</style>

<script>
export default{
  data () {
    return {
      accountList: [],
      deleteId: 0, // 所删除银行账户的id
      deletePopupShow: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.queryBankInfoList()
    })
  },
  methods: {
    // 请求银行卡信息列表
    queryBankInfoList () {
      let formData = new FormData()
      formData.append('currency', this.$route.query.currencyType)
      this.$http.post(this.$api + '/bank/queryBankInfoList', formData).then((res) => {
        this.accountList = res.data.data
      })
    },
    // 删除
    delBankInfo () {
      let formData = new FormData()
      formData.append('bankInfoId', this.deleteId)
      this.$http.post(this.$api + '/bank/delBankInfo', formData).then((res) => {
        this.deletePopupShow = false
        if (res.data.success) {
          this.$store.dispatch('errAction', {bool: true, msg: this.$t('tradeAccountManage.text8')}) // 弹窗提示
          this.queryBankInfoList()
        } else {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
        }
      })
    }
  }
}
</script>
