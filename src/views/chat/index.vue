<template>
  <div><div v-html="sanitizedHtml"></div></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { parse } from "marked";
import DOMPurify from "dompurify";
// Using ES6 import syntax
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

// Then register the languages you need
hljs.registerLanguage("javascript", javascript);

const str = `
# 目录结构

## Geeker-Admin 目录说明 📚

\`\`\`javascript
Geeker-Admin
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ build                  # Vite 配置项
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ languages           # 语言国际化 i18n
│  ├─ layouts             # 框架布局模块
│  ├─ routers             # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
│  └─ vite-env.d.ts       # 指定 ts 识别 vue
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.cjs        # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.cjs       # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.cjs  # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config.cjs # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.cjs     # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
\`\`\`
`;
// 纯净的html
const sanitizedHtml = ref("");

let timer;

onMounted(() => {
  let index = 0;
  timer = setInterval(() => {
    if (index < str.length) {
      const markdownContent = str.substring(0, index);
      index++;
      const html = parse(markdownContent);
      // 对 HTML 进行净化，防止 XSS 攻击
      const cleanHtml = DOMPurify.sanitize(html);
      debugger;
      // const hlHtml = hljs.highlight(cleanHtml);
      sanitizedHtml.value = cleanHtml;
    } else {
      clearInterval(timer);
    }
  }, 100);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
