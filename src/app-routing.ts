import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import UserLogin from "./AppLogin.vue";
import BudgetCategory from "./components/BudgetCategory.vue";
import MyExpense from "./components/MyExpense.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: UserLogin,
  },
  {
    name: "Category",
    path: "/category",
    component: BudgetCategory,
  },
  {
    name: "Expenses",
    path: "/expenses",
    component: MyExpense,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});  