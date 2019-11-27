import api from '../../../api/api'
const coupon = { // 优惠券
  state: {
    couponList: [],
    totalPage: 1, // 总页数
    sieRatio: 0
  },
  getters: {
    couponList: state => state.couponList, // 优惠券记录
    totalPage: state => state.totalPage, // 优惠券记录总页数
    sieRatio: state => state.sieRatio // 优惠值兑换SIE比例
  },
  actions: {
    getCouponLog ({commit}, data) { // 获取优惠券记录
      api.axiosPost('/tradesie/queryOrderList', data.formData).then((res) => {
        if (res.data.success) {
          commit('couponLogMut', res.data)
        }
      })
    },
    exchangeRatio ({commit}) { // 优惠值兑换SIE比例
      api.axiosGet('/userDiscount/discountToSieRatio').then((res) => {
        if (res.data.success) {
          commit('exchangeRatioMut', res.data)
        }
      })
    }
    // exchangeToSie ({commit, dispatch}, data) { // 优惠券兑换SIE
    //   api.axiosPost('/userDiscount/discountToSie', data.formData).then((res) => {
    //     if (res.data.success) {
    //       console.log(res)
    //     } else {
    //       dispatch('errAction', {bool: true, msg: res.data.msg})
    //     }
    //   })
    // }
  },
  mutations: {
    couponLogMut (state, data) {
      state.couponList = data.data
      state.totalPage = data.mapData.totalPage
    },
    exchangeRatioMut (state, data) {
      state.sieRatio = parseFloat(data.data)
    }
  }
}
export default coupon
