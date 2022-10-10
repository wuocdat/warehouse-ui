import { Navigate } from "react-router-dom";
import TokenService from "services/auth/token.service";

const Home = () => {
    if (!TokenService.getUser()) {
        return <Navigate to="/login" />;
    }
    return <div>Home</div>;
};

export default Home;
