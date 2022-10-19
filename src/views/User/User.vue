<template>
  <div class="user-container">
    <!-- 用户信息 -->
    <div class="user-info-box">
      <!-- 头像  用户名 -->
      <div class="baseInfo">
        <van-cell>
          <template #icon>
            <van-image round width="60px" height="60px" :src="userInfoList.photo" style="margin-right:10px" />
          </template>
          <template #title>
            <span class="custom-title">{{userInfoList.name}}</span>
          </template>
          <template #label>
            <van-tag type="primary" color="#fff" text-color="#007bff">申请认证</van-tag>
          </template>
        </van-cell>
      </div>
      <!-- 动态 关注 粉丝 -->
      <div class="infoData">
        <!-- 动态 -->
        <div class="user-data-item">
          <span>{{userInfoList.art_count}}</span>
          <span>动态</span>
        </div>
        <!-- 关注 -->
        <div class="user-data-item">
          <span>{{userInfoList.follow_count}}</span>
          <span>关注</span>
        </div>
        <!-- 粉丝 -->
        <div class="user-data-item">
          <span>{{userInfoList.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group inset>
      <van-cell title="编辑资料" icon="edit" is-link />
      <van-cell title="小思同学" icon="chat-o" is-link />
      <van-cell title="退出登录" icon="warning-o" is-link />
    </van-cell-group>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user/user.js'
export default {
  name: 'User',
  data() {
    return {
      userInfoList: []
    }
  },
  created() {
    this.getUserInfoList()
  },
  methods: {
    // 获取用户基本资料
    async getUserInfoList() {
      const res = await getUserInfo()
      console.log(res)
      if (res.status === 200) {
        this.userInfoList = res.data.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  // 用户信息
  .user-info-box {
    padding-top: 20px;
    height: 195px;
    width: 100%;
    background-color: #007bff;
    box-sizing: border-box;
    .baseInfo {
      .van-cell {
        background-color: #007bff;

        .van-cell__title {
          color: #fff;
          font-weight: 700;
          font-size: 14px;
        }
        .van-cell__label {
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
    .infoData {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;

      .user-data-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #fff;
      }
    }
  }

  // 操作面板
  .van-cell-group--inset {
    margin: 0;
  }
}
</style>