import axios from "axios";
import config from "config";
import TokenService from "./auth/token.service";

const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401) {
                TokenService.removeUser();
                window.location.href = "/auth/sign-in";
            }
        }
        return Promise.reject(err);
    }
);
export default instance;
