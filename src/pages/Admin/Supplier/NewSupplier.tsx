import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    SimpleGrid,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import TitleBox from "components/TitleBox";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import SupplierServices from "services/supplier/supplier.services";
import { CreateSupplierDto } from "types/dto.interfaces";
import { getErrorMessage } from "utils";
import {
    colorSchemePaymentsOptions,
    COMMON_TEXT,
    PAYMENTS,
    SUPPLIER,
} from "utils/constants";
import { array, number, object, string } from "yup";

const initialValues: CreateSupplierDto = {
    name: "",
    payments: [],
};

const NewSupplier = () => {
    const toast = useToast();
    const navigate = useNavigate();

    let supplierSchema = object({
        name: string().strict().trim().max(65, COMMON_TEXT.TOO_LONG),
        phoneNumber: number().positive(COMMON_TEXT.NOT_PHONE_NUMBER).integer(),
        email: string().email(),
        website: string().url().nullable(),
        payments: array().of(string()).min(1, PAYMENTS.ERROR),
        code: string().strict().trim(),
        tag: string().strict().trim(),
        area: string().strict().trim(),
        address: string().strict().trim(),
        wards: string().strict().trim(),
        note: string().strict().trim(),
    });

    const handleSubmit = async (values: CreateSupplierDto) => {
        try {
            const { data } = await SupplierServices.createNewSupplier(values);

            if (data) {
                toast({
                    description: COMMON_TEXT.CREATE_SUCCESSFULLY,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/admin/products/supplier", {
                    replace: true,
                });
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
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={supplierSchema}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                setValues,
                values,
                errors,
                touched,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <GridItem colSpan={2}>
                            <VStack spacing={4}>
                                <TitleBox
                                    title={SUPPLIER.GENERAL_INFO}
                                    w="100%"
                                    p={2}
                                >
                                    <SimpleGrid columns={2} spacing={4}>
                                        <FormControl
                                            isRequired
                                            isInvalid={Boolean(errors.name)}
                                        >
                                            <FormLabel>
                                                {SUPPLIER.NAME}
                                            </FormLabel>
                                            <Input
                                                name="name"
                                                onChange={handleChange}
                                                type="text"
                                            />
                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.code}>
                                            <FormLabel>
                                                {SUPPLIER.CODE}
                                            </FormLabel>
                                            <Input
                                                name="code"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.code}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={!!errors.phoneNumber}
                                        >
                                            <FormLabel>
                                                {COMMON_TEXT.PHONE_NUMBER}
                                            </FormLabel>
                                            <Input
                                                type="number"
                                                name="phoneNumber"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.phoneNumber}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormLabel>
                                                {COMMON_TEXT.EMAIL}
                                            </FormLabel>
                                            <Input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </SimpleGrid>
                                </TitleBox>
                                <TitleBox
                                    title={SUPPLIER.ADDRESS_INFO}
                                    w="100%"
                                    p={2}
                                >
                                    <SimpleGrid columns={2} spacing={4}>
                                        <FormControl
                                            isRequired
                                            isInvalid={!!errors.tag}
                                        >
                                            <FormLabel>
                                                {SUPPLIER.LABEL}
                                            </FormLabel>
                                            <Input
                                                name="tag"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.tag}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.area}>
                                            <FormLabel>
                                                {SUPPLIER.AREA}
                                            </FormLabel>
                                            <Input
                                                name="area"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.area}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={!!errors.address}
                                        >
                                            <FormLabel>
                                                {SUPPLIER.ADDRESS}
                                            </FormLabel>
                                            <Input
                                                name="address"
                                                type="text"
                                                onChange={handleChange}
                                                autoComplete="street-address"
                                            />
                                            <FormErrorMessage>
                                                {errors.address}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.wards}>
                                            <FormLabel>
                                                {SUPPLIER.WARDS}
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="wards"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.wards}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </SimpleGrid>
                                </TitleBox>
                                <TitleBox
                                    title={SUPPLIER.OPTIONAL_INFO}
                                    w="100%"
                                    p={2}
                                >
                                    <FormControl
                                        isInvalid={
                                            !!errors.website && touched.website
                                        }
                                    >
                                        <FormLabel>
                                            {COMMON_TEXT.WEBSITE}
                                        </FormLabel>
                                        <Input
                                            name="website"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        <FormErrorMessage>
                                            {errors.website}
                                        </FormErrorMessage>
                                    </FormControl>
                                </TitleBox>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <VStack spacing={4}>
                                <TitleBox
                                    title={SUPPLIER.OTHER_INFO}
                                    w="100%"
                                    p={2}
                                >
                                    <>
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                !!errors.payments &&
                                                touched.payments
                                            }
                                        >
                                            <FormLabel>
                                                {SUPPLIER.PAYMENTS}
                                            </FormLabel>
                                            <Select
                                                name="payments"
                                                onBlur={handleBlur}
                                                options={
                                                    colorSchemePaymentsOptions
                                                }
                                                isMulti
                                                onChange={(options) => {
                                                    setValues({
                                                        ...values,
                                                        payments: options.map(
                                                            (option) =>
                                                                option.value
                                                        ),
                                                    });
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {errors.payments}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.note}>
                                            <FormLabel>
                                                {SUPPLIER.NOTE}
                                            </FormLabel>
                                            <Input
                                                name="note"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                            <FormErrorMessage>
                                                {errors.note}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </>
                                </TitleBox>
                                <TitleBox title="todo" w="100%">
                                    1
                                </TitleBox>
                                <HStack spacing={4} w="100%">
                                    <Button size="sm" colorScheme="orange">
                                        {COMMON_TEXT.CLOSE}
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        colorScheme="whatsapp"
                                    >
                                        {COMMON_TEXT.CREATE}
                                    </Button>
                                </HStack>
                            </VStack>
                        </GridItem>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default NewSupplier;
