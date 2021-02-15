import authActions from "./actions";
import authMutations from "./mutations";
import authGetters from "./getters";

export default {
  state() {
    return {
      username: "",
      jwt: "",
      expiryTime: 0,
      roles: "",
    };
  },

  mutations: authMutations,

  actions: authActions,

  getters: authGetters,
};
