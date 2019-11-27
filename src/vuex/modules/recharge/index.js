//   首页
import api from '../../../api/api'
import router from '../../../router'
const home = {
  state: {
    bankList: [],
    bankNumber: Number,
    rechargeUsdPopupShow: false
  },
  getters: {
    bankList: state => state.bankList, // 充值--绑定银行账号---列表
    rechargeUsdPopupShow: state => state.rechargeUsdPopupShow // 确定充值USD弹窗
  },
  actions: {
    getBankList ({commit}, data) { // 充值--绑定银行账号---列表
      api.axiosPost('/bank/queryBankInfoList', data.formData).then((res) => {
        if (res.data.success) {
          commit('bankListMut', res.data)
        }
      })
    },
    getBankInfo ({commit, dispatch, state}, data) { // 获取银行卡号
      api.axiosPost('/bank/bankInfoDetail', data.formData).then((res) => {
        if (res.data.success) {
          state.bankNumber = res.data.data.bankNumber
          dispatch('rechargeUsdPopupAct', {bool: true}) // 下一步，弹出确认充值框
        }
      })
    },
    createDeposit ({commit, dispatch, state}, data) { // 创建充值订单
      if (data.hasBankNumber) {
        data.formData.append('number', state.bankNumber)
      }
      api.axiosPost('/deposit/createDepositRecordNew', data.formData).then((res) => {
        if (res.data.success) {
          router.push({path: 'recharge/rechargeDetail', query: {orderId: res.data.data.order.id, way: 1}}) // way是1充值进来的充值详情,2是法币充值记录进来的充值详情
        } else {
          dispatch('errAction', {bool: true, msg: res.data.msg})
        }
        dispatch('rechargeUsdPopupAct', {bool: false}) // 关闭确认充值弹窗
      })
    },
    rechargeUsdPopupAct ({commit}, data) {
      commit('rechargeUsdPopupMut', data)
    }
  },
  mutations: {
    bankListMut (state, data) {
      state.bankList = data.data
    },
    rechargeUsdPopupMut (state, data) {
      state.rechargeUsdPopupShow = data.bool
    }
  }
}
export default home
