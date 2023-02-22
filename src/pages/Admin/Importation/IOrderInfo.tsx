import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import TitleBox from "components/TitleBox";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImportOrderService from "services/importOrder/importOrder.services";
import { ImportOrderDto } from "types/dto.interfaces";
import { formatDate, formatNumber } from "utils";
import {
    COMMON_TEXT,
    IMPORT_ORDER,
    SUPPLIER,
    PRODUCT_LIST,
} from "utils/constants";

const IOrderInfo = () => {
    const { id } = useParams();

    const [iOrder, setIOrder] = useState<ImportOrderDto>();

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });

    const fetchIOrder = async () => {
        try {
            const { data } = await ImportOrderService.getIOrderById(id || "");

            if (data) {
                setIOrder(data);
                setStep(+data.status + 1);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchIOrder();
    }, []);

    return (
        <>
            {!!iOrder && (
                <VStack spacing={4}>
                    <SimpleGrid columns={2} spacing={4} width="100%">
                        <HStack>
                            <Heading as="h3" size="lg">
                                {iOrder.code || ""}
                            </Heading>
                            <Text>{formatDate(iOrder.createdAt)}</Text>
                            <Text>
                                {moment(iOrder.deliveryDate).format("hh:mm")}
                            </Text>
                        </HStack>
                        <Box>
                            <Steps activeStep={activeStep} size="sm">
                                <Step label={IMPORT_ORDER.ORDER} />
                                <Step label={IMPORT_ORDER.BROWSING} />
                                <Step label={IMPORT_ORDER.IMPORT} />
                                <Step label={IMPORT_ORDER.DONE} />
                            </Steps>
                        </Box>
                    </SimpleGrid>
                    <Grid templateColumns="repeat(6, 1fr)" gap={4} width="100%">
                        <GridItem colSpan={4}>
                            <VStack>
                                <TitleBox
                                    width="100%"
                                    padding={4}
                                    title={SUPPLIER.INFO}
                                >
                                    <SimpleGrid
                                        columns={2}
                                        spacing={4}
                                        width="100%"
                                    >
                                        <Flex>
                                            <Text flex={1}>
                                                {SUPPLIER.NAME}
                                            </Text>
                                            <Text flex={1}>
                                                : {iOrder.supplier.name}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text flex={1}>
                                                {SUPPLIER.CODE}
                                            </Text>
                                            <Text flex={1}>
                                                :{" "}
                                                {iOrder.supplier.code || "___"}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text flex={1}>
                                                {COMMON_TEXT.PHONE_NUMBER}
                                            </Text>
                                            <Text flex={1}>
                                                :{" "}
                                                {iOrder.supplier.phoneNumber ||
                                                    "__"}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text flex={1}>
                                                {COMMON_TEXT.EMAIL}
                                            </Text>
                                            <Text flex={1}>
                                                :{" "}
                                                {iOrder.supplier.email || "__"}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text flex={1}>
                                                {SUPPLIER.ADDRESS}
                                            </Text>
                                            <Text flex={1}>
                                                :{" "}
                                                {iOrder.supplier.address ||
                                                    "__"}
                                            </Text>
                                        </Flex>
                                    </SimpleGrid>
                                </TitleBox>
                                <TitleBox
                                    title={PRODUCT_LIST.PRODUCT_INFO}
                                    w="100%"
                                    p={4}
                                >
                                    <TableContainer>
                                        <Table variant="simple" size="sm">
                                            <TableCaption>
                                                Imperial to metric conversion
                                                factors
                                            </TableCaption>
                                            <Thead>
                                                <Tr>
                                                    <Th>
                                                        {
                                                            PRODUCT_LIST.PRODUCT_NAME
                                                        }
                                                    </Th>
                                                    <Th>
                                                        {COMMON_TEXT.QUANTITY}
                                                    </Th>
                                                    <Th isNumeric>
                                                        {COMMON_TEXT.PRICE}
                                                    </Th>
                                                    <Th isNumeric>
                                                        {COMMON_TEXT.COST}
                                                    </Th>
                                                    <Th isNumeric>
                                                        {COMMON_TEXT.TOTAL}
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {!!iOrder && (
                                                    <Tr>
                                                        <Td>
                                                            {
                                                                iOrder.product
                                                                    .name
                                                            }
                                                        </Td>
                                                        <Td isNumeric>
                                                            {formatNumber(
                                                                iOrder.quantity,
                                                                ","
                                                            )}
                                                        </Td>
                                                        <Td isNumeric>
                                                            {formatNumber(
                                                                iOrder.price,
                                                                ","
                                                            )}
                                                        </Td>
                                                        <Td isNumeric>
                                                            {formatNumber(
                                                                iOrder.cost ||
                                                                    0,
                                                                ","
                                                            )}
                                                        </Td>
                                                        <Td isNumeric>
                                                            {formatNumber(
                                                                iOrder.quantity *
                                                                    iOrder.price +
                                                                    (iOrder.cost ||
                                                                        0),
                                                                ","
                                                            )}
                                                        </Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </TitleBox>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <VStack>
                                <TitleBox
                                    title={COMMON_TEXT.NOTE}
                                    w="100%"
                                    p={4}
                                ></TitleBox>
                                <TitleBox
                                    title={IMPORT_ORDER.DELIVERY_DATE}
                                    w="100%"
                                    p={4}
                                >
                                    {moment(
                                        iOrder.deliveryDate,
                                        "YYYY-MM-DDThh:mm"
                                    ).format("LLL")}
                                </TitleBox>
                                <Flex wrap="wrap" justifyContent="space-around">
                                    <Button mt={4} colorScheme="whiteAlpha">
                                        WhiteAlpha
                                    </Button>
                                    <Button mt={4} colorScheme="blackAlpha">
                                        BlackAlpha
                                    </Button>
                                    <Button mt={4} colorScheme="whiteAlpha">
                                        WhiteAlpha
                                    </Button>
                                    <Button mt={4} colorScheme="blackAlpha">
                                        BlackAlpha
                                    </Button>
                                </Flex>
                            </VStack>
                        </GridItem>
                    </Grid>
                </VStack>
            )}
        </>
    );
};

export default IOrderInfo;
