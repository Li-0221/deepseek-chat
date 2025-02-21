<template>
  <div>
    <el-popover
      width="200px"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <div
          :class="{ 'border-[#4d6bfe] border': isExpand, 'text-[rgb(139,139,139)]': !isExpand }"
          class="h-10 text-[#262626] flex items-center mb-2 rounded-xl py-[9px] px-3 cursor-pointer hover:bg-[rgb(239,246,255)]"
        >
          <PhoneSvg :class="{ 'w-7 h-7': !isExpand }" />
          <template v-if="isExpand">
            <span class="mx-2">下载 App</span>
            <img src="../assets/new.svg" alt="" class="w-9 h-4" />
          </template>
        </div>
      </template>
      <template #default>
        <div>
          <img src="../assets/qrcode.png" alt="" />
          <p class="mt-2">扫码下载 DeepSeek APP</p>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import PhoneSvg from "@/assets/phone.svg";

defineProps({
  isExpand: Boolean
});
</script>

<style lang="scss" scoped></style>
