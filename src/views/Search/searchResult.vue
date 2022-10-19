<template>
  <div class="searchRes-container">
    <!-- 导航组件 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 文章列表 -->
    <div class="artitle-res">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">
        <ArtitleItem v-for="item  in artitleList" :key="item.art_id" :obj="item" :isShow="false" @click.native="$router.push(`/artitle_detail?art_id=${item.art_id}`)"></ArtitleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getSearchRes } from '@/api/search.js'
import ArtitleItem from '@/components/ArtitleItem.vue'
import { timeAgo } from '@/utils/date.js'
export default {
  name: 'SearchRes',
  props: {
    searchArtList: Array
  },
  data() {
    return {
      page: 1,
      // total: 0,
      artitleList: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.getSearchResultList()
  },
  methods: {
    // 获取文章搜索结果
    async getSearchResultList() {
      // 请求搜索结果列表
      let kw = this.$route.params.keywords
      const res = await getSearchRes(kw, this.page)
      if (res.status === 200) {
        res.data.data.results.forEach(item => {
          item.pubdate = timeAgo(item.pubdate)
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
        } else {
          this.artitleList = [...this.artitleList, ...res.data.data.results]
          // this.total = this.total
          this.loading = false
        }
      }
    },
    // 触底加载更多
    onLoad() {
      if (this.artitleList.length > 0) {
        this.page++
        this.getSearchResultList()
      }
    }
  },
  components: { ArtitleItem }
}
</script>

<style scoped lang="less">
.searchRes-container {
  position: relative;
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
  // 搜索结果
  .artitle-res {
    margin-top: 46px;
  }
}
</style>