webpackJsonp([6],{"/qqo":function(e,t){},"Z2/A":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7t+N"),n=s.n(i),o={data:function(){return{lang:"cn",questionList:[],questionOneValue:this.$t("googleValidation.text6"),questionOneData:[],questionOneShow:!1,answerOne:"",answerOneTipValue:"",questionTwoValue:this.$t("googleValidation.text6"),questionTwoData:[],questionTwoShow:!1,answerTwo:"",answerTwoTipValue:"",questionThreeValue:this.$t("googleValidation.text6"),questionThreeData:[],questionThreeShow:!1,answerThree:"",answerThreeTipValue:"",googleCode:"",googleCodeTipShow:!1,successShow:!1}},mounted:function(){var e=this;this.$nextTick(function(){"CN"===localStorage.getItem("secretWebLang")?e.lang="cn":e.lang="en",e.getProblem(),document.addEventListener("click",e.closeCodeMenu),n()("#googleQrCode").qrcode({render:"canvas",width:180,height:180,text:e.$utf16to8(e.$route.query.openCodeUrl)})})},destroyed:function(){document.removeEventListener("click",this.closeCodeMenu)},methods:{getProblem:function(){var e=this;this.$http.post(this.$api+"/user/getThreeSafeProblem",{},{headers:{"secret-language":this.lang}}).then(function(t){t.data.success&&(t.data.data.forEach(function(t){e.questionList.push({question:t})}),e.questionOneData=e.questionList.concat(),e.questionTwoData=e.questionList.concat(),e.questionThreeData=e.questionList.concat())}).catch(function(e){console.log(e)})},closeCodeMenu:function(e){this.$refs.discountBtn1.contains(e.target)||(this.questionOneShow=!1),this.$refs.discountBtn2.contains(e.target)||(this.questionTwoShow=!1),this.$refs.discountBtn3.contains(e.target)||(this.questionThreeShow=!1)},openSelectMenu:function(e){var t=this;1===e?this.questionOneShow=!this.questionOneShow:2===e?this.questionTwoShow=!this.questionTwoShow:this.questionThreeShow=!this.questionThreeShow,this.questionOneData=[],this.questionTwoData=[],this.questionThreeData=[],this.questionList.forEach(function(e){e.question!==t.questionOneValue&&e.question!==t.questionTwoValue&&e.question!==t.questionThreeValue&&t.questionOneData.push(e)}),this.questionList.forEach(function(e){e.question!==t.questionTwoValue&&e.question!==t.questionOneValue&&e.question!==t.questionThreeValue&&t.questionTwoData.push(e)}),this.questionList.forEach(function(e){e.question!==t.questionThreeValue&&e.question!==t.questionOneValue&&e.question!==t.questionTwoValue&&t.questionThreeData.push(e)})},chooseQuestion:function(e,t){1===t?this.questionOneValue=e:2===t?this.questionTwoValue=e:this.questionThreeValue=e,this.questionOneShow=!1,this.questionTwoShow=!1,this.questionThreeShow=!1},completeBind:function(){this.questionOneValue===this.$t("googleValidation.text6")?this.answerOneTipValue=this.$t("googleValidation.text6"):""===this.answerOne?this.answerOneTipValue=this.$t("googleValidation.text7"):this.answerOneTipValue="",this.questionTwoValue===this.$t("googleValidation.text6")?this.answerTwoTipValue=this.$t("googleValidation.text6"):""===this.answerTwo?this.answerTwoTipValue=this.$t("googleValidation.text7"):this.answerTwoTipValue="",this.questionThreeValue===this.$t("googleValidation.text6")?(this.answerThreeTipShow=!0,this.answerThreeTipValue=this.$t("googleValidation.text6")):""===this.answerThree?(this.answerThreeTipShow=!0,this.answerThreeTipValue=this.$t("googleValidation.text7")):this.answerThreeTipValue="",""===this.googleCode&&(this.googleCodeTipShow=!0),2===parseInt(this.$route.query.setsafe)?""===this.answerOneTipValue&&""===this.answerTwoTipValue&&""===this.answerThreeTipValue&&""!==this.googleCode&&this.openGoogleFun():1===parseInt(this.$route.query.setsafe)&&""!==this.googleCode&&this.openGoogleFun()},openGoogleFun:function(){var e=this,t=new FormData;2===parseInt(this.$route.query.setsafe)&&(t.append("question1",this.questionOneValue),t.append("answer1",this.answerOne),t.append("question2",this.questionTwoValue),t.append("answer2",this.answerTwo),t.append("question3",this.questionThreeValue),t.append("answer3",this.answerThree)),t.append("googleCode",this.googleCode),this.$http.post(this.$api+"/user/setSafeProblem",t,{headers:{"secret-language":this.lang}}).then(function(t){t.data.success?e.successShow=!0:e.$store.dispatch("errAction",{bool:!0,msg:t.data.msg})}).catch(function(e){console.log(e)})},closeSuccessPopup:function(){this.successShow=!1,this.$router.push("/userAccount")}}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bindGoogleValidation secret-wrap"},[i("router-link",{staticClass:"secret-back",attrs:{to:"/userAccount"}},[i("img",{attrs:{src:s("n5Zd"),alt:""}}),e._v(e._s(e.$t("bindPhone.text1")))]),e._v(" "),i("div",{staticClass:"secret-wrap-ct"},[i("h3",{staticClass:"title"},[e._v(e._s(e.$t("googleValidation.text1")))]),e._v(" "),i("div",{staticClass:"bindGoogleValidation-top"},[i("div",{attrs:{id:"googleQrCode"}}),e._v(" "),i("h4",[e._v(e._s(e.$route.query.openGgKey))]),e._v(" "),i("p",[e._v(e._s(e.$t("googleValidation.text2")))])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2===parseInt(e.$route.query.setsafe),expression:"parseInt($route.query.setsafe) === 2"}]},[i("div",{staticClass:"inputTipBox inputTipBox-select inputTipBoxOne"},[i("div",{staticClass:"inputTip-title"},[i("span",[e._v(e._s(e.$t("googleValidation.text16"))+" 1")])]),e._v(" "),i("div",{staticClass:"inputTipDiv inputTipDiv-one"},[i("input",{staticClass:"secret-input secret-input-bordernone select-input",attrs:{type:"text",readonly:"",disabled:"",placeholder:e.questionOneValue}}),e._v(" "),i("a",{ref:"discountBtn1",staticClass:"discount-btn",on:{click:function(t){return e.openSelectMenu(1)}}},[i("i",{staticClass:"arrowDown",class:{arrowActive:e.questionOneShow}})]),e._v(" "),i("ul",{staticClass:"selectMenu",class:{selectMenuActive:e.questionOneShow}},e._l(e.questionOneData,function(t,s){return i("li",{key:s,on:{click:function(s){return e.chooseQuestion(t.question,1)}}},[e._v(e._s(t.question))])}),0)]),e._v(" "),i("div",{staticClass:"inputTipBox input-answer-box"},[i("div",{staticClass:"inputTipDiv"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.answerOne,expression:"answerOne",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input input-answer",attrs:{type:"text",placeholder:e.$t("googleValidation.text7")},domProps:{value:e.answerOne},on:{input:[function(t){t.target.composing||(e.answerOne=t.target.value.trim())},function(t){e.answerOne=e.answerOne.substring(0,50),e.answerOne=e.answerOne.replace(/\s+/g,"")}],focus:function(t){e.answerOneTipValue=""},blur:function(t){return e.$forceUpdate()}}}),e._v(" "),i("span",{staticClass:"subNum"},[e._v(e._s(e.answerOne.length)+"/50")])]),e._v(" "),i("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:""!==e.answerOneTipValue}},[e._v(e._s(e.answerOneTipValue))])])]),e._v(" "),i("div",{staticClass:"inputTipBox inputTipBox-select"},[i("div",{staticClass:"inputTip-title"},[i("span",[e._v(e._s(e.$t("googleValidation.text16"))+" 2")])]),e._v(" "),i("div",{staticClass:"inputTipDiv inputTipDiv-two"},[i("input",{staticClass:"secret-input secret-input-bordernone select-input",attrs:{type:"text",readonly:"",disabled:"",placeholder:e.questionTwoValue}}),e._v(" "),i("a",{ref:"discountBtn2",staticClass:"discount-btn",on:{click:function(t){return e.openSelectMenu(2)}}},[i("i",{staticClass:"arrowDown",class:{arrowActive:e.questionTwoShow}})]),e._v(" "),i("ul",{staticClass:"selectMenu",class:{selectMenuActive:e.questionTwoShow}},e._l(e.questionTwoData,function(t,s){return i("li",{key:s,on:{click:function(s){return e.chooseQuestion(t.question,2)}}},[e._v(e._s(t.question))])}),0)]),e._v(" "),i("div",{staticClass:"inputTipBox input-answer-box"},[i("div",{staticClass:"inputTipDiv"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.answerTwo,expression:"answerTwo",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input input-answer",attrs:{type:"text",placeholder:e.$t("googleValidation.text7")},domProps:{value:e.answerTwo},on:{input:[function(t){t.target.composing||(e.answerTwo=t.target.value.trim())},function(t){e.answerTwo=e.answerTwo.substring(0,50),e.answerTwo=e.answerTwo.replace(/\s+/g,"")}],focus:function(t){e.answerTwoTipValue=""},blur:function(t){return e.$forceUpdate()}}}),e._v(" "),i("span",{staticClass:"subNum"},[e._v(e._s(e.answerTwo.length)+"/50")])]),e._v(" "),i("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:""!==e.answerTwoTipValue}},[e._v(e._s(e.answerTwoTipValue))])])]),e._v(" "),i("div",{staticClass:"inputTipBox inputTipBox-select"},[i("div",{staticClass:"inputTip-title"},[i("span",[e._v(e._s(e.$t("googleValidation.text16"))+" 3")])]),e._v(" "),i("div",{staticClass:"inputTipDiv inputTipDiv-three"},[i("input",{staticClass:"secret-input secret-input-bordernone select-input",attrs:{type:"text",readonly:"",disabled:"",placeholder:e.questionThreeValue}}),e._v(" "),i("a",{ref:"discountBtn3",staticClass:"discount-btn",on:{click:function(t){return e.openSelectMenu(3)}}},[i("i",{staticClass:"arrowDown",class:{arrowActive:e.questionThreeShow}})]),e._v(" "),i("ul",{staticClass:"selectMenu",class:{selectMenuActive:e.questionThreeShow}},e._l(e.questionThreeData,function(t,s){return i("li",{key:s,on:{click:function(s){return e.chooseQuestion(t.question,3)}}},[e._v(e._s(t.question))])}),0)]),e._v(" "),i("div",{staticClass:"inputTipBox input-answer-box"},[i("div",{staticClass:"inputTipDiv"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.answerThree,expression:"answerThree",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input input-answer",attrs:{type:"text",placeholder:e.$t("googleValidation.text7")},domProps:{value:e.answerThree},on:{input:[function(t){t.target.composing||(e.answerThree=t.target.value.trim())},function(t){e.answerThree=e.answerThree.substring(0,50),e.answerThree=e.answerThree.replace(/\s+/g,"")}],focus:function(t){e.answerThreeTipValue=""},blur:function(t){return e.$forceUpdate()}}}),e._v(" "),i("span",{staticClass:"subNum"},[e._v(e._s(e.answerThree.length)+"/50")])]),e._v(" "),i("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:""!==e.answerThreeTipValue}},[e._v(e._s(e.answerThreeTipValue))])])])]),e._v(" "),i("div",{staticClass:"inputTipBox inputTipBox-google",class:{marginTop50:1===parseInt(e.$route.query.setsafe)}},[i("div",{staticClass:"inputTipDiv inputTipDiv-four"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.googleCode,expression:"googleCode",modifiers:{trim:!0}}],staticClass:"secret-inputTip secret-input",attrs:{type:"text",placeholder:e.$t("googleValidation.text3")},domProps:{value:e.googleCode},on:{focus:function(t){e.googleCodeTipShow=!1},input:function(t){t.target.composing||(e.googleCode=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),i("span",{staticClass:"inputTipMsg",class:{inputTipMsgActive:e.googleCodeTipShow}},[e._v(e._s(e.$t("googleValidation.text3")))])]),e._v(" "),i("button",{staticClass:"secret-btn secret-btn-bind",on:{click:function(t){return e.completeBind()}}},[e._v(e._s(e.$t("googleValidation.text4")))])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.successShow,expression:"successShow"}],staticClass:"myPopup"},[i("div",{staticClass:"myPopup-tip"},[i("h3",{staticClass:"title"},[e._v(e._s(e.$t("googleValidation.text5")))]),e._v(" "),i("button",{staticClass:"secret-btn",on:{click:function(t){return e.closeSuccessPopup()}}},[e._v(e._s(e.$t("bindPhone.text12")))])])])],1)},staticRenderFns:[]};var u=s("VU/8")(o,a,!1,function(e){s("/qqo")},"data-v-dad3a1a8",null);t.default=u.exports}});