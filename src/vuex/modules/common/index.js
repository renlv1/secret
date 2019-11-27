/**
 * Created by Ausu on 2018/6/28.
 */
//   公共请求数据
import api from '../../../api/api'
import router from '../../../router'
const common = {
  state: {
    tipPopupShow: false, // 共用的弹窗提示
    errMsg: '',
    language: 1,
    balanceData: [],
    userInfo: [],
    userBalanceSIE: Number,
    userBalanceUSD: Number,
    discountPreferential: Object,
    outEthRate: '',
    siePrice: 0,
    aitotalAmount: 0,
    sumtotalAmount: 0,
    pkAmount: 0
  },
  getters: {
    tipPopupShow: state => state.tipPopupShow, // 错误弹窗控制
    errMsg: state => state.errMsg, // 错误提醒
    language: state => state.language, // 语言
    balanceData: state => state.balanceData, // 用戶信息
    userInfo: state => state.userInfo, // 用戶信息balanceData.user
    userBalanceSIE: state => state.userBalanceSIE, // 用戶SIE余额
    userBalanceUSD: state => state.userBalanceUSD, // 用戶USD余额
    discountPreferential: state => state.discountPreferential, // 用戶优惠
    outEthRate: state => state.outEthRate, // 转出以太坊汇率
    siePrice: state => state.siePrice, // 转出以太坊汇率
    aitotalAmount: state => state.aitotalAmount, // 达尔文优惠券：
    sumtotalAmount: state => state.sumtotalAmount, // 持币量优惠券：
    pkAmount: state => state.pkAmount // PK优惠券：
  },
  actions: {
    langAction ({commit}, data) { // 语言
      commit('langMut', data)
    },
    balanceAction ({commit}) {
      api.axiosPost('/user/balance').then((res) => { // 用戶信息
        if (res.data.success) {
          commit('balanceMut', res.data.data)
        } else {
          if (window.location.hash !== '#/getBackPwd' && window.location.hash !== '#/register') {
            router.push('/login')
          }
        }
      })
    },
    errAction ({commit}, data) {
      commit('errMut', data)
    }
  },
  mutations: {
    errMut (state, data) {
      state.tipPopupShow = data.bool
      state.errMsg = data.msg
    },
    langMut (state, data) { // 语言
      state.language = data.lang
    },
    balanceMut (state, data) {
      state.balanceData = data
      state.userInfo = data.user
      state.discountPreferential = data.preferential
      if (data.preferential.aitotal) {
        state.aitotalAmount = data.preferential.aitotal.amount
      } else {
        state.aitotalAmount = 0
      }
      if (data.preferential.sumtotal) {
        state.sumtotalAmount = data.preferential.sumtotal.amount
      } else {
        state.sumtotalAmount = 0
      }
      if (data.preferential.pkAmount) {
        state.pkAmount = data.preferential.pkAmount.amount
      } else {
        state.pkAmount = 0
      }
      state.userBalanceSIE = data.userAccount.SIE.balance
      state.userBalanceUSD = data.userAccount.USD.balance
      state.outEthRate = parseFloat(data.outEthRate)
      state.siePrice = data.siePrice
    }
  }
}
export default common
