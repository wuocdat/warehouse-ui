import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import Pagination from "components/Pagination";
import useDebounce from "hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ImportOrderService from "services/importOrder/importOrder.services";
import { ImportOrderDto } from "types/dto.interfaces";
import { ImportOrderStatusE } from "types/enum";
import {
    formatDate,
    formatIOrderEnum,
    formatIOrderEnumByImport,
    formatIOrderEnumByPayMent,
    formatNumber,
    getErrorMessage,
    isEmpty,
} from "utils";
import { COMMON_TEXT, IMPORT_ORDER, SUPPLIER } from "utils/constants";

const Importation = () => {
    const toast = useToast();

    //pagination
    const [pageSize, setPageSize] = useState(10);
    const [productCount, setProductCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [inputValue, setInputValue] = useState<string>("");

    const debounced = useDebounce(inputValue, 500);

    const [importOrders, setImportOrders] = useState<ImportOrderDto[]>([]);

    const fetchImportOrder = async () => {
        try {
            const { data } = await ImportOrderService.getImportOrders({
                code: isEmpty(debounced) ? undefined : debounced.trim(),
                pageSize,
                currentPage,
            });
            if (data) {
                setImportOrders(data);
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const fetchCount = async () => {
        try {
            const { data } = await ImportOrderService.countIOrders({
                code: isEmpty(debounced) ? undefined : debounced.trim(),
            });

            if (data || data === 0) {
                setProductCount(data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchImportOrder();
        fetchCount();
    }, [debounced, pageSize, currentPage]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Stack direction="column" spacing={4}>
            <Box>
                <NavLink to="add">
                    <Button leftIcon={<AddIcon />} size="sm" onClick={() => {}}>
                        {IMPORT_ORDER.CREATE}
                    </Button>
                </NavLink>
            </Box>
            <Stack direction="column" bg="white" p={4} borderRadius={8}>
                <InputGroup>
                    <InputLeftAddon children={<SearchIcon />} />
                    <Input
                        type="text"
                        placeholder={IMPORT_ORDER.ENTER_CODE}
                        onChange={handleChange}
                    />
                </InputGroup>
                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>{IMPORT_ORDER.CODE}</Th>
                                <Th>{SUPPLIER.NAME}</Th>
                                <Th>{COMMON_TEXT.STATUS}</Th>
                                <Th>{IMPORT_ORDER.PAYMENT}</Th>
                                <Th>{IMPORT_ORDER.IMPORT_WAREHOUSE}</Th>
                                <Th>{IMPORT_ORDER.MONEY_TOTAL}</Th>
                                <Th>{IMPORT_ORDER.DELIVERY_DATE}</Th>
                                <Th>{IMPORT_ORDER.CREATED_AT}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {importOrders.map((order, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            <Link to={order._id}>
                                                <Text as="ins" color="green">
                                                    {order.code || ""}
                                                </Text>
                                            </Link>
                                        </Td>
                                        <Td>{order.supplier.name}</Td>
                                        <Td>
                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme={
                                                    order.status ==
                                                    ImportOrderStatusE.FINISH
                                                        ? "green"
                                                        : "orange"
                                                }
                                            >
                                                {formatIOrderEnum(order.status)}
                                            </Tag>
                                        </Td>
                                        <Td>
                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme={
                                                    order.status > 0
                                                        ? "green"
                                                        : "orange"
                                                }
                                            >
                                                {formatIOrderEnumByPayMent(
                                                    order.status
                                                )}
                                            </Tag>
                                        </Td>
                                        <Td>
                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme={
                                                    order.status > 1
                                                        ? "green"
                                                        : "orange"
                                                }
                                            >
                                                {formatIOrderEnumByImport(
                                                    order.status
                                                )}
                                            </Tag>
                                        </Td>
                                        <Td>
                                            {formatNumber(
                                                order.quantity * order.price +
                                                    (order.cost || 0),
                                                "."
                                            )}
                                        </Td>
                                        <Td>
                                            {formatDate(order.deliveryDate)}
                                        </Td>
                                        <Td>{formatDate(order.createdAt)}</Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>№</Th>
                                <Th>{IMPORT_ORDER.CODE}</Th>
                                <Th>{SUPPLIER.NAME}</Th>
                                <Th>{COMMON_TEXT.STATUS}</Th>
                                <Th>{IMPORT_ORDER.PAYMENT}</Th>
                                <Th>{IMPORT_ORDER.IMPORT_WAREHOUSE}</Th>
                                <Th>{IMPORT_ORDER.MONEY_TOTAL}</Th>
                                <Th>{IMPORT_ORDER.DELIVERY_DATE}</Th>
                                <Th>{IMPORT_ORDER.CREATED_AT}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>

                <Pagination
                    onPageChange={setCurrentPage}
                    onSizeChange={setPageSize}
                    pageSize={pageSize}
                    total={productCount}
                />
            </Stack>
        </Stack>
    );
};

export default Importation;
