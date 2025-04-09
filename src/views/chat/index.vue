<template>
  <div class="pt-14 md:pt-5 h-full flex flex-col overflow-hidden">
    <div
      id="scrollRef"
      ref="scrollRef"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <div class="max-w-[820px] mx-auto p-4 pb-0">
        <Message
          v-for="item of dataSources"
          :key="item.id"
          :messageId="item.id"
          :showReason="item.showReason"
          :date-time="item.updated_at"
          :text="item.content"
          :reasoningContent="item.reasoning_content"
          :inversion="item.role === 'user'"
        />
      </div>
    </div>
    <div class="bg-white">
      <div class="max-w-[820px] mx-auto p-4">
        <TextArea v-model="msg" @submit="handleSubmit" @stop="stopStream" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onActivated,
  onMounted,
  onUnmounted,
  ref
} from "vue";
import Message from "./components/Message/index.vue";
import TextArea from "@/components/TextArea/index.vue";
import { useScroll } from "@/hooks/useScroll";
import { useRoute, useRouter } from "vue-router";
import XStream, { SSEFields } from "@/utils/http/x-stream";
import {
  answerApi,
  MessageCustomize,
  Conversation,
  historyChatApi
} from "@/api/chat";
import { useChatStoreHook } from "@/store/modules/chat";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { message } from "@/utils/message";
import { emitter } from "@/utils/mitt";
import { removeToken } from "@/utils/auth";

defineOptions({
  name: "Chat"
});

const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll();

const route = useRoute();
const router = useRouter();
const chatStore = useChatStoreHook();

const { generateAiChat, newChatMsg } = storeToRefs(chatStore);

const conversationId = +route.params.id;
const conversation = ref<Conversation>();
const messages = ref<MessageCustomize[]>([]);
const msg = ref("");
const summaryMsg = ref("");

const dataSources = computed(() => {
  if (
    generateAiChat.value.conversationId === conversationId &&
    generateAiChat.value.isLoading
  ) {
    return [...messages.value, generateAiChat.value];
  }

  return messages.value;
});

// 给用户增加一条临时消息
const addUserSend = (message: string) => {
  messages.value.push({
    id: Date.now(),
    role: "user",
    content: message,
    reasoning_content: null,
    showReason: false,
    created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss")
  });
  scrollToBottom();
};

// 给ai增加一条临时消息
const addAiReply = () => {
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  chatStore.setGenerateChat("id", Date.now());
  chatStore.setGenerateChat("conversationId", conversationId);
  chatStore.setGenerateChat("showReason", true);
  chatStore.setGenerateChat("isLoading", true);
  chatStore.setGenerateChat("created_at", now);
  chatStore.setGenerateChat("updated_at", now);
};

const handleSubmit = () => {
  addUserSend(msg.value);
  sendMessage(msg.value);
  msg.value = "";
  scrollToBottom();
};

let reader: ReadableStreamDefaultReader<Partial<Record<SSEFields, any>>>;
const sendMessage = async (msg: string) => {
  addAiReply();
  try {
    const response = await answerApi({
      conversation_id: conversationId,
      message: msg
    });
    const stream = XStream({
      readableStream: response.body
    });
    reader = stream.getReader();

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      // 退出登录
      let valueString = JSON.stringify(value);
      valueString = valueString?.replace(/\\/g, "");
      if (valueString?.indexOf('"succflag":1') !== -1) {
        if (valueString.indexOf("请登录") !== -1) {
          message("当前登录已失效，请重新登录！", { type: "error" });
          removeToken();
          chatStore.resetGenerateChat();
          router.replace("/login");
        }
        break;
      }

      // 消息结束
      if (value?.data?.endsWith("[DONE]")) {
        // 新对话完成时 总结一下
        if (dataSources.value.length === 2) {
          await chatStore.summaryConversation({
            conversation_id: conversationId,
            message: summaryMsg.value
          });
          summaryMsg.value = "";
          chatStore.getTalkList();
        }

        await getHistoryChat(true);
        chatStore.resetGenerateChat();

        break;
      }

      const data = JSON.parse(value.data);

      const delta = data?.choices[0].delta || {};
      if (delta.reasoning_content) {
        // 思考内容
        const text =
          generateAiChat.value.reasoning_content + delta.reasoning_content;
        chatStore.setGenerateChat("reasoning_content", text);
        chatStore.setGenerateChat("reasoningLoading", true);
      } else if (delta.content) {
        // 正文内容
        chatStore.setGenerateChat(
          "content",
          generateAiChat.value.content + delta.content
        );
        chatStore.setGenerateChat("reasoningLoading", false);
        chatStore.setGenerateChat("contentLoading", true);
      }

      await nextTick();
      scrollToBottomIfAtBottom();
    }
  } catch (error) {
    message("出错了，请稍后再试！", { type: "error" });
    console.error(error);
    chatStore.resetGenerateChat();
  }
};

const stopStream = async () => {
  reader.cancel();
  await getHistoryChat(true);
  chatStore.resetGenerateChat();
};

const getHistoryChat = async (hideProgress = false) => {
  const { data } = await historyChatApi(conversationId, hideProgress);
  conversation.value = data.conversation;
  messages.value = data.messages.map(item => {
    return {
      ...item,
      showReason: true
    };
  });
};

const addEmitListener = () => {
  emitter.on("changeReasonShow", ({ messageId, show }) => {
    if (messageId === generateAiChat.value.id) {
      generateAiChat.value.showReason = show;
      return;
    }

    const item = messages.value.find(item => item.id === messageId);
    if (item) {
      item.showReason = show;
    }
  });
};

const removeEmitListener = () => {
  emitter.off("changeReasonShow");
};

onMounted(async () => {
  addEmitListener();

  if (newChatMsg.value) {
    // 新对话
    addUserSend(newChatMsg.value);
    sendMessage(newChatMsg.value);
    summaryMsg.value = newChatMsg.value;
    chatStore.getTalkList();
    newChatMsg.value = "";
  } else {
    // 点击对话
    await getHistoryChat();
    scrollToBottom();
  }
});

onUnmounted(() => {
  removeEmitListener();
});

onActivated(() => {
  scrollToBottom();
});
</script>
