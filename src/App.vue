<template>
  <div id="app">
    <!-- 缓存的一级路由页面切换不被释放, 但是首页还是会重新请求数据 -->
    <keep-alive :exclude="['ArtitleDetail', 'Login', 'Search', 'SearchRes']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
</style>
