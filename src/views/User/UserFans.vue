<template>
  <div class="user-fans-container">
    <!-- 导航组件 -->
    <van-nav-bar title="用户粉丝数" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 用户列表 -->
    <div class="user-fans-list">
      <van-cell v-if="fansList.length === 0">当前你没有粉丝哦，再接再励！</van-cell>
      <van-cell :title="item.name" v-for="item in fansList" :key="item.id" v-else>
        <template #icon>
          <van-image round fit="cover" width="50px" height="50px" :src="item.photo" style="margin-right:10px" />
        </template>
        <template #label>
          <van-tag type="primary" plain size="medium" v-if="item.mutual_follow === false">
            <van-icon name="plus" />
            关注
          </van-tag>
          <van-tag type="primary" size="medium" v-else>
            互相关注
          </van-tag>
        </template>
        <template #default>
          <span>
            粉丝数：{{item.fans_count}}
          </span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getUserFans } from '@/api'
export default {
  name: 'UserFans',
  data() {
    return {
      page: 1,
      fansList: [],
      total: 0
    }
  },
  created() {
    this.getUserFansList()
  },
  methods: {
    // 获取用户关注列表
    async getUserFansList() {
      const res = await getUserFans(this.page)
      console.log(res)
      if (res.status === 200) {
        this.fansList = res.data.data.results
        this.total = res.data.data.total_count
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-fans-container {
  // 导航组件
  .van-nav-bar {
    background-color: #007bff;

    /deep/.van-nav-bar__title {
      color: #fff;
    }
    /deep/.van-icon {
      color: #fff;
    }
  }

  .user-fans-list {
    padding-top: 46px;

    .van-cell {
      margin-bottom: 10px;
    }
  }
}
</style>