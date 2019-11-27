import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common/index'
import login from './modules/login/index'
import sieModule from './modules/sie/index'
import recharge from './modules/recharge/index'
import coupon from './modules/coupon/index'
import ai from './modules/ai/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    login,
    sieModule,
    recharge,
    coupon,
    ai
  }
})
