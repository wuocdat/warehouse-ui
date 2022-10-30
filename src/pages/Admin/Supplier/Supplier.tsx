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
import SupplierServices from "services/supplier/supplier.services";
import { SupplierDto } from "types/dto.interfaces";
import { getErrorMessage, isEmpty } from "utils";
import { COMMON_TEXT, SUPPLIER } from "utils/constants";

const Supplier = () => {
    const toast = useToast();

    const [inputValue, setInputValue] = useState<string>("");

    const debounced = useDebounce(inputValue, 700);

    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);

    const fetchSuppliers = async () => {
        try {
            const { data } = await SupplierServices.getSuppliers({
                name: isEmpty(debounced) ? undefined : debounced.trim(),
            });
            if (data) {
                setSuppliers(data);
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
        fetchSuppliers();
    }, [debounced]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Stack direction="column" spacing={4}>
            <Box>
                <NavLink to="add">
                    <Button leftIcon={<AddIcon />} size="sm" onClick={() => {}}>
                        {SUPPLIER.ADD}
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
                                <Th>{SUPPLIER.CODE}</Th>
                                <Th>{SUPPLIER.NAME}</Th>
                                <Th>{COMMON_TEXT.PHONE_NUMBER}</Th>
                                <Th>{COMMON_TEXT.STATUS}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {suppliers.map((supplier, index) => {
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
                            })}
                            {/* <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr> */}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>{SUPPLIER.CODE}</Th>
                                <Th>{SUPPLIER.NAME}</Th>
                                <Th>{COMMON_TEXT.PHONE_NUMBER}</Th>
                                <Th>{COMMON_TEXT.STATUS}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    );
};

export default Supplier;
