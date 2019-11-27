<template>
  <div class="basicSituation">
    <ul class="secret-list">
      <li class="first-li">
        <router-link tag="h3" to="/noticeCenter" class="title title-notice">{{$t('basicSituation.text0')}}： {{firstNotice.title}}</router-link>
      </li>
      <li>
        <div class="li-lf">
          <h3 class="title">{{$t('basicSituation.text1')}}</h3>
          <p id="userAddress">{{userInfo.address}}</p>
        </div>
        <div class="li-rt">
          <a class="copy-btn" ref="addressCopy" @click="copyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#userAddress"></a>
          <a class="copy-btn adress-btn" @click="showQrPopup(1)"></a>
        </div>
      </li>
      <li>
        <div class="li-lf">
          <h3 class="title">{{$t('basicSituation.text2')}} <span class="em">{{$t('basicSituation.text11')}}</span></h3>
          <p id="ytfAddress">{{userInfo.systemAddress}}</p>
        </div>
        <div class="li-rt">
          <a class="copy-btn" ref="addressCopy2" @click="copyAddress(2)" data-clipboard-action="copy" data-clipboard-target="#ytfAddress"></a>
          <a class="copy-btn adress-btn" @click="showQrPopup(2)"></a>
        </div>
      </li>
      <li>
        <div class="li-btBox">
          <h3 class="title">{{$t('basicSituation.text3')}}：</h3>
          <div class="li-bt">
            <span>{{userBalanceUSD | fourNumber}} <i>USD</i></span>
            <div class="li-bt-btn">
              <router-link to="/home/recharge" class="secret-a">{{$t('basicSituation.text4')}}</router-link>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="li-btBox">
          <h3 class="title">{{$t('basicSituation.text5')}}：</h3>
          <div class="li-bt">
            <span>{{userBalanceSIE | fourNumber}} <i>SIE</i></span>
            <div class="li-bt-btn">
              <router-link to="/home/transferOut/1" class="secret-a">{{$t('basicSituation.text6')}}</router-link>
              <router-link to="/home/transferIn" class="secret-a">{{$t('basicSituation.text7')}}</router-link>
              <router-link to="/home/transferOut/2" class="secret-a">{{$t('basicSituation.text8')}}</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="myPopup" v-show="qrPopupShow">
      <div class="myPopup-tip">
        <div id="qrcodeBox"></div>
        <p class="qrCode-p">{{$t('basicSituation.text9')}}</p>
        <button class="secret-btn" @click="closeQrPopup()">{{$t('basicSituation.text10')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$btn31 = #c31739 // 按钮颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
.basicSituation
  width 780px
  padding-top 30px
  .secret-list
    li
      &.first-li
        .title-notice
          cursor pointer
      .li-lf
        flex 1
        p
          color $a8
        .em
          font-size: 14px
          color rgba(255,2,2, 1)
      .li-rt
        .copy-btn
          background url("../../assets/images/basic/copy.png") no-repeat
          &:first-child
            margin-right 40px
          &.adress-btn
            background url("../../assets/images/basic/qrCode.png") no-repeat
  .myPopup
    #qrcodeBox
      display flex
      align-items center
      justify-content center
      width 160px
      height 160px
      margin 0 auto
      background-color #fff
      margin-bottom: 20px
    .qrCode-p
      margin-bottom 30px
</style>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      copyBtn: null,
      copyBtn2: null,
      qrPopupShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'userBalanceSIE',
      'userBalanceUSD',
      'firstNotice' // 公告列表第一条
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.getNoticeList()
      this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
      this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
    })
  },
  methods: {
    getNoticeList () {
      let formData = new FormData()
      formData.append('pageIndex', 1)
      formData.append('pageSize', 1)
      this.$store.dispatch('noticeAction', {formData: formData})
    },
    copyAddress (val) {
      if (val === 1) {
        let clipboard = this.copyBtn
        clipboard.on('success', () => {
          alert('复制成功')
          clipboard.destroy()
          this.copyBtn = new this.Clipboard(this.$refs.addressCopy) // 复制
        })
      } else if (val === 2) {
        let clipboard = this.copyBtn2
        clipboard.on('success', () => {
          alert('复制成功')
          clipboard.destroy()
          this.copyBtn2 = new this.Clipboard(this.$refs.addressCopy2) // 复制
        })
      }
    },
    closeQrPopup () { // 关闭二维码
      this.qrPopupShow = false
      $('#qrcodeBox').html('')
    },
    showQrPopup (val) { // 显示二维码
      this.qrPopupShow = true
      let downloadUrl
      if (val === 1) {
        downloadUrl = this.$utf16to8(this.userInfo.address) // 绘制二维码
      } else if (val === 2) {
        downloadUrl = this.$utf16to8(this.userInfo.systemAddress) // 绘制二维码
      }
      $('#qrcodeBox').qrcode({
        render: 'canvas', //     table方式
        width: 150, //            宽度
        height: 150, //            高度
        text: downloadUrl //      任意内容
      })
    }
  }
}
</script>
