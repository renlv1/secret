import api from '../../../api/api'
const sieModule = { // SIE买入，内部转账，SIE转出
  state: {
  },
  getters: {
  },
  actions: {
    buySie ({commit, dispatch}, data) { // 买入SIE(不选择优惠的)
      api.axiosPost('/tradesie/buySieTrade', data.formData).then((res) => {
        if (res.data.success) {
          console.log(res)
        } else {
          dispatch('errAction', {bool: true, msg: res.data.msg})
        }
      })
    }
    // transferInside ({commit, dispatch}, data) { // 内部转账
    //   api.axiosPost('/transferRecord/transferOut', data.formData).then((res) => {
    //     if (res.data.success) {
    //       console.log(res)
    //     } else {
    //       dispatch('errAction', {bool: true, msg: res.data.msg})
    //     }
    //   })
    // }
  },
  mutations: {
  }
}
export default sieModule
