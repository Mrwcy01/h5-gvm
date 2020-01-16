<template>
  <div class="conversion Attendance">
    <Head
      icon-color="''"
      :color="false"
      title="车辆转换"
      operating="确定" />
    <div class="aims">
      <div class="aimsCar">
        <van-field
          readonly
          clickable
          label="目标车队"
          label-width="60px"
          :value="value"
          placeholder="选择城市"
          @click="showPicker = true" />
        <van-popup
          v-model="showPicker"
          position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm" />
        </van-popup>
      </div>

    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'Conversion',
  components: {
    Head
  },
  data() {
    return {
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  created() {

  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>

<style lang='scss' scoped>
.conversion{
  .aims{
    width: 100%;
    padding: 40px;
    .aimsCar{
      height: 60px;
      padding: 8px 15px;
      border: 1px solid #ccc;
    }

  }
}
</style>
<style lang='scss'>
.conversion{
  .van-field__control{
    margin-top: -4px;
    height: 100%;
  }
}
</style>
