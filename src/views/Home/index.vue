<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/logo.png" alt="" class="logo">
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#fff" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <!-- 频道标签页 -->
    <van-tabs v-model="channel_id" sticky animated offset-top="46" color="#007bff" :before-change="beforeChangeFn" @change="changeFn">
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id" :name="item.id">
        <!-- 文章列表 -->
        <ArtitleList :channelId="channel_id"></ArtitleList>
      </van-tab>
    </van-tabs>
    <!-- 频道管理 加号 -->
    <van-icon name="plus" class="moreChannels" @click="show = true" />
    <!-- 频道管理弹出层 -->
    <van-popup v-model="show" class="edit-wrap">
      <channelsList :isShow.sync="show" :userChannels="channelsList" @addChannel="addChannelsFn" @deleteChannel="deleteChannel" @changeChannel="changeChannel"></channelsList>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels, updateUserChannels } from '@/api'
import ArtitleList from '@/views/Home/ArtitleList.vue'
import ChannelsList from '@/views/Home/ChannelsEdit.vue'
const nameToTop = {}
export default {
  name: 'Home',
  data() {
    return {
      channel_id: 0,
      channelsList: [],
      show: false
    }
  },
  created() {
    this.userChannels()
  },
  // 组件内导航守卫  在离开页面之前
  beforeRouteLeave(to, from, next) {
    from.meta.top = window.scrollY
    next()
  },
  methods: {
    // 获取用户频道
    async userChannels() {
      const res = await getUserChannels()
      if (res.status === 200) {
        this.channelsList = res.data.data.channels
      } else {
        this.$toast.fail('请求用户频道失败')
      }
    },
    // 更新频道
    async updateChannel() {
      // 数据预处理
      // 1.过滤掉 id=0 的推荐频道
      const arr = this.channelsList.filter(item => {
        return item.id !== 0
      })
      // 2.map arr数组，添加 seq属性，删除 name属性
      const resArr = arr.map((it, index) => {
        // 3. 浅拷贝 arr 数组，让对象与原数组脱离
        const newObj = { ...it }
        newObj.seq = index + 1
        delete newObj.name
        return newObj
      })
      // 发送 添加频道 请求
      const res = await updateUserChannels(resArr)
      if (res.status === 201) {
        console.log('更新频道成功')
      } else {
        this.$toast.fail('更新频道失败')
      }
    },
    // 添加频道事件
    async addChannelsFn(obj) {
      this.channelsList.push(obj)
      this.updateChannel()
    },
    // 编辑频道  添加or删除频道
    async deleteChannel(obj) {
      // 删除 channelsList中 对应的 频道
      const index = this.channelsList.findIndex(item => {
        item.id === obj
      })
      this.channelsList.splice(index, 1)
      this.updateChannel()
    },
    changeChannel(obj) {
      this.channel_id = obj.id
    },
    // 切换标签前触发
    beforeChangeFn() {
      nameToTop[this.channel_id] = window.scrollY
      // 先保存要被切走频道的滚动距离(一定要用哦this.channelId里存着的)
      // 只有return true才会让tabs切换
      return true
    },
    // 激活当前标签触发
    changeFn() {
      // 等 DOM 更新完毕之后，根据记录的"滚动条位置"，调用 window.scrollTo() 方法进行滚动
      this.$nextTick(() => {
        window.scrollTo(0, nameToTop[this.channel_id] || 0)
      })
    }
  },
  components: { ArtitleList, ChannelsList }
}
</script>

<style scoped lang="less">
.home-container {
  // 导航组件
  .van-nav-bar {
    background-color: #007bff;

    .logo {
      width: 100px;
      height: 30px;
    }
  }
  // 标签页组件
  /deep/.van-tabs__content {
    padding-top: 44px;
  }
  /deep/ .van-tabs__wrap {
    padding-right: 30px;
    background-color: #fff;
  }
  // 频道管理 加号
  .moreChannels {
    position: fixed;
    top: 62px;
    right: 8px;
    font-size: 14px;
    z-index: 999;
  }
  .edit-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>