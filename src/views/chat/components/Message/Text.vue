<template>
  <div class="text-black max-w-full overflow-hidden">
    <div ref="textRef" class="leading-relaxed break-words">
      <!-- ai发送 -->
      <div v-if="!inversion">
        <!-- 思考内容 -->
        <template v-if="reasoningContentComputed">
          <div class="py-2 px-4 bg-[#f4f6f8] rounded-md w-fit mb-2 flex gap-3">
            <template
              v-if="
                generateAiChat.id === messageId &&
                generateAiChat.reasoningLoading
              "
            >
              <Loading />
              思考中...
            </template>
            <template v-else> 已深度思考 </template>

            <el-button
              :icon="showReason ? ArrowUp : ArrowDown"
              size="small"
              text
              plain
              @click="changeReasonShow"
            />
          </div>
          <ElCollapseTransition>
            <div
              v-show="showReason"
              class="markdown-body relative pl-2 border-l-2 text-sm mb-4 border-zinc-200 !text-[var(--el-text-color-secondary)]"
              :class="{
                'markdown-body-generate':
                  generateAiChat.id === messageId &&
                  generateAiChat.reasoningLoading
              }"
              v-html="reasoningContentComputed"
            />
          </ElCollapseTransition>
        </template>

        <!-- 正文内容 -->
        <div v-if="text" :class="wrapClass">
          <div
            v-if="!asRawText"
            class="markdown-body relative"
            :class="{
              'markdown-body-generate':
                generateAiChat.id === messageId && generateAiChat.contentLoading
            }"
            v-html="text"
          />
          <div v-else class="whitespace-pre-wrap" v-text="text" />
        </div>
      </div>

      <!-- 用户发送 -->
      <div
        v-else
        class="whitespace-pre-wrap"
        :class="wrapClass"
        v-text="text"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, onUpdated, ref } from "vue";
import MarkdownIt from "markdown-it";
import MdKatex from "@vscode/markdown-it-katex";
import MdMermaid from "mermaid-it-markdown";
import hljs from "highlight.js";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { copyToClip } from "@/utils/copy";
import { ElCollapseTransition } from "element-plus";
import { emitter } from "@/utils/mitt";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import { useChatStoreHook } from "@/store/modules/chat";
import { storeToRefs } from "pinia";
import Loading from "@/assets/svg/loading.svg?component";

interface Props {
  inversion?: boolean;
  text?: string;
  reasoningContent?: string | null;
  showReason?: boolean;
  asRawText?: boolean;
  messageId?: number;

  error?: boolean;
}

const props = defineProps<Props>();

const { generateAiChat } = storeToRefs(useChatStoreHook());

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

const mdi = new MarkdownIt({
  html: false,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  }
});

mdi.use(MdKatex).use(MdMermaid);

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px]",
    "rounded-md",
    isMobile.value ? "p-2" : "px-3 py-2",
    props.inversion
      ? "bg-[var(--el-color-primary-light-9)]"
      : "bg-[#f4f6f8] flex-1 ",
    props.inversion ? "dark:bg-[#a1dc95]" : "dark:bg-[#1e1e20]",
    props.inversion ? "message-request" : "message-reply",
    { "text-red-500": props.error }
  ];
});

const text = computed(() => {
  const value = props.text ?? "";
  if (!props.asRawText) {
    // 对数学公式进行处理，自动添加 $$ 符号
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return mdi.render(escapedText);
  }
  return value;
});

const reasoningContentComputed = computed(() => {
  const value = props.reasoningContent ?? "";
  if (!props.asRawText) {
    // 对数学公式进行处理，自动添加 $$ 符号
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return mdi.render(escapedText);
  }
  return value;
});

const changeReasonShow = () => {
  emitter.emit("changeReasonShow", {
    messageId: props.messageId,
    show: !props.showReason
  });
};

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${"复制"}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.parentElement?.nextElementSibling?.textContent;
        if (code) {
          copyToClip(code).then(() => {
            btn.textContent = "复制成功 ✅";
            setTimeout(() => {
              btn.textContent = "复制";
            }, 1000);
          });
        }
      });
    });
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach(btn => {
      btn.removeEventListener("click", () => {});
    });
  }
}

function escapeDollarNumber(text: string) {
  let escapedText = "";

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || " ";

    if (char === "$" && nextChar >= "0" && nextChar <= "9") char = "\\$";

    escapedText += char;
  }

  return escapedText;
}

function escapeBrackets(text: string) {
  const pattern =
    /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;
  return text.replace(
    pattern,
    (match, codeBlock, squareBracket, roundBracket) => {
      if (codeBlock) return codeBlock;
      else if (squareBracket) return `$$${squareBracket}$$`;
      else if (roundBracket) return `$${roundBracket}$`;
      return match;
    }
  );
}

onMounted(() => {
  addCopyEvents();
});

onUpdated(() => {
  addCopyEvents();
});

onUnmounted(() => {
  removeCopyEvents();
});
</script>

<style lang="scss">
@import url("./index.scss");
</style>
