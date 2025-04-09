import { http } from "@/utils/http";
import type { HttpResponseType } from "./types";

export type UserResult = {
  token: string;
  username: string;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<HttpResponseType<UserResult>>("post", "/auth/login", {
    data
  });
};

/** 注册 */
export const registerAPi = (data?: object) => {
  return http.request<HttpResponseType>("post", "/auth/register", { data });
};
