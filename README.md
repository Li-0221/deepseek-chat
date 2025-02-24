## 技术栈

- vue3
- typescript
- tailwindcss

## 工程化

### 代码规范相关

- eslint
- prettier
- stylelint

### git提交相关

- husky
- commitlint

定义提交规范 commitlint.config.js

自定义命令 `pnpm commit` 提交代码

## 适配

使用tailwind推荐的断点，移动端优先的设计模式完成响应式布局
手机-768px-平板-1280px-电脑

## Svg

项目图片大部分采用svg格式，在缩放时不会失真
使用svg-sprite-loader处理svg

## SSE及MD渲染

使用定时器模拟SSE，使用marked渲染markdown

- md解析器 `markdown-it`
- 数学支持 `markdown-it-katex`
- md链接处理 `markdown-it-link-attributes`
- github采用的md解析样式 `github-markdown.css`
- 代码高亮 `highlight`
