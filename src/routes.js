import Router from "vue-router";
import vue from "vue"
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import WelcomeComponent from "./pages/Welcome";
import ConfirmToken from "./pages/auth/ConfirmToken"
import NotFound from "./components/NotFound";
import store from "./store/index"
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
  console.log(store.getters.isAuthenticated);
  console.log(to, from);
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login"); //to redirect to auth if not authenticated.
  } else if (
    (to.name === "login" || to.name === "signup") &&
    store.getters.isAuthenticated
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
