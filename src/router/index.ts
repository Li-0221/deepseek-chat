import { createRouter, createWebHistory } from "vue-router";

import Layout from "../layout/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/new",
    children: [
      {
        path: "new",
        component: () => import("../views/new/index.vue")
      },
      {
        path: "chat",
        component: () => import("../views/chat/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
