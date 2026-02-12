import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  username: string;
  displayName?: string;
  avatar?: string;
  token?: string;
  role: string;
  roleName: string;
  pagePermissions?: string[];
  hasBindAppId?: boolean;
}

export interface RegisterParams {
  username: string;
  password: string;
  phone: string;
  company: string;
  displayName: string;
}

export interface LoginParams {
  username: string;
  password: string;
  appId: string;
}

interface UserInfo {
  user: User | null;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<UserInfo>({
      user: null,
    });
    const avatar =
      "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

    const token = computed(() => userInfo.value.user?.token);

    function WxLogin() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: (result) => {
            resolve(result);
          },
          fail: (err) => {
            console.error("访问微信服务器失败！请检查网络连接");
            reject(err);
          },
        });
      });
    }

    function getUserInfo() {
      return userInfo.value.user;
    }

    return {
      userInfo,
      avatar,
      WxLogin,
      token,
      getUserInfo,
    };
  },
  {
    persist: {
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    },
  },
);
