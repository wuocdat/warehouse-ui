import { Box, BoxProps, Divider, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface TitleBoxProps extends BoxProps {
    title: string;
    children?: JSX.Element | string;
}

const TitleBox: FC<TitleBoxProps> = ({ title, children, ...props }) => {
    return (
        <Box bg="white" h="100%" borderRadius="8" {...props}>
            <Text as="b" p="2">
                {title}
            </Text>
            <Divider mt={2} />
            <Box p="2">{children}</Box>
        </Box>
    );
};

export default TitleBox;
