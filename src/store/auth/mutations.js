export default {
  setAuthUser(state, payload) {
    state.username = payload.username;
    state.jwt = payload.jwt;
    state.expiryTime = payload.expiryTime;
    state.roles = payload.roles;
  },
};
