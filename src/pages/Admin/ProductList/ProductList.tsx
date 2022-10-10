import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
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
    useToast,
    VStack,
} from "@chakra-ui/react";
import { MdReplay } from "react-icons/md";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    SearchIcon,
    SmallAddIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";

import { formatDate, getErrorMessage } from "utils";
import { PRODUCT_LIST } from "utils/constants";
import { ProductParams } from "types/params.interfaces";
import ProductService from "services/product/products.service";
import { ProductDto } from "types/product/product.dto";
import ProductTypeService from "services/product/product-types.service";
import { BrandDto, ProductTypeDto } from "types/dto.interfaces";
import BrandService from "services/brand/brand.service";
import TitleBox from "components/TitleBox";

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

    const [products, setProducts] = useState<ProductDto[]>();
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [brands, setBrands] = useState<BrandDto[]>([]);

    const fetchProducts = async (params: ProductParams) => {
        try {
            const { data } = await ProductService.getProducts(params);

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

    useEffect(() => {
        fetchProducts({});
        fetchProductTypes();
        fetchBrands();
    }, []);

    const handleSubmit = (values: FilterType) => {
        const { content, productTypes, brands } = values;

        let searchParams: ProductParams = {};

        if (!!content) searchParams.name = content;

        if (!!productTypes && productTypes.length !== 0)
            searchParams.productTypes = productTypes;

        if (!!brands && brands.length !== 0) searchParams.brands = brands;

        fetchProducts(searchParams);
    };

    return (
        <Box>
            <Stack direction="row" spacing={4}>
                <Button
                    leftIcon={<ArrowDownIcon />}
                    variant="outline"
                    size="sm"
                >
                    {PRODUCT_LIST.EXPORT_FILE}
                </Button>
                <Button leftIcon={<ArrowUpIcon />} variant="outline" size="sm">
                    {PRODUCT_LIST.IMPORT_FILE}
                </Button>
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
                                    <TitleBox
                                        title={PRODUCT_LIST.PRODUCT_TYPE}
                                        w="100%"
                                    >
                                        <CheckboxGroup
                                            colorScheme="green"
                                            value={values.productTypes}
                                            onChange={(groupValues) => {
                                                setValues({
                                                    ...values,
                                                    productTypes: [
                                                        ...groupValues,
                                                    ].map((item) => item + ""),
                                                });
                                            }}
                                        >
                                            <Stack
                                                spacing={2}
                                                direction="column"
                                            >
                                                {productTypes.map(
                                                    (item, index) => {
                                                        return (
                                                            <Checkbox
                                                                key={index}
                                                                value={item._id}
                                                            >
                                                                {item.name}
                                                            </Checkbox>
                                                        );
                                                    }
                                                )}
                                            </Stack>
                                        </CheckboxGroup>
                                    </TitleBox>
                                    <TitleBox
                                        title={PRODUCT_LIST.BRAND}
                                        w="100%"
                                    >
                                        <CheckboxGroup
                                            colorScheme="green"
                                            value={values.brands}
                                            onChange={(groupValues) => {
                                                setValues({
                                                    ...values,
                                                    brands: [
                                                        ...groupValues,
                                                    ].map((item) => item + ""),
                                                });
                                            }}
                                        >
                                            <Stack
                                                spacing={2}
                                                direction="column"
                                            >
                                                {brands.map((item, index) => {
                                                    return (
                                                        <Checkbox
                                                            key={index}
                                                            value={item._id}
                                                        >
                                                            {item.name}
                                                        </Checkbox>
                                                    );
                                                })}
                                            </Stack>
                                        </CheckboxGroup>
                                    </TitleBox>
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
                <GridItem colSpan={4} bg="white" borderRadius={8}>
                    <TableContainer>
                        <Table variant="striped" colorScheme="teal">
                            <TableCaption>
                                Imperial to metric conversion factors
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>{PRODUCT_LIST.TABLE_PRODUCT}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_TYPE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_BRAND}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_SELLABLE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_QUANTITY}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {products &&
                                    products.map((product, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{product.name}</Td>
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
                                            </Tr>
                                        );
                                    })}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>{PRODUCT_LIST.TABLE_PRODUCT}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_TYPE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_BRAND}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_SELLABLE}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_QUANTITY}</Th>
                                    <Th>{PRODUCT_LIST.TABLE_CREATED_DATE}</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default ProductList;
