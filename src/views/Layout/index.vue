<!-- Layout 页面 -->
<template>
  <div>
    <!-- 二级 路由导航 -->
    <!-- 这次Home和User页面都被缓存了(二级路由也要管) -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/layout/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>