webpackJsonp([13],{"+EIS":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{step:1,email:"",emailTipShow:!1,userPwd:"",userPwdTipShow:!1,rePassword:"",rePasswordTipShow:!1,vCode:"",vCodeTipShow:!1,codeTab:1,userPhone:Number,openGoogleCode:1,openMobileCode:1,sendBtnTimes:60,successShow:!1}},methods:{goNext:function(){var t=this;if(""!==this.email&&/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.email)){var e=this.$api+"/user/findPasswordWeb?email="+this.email;this.$http.post(e).then(function(e){e.data.success?(t.step=2,t.openGoogleCode=e.data.data.openGoogleCode,t.openMobileCode=e.data.data.openMobileCode,t.userPhone=e.data.data.mobile,2===t.openGoogleCode?t.codeTab=1:t.codeTab=3):t.$store.dispatch("errAction",{bool:!0,msg:e.data.msg})}).catch(function(t){console.log(t)})}else this.emailTipShow=!0},completeFun:function(){var t=this;""===this.userPwd&&(this.userPwdTipShow=!0),""!==this.rePassword&&this.userPwd===this.rePassword||(this.rePasswordTipShow=!0),""===this.vCode&&(this.vCodeTipShow=!0);var e=new FormData,s=void 0;e.append("email",this.email),e.append("code",this.vCode),e.append("newpassword",this.userPwd),3===this.codeTab?s="1":1!==this.codeTab&&4!==this.codeTab||(s="3"),e.append("type",s),""!==this.userPwd&&this.userPwd===this.rePassword&&""!==this.vCode&&this.$http.post(this.$api+"/user/findPasswordWeb",e).then(function(e){e.data.success?(t.sendBtnTimes=0,t.successShow=!0):t.$store.dispatch("errAction",{bool:!0,msg:e.data.msg})}).catch(function(t){console.log(t)})},countDown:function(){var t=this;0===this.sendBtnTimes?(this.$refs.sendMsg.innerHTML=this.$t("login.getBackPwd.text13"),this.sendBtnTimes=60,this.$refs.sendMsg.style.color="rgba(201,0,16)",this.$refs.sendMsg.disabled=!1):(this.sendBtnTimes--,this.$refs.sendMsg.innerHTML=this.sendBtnTimes,this.$refs.sendMsg.disabled=!0,this.$refs.sendMsg.style.color="rgba(255,255,255,0.6)",setTimeout(function(){return t.countDown()},1e3))},sendPhoneCode:function(){var t=this,e=new FormData,s=void 0;3===this.codeTab&&(e.append("email",this.email),e.append("type",1),this.$http.post(this.$api+"/register/sendEmailCode",e).then(function(e){s=e.data.success?t.$t("login.getBackPwd.text17"):e.data.msg,t.$store.dispatch("errAction",{bool:!0,msg:s})}).catch(function(t){console.log(t)})),this.countDown()},closeSuccessPopup:function(){this.successShow=!1,this.$router.push({path:"/login"})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"getBackPwd myPopup"},[s("div",{staticClass:"myPopupBox"},[s("h3",{staticClass:"secret-title"},[t._v(t._s(t.$t("login.getBackPwd.text1")))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.step,expression:"step === 1"}],staticClass:"stepOne",on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goNext()}}},[s("div",{staticClass:"inputTipBox"},[s("div",{staticClass:"inputTip-title"},[s("span",[t._v(t._s(t.$t("login.getBackPwd.text2")))])]),t._v(" "),s("div",{staticClass:"inputTipDiv"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"text",placeholder:t.$t("login.getBackPwd.text3")},domProps:{value:t.email},on:{focus:function(e){t.emailTipShow=!1},input:function(e){e.target.composing||(t.email=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),s("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.emailTipShow}},[t._v(t._s(t.$t("login.getBackPwd.text3")))])]),t._v(" "),s("button",{staticClass:"secret-btn",on:{click:function(e){return t.goNext()}}},[t._v(t._s(t.$t("login.getBackPwd.text4")))])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2===t.step,expression:"step === 2"}],staticClass:"stepTwo"},[s("div",{staticClass:"inputTipBox"},[s("div",{staticClass:"inputTip-title"},[s("span",[t._v(t._s(t.$t("login.getBackPwd.text5")))])]),t._v(" "),s("div",{staticClass:"inputTipDiv"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.userPwd,expression:"userPwd",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"password",placeholder:t.$t("login.getBackPwd.text6")},domProps:{value:t.userPwd},on:{focus:function(e){t.userPwdTipShow=!1},input:function(e){e.target.composing||(t.userPwd=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),s("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.userPwdTipShow}},[t._v(t._s(t.$t("login.getBackPwd.text6")))])]),t._v(" "),s("div",{staticClass:"inputTipBox"},[s("div",{staticClass:"inputTip-title"},[s("span",[t._v(t._s(t.$t("login.getBackPwd.text7")))])]),t._v(" "),s("div",{staticClass:"inputTipDiv"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.rePassword,expression:"rePassword",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"password",placeholder:t.$t("login.getBackPwd.text8")},domProps:{value:t.rePassword},on:{focus:function(e){t.rePasswordTipShow=!1},input:function(e){e.target.composing||(t.rePassword=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),s("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.rePasswordTipShow}},[t._v(t._s(t.$t("login.getBackPwd.text8")))])]),t._v(" "),4===t.codeTab||5===t.codeTab?s("ul",{staticClass:"secret-tab"},[s("li",{class:{tabActive:4===t.codeTab},on:{click:function(e){t.codeTab=4}}},[t._v(t._s(t.$t("login.getBackPwd.text9")))]),t._v(" "),s("li",{class:{tabActive:5===t.codeTab},on:{click:function(e){t.codeTab=5}}},[t._v(t._s(t.$t("login.getBackPwd.text10")))])]):t._e(),t._v(" "),s("div",{staticClass:"inputTipBox",class:{inputTipBoxTab:4===t.codeTab||5===t.codeTab}},[s("div",{staticClass:"inputTip-title"},[1===t.codeTab?s("span",[t._v(t._s(t.$t("login.getBackPwd.text9")))]):t._e(),t._v(" "),3===t.codeTab?s("span",[t._v(t._s(t.$t("login.getBackPwd.text11")))]):t._e()]),t._v(" "),s("div",{staticClass:"inputTipDiv"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.vCode,expression:"vCode",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"text",placeholder:t.$t("login.getBackPwd.text12")},domProps:{value:t.vCode},on:{focus:function(e){t.vCodeTipShow=!1},input:function(e){e.target.composing||(t.vCode=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:3===t.codeTab,expression:"codeTab === 3"}],ref:"sendMsg",staticClass:"secret-btn",on:{click:function(e){return t.sendPhoneCode()}}},[t._v(t._s(t.$t("login.getBackPwd.text13")))])]),t._v(" "),s("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:t.vCodeTipShow}},[t._v(t._s(t.$t("login.getBackPwd.text12")))])]),t._v(" "),s("button",{staticClass:"secret-btn complete-btn",on:{click:function(e){return t.completeFun()}}},[t._v(t._s(t.$t("login.getBackPwd.text14")))])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.successShow,expression:"successShow"}],staticClass:"myPopup"},[s("div",{staticClass:"myPopup-tip"},[s("h3",{staticClass:"title"},[t._v(t._s(t.$t("login.getBackPwd.text15")))]),t._v(" "),s("button",{staticClass:"secret-btn",on:{click:function(e){return t.closeSuccessPopup()}}},[t._v(t._s(t.$t("login.getBackPwd.text16")))])])])])},staticRenderFns:[]};var a=s("VU/8")(i,o,!1,function(t){s("6kxv")},"data-v-a14b69ae",null);e.default=a.exports},"6kxv":function(t,e){}});