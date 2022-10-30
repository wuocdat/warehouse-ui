import routes from "./routes";

const config = {
    routes,
    baseURL: `${process.env.REACT_APP_API_URL}`,
    apiKey: `${process.env.REACT_APP_MAP_API_KEY}`,
};

export default config;
