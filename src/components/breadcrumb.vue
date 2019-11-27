<template>
  <div class="breadcrumb">
    <a v-for="(item, index) in breadcrumbList" :key="item.name" @click="goPath(item, index)">{{item.name}}<i v-if="index !== breadcrumbList.length - 1"></i></a>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<script>
export default{
  data () {
    return {}
  },
  props: [
    'breadcrumbList'
  ],
  mounted () {
    this.$nextTick(() => {
      // console.log(this.breadcrumbList)
    })
  },
  methods: {
    goPath (val, index) {
      if (index !== this.breadcrumbList.length - 1) {
        this.$router.push(val.path)
      }
    }
  }
}
</script>
