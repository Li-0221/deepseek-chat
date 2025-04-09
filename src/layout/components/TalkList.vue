<template>
  <div
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(249,251,255,0.5)"
    style="width: 100%"
    class="chat-list"
  >
    <template v-if="talkList.length">
      <ul v-for="(val, key) in getTalkListByTime" :key="key">
        <template v-if="val.length">
          <p class="time">{{ t(`aside.${key}`) }}</p>
          <li
            v-for="item in val"
            :key="item.id"
            :class="{ '!bg-[rgb(219,234,254)]': +route.params.id === item.id }"
            @click="router.push(`/chat/${item.id}`)"
          >
            <ReText :tippyProps="{ theme: 'light' }">
              {{ item.title }}
            </ReText>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-icon class="icon" @click.stop><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      :icon="EditPen"
                      text
                      type="primary"
                      @click="edit(item)"
                    >
                      重命名
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      :icon="Delete"
                      text
                      type="danger"
                      @click="del(item.id)"
                    >
                      删除
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Delete, MoreFilled, EditPen } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useChatStoreHook } from "@/store/modules/chat";
import { storeToRefs } from "pinia";
import { ReText } from "@/components/ReText";
import { ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import { message } from "@/utils/message";
import { talkEditApi, TalkItem } from "@/api/chat";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const router = useRouter();
const route = useRoute();
const chatStore = useChatStoreHook();
const loading = ref(false);

const { getTalkListByTime, talkList } = storeToRefs(chatStore);

const del = (id: number) => {
  ElMessageBox.confirm("确定删除对话？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    confirmButtonClass: "el-button--danger",
    type: "warning"
  }).then(async () => {
    await chatStore.delTalk(id);
    message("删除成功", { type: "success" });
    if (+route.params.id === id) router.replace("/chat/new");
  });
};

const edit = ({ id, title }: TalkItem) => {
  ElMessageBox.prompt("请输入新标题", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValue: title,
    inputValidator: value => {
      value = value.trim();
      if (!value || value === title) return "请输入新标题";
      // 去掉空格
      if (value.length > 20) return "标题不能超过20个字符";
      return true;
    },
    inputErrorMessage: "请输入新标题"
  }).then(async ({ value }) => {
    await talkEditApi({ id, title: value });
    message("修改成功", { type: "success" });
    await chatStore.getTalkList();
  });
};

onMounted(async () => {
  await chatStore.getTalkList();
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.chat-list {
  @apply px-[10px] overflow-y-auto flex-1;

  ul {
    margin-bottom: 24px;
  }

  p {
    padding: 0 10px 0 16px;
    margin: 6px 0 6px -6px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: #555;
    background-color: var(--dsr-side-bg);
  }

  li {
    @apply cursor-pointer h-[38px] rounded-xl px-[10px] flex items-center text-sm relative;

    span {
      @apply block w-full text-nowrap overflow-x-hidden;
    }

    &:hover {
      background-color: rgb(219 234 254);
    }

    &:hover .icon {
      opacity: 1;
    }

    .icon {
      @apply absolute right-0 -top-3 z-50 w-6 h-6 bg-white rounded-lg opacity-0;
    }
  }

  .active {
    background-color: #c6dcf8;
  }
}
</style>
