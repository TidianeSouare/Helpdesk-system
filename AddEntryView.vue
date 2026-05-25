import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import EntriesView from "../views/EntriesView.vue";
import AddEntryView from "../views/AddEntryView.vue";
import EditEntryView from "../views/EditEntryView.vue";
import QuizView from "../views/QuizView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },

  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },
  { path: "/dashboard", name: "dashboard", component: DashboardView, meta: { requiresAuth: true } },
  { path: "/entries", name: "entries", component: EntriesView, meta: { requiresAuth: true } },
  { path: "/add", name: "add-entry", component: AddEntryView, meta: { requiresAuth: true } },
  { path: "/edit/:id", name: "edit-entry", component: EditEntryView, props: true, meta: { requiresAuth: true } },
  { path: "/quiz", name: "quiz", component: QuizView, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && token) {
    next("/");
  } else {
    next();
  }
});

export default router;