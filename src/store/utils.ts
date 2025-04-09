export { store } from "@/store";
export { router, resetRouter, constantMenus } from "@/router";
export { getConfig, responsiveStorageNameSpace } from "@/config";
export {
  ascending,
  filterTree,
  filterNoPermissionTree,
  formatFlatteningRoutes
} from "@/router/utils";

export {
  isUrl,
  isEqual,
  isNumber,
  debounce,
  isBoolean,
  getKeyList,
  storageLocal,
  deviceDetection
} from "@pureadmin/utils";
export type {
  setType,
  appType,
  userType,
  multiType,
  cacheType,
  positionType,
  ChatType
} from "./types";
const { VITE_HIDE_HOME } = import.meta.env;
export const routerArrays =
  VITE_HIDE_HOME === "false"
    ? [
        {
          path: "/",
          meta: {
            icon: "ep:home-filled",
            title: "善思开悟"
          }
        }
      ]
    : [];
