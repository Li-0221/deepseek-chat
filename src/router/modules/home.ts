import Layout from "@/layout/index.vue";

export default {
  path: "/",
  name: "Home",
  redirect: "/chat/new",
  component: Layout,
  meta: {
    icon: "ep:home-filled",
    title: "Panda Chat",
    rank: 0
  },
  children: [
    {
      path: "/chat/new",
      name: "ChatNew",
      component: () => import("@/views/chat-new/index.vue")
    },
    {
      path: "/chat/:id",
      name: "Chat",
      component: () => import("@/views/chat/index.vue")
    }
  ]
} satisfies RouteConfigsTable;
