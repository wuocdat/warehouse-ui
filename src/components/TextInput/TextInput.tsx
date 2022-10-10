import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface TextInputProps extends InputProps {
    label: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (props, ref) => {
        return (
            <FormControl>
                <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
                <Input ref={ref} {...props} />
            </FormControl>
        );
    }
);

export default TextInput;
