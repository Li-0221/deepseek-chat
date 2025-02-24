<template>
  <div class="max-md:px-4 max-md:pt-16 pt-4 pb-10 w-full flex flex-col-reverse overflow-y-auto">
    <!--TODO 抽成组件 -->
    <div class="flex">
      <img
        class="w-10 h-10 rounded-full mr-5"
        src="https://thirdwx.qlogo.cn/mmopen/vi_32/y8cR4NwgMcTa5icC5nuc78kRbTibktKibvMXjcVpYtLfjICqyugZ7KM8lfL6DqolKwuaZexIhjH70pnicI9Ava28Iutrcic6rvnMGlCU6aiambO7k/132"
        alt=""
      />
      <div class="text-black p-4 flex-1" :class="wrapClass">
        <div ref="textRef" class="leading-relaxed break-words">
          <div v-if="!inversion">
            <div v-if="!asRawText" class="markdown-body" v-html="text" />
            <div v-else class="whitespace-pre-wrap" v-text="text" />
          </div>
          <div v-else class="whitespace-pre-wrap" v-text="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import MarkdownIt from "markdown-it";
import MdKatex from "@vscode/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
import hljs from "highlight.js";
// TODO
import { str } from "./md/hello-word";
// import { str } from "./md/vue";

const inversion = ref(false);
const asRawText = ref(false);
const mdString = ref("");

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang);
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  }
});

mdi.use(MdLinkAttributes, { attrs: { target: "_blank", rel: "noopener" } }).use(MdKatex);

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px]",
    "rounded-md",
    inversion.value ? "bg-[#d2f9d1]" : "bg-[#f4f6f8]",
    inversion.value ? "dark:bg-[#a1dc95]" : "dark:bg-[#1e1e20]",
    inversion.value ? "message-request" : "message-reply"
  ];
});

const text = computed(() => {
  const value = mdString.value ?? "";
  if (!asRawText.value) {
    // 对数学公式进行处理，自动添加 $$ 符号
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return mdi.render(escapedText);
  }
  return value;
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
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
  const pattern = /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;
  return text.replace(pattern, (match, codeBlock, squareBracket, roundBracket) => {
    if (codeBlock) return codeBlock;
    else if (squareBracket) return `$$${squareBracket}$$`;
    else if (roundBracket) return `$${roundBracket}$`;
    return match;
  });
}

let timer: number;
onMounted(() => {
  let index = 0;
  timer = setInterval(() => {
    if (index < str.length) {
      mdString.value = str.substring(0, index);
      index++;
    } else {
      clearInterval(timer);
    }
  }, 10);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss">
@import url("./index.scss");
</style>
