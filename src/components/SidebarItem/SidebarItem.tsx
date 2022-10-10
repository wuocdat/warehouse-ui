import { HStack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface SidebarItemProps {
    icon?: JSX.Element;
    text: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, text }) => {
    return (
        <div>
            <HStack spacing="4">
                {icon}
                <Text>{text}</Text>
            </HStack>
        </div>
    );
};

export default SidebarItem;
