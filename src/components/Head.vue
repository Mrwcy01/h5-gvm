<template>
  <div class="head clearfix">
    <div :class="color ? 'content':'text'">
      <div
        class="icon left"
        @click="goBack">
        <van-icon
          v-if="icon"
          name="arrow-left"
          size="32"
          :color="iconColor" />
      </div>
      <div class="title left">{{ title }}</div>
      <div
        class="operating right"
        @click="getPush()">{{ operating }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: {
    color: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    operating: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: '#FFF'
    },
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
    getPush() {
      this.$router.push({
        path: this.path
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.head{
  width: 100%;
  .content{
    width: 100%;
    height: 90px;
    background-color: #1989fa;
    padding: 0 30px;
    .icon{
      margin-top: 10px;
    }
    .title{
      width: 100%;
      text-align: center;
      margin-top: -38px;
      color: #fff;
      font-size: 32px;
    }
    .operating{
      margin-top: -38px;
      color: #fff;
      font-size: 30px;
    }
  }
  .text{
    width: 100%;
    height: 90px;
    background-color: #fff;
    padding: 0 30px;
    border-bottom: 1px solid #ccc;
    .icon{
      margin-top: 10px;
    }
    .title{
      width: 100%;
      text-align: center;
      margin-top: -38px;
      // color: #fff;
      font-size: 32px;
    }
    .operating{
      margin-top: -38px;
      // color: #fff;
      font-size: 30px;
    }
  }

}
</style>
