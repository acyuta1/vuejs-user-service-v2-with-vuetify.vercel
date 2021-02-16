import Router from "vue-router";
import vue from "vue"
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import WelcomeComponent from "./pages/Welcome";
import ConfirmToken from "./pages/auth/ConfirmToken"
import NotFound from "./components/NotFound";
import store from "./store/index"
import UserProfile from "./pages/profile/UserProfile"
import AdminUserManagement from "./pages/profile/AdminUserManagement"
import UserDetail from "./pages/profile/UserDetail"
vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/",
      component: WelcomeComponent,
      meta: { requiresAuth: true },
      name: "home",
    },
    {
      path: "/login",
      component: Login,
      name: "login",
    },
    {
      path: "/signup",
      component: Signup,
      name: "signup",
    },
    {
      path:"/profile",
      name:"profile",
      component: UserProfile,
      meta: {requiresAuth: true},
    },
    {
      path:"/user-management",
      name:"userManagement",
      component: AdminUserManagement,
      meta: {requiresAuth: true, isAdmin: true},
    },
    {
      path:"/user-management/:username",
      name:"userdetail",
      component: UserDetail,
      meta: {requiresAuth: true, isAdmin: true},
      props: true
    },
    {
      path: "/confirm-token/:authType/:token",
      component: ConfirmToken,
      name: "confirmToken",
      props: true,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound
    }
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login"); //to redirect to auth if not authenticated.
  } else if (
    (to.name === "login" || to.name === "signup") &&
    store.getters.isAuthenticated
  ) {
    next({ name: "home" });
  } else if(to.meta.requiresAuth && (to.meta.isAdmin && !store.getters.isAdmin)){
    next({name: "home"})
  }
  else {
    next();
  }
});

export default router;
