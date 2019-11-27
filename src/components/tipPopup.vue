<template>
  <div class="myPopup" v-show="tipPopupShow" @click="eventClosePopup($event)">
    <div class="myPopup-tip" ref="myPopupBox">
      <h3 class="title">{{errMsg}}</h3>
      <button class="secret-btn" @click="closePopup()">{{$t('bindPhone.text12')}}</button>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'tipPopupShow', // 错误弹窗控制
      'errMsg' // 登录错误提示
    ])
  },
  methods: {
    eventClosePopup (e) {
      if (!this.$refs.myPopupBox.contains(e.target)) {
        this.closePopup()
      }
    },
    closePopup () {
      this.$store.dispatch('errAction', {bool: false, msg: ''})
    }
  }
}
</script>
