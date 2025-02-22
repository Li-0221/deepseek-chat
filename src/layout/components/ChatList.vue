<template>
  <div class="chat-list">
    <ul v-for="(val, key) in chats" :key="key">
      <p class="time">{{ key }}</p>
      <li v-for="item in val" :key="item.id" @click="router.push('/chat')">
        <span>{{ item.title }}</span>
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
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Delete, EditPen } from "@element-plus/icons-vue";
import { chats } from "../../assets/json/chat-list.json";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
$button-bg-1: rgb(219, 234, 254);
$button-bg-2: #c6dcf8;

.chat-list {
  @apply px-[10px] overflow-y-auto flex-1;
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
</style>
