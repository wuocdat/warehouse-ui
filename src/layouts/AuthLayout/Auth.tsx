import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <Box w="100%" h="100vh">
            <Outlet />
        </Box>
    );
};

export default AuthLayout;
