<template>
  <aside
    ref="asideRef"
    class="bg-[#f9fbff] flex-col h-full max-md:hidden md:flex md: z-50 w-[68px]"
  >
    <div class="flex flex-col h-full justify-between items-center py-5">
      <div>
        <Logo class="w-[44px] h-[44px] text-primary" />
        <ExpandFold class="mt-9 ml-1" />
        <el-popover
          placement="right"
          width="20px"
          effect="dark"
          trigger="hover"
          content="开启新对话"
        >
          <template #reference>
            <div
              class="text-[rgb(139,139,139)] cursor-pointer flex justify-center mt-9"
              @click="router.push('/chat/new')"
            >
              <ChatSvg class="w-6 h-6" />
            </div>
          </template>
        </el-popover>
      </div>
      <UserCenter />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ExpandFold from "../ExpandFold.vue";
import UserCenter from "../UserCenter.vue";
import ChatSvg from "@/assets/svg/chat.svg";
import Logo from "@/assets/svg/logo2.svg?component";

const router = useRouter();
</script>
