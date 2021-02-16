import axios from "../service/AuthenticatedAxios";
import {
    USER_SERVICE_URL,
  } from "../Constants";
class UserService {

    getAUser(username) {
        return axios
            .get(`${USER_SERVICE_URL}/users/${username}`, {
            })
    }

    getAllUsers() {
      return axios
          .get(`${USER_SERVICE_URL}/users`, {
            })
    }

    toggleAdminRole(username){
      return axios.put(`${USER_SERVICE_URL}/users/admin-toggle/${username}`, {
      })
    }

    toggleLockAccount(username){
      return axios.put(`${USER_SERVICE_URL}/users/lock-toggle/${username}`, {
      })
    }

    changePassword(username, oldPassword, newPassword){
      return axios.put(`${USER_SERVICE_URL}/users/change-password/${username}`, {
        oldPassword,
        newPassword
      })
    }
}

  export default new UserService;