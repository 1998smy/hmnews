<template>
  <div class="artitleList-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">
        <ArtitleItem v-for="item in artitleList" :key="item.art_id" :obj="item" :isShow="true" @disLikes="disLikesFn" @reports="reportsFn" @click.native="$router.push(`/artitle_detail/?art_id=${item.art_id}`)"></ArtitleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArtitleItem from '@/components/ArtitleItem.vue'
import { getArtitleApi } from '@/api/artitle.js'
import { timeAgo } from '@/utils/date.js'
import { artitleDislikeApi } from '@/api/dislikes.js'
import { articleReportApi } from '@/api/reports.js'
export default {
  name: 'ArtitleList',
  props: {
    channelId: Number
  },
  data() {
    return {
      timestamp: null,
      artitleList: [],
      refreshing: false,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getArtitlesList()
  },
  methods: {
    // 获取文章列表
    async getArtitlesList() {
      const res = await getArtitleApi(this.channelId, this.timestamp)
      if (res.status === 200) {
        // 将 后台返回的时间数据进行预处理
        res.data.data.results.forEach(obj => {
          obj.pubdate = timeAgo(obj.pubdate)
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
        } else {
          this.artitleList = [...this.artitleList, ...res.data.data.results]
          this.timestamp = res.data.data.pre_timestamp
          this.loading = false
        }
      } else {
        this.$toast.fail('获取文章数据失败')
      }
    },
    // 下拉刷新事件
    onRefresh() {
      this.artitleList = []
      this.timestamp = null
      this.getArtitlesList()
      this.refreshing = false
    },
    // 加载更多事件
    onLoad() {
      if (this.artitleList.length > 0) {
        this.getArtitlesList()
      }
    },
    // 反馈不感兴趣文章
    async disLikesFn(obj) {
      try {
        await artitleDislikeApi(obj.art_id)
        this.$notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        this.$notify({ type: 'warning', message: '反馈失败-联系程序员' })
      }
    },
    // 反馈垃圾内容
    async reportsFn(obj, value) {
      try {
        await articleReportApi(obj.art_id, value, '就是其他问题')
        this.$notify({ type: 'success', message: '举报成功' })
      } catch (error) {
        this.$notify({ type: 'warning', message: '举报失败' })
      }
    }
  },
  components: {
    ArtitleItem
  }
}
</script>

<style>
</style>