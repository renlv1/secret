<template>
  <div class="transferIn">
    <h3 class="secret-title">{{$t('transferIn.text1')}}</h3>
    <p class="subtitle">{{$t('transferIn.text2')}}</p>
    <p class="tip"><span>*</span>{{$t('transferIn.text3')}}</p>
    <div class="qrCodeBox">
      <div class="qrCode" id="sieQrCode"></div>
      <p class="qrCodeBox-tip">{{$t('transferIn.text4')}}</p>
      <p class="qrCodeBox-address" ref="sieAddress" id="sieAddress">{{userInfo.systemAddress}}</p>
      <button class="secret-btn" ref="addressCopy" @click="copyAddress()" data-clipboard-action="copy" data-clipboard-target="#sieAddress">{{$t('transferIn.text5')}}</button>
    </div>
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
      this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
      if (this.userInfo.systemAddress) {
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
      let downloadUrl = this.$utf16to8(this.userInfo.systemAddress)
      $('#sieQrCode').qrcode({
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
        this.copyBtn = new this.Clipboard(this.$refs.sieAddress) // 复制
      })
    }
  }
}
</script>
