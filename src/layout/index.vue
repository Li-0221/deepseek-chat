<template>
  <div class="h-full flex">
    <!-- 手机端header -->
    <header class="md:hidden absolute top-0 pt-[10px] z-50 bg-white flex justify-between w-full px-4 h-[46px] items-center">
      <div class="icon" @click="menuClick">
        <MenuSvg />
      </div>
      <div class="icon">
        <ChatSvg />
      </div>
    </header>

    <!-- 侧边栏 -->
    <aside
      class="bg-[#f9fbff] flex-col h-full max-md:hidden md:flex md:w-[68px] z-50"
      :class="{ '!w-[260px] !flex top-0 left-0 h-full': isExpand }"
      v-if="showSide"
      ref="asideRef"
    >
      <template v-if="isExpand">
        <div class="logo-contain" :class="{ '!flex-col': !isExpand }">
          <LogoSvg class="w-[142px] h-[26px]" />
          <ExpandFold v-model:isExpand="isExpand" />
        </div>

        <div class="mb-[34px] items-center flex">
          <div class="new-chat bth px-[10px]" @click="router.push('/new')">
            <ChatSvg class="mr-[9px]" />
            开启新对话
          </div>
        </div>

        <ChatList />

        <div class="h-[116px] py-[10px] px-3 text-sm">
          <DownApp :isExpand />
          <UserCenter :isExpand />
        </div>
      </template>

      <div v-else class="flex flex-col h-full justify-between items-center py-5">
        <div>
          <IconSvg class="w-[44px] h-[44px]" />
          <ExpandFold v-model:isExpand="isExpand" class="mt-9 ml-1" />
          <el-popover placement="right" width="20px" effect="dark" trigger="hover" content="开启新对话">
            <template #reference>
              <div class="text-[rgb(139,139,139)] cursor-pointer flex justify-center mt-9">
                <ChatSvg class="w-6 h-6" />
              </div>
            </template>
          </el-popover>
        </div>
        <div>
          <DownApp :isExpand />
          <UserCenter :isExpand />
        </div>
      </div>
    </aside>

    <!-- 主体 -->
    <main class="flex-1 pb-5 h-full overflow-y-auto">
      <div class="max-w-[800px] flex items-center flex-col m-auto h-full" :class="{ 'justify-center': route.path === '/new' }">
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
        <div class="h-7 pt-1 shadow text-[rgb(163,163,163)] bg-white text-xs fixed bottom-0 w-full text-center z-30">
          内容由 AI 生成，请仔细甄别
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import ExpandFold from "./components/ExpandFold.vue";
import DownApp from "./components/DownApp.vue";
import UserCenter from "./components/UserCenter.vue";
import MenuSvg from "@/assets/svg/menu.svg";
import ChatSvg from "@/assets/svg/chat.svg";
import IconSvg from "@/assets/svg/icon.svg";
import LogoSvg from "@/assets/svg/logo.svg";
import { throttle } from "../utils";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const asideRef = ref();
const isExpand = ref(true);
const showSide = ref(false);

function handleResize() {
  const width = window.innerWidth;
  if (width <= 768) {
    showSide.value = false;
  } else if (width > 768 && width < 1280) {
    showSide.value = true;
  } else {
    showSide.value = true;
  }
}

const menuClick = async () => {
  showSide.value = true;
  await nextTick();
  isExpand.value = true;
  asideRef.value.style.position = "absolute";
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", throttle(handleResize, 200));
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
$main: #4d6bfe;
$button-bg-1: rgb(219, 234, 254);
$button-bg-2: #c6dcf8;

.bth {
  background-color: $button-bg-1;
  &:hover {
    background-color: $button-bg-2;
  }
}

.icon {
  @apply w-8 h-8 flex justify-center items-center rounded cursor-pointer;
  svg {
    @apply w-6 h-6 text-[rgb(139,139,139)];
  }
  &:hover {
    @apply bg-[rgb(245,245,245)];
  }
}

.logo-contain {
  height: 90px;
  padding: 25px 10px 34px 20px;
  @apply flex items-center justify-between;
}

.new-chat {
  color: $main;
  cursor: pointer;
  height: 44px;
  border-radius: 14px;
  flex-shrink: 0;
  align-items: center;
  width: fit-content;
  margin: 0 2px 0 14px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  overflow: hidden;
}
</style>
