<template>
  <div class="transferIn">
    <h3 class="secret-title">{{$t('coinCoin.text1')}}</h3>
    <p class="subtitle">{{$t('coinCoin.text2')}}</p>
    <p class="tip"><span>*</span>{{$t('coinCoin.text3')}}</p>
    <!-- // 币币充值已关闭-->
    <!--<div class="qrCodeBox">-->
      <!--<div class="qrCode" id="ccQrCode"></div>-->
      <!--<p class="qrCodeBox-tip">{{$t('coinCoin.text4')}}</p>-->
      <!--<p class="qrCodeBox-address" ref="ccAddress" id="ccAddress">{{userInfo.systemAddress}}</p>-->
      <!--<button class="secret-btn" ref="addressCopy" @click="copyAddress()" data-clipboard-action="copy" data-clipboard-target="#ccAddress">{{$t('coinCoin.text5')}}</button>-->
    <!--</div>-->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      copyBtn: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo' // 用户信息
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('errAction', {bool: true, msg: this.$t('coinCoin.text6')}) // 币币充值已关闭
      // this.copyBtn = new this.Clipboard(this.$refs.addressCopy) // 币币充值已关闭
      if (this.userInfo.length !== 0) {
        this.getQrCode()
      }
    })
  },
  watch: {
    userInfo: function () {
      this.getQrCode()
    }
  },
  methods: {
    getQrCode () {
      this.address = this.userInfo.systemAddress
      let downloadUrl = this.$utf16to8(this.address)
      $('#ccQrCode').qrcode({
        render: 'canvas', //     table方式
        width: 230, //            宽度
        height: 230, //            高度
        text: downloadUrl //      任意内容
      })
    },
    copyAddress () {
      let clipboard = this.copyBtn
      clipboard.on('success', () => {
        alert('复制成功')
        clipboard.destroy()
        this.copyBtn = new this.Clipboard(this.$refs.addressCopy) // 复制
      })
    }
  }
}
</script>
