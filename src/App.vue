<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: ''
    }
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {

  }
}
</script>

<style lang="scss">
.van-toast--middle {
  min-width: 30%;
  height: 10%;
  font-size: 28px;
}
.van-icon{
  font-size: 28px;
}
.van-toast__text{
  font-size: 28px;
}
</style>
