<template>
  <div class="h-full w-full flex">
    <!-- 手机端header -->
    <MobileHeader />

    <!-- 侧边栏 -->
    <Siderbar class="max-md:hidden shrink-0" />

    <!-- 主体 -->
    <div class="w-full md:flex-1 h-full">
      <router-view v-slot="{ Component, route }">
        <keep-alive :max="10" include="Chat">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import MobileHeader from "./components/MobileHeader.vue";
import Siderbar from "./components/Siderbar/index.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { debounce } from "@pureadmin/utils";
import { storeToRefs } from "pinia";
import { useChatStoreHook } from "@/store/modules/chat";
import { useDataThemeChange } from "@/hooks/useDataThemeChange";

const { overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);

const settingStore = useChatStoreHook();
const { isCollapse } = storeToRefs(settingStore);

const screenWidth = ref(0);
const listeningWindow = debounce(() => {
  screenWidth.value = document.body.clientWidth;

  if (!isCollapse.value && screenWidth.value < 1280)
    settingStore.setCollapse(true);
  if (isCollapse.value && screenWidth.value > 1280)
    settingStore.setCollapse(false);
  if (screenWidth.value < 768) settingStore.setCollapse(false);
}, 100);

onMounted(() => {
  window.addEventListener("resize", listeningWindow, false);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>
