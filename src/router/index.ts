import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/layout/Layout.vue"
import FormLayout from "@/layout/FormLayout.vue"
import Dashboard from "@/pages/Dashboard.vue"
import Login from "@/pages/Login.vue"
import Signup from "@/pages/Signup.vue"
import Profile from "@/pages/Profile.vue"

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", name: "dashboard", component: Dashboard },
    ],
  },
  {
    path: "/",
    component: FormLayout,
    children: [
      { path: "/login", name: "login", component: Login },
      { path: "/signup", name: "signup", component: Signup },
      { path: "/profile", name: "profile", component: Profile },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
