import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { get_title } from "@/utils/title";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/game/:id",
    name: "GameDetail",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "游戏详情" },
  },
  {
    path: "/luckywin",
    name: "Luckywin",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "Luckywin", gameType: "luckywin" },
  },
  {
    path: "/mien-bac",
    name: "MienBac",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "Miền Bắc", gameType: "mienbac" },
  },
  {
    path: "/mien-nam",
    name: "MienNam",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "Miền Nam", gameType: "miennam" },
  },
  {
    path: "/keno",
    name: "Keno",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "Keno", gameType: "keno" },
  },
  {
    path: "/sicbo",
    name: "Sicbo",
    component: () => import("@/views/GameDetail.vue"),
    meta: { title: "Sicbo", gameType: "sicbo" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      top: 0,
      left: 0,
    };
  },
});
router.beforeEach((to, _from, next) => {
  if (to.params.id) {
    document.title = "LUCK8 BOT -" + get_title(to.params.id + "");
  } else {
    document.title = "LUCK8 BOT - Trang chủ";
  }
  next(() => {});
});

export default router;
