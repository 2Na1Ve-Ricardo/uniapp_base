<template>
  <view class="banner-title-wrapper">
    <view class="banner-container">
      <image class="banner-image" :src="imageRequestPath + 'banner.png'" mode="aspectFill" />
      <view class="banner-mask" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { imageRequestPath } from '@/config/global'
</script>

<style scoped lang="scss">
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
</style>
