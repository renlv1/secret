import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      redirect: {name: 'basicSituation'},
      component: resolve => require(['@/pages/home/home'], resolve),
      children: [
        {
          path: 'basicSituation',
          name: 'basicSituation', // 概况
          component: resolve => require(['@/pages/basicSituation/basicSituation'], resolve)
        },
        {
          path: 'buySie',
          name: 'buySie', // 购买SIE
          component: resolve => require(['@/pages/sie/buySie'], resolve)
        },
        {
          path: 'recharge',
          name: 'recharge', // USD充值
          component: resolve => require(['@/pages/recharge/recharge'], resolve)
        },
        {
          path: 'coinCoin',
          name: 'coinCoin', // 币币充值
          component: resolve => require(['@/pages/recharge/coinCoin'], resolve)
        },
        {
          path: 'recharge/rechargeDetail',
          name: 'rechargeDetail', // USD充值详情
          component: resolve => require(['@/pages/recharge/rechargeDetail'], resolve)
        },
        {
          path: 'recharge/rechargeDetail/appeal',
          name: 'appeal', // 申诉
          component: resolve => require(['@/pages/appeal/appeal'], resolve)
        },
        {
          path: 'recharge/rechargeDetail/appealDetail',
          name: 'appealDetail', // 申诉详情
          component: resolve => require(['@/pages/appeal/appealDetail'], resolve)
        },
        {
          path: 'transferOut/:type',
          name: 'transferOut', // type=1，SIE内部转账,2，SIE转出
          component: resolve => require(['@/pages/sie/transferOut'], resolve)
        },
        {
          path: 'transferIn',
          name: 'transferIn', // SIE转入
          component: resolve => require(['@/pages/sie/transferIn'], resolve)
        },
        {
          path: 'coupon',
          name: 'coupon', // 优惠券管理
          component: resolve => require(['@/pages/coupon/coupon'], resolve)
        },
        {
          path: 'coupon/couponExchange',
          name: 'couponExchange', // 优惠券兑换SIE
          component: resolve => require(['@/pages/coupon/couponExchange'], resolve)
        },
        {
          path: 'myAi',
          name: 'myAi', // 我的人工智能
          component: resolve => require(['@/pages/AI/myAi'], resolve)
        },
        {
          path: 'myAi/aiManage',
          name: 'aiManage', // 人工智能管理
          component: resolve => require(['@/pages/AI/aiManage'], resolve)
        },
        {
          path: 'myAi/renewAdvance',
          name: 'renewAdvance', // 提前续费
          component: resolve => require(['@/pages/AI/renewAdvance'], resolve)
        },
        {
          path: 'myAi/aiExperience',
          name: 'aiExperience', // 人工智能体验
          component: resolve => require(['@/pages/AI/aiExperience'], resolve)
        },
        {
          path: 'myAi/pepperTarin',
          name: 'pepperTarin', // 小辣椒训练
          component: resolve => require(['@/pages/AI/pepperTarin'], resolve)
        },
        {
          path: 'xiaodan',
          name: 'xiaodan', // 小单---小单介绍---设置托管好友----聊天室
          component: resolve => require(['@/pages/AI/xiaodan/xiaodan'], resolve)
        },
        {
          path: 'xiaodan/xiaodanFriend',
          name: 'xiaodanFriend', // 小单---小单介绍---设置托管好友----聊天室
          component: resolve => require(['@/pages/AI/xiaodan/xiaodanFriend'], resolve)
        },
        {
          path: 'xiaodan/xiaodanChat',
          name: 'xiaodanChat', // 小单---小单介绍---设置托管好友----聊天室
          component: resolve => require(['@/pages/AI/xiaodan/xiaodanChat'], resolve)
        },
        {
          path: 'aiMarket',
          name: 'aiMarket', // 人工智能市场
          component: resolve => require(['@/pages/AI/aiMarket'], resolve)
        },
        {
          path: 'aiMarket/aiDetail',
          name: 'aiDetail', // 人工智能详情
          component: resolve => require(['@/pages/AI/aiDetail'], resolve)
        },
        {
          path: 'holdings',
          name: 'holdings', // 持有量统计
          component: resolve => require(['@/pages/holdings/holdings'], resolve)
        },
        {
          path: 'fiat',
          name: 'fiat', // 法币充值记录
          component: resolve => require(['@/pages/log/fiat'], resolve)
        },
        {
          path: 'fiat/rechargeDetail',
          name: 'rechargeDetail2', // 法币充值详情
          component: resolve => require(['@/pages/recharge/rechargeDetail'], resolve)
        },
        {
          path: 'fiat/rechargeDetail/appeal',
          name: 'appeal2', // 申诉
          component: resolve => require(['@/pages/appeal/appeal'], resolve)
        },
        {
          path: 'fiat/rechargeDetail/appealDetail',
          name: 'appealDetail2', // 申诉详情
          component: resolve => require(['@/pages/appeal/appealDetail'], resolve)
        },
        {
          path: 'sieTrade',
          name: 'sieTrade', // sie交易记录
          component: resolve => require(['@/pages/log/sieTrade'], resolve)
        },
        {
          path: 'sieTrade/sieTradeDetail',
          name: 'sieTradeDetail', // sie交易记录详情
          component: resolve => require(['@/pages/log/sieTradeDetail'], resolve)
        },
        {
          path: 'coinCoinLog',
          name: 'coinCoinLog', // 币币充值记录
          component: resolve => require(['@/pages/log/coinCoinLog'], resolve)
        },
        {
          path: 'coinCoinLog/coinCoinDetail',
          name: 'coinCoinDetail', // 币币充值记录详情
          component: resolve => require(['@/pages/log/coinCoinDetail'], resolve)
        },
        {
          path: 'reward',
          name: 'reward', // 奖励记录
          component: resolve => require(['@/pages/log/reward'], resolve)
        },
        {
          path: 'reward/rewardDetail',
          name: 'rewardDetail', // 奖励记录详情
          component: resolve => require(['@/pages/log/rewardDetail'], resolve)
        },
        {
          path: 'sieBuyLog',
          name: 'sieBuyLog', // sie购买记录
          component: resolve => require(['@/pages/log/sieBuyLog'], resolve)
        },
        {
          path: 'sieBuyLog/sieBuyLogDetail',
          name: 'sieBuyLogDetail', // sie购买记录详情
          component: resolve => require(['@/pages/log/sieBuyLogDetail'], resolve)
        },
        {
          path: 'tradeAccount',
          name: 'tradeAccount', // 交易账号
          component: resolve => require(['@/pages/tradeAccount/tradeAccount'], resolve)
        },
        {
          path: 'tradeAccount/tradeAccountManage',
          name: 'tradeAccountManage', // 交易账号管理
          component: resolve => require(['@/pages/tradeAccount/tradeAccountManage'], resolve)
        },
        {
          path: 'tradeAccount/addTradeAccount',
          name: 'addTradeAccount', // 添加账号
          component: resolve => require(['@/pages/tradeAccount/addTradeAccount'], resolve)
        }
      ]
    },
    {
      path: '/userAccount',
      name: 'userAccount',
      component: resolve => require(['@/pages/userAccount/userAccount'], resolve) // 账号管理
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/login'], resolve) // 登录
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register/register'], resolve) // 注册
    },
    {
      path: '/getBackPwd',
      name: 'getBackPwd',
      component: resolve => require(['@/pages/login/getBackPwd'], resolve) // 找回登录密码
    },
    {
      path: '/safeSetting',
      name: 'safeSetting',
      component: resolve => require(['@/pages/setting/safeSetting'], resolve) // 设置安全密码
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: resolve => require(['@/pages/setting/bindPhone'], resolve) // 设置手机号码
    },
    {
      path: '/noticeCenter',
      name: 'noticeCenter',
      component: resolve => require(['@/pages/notice/noticeCenter'], resolve) // 公告中心
    },
    {
      path: '/noticeCenter/noticeDetail',
      name: 'noticeDetail',
      component: resolve => require(['@/pages/notice/noticeDetail'], resolve) // 公告详情
    },
    {
      path: '/bindGoogleValidation',
      name: 'bindGoogleValidation',
      component: resolve => require(['@/pages/googleValidation/bindGoogleValidation'], resolve) // 绑定谷歌验证
    },
    {
      path: '/unbindGoogleValidation',
      name: 'unbindGoogleValidation',
      component: resolve => require(['@/pages/googleValidation/unbindGoogleValidation'], resolve) // 关闭谷歌验证
    }
  ]
})
