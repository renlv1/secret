<template>
  <div class="xiaodan">
    <div class="transferIn">
      <h3 class="secret-title">小单机器人</h3>
      <p class="subtitle">小单机器人现提供实验性功能，托管微信聊天。通过用户扫码绑定微信后，小单可以利用微信接口与您的好友进行聊天。</p>
      <p class="tip"><span>温馨提醒：</span>由于微信接口限制，部分用户可能无法使用此功能。</p>
      <div class="qrCodeBox">
        <div class="qrCode" id="ccQrCode"></div>
        <p class="qrCodeBox-tip">请使用微信扫描二维码登录微信网页版完成账号绑定</p>
        <p class="qrCodeBox-address"><span>温馨提示：</span>绑定时间会比较长，请耐心等待</p>
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
.xiaodan
  .transferIn
    .tip
      margin-bottom 100px
    .qrCodeBox-tip
      margin-top 60px
    .qrCodeBox-address
      margin-top 30px
      font-size 16px
      span
        color $btn31
</style>

<script>
import $ from 'jquery'
export default{
  data () {
    return {
      timer: null,
      userImg: '',
      userName: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getLoginQrUrl()
      this.timer = setInterval(() => { // 轮询查询用户扫码登录
        this.confirmLogin()
      }, 5000)
    })
  },
  destroyed () {
    clearInterval(this.timer) // 关闭轮询
  },
  methods: {
    getLoginQrUrl () { // 获取登录二维码
      this.$http.post(`${this.$api}/danRobot/getQrCode`).then((res) => {
        if (res.data.success) {
          this.address = res.data.data.qrUrlContent
          this.getQrCode()
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    confirmLogin () { // 确认扫描登录
      this.$http.post(`${this.$api}/danRobot/confirmLogin`).then((res) => {
        if (res.data.success) {
          this.userImg = res.data.data.webChatInfo.wxImgUrl
          this.userName = res.data.data.webChatInfo.userName
          clearInterval(this.timer) // 关闭轮询
          this.$router.push({path: '/home/xiaodan/xiaodanFriend', query: {userImg: this.userImg, userName: this.userName}})
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getQrCode () {
      let downloadUrl = this.$utf16to8(this.address)
      $('#ccQrCode').qrcode({
        render: 'canvas', //     table方式
        width: 230, //            宽度
        height: 230, //            高度
        text: downloadUrl //      任意内容
      })
    }
  }
}
</script>
