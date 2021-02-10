import axios from "axios";
import {
  USER_SERVICE_URL,
} from "../Constants";
class AuthenticationService {

    login(username, password) {
        return axios
            .post(`${USER_SERVICE_URL}/auth/login`, {
            username,
            password,
            })
    }

    signup(userPayload){
        return axios
            .post(`${USER_SERVICE_URL}/auth/signup`, {
                firstName: userPayload.firstName,
                lastName: userPayload.lastName,
                username: userPayload.username,
                email: userPayload.email,
                dateOfBirth: userPayload.dateOfBirth,
                password: userPayload.password,
            })
    }

    resetPasswordRequest(userPayload){
        return axios
            .post(`${USER_SERVICE_URL}/auth/forgot-password`, {
            email: userPayload.email,
            username: userPayload.username,
            })
    }

    resetPassword(token, username, password){
        return axios
            .post(`${USER_SERVICE_URL}/auth/reset-password`, {
            token:token,
            username: username,
            newPassword: password
            })
    }

    confirmToken(authType, token){
        return axios
            .get(
            `${USER_SERVICE_URL}/auth/confirm-token/${authType}/${token}`
            )}
    }

  export default new AuthenticationService;