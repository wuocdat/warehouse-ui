const getLocalAccessToken = () => {
    const userItem = localStorage.getItem("user");
    const user = (userItem && JSON.parse(userItem)) || {};
    return user.access_token;
};

const getUser = () => {
    const userItem = localStorage.getItem("user");
    return userItem && JSON.parse(userItem);
};

const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};
export default TokenService;
