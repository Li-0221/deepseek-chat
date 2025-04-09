import { defineStore } from "pinia";
import { store, type ChatType } from "../utils";
import { talkDelApi, talkListApi, talkSummaryApi } from "@/api/chat";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { GroupedData } from "../types";

dayjs.extend(relativeTime);

export const useChatStore = defineStore({
  id: "pure-chat",
  state: (): ChatType => ({
    // 左侧边栏是否折叠
    isCollapse: false,
    // 新对话内容
    newChatMsg: "",
    // 历史对话列表
    talkList: [],
    // 正在生成中的聊天
    generateAiChat: {
      id: undefined, //消息id
      role: "assistant",
      content: "",
      reasoning_content: "",
      created_at: "",
      updated_at: "",

      conversationId: undefined, //会话id
      showReason: true, // 是否显示思考内容
      isError: false, // 是否出错
      isFinish: false, // 是否结束
      isLoading: false, // 是否加载中
      contentLoading: false, // 正文加载中
      reasoningLoading: false // 思考加载中
    }
  }),
  getters: {
    getTalkListByTime(state) {
      const grouped: GroupedData = {
        today: [],
        yesterday: [],
        within7Days: [],
        within30Days: []
      };

      const now = dayjs().startOf("day"); // 当前日期开始时间
      state.talkList.forEach(item => {
        const createdDate = dayjs(item.created_at).startOf("day");
        const diffDays = now.diff(createdDate, "day");

        if (diffDays === 0) grouped.today.push(item);
        else if (diffDays === 1) grouped.yesterday.push(item);
        else if (diffDays >= 2 && diffDays <= 7) grouped.within7Days.push(item);
        else if (diffDays > 7 && diffDays <= 30)
          grouped.within30Days.push(item);
      });

      return grouped;
    }
  },
  actions: {
    setCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
    },
    setGenerateChat(key: keyof ChatType["generateAiChat"], val) {
      this.generateAiChat[key] = val;
    },
    resetGenerateChat() {
      this.generateAiChat = {
        id: undefined, //消息id
        role: "assistant",
        content: "",
        reasoning_content: "",
        created_at: "",

        conversationId: undefined, //会话id
        showReason: true, // 是否显示思考内容
        isError: false, // 是否出错
        isFinish: false, // 是否结束
        isLoading: false, // 是否加载中
        contentLoading: false, // 正文加载中
        reasoningLoading: false // 思考加载中
      };
    },

    async getTalkList() {
      const { data } = await talkListApi();
      this.talkList = data;
    },

    async delTalk(id: number) {
      await talkDelApi(id);
      this.getTalkList();
    },

    async summaryConversation(data: object) {
      await talkSummaryApi(data);
    }
  }
});

export function useChatStoreHook() {
  return useChatStore(store);
}
