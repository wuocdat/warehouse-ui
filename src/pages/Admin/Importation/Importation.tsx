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
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import useDebounce from "hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ImportOrderService from "services/importOrder/importOrder.services";
import { ImportOrderDto } from "types/dto.interfaces";
import { getErrorMessage, isEmpty } from "utils";
import { COMMON_TEXT, IMPORT_ORDER, SUPPLIER } from "utils/constants";

const Importation = () => {
    const toast = useToast();

    const [inputValue, setInputValue] = useState<string>("");

    const debounced = useDebounce(inputValue, 700);

    const [importOrders, setImportOrders] = useState<ImportOrderDto[]>([]);

    const fetchImportOrder = async () => {
        try {
            const { data } = await ImportOrderService.getImportOrders({
                name: isEmpty(debounced) ? undefined : debounced.trim(),
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

    useEffect(() => {
        fetchImportOrder();
    }, [debounced]);

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
                        placeholder={SUPPLIER.ENTER_NAME}
                        onChange={handleChange}
                    />
                </InputGroup>
                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
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
                            {/* {importOrders.map((supplier, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{supplier.code || ""}</Td>
                                        <Td>{supplier.name}</Td>
                                        <Td>{supplier.phoneNumber || ""}</Td>
                                        <Td>
                                            {supplier.isActive
                                                ? COMMON_TEXT.ACTIVE
                                                : COMMON_TEXT.DEACTIVATE}
                                        </Td>
                                    </Tr>
                                );
                            })} */}
                        </Tbody>
                        <Tfoot>
                            <Tr>
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
            </Stack>
        </Stack>
    );
};

export default Importation;
