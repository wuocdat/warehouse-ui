import api from "services/api";
import TokenService from "./token.service";

const login = async (username: string, password: string) => {
    const response = await api.post("/auth/login", {
        username,
        password,
    });
    if (response.data.access_token) {
        TokenService.setUser(response.data);
    }
    return response.data;
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    const userItem = localStorage.getItem("user");
    return userItem && JSON.parse(userItem);
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};
export default AuthService;
