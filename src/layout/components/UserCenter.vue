<template>
  <div>
    <el-popover
      width="200px"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 6px;"
    >
      <template #reference>
        <div
          class="h-12 p-2 flex items-center gap-2 text-[#525252] rounded-xl cursor-pointer hover:bg-[rgb(239,246,255)]"
          :class="{ 'justify-center': isCollapse }"
        >
          <img
            class="w-[30px] h-[30px] rounded-full"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            alt=""
          />
          <span v-if="!isCollapse">个人信息</span>
        </div>
      </template>
      <template #default>
        <ul class="info">
          <!-- <li>
            <el-icon size="24"><Setting /></el-icon>系统设置
          </li>
          <li>
            <el-icon size="24"><Delete /></el-icon>删除所有对话
          </li>
          <li>
            <el-icon size="24"><Promotion /></el-icon>联系我们
          </li> -->
          <li @click="logout">
            <el-icon size="24"><SwitchButton /></el-icon>退出登录
          </li>
        </ul>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useChatStoreHook } from "@/store/modules/chat";
import {
  Setting,
  Delete,
  Promotion,
  SwitchButton
} from "@element-plus/icons-vue";
import { removeToken } from "@/utils/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";

const router = useRouter();

const isCollapse = computed(() => useChatStoreHook().isCollapse);

const logout = () => {
  removeToken();
  router.replace("/login");
  message("退出成功!", { type: "success" });
};
</script>

<style lang="scss" scoped>
.info {
  li {
    @apply flex items-center h-10 rounded-lg  py-2 px-3 cursor-pointer hover:bg-[#f5f5f5] gap-[10px] text-sm;
  }
}
</style>
