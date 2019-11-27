<template>
  <div class="appealDetail secret-content66">
    <div class="breadcrumb" v-if="parseInt($route.query.way) === 1">
      <router-link :to="{path: '/home/recharge'}">{{$t('appealDetail.text1')}}<i></i></router-link>
      <router-link :to="{path: '/home/recharge/rechargeDetail', query: {orderId: $route.query.orderId, way: 1}}">{{$t('appealDetail.text2')}}<i></i></router-link>
      <a>{{$t('appealDetail.text3')}}</a>
    </div>
    <div class="breadcrumb" v-if="parseInt($route.query.way) === 2">
      <router-link :to="{path: '/home/fiat'}">{{$t('appealDetail.text4')}}<i></i></router-link>
      <router-link :to="{path: '/home/fiat/rechargeDetail', query: {orderId: $route.query.orderId, way: 2}}">{{$t('appealDetail.text5')}}<i></i></router-link>
      <a>{{$t('appealDetail.text3')}}</a>
    </div>
    <div class="orderInfo">
      <p>{{$t('appealDetail.text6')}}：{{orderId}}</p>
      <p>{{$t('appealDetail.text7')}}：{{ordeOrderStatus}}</p>
      <p class="rechargeMoney">{{$t('appealDetail.text8')}}：<span>{{depositAmountInfo | fourNumber}}USD</span></p>
    </div>
    <div class="complain-type">
      <p>{{$t('appealDetail.text9')}}：{{contentType}}</p>
      <p>{{$t('appealDetail.text10')}}：</p>
      <p class="complain-type-ct">{{content}}</p>
      <div class="image-box">
        <div class="bg-img" v-for="(item, index) in imgData" :key="index" :style="{ 'background-image': 'url(' + item.imageUrl + ')'}"></div>
      </div>
    </div>
    <button class="secret-btn nopointer" disabled  v-if="tipShow === 1 || tipShow === 0">{{$t('appealDetail.text11')}}</button>
    <div class="processingResults" v-if="tipShow === 2">
      <h3>{{$t('appealDetail.text12')}}</h3>
      <p v-for="(item, index) in processingResults" :key="index">{{item.content}}</p>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$btn31 = #c31739 // 按钮颜色
$f2 = #1f222e // 背景颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.nopointer
  pointer-events none
.appealDetail
  .orderInfo
    padding 20px 40px
    border-radius 8px
    background-color $f2
    margin-top 30px
    border 1px solid $border
    p
      margin-bottom 15px
      &.rechargeMoney
        font-size 20px
        color $btn31
        margin-bottom 0
        font-weight bold
      span
        color $btn31
  .complain-type
    margin-top 60px
    color $a8
    p
      margin-bottom 20px
      &.complain-type-ct
        line-height 1.5
    .image-box
      width 680px
      display flex
      flex-wrap wrap
      margin-top 60px
      margin-bottom 60px
      .bg-img
        width: 120px
        margin-right: 20px
        height: 120px
        -webkit-background-size: cover
        background-size: cover
        background-repeat: no-repeat
        background-position: center center
        &:last-child
          margin-right: 0
      img
        height 120px
        margin-right 9px

  .secret-btn
    display block
    &:disabled
      background-color $f2
  .processingResults
    padding-top 40px
    padding-left 16px
    color #fff
    p
      margin-bottom 10px
      line-height 1.5
    h3
      position relative
      font-size 20px
      margin-bottom 20px
      &:before
        content ''
        width 6px
        height 20px
        background-color #00d563
        border-radius 1px
        position absolute
        left -16px
        top 2px
</style>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      processingResults: '',
      imgData: [],
      ordeOrderStatus: '',
      orderId: this.$route.query.orderId,
      depositAmountInfo: '',
      contentType: '',
      content: '',
      tipShow: '',
      problemId: this.$route.query.problemId
    }
  },
  created () {
    this.getDepositDetail()
    this.getComplainDetial()
  },
  methods: {
    getDepositDetail () {
      const url = `${this.$api}/deposit/depositDetail?depositId=${this.orderId}`
      this.$http.post(url).then(res => {
        let ret = res.data
        if (ret.success === true && ret.status === 'success') {
          this.depositAmountInfo = ret.data.depositAmount
          if (ret.data.status === 5) {
            this.ordeOrderStatus = this.$t('appealDetail.text13')
          } else if (ret.data.payStatus === 4) {
            this.ordeOrderStatus = this.$t('appealDetail.text14')
          }
        }
      })
    },
    // secret.pigamegroup.com/problem/  获取
    getComplainDetial () {
      let self = this
      this.$http.get(`${this.$api}/problem/get?problemId=${this.problemId}`).then(res => {
        if (res.data.success) {
          let resdata = res.data.data
          this.imgData = res.data.data.userProblem.images
          switch (res.data.data.userProblem.contentType) {
            case 1:
              self.contentType = this.$t('appealDetail.text15')
              break
            case 2:
              self.contentType = this.$t('appealDetail.text16')
              break
            case 3:
              self.contentType = this.$t('appealDetail.text17')
              break
            default:
              self.contentType = this.$t('appealDetail.text16')
              break
          }
          this.tipShow = res.data.data.userProblem.problemStatus
          if (this.tipShow !== 0) {
            this.processingResults = resdata.managerReply
          }
          this.content = res.data.data.userProblem.content
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
