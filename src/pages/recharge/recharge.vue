<template>
  <div>
    <div class="recharge secret-content66" style="display: none">
      <h3 class="secret-title">{{$t('recharge.text1')}}</h3>
      <p class="secret-subtitle">{{$t('recharge.text2')}}</p>
      <div class="inputTipBox">
        <div class="inputTip-title">
          <span><i>1.</i>{{$t('recharge.text3')}}</span>
        </div>
        <div class="inputTipDiv inputTipDiv-flex">
          <input class="secret-inputTip secret-input" type="text" v-model.trim="rechargeNum" :placeholder="$t('recharge.text4')" @input="checkNum" @focus="rechargeNumTipShow = false">
          <span class="inputTipDiv-rt">.{{randomNum}}</span>
        </div>
        <span class="inputTipMsg" :class="{inputTipMsgActive: rechargeNumTipShow}">{{$t('recharge.text4')}}</span>
      </div>
      <div class="inputTipBox inputTipBox-select">
        <div class="inputTip-title">
          <span><i>2.</i>{{$t('recharge.text5')}}：</span>
        </div>
        <div class="inputTipDiv">
          <input class="secret-input secret-input-bordernone select-input" type="text" readonly disabled :placeholder="unitValue">
          <a class="discount-btn" ref="discountBtn" @click="unitSelectShow = !unitSelectShow"><i class="arrowDown" :class="{arrowActive: unitSelectShow}"></i></a>
          <ul class="selectMenu" :class="{selectMenuActive: unitSelectShow}">
            <li :class="{liActive: unitIndex === index}" v-for="(item, index) in moneyUnit" :key="item.name" @click="chooseUnit(item.name, index)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="trad-account">
        <ul class="secret-tab">
          <li :class="{tabActive: accountTab === 1}" @click="accountTab = 1">{{$t('recharge.text6')}}</li>
          <li :class="{tabActive: accountTab === 2}" @click="accountTab = 2">{{$t('recharge.text7')}}</li>
        </ul>
        <ul class="bindAccount" v-if="accountTab === 1">
          <li :class="{activeLi: bankActiveIndex === index}" v-for="(item, index) in bankList" :key="index" @click="bankActiveIndex = index">
            <h4>{{item.bankName}}<span>{{item.subBankName}}</span></h4>
            <p>{{item.realName}}</p>
            <p>{{item.bankNumber}}</p>
            <p>{{item.bankAddress}}</p>
          </li>
        </ul>
        <div class="orthreAccount" v-if="accountTab === 2">
          <div class="inputTipBox">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="bankName" :placeholder="$t('recharge.text8')" @focus="bankNameTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: bankNameTipShow}">{{$t('recharge.text8')}}</span>
          </div>
          <div class="inputTipBox">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="accountName" :placeholder="$t('recharge.text9')" @focus="accountNameTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: accountNameTipShow}">{{$t('recharge.text9')}}</span>
          </div>
          <div class="inputTipBox">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="number" v-model.trim="cardNum" :placeholder="$t('recharge.text10')" @focus="cardNumTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: cardNumTipShow}">{{$t('recharge.text10')}}</span>
          </div>
          <div class="inputTipBox">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="branchName" :placeholder="$t('recharge.text11')" @focus="branchNameTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: branchNameTipShow}">{{$t('recharge.text11')}}</span>
          </div>
          <div class="inputTipBox">
            <div class="inputTipDiv">
              <input class="secret-inputTip secret-input" type="text" v-model.trim="branchAddress" :placeholder="$t('recharge.text12')" @focus="branchAddressTipShow = false">
            </div>
            <span class="inputTipMsg" :class="{inputTipMsgActive: branchAddressTipShow}">{{$t('recharge.text12')}}</span>
          </div>
          <input class="secret-input orthreAccount-input" type="text" v-model.trim="swift" :placeholder="$t('recharge.text13')">
          <input class="secret-input orthreAccount-input" type="text" v-model.trim="iban" :placeholder="$t('recharge.text14')">
        </div>
      </div>
      <button class="secret-btn" @click="nextFun()">{{$t('recharge.text15')}}</button>
      <div class="myPopup" v-show="rechargeUsdPopupShow">
        <div class="myPopup-tip">
          <a class="close-btn" @click="closeRechargeUsdPopup()">
            <img src="../../assets/images/basic/close.png" alt="">
          </a>
          <h3 class="title">{{$t('recharge.text16')}}</h3>
          <p class="subtitle">{{$t('recharge.text17')}}
            <span v-if="bankList[bankActiveIndex] && accountTab === 1">{{bankList[bankActiveIndex].bankName}}</span>
            <span v-if="accountTab === 2">{{bankName}}</span>
            {{$t('recharge.text18')}}{{unitValue}}{{$t('recharge.text19')}}
            <span>{{(randomNum / 100 + parseInt(rechargeNum)).toFixed(2)}}USD</span>?
          </p>
          <button tag="button" class="secret-btn" @click="comfirmFun()">{{$t('recharge.text20')}}</button>
        </div>
      </div>
      <!--没有绑定账号弹窗-->
      <div class="myPopup" v-show="bindBankShow">
        <div class="myPopup-tip">
          <a class="close-btn" @click="bindBankShow = false">
            <img src="../../assets/images/basic/close.png" alt="">
          </a>
          <h3 class="title">{{$t('popoup.text17')}}</h3>
          <p class="subtitle">{{$t('popoup.text18')}}</p>
          <router-link tag="button" to="/home/tradeAccount" class="secret-btn">{{$t('popoup.text5')}}</router-link>
        </div>
      </div>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('header.text3')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('popoup.text15')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*
