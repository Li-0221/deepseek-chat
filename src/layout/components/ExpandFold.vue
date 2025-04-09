<template>
  <div>
    <el-popover
      :placement="isCollapse ? 'right' : 'bottom'"
      width="20px"
      trigger="hover"
      :content="isCollapse ? '展开边栏' : '收起边栏'"
    >
      <template #reference>
        <div
          class="rounded-md w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[rgb(243,244,246)]"
          @click="settingStore.setCollapse(!isCollapse)"
        >
          <component
            :is="isCollapse ? FoldOutSvg : FoldInSvg"
            class="w-7 h-7 text-[rgb(139,139,139)]"
          />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import FoldInSvg from "@/assets/svg/foldin.svg?component";
import FoldOutSvg from "@/assets/svg/foldout.svg?component";
import { useChatStoreHook } from "@/store/modules/chat";
import { storeToRefs } from "pinia";

const settingStore = useChatStoreHook();
const { isCollapse } = storeToRefs(settingStore);
</script>
