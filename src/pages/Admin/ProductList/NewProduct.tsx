import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Input,
    SimpleGrid,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { SmallAddIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Select } from "chakra-react-select";

import TitleBox from "components/TitleBox";
import NamedSwitch from "components/Switch";
import { COMMON_TEXT, PRODUCT_LIST } from "utils/constants";
import { PopoverForm } from "./components";
import { useEffect, useState } from "react";
import { BrandDto, ProductTypeDto } from "types/dto.interfaces";
import { formatToSelectOption, getErrorMessage } from "utils";
import BrandService from "services/brand/brand.service";
import MiniForm from "components/MiniForm";
import ProductTypeService from "services/product/product-types.service";
import { CreateProductParams } from "types/params.interfaces";
import ProductService from "services/product/products.service";
import { useNavigate } from "react-router-dom";

const initialValues: CreateProductParams = {
    name: "",
    unit: "",
    retailPrice: 0,
    importPrice: 0,
    productType: "",
    brand: "",
    active: true,
    tax: false,
};

const NewProduct = () => {
    const navigate = useNavigate();

    const toast = useToast();
    const [productTypes, setProductTypes] = useState<ProductTypeDto[]>([]);
    const [brands, setBrands] = useState<BrandDto[]>([]);

    const [isLoading, setLoading] = useState(false);

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

    const createNewProductType = async (name: string, note?: string) => {
        try {
            const { data } = await ProductTypeService.createNew(name, note);

            if (data) {
                toast({
                    description: COMMON_TEXT.CREATE_SUCCESSFULLY,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setProductTypes([...productTypes, data]);
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

    const createNewBrand = async (name: string, note?: string) => {
        try {
            const { data } = await BrandService.createNew(name, note);

            if (data) {
                toast({
                    description: COMMON_TEXT.CREATE_SUCCESSFULLY,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setBrands([...brands, data]);
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

    const handleSubmit = async (values: CreateProductParams) => {
        setLoading(true);
        try {
            const { data } = await ProductService.createNew(values);

            if (data) {
                toast({
                    description: COMMON_TEXT.CREATE_SUCCESSFULLY,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/admin/products/list", { replace: true });
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductTypes();
        fetchBrands();
    }, []);

    const productSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        code: Yup.string(),
        barcode: Yup.string(),
        weight: Yup.number(),
        unit: Yup.string().required("Required"),
        retailPrice: Yup.number().required("Required"),
        importPrice: Yup.number().required("Required"),
        wholesalePrice: Yup.string(),
        productType: Yup.string().required("Required"),
        brand: Yup.string().required("Required"),
    });

    return (
        <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleSubmit,
                    errors,
                    touched,
                    setValues,
                    values,
                    handleChange,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid
                            templateRows="repeat(4, 1fr)"
                            templateColumns="repeat(6, 1fr)"
                            gap={4}
                        >
                            <GridItem rowSpan={2} colSpan={6}>
                                <TitleBox title={PRODUCT_LIST.GENERAL_INFO}>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <MiniForm
                                            isInValid={
                                                !!errors.name && touched.name
                                            }
                                            label={PRODUCT_LIST.PRODUCT_NAME}
                                            id={"name"}
                                            errorMessage={errors.name}
                                            isRequired
                                        />
                                        <MiniForm
                                            isInValid={
                                                !!errors.code && touched.code
                                            }
                                            label={PRODUCT_LIST.PRODUCT_CODE}
                                            id={"code"}
                                            errorMessage={errors.code}
                                        />
                                        <MiniForm
                                            isInValid={
                                                !!errors.barcode &&
                                                touched.barcode
                                            }
                                            label={PRODUCT_LIST.PRODUCT_BARCODE}
                                            id={"barcode"}
                                            errorMessage={errors.barcode}
                                        />
                                        <MiniForm
                                            isInValid={
                                                !!errors.weight &&
                                                touched.weight
                                            }
                                            label={PRODUCT_LIST.PRODUCT_WEIGHT}
                                            id={"weight"}
                                            type="number"
                                            errorMessage={errors.weight}
                                        />
                                        <MiniForm
                                            isInValid={
                                                !!errors.unit && touched.unit
                                            }
                                            label={PRODUCT_LIST.PRODUCT_UNIT}
                                            id={"unit"}
                                            errorMessage={errors.unit}
                                            isRequired
                                        />
                                    </SimpleGrid>
                                </TitleBox>
                            </GridItem>
                            <GridItem rowSpan={2} colSpan={2}>
                                <TitleBox title={PRODUCT_LIST.PRODUCT_PRICE}>
                                    <VStack spacing={4}>
                                        <FormControl
                                            isInvalid={
                                                !!errors.retailPrice &&
                                                touched.retailPrice
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="retailPrice">
                                                {PRODUCT_LIST.RETAIL_PRICE}
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="retailPrice"
                                                name="retailPrice"
                                                type="number"
                                                variant="filled"
                                            />

                                            <FormErrorMessage>
                                                {errors.retailPrice}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                !!errors.importPrice &&
                                                touched.importPrice
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="importPrice">
                                                {PRODUCT_LIST.IMPORT_PRICE}
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="importPrice"
                                                name="importPrice"
                                                type="number"
                                                variant="filled"
                                            />

                                            <FormErrorMessage>
                                                {errors.importPrice}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                !!errors.wholesalePrice &&
                                                touched.wholesalePrice
                                            }
                                        >
                                            <FormLabel htmlFor="wholesalePrice">
                                                {PRODUCT_LIST.WHOLESALE_PRICE}
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="wholesalePrice"
                                                name="wholesalePrice"
                                                type="number"
                                                variant="filled"
                                            />

                                            <FormErrorMessage>
                                                {errors.wholesalePrice}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </VStack>
                                </TitleBox>
                            </GridItem>
                            <GridItem rowSpan={2} colSpan={2}>
                                <TitleBox title={PRODUCT_LIST.ADDITIONAL_INFO}>
                                    <VStack spacing={4}>
                                        <FormControl
                                            isInvalid={
                                                !!errors.productType &&
                                                touched.productType
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="productType">
                                                {PRODUCT_LIST.PRODUCT_TYPE}
                                            </FormLabel>

                                            <Select
                                                useBasicStyles
                                                id="productType"
                                                name="productType"
                                                selectedOptionStyle="check"
                                                options={formatToSelectOption(
                                                    productTypes
                                                )}
                                                placeholder={
                                                    PRODUCT_LIST.CHOOSE_PRODUCT_TYPE
                                                }
                                                onChange={(option) => {
                                                    setValues({
                                                        ...values,
                                                        productType:
                                                            option?.value._id ||
                                                            "",
                                                    });
                                                }}
                                            />

                                            <FormErrorMessage>
                                                {errors.productType}
                                            </FormErrorMessage>
                                            <PopoverForm
                                                onClickCreateButton={
                                                    createNewProductType
                                                }
                                                triggerButton={
                                                    PRODUCT_LIST.ADD_NEW_PRODUCT
                                                }
                                            />
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                !!errors.brand && touched.brand
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="brand">
                                                {PRODUCT_LIST.BRAND}
                                            </FormLabel>

                                            <Select
                                                useBasicStyles
                                                id="brand"
                                                name="brand"
                                                selectedOptionStyle="check"
                                                options={formatToSelectOption(
                                                    brands
                                                )}
                                                placeholder={
                                                    PRODUCT_LIST.CHOOSE_BRAND
                                                }
                                                onChange={(option) => {
                                                    setValues({
                                                        ...values,
                                                        brand:
                                                            option?.value._id ||
                                                            "",
                                                    });
                                                }}
                                            />

                                            <FormErrorMessage>
                                                {errors.productType}
                                            </FormErrorMessage>

                                            <PopoverForm
                                                onClickCreateButton={
                                                    createNewBrand
                                                }
                                                triggerButton={
                                                    PRODUCT_LIST.ADD_NEW_BRAND
                                                }
                                            />
                                        </FormControl>
                                    </VStack>
                                </TitleBox>
                            </GridItem>

                            <GridItem rowSpan={1} colSpan={2}>
                                <TitleBox title={PRODUCT_LIST.OTHER_INFO}>
                                    <>
                                        <NamedSwitch
                                            id="active"
                                            name="active"
                                            defaultChecked={values.active}
                                            label={PRODUCT_LIST.PRODUCT_ACTIVE}
                                            onChange={handleChange}
                                        />
                                        <NamedSwitch
                                            id="tax"
                                            name="tax"
                                            defaultChecked={values.tax}
                                            label={PRODUCT_LIST.APPLY_TAX}
                                            onChange={handleChange}
                                        />
                                    </>
                                </TitleBox>
                            </GridItem>

                            <GridItem rowSpan={1} colSpan={2}>
                                <TitleBox title={PRODUCT_LIST.UPLOAD_IMAGE}>
                                    <IconButton
                                        aria-label="Upload image"
                                        icon={<SmallAddIcon />}
                                    />
                                </TitleBox>
                            </GridItem>
                        </Grid>

                        <HStack spacing={4} mt={2}>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="whatsapp"
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default NewProduct;
