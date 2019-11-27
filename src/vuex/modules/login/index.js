//   首页
// import api from '../../../api/api'
import api from '../../../api/api'
import router from '../../../router'
const login = {
  state: {
    noticeData: Array,
    firstNotice: Object
  },
  getters: {
    noticeData: state => state.noticeData, // 公告
    firstNotice: state => state.firstNotice // 公告第一条
  },
  actions: {
    loginAction ({commit, dispatch}, data) { // 登录
      api.axiosPost('/user/userlogin', data.formData).then((res) => {
        if (res.data.success) {
          router.push('/home')
        } else {
          dispatch('errAction', {bool: true, msg: res.data.msg})
        }
      })
    },
    looutAction ({rootState}) { // 退出登录
      api.axiosGet('/user/logout?deviceId=0').then((res) => {
        if (res.data.success) {
          rootState.common.userInfo = [] // 清空header用户信息
          router.push('/login')
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          router.push('/login')
        }
      })
    },
    noticeAction ({commit}, data) { // 公告
      api.axiosPost('/notice/noticeList', data.formData).then((res) => {
        if (res.data.success) {
          commit('noticeMut', res.data.data)
        }
      })
    }
  },
  mutations: {
    noticeMut (state, data) {
      state.noticeData = data
      state.firstNotice = data[0]
    }
  }
}
export default login
