import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Divider,
    Flex,
    IconButton,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import IconItem from "components/SidebarItem";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { subRoutes } from "routes";
import { COMMON_TEXT } from "utils/constants";

const Sidebar = () => {
    const location = useLocation();
    let activeIcon = useColorModeValue("gray.500", "white");
    let textColor = useColorModeValue("secondaryGray.500", "white");

    const activeRoute = (path: string) => {
        return location.pathname.includes(path);
    };

    const getSubOptions = (route: any[]) => {
        return (
            <VStack align="start" spacing="2" pl={5}>
                {route.map(
                    (sub, index) =>
                        !sub.hide && (
                            <NavLink key={index} to={sub.layout + sub.path}>
                                <Box
                                    color={
                                        activeRoute(sub.path)
                                            ? activeIcon
                                            : textColor
                                    }
                                >
                                    <IconItem icon={sub.icon} text={sub.name} />
                                </Box>
                            </NavLink>
                        )
                )}
            </VStack>
        );
    };

    const getItem = (route: any) => {
        if (route.path) {
            return (
                <NavLink to={route.layout + route.path}>
                    <IconItem icon={route.icon} text={route.name} />
                </NavLink>
            );
        }

        return <IconItem icon={route.icon} text={route.name} />;
    };

    return (
        <Box w="20%" h="100vh" p="2">
            <Flex direction="column">
                <Flex direction="row" justifyContent="space-between" mb="2">
                    <Text fontSize="2xl">{COMMON_TEXT.WAREHOUSE_MANAGER}</Text>
                    <IconButton
                        aria-label={COMMON_TEXT.COLLAPSE}
                        icon={<TbLayoutSidebarLeftCollapse />}
                    />
                </Flex>
                <Divider />
                <Accordion allowToggle flex="1">
                    {subRoutes.map((route, index) => (
                        <AccordionItem key={index}>
                            {route.children ? (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1">{getItem(route)}</Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {getSubOptions(route.children)}
                                    </AccordionPanel>
                                </>
                            ) : (
                                <h2>
                                    <AccordionButton>
                                        {getItem(route)}
                                    </AccordionButton>
                                </h2>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </Flex>
        </Box>
    );
};

export default Sidebar;
