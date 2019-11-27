<template>
  <div class="noticeDetail secret-wrap">
    <a class="secret-back" @click="$router.go(-1)"><img src="../../assets/images/basic/back.png" alt="">{{$t('notice.text2')}}</a>
    <div class="secret-wrap-ct">
      <h3 class="title">{{noticeDetail.title}}</h3>
      <h4 class="subtitle">{{$t('notice.text3')}}：{{$changeDate(noticeDetail.createtime, '/', 1)}}</h4>
      <div class="content" v-html="noticeDetail.content"></div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$cor52 = #2d3436 // 字体颜色
.noticeDetail
  margin-top 100px
  .secret-wrap-ct
    width 740px
    .title
      margin-bottom 40px
    .subtitle
      font-weight normal
      text-align center
      color $cor52
      margin-bottom 40px
</style>

<script>
export default{
  data () {
    return {
      noticeId: '',
      noticeDetail: Object
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.noticeId = this.$route.query.noticeId
      this.getNoticeDetail()
    })
  },
  methods: {
    getNoticeDetail () { // 获取公告详情
      this.$http.post(this.$api + `/notice/noticeDetail?&id=${this.noticeId}`).then((res) => {
        if (res.data.success) {
          this.noticeDetail = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
