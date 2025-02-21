<template>
  <!--手机 md 平板 xl电脑 -->

  <div class="h-full flex">
    <!-- 手机端header -->
    <header class="md:hidden absolute top-[10px] flex justify-between w-full px-4 h-[46px] items-center">
      <div
        class="icon"
        @click="
          showSide = true;
          isExpand = true;
        "
      >
        <MenuSvg />
      </div>
      <div class="icon">
        <ChatSvg />
      </div>
    </header>

    <!-- 侧边栏 -->
    <aside
      class="bg-[#f9fbff] absolute flex-col h-full max-md:hidden md:flex md:w-[68px]"
      :class="{ '!w-[260px] !flex top-0 left-0 h-full': isExpand }"
      v-if="showSide"
    >
      <template v-if="isExpand">
        <div class="logo-contain" :class="{ '!flex-col': !isExpand }">
          <LogoSvg class="w-[142px] h-[26px]" />
          <ExpandFold v-model:isExpand="isExpand" />
        </div>

        <div class="mb-[34px] items-center flex">
          <div class="new-chat bth px-[10px]">
            <ChatSvg class="mr-[9px]" />
            开启新对话
          </div>
        </div>

        <ChatList />

        <div class="h-[116px] py-[10px] px-3 text-sm">
          <el-popover
            width="200px"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <div
                class="btn h-10 text-[#262626] flex items-center border-[#4d6bfe] border mb-2 rounded-xl py-[9px] px-3 cursor-pointer hover:bg-[rgb(239,246,255)]"
              >
                <PhoneSvg /> <span class="mx-2">下载 App</span> <img src="./assets/new.svg" alt="" class="w-9 h-4" />
              </div>
            </template>
            <template #default>
              <div>
                <img src="./assets/qrcode.png" alt="" />
                <p class="mt-2">扫码下载 DeepSeek APP</p>
              </div>
            </template>
          </el-popover>

          <el-popover
            width="200px"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 6px;"
          >
            <template #reference>
              <div class="h-12 p-2 flex items-center text-[#525252] rounded-xl cursor-pointer hover:bg-[rgb(239,246,255)]">
                <div class="mr-2 rounded-full overflow-hidden">
                  <img
                    class="w-[30px] h-[30px]"
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/y8cR4NwgMcTa5icC5nuc78kRbTibktKibvMXjcVpYtLfjICqyugZ7KM8lfL6DqolKwuaZexIhjH70pnicI9Ava28Iutrcic6rvnMGlCU6aiambO7k/132"
                    alt=""
                  />
                </div>
                个人信息
              </div>
            </template>
            <template #default>
              <ul class="info">
                <li>
                  <el-icon size="24"><Setting /></el-icon>系统设置
                </li>
                <li>
                  <el-icon size="24"><Delete /></el-icon>删除所有对话
                </li>
                <li>
                  <el-icon size="24"><Promotion /></el-icon>联系我们
                </li>
                <li>
                  <el-icon size="24"><SwitchButton /></el-icon>退出登录
                </li>
              </ul>
            </template>
          </el-popover>
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
          <el-popover
            width="200px"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <div
                class="btn text-[rgb(139,139,139)] flex items-center mb-2 rounded-xl py-[9px] px-3 cursor-pointer hover:bg-[rgb(239,246,255)]"
              >
                <PhoneSvg class="w-7 h-7" />
              </div>
            </template>
            <template #default>
              <div>
                <img src="./assets/qrcode.png" alt="" />
                <p class="mt-2">扫码下载 DeepSeek APP</p>
              </div>
            </template>
          </el-popover>

          <el-popover
            width="200px"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 6px;"
          >
            <template #reference>
              <div class="h-12 p-2 flex items-center text-[#525252] rounded-xl cursor-pointer hover:bg-[rgb(239,246,255)]">
                <div class="rounded-full overflow-hidden">
                  <img
                    class="w-[30px] h-[30px]"
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/y8cR4NwgMcTa5icC5nuc78kRbTibktKibvMXjcVpYtLfjICqyugZ7KM8lfL6DqolKwuaZexIhjH70pnicI9Ava28Iutrcic6rvnMGlCU6aiambO7k/132"
                    alt=""
                  />
                </div>
              </div>
            </template>
            <template #default>
              <ul class="info">
                <li>
                  <el-icon size="24"><Setting /></el-icon>系统设置
                </li>
                <li>
                  <el-icon size="24"><Delete /></el-icon>删除所有对话
                </li>
                <li>
                  <el-icon size="24"><Promotion /></el-icon>联系我们
                </li>
                <li>
                  <el-icon size="24"><SwitchButton /></el-icon>退出登录
                </li>
              </ul>
            </template>
          </el-popover>
        </div>
      </div>
    </aside>

    <main class="flex-1 bg-red-200"></main>
  </div>
</template>

<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import ExpandFold from "./components/ExpandFold.vue";
import MenuSvg from "@/assets/menu.svg";
import ChatSvg from "@/assets/chat.svg";
import IconSvg from "@/assets/icon.svg";
import LogoSvg from "@/assets/logo.svg";
import PhoneSvg from "@/assets/phone.svg";
import { Delete, Setting, Promotion, SwitchButton } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "./utils";

const isExpand = ref(true);
const showSide = ref(false);

function handleResize() {
  // 从大于1280到小于1280的时候收起侧边栏
  // 从小于1280到大于1280的时候展开侧边栏
  const width = window.innerWidth;
  if (width <= 768) {
    showSide.value = false;
  } else if (width > 768 && width < 1280) {
    showSide.value = true;
  } else {
    showSide.value = true;
  }
}

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

.info {
  li {
    @apply flex items-center h-10 rounded-lg  py-2 px-3 cursor-pointer hover:bg-[#f5f5f5] gap-[10px] text-sm;
  }
}
</style>
