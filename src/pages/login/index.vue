<script lang="ts" setup>
  import { imageRequestPath } from '@/config/global'
  import { ref } from 'vue'
  import { type LoginParams, type RegisterParams, type User, useUserStore } from '@/store/UserStore'
  import { getOpenId, isTokenValid, login, register } from '@/api/AuthenticationApi'
  import { onReady } from '@dcloudio/uni-app'

  const activeTab = ref('login')
  const loginForm = ref<LoginParams>({ username: '', password: '', appId: '' })
  const registerForm = ref<RegisterParams>({
    username: '',
    password: '',
    phone: '',
    company: '',
    displayName: '',
  })
  const isLoginPasswordShow = ref<boolean>(false)
  const isRegisterPasswordShow = ref<boolean>(false)
  const isRegisterPasswordConfirmShow = ref<boolean>(false)
  const passwordConfirm = ref<string>('')
  const userStore = useUserStore()

  onReady(() => {
    const token = uni.getStorageSync('token')

    if (!token) {
      userStore.WxLogin().then((res: any) => {
        if (res.code) {
          getOpenId(res.code).then((code: any) => {
            loginForm.value.appId = code.data as string
            login(loginForm.value).then((res) => {
              if (res.code === 200) {
                uni
                  .showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                  })
                  .then(() => {
                    const { token } = res.data
                    uni.setStorageSync('token', token)
                    userStore.userInfo.user = res.data as User
                    uni.navigateTo({ url: '/pages/index/index' })
                  })
              }
            })
          })
        }
      })
    } else {
      isTokenValid(token).then((res) => {
        if (res.data) {
          uni.navigateTo({ url: '/pages/index/index' })
        } else {
          userStore.WxLogin().then((res: any) => {
            if (res.code) {
              getOpenId(res.code).then((code: any) => {
                loginForm.value.appId = code.data as string
                login(loginForm.value).then((res) => {
                  if (res.code === 200) {
                    uni
                      .showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000,
                      })
                      .then(() => {
                        const { token } = res.data
                        uni.setStorageSync('token', token)
                        userStore.userInfo.user = res.data as User
                        uni.navigateTo({ url: '/pages/index/index' })
                      })
                  }
                })
              })
            }
          })
        }
      })
    }
  })

  // 用户登录方法
  function onLogin() {
    if (validateLoginForm()) {
      userStore.WxLogin().then((res: any) => {
        if (res.code) {
          getOpenId(res.code).then((code: any) => {
            loginForm.value.appId = code.data as string
            login(loginForm.value).then((res) => {
              if (res.code === 200) {
                uni
                  .showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                  })
                  .then(() => {
                    const { token } = res.data
                    uni.setStorageSync('token', token)
                    userStore.userInfo.user = res.data as User
                    uni.navigateTo({ url: '/pages/index/index' })
                  })
              }
            })
          })
        }
      })
    }
  }

  // 用户注册方法
  function onRegister() {
    if (validateRegisterForm()) {
      register(registerForm.value).then((res) => {
        console.log(res)
        if (res.data) {
          uni.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000,
          })
          registerForm.value = {
            username: '',
            password: '',
            phone: '',
            company: '',
            displayName: '',
          }
          activeTab.value = 'login'
        }
      })
    }
  }

  function validateLoginForm() {
    if (!loginForm.value.username.trim() || !loginForm.value.password.trim()) {
      uni.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    return true
  }

  function validateRegisterForm(): boolean {
    const { username, password, phone, company } = registerForm.value
    if (!username.trim() || !password.trim() || !phone?.trim() || !company?.trim()) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    if (password !== passwordConfirm.value) {
      uni.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    return true
  }

  function onTabChange(name: string) {
    activeTab.value = name
    if (name === 'login') {
      loginForm.value = { username: '', password: '', appId: '' }
      isLoginPasswordShow.value = false
    } else {
      registerForm.value = {
        username: '',
        password: '',
        phone: '',
        company: '',
        displayName: '',
      }
      passwordConfirm.value = ''
      isRegisterPasswordShow.value = false
      isRegisterPasswordConfirmShow.value = false
    }
  }
</script>

<template>
  <view class="w-screen h-screen bg-[#F2E2D0] flex flex-col justify-center">
    <view class="banner-title-wrapper">
      <view class="banner-container">
        <image :src="imageRequestPath + 'banner.png'" class="banner-image" mode="aspectFill" />
        <view class="banner-mask" />
      </view>
      <view class="title-area">
        <view class="w-full h-1/2 flex justify-start items-end pl-5">
          <text class="welcome-text">欢迎登录 !</text>
        </view>
        <view class="w-full h-1/2 flex justify-center items-center">
          <text class="system-name">试验数据采集系统</text>
        </view>
      </view>
    </view>
    <view class="w-screen h-4/5 flex justify-center items-center">
      <view class="w-9/10 h-9/10 flex flex-col bg-white rounded-2xl">
        <sar-tabs
          v-model:current="activeTab"
          class="login-tab"
          root-style="--sar-tabs-line-bg: #BC1B21"
          type="line"
          @change:current="onTabChange"
        >
          <sar-tab name="login" title="登录"></sar-tab>
          <sar-tab name="register" title="注册"></sar-tab>
        </sar-tabs>

        <!-- 用户登录表单 -->
        <view v-if="activeTab === 'login'" class="base-form">
          <view class="input-row">
            <text class="label">用户名</text>
            <sar-input
              v-model="loginForm.username"
              borderless
              class="input-field"
              placeholder="请输入用户名"
              type="text"
            />
          </view>

          <view class="input-row password-row">
            <text class="label">密 码</text>
            <sar-input
              v-model="loginForm.password"
              :type="isLoginPasswordShow ? 'text' : 'password'"
              borderless
              class="input-field"
              placeholder="请输入密码"
              show-eye
              @click-eye="isLoginPasswordShow = !isLoginPasswordShow"
            />
          </view>

          <button class="submit-btn mt-24 bg-[#BC1B21]" @click="onLogin">登录</button>
        </view>

        <!-- 用户注册表单 -->
        <view v-if="activeTab === 'register'" class="base-form">
          <view class="input-row">
            <text class="label">用户名</text>
            <sar-input
              v-model="registerForm.username"
              borderless
              class="input-field"
              placeholder="请输入用户名"
              type="text"
            />
          </view>
          <view class="input-row">
            <text class="label">姓 名</text>
            <sar-input
              v-model="registerForm.displayName"
              borderless
              class="input-field"
              placeholder="请输入用户名"
              type="text"
            />
          </view>
          <view class="input-row">
            <text class="label">密 码</text>
            <sar-input
              v-model="registerForm.password"
              :type="isRegisterPasswordShow ? 'text' : 'password'"
              borderless
              class="input-field"
              placeholder="请输入密码"
              show-eye
              @click-eye="isRegisterPasswordShow = !isRegisterPasswordShow"
            />
          </view>
          <view class="input-row">
            <text class="label">确认密码</text>
            <sar-input
              v-model="passwordConfirm"
              :type="isRegisterPasswordConfirmShow ? 'text' : 'password'"
              borderless
              class="input-field"
              placeholder="请确认密码"
              show-eye
              @click-eye="isRegisterPasswordConfirmShow = !isRegisterPasswordConfirmShow"
            />
          </view>
          <view class="input-row">
            <text class="label">联系电话</text>
            <sar-input
              v-model="registerForm.phone"
              borderless
              class="input-field"
              placeholder="请输入联系电话"
              type="text"
            />
          </view>
          <view class="input-row">
            <text class="label">公司名称</text>
            <sar-input
              v-model="registerForm.company"
              borderless
              class="input-field"
              placeholder="请输入公司名称"
              type="text"
            />
          </view>
          <button class="submit-btn mt-12 bg-[#BC1B21]" @click="onRegister">新用户注册</button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .banner-title-wrapper {
    position: relative;
    width: 100vw;
    height: 20vh; /* 与 h-1/5 对应 */
  }

  .banner-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .banner-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(188, 27, 33, 0.7),
      /* #BC1B21 with 70% opacity */ rgba(242, 226, 208, 0.2) /* #F2E2D0 with 20% opacity */
    );
  }

  .title-area {
    position: absolute;
    top: 23%;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 2; /* 确保在 banner 上方 */
  }

  .welcome-text {
    /* 添加你的样式 */
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  .system-name {
    font-weight: 700;
    font-size: 36px;
    line-height: 36px;
    letter-spacing: 0.05em;
    color: #700512;
  }

  .login-tab {
    --sar-tabs-line-bg: transparent;
  }

  .base-form {
    padding: 40rpx 60rpx;
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .input-row {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #eeeeee;
  }

  .password-row {
    position: relative;
  }
  .label {
    font-size: 32rpx;
    color: #333;
    width: 240rpx;
  }

  .input-field {
    flex: 1;
    font-size: 30rpx;
    color: #999;
    padding: 0 10rpx;
    height: 60rpx;
    line-height: 60rpx;
  }

  .submit-btn {
    height: 72rpx;
    color: #ffffff;
    font-size: 50rpx;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 120rpx;
  }
</style>
