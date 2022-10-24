<template>
  <div class="comment-list-container" ref="comBox">
    <!-- 评论内容 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="50" :immediate-check="false">
      <div class="com-item" v-for="(item,index) in commentList" :key="index">
        <div class="com-header">
          <van-cell :title="item.aut_name" center>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <van-image round width="40px" height="40px" fit="cover" :src="item.aut_photo" style="margin-right:10px" />
            </template>
            <template #right-icon>
              <van-icon name="like" color="red" v-if="item.is_liking === true" @click="likeCom(item)" />
              <van-icon name="like-o" class="like-icon" v-else @click="likeCom(item)" />
            </template>
          </van-cell>
        </div>
        <div class="com-content">{{item.content}}</div>
        <div class="com-footer">{{item.pubdate}}</div>
      </div>
    </van-list>

    <!-- 发表评论 -->
    <div class="add-com-box" v-if="isComShow">
      <van-icon name="arrow-left" class="left-icon" @click="$router.back()" />
      <div class="add-com-content" @click.stop="addComment">发表评论</div>
      <div class="com-icon-box">
        <!-- 评论数量 -->
        <van-badge :content="totalComments">
          <van-icon name="comment-o" size="20px" @click="posComment" />
        </van-badge>
        <!-- 收藏 -->
        <van-icon name="star-o" size="20px" v-if="isCollection === false" @click="collection" />
        <van-icon name="star" size="20px" color="yellow" v-if="isCollection === true" @click="collection" />
        <!-- 转发 -->
        <van-icon name="share-o" size="20px" @click="showShare = true" />
      </div>
    </div>
    <!-- 发布评论 -->
    <div class="com-mask" v-if="isInputShow" @click="hide">
      <div class="post-com-box">
        <textarea v-model="commentValue" placeholder="友善评论、理性发言、阳光心灵" @click.stop></textarea>
        <van-button class="post-btn" @click="postCom">发布</van-button>
      </div>
    </div>
    <!-- 分享面板 -->
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { getComList, addComment } from '@/api'
import { timeAgo } from '@/utils/date.js'
import { commentsLikes, cancelCommentLikes } from '@/api'
import { confirmCollection, cancelCollection } from '@/api'
export default {
  name: 'CommentList',
  props: {
    isCollection: Boolean
  },
  data() {
    return {
      isComShow: true,
      isInputShow: false,
      commentList: [],
      totalComments: '',
      offsetId: '',
      loading: false,
      finished: false,
      commentValue: '',
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    // 获取文章所有评论
    async getComments() {
      let artId = this.$route.query.art_id
      const res = await getComList(artId, this.offsetId)
      if (res.status === 200) {
        res.data.data.results.forEach(obj => {
          obj.pubdate = timeAgo(obj.pubdate)
        })
        if (res.data.data.results.length !== 0) {
          this.commentList = [...this.commentList, ...res.data.data.results]
          this.totalComments = res.data.data.total_count || ''
          this.offsetId = res.data.data.last_id
          this.loading = false
        } else {
          this.finished = true
        }
      }
    },
    // 发表评论输入框
    addComment() {
      this.isInputShow = true
      this.isComShow = false
    },
    // 添加评论框 隐藏
    hide() {
      this.isInputShow = false
      this.isComShow = true
    },
    // 增加评论
    async postCom() {
      let artId = this.$route.query.art_id
      const res = await addComment(artId, this.commentValue)
      if (res.status === 201) {
        this.$toast.success('评论成功')
        this.totalComments += 1
      } else {
        this.$toast.fail('评论失败')
      }
      this.commentValue = ''
    },
    // 下拉刷新评论事件
    onLoad() {
      this.getComments()
    },
    // 点赞评论
    async likeCom(obj) {
      if (obj.is_liking === false) {
        await commentsLikes(obj.com_id)
        obj.is_liking = true
      } else {
        await cancelCommentLikes(obj.com_id)
        obj.is_liking = false
      }
    },
    // 定位 评论区
    posComment() {
      // console.log(this.$refs.comBox.getBoundingClientRect().top)
      // 滑动到 可视区域最底部
      this.$refs.comBox.scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 收藏文章
    async collection() {
      let artId = this.$route.query.art_id
      if (this.isCollection === false) {
        await confirmCollection(artId)
        this.$emit('update:isCollection', true)
      } else {
        await cancelCollection(artId)
        this.$emit('update:isCollection', false)
      }
    },
    // 分享文章
    onSelect(option) {
      this.$toast.success(option.name + '分享成功')
      this.showShare = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-list-container {
  padding: 10px 10px 46px 10px;
  // 评论区
  .com-item {
    padding: 10px;
    font-size: 14px;
    .com-header {
      .van-cell {
        padding: 0;
      }
    }
    .com-content {
      padding: 10px 25px;
      // max-width: 80%;
      // 在长单词或 URL 地址内部进行换行
      word-wrap: break-word;
    }
    .com-footer {
      color: #808080;
    }
  }

  // 添加评论
  .add-com-box {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    height: 46px;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    font-size: 16px;
    box-sizing: border-box;

    .left-icon {
      font-size: 18px;
    }
    .add-com-content {
      flex: 1;
      padding-left: 10px;
      margin-left: 20px;
      border: 1px solid #efefef;
      border-radius: 15px;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      box-sizing: border-box;
    }
    .com-icon-box {
      width: 40%;
      display: flex;
      justify-content: space-evenly;
    }
  }
  // 发布评论
  .com-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    .post-com-box {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0 5px 10px;
      height: 80px;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;

      textarea {
        flex: 1;
        padding: 5px;
        font-size: 12px;
        height: 55px;
        border-color: #efefef;
        border-radius: 5px;
      }
      .post-btn {
        border: 0;
        padding: 0 20px;
      }
    }
  }
}
</style>