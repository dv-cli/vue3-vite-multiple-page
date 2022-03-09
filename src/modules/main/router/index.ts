import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("main/view/login/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("main/view/home/Home.vue"),
    children: [
      {
        path: "/virtual-table",
        name: "VirtualTable",
        component: () => import("main/view/home/VirtualTable.vue"),
      },
      {
        path: "/test",
        name: "Test",
        component: () => import("main/view/home/Test.vue"),
      },
      {
        path: "/vue-use",
        name: "VueUse",
        component: () => import("@/components/VueUse.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
