<script setup lang="ts">
import MenuSvg from "@/assets/menu.svg";
import ChatSvg from "@/assets/chat.svg";
import LogoSvg from "@/assets/logo.svg";
import PhoneSvg from "@/assets/phone.svg";
import FoldInSvg from "@/assets/foldin.svg";
import FoldOutSvg from "@/assets/foldout.svg";

import { Delete, EditPen, Setting, Promotion, SwitchButton } from "@element-plus/icons-vue";
import { ref } from "vue";

const isExpand = ref(true);
</script>

<template>
  <!--手机 md 平板 xl电脑 -->
  <div class="h-full flex">
    <header>
      <MenuSvg />
      <ChatSvg />
    </header>
    <!-- top -->
    <aside class="bg-[#f9fbff] flex flex-col" :class="[isExpand ? 'w-[260px]' : 'w-[64px]']">
      <div class="logo-contain">
        <LogoSvg class="w-[142px] h-[26px]" />
        <el-popover placement="bottom" width="20px" effect="dark" trigger="hover" content="收起边栏">
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

      <!-- 开启对话 -->
      <div class="mb-[34px] items-center flex">
        <div class="new-chat bth px-[10px]">
          <ChatSvg class="mr-[9px]" />
          开启新对话
        </div>
      </div>

      <!-- 聊天列表 -->
      <div class="chat-list">
        <ul>
          <p class="time">今天</p>
          <li>
            <span>你可以给我讲讲js的由来吗你可以给我讲讲js的由来吗你可以给我讲讲js的由来吗你可以给我讲讲js的由来吗</span>

            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item> <el-button :icon="EditPen" text type="primary">重命名</el-button></el-dropdown-item>
                  <el-dropdown-item> <el-button :icon="Delete" text type="danger">删除</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>

          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>

          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
        <ul>
          <p class="time">昨天</p>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
        <ul>
          <p class="time">30天内</p>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <span>你可以给我讲讲js的由来吗</span>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon"><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>The Action 1st</el-dropdown-item>
                  <el-dropdown-item>The Action 2st</el-dropdown-item>
                  <el-dropdown-item>The Action 3st</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
      </div>

      <!-- 底部 -->
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
    </aside>

    <main class="flex-1 bg-red-200"></main>
  </div>
</template>

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

.chat-list {
  @apply px-[10px] overflow-y-auto;
  ul {
    margin-bottom: 24px;
  }
  p {
    background-color: var(--dsr-side-bg);
    color: #555;
    margin: 6px 0 6px -6px;
    padding: 0 10px 0 16px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
  }
  li {
    @apply cursor-pointer h-[38px] rounded-xl px-[10px] flex items-center text-sm relative;
    span {
      @apply block w-full text-nowrap overflow-x-hidden;
    }
    &:hover {
      background-color: $button-bg-1;
    }
    &:hover .icon {
      opacity: 1;
    }
    .icon {
      @apply absolute right-0 -top-3 z-50 w-6 h-6 bg-white rounded-lg opacity-0;
    }
  }
  .active {
    background-color: $button-bg-2;
  }
}

.info {
  li {
    @apply flex items-center h-10 rounded-lg  py-2 px-3 cursor-pointer hover:bg-[#f5f5f5] gap-[10px] text-sm;
  }
}
</style>
