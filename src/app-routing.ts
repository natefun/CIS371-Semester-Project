import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import UserLogin from "./AppLogin.vue";
import PickMovie from "./components/PickMovie.vue";
import PopularMovies from "./components/PopularMovies.vue";
import RecentMovies from "./components/RecentMovies.vue";
import MovieInfo from "./components/MovieInfo.vue";
import SelectedMovies from "./components/SelectedMovies.vue";
import RandomMovies from "./components/RandomMovies.vue";
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
  {
    name: "PopularMovies",
    path: "/PickMovie/PopularMovies",
    component: PopularMovies,
  },
  {
    name: "RecentMovies",
    path: "/PickMovie/RecentMovies",
    component: RecentMovies,
  },
  { name: "MovieInfo", path: "/PickMovie/MovieInfo", component: MovieInfo },
  {
    name: "SelectedMovies",
    path: "/PickMovie/SelectedMovies",
    component: SelectedMovies,
  },
  
  {
    name: "RandomMovies",
    path: "/PickMovie/RandomMovies",
    component: RandomMovies,
  },
];

export const AppRouter = new VueRouter({
  routes: myRoutes,
  mode: "history",
});
