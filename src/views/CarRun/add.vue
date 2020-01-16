<template>
  <div class="addCars">
    <Head
      icon-color="''"
      :color="false"
      title="添加车队"
      operating="确定" />
    <div class="msg">
      <div class="carsName">
        <van-field
          v-model="value"
          autofocus
          clearable
          label="车队名称"
          label-width="60px"
          placeholder="请输入车队名称" />
      </div>

    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'AddCars',
  components: {
    Head
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.addCars{
  .msg{
    width: 100%;
    padding: 20px 40px;
  }
  .carsName{
    width: 100%;
    height: 70px;
    padding: 11px 15px;
    line-height: 60px;
    margin-top: 40px;
    border: 1px solid #ccc;
  }
}
</style>
