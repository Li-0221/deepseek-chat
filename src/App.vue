<script setup lang="ts">
import ChatSvg from "@/assets/chat.svg";
import LogoSvg from "@/assets/logo.svg";
import FoldInSvg from "@/assets/foldin.svg";
</script>

<template>
  <div class="h-full flex">
    <aside class="w-[260px] bg-[#f9fbff] flex flex-col">
      <div class="logo-contain flex items-center justify-between">
        <LogoSvg class="w-[142px] h-[26px]" />
        <el-popover placement="bottom" width="20px" effect="dark" trigger="hover" content="收起边栏">
          <template #reference>
            <div class="rounded-md w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[rgb(243,244,246)]">
              <FoldInSvg class="w-7 h-7" />
            </div>
          </template>
        </el-popover>
      </div>

      <!-- 开启对话 -->
      <div class="mb-[34px] items-center flex">
        <div class="new-chat px-[10px]">
          <ChatSvg class="mr-[9px]" />
          开启新对话
        </div>
      </div>
    </aside>

    <main class="flex-1"></main>
  </div>
</template>

<style lang="scss" scoped>
$main: #4d6bfe;
$button-bg: rgb(219, 234, 254);
$button-bg-hover: #c6dcf8;

.logo-contain {
  height: 90px;
  padding: 25px 10px 34px 20px;
}

.new-chat {
  color: $main;
  background-color: $button-bg;
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
  &:hover {
    background-color: $button-bg-hover;
  }
}
</style>
