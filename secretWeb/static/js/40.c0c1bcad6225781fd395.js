webpackJsonp([40],{BK0t:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e("mvHQ"),i=e.n(o),a=e("Dd8w"),n=e.n(a),p=e("NYxO"),r=e("vNvs"),c={data:function(){return{isCheck:!1,aiObj:Object,aiTotal:Object,orderId:"",verificationShow:!1,tradePasswordShow:!1,bindPhoneShow:!1,safePassword:"",safePasswordTipShow:!1,payCode:"",ggCodeTipShow:!1,phoneCodeTipShow:!1,sendBtnTimes:60,successShow:!1}},components:{vBreadcrumb:function(t){return e.e(51).then(function(){var s=[e("1JPr")];t.apply(null,s)}.bind(this)).catch(e.oe)}},computed:n()({},Object(p.b)(["userInfo","language"])),mounted:function(){var t=this;this.$nextTick(function(){t.getNotBuyRobot(),t.showAiTotal()})},methods:{getNotBuyRobot:function(){var t=this;this.$http.post(this.$api+"/product/queryNotBuyRobot?pageIndex=1&pageSize=20").then(function(s){var e=s.data;"success"===e.state&&!0===e.success&&e.data.products.forEach(function(s){s.id===parseInt(t.$route.query.aiId)&&(t.aiObj=s)})})},showAiTotal:function(){var t=this;this.$http.post(this.$api+"/product/showOpenRobotAiTotal?productid="+this.$route.query.aiId).then(function(s){s.data.success&&(t.aiTotal=s.data.data)})},openAI:function(){var t=this;if(2!==this.userInfo.openGoogleCode)Object(r.a)({msg:this.$t("buySie.text19"),okFn:function(){t.$router.push("/userAccount")}});else{var s=new FormData,e=1;e=!0===this.ischeck?2:1,1===this.userInfo.openTradePassword?this.tradePasswordShow=!0:2===this.userInfo.openTradePassword&&(2!==this.userInfo.openMobileCode&&2!==this.userInfo.openGoogleCode?this.bindPhoneShow=!0:(s.append("openorrenew",1),s.append("productid",this.$route.query.aiId),this.$http.post(this.$api+"/product/openRobotAi?openorrenew=1&isAuth="+e+"&productid="+this.$route.query.aiId).then(function(s){s.data.success?(t.orderId=s.data.data.id,t.verificationShow=!0):t.$store.dispatch("errAction",{bool:!0,msg:s.data.msg})}).catch(function(t){console.log(t)})))}},confirmOpenAi:function(){var t=this;if(""===this.safePassword&&(this.safePasswordTipShow=!0),""===this.payCode&&(2===this.userInfo.openGoogleCode?this.ggCodeTipShow=!0:this.phoneCodeTipShow=!0),""!==this.safePassword&&""!==this.payCode){var s=this.$api+"/transaction/paymentByOrderId?orderid="+this.orderId+"&tradePwd="+this.safePassword+"&code="+this.payCode;this.$http.post(s).then(function(s){s.data.success?t.successShow=!0:t.$store.dispatch("errAction",{bool:!0,msg:s.data.msg})}).catch(function(t){console.log(t)}),this.verificationShow=!1,this.safePassword="",this.payCode="",this.sendBtnTimes=0}},countDown:function(){var t=this;0===this.sendBtnTimes?(this.$refs.sendMsg.innerHTML=this.$t("popoup.text13"),this.sendBtnTimes=60,this.$refs.sendMsg.style.color="rgba(201,0,16)",this.$refs.sendMsg.disabled=!1):(this.sendBtnTimes--,this.$refs.sendMsg.innerHTML=this.sendBtnTimes,this.$refs.sendMsg.disabled=!0,this.$refs.sendMsg.style.color="rgba(255,255,255,0.6)",setTimeout(function(){return t.countDown()},1e3))},sendPhoneCode:function(){var t=this,s=void 0,e=new FormData;e.append("json",i()({type:"code"})),this.$http.post(this.$api+"/user/sendSmsCode",e).then(function(e){s=e.data.success?t.$t("popoup.text16"):e.data.msg,t.$store.dispatch("errAction",{bool:!0,msg:s})}).catch(function(t){console.log(t)}),this.countDown()},closeSuccessPopup:function(){this.successShow=!1,this.$router.push("/home/myAi")}}},u={render:function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"aiDetail secret-content72"},[o("v-breadcrumb",{attrs:{breadcrumbList:t.$t("AI.aiDetail.breadcrumbList")}}),t._v(" "),o("ul",{staticClass:"secret-list"},[o("li",[o("div",{staticClass:"li-lf"},[t.aiObj?o("h3",{staticClass:"secret-title"},[t._v(t._s(1===t.language?t.aiObj.name:t.aiObj.nameen))]):t._e(),t._v(" "),1===parseInt(t.$route.query.aiId)?o("div",[o("p",{staticClass:"title"},[t._v(t._s(t.$t("AI.aiDetail.text1"))+"："+t._s(t._f("fourNumber")(t.aiTotal.showSieTotal))+"SIE")]),t._v(" "),o("div",{staticClass:"chekedBox",on:{click:function(s){t.isCheck=!t.isCheck}}},[o("a",{staticClass:"checked-btn",class:{checked:t.isCheck}}),t._v(" "),o("span",[t._v(t._s(t.$t("AI.aiDetail.text2")))])])]):t._e()]),t._v(" "),1===parseInt(t.$route.query.aiId)?o("div",{staticClass:"li-rt"},[0!==t.aiObj.total?o("button",{staticClass:"secret-btn",on:{click:function(s){return t.openAI()}}},[t._v(t._s(t.$t("AI.aiDetail.text3")))]):t._e()]):t._e()]),t._v(" "),o("li",[o("h3",{staticClass:"secret-title"},[t._v(t._s(1===t.language?t.aiObj.name:t.aiObj.nameen)+" "+t._s(t.$t("AI.aiDetail.text4")))]),t._v(" "),o("p",{staticClass:"info",domProps:{innerHTML:t._s(1===t.language?t.aiObj.content:t.aiObj.contenten)}})])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.tradePasswordShow,expression:"tradePasswordShow"}],staticClass:"myPopup"},[o("div",{staticClass:"myPopup-tip"},[o("a",{staticClass:"close-btn",on:{click:function(s){t.tradePasswordShow=!1}}},[o("img",{attrs:{src:e("KOGE"),alt:""}})]),t._v(" "),o("h3",{staticClass:"title"},[t._v(t._s(t.$t("popoup.text1")))]),t._v(" "),o("p",{staticClass:"subtitle"},[t._v(t._s(t.$t("popoup.text2")))]),t._v(" "),o("router-link",{staticClass:"secret-btn",attrs:{tag:"button",to:"/safeSetting"}},[t._v(t._s(t.$t("popoup.text3")))])],1)]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.bindPhoneShow,expression:"bindPhoneShow"}],staticClass:"myPopup"},[o("div",{staticClass:"myPopup-tip"},[o("a",{staticClass:"close-btn",on:{click:function(s){t.bindPhoneShow=!1}}},[o("img",{attrs:{src:e("KOGE"),alt:""}})]),t._v(" "),o("h3",{staticClass:"title"},[t._v(t._s(t.$t("popoup.text4")))]),t._v(" "),o("router-link",{staticClass:"secret-btn",attrs:{tag:"button",to:"/bindPhone"}},[t._v(t._s(t.$t("popoup.text5")))])],1)]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.verificationShow,expression:"verificationShow"}],staticClass:"myPopup verificationPopup"},[o("div",{staticClass:"myPopupBox"},[o("div",{staticClass:"verificationForm"},[o("h3",{staticClass:"secret-title"},[t._v(t._s(t.$t("popoup.text6")))]),t._v(" "),o("div",{staticClass:"inputTipBox"},[o("div",{staticClass:"inputTip-title"},[o("span",[t._v(t._s(t.$t("popoup.text7")))])]),t._v(" "),o("div",{staticClass:"inputTipDiv"},[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.safePassword,expression:"safePassword",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"password",placeholder:t.$t("popoup.text8")},domProps:{value:t.safePassword},on:{focus:function(s){t.safePasswordTipShow=!1},input:function(s){s.target.composing||(t.safePassword=s.target.value.trim())},blur:function(s){return t.$forceUpdate()}}})]),t._v(" "),o("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.safePasswordTipShow}},[t._v(t._s(t.$t("popoup.text8")))])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:2===t.userInfo.openGoogleCode,expression:"userInfo.openGoogleCode === 2"}],staticClass:"inputTipBox"},[o("div",{staticClass:"inputTip-title"},[o("span",[t._v(t._s(t.$t("popoup.text9")))])]),t._v(" "),o("div",{staticClass:"inputTipDiv"},[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.payCode,expression:"payCode",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"text",placeholder:t.$t("popoup.text10")},domProps:{value:t.payCode},on:{focus:function(s){t.ggCodeTipShow=!1},input:function(s){s.target.composing||(t.payCode=s.target.value.trim())},blur:function(s){return t.$forceUpdate()}}})]),t._v(" "),o("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.ggCodeTipShow}},[t._v(t._s(t.$t("popoup.text10")))])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:2!==t.userInfo.openGoogleCode&&2===t.userInfo.openMobileCode,expression:"userInfo.openGoogleCode !== 2 && userInfo.openMobileCode === 2"}],staticClass:"inputTipBox"},[o("div",{staticClass:"inputTip-title"},[o("span",[t._v(t._s(t.$t("popoup.text11")))])]),t._v(" "),o("div",{staticClass:"inputTipDiv"},[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.payCode,expression:"payCode",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"password",placeholder:t.$t("popoup.text12")},domProps:{value:t.payCode},on:{focus:function(s){t.phoneCodeTipShow=!1},input:function(s){s.target.composing||(t.payCode=s.target.value.trim())},blur:function(s){return t.$forceUpdate()}}}),t._v(" "),o("button",{ref:"sendMsg",staticClass:"secret-btn",on:{click:function(s){return t.sendPhoneCode()}}},[t._v(t._s(t.$t("popoup.text13")))])]),t._v(" "),o("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.phoneCodeTipShow}},[t._v(t._s(t.$t("popoup.text12")))])])]),t._v(" "),o("div",{staticClass:"popupBtn"},[o("button",{staticClass:"secret-btn",on:{click:function(s){t.verificationShow=!1}}},[t._v(t._s(t.$t("popoup.text14")))]),t._v(" "),o("button",{staticClass:"secret-btn",on:{click:function(s){return t.confirmOpenAi()}}},[t._v(t._s(t.$t("popoup.text15")))])])])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.successShow,expression:"successShow"}],staticClass:"myPopup"},[o("div",{staticClass:"myPopup-tip"},[o("h3",{staticClass:"title"},[t._v(t._s(t.$t("AI.aiDetail.text5")))]),t._v(" "),o("button",{staticClass:"secret-btn",on:{click:function(s){return t.closeSuccessPopup()}}},[t._v(t._s(t.$t("popoup.text15")))])])])],1)},staticRenderFns:[]};var d=e("VU/8")(c,u,!1,function(t){e("kums")},"data-v-2ded499c",null);s.default=d.exports},kums:function(t,s){}});