import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/StoreBasicView.vue"),
    },
    {
      path: "/StoreBasicView",
      name: "StoreBasicView",
      component: () => import("../views/StoreBasicView.vue"),
    },
    {
      path: "/TaskView",
      name: "TaskView",
      component: () => import("../views/TaskView.vue"),
    },
  ],
});

export default router;
