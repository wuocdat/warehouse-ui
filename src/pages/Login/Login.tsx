import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "services/auth/auth.service";
import TokenService from "services/auth/token.service";
import { getErrorMessage } from "utils";

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();

    if (TokenService.getUser()) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (values: any) => {
        try {
            const data = await AuthService.login(
                values.username,
                values.password
            );
            if (data) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            toast({
                description: getErrorMessage(error),
                status: "error",
                duration: 3000,
            });
        }
    };

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md" w={96}>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl
                                    isInvalid={
                                        !!errors.username && touched.username
                                    }
                                >
                                    <FormLabel htmlFor="username">
                                        Username
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        id="username"
                                        name="username"
                                        type="username"
                                        variant="filled"
                                        validate={(value: any) => {
                                            let error;

                                            if (value.length < 1) {
                                                error = "Username is required";
                                            }

                                            return error;
                                        }}
                                    />

                                    <FormErrorMessage>
                                        {errors.username}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.password && touched.password
                                    }
                                >
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        validate={(value: any) => {
                                            let error;

                                            if (value.length < 5) {
                                                error =
                                                    "Password must contain at least 6 characters";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                                <Field
                                    as={Checkbox}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="purple"
                                >
                                    Remember me?
                                </Field>
                                <Button
                                    type="submit"
                                    colorScheme="purple"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};

export default Login;
