import { getErrorMessage } from "utils";
import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
    const toast = useToast();

    const errorToast = (error: unknown) => {
        return toast({
            description: getErrorMessage(error),
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const successToast = (text: string) => {
        return toast({
            description: text,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return { errorToast, successToast, toast };
};

export default useCustomToast;
