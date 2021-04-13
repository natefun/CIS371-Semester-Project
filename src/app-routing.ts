import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import UserLogin from "./AppLogin.vue";
import PickMovie from "./components/PickMovie.vue";
import PopularMovies from "./components/PopularMovies.vue"
import RecentMovies from "./components/RecentMovies.vue"
import MovieInfo from "./components/MovieInfo.vue"
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
  { name: "PopularMovies",
    path: "/PickMovie/PopularMovies",
    component: PopularMovies,
  },
  { name: "RecentMovies",
    path: "/PickMovie/RecentMovies",
    component: RecentMovies,
  },
  { name: "MovieInfo",
    path: "/PickMovie/MovieInfo",
    component: MovieInfo,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});  