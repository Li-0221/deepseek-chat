import type { MessageCustomize, TalkItem } from "@/api/chat";
import type { RouteRecordName } from "vue-router";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  viewportSize: { width: number; height: number };
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = {
  token?: string;
  username?: string;
  roles?: Array<string>;
  permissions?: Array<string>;
};

export type GroupedData = {
  today?: TalkItem[];
  yesterday?: TalkItem[];
  within7Days?: TalkItem[];
  within30Days?: TalkItem[];
};

export interface GenerateAiChat extends MessageCustomize {
  conversationId: number;
  isError: boolean;
  isFinish: boolean;
  isLoading: boolean;
  contentLoading: boolean;
  reasoningLoading: boolean;
}

export type ChatType = {
  isCollapse?: boolean;
  newChatMsg: string;
  talkList?: TalkItem[];
  generateAiChat: GenerateAiChat;
};
