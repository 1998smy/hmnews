<template>
  <div class="user-container">
    <!-- 用户信息 -->
    <div class="user-info-box">
      <!-- 头像  用户名 -->
      <div class="baseInfo">
        <van-cell>
          <template #icon>
            <van-image round fit="cover" width="60px" height="60px" :src="userInfo.photo" style="margin-right:10px" />
          </template>
          <template #title>
            <span class="custom-title">{{userInfo.name}}</span>
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
          <span>{{userInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <!-- 关注 -->
        <div class="user-data-item" @click="$router.push('/user_following')">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <!-- 粉丝 -->
        <div class="user-data-item" @click="$router.push('/user_fans')">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group inset>
      <van-cell title="编辑资料" icon="edit" is-link @click="$router.push('/user_edit')" />
      <van-cell title="小思同学" icon="chat-o" is-link @click="$router.push('/user_chat')" />
      <van-cell title="退出登录" icon="warning-o" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>
<script>
import { getUserInfo } from '@/api'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      // computed 中 已有 userInfo 不需要再声明
      // userInfo: {}
    }
  },
  created() {
    this.getUserInfoList()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['SETTOKEN', 'SETREFRESH_TOKEN', 'SETUSERINFO']),
    // 获取用户基本资料
    async getUserInfoList() {
      const res = await getUserInfo()
      if (res.status === 200) {
        // this.userInfoList = res.data.data
        // 存入 store 和 本地
        this.SETUSERINFO(res.data.data)
      }
    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认要退出吗？'
        })
        .then(() => {
          this.SETTOKEN('')
          this.SETREFRESH_TOKEN('')
          this.$notify({ type: 'success', message: '退出成功', duration: 400 })
          this.$router.replace('/login')
        })
        .catch(() => {
          this.$notify({ type: 'warning', message: '退出成功', duration: 400 })
        })
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