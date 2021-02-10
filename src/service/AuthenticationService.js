import axios from "axios";
import {
  USER_SERVICE_URL,
} from "../Constants";
class AuthenticationService {

    async login(username, password) {
        return await axios.post(`${USER_SERVICE_URL}/auth/login`, {
          username,
          password,
        })
    }

    async signup(userPayload){
        return await axios
        .post(`${USER_SERVICE_URL}/auth/signup`, {
            firstName: userPayload.firstName,
            lastName: userPayload.lastName,
            username: userPayload.username,
            email: userPayload.email,
            dateOfBirth: userPayload.dateOfBirth,
            password: userPayload.password,
        })
  }

  async resetPasswordRequest(userPayload){
      return await axios
    .post(`${USER_SERVICE_URL}/auth/forgot-password`, {
      email: userPayload.email,
      username: userPayload.username,
    })
  }

  async resetPassword(token, username, password){
    return await axios
    .post(`${USER_SERVICE_URL}/auth/reset-password`, {
      token:token,
      username: username,
      newPassword: password
    })
}

    async confirmToken(authType, token){
        return await axios
        .get(
          `${USER_SERVICE_URL}/auth/confirm-token/${authType}/${token}`
        )
    }
  }

  export default new AuthenticationService;