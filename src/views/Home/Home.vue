<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/logo.png" alt="" class="logo">
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 频道标签页 -->
    <van-tabs v-model="channel_id" sticky animated offset-top="46" color="#007bff">
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id" :name="item.id">
        <ArtitleList :channelId="channel_id"></ArtitleList>
      </van-tab>
    </van-tabs>
    <!-- 频道管理 -->
    <van-icon name="plus" class="moreChannels" />
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel.js'
import ArtitleList from './ArtitleList.vue'
export default {
  name: 'Home',
  data() {
    return {
      channel_id: 0,
      channelsList: []
    }
  },
  async created() {
    // 获取用户频道
    const res = await getUserChannels()
    if (res.status === 200) {
      this.channelsList = res.data.data.channels
    } else {
      this.$toast.fail('请求用户频道失败')
    }
  },
  methods: {},
  components: { ArtitleList }
}
</script>

<style scoped lang="less">
.home-container {
  // 导航组件
  .van-nav-bar {
    background-color: #007bff;

    .logo {
      width: 100px;
      height: 30px;
    }
  }
  // 标签页组件
  /deep/.van-tabs__content {
    padding-top: 44px;
  }
  /deep/ .van-tabs__wrap {
    padding-right: 30px;
    background-color: #fff;
  }
  // 频道管理 加号
  .moreChannels {
    position: absolute;
    top: 62px;
    right: 8px;
    font-size: 14px;
    z-index: 999;
  }
}
</style>