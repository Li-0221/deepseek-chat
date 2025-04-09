<template>
  <component :is="isCollapse ? MinSider : WinSider" />
</template>

<script setup lang="ts">
import { useChatStoreHook } from "@/store/modules/chat";
import { computed } from "vue";
import WinSider from "./WinSider.vue";
import MinSider from "./MinSider.vue";

const useChatStore = useChatStoreHook();

const isCollapse = computed(() => useChatStore.isCollapse);
</script>
