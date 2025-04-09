<template>
  <div class="max-w-[820px] mx-auto h-full flex items-center">
    <div class="px-4 w-full">
      <div
        class="max-md:px-8 flex items-center flex-col"
        style="transform: translateY(-2vh)"
      >
        <div
          class="flex max-md:flex-col max-md:items-start gap-[14px] text-2xl font-medium items-center mt-auto"
        >
          <Logo class="w-[60px] h-[60px] text-primary" />
          <h2>{{ t("chatNew.senseHello") }}</h2>
        </div>
        <p class="text-[#404040] mt-2 mb-5 text-sm">
          {{ t("chatNew.senseDescribe") }}
        </p>
      </div>
      <div class="w-full" style="transform: translateY(-2vh)">
        <TextArea v-model="msg" @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { talkAddApi } from "@/api/chat";
import TextArea from "@/components/TextArea/index.vue";
import { useChatStoreHook } from "@/store/modules/chat";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Logo from "@/assets/svg/logo2.svg?component";

const { t } = useI18n();

const router = useRouter();

const chatStore = useChatStoreHook();

const msg = ref("");

const handleSubmit = async () => {
  const { data } = await talkAddApi();
  chatStore.newChatMsg = msg.value;
  router.push({ path: `/chat/${data.id}` });
};
</script>
