<template>
  <div class="user-robbt-chat-container">
    <!-- 导航组件 -->
    <van-nav-bar title="小思同学" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 聊天列表 -->
    <div class="chat-list">
      <div v-for="(item,index) in list" :key="index">
        <!-- 小思 -->
        <div class="chat-item left" v-if="item.name === 'xs'">
          <van-image round fit="cover" width="40px" height="40px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <span class="chat-pao">{{item.msg}}</span>
        </div>
        <!-- 用户 -->
        <div class="chat-item right" v-else>
          <span class="chat-pao">{{item.msg}}</span>
          <van-image round fit="cover" width="40px" height="40px" :src="userPhoto" />
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <div class="footer-box">
      <van-cell-group inset>
        <van-field v-model="inputVal" center placeholder="说点什么...">
          <template #button>
            <van-button size="small" type="default" style="border:0;color:#999999" @click="submitChat">提交</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { mapGetters } from 'vuex'
let socket = null
export default {
  name: 'UserChat',
  data() {
    return {
      inputVal: '',
      token: this.$store.state.token,
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ]
    }
  },
  created() {
    // 创建客户端 websocket 的实例
    socket = io('http://geek.itheima.net', {
      query: {
        token: this.token
      },
      transports: ['websocket']
    })
    // 建立连接的事件
    socket.on('connect', () => {
      console.log('与服务器建立了连接')
    })
    // 接收到消息的事件
    socket.on('message', data => {
      // 把服务器发送过来的消息，存储到 list 数组中
      this.list.push({
        name: 'xs',
        msg: data.msg
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    })
  },
  computed: {
    ...mapGetters(['userPhoto'])
  },
  methods: {
    submitChat() {
      // 判断内容是否为空
      if (!this.inputVal) return
      // 添加聊天消息到 list 列表中
      this.list.push({
        name: 'me',
        msg: this.inputVal
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
      // 把消息发送给 websocket 服务器
      socket.emit('message', {
        msg: this.inputVal,
        timestamp: new Date().getTime()
      })
      // 清空内容
      this.inputVal = ''
    },
    scrollToBottom() {
      const chatItem = document.querySelectorAll('.chat-item')
      const lastItem = chatItem[chatItem.length - 1]
      lastItem.scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  beforeDestroy() {
    // 组件被销毁之前，清空 sock 对象
    // 关闭连接
    socket.close()

    // 销毁 websocket 实例对象
    socket = null
  }
}
</script>

<style scoped lang="less">
.user-robbt-chat-container {
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

  .chat-list {
    padding: 46px 10px;
    overflow: scroll;
    .chat-item {
      margin: 10px 0;
    }
    .left {
      text-align: left;
      .chat-pao {
        &::before {
          left: -6px;
          transform: rotate(-135deg);
        }
      }
    }
    .right {
      text-align: right;
      .chat-pao {
        &::before {
          right: -6px;
          transform: rotate(45deg);
        }
      }
    }
    .chat-pao {
      display: inline-block;
      position: relative;
      margin: 0 18px;
      padding: 0 10px;
      max-width: 70%;
      min-height: 40px;
      background-color: #e0effb;
      border: 1px solid #c2d9ea;
      border-radius: 5px;
      font-size: 14px;
      vertical-align: top;
      line-height: 40px;
      &::before {
        content: '';
        position: absolute;
        top: 12px;
        width: 10px;
        height: 10px;
        border-top: 1px solid #c2d9ea;
        border-right: 1px solid #c2d9ea;
        background-color: #e0effb;
      }
    }
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 46px;
    width: 100%;

    .van-cell-group--inset {
      margin: 0;
    }
  }
}
</style>