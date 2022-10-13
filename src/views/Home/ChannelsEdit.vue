<template>
  <div class="channelsEdit-container">
    <!-- 导航组件 -->
    <van-nav-bar title="频道管理" fixed>
      <template #right>
        <van-icon name="cross" size="14" color="#fff" @click="hideWrap" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="myChannels-box">
      <!-- 我的频道 标题 -->
      <div class="channels-title">
        <span>我的频道
          <span class="small-title" @click="enterChannel">{{isEnterChannel ? '点击进入频道' : '点击删除频道'}}</span>
        </span>
        <span @click="isEditChannels">{{isEdit ? '完成' : '编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row>
        <van-col span="6" v-for="item in userChannels" :key="item.id" @click="deleteChannel(item)">
          <div class="channel-item">
            {{item.name}}
            <!-- 徽标 -->
            <van-badge class="cross-badge" color="transparent" v-show="item.name !== '推荐' && isShowBadge">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="12" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 更多频道 -->
    <div class="moreChannels-box" style="margin-top:0">
      <!-- 标题 -->
      <div class="channels-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row>
        <van-col span="6" v-for="item in unChannelsList" :key="item.id" @click="addChannel(item)">
          <div class="channel-item">
            {{item.name}}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'ChannelsEdit',
  props: {
    isShow: Boolean,
    userChannels: Array
  },
  data() {
    return {
      allChannelsList: [],
      isEdit: false,
      isEnterChannel: true,
      isShowBadge: false
    }
  },
  created() {
    this.getAllChannelsList()
  },
  methods: {
    // 获取所有频道
    async getAllChannelsList() {
      const res = await getAllChannels()
      if (res.status === 200) {
        this.allChannelsList = res.data.data.channels
      }
    },
    // 点击关闭pop弹出层
    hideWrap() {
      this.$emit('update:isShow', false)
    },
    // 编辑or完成
    isEditChannels() {
      // 编辑状态
      if (this.isEdit === false) {
        this.isEdit = true
        this.isEnterChannel = false
        this.isShowBadge = true
        // 完成状态
      } else if (this.isEdit === true) {
        this.isEdit = false
        this.isEnterChannel = true
        this.isShowBadge = false
      }
    },
    // 添加频道
    addChannel(obj) {
      if (this.isEdit === true) {
        this.$emit('addChannel', obj)
      }
    },
    // 删除频道
    deleteChannel(obj) {
      if (this.isEdit === true && obj.name !== '推荐') {
        this.$emit('deleteChannel', obj.id)
      } else {
        this.$emit('changeChannel', obj)
        this.$emit('update:isShow', false)
      }
    },
    // 进入频道
    enterChannel() {
      if (this.isEnterChannel === true) {
      }
    }
  },
  computed: {
    // 更多频道数据
    unChannelsList() {
      return this.allChannelsList.filter(item => {
        const index = this.userChannels.findIndex(obj => obj.id === item.id)
        if (index === -1) {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.channelsEdit-container {
  // width: 100%;
  // height: 100%;
  // 导航组件
  .van-nav-bar {
    background-color: #007bff;

    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
  // 我的频道
  .myChannels-box,
  .moreChannels-box {
    margin-top: 46px;
    font-size: 14px;
    .channels-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;

      .small-title {
        color: #808080;
        font-size: 12px;
      }
    }

    .channel-item {
      position: relative;
      margin: 5px;
      height: 36px;
      border: 1px solid #f4f5f6;
      text-align: center;
      line-height: 36px;
      background-color: #fafafa;
      font-size: 12px;
    }

    .cross-badge {
      position: absolute;
      top: -3px;
      right: -4px;
    }
    .badge-icon {
      display: block;
      font-size: 10px;
      line-height: 16px;
    }
  }
}
</style>