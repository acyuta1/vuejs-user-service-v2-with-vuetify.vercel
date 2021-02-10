import Vuex from "vuex";
import Vue from 'vue'

import authStore from "./auth/index";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    auth: authStore,
  },
});

export default store;
