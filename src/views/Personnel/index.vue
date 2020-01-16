<template>
  <div class="personnel">
    <Head
      icon-color="''"
      :color="false"
      title="人员管理"
      operating="添加" />
    <div class="search">
      <van-search
        v-model="value"
        placeholder="姓名/卡号"
        show-action
        shape="round"
        clearable
        left-icon="">
        <!-- @search="" -->
        <div slot="action">
          <van-icon
            name="search"
            size="22" /></div>
        <!-- @click="" -->
      </van-search>
    </div>
    <div class="perList">
      <div class="person clearfix">
        <div class="icon left clearfix">
          <van-icon
            class="left"
            name="contact"
            size="18" />
          <span class="left">李四</span>
        </div>
        <div class="card left clearfix">
          <van-icon
            class="left"
            name="debit-pay"
            size="18" />
          <span class="left">321316546163645</span>
        </div>
        <div class="operating right">
          <van-icon
            name="passed"
            size="18" />
          &nbsp;
          <van-icon
            name="edit"
            size="18" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'
export default {
  name: 'Personnel',
  components: {
    Head
  },
  data() {
    return {
      value: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.personnel{
  .perList{
    width: 100%;
    padding: 0 40px;
    .person{
      height: 60px;
      padding: 8px 15px;
      line-height: 60px;
      margin-bottom: 5px;
      border: 1px solid #ccc;
      .van-icon{
        margin-top: 7px;
      }
      .icon{
        width: 26%;
        span{
          font-size: 28px;
          margin-top: 10px;
        }
      }
      .card{
        width: 50%;
        text-align: left;
        span{
          font-size: 28px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
  .search{
    padding: 40px 30px;
    .van-search__content--round{
      height: 60px;
      line-height: 60px;
      .van-cell{
        height: 100%;
        .van-field__left-icon{
          .van-icon{
            padding: 8px 10px 0;
            font-size: 31px;
          }
        }
        .van-cell__value{
          height: 100%;
          .van-field__control{
            height: 100%;
            margin-top: 8px;
            font-size: 28px;
          }
          .van-icon{
            padding: 8px 10px 0;
            font-size: 26px;
          }
        }
      }
    }
    .van-search__action{
      height: 60px;
      padding-top: 10px;
    }
  }
</style>
