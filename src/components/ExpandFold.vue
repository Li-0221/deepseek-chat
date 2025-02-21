<template>
  <div>
    <el-popover
      :placement="isExpand ? 'bottom' : 'right'"
      width="20px"
      effect="dark"
      trigger="hover"
      :content="isExpand ? '收起边栏' : '展开边栏'"
    >
      <template #reference>
        <div
          class="rounded-md w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[rgb(243,244,246)]"
          @click="isExpand = !isExpand"
        >
          <component :is="isExpand ? FoldInSvg : FoldOutSvg" class="w-7 h-7 text-[rgb(139,139,139)]" />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import FoldInSvg from "@/assets/foldin.svg";
import FoldOutSvg from "@/assets/foldout.svg";

const isExpand = defineModel("isExpand");
</script>

<style lang="scss" scoped></style>
