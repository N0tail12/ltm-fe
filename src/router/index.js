import { createRouter, createWebHistory } from "vue-router";
import LoginSite from "../views/LoginSite.vue";
import MainSite from "../views/MainSite.vue";
import Game from "../components/Game.vue";
import Rank from "../components/Ranking.vue";
import Menu from "../components/Menu.vue";
const routes = [
  {
    path: "/login",
    name: "Login-Site",
    component: LoginSite,
    props: { signup: false },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: LoginSite,
    props: { signup: true },
  },
  {
    path: "/home",
    name: "MainSite",
    component: MainSite,
    children: [
      { path: "game", name: "Game", component: Game },
      { path: "rank", name: "Rank", component: Rank },
      { path: "menu", name: "Menu", component: Menu },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
