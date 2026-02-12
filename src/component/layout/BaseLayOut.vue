<script setup lang="ts">
  import banner from '@/component/banner.vue'

  const props = defineProps<{ isLogin?: boolean }>()

  defineOptions({
    name: 'BaseLayout',
  })
</script>

<template>
  <view class="w-screen h-screen bg-[#F2E2D0] relative">
    <banner class="absolute top-0 left-0 w-screen h-full z-0" />
    <view class="relative z-10 flex flex-col w-full h-full justify-center items-center">
      <view class="w-23/24 h-23/24 rounded-2xl" v-if="!props.isLogin">
        <slot></slot>
      </view>
      <view class="w-full h-full" v-else>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
