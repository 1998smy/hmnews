<!-- 登录页面 -->
<template>
  <div class="login-cotainer">
    <!-- 导航组件 -->
    <van-nav-bar title="黑马头条 - 登录" />
    <!-- 表单组件 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="loginFrom.mobile" name="手机号" label="手机号" placeholder="请输入11位手机号" :rules="[{ required: true, message: '请填写正确的手机号' ,trigger:'onChange',pattern:/^1[3456789]\d{9}$/}]" required />
        <van-field v-model="loginFrom.code" type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请填写正确的密码',trigger:'onChange',pattern:/^\d{6}$/ }]" required />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block :loading="isLoading" :disabled="isLoading" type="info" native-type="submit" loading-text="正在登录...">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginFrom: {
        mobile: '13888888888',
        code: '246810'
      },
      isLoading: false
    }
  },
  mounted() {},
  methods: {
    // mapActions 需要是一个数组 或对象
    ...mapActions(['getLoginAction']),
    // 表单提交事件
    async onSubmit() {
      this.isLoading = true
      try {
        await this.getLoginAction(this.loginFrom)
        this.$toast.success({ message: '登录成功', duration: 500 })
        this.isLoading = false
        this.$router.push('/layout')
      } catch (error) {
        this.$toast.success('手机号或密码错误')
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-cotainer {
  width: 100%;
  // 导航组件
  .van-nav-bar {
    background-color: #007bff;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
    // 表单组件
    .van-cell-group--inset {
      margin: 0;
    }
  }
}
</style>