<template>
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
          <span>{{obj.pudate}}</span>
        </div>
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArtitleItem',
  props: {
    obj: Object
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