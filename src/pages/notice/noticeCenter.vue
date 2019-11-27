<template>
  <div class="noticeCenter secret-wrap">
    <a class="secret-back" @click="$router.go(-1)"><img src="../../assets/images/basic/back.png" alt="">{{$t('safeSetting.text1')}}</a>
    <div class="secret-wrap-ct">
      <h3 class="title">{{$t('notice.text1')}}</h3>
      <ul>
        <router-link tag="li" :to="{path: '/noticeCenter/noticeDetail', query: {noticeId: item.id}}" v-for="(item, index) in noticeList" :key="item.id">
          <div class="li-top">
            <span>{{item.title}}</span>
            <span>{{$changeDate(item.createtime, '/', 1)}}</span>
          </div>
          <div v-if="index === 0" class="li-content" v-html="item.content"></div>
        </router-link>
      </ul>
      <v-turnPage :propsPage="pagesTotal" @noticeTrunPage="parentTurnPage"></v-turnPage>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$cor52 = #2d3436 // 字体颜色
$border = #e6e6e6 // 边框颜色
.noticeCenter
  margin-top 100px
  text-align center
  ul
   li
    border-bottom 1px solid $border
    cursor pointer
    .li-top
      height 50px
      display flex
      align-items center
      justify-content space-between
      color $cor52
      span
        &:nth-child(2)
          font-size 16px
    .li-content
      text-align left
      max-height 85px
      line-height 1.5
      color $cor52
      margin-bottom 30px
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      overflow hidden
</style>

<script>
export default{
  data () {
    return {
      pagesTotal: 1, // 查看业绩总页数
      nowPage: 1, // 当前页数
      noticeList: []
    }
  },
  components: {
    vTurnPage: resolve => require(['../../components/turnPage.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      this.getNoticeList(1)
    })
  },
  methods: {
    getNoticeList (page) { // 获取公告列表
      // type1：系统公告 2：普通公告（不填查全部）
      this.$http.post(this.$api + `/notice/noticeList?&pageIndex=${page}&pageSize=20`).then((res) => {
        if (res.data.success) {
          this.noticeList = res.data.data // 列表
          this.pagesTotal = res.data.mapData.sumpage
        } else {
          this.pagesTotal = 0
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    parentTurnPage (page) {
      this.nowPage = page
      this.getNoticeList(page)
    }
  }
}
</script>