$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$btn31 = #c31739 // 按钮颜色
$border = #33384d // 边框颜色
*/

$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.recharge
  padding-bottom 50px
  .inputTipBox
    .inputTipDiv-flex
      display flex
      align-items flex-end
      background-color $c26
      .inputTipDiv-rt
        margin-left 10px
    &.inputTipBox-select
      .inputTipDiv
        background-color $c26
        .discount-btn
          right 0
          background-color $btn31
          border-bottom-right-radius 6px
          border-top-right-radius 6px
          .arrowDown
            background url("../../assets/images/basic/arrow_down_white.png") no-repeat
        .selectMenuActive
          height 100px
  .secret-tab
    margin-top 20px
  .trad-account
    .bindAccount
      margin-top 40px
      margin-bottom 40px
      overflow hidden
      li
        width 320px
        min-height 190px
        float left
        background-color $f2
        padding 30px
        margin-bottom 20px
        border 1px solid $f2
        border-radius 6px
        cursor pointer
        &.activeLi
          border 1px solid $btn31
        &:nth-child(odd)
          margin-right 20px
        h4
          font-weight normal
          color #fff
          margin-bottom 15px
          span
            margin-left 30px
        p
          font-size 16px
          margin-bottom 15px
          &:last-child
            margin-bottom 0
  .orthreAccount
    margin-top 30px
    .inputTipBox
      .inputTipMsg
        top 14px
        &.inputTipMsgActive
          top 50px
    .orthreAccount-input
      margin-bottom 30px
      &:last-child
        margin-bottom 60px
  .myPopup
    .myPopup-tip
      .subtitle
        word-break break-all
        text-align left
        span
          color $btn31
</style>

