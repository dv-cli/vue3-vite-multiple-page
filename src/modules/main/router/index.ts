import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { constantRouter } from "./modules/constant";
import { useGlobalStore } from "@main/store";
import NProgress from "@/components/nprogress";

const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createWebHistory(),
  routes: [...constantRouter],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // 请求菜单列表并添加路由
  const globalStore = useGlobalStore();
  if (!globalStore.menuListGet.length) {
    await globalStore.getMenuList();
    return next({ ...to, replace: true });
  }

  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
});
export default router;
