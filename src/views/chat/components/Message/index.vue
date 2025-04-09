<template>
  <div
    ref="messageRef"
    class="flex w-full mb-6 overflow-hidden"
    :class="[{ 'flex-row-reverse': inversion }]"
  >
    <Logo
      v-if="!inversion"
      class="w-10 h-10 rounded-full mr-2 md:mr-5 text-primary"
    />
    <div
      class="overflow-hidden text-sm flex-1"
      :class="[inversion ? 'items-end' : 'items-start']"
    >
      <p
        class="text-xs text-[#b4bbc4]"
        :class="[inversion ? 'text-right' : 'text-left']"
      >
        {{ dayjs(dateTime).format("MM-DD HH:mm:ss") }}
      </p>
      <div
        class="flex items-end gap-1 mt-2 w-full"
        :class="[inversion ? 'flex-row-reverse' : 'flex-row']"
      >
        <TextComponent
          ref="textRef"
          v-bind="attrs"
          :inversion
          :text
          :asRawText
        />

        <div
          class="flex flex-col opacity-30 p-1"
          :class="{ '!opacity-10': isMobile }"
        >
          <el-dropdown
            style="

              --el-dropdown-menuItem-hover-color: none;
              --el-dropdown-menuItem-hover-fill: none;
            "
            :trigger="isMobile ? 'click' : 'hover'"
            :placement="!inversion ? 'right' : 'left'"
          >
            <el-button
              link
              class="transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              <IconifyIconOnline icon="ri:more-2-fill" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in options" :key="item.key">
                  <el-button
                    :icon="item.icon"
                    size="small"
                    link
                    @click="handleSelect(item.key as OptionType)"
                  >
                    {{ item.label }}
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import TextComponent from "./Text.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { copyToClip } from "@/utils/copy";
import { useI18n } from "vue-i18n";
import { message } from "@/utils/message";
import Logo from "@/assets/svg/logo2.svg?component";
import dayjs from "dayjs";

interface Props {
  dateTime?: string;
  text?: string;
  inversion?: boolean;

  error?: boolean;
  loading?: boolean;
}

interface Emit {
  (ev: "regenerate"): void;
  (ev: "delete"): void;
}

const props = defineProps<Props>();
const attrs = useAttrs();
const emit = defineEmits<Emit>();

const { t } = useI18n();

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

const asRawText = ref(props.inversion);

const messageRef = ref<HTMLElement>();

const options = computed(() => {
  const common = [
    {
      label: t("chat.senseCopy"),
      key: "copyText",
      icon: useRenderIcon("ri:file-copy-2-line")
    }
    // {
    //   label: t("chat.senseDelete"),
    //   key: "delete",
    //   icon: useRenderIcon("ri:delete-bin-line")
    // }
  ];

  if (!props.inversion) {
    common.unshift({
      label: asRawText.value
        ? t("chat.sensePreview")
        : t("chat.senseShowRawText"),
      key: "toggleRenderType",
      icon: useRenderIcon(
        asRawText.value ? "ic:outline-code-off" : "ic:outline-code"
      )
    });
  }

  return common;
});

type OptionType = "copyText" | "delete" | "toggleRenderType";

function handleSelect(key: OptionType) {
  switch (key) {
    case "copyText":
      handleCopy();
      return;
    case "toggleRenderType":
      asRawText.value = !asRawText.value;
      return;
    case "delete":
      emit("delete");
  }
}

async function handleCopy() {
  try {
    await copyToClip(props.text || "");
    message(t("chat.senseCopied"), { type: "success" });
  } catch {
    message(t("chat.senseCopyFailed"), { type: "error" });
  }
}
</script>
