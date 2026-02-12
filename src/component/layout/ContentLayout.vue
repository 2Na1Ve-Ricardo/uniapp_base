<script setup lang="ts">
  import { imageRequestPath } from '@/config/global'
</script>

<template>
  <view class="w-full h-full flex flex-col box-border flex gap-6">
    <view class="w-full flex flex-row justify-start items-center gap-3">
      <image :src="imageRequestPath + 'dot.png'" class="max-h-[32rpx] max-w-[32rpx]" />
      <slot name="title" class="title-slot"></slot>
    </view>
    <view class="w-full flex flex-1 flex-col overflow-auto">
      <slot></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .title-slot {
    font-size: 18px;
  }
</style>
