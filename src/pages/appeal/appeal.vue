<template>
  <div class="appeal secret-content66">
    <div class="breadcrumb" v-if="parseInt($route.query.way) === 1">
      <router-link :to="{path: '/home/recharge'}">{{$t('appeal.text1')}}<i></i></router-link>
      <router-link :to="{path: '/home/recharge/rechargeDetail', query: {orderId: $route.query.orderId, way: 1}}">{{$t('appeal.text2')}}<i></i></router-link>
      <a>{{$t('appeal.text3')}}</a>
    </div>
    <div class="breadcrumb" v-if="parseInt($route.query.way) === 2">
      <router-link :to="{path: '/home/fiat'}">{{$t('appeal.text4')}}<i></i></router-link>
      <router-link :to="{path: '/home/fiat/rechargeDetail', query: {orderId: $route.query.orderId, way: 2}}">{{$t('appeal.text5')}}<i></i></router-link>
      <a>{{$t('appeal.text3')}}</a>
    </div>
    <div class="orderInfo">
      <p>{{$t('appeal.text6')}}：{{$route.query.orderId}}</p>
      <p>{{$t('appeal.text7')}}：{{deOrderStatus}}</p>
      <p class="rechargeMoney">{{$t('appeal.text8')}}：<span>{{depositAmount | fourNumber}}USD</span></p>
    </div>
    <div class="reason">
      <h3>{{$t('appeal.text9')}}</h3>
      <ul>
        <li v-for="(item, index) in $t('appeal.reasonArr')" @click="checkReason(index)" :key="index">
          <span :class="{'activeReason': reasonIndex === index}"></span>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="appeal-msg">
      <div class="appeal-msg-textarea">
        <div class="textareaBox">
          <textarea :placeholder="$t('appeal.text10')" class="textarea" v-model="problemContent" @input="textareaVal"></textarea>
        </div>
        <div class="numberBox"><span class="text-count">{{descNum}}</span>/<span>500</span></div>
      </div>
      <div class="errTip" :class="{activeTip: noneContentTip}">{{$t('appeal.text18')}}</div>
    </div>
    <div class="upload-wrapper">
      <div class="img-lis" @click="fullscreenImg(item)" v-for="(item, index) in imgDataObj" :key="index" :class="{'firstCls': num === 5}">
        <img :src="item" alt="" @error="errorImg(item, index)">
        <div class="delete" @click.stop.prevent="deleteIndex(index)"><span class="icon">×</span></div>
      </div>
      <div class="img-loading-box" v-show="isLoading">
        <img src="../../assets/images/basic/loading.gif" alt="" class="img-loading">
      </div>
      <div class="img-box" v-show="isMaxLoading">
        <input @change="fileChange()" ref="uploadFile" accept="image/*" @click="clickone" placeholder="" type="file" id="upload_file"/>
      </div>
      <div class="err-class" v-show="noneImg">{{noneImg}}</div>
    </div>
    <div class="submit-wrapper">
      <button class="secret-btn" @click="submitRecharge()" ref="submitCharge">{{$t('appeal.text19')}}</button>
    </div>
    <!-- 图片放大-->
    <div class="myPopup" v-show="cancalDialog" @click="cancalDialog = false">
      <div class="myPopup-container">
        <div class="close" @click="cancalDialog = false"><img src="../../assets/images/basic/close.png" alt=""></div>
        <img :src="bigImg" alt="" class="big-img" @click="cancalDialog = false">
      </div>
    </div>
    <div class="myPopup" v-show="successShow">
      <div class="myPopup-tip">
        <h3 class="title">{{$t('appeal.text11')}}</h3>
        <button class="secret-btn" @click="closeSuccessPopup()">{{$t('popoup.text15')}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/*$a8 = #7a8199 // 文字颜色
$f2 = #1f222e // 背景颜色
$c26 = #1a1c26 // 背景颜色
$cor52 = #525666 // 字体颜色
$btn31 = #c31739 // 按钮颜色
$border = #33384d // 边框颜色*/
$a8 = #2d3436 // 文字颜色
$f2 = #fff // 背景颜色
$c26 = #fff // 背景颜色
$cor52 = #b3b3b3 // 字体颜色
$btn31 = #0080f4 // 按钮颜色
$border = #e5e5e5 // 边框颜色
.appeal
  .orderInfo
    padding 20px 40px
    border-radius 8px
    background-color $f2
    margin-top 30px
    p
      margin-bottom 15px
      &.rechargeMoney
        font-size 20px
        color #fff
        margin-bottom 0
        font-weight bold
        span
          color $btn31
  .reason
    color #fff
    margin-top 50px
    h3
      font-size 20px
      margin-bottom 20px
    ul
      margin-bottom 40px
      overflow hidden
      li
        display flex
        align-items center
        float left
        margin-right 80px
        font-size 0
        cursor pointer
        user-select none
        margin-bottom 20px
        &:last-child
          margin-right 0
        span
          display inline-block
          width 20px
          height 20px
          background url("../../assets/images/appeal/check.png") no-repeat
          background-size cover!important
          margin-right 10px
          &.activeReason
            background url("../../assets/images/appeal/checked.png") no-repeat
        p
          font-size 18px
  .appeal-msg
    position relative
    height 240px
    overflow hidden
    .errTip
      font-size 16px
      color $btn31
      position absolute
      bottom 50px
      z-index 10
      transition all .15s linear
      &.activeTip
        bottom 15px
    .appeal-msg-textarea
      position absolute
      width 100%
      z-index 20
      background-color $c26
      .textareaBox
        width: 100%
        height: 200px
        padding: 20px
        border-radius 8px
        border 1px solid $border
        overflow hidden
        .textarea
          width calc(100% + 20px)
          padding-right 20px
          height 100%
          color $a8
          font-size: 18px
          line-height: 1.5
          background-color: $c26
          border none
          outline none
          resize none
          box-sizing border-box
          &::-webkit-input-placeholder
            color $cor52
          &::-webkit-scrollbar
            display none
      .numberBox
        font-size 16px
        position absolute
        right 20px
        bottom 15px
  .upload-wrapper
    width 680px
    position: relative
    display flex
    flex-wrap wrap
    padding-bottom 60px
    .err-class
      position: absolute
      bottom: 30px
      color $btn31
      font-size: 16px
    .img-box
      width: 120px
      height: 120px
      display flex
      align-items center
      justify-content center
      cursor pointer
      position: relative
      background url("../../assets/images/appeal/addImg.png") no-repeat
      background-size cover
      &:active
        opacity .6
      #upload_file
        position: absolute
        top: 0
        left: 0
        width: 120px
        height: 120px
        display block
        cursor pointer
        opacity: 0
    .img-uls
      /*display flex*/
      /*flex-wrap wrap*/
    .img-loading-box
      width: 120px
      height: 120px
      display flex
      align-items center
      justify-content center
      margin-bottom: 20px
      .img-loading
        width: 60px
        height: 60px
    .img-lis
      width: 120px
      height: 120px
      position: relative
      margin-right: 20px
      cursor pointer
      &.firstCls:nth-child(5)
        margin-right: 0
      img
        width: 100%
        height: 100%
      .delete
        width: 18px
        height: 18px
        border-radius 50%
        background-color: #c90010
        position: absolute
        right: -9px
        top: -9px
        display flex
        align-items center
        cursor pointer
        justify-content center
        .icon
          font-size: 18px
          color #fff
  .submit-wrapper
    .secret-btn
      &:disabled
        background-color $f2
  .myPopup
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    z-index 999
    display flex
    align-items center
    justify-content center
    .myPopup-container
      position relative
      width 50%
      margin 0 auto
      .close
        width 50px
        height 50px
        display flex
        align-items center
        justify-content center
        cursor pointer
        user-select none
        position absolute
        top -50px
        right 0
      .big-img
        width 100%
</style>

<script>
import {compress, dataURItoBlob} from '../../assets/js/util'
export default{
  data () {
    return {
      cancalDialog: false,
      problemContent: '',
      noneContentTip: false,
      noneImg: '',
      depositAmount: '',
      deOrderStatus: '',
      descNum: 0,
      reasonIndex: 0, // 选中的原因
      depositDetail: [],
      isLoading: false,
      bigImg: '',
      imgDataObj: [],
      imagesArr: [],
      orderId: this.$route.query.orderId,
      isMaxLoading: true,
      num: -1,
      config: {
        width: 120,
        height: 120,
        quality: 1
      },
      imgs: [],
      problemId: null,
      successShow: false // 提交成功弹窗
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDepositDetail()
    })
  },
  methods: {
    // 输入文字控制
    textareaVal () {
      this.noneContentTip = false
      this.descNum = this.problemContent.length
      if (this.problemContent.length > 500) {
        this.descNum = 500
        this.problemContent = this.problemContent.substring(0, 500)
      }
    },
    // 获取订单详情
    getDepositDetail () {
      let id = this.$route.query.orderId
      const url = `${this.$api}/deposit/depositDetail?depositId=${id}`
      this.$http.post(url).then(res => {
        let ret = res.data
        if (ret.success === true && ret.status === 'success') {
          this.depositAmount = ret.data.depositAmount
          if (ret.data.status === 5) {
            this.deOrderStatus = this.$t('appeal.text12')
          } else if (ret.data.payStatus === 4) {
            this.deOrderStatus = this.$t('appeal.text13')
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    clickone () {},
    // 单选框
    checkReason (index) {
      this.reasonIndex = index
    },
    // pc图片上传
    pcUploadimg (e) {
      this.noneImg = ''
      let imgVal = this.$refs.uploadFile
      let imgObj = imgVal.files[0]
      if (imgObj) {
        let isLt2M = imgObj.size / 1024 / 1024 <= 5
        let isType = /(jpg|png|JPG|PNG|jpeg)$/g.test(imgObj.type)
        if (!(isLt2M && isType)) {
          this.noneImg = this.$t('appeal.text14')
          imgVal.value = ''
          return
        }
      } else {
        return
      }
      if (this.imgDataObj.length > 4) {
        this.noneImg = this.$t('appeal.text15')
        imgVal.value = ''
        return
      }
      this.isLoading = true
      if (this.imgDataObj.length > 3) {
        this.num = 5
        this.isMaxLoading = false
      } else {
        this.num = -1
        this.isMaxLoading = true
      }
      let reader = new FileReader()
      // let imgTemp = new Image()
      // let Orientation
      let self = this
      reader.readAsDataURL(imgObj)
      reader.onloadend = function () {
        let result = this.result
        let img = new Image()
        img.src = result
        img.onload = function () {
          let formData = new FormData()
          let data = compress(img)
          self.imgUrl = result
          // console.log(self.imgUrl)
          let blob = dataURItoBlob(data)
          let reader2 = new FileReader()
          reader2.readAsArrayBuffer(blob)
          reader2.onloadend = function () {
            // let f = new File([this.result], imgObj.name)
            formData.append('file', self.$refs.uploadFile.files[0])
            // formData.append('file', f)
            formData.append('sourceType', 2)
            let config = {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
            self.$http.post(`${self.$api}/uploadfile/uploadimg`, formData, config).then((res) => {
              let rets = res.data
              self.isLoading = false
              if (rets.success === true && rets.status === 'success') {
                self.noneImg = ''
                // let srcData = JSON.parse(rets.data)
                let src = rets.data[0].fileUrl
                self.imgDataObj.push(src)
                self.imagesArr.push({
                  imageKey: imgObj.name,
                  imageUrl: res.data.data[0].fileName
                })
              } else {
                self.$store.dispatch('errAction', {bool: true, msg: rets.msg}) // 图片上传失败
              }
              //  可上传重复的图片
              imgVal.value = ''
            }).catch((err) => {
              self.isLoading = false
              console.log(err)
              imgVal.value = ''
            })
          }
        }
      }
    },
    async fileChange (e) {
      this.pcUploadimg(e)
    },
    errorImg (item, index) {
      this.$http.get(item).then(() => {
        this.imgDataObj[index] = item
      }).catch(() => {
        this.$http.get(item).then(() => {
          this.imgDataObj[index] = item
        })
      })
    },
    // 删除图片
    deleteIndex (index) {
      this.num = -1
      this.isMaxLoading = true
      this.imgDataObj.splice(index, 1)
      this.imagesArr.splice(index, 1)
    },
    // 图片全屏
    fullscreenImg (item) {
      this.cancalDialog = true
      this.bigImg = item
    },
    // 提交
    submitRecharge () {
      this.noneImg = ''
      if (this.problemContent === '') {
        this.noneContentTip = true
      }
      if (this.imgDataObj.length === 0) {
        this.noneImg = this.$t('appeal.text16')
      }
      if (this.problemContent !== '' && this.imgDataObj.length !== 0) {
        this.$refs.submitCharge.disabled = true
        let tipMsg
        let formData = new FormData()
        formData.append('images', JSON.stringify(this.imagesArr))
        formData.append('orderId', this.orderId)
        formData.append('resourceId', 1)
        formData.append('contentType', this.reasonIndex + 1)
        formData.append('content', this.problemContent)
        this.$http.post(`${this.$api}/problem/create`, formData).then((res) => {
          let ret = res.data
          if (ret.success === true && ret.status === 'success') {
            this.successShow = true // 显示提交成功弹窗
            this.problemId = res.data.data
            this.$refs.submitCharge.disabled = false
          } else {
            tipMsg = ret.msg
            this.$store.dispatch('errAction', {bool: true, msg: tipMsg}) // 弹窗提示
            this.$refs.submitCharge.disabled = false
          }
        }).catch((err) => {
          tipMsg = this.$t('appeal.text17')
          this.$store.dispatch('errAction', {bool: true, msg: tipMsg}) // 弹窗提示
          console.log(err)
        })
      }
    },
    closeSuccessPopup () { // 开通成功跳转我的人工智能
      this.successShow = false
      let routerPath
      if (parseInt(this.$route.query.way) === 1) {
        routerPath = '/home/recharge/rechargeDetail/appealDetail' // USD充值--申诉详情
      } else {
        routerPath = '/home/fiat/rechargeDetail/appealDetail' // 法币充值记录--申诉详情
      }
      this.$router.push({path: routerPath, query: {orderId: this.orderId, problemId: this.problemId, way: this.$route.query.way}})
    }
  }
}
</script>
