import { http } from "@/utils/http";
import type { HttpResponseType } from "./types";
import { getToken } from "@/utils/auth";

export interface TalkItem {
  id: number;
  username: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryMessage {
  messages: Message[];
  total: number;
  conversation: Conversation;
}

export interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
  reasoning_content?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

// 自定义的聊天数据
export interface MessageCustomize extends Message {
  showReason: boolean;
}

export type Summary = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      reasoning_content: any;
      content: string;
      tool_calls: Array<any>;
    };
    logprobs: any;
    finish_reason: string;
    stop_reason: any;
  }>;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens_details: any;
  };
  prompt_logprobs: any;
};

/** 聊天列表 */
export const talkListApi = () => {
  return http.request<HttpResponseType<TalkItem[]>>(
    "get",
    "/conversations/list",
    {},
    { hideProgress: true }
  );
};

/** 删除聊天列表 */
export const talkDelApi = (id: number) => {
  return http.request<HttpResponseType>("post", `/conversations/remove/${id}`);
};

/** 添加新对话 */
export const talkAddApi = () => {
  return http.request<HttpResponseType<TalkItem>>(
    "post",
    "/conversations/create"
  );
};

/** 修改对话 */
export const talkEditApi = (data: object) => {
  return http.request<HttpResponseType>("post", "/conversations/update", {
    data
  });
};

/** 查询历史消息 */
export const historyChatApi = (id: number, hideProgress: boolean) => {
  return http.request<HttpResponseType<HistoryMessage>>(
    "get",
    `/conversations/messages/${id}`,
    {},
    { hideProgress }
  );
};

/** 对话总结 */
export const talkSummaryApi = (data: object) => {
  return http.request<Summary>(
    "post",
    `/summary`,
    { data },
    { hideProgress: true }
  );
};

/** SSE回复 */
export const answerApi = (data: object) => {
  const token = getToken();
  return fetch(`${import.meta.env.VITE_API_URL}/chat`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `bearer ${token}`
    }
  });
};
