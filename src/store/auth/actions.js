import {
  SESSION_ATTRIBUTE_USER_NAME,
  SESSION_ATTRIBUTE_JWT,
  SESSION_ATTRIBUTE_EXPIRY_TIME,
  SESSION_ATTRIBUTE_ROLES,
} from "../../Constants";
import AuthenticationService from "../../service/AuthenticationService";
let timer;
export default {
  async login(context, payload) {
    const response = await AuthenticationService.login(payload.username, payload.password)
      .catch((err) => {
        console.log(err);
        throw err;
      });
    if (response.data) {
      const expirationTime = new Date().getTime() + +response.data.expiryTime;

      localStorage.setItem(SESSION_ATTRIBUTE_USER_NAME, response.data.username);
      localStorage.setItem(SESSION_ATTRIBUTE_JWT, response.data.username);
      localStorage.setItem(SESSION_ATTRIBUTE_ROLES, response.data.roles);
      localStorage.setItem(SESSION_ATTRIBUTE_EXPIRY_TIME, expirationTime);

      timer = setTimeout(() => {
        context.dispatch("logout");
      }, +response.data.expiryTime);

      context.commit("setAuthUser", {
        username: response.data.username,
        jwt: response.data.jwt,
        expiryTime: expirationTime,
        roles: response.data.roles,
      });
    }
  },

  autoLogin(context) {
    const jwt = localStorage.getItem(SESSION_ATTRIBUTE_JWT);
    const username = localStorage.getItem(SESSION_ATTRIBUTE_USER_NAME);
    const roles = localStorage.getItem(SESSION_ATTRIBUTE_ROLES);
    const expiryTime = localStorage.getItem(SESSION_ATTRIBUTE_EXPIRY_TIME);

    const expiresIn = +expiryTime - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("logout");
    }, expiresIn);

    if (jwt && username && roles && expiryTime) {
      context.commit("setAuthUser", {
        jwt,
        username,
        roles,
        expiryTime,
      });
    }
  },

  logout(context) {
    localStorage.removeItem(SESSION_ATTRIBUTE_JWT);
    localStorage.removeItem(SESSION_ATTRIBUTE_USER_NAME);
    localStorage.removeItem(SESSION_ATTRIBUTE_ROLES);
    localStorage.removeItem(SESSION_ATTRIBUTE_EXPIRY_TIME);

    clearTimeout(timer);

    context.commit("setAuthUser", {
      username: "",
      jwt: "",
      expiryTime: "",
      roles: "",
    });
  },

  async signup(context, payload) {
    await AuthenticationService.signup(payload)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  async resetPasswordRequest(context, payload) {
    await AuthenticationService.resetPasswordRequest(payload)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
