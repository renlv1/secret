<template>
  <div class="xiaodanChat">
    <h3 class="secret-title">小单托管</h3>
    <div class="chatBox">
      <div class="menu" :class="{activeMenu: menuShow}">
        <div class="menu-mask" @click="menuShow = false"></div>
        <div class="menuBox">
          <div class="menu-head">
            <img :src='userInfo.imgUrl' alt="" class="userImg">
            <div class="menu-head-rt">
              <p>{{userInfo.userName}}</p>
              <router-link to="/home/xiaodan" class="secret-a">退出账号</router-link>
            </div>
          </div>
          <div class="menulistBox">
            <ul class="menu-list">
              <li v-for="(item, index) in friendList" :key="index" @click="getChatLog(item.nickName, item.userImg)">
                <img :src='item.userImg' alt="">
                <div class="li-rt">
                  <h4>{{item.nickName}}</h4>
                  <div class="li-rt-bt">
                    <p>{{item.msgData[0].msg}}</p>
                    <span>{{item.msgData.length}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="chatBox-head">
        <div class="chatBox-head-lf">
          <a class="chatBox-head-menu" @click="menuShow = true"></a>
          <div class="userInfo">
            <img :src='userInfo.imgUrl' alt="" class="userImg">
            <div class="userInfo-rt">
              <p>{{userInfo.userName}}</p>
              <a v-if="totalNewMsg !== 0">{{totalNewMsg}}条新消息</a>
            </div>
          </div>
        </div>
        <router-link tag="div" to="/home/xiaodan/xiaodanFriend" class="chatBox-head-set"></router-link>
      </div>
      <ul class="chatBox-content" ref="chatContent" id="chatContent">
        <li :class="{chatRightLi: !item.isRight}" v-for="item in chatList" :key="item.id">
          <img v-if="!item.isRight" :src='userInfo.imgUrl' alt="">
          <img v-if="item.isRight" :src='chatUserImg' alt="">
          <div>
            <p>{{item.msg}}</p>
          </div>
        </li>
      </ul>
      <div class="inputHead">
        <span>当前模式：</span>
        <div class="inputTipBox inputTipBox-select">
          <div class="inputTipDiv">
            <a class="discount-btn" ref="discountBtn" @click="chatMode.modeSelectShow = !chatMode.modeSelectShow">{{chatMode.modeList[chatMode.modeIndex].name}}<i class="arrowDown" :class="{arrowActive: chatMode.modeSelectShow}"></i></a>
            <ul class="selectMenu" :class="{selectMenuActive: chatMode.modeSelectShow}">
              <li :class="{liActive: chatMode.modeIndex === index}" v-for="(item, index) in chatMode.modeList" :key="item.name" @click="chooseMode(index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
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
/*$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$btn31 = #c31739 // 按钮颜色
$border = #33384d // 边框颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.xiaodanChat
  padding-top 60px
  .secret-title
    margin-bottom 30px
  .chatBox
    width 800px
    border-radius 6px
    border 1px solid $border
    position relative
    overflow hidden
    .menu
      width 100%
      height 100%
      position absolute
      top 0
      left -800px
      z-index 998
      transition all .35s linear
      &.activeMenu
        left 0
      .menu-mask
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        background-color rgba(0,0,0,0.4)
      .menuBox
        position absolute
        top 0
        left 0
        width 380px
        height 100%
        background-color $f2
        padding 20px
        z-index 999
        .menu-head
          height 120px
          display flex
          align-items center
          padding-left 10px
          border-bottom 1px solid #181a24
          .userImg
            display block
            width 80px
            height 80px
            border-radius 100%
          .menu-head-rt
            font-size 0
            margin-left 20px
            p
              font-size 18px
              color #fff
              margin-bottom 15px
            a.secret-a
              font-size 16px
        .menulistBox
          overflow hidden
          .menu-list
            width calc(100% + 20px)
            height 820px
            padding-right 20px
            overflow-y auto
            li
              height 80px
              display flex
              align-items center
              padding-left 10px
              border-bottom 1px solid #181a24
              cursor pointer
              img
                display block
                width 60px
                height 60px
                border-radius 100%
              .li-rt
                margin-left 20px
                flex 1
                h4
                  font-weight normal
                  color #fff
                  margin-bottom 5px
                .li-rt-bt
                  display flex
                  align-items center
                  p
                    width 200px
                    flex 1
                    font-size 16px
                    text-overflow ellipsis
                    white-space nowrap
                    overflow hidden
                  span
                    display flex
                    align-items center
                    justify-content center
                    width 20px
                    height 20px
                    font-size 14px
                    border-radius 10px
                    color #fff
                    background-color $btn31
    .chatBox-head
      height 60px
      padding-right 30px
      background-color $f2
      display flex
      align-items center
      justify-content space-between
      .chatBox-head-lf
        display flex
        align-items center
        .chatBox-head-menu
          width 20px
          height 19px
          background url("../../../assets/images/xiaodan/menu.png") no-repeat
          background-size cover
          margin-right 20px
          cursor pointer
          &:active
            opacity .6
        .userInfo
          display flex
          align-items center
          .userImg
            display block
            width 48px
            height 48px
            margin-right 18px
            border-radius 100%
          .userInfo-rt
            a
              color $btn31
              font-size 16px
      .chatBox-head-set
        width 24px
        height 23px
        background url("../../../assets/images/xiaodan/set.png") no-repeat
        background-size cover
        cursor pointer
        &:active
          opacity .6
    .chatBox-content
      width calc(100% + 20px)
      height 666px
      padding-left 30px
      padding-top 40px
      padding-right 50px
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
    .inputHead
      height 60px
      padding 0 30px
      background-color $f2
      display flex
      align-items center
      .inputTipBox-select
        padding-bottom 0
        .discount-btn
          width 160px
          font-size 18px
          position relative
          justify-content flex-start
          .arrowDown
            margin-left 8px
        .selectMenu
          border-radius 6px
          li
            padding 0
            margin 0 20px
            text-align center
            border-bottom 1px solid $c26
            &:last-child
              border-bottom none
    .chatBox-input
      background-color $c26
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
            background-color $c26
            font-size 18px
            color #ffffff
            line-height 1.5
            resize none
            outline none
            border none
            &::-webkit-scrollbar
              display none
            &::-webkit-input-placeholder
              color $a8
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
      totalNewMsg: 0,
      friendList: [],
      chatList: [],
      chatMode: {
        modeSelectShow: false, // 弹窗关闭
        modeIndex: 0,
        modeList: [
          {name: '聊天模式'},
          {name: '托管模式'},
          {name: '训练模式'}
        ]
      },
      menuShow: true,
      chatNickName: '',
      chatUserImg: '',
      chatUserName: '',
      textareaMsg: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeModeMenu) // 点击其他地方关闭下拉菜单
      this.checkNewMsg()
      this.getNewMessageList(3)
      this.timer = setInterval(() => { // 轮询查询用户扫码登录
        this.checkNewMsg()
        this.getNewMessageList(3)
      }, 5000)
      this.textareaEven() //  回车不换行
    })
  },
  destroyed () {
    clearInterval(this.timer) // 关闭轮询
    document.removeEventListener('click', this.closeModeMenu) // 组件摧毁时关闭监听
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  methods: {
    chooseMode (index) { // 选择模式
      let modeType
      this.chatMode.modeSelectShow = false
      this.chatMode.modeIndex = index
      if (index === 0) {
        modeType = 2
      } else if (index === 1) {
        modeType = 1
      } else {
        modeType = 3
      }
      this.changeChatMode(modeType)
    },
    closeModeMenu (event) {
      if (!this.$refs.discountBtn.contains(event.target)) {
        this.chatMode.modeSelectShow = false
      }
    },
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
      let formdata = new FormData()
      formdata.append('remarkNameQuery', this.chatNickName) // 根据备注名查询发送请求需要的username
      this.$http.post(`${this.$api}/danRobot/getMyWxFriendList`, formdata).then((res) => { // 确认扫描登录,获取好友列表,查询发送请求需要的username
        if (res.data.success) {
          if (res.data.data.length === 0) {
            let formdata2 = new FormData()
            formdata2.append('nickNameQuery', this.chatNickName)
            this.$http.post(`${this.$api}/danRobot/getMyWxFriendList`, formdata2).then((res) => {
              if (res.data.success) {
                this.chatUserName = res.data.data[0].userName
                this.sendMsgFun()
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            this.chatUserName = res.data.data[0].userName
            this.sendMsgFun()
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    sendMsgFun () { // 发送消息
      let formData = new FormData()
      formData.append('toUserName', this.chatUserName)
      formData.append('message', this.textareaMsg)
      this.$http.post(`${this.$api}/danRobot/sendWechatMessage`, formData).then((res) => {
        if (res.data.success) {
          this.scrollBottom()
          this.getChatLog(this.chatNickName, this.chatUserImg) // 获取聊天记录
          this.textareaMsg = '' // 清空
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getChatLog (name, img) { // 获取聊天记录
      this.chatNickName = name
      this.chatUserImg = img
      this.menuShow = false // 关闭菜单栏
      // let hDate = this.$changeDate(new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000), '-', 5) // 当前时间的前半小时
      let formdata = new FormData()
      formdata.append('lastID', 0) // 获取id值 大于lastID的消息(第一次不传)
      formdata.append('friendName', '') // 微信好友用户名
      formdata.append('messageType', 0) // 2:微信消息(发送到微信好友) 3 微信消息(微信好友发来的消息)
      formdata.append('startDate', '') // 消息查询开始时间(当前时间的半个小时之前)
      formdata.append('endDate', '') // 消息查询结束时间(当前时间)
      formdata.append('page', 1)
      formdata.append('pageSize', 10)
      this.$http.post(`${this.$api}/danRobot/getNewMessageList`, formdata).then((res) => {
        if (res.data.success) {
          let dataObj = res.data.data.reverse()
          // console.log(dataObj)
          this.chatList = []
          dataObj.forEach((val) => {
            let msgObj = {msg: '', isRight: false}
            if (JSON.parse(val.body).otherNickName === name) {
              if (JSON.parse(val.body).fromUsername === this.userInfo.userName) {
                msgObj.msg = JSON.parse(val.body).text
                this.chatList.push(msgObj)
              } else {
                msgObj.msg = JSON.parse(val.body).text
                msgObj.isRight = true
                this.chatList.push(msgObj)
              }
            }
          })
          this.scrollBottom()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getNewMessageList (type) { // 获取导航新消息列表
      // let hDate = this.$changeDate(new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000), '-', 5) // 当前时间的前半小时
      let formdata = new FormData()
      formdata.append('lastID', 0) // 获取id值 大于lastID的消息(第一次不传)
      formdata.append('friendName', '') // 微信好友用户名
      formdata.append('messageType', type) // 2:微信消息(发送到微信好友) 3 微信消息(微信好友发来的消息)
      formdata.append('startDate', '') // 消息查询开始时间(当前时间的半个小时之前)
      formdata.append('endDate', '') // 消息查询结束时间(当前时间)
      formdata.append('page', 1)
      formdata.append('pageSize', 20)
      this.$http.post(`${this.$api}/danRobot/getNewMessageList`, formdata).then((res) => {
        if (res.data.success) {
          this.totalNewMsg = res.data.mapData.totalRecord // 新消息总数
          let mapOb = {}
          this.friendList = []
          // console.log(this.friendList)
          for (let i = 0; i < res.data.data.length; i++) {
            let dataObj = res.data.data[i]
            if (!mapOb[JSON.parse(dataObj.body).otherNickName]) {
              this.friendList.push({
                nickName: JSON.parse(dataObj.body).otherNickName,
                userImg: JSON.parse(dataObj.body).otherHeadImgUrl,
                msgData: [{msg: JSON.parse(dataObj.body).text}]
              })
              mapOb[JSON.parse(dataObj.body).otherNickName] = dataObj
            } else {
              for (let j = 0; j < this.friendList.length; j++) {
                let msgObj = this.friendList[j]
                if (msgObj.nickName === JSON.parse(dataObj.body).otherNickName) {
                  msgObj.msgData.push({msg: JSON.parse(dataObj.body).text})
                  break
                }
              }
            }
          }
        } else if (res.data.errorcode === '1001') {
          this.$router.push('/home/xiaodan')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    checkNewMsg () { // 检查微信最新消息
      this.$http.post(`${this.$api}/danRobot/checkWxMsg`).then((res) => {
        if (res.data.success) {
          // console.log(res)
        } else if (res.data.errorcode === '1001') {
          this.$router.push('/home/xiaodan')
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeChatMode (type) { // 修改用户聊天模式
      let formdata = new FormData()
      formdata.append('wxUserName', this.chatUserName)
      formdata.append('intelligentFlag', type) // 聊天模式 1:托管模式 2:人工模式 3 训练模式
      this.$http.post(`${this.$api}/danRobot/changeChatMode`, formdata).then((res) => {
        if (res.data.success) {
          console.log(res)
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
