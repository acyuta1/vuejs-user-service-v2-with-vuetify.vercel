import axios from "axios";

const instance = axios.create({
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

function createAxiosResponseInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    if (localStorage.getItem("jwt")) {
      config.headers.Authorization =  "Bearer " + localStorage.getItem(
        "jwt"
      );
    }
    return config;
  });
}

createAxiosResponseInterceptor(instance);

export default instance;