import Vue from "vue";
import Vuex from "vuex";
import search from "./modules/search";
import favorites from "./modules/favorites";
import ui from "./modules/ui";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    favorites,
    ui,
  },
  strict: process.env.NODE_ENV !== "production",
});
