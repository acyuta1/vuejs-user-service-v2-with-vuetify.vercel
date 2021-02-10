export default {
  getUsername(state) {
    return state.username;
  },

  isAuthenticated(state) {
    return !!state.jwt;
  },
};
