import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Tag,
    VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import TitleBox from "components/TitleBox";
import { useEffect, useState } from "react";
import { CreateImportOrderDto, SupplierDto } from "types/dto.interfaces";
import { ProductDto } from "types/product/product.dto";
import SupplierServices from "services/supplier/supplier.services";
import {
    COMMON_TEXT,
    ERROR_MESSAGES,
    IMPORT_ORDER,
    PRODUCT_LIST,
    SUPPLIER,
} from "utils/constants";
import ProductService from "services/product/products.service";
import useErrorToast from "hooks/useErrorToast";
import { formatNumber, formatProductOption, formatSupplierOption } from "utils";
import { Formik } from "formik";
import { ImportOrderStatusE } from "types/enum";
import moment from "moment";
import { object, string } from "yup";
import IOrderService from "services/i-order/iOrder.services";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

interface InitValuesInterface extends CreateImportOrderDto {
    approved: boolean;
    finish: boolean;
}

const initialValues: InitValuesInterface = {
    status: ImportOrderStatusE.CREATE,
    deliveryDate: moment().format("YYYY-MM-DDThh:mm"),
    quantity: 0,
    price: 0,
    cost: 0,
    approved: false,
    finish: false,
};

const NewImportOrder = () => {
    const navigate = useNavigate();

    const { errorToast, successToast } = useErrorToast();

    const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
    const [products, setProducts] = useState<ProductDto[]>([]);

    const [unit, setUnit] = useState("");

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });

    const fetchSuppliers = async () => {
        try {
            const { data } = await SupplierServices.getSuppliers({});
            if (data) {
                setSuppliers(data);
            }
        } catch (error) {
            errorToast(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await ProductService.getAllProducts();
            if (data) {
                setProducts(data);
            }
        } catch (error) {
            errorToast(error);
        }
    };

    const iOrderSchema = object({
        product: string().required(ERROR_MESSAGES.EMPTY_FIELD),
        supplier: string().required(ERROR_MESSAGES.EMPTY_FIELD),
    });

    useEffect(() => {
        fetchSuppliers();
        fetchProducts();
    }, []);

    const handleSubmit = async (values: InitValuesInterface) => {
        const { approved, finish, ...createOptions } = values;
        if (finish) {
            createOptions.status = ImportOrderStatusE.FINISH;
            createOptions.deliveryDate = moment().format("YYYY-MM-DDThh:mm");
        } else if (approved) {
            createOptions.status = ImportOrderStatusE.APPROVED;
        } else createOptions.status = ImportOrderStatusE.CREATE;

        createOptions.code = moment().format("DDMMYYhhmmss");
        // moment().day() +
        // "_" +
        // moment().month() +
        // "_" +
        // moment().year() +
        // "_" +
        // moment().hour() +
        // "_" +
        // moment().minute() +
        // "_" +
        // moment().second();

        try {
            const { data } = await IOrderService.createNew(createOptions);
            if (data) {
                successToast(COMMON_TEXT.CREATE_SUCCESSFULLY);
                navigate(-1);
            }
        } catch (error) {
            errorToast(error);
        }
    };

    return (
        <VStack direction="column" spacing={4}>
            <Steps activeStep={activeStep} size="sm" width="700px">
                <Step label={IMPORT_ORDER.ORDER} />
                <Step label={IMPORT_ORDER.BROWSING} />
                <Step label={IMPORT_ORDER.IMPORT} />
                <Step label={IMPORT_ORDER.DONE} />
            </Steps>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={iOrderSchema}
            >
                {({
                    handleChange,
                    handleSubmit,
                    setValues,
                    values,
                    errors,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
                            <GridItem colSpan={2}>
                                <VStack spacing={4}>
                                    <Box
                                        bg="white"
                                        borderRadius={8}
                                        w="100%"
                                        p={4}
                                    >
                                        <FormControl
                                            isRequired
                                            isInvalid={Boolean(errors.supplier)}
                                        >
                                            <FormLabel>
                                                {SUPPLIER.ADD}
                                            </FormLabel>
                                            <Select
                                                colorScheme="purple"
                                                options={formatSupplierOption(
                                                    suppliers
                                                )}
                                                onChange={(newValue) => {
                                                    setValues({
                                                        ...values,
                                                        supplier:
                                                            newValue?.value
                                                                ._id || "",
                                                    });
                                                }}
                                            />

                                            <FormErrorMessage>
                                                {errors.supplier}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box
                                        borderRadius={8}
                                        p={4}
                                        w="100%"
                                        bg="white"
                                    >
                                        <FormControl
                                            isRequired
                                            isInvalid={Boolean(errors.product)}
                                        >
                                            <FormLabel>
                                                {PRODUCT_LIST.PRODUCT_INFO}
                                            </FormLabel>
                                            <Select
                                                colorScheme="purple"
                                                options={formatProductOption(
                                                    products
                                                )}
                                                onChange={(newValue) => {
                                                    setUnit(
                                                        newValue?.value
                                                            ? ` (${newValue.value.unit})`
                                                            : ""
                                                    );
                                                    setValues({
                                                        ...values,
                                                        product:
                                                            newValue?.value
                                                                ._id || "",
                                                    });
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {errors.product}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <HStack
                                        spacing={2}
                                        bg="white"
                                        w="100%"
                                        p={4}
                                        borderRadius={8}
                                    >
                                        <FormControl isRequired>
                                            <FormLabel>
                                                {`${COMMON_TEXT.QUANTITY} ${unit}`.trim()}
                                            </FormLabel>

                                            <NumericFormat
                                                name="quantity"
                                                customInput={Input}
                                                // suffix="vnd"
                                                // allowLeadingZeros
                                                thousandSeparator=","
                                                defaultValue={values.quantity}
                                                onValueChange={(newValue) => {
                                                    setValues({
                                                        ...values,
                                                        quantity:
                                                            newValue.floatValue ||
                                                            0,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                {COMMON_TEXT.PRICE}
                                            </FormLabel>

                                            <NumericFormat
                                                name="price"
                                                customInput={Input}
                                                // suffix="vnd"
                                                allowLeadingZeros
                                                thousandSeparator=","
                                                defaultValue={values.price}
                                                onValueChange={(newValue) => {
                                                    setValues({
                                                        ...values,
                                                        price:
                                                            newValue.floatValue ||
                                                            0,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                {COMMON_TEXT.COST}
                                            </FormLabel>
                                            <NumericFormat
                                                name="cost"
                                                customInput={Input}
                                                // suffix="vnd"
                                                allowLeadingZeros
                                                thousandSeparator=","
                                                defaultValue={values.cost}
                                                onValueChange={(newValue) => {
                                                    setValues({
                                                        ...values,
                                                        cost:
                                                            newValue.floatValue ||
                                                            0,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </HStack>
                                    <TitleBox
                                        title={IMPORT_ORDER.MONEY_TOTAL}
                                        w="100%"
                                        p={4}
                                    >
                                        <>
                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme="cyan"
                                                sx={{ marginRight: 2 }}
                                            >
                                                {formatNumber(
                                                    values.quantity *
                                                        values.price +
                                                        (values.cost || 0),
                                                    ","
                                                )}
                                            </Tag>

                                            <Tag
                                                size="sm"
                                                variant="subtle"
                                                colorScheme="cyan"
                                            >
                                                vnđ
                                            </Tag>
                                        </>
                                    </TitleBox>
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <VStack spacing={4}>
                                    <Box
                                        bg="white"
                                        p={4}
                                        width="100%"
                                        borderRadius={8}
                                    >
                                        <FormControl isRequired>
                                            <FormLabel>
                                                {IMPORT_ORDER.DELIVERY_DATE}
                                            </FormLabel>
                                            <Input
                                                placeholder="Select Date and Time"
                                                size="md"
                                                name="deliveryDate"
                                                defaultValue={
                                                    values.deliveryDate
                                                }
                                                value={values.deliveryDate}
                                                type="datetime-local"
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box
                                        bg="white"
                                        p={4}
                                        width="100%"
                                        borderRadius={8}
                                    >
                                        <Checkbox
                                            checked={values.approved}
                                            onChange={(event) => {
                                                setValues({
                                                    ...values,
                                                    approved:
                                                        event.target.checked,
                                                });
                                            }}
                                        >
                                            {IMPORT_ORDER.PAY_TO_SUPPLIER}
                                        </Checkbox>
                                    </Box>
                                    <Box
                                        bg="white"
                                        p={4}
                                        width="100%"
                                        borderRadius={8}
                                    >
                                        <Checkbox
                                            checked={values.finish}
                                            onChange={(event) => {
                                                setValues({
                                                    ...values,
                                                    finish: event.target
                                                        .checked,
                                                });
                                            }}
                                        >
                                            {
                                                IMPORT_ORDER.IMPORT_GOODS_INTO_WAREHOUSE
                                            }
                                        </Checkbox>
                                    </Box>
                                    <HStack w="100%">
                                        <Button
                                            colorScheme="whatsapp"
                                            type="submit"
                                        >
                                            {IMPORT_ORDER.ORDER}
                                        </Button>
                                        <Button colorScheme="red">
                                            {COMMON_TEXT.CLOSE}
                                        </Button>
                                    </HStack>
                                </VStack>
                            </GridItem>
                        </Grid>
                    </form>
                )}
            </Formik>
        </VStack>
    );
};

export default NewImportOrder;
