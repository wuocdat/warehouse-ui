import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import Pagination from "components/Pagination";
import { Formik } from "formik";
import useDebounce from "hooks/useDebounce";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProductTypeService from "services/product/product-types.service";
import ProductService from "services/product/products.service";
import { CreateProductTypeDto, ProductTypeDto } from "types/dto.interfaces";
import { formatDate, getErrorMessage } from "utils";
import { COMMON_TEXT, PRODUCT_LIST } from "utils/constants";

const TableHeader = () => {
    return (
        <Thead>
            <Tr>
                <Th>{COMMON_TEXT.ROW_NUMBER}</Th>
                <Th>{PRODUCT_LIST.PRODUCT_TYPE_NAME}</Th>
                <Th>{PRODUCT_LIST.PRODUCT_TYPE_CODE}</Th>
                <Th>{PRODUCT_LIST.PRODUCT_TYPE_DESCRIPTION}</Th>
                <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                <Th>{PRODUCT_LIST.PRODUCT_ACTION}</Th>
            </Tr>
        </Thead>
    );
};

const ProductType = () => {
    const toast = useToast();

    const [pageSize, setPageSize] = useState(10);

    const [deleteProductTypeId, setDeleteProductTypeId] = useState<string>();

    const [currentPage, setCurrentPage] = useState(1);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDeleteModal,
        onOpen: onOpenDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();

    const {
        isOpen: isOpenAlertModal,
        onOpen: onOpenAlertModal,
        onClose: onCloseAlertModal,
    } = useDisclosure();

    const initialRef = React.useRef(null);

    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const debounced = useDebounce(inputValue, 500);

    const fetchProductTypes = async () => {
        try {
            const { data } = await ProductTypeService.fetchProductTypes({
                name: debounced === "" ? undefined : debounced,
            });
            data && setProductTypes(data);
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
        fetchProductTypes();
    }, [debounced]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (values: CreateProductTypeDto) => {
        try {
            const { name, code, note } = values;
            const { data } = await ProductTypeService.create({
                name,
                code: code === "" ? undefined : code,
                note: note === "" ? undefined : note,
            });

            if (data) {
                setProductTypes((prev) => [...prev, data]);
                toast({
                    description: COMMON_TEXT.CREATE_SUCCESSFULLY,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
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

    const handleDelete = async () => {
        try {
            const { data } = await ProductTypeService.deleteOne(
                deleteProductTypeId || ""
            );

            if (data) {
                toast({
                    description: data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setProductTypes((prev) => {
                    return [...prev!].filter((productType) => {
                        return productType._id !== deleteProductTypeId;
                    });
                });
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            onCloseAlertModal();
        }
    };

    const checkProductByTypeId = async () => {
        try {
            const { data } = await ProductService.getProductCount({
                productTypes: [deleteProductTypeId],
            });
            onCloseDeleteModal();

            if (data) {
                onOpenAlertModal();
            } else {
                handleDelete();
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            onCloseAlertModal();
        }
    };

    return (
        <Stack direction="column">
            <Modal isOpen={isOpenAlertModal} onClose={onCloseAlertModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {PRODUCT_LIST.DELETE_PRODUCT_TYPE_TITLE}
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {PRODUCT_LIST.DELETE_PRODUCT_TYPE_ALERT}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onCloseAlertModal}
                        >
                            {COMMON_TEXT.CLOSE}
                        </Button>
                        <Button variant="ghost" onClick={handleDelete}>
                            {COMMON_TEXT.DELETE}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {PRODUCT_LIST.DELETE_PRODUCT_TYPE_TITLE}
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {PRODUCT_LIST.DELETE_PRODUCT_TYPE_MESSAGE}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onCloseDeleteModal}
                        >
                            {COMMON_TEXT.CLOSE}
                        </Button>
                        <Button variant="ghost" onClick={checkProductByTypeId}>
                            {COMMON_TEXT.DELETE}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <Formik
                        initialValues={{
                            name: "",
                            code: "",
                            note: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, handleChange, resetForm }) => (
                            <form onSubmit={handleSubmit}>
                                <ModalHeader>
                                    {PRODUCT_LIST.ADD_NEW_PRODUCT_TYPE}
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl isRequired>
                                        <FormLabel>
                                            {PRODUCT_LIST.PRODUCT_TYPE_NAME}
                                        </FormLabel>
                                        <Input
                                            name="name"
                                            ref={initialRef}
                                            placeholder={
                                                PRODUCT_LIST.PRODUCT_TYPE_NAME
                                            }
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>
                                            {PRODUCT_LIST.PRODUCT_TYPE_CODE}
                                        </FormLabel>
                                        <Input
                                            name="code"
                                            placeholder={
                                                PRODUCT_LIST.PRODUCT_TYPE_CODE
                                            }
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>
                                            {PRODUCT_LIST.NOTE}
                                        </FormLabel>
                                        <Input
                                            name="note"
                                            placeholder={PRODUCT_LIST.NOTE}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        colorScheme="blue"
                                        mr={3}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
            <Box>
                <Button
                    leftIcon={<AddIcon />}
                    size="sm"
                    variant="outline"
                    onClick={onOpen}
                >
                    {PRODUCT_LIST.ADD_PRODUCT}
                </Button>
            </Box>
            <Stack direction="column" bg="white" borderRadius={8} pt={4} pb={4}>
                <InputGroup width="auto" mr={4} ml={4}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon />}
                    />
                    <Input
                        type="text"
                        name="content"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder={PRODUCT_LIST.NAME_SEARCH_BAR}
                    />
                </InputGroup>
                <TableContainer>
                    <Table variant="striped" colorScheme="teal" size="sm">
                        <TableCaption>
                            Imperial to metric conversion factors
                        </TableCaption>
                        <TableHeader />
                        <Tbody>
                            {productTypes.map((type, index) => {
                                return index + 1 <= currentPage * pageSize &&
                                    index + 1 > (currentPage - 1) * pageSize ? (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{type.name}</Td>
                                        <Td>{type.code || ""}</Td>
                                        <Td>{type.note || ""}</Td>
                                        <Td>{formatDate(type.createdAt)}</Td>

                                        <Td>
                                            <IconButton
                                                aria-label="delete product"
                                                icon={<DeleteIcon />}
                                                variant="ghost"
                                                onClick={() => {
                                                    setDeleteProductTypeId(
                                                        type._id
                                                    );
                                                    onOpenDeleteModal();
                                                }}
                                            />
                                            <IconButton
                                                aria-label="edit product"
                                                icon={<EditIcon />}
                                                variant="ghost"
                                            />
                                        </Td>
                                    </Tr>
                                ) : undefined;
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>{COMMON_TEXT.ROW_NUMBER}</Th>
                                <Th>{PRODUCT_LIST.PRODUCT_TYPE_NAME}</Th>
                                <Th>{PRODUCT_LIST.PRODUCT_TYPE_CODE}</Th>
                                <Th>{PRODUCT_LIST.PRODUCT_TYPE_DESCRIPTION}</Th>
                                <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                                <Th>{PRODUCT_LIST.PRODUCT_ACTION}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <Box>
                    <Pagination
                        onPageChange={setCurrentPage}
                        onSizeChange={setPageSize}
                        total={productTypes.length}
                        pageSize={pageSize}
                    />
                </Box>
            </Stack>
        </Stack>
    );
};

export default ProductType;
