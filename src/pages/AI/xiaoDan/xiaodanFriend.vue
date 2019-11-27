<template>
  <div class="setTrusteeship">
    <h3 class="secret-title">小单托管</h3>
    <div class="setBox">
      <h3 class="title">设置托管好友<a class="secret-a" @click="saveFun()">保存</a></h3>
      <div class="friendsBox" ref="friendsListBox">
        <ul class="friends-list" ref="friendsList">
          <li v-for="(item, index) in friendList" :key="index" @click="item.isCheck = !item.isCheck">
            <div class="li-box">
              <div class="li-lf">
                <img :src='item.imgUrl' alt="" class="userImg">
                <span class="userName">{{item.nickName}}</span>
              </div>
              <div class="check" :class="{checked: item.isCheck}"></div>
            </div>
          </li>
        </ul>
        <div class="loading" v-if="loadingShow">
          <img src="../../../assets/images/basic/loading.gif" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$f2 = #1f222e // 背景颜色
$border = #33384d // 边框颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.setTrusteeship
  padding-top 60px
  .setBox
    width 800px
    height 960px
    border 1px solid $border
    border-radius 6px
    overflow hidden
    .title
      height 60px
      line-height 60px
      background-color $f2
      text-align center
      position relative
      font-weight normal
      .secret-a
        height 40px
        padding 5px
        position absolute
        right 15px
        top 10px
        display flex
        align-items center
        cursor pointer
        user-select none
        font-weight normal
    .friendsBox
      padding 20px 10px
      width calc(100% + 20px)
      height 920px
      overflow-x hidden
      overflow-y auto
      padding-right 30px
      &::-webkit-scrollbar
        display none
      .friends-list
        overflow hidden
        li
          width 50%
          float left
          padding 0 10px
          cursor pointer
          user-select none
          .li-box
            display flex
            align-items center
            justify-content space-between
            padding 20px 30px
            margin-bottom 20px
            background-color $f2
            border-radius 6px
            .li-lf
              display flex
              align-items center
              .userImg
                display block
                width 60px
                height 60px
                border-radius 100%
              .userName
                width 192px
                margin-left 20px
                color #fff
                text-overflow ellipsis
                white-space nowrap
                overflow hidden
            .check
              width 32px
              height 32px
              background url("../../../assets/images/xiaodan/check.png") no-repeat
              background-size cover!important
              background-position center!important
              &.checked
                background url("../../../assets/images/xiaodan/checked.png") no-repeat
  .loading
    height 60px
    display flex
    justify-content center
    img
      display block
      width 40px
      height 40px
</style>

<script>
export default{
  data () {
    return {
      timer: null,
      nowPage: 1,
      friendList: [],
      userModeList: [],
      loadingShow: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.friendsListBox.addEventListener('scroll', this.handleScroll)
      this.getFriendsList(1)
    })
  },
  destroyed () {
    clearInterval(this.timer) // 关闭轮询
  },
  methods: {
    handleScroll (e) {
      let wholeHeight = e.target.scrollHeight
      let scrollTop = e.target.scrollTop
      let divHeight = e.target.clientHeight
      if (scrollTop + divHeight >= wholeHeight) {
        this.loadingShow = true
        this.nowPage++
        this.getFriendsList(this.nowPage)
      }
      // console.log(this.$refs.friendsList.scrollTop)
    },
    getFriendsList (page) { // 确认扫描登录,获取好友列表
      let formdata = new FormData()
      formdata.append('page', page)
      formdata.append('pageSize', 20)
      this.$http.post(`${this.$api}/danRobot/getMyWxFriendList`, formdata).then((res) => {
        if (res.data.success) {
          res.data.data.forEach((item) => {
            let friendObj = {nickName: '', imgUrl: '', userName: '', intelligentFlag: 1, isCheck: false}
            friendObj.nickName = item.nickName
            friendObj.userName = item.userName
            friendObj.imgUrl = item.headImgUrl
            this.friendList.push(friendObj)
          })
          this.loadingShow = false
        } else if (res.data.errorcode === '1001') {
          this.$router.push('/home/xiaodan')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    saveFun () {
      this.friendList.forEach((item) => {
        let userModeObj = {userName: '', intelligentFlag: 1}
        if (item.isCheck) {
          userModeObj.userName = item.userName
          this.userModeList.push(userModeObj)
        }
      })
      if (this.userModeList.length > 0) {
        this.saveFriends()
      }
    },
    saveFriends () { // 批量设置好友托管
      let formdata = new FormData()
      formdata.append('userModeList', JSON.stringify(this.userModeList))
      this.$http.post(`${this.$api}/danRobot/changeChatModeMulti`, formdata).then((res) => {
        if (res.data.success) {
          this.$router.push({path: '/home/xiaodan/xiaodanChat'})
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
