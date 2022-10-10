import { FormControl, FormLabel, Switch, SwitchProps } from "@chakra-ui/react";
import { FC } from "react";

interface NamedSwitchProps extends SwitchProps {
    label: string;
}

const NamedSwitch: FC<NamedSwitchProps> = (props) => {
    return (
        <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor={props.id} mb="0">
                {props.label}
            </FormLabel>
            <Switch {...props} />
        </FormControl>
    );
};

export default NamedSwitch;
