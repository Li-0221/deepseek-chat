<template>
  <header
    class="md:hidden absolute top-0 pt-[10px] z-50 bg-white flex justify-between w-full px-4 h-[46px] items-center"
  >
    <div class="icon" @click="drawer = true">
      <MenuSvg />
    </div>
    <div class="icon">
      <ChatSvg @click="router.push('/chat/new')" />
    </div>
    <el-drawer
      v-model="drawer"
      direction="ltr"
      :size="260"
      :show-close="false"
      :with-header="false"
      class="aside-drawer"
    >
      <WinSider :isDrawer="true" @closeDrawer="drawer = false" />
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import MenuSvg from "@/assets/svg/menu.svg?component";
import ChatSvg from "@/assets/svg/chat.svg?component";
import WinSider from "./Siderbar/WinSider.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const drawer = ref(false);
</script>

<style lang="scss" scoped>
.icon {
  @apply w-8 h-8 flex justify-center items-center rounded cursor-pointer;

  svg {
    @apply w-6 h-6 text-[rgb(139,139,139)];
  }

  &:hover {
    @apply bg-[rgb(245,245,245)];
  }
}

:deep(.aside-drawer) .el-drawer__body {
  padding: 0;
}
</style>
