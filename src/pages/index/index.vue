<template>
  <view class="w-screen h-screen">
    <base-layout>
      <template>
        <text class="title">{{ title }}</text>
      </template>
    </base-layout>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import BaseLayout from '@/component/layout/BaseLayOut.vue'
  const title = ref('Hello')
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
