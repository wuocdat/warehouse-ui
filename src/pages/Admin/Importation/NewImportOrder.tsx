import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import TitleBox from "components/TitleBox";
import {
    COMMON_TEXT,
    IMPORT_ORDER,
    PRODUCT_LIST,
    SUPPLIER,
} from "utils/constants";

const NewImportOrder = () => {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });

    return (
        <VStack direction="column" spacing={4}>
            <Steps activeStep={activeStep} size="sm" width="700px">
                <Step label={IMPORT_ORDER.ORDER} />
                <Step label={IMPORT_ORDER.BROWSING} />
                <Step label={IMPORT_ORDER.IMPORT} />
                <Step label={IMPORT_ORDER.DONE} />
            </Steps>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
                <GridItem colSpan={2}>
                    <VStack spacing={4}>
                        <TitleBox title={SUPPLIER.ADD} p={2} w="100%">
                            <Select
                                colorScheme="purple"
                                options={[
                                    {
                                        label: "I am red",
                                        value: "i-am-red",
                                        colorScheme: "red", // The option color scheme overrides the global
                                    },
                                    {
                                        label: "I fallback to purple",
                                        value: "i-am-purple",
                                    },
                                ]}
                            />
                        </TitleBox>
                        <TitleBox
                            title={PRODUCT_LIST.PRODUCT_INFO}
                            p={2}
                            w="100%"
                        >
                            <Select
                                colorScheme="purple"
                                options={[
                                    {
                                        label: "I am red",
                                        value: "i-am-red",
                                        colorScheme: "red", // The option color scheme overrides the global
                                    },
                                    {
                                        label: "I fallback to purple",
                                        value: "i-am-purple",
                                    },
                                ]}
                            />
                        </TitleBox>
                        <HStack
                            spacing={2}
                            bg="white"
                            w="100%"
                            p={4}
                            borderRadius={8}
                        >
                            <FormControl isRequired>
                                <FormLabel>{COMMON_TEXT.QUANTITY} ()</FormLabel>
                                <Input type="number" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{COMMON_TEXT.PRICE}</FormLabel>
                                <Input type="number" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{COMMON_TEXT.COST}</FormLabel>
                                <Input type="number" />
                            </FormControl>
                            <Divider orientation="vertical" h="80px" />
                            <VStack spacing={2} pl={4}>
                                <Text as="b" width="100px">
                                    {COMMON_TEXT.TOTAL}
                                </Text>
                                <Divider />
                                <Text as="i">1000$</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </GridItem>
                <GridItem colSpan={1} bg="blue.500" />
            </Grid>
        </VStack>
    );
};

export default NewImportOrder;
