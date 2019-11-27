<template>
  <div class="userAccount secret-wrap">
    <router-link to="/home" class="secret-back"><img src="../../assets/images/basic/back.png" alt="">{{$t('bindPhone.text1')}}</router-link>
    <div class="secret-wrap-ct">
      <h3 class="secret-title">{{$t('userAccount.text0')}}</h3>
      <ul class="secret-list">
        <li class="first-li">
          <h4>{{$t('userAccount.text1')}}：</h4>
          <span>{{userInfo.userName}}</span>
        </li>
        <li class="first-li">
          <h4>{{$t('userAccount.text2')}}：</h4>
          <span>{{userInfo.email}}</span>
        </li>
        <li class="first-li">
          <h4>{{$t('userAccount.text3')}}：</h4>
          <span v-if="userInfo.openMobileCode === 2">{{userInfo.mobile}}</span>
          <router-link to="/bindPhone" class="secret-a" v-if="userInfo.openMobileCode !== 2">{{$t('userAccount.text4')}}</router-link>
        </li>
        <li>
          <div class="li-btBox">
            <h3 class="title">{{$t('userAccount.text5')}}</h3>
            <div class="li-bt">
              <span id="userAddress">{{userInfo.address}}</span>
              <div class="li-bt-btn">
                <a class="copy-btn" ref="addressCopy" @click="copyAddress(1)" data-clipboard-action="copy" data-clipboard-target="#userAddress"></a>
                <a class="copy-btn adress-btn" @click="showQrPopup(1)"></a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-btBox">
            <h3 class="title">{{$t('userAccount.text6')}}</h3>
            <div class="li-bt">
              <span id="ytfAddress">{{userInfo.systemAddress}}</span>
              <div class="li-bt-btn">
                <a class="copy-btn" ref="ytfAddress" @click="copyAddress(2)" data-clipboard-action="copy" data-clipboard-target="#ytfAddress"></a>
                <a class="copy-btn adress-btn" @click="showQrPopup(2)"></a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-btBox">
            <h3 class="title">{{$t('userAccount.text7')}}：</h3>
            <div class="li-bt">
              <span>{{userInfo.openTradePassword === 2 ? $t('userAccount.text8') : $t('userAccount.text9')}}</span>
              <div class="li-bt-btn">
                <router-link to="/safeSetting" class="secret-a">{{userInfo.openTradePassword === 2 ? $t('userAccount.text10') : $t('userAccount.text11')}}</router-link>
              </div>
            </div>
          </div>
        </li>
        <li class="ggLi">
          <div class="li-btBox">
            <h3 class="title">{{$t('userAccount.text12')}}：</h3>
            <div class="li-bt">
              <div class="unOpenBox">
                <span>{{userInfo.openGoogleCode === 2 ? $t('userAccount.text13') : $t('userAccount.text14')}}</span>
                <div class="li-bt-btn">
                  <a class="secret-a" @click="openCloseGoogle()">{{userInfo.openGoogleCode === 2 ? $t('userAccount.text15') : $t('userAccount.text16')}}</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="myPopup" v-show="securityShow">
      <div class="myPopup-tip">
        <a class="close-btn" @click="securityShow = false">
          <img src="../../assets/images/basic/close.png" alt="">
        </a>
        <h3 class="title">{{$t('userAccount.text23')}}</h3>
        <p class="subtitle">{{$t('userAccount.text24')}}</p>
        <div class="inputTipBox">
          <div class="inputTipDiv">
            <input class="secret-inputTip secret-input" type="password" v-model.trim="safePassword" :placeholder="$t('userAccount.text25')" @focus="safePasswordTipShow = false">
          </div>
          <span class="inputTipMsg" :class="{inputTipMsgActive: safePasswordTipShow}">{{$t('userAccount.text25')}}</span>
        </div>
        <button class="secret-btn" @click="openGoogleFun()">{{$t('userAccount.text26')}}</button>
      </div>
    </div>
    <!--验证码弹窗-->
    <div class="myPopup" v-show="qrPopupShow">
      <div class="myPopup-tip">
        <div id="qrcodeBox"></div>
        <p class="qrCode-p">{{$t('userAccount.text27')}}</p>
        <button class="secret-btn" @click="closeQrPopup()">{{$t('userAccount.text15')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$btn31 = #0080f4 // 按钮颜色
.userAccount
  margin-top 100px
  .secret-wrap-ct
    width 1080px
    .secret-title
      text-align center
      font-size 25px
      margin-bottom 40px
    .secret-list
      li
        &.first-li
          padding-right 40px
          h4
            color #2d3436
            font-weight normal
        .li-btBox
          .title
            font-size 18px
            text-align left
            font-weight normal
            color #2d3436
            margin-bottom 15px
        .li-bt
          span
            font-size 20px
            font-weight normal
            &.inputTipMsg
              font-size 16px
            &.inputTipMsgActive
              color $btn31
          .li-bt-btn
            .secret-a
              font-weight normal
            .copy-btn
              width 22px
              height 22px
              background url("../../assets/images/basic/qrCode.png") no-repeat
              &:first-child
                margin-right 30px
                background url("../../assets/images/basic/copy.png") no-repeat
        &.ggLi
          height auto
          padding-top 30px
          padding-bottom 30px
          .unOpenBox
            width 100%
            display flex
            align-items center
            justify-content space-between
          .title
            margin-bottom 30px
          .gg-content
            width 100%
            .qrCodeBox
              display flex
              color #fff
              margin-bottom 40px
              #ggQrCode
                display flex
                align-items center
                justify-content center
                width 128px
                height 128px
                margin-right 30px
                vertical-align top
                background-color #ffffff
              .qrCode-right
                h3
                  font-weight normal
                  margin-bottom 10px
                p
                  margin-bottom 25px
                button
                  width 160px
            .openGg-btnBox
              display flex
              align-items flex-end
              .secret-btn-Box
                display flex
                padding-bottom 30px
                .secret-btn
                  width 160px
                  &:last-child
                    margin-left 20px
                    background-color #464958
              .inputTipBox
                width 520px
                margin-right 30px
                .inputTip-title
                  span
                    font-size 18px
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
    .myPopup-tip
      .subtitle
        margin-bottom 25px
      .inputTipBox
        .inputTipMsg
          top 13px
          left 0
          &.inputTipMsgActive
            top 50px
</style>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      lang: 'cn',
      copyBtn: null,
      copyBtn2: null,
      copyBtn3: null,
      qrPopupShow: false,
      securityShow: false, // 开启谷歌验证安全密码弹窗
      safePassword: '',
      safePasswordTipShow: false,
      openCodeUrl: '',
      openGgKey: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  mounted () {
    this.$nextTick(() => {
      if (localStorage.getItem('secretWebLang') === 'CN') {
        this.lang = 'cn'
      } else {
        this.lang = 'en'
      }
      this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
      this.copyBtn2 = new this.Clipboard(this.$refs.ytfAddress) // 复制
      this.$store.dispatch('balanceAction') // 用户信息
    })
  },
  methods: {
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
          this.copyBtn2 = new this.Clipboard(this.$refs.ytfAddress) // 复制
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
    },
    openCloseGoogle () { // 关闭或开启谷歌验证码
      if (this.userInfo.openGoogleCode === 2) {
        this.$router.push({path: '/unbindGoogleValidation'})
      } else {
        this.securityShow = true
      }
    },
    openGoogleFun () {
      if (this.safePassword === '') {
        this.safePasswordTipShow = true
      } else {
        this.securityShow = false
        let formData = new FormData()
        formData.append('type', 1) // 开启谷歌验证码
        formData.append('tradePwd', this.safePassword)
        this.$http.post(this.$api + '/user/googleOpenClose', formData, {headers: {'secret-language': this.lang}}).then((res) => {
          if (res.data.success) {
            this.openCodeUrl = this.$utf16to8(res.data.data.qrUrl)
            this.openGgKey = res.data.data.secret
            // setsafe:// 1：已设置安全问题  2：未设置安全问题
            this.$router.push({path: '/bindGoogleValidation', query: {openCodeUrl: this.openCodeUrl, openGgKey: this.openGgKey, setsafe: res.data.mapData.setsafe}})
          } else {
            this.$store.dispatch('errAction', {bool: true, msg: res.data.msg}) // 弹窗提示
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      this.safePassword = '' // 清空安全密码
    }
  }
}
</script>
