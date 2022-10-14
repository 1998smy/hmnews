<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <div class="search-header">
      <van-icon class="goback" name="arrow-left" size="16" color="#fff" @click="$router.back()" />
      <van-search v-model="keyWord" @search="onSearch" @input="updateSuggestion" shape="round" background="#007bff" placeholder="请输入搜索关键词" :autofocus="true" />
    </div>
    <!-- 搜索历史 -->
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="delete" class="search-icon" @click="deleteHistory" />
      </template>
    </van-cell>
    <!-- 搜索记录 -->
    <div class="search-history">
      <span class="history-item" v-for="(item,index) in historyList" :key="index" @click="searchHistoryFn(item)">{{item}}</span>
    </div>
    <!-- 联想关键词 -->
    <div class="suggestion-list" v-if="isSuggestion">
      <div class="suggestion-item" @click="searchSuggestion(item)" v-for="(item,index) in suggestionList" :key="index">
        <span v-html="strLight(item,keyWord)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/suggestion.js'
import { strLight } from '@/utils/lightStr.js'
export default {
  name: 'Search',
  data() {
    return {
      historyList: JSON.parse(window.sessionStorage.getItem('history')) || ['java', 'html', 'css'],
      keyWord: '',
      suggestionList: [],
      isSuggestion: false
    }
  },
  methods: {
    // 删除历史记录
    deleteHistory() {
      this.historyList = []
      window.sessionStorage.removeItem('history')
    },
    // 搜索事件
    async onSearch() {
      this.isSuggestion = false
      if (this.keyWord === '') {
        return
      } else {
        // 将 搜索记录 存储起来
        this.historyList.push(this.keyWord)
        // 数组去重
        this.historyList = Array.from(new Set(this.historyList))
        window.sessionStorage.setItem('history', JSON.stringify(this.historyList))
        // 跳转到 搜索结果页面
        this.$router.push({ path: `/search/${this.keyWord}` })
        this.keyWord = ''
      }
    },
    // 联想建议
    async updateSuggestion() {
      this.isSuggestion = true
      if (this.keyWord !== '') {
        const res = await getSuggestion(this.keyWord)
        if (res.status === 200) {
          this.suggestionList = res.data.data.options
        }
      } else {
        this.isSuggestion = false
      }
    },
    // 联想建议搜索
    searchSuggestion(val) {
      // 将 搜索记录 存储起来
      this.historyList.push(val)
      // 数组去重
      this.historyList = Array.from(new Set(this.historyList))
      window.sessionStorage.setItem('history', JSON.stringify(this.historyList))
      this.$router.push({ path: `/search/${val}` })
      this.isSuggestion = false
    },
    // 搜索记录点击搜索
    searchHistoryFn(val) {
      this.$router.push({ path: `/search/${val}` })
    },
    // 高亮关键字
    strLight
  },
  computed: {
    // 高亮关键字
    // suggestion() {
    //   return this.suggestionList.map(item => {
    //     return strLight(item, this.keyWord)
    //   })
    // }
  }
}
</script>

<style scoped lang="less">
.search-container {
  // 标题
  .search-header {
    display: flex;
    align-items: center;
    height: 46px;
    background-color: #007bff;
    overflow: hidden;

    .goback {
      margin-left: 14px;
    }
    .van-search {
      flex: 1;
    }
  }
  // 搜索历史
  .search-icon {
    font-size: 14px;
    line-height: inherit;
  }
  // 搜索记录
  .search-history {
    padding: 0 10px;
    .history-item {
      display: inline-block;
      margin: 10px 8px 0 8px;
      padding: 8px 14px;
      background-color: #efefef;
      text-align: center;
      border-radius: 10px;
      font-size: 12px;
    }
  }
  // 联想关键字
  .suggestion-list {
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    min-height: 300px;
    background-color: #fff;
    .suggestion-item {
      margin: 5px 15px;
      line-height: 25px;
      // 实现省略号的三行代码
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }
}
</style>