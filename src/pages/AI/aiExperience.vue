<template>
  <div class="aiExperience">
    <v-breadcrumb :breadcrumbList="$t('AI.aiExperience.breadcrumbList')"></v-breadcrumb>
    <div class="chatBox">
      <div class="chatBox-head">{{$t('AI.aiExperience.text1')}}</div>
      <ul class="chatBox-content" ref="chatContent" id="chatContent">
        <li :class="{chatRightLi: !item.isRobot}" v-for="item in chatList" :key="item.id">
          <img v-if="!item.isRobot" :src='userInfo.imgUrl' alt="">
          <img v-if="item.isRobot" :src='$route.query.aiImg' alt="">
          <div>
            <p>{{item.msg}}</p>
          </div>
        </li>
      </ul>
      <div class="chatBox-input" @keyup.enter="sendChatMsg()">
        <div class="chatBox-input-box">
          <div class="textareaBox">
            <textarea ref="textareaFocus" v-model.trim="textareaMsg" :placeholder="$t('AI.aiExperience.text2')"></textarea>
          </div>
          <div class="btn-box">
            <button class="secret-btn" @click="sendChatMsg()">{{$t('popoup.text13')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*
$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$border = #33384d // 边框颜色
*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.aiExperience
  width 800px
  padding-top 60px
  .chatBox
    margin-top 40px
    border-radius 6px
    //border 1px solid $border
    box-shadow 0 0 0 1px $border
    overflow hidden
    .chatBox-head
      height 60px
      line-height 60px
      text-align center
      background-color $f2
      position relative
      &:after
        display block
        content ''
        position absolute
        width 24px
        height 23px
        background url("../../assets/images/basic/gear.png") no-repeat center
        background-size contain
        right 20px
        top 50%
        transform translateY(-50%)
    .chatBox-content
      width calc(100% + 20px)
      height 730px
      padding-left 30px
      padding-top 40px
      padding-right 50px
      background-color #f0f0f0
      border-bottom 1px solid #e6e6e6
      overflow-y auto
      -webkit-overflow-scrolling touch
      &::-webkit-scrollbar
        display none
      li
        font-size 0
        margin-bottom 20px
        overflow hidden
        &.chatRightLi
          img
            float right
            margin-left 20px
            margin-right 0
            user-select none
          div
            float right
        img
          display inline-block
          width 60px
          height 60px
          border-radius 100%
          margin-right 20px
        div
          max-width 600px
          padding 16.5px 20px
          vertical-align top
          display inline-block
          background-color $f2
          border-radius 4px
          p
            font-size 18px
            line-height 1.5
            word-break break-all
    .chatBox-input
      background-color #f0f0f0
      position relative
      .chatBox-input-box
        padding 0 30px
        padding-bottom 20px
        overflow hidden
        .textareaBox
          overflow hidden
          textarea
            width calc(100% + 20px)
            height 80px
            display block
            margin-top 20px
            padding-bottom 10px
            background-color #f0f0f0
            font-size 18px
            color #2d3436
            line-height 1.5
            resize none
            outline none
            border none
            &::-webkit-scrollbar
              display none
            &::-webkit-input-placeholder
              color #b3b3b3
        .btn-box
          text-align right
          .secret-btn
            font-size 16px
            border-radius 4px
            width 138px
            height 40px
            display inline-block
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      chatList: [],
      textareaMsg: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  components: {
    vBreadcrumb: resolve => require(['../../components/breadcrumb.vue'], resolve)
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.textareaFocus.focus() // 输入框聚焦
      this.getChatLog() // 获取聊天记录
      this.textareaEven() //  回车不换行
    })
  },
  methods: {
    textareaEven () {
      this.$refs.textareaFocus.addEventListener('keydown', (e) => {
        if (e.keyCode !== 13) {
          return
        }
        e.preventDefault()
      })
    },
    scrollBottom () {
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight // 滚动到聊天底部
      })
    },
    sendChatMsg () {
      let timestamp = new Date().getTime()
      let obj = {msg: this.textareaMsg, time: this.$changeDate(timestamp, '/', 1), id: this.chatList.length + 1, isRobot: false}
      if (this.textareaMsg.trim() !== '') {
        this.chatList.push(obj)
        this.scrollBottom()
        this.getAiReply()
      }
      this.textareaMsg = '' // 清空
    },
    getAiReply () { // 获取回复
      this.textareaMsg = encodeURI(this.textareaMsg).trim()
      this.$http.post(`${this.$api}/message/getAiReplyMessage?text=${this.textareaMsg}&toUserName=${this.userInfo.userName}&productid=${this.$route.query.productId}`).then((res) => {
        if (res.data.success) {
          let timestamp = new Date().getTime()
          let obj = {msg: res.data.data, time: this.$changeDate(timestamp, '/', 1), id: this.chatList.length + 1, isRobot: true}
          this.chatList.push(obj)
          this.scrollBottom()
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getChatLog () { // 获取聊天记录
      this.$http.post(`${this.$api}/message/userMessageLogList`).then((res) => {
        if (res.data.success) {
          let dataObj = res.data.data.reverse()
          for (let i = 0; i < res.data.data.length; i++) {
            let msgObj = {msg: '', time: this.$changeDate(dataObj[i].createtime, '/', 1), id: 0, isRobot: false}
            let msgObj2 = {msg: '', time: this.$changeDate(dataObj[i].createtime, '/', 1), id: 0, isRobot: true}
            let userMsg = JSON.parse(dataObj[i].text).current
            let robotMsg = JSON.parse(JSON.parse(dataObj[i].data)).text
            msgObj.msg = userMsg
            msgObj.id = this.chatList.length + 1
            this.chatList.push(msgObj)
            msgObj2.msg = robotMsg
            msgObj2.id = this.chatList.length + 1
            this.chatList.push(msgObj2)
          }
          this.scrollBottom()
        } else if (res.data.msg === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
