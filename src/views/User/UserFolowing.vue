<template>
  <div class="user-following-container">
    <!-- 导航组件 -->
    <van-nav-bar title="关注用户" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 用户列表 -->
    <div class="user-follow-list">
      <van-cell :title="item.name" v-for="item in followList" :key="item.id">
        <template #icon>
          <van-image round fit="cover" width="50px" height="50px" :src="item.photo" style="margin-right:10px" />
        </template>
        <template #label>
          <van-tag type="primary" plain size="medium" v-if="item.mutual_follow === false">
            已关注
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
import { getUserFollow } from '@/api'
export default {
  name: 'UserFollowing',
  data() {
    return {
      page: 1,
      followList: [],
      total: 0
    }
  },
  created() {
    this.getUserFollowList()
  },
  methods: {
    // 获取用户关注列表
    async getUserFollowList() {
      const res = await getUserFollow(this.page)
      if (res.status === 200) {
        this.followList = res.data.data.results
        this.total = res.data.data.total_count
      }
    }
    // 是否互相关注(暂时用处不大，api接口与返回数据没有及时更新)
    // async isFollow(index) {
    //   if (this.followList[index].mutual_follow === false) {
    //     await confirmFollowed(this.followList[index].id)
    //     this.followList[index].mutual_follow = true
    //   } else if (this.followList[index].mutual_follow === true) {
    //     await cancelFollowed(this.followList[index].id)
    //     this.followList[index].mutual_follow = false
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.user-following-container {
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

  .user-follow-list {
    padding-top: 46px;

    .van-cell {
      margin-bottom: 10px;
    }
  }
}
</style>