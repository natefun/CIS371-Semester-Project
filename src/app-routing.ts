import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import UserLogin from "./AppLogin.vue";
import PickMovie from "./components/PickMovie.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: UserLogin,
  },
  {
    name: "PickMovie",
    path: "/PickMovie",
    component: PickMovie,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});  