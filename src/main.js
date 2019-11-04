import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";
import GameMenu from "./components/GameMenu";
import GameBoard from "./components/GameBoard";
import SettingsPage from "./components/SettingsPage";
import GameComplete from "./components/GameComplete";

import "./assets/css/tailwind.css";

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: "/", component: GameMenu },
  { path: "/game", component: GameBoard },
  { path: "/settings", component: SettingsPage },
  { path: "/game-over", component: GameComplete }
];

const router = new VueRouter({ routes });
import gameStore from "./stores/games";
const store = new Vuex.Store(gameStore);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
