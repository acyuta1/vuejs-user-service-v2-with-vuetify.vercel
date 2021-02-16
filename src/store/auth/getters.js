export default {
  getUsername(state) {
    return state.username;
  },

  isAuthenticated(state) {
    return !!state.jwt;
  },

  isAdmin(state) {
    return state.roles.includes("ROLE_ADMIN") ? true : false;
    
  },
};
