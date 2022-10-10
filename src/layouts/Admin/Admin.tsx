import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
} from "@chakra-ui/react";
import Sidebar from "components/Sidebar";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import TokenService from "services/auth/token.service";
import { breadcrumbText } from "utils/constants";

const Admin = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter(Boolean);

    if (!TokenService.getUser()) {
        return <Navigate to="/auth" />;
    }

    return (
        <Flex direction="row">
            <Sidebar />
            <Flex
                flex="1"
                bg="#ccc"
                h="100vh"
                direction="column"
                overflow="auto"
            >
                <Box
                    h="10"
                    zIndex="999"
                    bg="white"
                    m="4"
                    position="fixed"
                    top="0"
                    right="0"
                    borderRadius={8}
                    w="calc(80% - 32px)"
                >
                    <Breadcrumb
                        p={2}
                        separator={<ChevronRightIcon color="gray.500" />}
                    >
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;

                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink as={Link} to={routeTo}>
                                        {breadcrumbText.get(name) || name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>
                </Box>
                <Box mt="16" ml="4" mr="4" flex="1">
                    <Outlet />
                </Box>
                <Box minH={20} bg="gray.500">
                    Footer
                </Box>
            </Flex>
        </Flex>
    );
};

export default Admin;
