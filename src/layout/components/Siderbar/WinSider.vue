<template>
  <aside ref="asideRef" class="bg-[#f9fbff] flex-col h-full flex w-[260px]">
    <div class="logo-contain">
      <div class="text-primary font-bold text-2xl">Ai Chat</div>
      <ExpandFold v-if="!isDrawer" />
      <div v-else class="icon" @click="emit('closeDrawer')">
        <MenuSvg />
      </div>
    </div>

    <div class="mb-[34px] items-center flex justify-between">
      <div class="new-chat bth px-[10px]" @click="router.push('/chat/new')">
        <ChatSvg class="mr-[9px]" />
        开启新对话
      </div>

      <el-button type="primary" link class="mr-5" @click="openHPC">
        HPC
      </el-button>
    </div>

    <TalkList />

    <div class="py-[10px] px-3 text-sm">
      <UserCenter />
    </div>
  </aside>
</template>

<script setup lang="ts">
import TalkList from "../TalkList.vue";
import ExpandFold from "../ExpandFold.vue";
import UserCenter from "../UserCenter.vue";
import ChatSvg from "@/assets/svg/chat.svg";
import MenuSvg from "@/assets/svg/menu.svg?component";
import { useRouter } from "vue-router";

interface Props {
  isDrawer?: boolean;
}

withDefaults(defineProps<Props>(), {
  isDrawer: false
});

const emit = defineEmits(["closeDrawer"]);

const router = useRouter();

const openHPC = () => {
  window.open("http://www.nscc-gz.cn/");
};
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

.bth {
  background-color: rgb(229 240 255);

  &:hover {
    background-color: #cedff5;
  }
}

.logo-contain {
  @apply flex items-center justify-between;

  height: 90px;
  padding: 25px 10px 34px 20px;
}

.new-chat {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: fit-content;
  height: 44px;
  margin: 0 2px 0 14px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: var(--el-color-primary);
  cursor: pointer;
  border-radius: 14px;
}
</style>
