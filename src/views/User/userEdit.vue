<template>
  <div class="user-edit-container">
    <!-- 导航组件 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <van-cell-group inset>
      <van-cell title="头像" is-link center>
        <template #default>
          <van-uploader :after-read="afterRead">
            <van-image round fit="cover" width="50px" height="50px" :src="userProfileList.photo" style="margin-right:5px" />
          </van-uploader>
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="userProfileList.name" @click="editUserName" />
      <van-cell title="生日" is-link :value="userProfileList.birthday" @click="showPop" />
    </van-cell-group>

    <!-- 修改名称编辑框 -->
    <van-popup v-model="showMobile" v-fofo round class="mobile-popup">
      <div class=" editmobile-title">
        <span>修改名称</span>
      </div>
      <div class="editmobile-content">
        <van-field v-model="editName" maxlength="7" placeholder="请输入名称" />
      </div>
      <div class="editmobile-btn">
        <van-button type="default" @click="showMobile = false">取消</van-button>
        <van-button type="default" @click="confirmMobile">确认</van-button>
      </div>
    </van-popup>
    <!-- 日期选择器 -->
    <van-popup v-model="showDate" round position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="出生日期" :min-date="minDate" :max-date="maxDate" @confirm="cofBirthday" @cancel="showDate = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateProfile } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'UserEdit',
  data() {
    return {
      userProfileList: [],
      showDate: false,
      showMobile: false,
      editName: '',
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      isShow: false
    }
  },
  created() {
    this.getUserProfileList()
  },
  methods: {
    // 获取用户个人简介
    async getUserProfileList() {
      const res = await getUserProfile()
      if (res.status === 200) {
        this.userProfileList = res.data.data
        this.userName = this.userProfileList.mobile
      }
    },
    // 更新用户头像
    async afterRead(file) {
      let formData = new FormData()
      formData.append('photo', file.file)
      const res = await updateUserPhoto(formData)
      if (res.status === 200) {
        this.userProfileList.photo = res.data.data.photo
        // 同步传给 user页面
        this.$store.commit('UPDATEPHOTO', res.data.data.photo)
      }
    },
    // 修改用户名称
    editUserName() {
      this.editName = this.userProfileList.name
      this.showMobile = true
    },
    // 确认修改名称
    async confirmMobile() {
      const res = await updateProfile({ name: this.editName.trim() })
      if (res.status === 200) {
        this.userProfileList.name = this.editName
        this.showMobile = false
        this.$store.commit('UPDATE_NAME', this.editName)
      }
    },
    // 展示 日期选择器
    showPop() {
      this.currentDate = new Date(this.userProfileList.birthday)
      this.showDate = true
    },
    // 修改出生日期
    async cofBirthday(val) {
      // 处理时间为 YYYY-MM-DD 格式
      const selectDay = dayjs(val).format('YYYY-MM-DD')
      const res = await updateProfile({ birthday: selectDay })
      if (res.status === 200) {
        this.userProfileList.birthday = selectDay
      }
      this.showDate = false
    }
  }
}
</script>

<style scoped lang="less">
.user-edit-container {
  width: 100%;
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

  .van-cell-group--inset {
    padding-top: 46px;
    margin: 0;
  }

  .mobile-popup {
    text-align: center;
    width: 320px;
    height: 140px;

    .editmobile-title {
      margin: 26px 0 5px 0;
      font-size: 16px;
    }

    .editmobile-content {
      /deep/.van-field__control {
        text-align: center;
      }
    }
    .editmobile-btn {
      /deep/.van-button--default {
        width: 50%;
        border: 1px solid #f9fafa;
        &:nth-child(2) {
          color: red;
        }
      }
    }
  }
}
</style>