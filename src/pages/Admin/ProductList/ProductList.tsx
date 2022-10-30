import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
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
    VStack,
} from "@chakra-ui/react";
import { MdReplay } from "react-icons/md";
import {
    AddIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ChevronDownIcon,
    DeleteIcon,
    EditIcon,
    MinusIcon,
    SearchIcon,
    SmallAddIcon,
} from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";

import { formatDate, getErrorMessage, setUploadResultText } from "utils";
import { COMMON_TEXT, PRODUCT_LIST } from "utils/constants";
import { ProductParams } from "types/params.interfaces";
import ProductService from "services/product/products.service";
import { ProductDto } from "types/product/product.dto";
import ProductTypeService from "services/product/product-types.service";
import { BrandDto, ProductTypeDto } from "types/dto.interfaces";
import BrandService from "services/brand/brand.service";
import Pagination from "components/Pagination";
import fileDownload from "js-file-download";

interface FilterType {
    content?: string;
    productTypes?: string[];
    brands?: string[];
}

const initialValues: FilterType = {
    content: "",
    productTypes: [],
    brands: [],
};

const ProductList = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pageSize, setPageSize] = useState(10);

    const [deleteProductID, setDeleteProductID] = useState<string>();

    const [exportLoading, setExportLoading] = useState(false);
    const [importLoading, setImportLoading] = useState(false);

    const [productCount, setProductCount] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchFields, setSearchFields] = useState<ProductParams>({});

    const [products, setProducts] = useState<ProductDto[]>();
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [brands, setBrands] = useState<BrandDto[]>([]);
    const fetchProducts = async () => {
        try {
            const { data } = await ProductService.getProducts({
                ...searchFields,
                currentPage,
                pageSize,
            });

            if (data) {
                setProducts(data);
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

    const fetchProductCount = async () => {
        try {
            const { data } = await ProductService.getProductCount({
                ...searchFields,
            });

            if (data) {
                setProductCount(data);
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

    const fetchProductTypes = async () => {
        try {
            const { data } = await ProductTypeService.fetchAllProductTypes();
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

    const fetchBrands = async () => {
        try {
            const { data } = await BrandService.fetchAllBrands();
            data && setBrands(data);
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getProductExcelFile = async () => {
        try {
            setExportLoading(true);
            const { data } = await ProductService.getExcelFile({
                ...searchFields,
            });
            fileDownload(data, "product-list.xlsx");
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setExportLoading(false);
        }
    };

    useEffect(() => {
        // fetchProducts();
        fetchProductTypes();
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchFields]);

    useEffect(() => {
        fetchProductCount();
        setCurrentPage(1);
    }, [searchFields]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize]);

    const handleSubmit = (values: FilterType) => {
        const { content, productTypes, brands } = values;

        let searchParams: ProductParams = {};

        if (!!content) searchParams.name = content;

        if (!!productTypes && productTypes.length !== 0)
            searchParams.productTypes = productTypes;

        if (!!brands && brands.length !== 0) searchParams.brands = brands;

        setSearchFields(searchParams);
    };

    const handleDownloadTemplate = async () => {
        try {
            setImportLoading(true);
            const { data } = await ProductService.downloadTemplate();
            fileDownload(data, "template.xlsx");
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setImportLoading(false);
        }
    };

    const handleUploadFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            setImportLoading(true);
            if (event.target.files && event.target.files.length > 0) {
                const formData = new FormData();
                formData.append("file", event.target.files[0]);
                const { data } = await ProductService.uploadExcelFile(formData);

                if (data) {
                    fetchProducts();
                    toast({
                        description: setUploadResultText(data),
                        status: "info",
                        isClosable: true,
                    });
                }
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setImportLoading(false);
            event.target.value = "";
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await ProductService.deleteOne(
                deleteProductID || ""
            );

            if (data) {
                toast({
                    description: data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setProducts((prev) => {
                    return [...prev!].filter((product) => {
                        return product._id !== deleteProductID;
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
            onClose();
        }
    };

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {PRODUCT_LIST.DELETE_PRODUCT_TITLE}
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>{PRODUCT_LIST.DELETE_PRODUCT_MESSAGE}</ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            {COMMON_TEXT.CLOSE}
                        </Button>
                        <Button variant="ghost" onClick={handleDelete}>
                            {COMMON_TEXT.DELETE}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Stack direction="row" spacing={4}>
                <Button
                    leftIcon={<ArrowDownIcon />}
                    variant="outline"
                    size="sm"
                    isLoading={exportLoading}
                    onClick={getProductExcelFile}
                >
                    {PRODUCT_LIST.EXPORT_FILE}
                </Button>
                <Box>
                    <Menu>
                        <MenuButton
                            as={Button}
                            variant="outline"
                            size="sm"
                            leftIcon={<ArrowUpIcon />}
                            rightIcon={<ChevronDownIcon />}
                            isLoading={importLoading}
                        >
                            {PRODUCT_LIST.IMPORT_FILE}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleDownloadTemplate}>
                                {PRODUCT_LIST.DOWNLOAD_TEMPLATE}
                            </MenuItem>
                            <MenuItem>
                                <label
                                    htmlFor="input-file"
                                    style={{
                                        width: "100%",
                                        cursor: "pointer",
                                    }}
                                >
                                    {PRODUCT_LIST.IMPORT_FILE}
                                </label>
                                <Input
                                    type="file"
                                    id="input-file"
                                    hidden
                                    accept=".xlsx"
                                    onChange={handleUploadFile}
                                />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <NavLink to="type">
                    <Button variant="outline" size="sm">
                        {PRODUCT_LIST.PRODUCT_TYPE}
                    </Button>
                </NavLink>
                <NavLink to="add">
                    <Button
                        leftIcon={<SmallAddIcon />}
                        variant="outline"
                        size="sm"
                    >
                        {PRODUCT_LIST.ADD_PRODUCT}
                    </Button>
                </NavLink>
            </Stack>
            <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={2}>
                <GridItem colSpan={1} bg="white" borderRadius={8}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({
                            handleSubmit,
                            setValues,
                            handleChange,
                            resetForm,
                            values,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={8} p={4}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<SearchIcon />}
                                        />
                                        <Input
                                            type="text"
                                            name="content"
                                            value={values.content}
                                            onChange={handleChange}
                                            placeholder={
                                                PRODUCT_LIST.SEARCH_BAR
                                            }
                                        />
                                    </InputGroup>
                                    <Accordion
                                        allowMultiple
                                        w="100%"
                                        defaultIndex={[0]}
                                    >
                                        <AccordionItem>
                                            {({ isExpanded }) => (
                                                <>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box
                                                                flex="1"
                                                                textAlign="left"
                                                            >
                                                                {
                                                                    PRODUCT_LIST.PRODUCT_TYPE
                                                                }
                                                            </Box>
                                                            {isExpanded ? (
                                                                <MinusIcon fontSize="12px" />
                                                            ) : (
                                                                <AddIcon fontSize="12px" />
                                                            )}
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        <CheckboxGroup
                                                            colorScheme="green"
                                                            value={
                                                                values.productTypes
                                                            }
                                                            onChange={(
                                                                groupValues
                                                            ) => {
                                                                setValues({
                                                                    ...values,
                                                                    productTypes:
                                                                        [
                                                                            ...groupValues,
                                                                        ].map(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item +
                                                                                ""
                                                                        ),
                                                                });
                                                            }}
                                                        >
                                                            <Stack
                                                                spacing={2}
                                                                direction="column"
                                                            >
                                                                {productTypes.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Checkbox
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    item._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </Checkbox>
                                                                        );
                                                                    }
                                                                )}
                                                            </Stack>
                                                        </CheckboxGroup>
                                                    </AccordionPanel>
                                                </>
                                            )}
                                        </AccordionItem>
                                        <AccordionItem>
                                            {({ isExpanded }) => (
                                                <>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box
                                                                flex="1"
                                                                textAlign="left"
                                                            >
                                                                {
                                                                    PRODUCT_LIST.BRAND
                                                                }
                                                            </Box>
                                                            {isExpanded ? (
                                                                <MinusIcon fontSize="12px" />
                                                            ) : (
                                                                <AddIcon fontSize="12px" />
                                                            )}
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        <CheckboxGroup
                                                            colorScheme="green"
                                                            value={
                                                                values.brands
                                                            }
                                                            onChange={(
                                                                groupValues
                                                            ) => {
                                                                setValues({
                                                                    ...values,
                                                                    brands: [
                                                                        ...groupValues,
                                                                    ].map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item +
                                                                            ""
                                                                    ),
                                                                });
                                                            }}
                                                        >
                                                            <Stack
                                                                spacing={2}
                                                                direction="column"
                                                            >
                                                                {brands.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Checkbox
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    item._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </Checkbox>
                                                                        );
                                                                    }
                                                                )}
                                                            </Stack>
                                                        </CheckboxGroup>
                                                    </AccordionPanel>
                                                </>
                                            )}
                                        </AccordionItem>
                                    </Accordion>
                                    <HStack spacing={2} w="100%">
                                        <Button type="submit">
                                            {PRODUCT_LIST.FILTER_BUTTON}
                                        </Button>

                                        <IconButton
                                            aria-label="Reset filter"
                                            icon={<MdReplay />}
                                            onClick={() => {
                                                resetForm();
                                            }}
                                        />
                                    </HStack>
                                </VStack>
                            </form>
                        )}
                    </Formik>
                </GridItem>
                <GridItem colSpan={4} bg="white" borderRadius={8} pb={4}>
                    <TableContainer>
                        <Table variant="striped" colorScheme="teal" size="sm">
                            <TableCaption>
                                Imperial to metric conversion factors
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>{COMMON_TEXT.ROW_NUMBER}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_PRODUCT}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_TYPE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_BRAND}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_SELLABLE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_QUANTITY}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                                    <Th>{PRODUCT_LIST.PRODUCT_ACTION}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {products &&
                                    products.map((product, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <Link to={product._id}>
                                                        {product.name}
                                                    </Link>
                                                </Td>
                                                <Td>
                                                    {product.productType.name}
                                                </Td>
                                                <Td>{product.brand.name}</Td>
                                                <Td>
                                                    {product.sellableQuantity}
                                                </Td>
                                                <Td>{product.quantity}</Td>
                                                <Td>
                                                    {formatDate(
                                                        product.createdAt
                                                    )}
                                                </Td>
                                                <Td>
                                                    <IconButton
                                                        aria-label="delete product"
                                                        icon={<DeleteIcon />}
                                                        variant="ghost"
                                                        onClick={() => {
                                                            setDeleteProductID(
                                                                product._id
                                                            );
                                                            onOpen();
                                                        }}
                                                    />
                                                    <IconButton
                                                        aria-label="edit product"
                                                        icon={<EditIcon />}
                                                        variant="ghost"
                                                    />
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>{COMMON_TEXT.ROW_NUMBER}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_PRODUCT}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_TYPE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_BRAND}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_SELLABLE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_QUANTITY}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                                    <Th>{PRODUCT_LIST.PRODUCT_ACTION}</Th>
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
                </GridItem>
            </Grid>
        </Box>
    );
};

export default ProductList;
