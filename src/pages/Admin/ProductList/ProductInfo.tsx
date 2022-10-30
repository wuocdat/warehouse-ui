import { EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    Switch,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import TitleBox from "components/TitleBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "services/product/products.service";
import { ProductDto } from "types/product/product.dto";
import { formatDate, getErrorMessage } from "utils";
import { COMMON_TEXT, PRODUCT_LIST } from "utils/constants";

const ProductInfo = () => {
    const toast = useToast();

    const { id } = useParams();

    const [product, setProduct] = useState<ProductDto>();

    const fetchProduct = async () => {
        try {
            const { data } = await ProductService.getProductById(id || "");

            if (data) {
                setProduct(data);
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
        fetchProduct();
    }, []);
    return (
        <>
            {product && (
                <VStack spacing={4} align="stretch">
                    <Flex>
                        <Heading as="h4" size="md" p={2} flex={1}>
                            {product.name}
                        </Heading>
                        <HStack>
                            <FormControl display="flex" flexDirection="row">
                                <FormLabel htmlFor="product_active">
                                    {PRODUCT_LIST.EDIT_PRODUCT_STATUS}
                                </FormLabel>
                                <Switch
                                    id="product_active"
                                    defaultChecked={product.active}
                                />
                            </FormControl>
                            <Button leftIcon={<EditIcon />}>
                                {COMMON_TEXT.EDIT}
                            </Button>
                        </HStack>
                    </Flex>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <GridItem colSpan={2} bg="white" borderRadius={8} p={4}>
                            <TitleBox title={PRODUCT_LIST.PRODUCT_INFO}>
                                <SimpleGrid columns={2} spacing={4}>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.PRODUCT_UNIT}
                                        </Text>
                                        <Text flex={1}>: {product.unit}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.PRODUCT_TYPE}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.productType.name}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.BRAND}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.brand.name}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.TABLE_SELLABLE}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.sellableQuantity}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.TABLE_QUANTITY}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.quantity}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.TABLE_CREATED_DATE}
                                        </Text>
                                        <Text flex={1}>
                                            : {formatDate(product.createdAt)}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.RETAIL_PRICE}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.retailPrice}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.IMPORT_PRICE}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.importPrice}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.WHOLESALE_PRICE}
                                        </Text>
                                        <Text flex={1}>
                                            : {product.wholesalePrice || "__"}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text flex={1}>
                                            {PRODUCT_LIST.PRODUCT_ACTIVE}
                                        </Text>
                                        <Box flex={1}>
                                            :{" "}
                                            <Checkbox
                                                isDisabled
                                                isChecked={product.active}
                                            />
                                        </Box>
                                    </Flex>
                                </SimpleGrid>
                            </TitleBox>
                        </GridItem>
                        <GridItem
                            colSpan={1}
                            bg="white"
                            borderRadius={8}
                            p={4}
                        />
                    </Grid>
                    <Box bg="white" borderRadius={8} p={4}>
                        <TitleBox title={PRODUCT_LIST.IMPORT_PRODUCT_HISTORY}>
                            Import history
                        </TitleBox>
                    </Box>
                </VStack>
            )}
        </>
    );
};

export default ProductInfo;
