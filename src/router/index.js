import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import EditEmployee from "../views/EditEmployee.vue";
import NewEmployee from "../views/NewEmployee.vue";
import ViewEmployee from "../views/ViewEmployee.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { auth } from "../components/firebaseInit.js";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/edit/:employee_id",
    name: "edit-employee",
    component: EditEmployee,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/new-employee",
    name: "new-employee",
    component: NewEmployee,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/view/:employee_id",
    name: "view-employee",
    component: ViewEmployee,
    meta: {
      requiresAuth: true,
    },
  },
];

let router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//**Nav Guards */
router.beforeEach((to, from, next) => {
  
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next()
});

export default router;
