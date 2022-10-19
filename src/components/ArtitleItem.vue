<template>
  <div>
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="title-box">
          <span>{{obj.title}}</span>
          <!-- 如果是一个图片 -->
          <img class="image" :src="obj.cover.images[0]" alt="" v-if="obj.cover.type === 1">
        </div>
        <!-- 如果是三张图片 -->
        <div class="image-box" v-if="obj.cover.type > 1">
          <img class="image" :src="imgUrl" alt="" v-for="(imgUrl,index) in obj.cover.images" :key="index">
        </div>
      </template>
      <!-- 使用 label 插槽来自定义标题 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{obj.aut_name}}</span>
            <span>{{obj.comm_count}} 评论</span>
            <span>{{obj.pubdate}}</span>
          </div>
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" :actions="actions" :cancel-text="cancelText ? '取消' : '返回'" close-on-click-action get-container="body" @select="onSelect" @cancel="onCancel" />
  </div>
</template>

<script>
import { firstActions, secondActions } from '@/api/reports.js'
export default {
  name: 'ArtitleItem',
  props: {
    obj: Object,
    isShow: Boolean
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      cancelText: true
    }
  },
  methods: {
    // 动作面板 选择事件
    async onSelect(item) {
      // 一级反馈
      if (item.name === '不感兴趣') {
        // 把id数据传递给 ArtitleList组件
        this.$emit('disLikes', this.obj)
        this.show = false
      } else if (item.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.show = true
        this.cancelText = false
      } else {
        // 二级反馈 把数据传递给 ArtitleList组件
        this.$emit('reports', this.obj, item.value)
      }
    },
    // 动作面板取消事件
    onCancel() {
      if (this.cancelText === false) {
        this.actions = firstActions
        this.cancelText = true
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.image {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
.image-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-box span {
  margin: 0 3px;
  color: #969799;
  &:first-child {
    margin-left: 0;
  }
}
</style>