/**
 * Created by Ausu on 2018/7/9.
 */
import api from '../../../api/api'
const ai = {
  state: {
    myAiList: [],
    marketAiList: [],
    aiLogData: [],
    aiPriceData: Object
  },
  getters: {
    myAiList: state => state.myAiList, // 我的人工智能
    marketAiList: state => state.marketAiList, // 我的人工智能
    aiLogData: state => state.aiLogData, // 开通Ai记录
    aiPriceData: state => state.aiPriceData // 开通Ai价格
  },
  actions: {
    getMyAi ({commit}, data) { // 我的人工智能
      api.axiosPost('/product/queryBuyRobot', data.formData).then((res) => {
        if (res.data.success) {
          commit('myAiMut', res.data)
        }
      })
    },
    getMarketAi ({commit}, data) { // 人工智能市场
      api.axiosPost('/product/queryNotBuyRobot', data.formData).then((res) => {
        if (res.data.success) {
          commit('markeAiMut', res.data)
        }
      })
    },
    oppenAiLog ({commit}, data) { // 开通Ai记录
      api.axiosPost('/product/queryRobotOrder', data.formData).then((res) => {
        if (res.data.success) {
          commit('openAiLogMut', res.data)
        }
      })
    },
    oppenAiPrice ({commit}, data) { // 开通Ai价格
      api.axiosPost('/product/showOpenRobotAiTotal', data.formData).then((res) => {
        if (res.data.success) {
          commit('openAiMut', res.data)
        }
      })
    }
  },
  mutations: {
    myAiMut (state, data) {
      state.myAiList = data.data.darwinSets
    },
    markeAiMut (state, data) {
      state.marketAiList = data.data.products
    },
    openAiLogMut (state, data) {
      state.aiLogData = data.data
    },
    openAiMut (state, data) {
      state.aiPriceData = data.data
    }
  }
}
export default ai
