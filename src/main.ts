import { createApp } from "vue";
import "@/style/index.css";
import "@/style/highlight.scss";
import "@/style/github-markdown.scss";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).mount("#app");
