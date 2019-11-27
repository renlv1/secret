<template>
  <div class="addTradeAccount secret-content66">
    <h3 class="secret-title">{{$t('addTradeAccount.text1')}}</h3>
    <div class="inputTipBox inputTipBox-select">
      <div class="inputTip-title">
        <span>{{$t('addTradeAccount.text2')}}：</span>
      </div>
      <div class="inputTipDiv">
        <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="unitValue">
        <a class="discount-btn" ref="discountBtn" @click="unitSelectShow = !unitSelectShow"><i class="arrowDown" :class="{arrowActive: unitSelectShow}"></i></a>
        <ul class="selectMenu" :class="{selectMenuActive: unitSelectShow}">
          <li :class="{liActive: unitIndex === index}" v-for="(item, index) in moneyUnit" :key="item.name" @click="chooseUnit(item.name, index)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="inputTipBox" style="z-index: 0">
      <div class="inputTipDiv">
        <input class="secret-inputTip secret-input" type="text" v-model.trim="bankName" :placeholder="$t('addTradeAccount.text3')" @focus="bankNameTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: bankNameTipShow}">{{$t('addTradeAccount.text3')}}</span>
    </div>
    <div class="inputTipBox">
      <div class="inputTipDiv">
        <input class="secret-inputTip secret-input" type="text" v-model.trim="accountName" :placeholder="$t('addTradeAccount.text4')" @focus="accountNameTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: accountNameTipShow}">{{$t('addTradeAccount.text4')}}</span>
    </div>
    <div class="inputTipBox">
      <div class="inputTipDiv">
        <input class="secret-inputTip secret-input" type="number" v-model.trim="cardNum" :placeholder="$t('addTradeAccount.text5')" @focus="cardNumTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: cardNumTipShow}" ref="carNumTip"></span>
    </div>
    <div class="inputTipBox">
      <div class="inputTipDiv">
        <input class="secret-inputTip secret-input" type="text" v-model.trim="branchName" :placeholder="$t('addTradeAccount.text6')" @focus="branchNameTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: branchNameTipShow}">{{$t('addTradeAccount.text6')}}</span>
    </div>
    <div class="inputTipBox">
      <div class="inputTipDiv">
        <input class="secret-inputTip secret-input" type="text" v-model.trim="branchAddress" :placeholder="$t('addTradeAccount.text7')" @focus="branchAddressTipShow = false">
      </div>
      <span class="inputTipMsg" :class="{inputTipMsgActive: branchAddressTipShow}">{{$t('addTradeAccount.text7')}}</span>
    </div>
    <input class="secret-input addTradeAccount-input" type="text" v-model.trim="swift" :placeholder="$t('addTradeAccount.text8')">
    <input class="secret-input addTradeAccount-input" type="text" v-model.trim="iban" :placeholder="$t('addTradeAccount.text9')">
    <button class="secret-btn complete-btn" @click="completeFun()">{{$t('addTradeAccount.text10')}}</button>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$c26 = #1a1c26 // 背景颜色
$btn31 = #c31739 // 按钮颜色
$border = #33384d // 边框颜色*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.addTradeAccount
  .inputTipBox
    .inputTipMsg
      top 14px
      &.inputTipMsgActive
        top 50px
    &.inputTipBox-select
      .inputTipDiv
        background-color $c26
        border 1px solid $btn31
        border-radius 6px
        .discount-btn
          right -1px
          background-color $btn31
          border-bottom-right-radius 6px
          border-top-right-radius 6px
          .arrowDown
            background url("../../assets/images/basic/arrow_down_white.png") no-repeat
        .selectMenu
          z-index 999
        .selectMenuActive
          height 100px
  .addTradeAccount-input
    margin-bottom 30px
    &:last-child
      margin-bottom 60px
</style>