<script>
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      successShow: true,
      randomNum: 0,
      rechargeNum: '', // 充值金额
      rechargeNumTipShow: false, // 充值金额提示
      unitValue: 'CNY', // 所选择的币种
      unitSelectShow: false,
      unitIndex: 1,
      moneyUnit: [{name: 'USD'}, {name: 'CNY'}],
      accountTab: 1, // 1绑定交易账号，2其他交易账号
      bankActiveIndex: 0,
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
      iban: '',
      bindBankShow: false // 未绑定银行账号的弹窗
    }
  },
  computed: {
    ...mapGetters([
      'bankList', // 公告列表
      'rechargeUsdPopupShow' // 点击下一步后，弹窗
    ])
  },
  created () {
    this.getBankArr() // 获取银行信息列表
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeUnitMenu) // 点击其他地方关闭选择币种下拉菜单
      this.randomNum = Math.floor(Math.random() * 90) + 10 // 随机数
    })
  },
  destroyed () {
    document.removeEventListener('click', this.closeUnitMenu) // 组件摧毁时关闭监听
  },
  methods: {
    closeSuccessPopup () {
      this.successShow = false
    },
    closeUnitMenu (event) {
      if (!this.$refs.discountBtn.contains(event.target)) {
        this.unitSelectShow = false
      }
    },
    checkNum () { // 让用户输入金额为整数
      let re = /^\d*$/
      if (!re.test(this.rechargeNum)) {
        isNaN(parseInt(this.rechargeNum)) ? this.rechargeNum = '' : this.rechargeNum = parseInt(this.rechargeNum)
      }
      if (/^0\d+/.test(this.rechargeNum)) { // "0" + "数字"开头
        this.rechargeNum = 0
      }
    },
    createDepositFormData (way, obj) { // 1.1.3 创建充值订单（Happy）这个接口所需要的参数,如果way为2那就是其他账号的，如果为1那么就是选中的银行卡，其银行卡号append在
      let formData = new FormData()
      formData.append('depositCurrency', this.unitValue)
      formData.append('depositAmount', (this.randomNum / 100 + parseInt(this.rechargeNum)))
      formData.append('bankname', obj.bankName)
      formData.append('realname', obj.realName)
      if (way === 2) {
        formData.append('number', this.cardNum) // 1:绑定到我的交易账户 2：不绑定到交易账户
      }
      formData.append('subbank', obj.subBankName)
      formData.append('subbankaddress', obj.bankAddress)
      formData.append('remark', '')
      formData.append('bankInfoId', obj.id)
      formData.append('isBand', way)
      formData.append('currency', this.unitValue)
      return formData
    },
    getBankArr () {
      let formData = new FormData()
      formData.append('currency', this.unitValue)
      this.$store.dispatch('getBankList', {formData: formData})
    },
    chooseUnit (val, index) { // 选择币种
      this.unitValue = val // input显示选择的优惠
      this.unitSelectShow = false // 下拉框的显示隐藏
      this.unitIndex = index
      this.bankActiveIndex = 0 // 切换币种的时候，银行卡默认0
      this.getBankArr() // 不同币种得到不同的银行信息列表
    },
    nextFun () { // 下一步
      if (this.rechargeNum === '') {
        this.rechargeNumTipShow = true
      }
      if (this.accountTab === 1 && this.rechargeNum !== '') { // 如果是已有绑定的银行卡, 通过请求拿到银行卡号
        let formData = new FormData()
        if (this.bankList.length === 0) {
          this.bindBankShow = true
        } else {
          formData.append('bankInfoId', this.bankList[this.bankActiveIndex].id)
          this.$store.dispatch('getBankInfo', {formData: formData})
        }
      }
      if (this.accountTab === 2) { // 绑定交易账号
        if (this.bankName === '') {
          this.bankNameTipShow = true
        }
        if (this.accountName === '') {
          this.accountNameTipShow = true
        }
        if (this.cardNum === '' || !/^[1-9]\d*$/.test(this.cardNum)) {
          this.cardNumTipShow = true
        }
        if (this.branchName === '') {
          this.branchNameTipShow = true
        }
        if (this.branchAddress === '') {
          this.branchAddressTipShow = true
        }
        if (this.rechargeNum !== '' && this.bankName !== '' && this.accountName !== '' && this.cardNum !== '' && /^[1-9]\d*$/.test(this.cardNum) && this.branchName !== '' && this.branchAddress !== '') {
          this.$store.dispatch('rechargeUsdPopupAct', {bool: true})
        }
      }
    },
    closeRechargeUsdPopup () { // 关闭确认充值弹窗
      this.$store.dispatch('rechargeUsdPopupAct', {bool: false})
    },
    comfirmFun () { // 确定充值
      if (this.accountTab === 1) {
        this.$store.dispatch('createDeposit', {formData: this.createDepositFormData(1, this.bankList[this.bankActiveIndex]), hasBankNumber: true})
      } else if (this.accountTab === 2) {
        let bankObj = {bankName: this.bankName, realName: this.accountName, subBankName: this.branchName, bankAddress: this.branchAddress, id: ''}
        this.$store.dispatch('createDeposit', {formData: this.createDepositFormData(2, bankObj), hasBankNumber: false})
      }
    }
  }
}
</script>
