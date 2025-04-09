import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/",
    component: () => import("@/views/login/layout/index.vue"),
    redirect: "login",
    meta: {
      title: $t("menus.senseLogin"),
      rank: 101
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/login.vue"),
        meta: {
          title: $t("menus.senseLogin"),
          showLink: false
        }
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/login/register.vue"),
        meta: {
          title: $t("menus.senseRegister"),
          showLink: false
        }
      }
    ]
  },
  {
    path: "/redirect",
    meta: {
      title: $t("status.pureLoad"),
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
