<template>
  <div>
    <div class="bg-[rgb(243,244,246)] p-[10px] rounded-3xl shadow">
      <el-input
        v-model="model"
        class="ds-textarea"
        style="width: 100%"
        :rows="2"
        autofocus
        :autosize="{ minRows: 2, maxRows: 12 }"
        type="textarea"
        placeholder="给 Panda 发送消息"
        @keypress="handleEnter"
      />

      <div class="flex justify-end">
        <div class="flex gap-[10px] items-center text-[#4c4c4c]">
          <!--使用 stop-animate.svg 加上v-if就不显示了。 -->
          <Stop
            v-if="generateAiChat.isLoading"
            class="svgbtn"
            @click="emit('stop')"
          />

          <ArrowUp
            v-else
            class="svgbtn"
            :class="{ '!cursor-not-allowed': !model }"
            @click="handleSubmit"
          />
        </div>
      </div>
    </div>
    <div class="h-7 mt-2 text-[rgb(163,163,163)] text-xs w-full text-center">
      内容由 AI 生成，请仔细甄别
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasicLayout } from "@/hooks/useBasicLayout";
import Stop from "@/assets/svg/stop.svg?component";
import ArrowUp from "@/assets/svg/arrow-up.svg?component";
import { useChatStoreHook } from "@/store/modules/chat";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { message } from "@/utils/message";

const emit = defineEmits(["submit", "stop"]);

const model = defineModel<string>();
const route = useRoute();
const { isMobile } = useBasicLayout();

const { generateAiChat } = storeToRefs(useChatStoreHook());

const handleSubmit = () => {
  if (!model.value) {
    message("请输入内容！", { type: "warning" });
    return;
  }
  if (generateAiChat.value.isLoading) {
    message("正在回复中，请中断回复或稍后再试！", { type: "warning" });
    return;
  }
  emit("submit");
};

const handleEnter = (event: KeyboardEvent) => {
  if (!isMobile.value) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  } else {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
};
</script>

<style lang="scss" scoped>
.svgbtn {
  @apply text-primary cursor-pointer hover:text-[var(--el-color-primary-light-3)];
}

:deep(.ds-textarea) {
  textarea {
    font-size: 16px;
    resize: none;
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
