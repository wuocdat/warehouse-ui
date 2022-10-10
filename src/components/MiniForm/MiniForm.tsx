import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import { FC } from "react";

interface FCProps {
    isInValid?: boolean;
    label: string;
    id: string;
    errorMessage?: string;
    type?: string;
    isRequired?: boolean;
}

const MiniForm: FC<FCProps> = ({
    isInValid,
    label,
    id,
    errorMessage,
    type = "name",
    isRequired,
}) => {
    return (
        <FormControl isInvalid={isInValid} isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Field as={Input} id={id} name={id} type={type} variant="filled" />

            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default MiniForm;
