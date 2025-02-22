<template>
  <div>
    <div class="flex items-center flex-col" style="transform: translateY(-8vh)">
      <div class="flex gap-[14px] text-2xl font-medium items-center mt-auto">
        <IconSvg1 class="w-[60px] h-[60px]" />
        <h2>我是 DeepSeek，很高兴见到你！</h2>
      </div>
      <p class="text-[#404040] mt-2 mb-5 text-sm">我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</p>
    </div>

    <div class="w-full" style="transform: translateY(-8vh)">
      <TextArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextArea from "../../components/TextArea.vue";
import IconSvg1 from "@/assets/svg/icon1.svg";
</script>

<style lang="scss" scoped></style>