<script>
export default{
  data () {
    return {
      bankInfoId: 0,
      unitValue: 'USD', // 所选择的币种
      unitSelectShow: false,
      unitIndex: 0,
      moneyUnit: [{name: 'USD'}, {name: 'CNY'}],
      bankName: '',
      bankNameTipShow: false,
      accountName: '',
      accountNameTipShow: false,
      cardNum: '',
      cardNumTipShow: false,
      branchName: '',
      branchNameTipShow: false,
      branchAddress: '',
      branchAddressTipShow: false,
      swift: '',
      iban: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.currencyType) { // 交易账号管理添加账号
        if (this.$route.query.currencyType === 'USD') { // 默认选中的币种
          this.unitIndex = 0
        } else {
          this.unitValue = 'CNY'
          this.unitIndex = 1
        }
      }
      if (this.$route.query.id) {
        this.bankInfoId = this.$route.query.id
        this.getBankInfoDetail()
      }
      document.addEventListener('click', this.closeUnitMenu) // 点击其他地方关闭选择币种下拉菜单
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeUnitMenu) // 组件摧毁时关闭监听
  },
  methods: {
    closeUnitMenu (event) {
      if (!this.$refs.discountBtn.contains(event.target)) {
        this.unitSelectShow = false
      }
    },
    chooseUnit (val, index) { // 选择币种
      this.unitValue = val // input显示选择的优惠
      this.unitSelectShow = false // 下拉框的显示隐藏
      this.unitIndex = index
    },
    completeFun () {
      if (this.bankName === '') {
        this.bankNameTipShow = true
      }
      if (this.accountName === '') {
        this.accountNameTipShow = true
      }
      if (this.cardNum === '' || !/^[1-9]\d*$/.test(this.cardNum)) {
        this.$refs.carNumTip.innerHTML = this.$t('addTradeAccount.text5')
        this.cardNumTipShow = true
      } else if (this.cardNum.length <= 4) {
        this.$refs.carNumTip.innerHTML = this.$t('addTradeAccount.text13')
        this.cardNumTipShow = true
      }
      if (this.branchName === '') {
        this.branchNameTipShow = true
      }
      if (this.branchAddress === '') {
        this.branchAddressTipShow = true
      }
      if (this.bankName !== '' && this.accountName !== '' && this.cardNum !== '' && /^[1-9]\d*$/.test(this.cardNum) && this.cardNum.length > 4 && this.branchName !== '' && this.branchAddress !== '') {
        if (this.bankInfoId) {
          this.editBankInfo()
        } else {
          this.addBankInfo()
        }
      }
    },
    getBankInfoDetail () { // 编辑时获取详情并渲染
      let formdata = new FormData()
      formdata.append('bankInfoId', this.bankInfoId)
      this.$http.post(this.$api + '/bank/bankInfoDetail', formdata).then((res) => {
        this.unitValue = res.data.data.currency
        if (this.unitValue === 'USD') { // 默认选中的币种
          this.unitIndex = 0
        } else {
          this.unitIndex = 1
        }
        this.bankName = res.data.data.bankName
        this.accountName = res.data.data.realName
        this.cardNum = res.data.data.bankNumber
        this.branchName = res.data.data.subBankName
        this.branchAddress = res.data.data.bankAddress
        this.swift = res.data.data.swift
        this.iban = res.data.data.iban
      })
    },
    editBankInfo () { // 编辑提交请求
      let url = `${this.$api}/bank/editBankInfo`
      let formData = new FormData()
      formData.append('id', this.bankInfoId)
      formData.append('bankType', '1')
      formData.append('currency', this.unitValue)
      formData.append('bankName', this.bankName)
      formData.append('subBankName', this.branchName)
      formData.append('realName', this.accountName)
      formData.append('bankNumber', this.cardNum)
      formData.append('bankAddress', this.branchAddress)
      formData.append('swift', this.swift)
      formData.append('iban', this.iban)
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.$router.go(-1)
          this.$store.dispatch('errAction', {bool: true, msg: this.$t('addTradeAccount.text11')}) // 修改成功
        } else if (res.data.msg) {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 添加提交请求
    addBankInfo () {
      let url = `${this.$api}/bank/addBankInfo`
      let formData = new FormData()
      formData.append('bankType', '1')
      formData.append('currency', this.unitValue)
      formData.append('bankName', this.bankName)
      formData.append('subBankName', this.branchName)
      formData.append('realName', this.accountName)
      formData.append('bankNumber', this.cardNum)
      formData.append('bankAddress', this.branchAddress)
      formData.append('swift', this.swift)
      formData.append('iban', this.iban)
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.$store.dispatch('errAction', {bool: true, msg: this.$t('addTradeAccount.text12')}) // 添加成功
          if (this.unitIndex === 0) {
            this.$router.push({path: '/home/tradeAccount/tradeAccountManage', query: {currencyType: this.unitValue}})
          } else {
            this.$router.push({path: '/home/tradeAccount/tradeAccountManage', query: {currencyType: this.unitValue}})
          }
        } else if (res.data.msg) {
          this.$store.dispatch('errAction', {bool: true, msg: res.data.msg})
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
