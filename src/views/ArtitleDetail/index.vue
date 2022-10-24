<template>
  <div class="artitle-detail-container">
    <!-- 导航组件 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 文章详情 -->
    <van-loading size="24px" color="#1989fa" v-if="artitleInfo.title === undefined" class="isLoading">文章正在加载ing...</van-loading>
    <div class="artitle-detail" v-else>
      <!-- 文章标题 -->
      <h6>{{artitleInfo.title}}</h6>
      <!-- 作者信息 -->
      <div class="artitle-autInfo">
        <van-cell :title="artitleInfo.aut_name" :label="artitleInfo.pubdate" style="padding:0" center>
          <!-- 头像 -->
          <!-- 使用 icon 插槽来自定义左侧图标 -->
          <template #icon>
            <van-image round width="60px" height="60px" fit="cover" :src="artitleInfo.aut_photo" style="margin-right:8px" />
          </template>
          <!-- 关注按钮 -->
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-button plain type="info" size="mini" icon="plus" @click="changeFollowed(true)" v-if="artitleInfo.is_followed === false">关注</van-button>
            <van-button type="info" size="mini" @click="changeFollowed(false)" v-if="artitleInfo.is_followed === true">已关注</van-button>
          </template>
        </van-cell>
      </div>
      <van-divider />
      <!-- 文章内容 -->
      <div class="artitle-content" v-html="artitleInfo.content"></div>
      <!-- end 结束分割线 -->
      <van-divider>End</van-divider>
      <!-- 点赞按钮 -->
      <div class="like">
        <van-button v-if="artitleInfo.attitude === -1" @click="changeAttitude(1)" icon="good-job-o" plain type="danger" size="small">
          点赞
        </van-button>
        <van-button v-else @click="changeAttitude(-1)" icon="good-job-o" type="danger" size="small">
          已点赞
        </van-button>
      </div>
    </div>
    <!-- 底部评论区 -->
    <CommentList :isCollection.sync="artitleInfo.is_collected"></CommentList>
  </div>
</template>

<script>
import { getArtitleInfo } from '@/api'
import { confirmFollowed, cancelFollowed } from '@/api'
import { confirmAttitude, cancelAttitude } from '@/api'
import CommentList from './CommentList.vue'
export default {
  name: 'ArtitleDetail',
  data() {
    return {
      artitleInfo: []
    }
  },
  created() {
    this.getArtitleDetail()
  },
  methods: {
    // 获取文章详情
    async getArtitleDetail() {
      const artId = this.$route.query.art_id
      const res = await getArtitleInfo(artId)
      if (res.status === 200) {
        this.artitleInfo = res.data.data
      }
    },
    // 关注or不关注
    async changeFollowed(val) {
      this.artitleInfo.is_followed = val
      if (val === true) {
        await confirmFollowed(this.artitleInfo.aut_id)
      } else {
        await cancelFollowed(this.artitleInfo.aut_id)
      }
    },
    // 点赞or不点赞
    async changeAttitude(val) {
      this.artitleInfo.attitude = val
      if (val === 1) {
        await confirmAttitude(this.artitleInfo.art_id)
      } else {
        await cancelAttitude(this.artitleInfo.art_id)
      }
    }
  },
  components: { CommentList }
}
</script>

<style scoped lang="less">
.artitle-detail-container {
  width: 100%;
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
  .isLoading {
    padding-top: 50px;
    text-align: center;
  }
  // 作者信息
  .artitle-detail {
    margin-top: 46px;
    padding: 10px;
    overflow: scroll;
    h6 {
      margin: 10px 0;
    }
    .artitle-autInfo {
      padding: 5px 0;
    }
  }
  // 文章内容
  .artitle-content {
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
    /deep/ img {
      width: 100%;
    }
    /deep/ pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .like {
    text-align: center;
  }
}
</style>