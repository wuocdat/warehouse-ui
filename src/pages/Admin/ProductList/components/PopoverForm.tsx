import {
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import { SmallAddIcon } from "@chakra-ui/icons";
import TextInput from "components/TextInput";
import { FC, useRef, useState } from "react";
import { PRODUCT_LIST } from "utils/constants";

interface FCProps {
    onClickCreateButton: (name: string, note?: string) => void;
    triggerButton: string;
}

const PopoverForm: FC<FCProps> = (props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    const textInputRef = useRef<HTMLInputElement>(null);

    const toast = useToast();

    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = (name: string, note: string) => {
        if (name.length !== 0) {
            props.onClickCreateButton(name, note === "" ? undefined : note);
            setName("");
            setNote("");
            onClose();
        } else {
            toast({
                title: "Create new product type",
                description: "Name is required",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            initialFocusRef={textInputRef}
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button size="sm" leftIcon={<SmallAddIcon />} mt="2">
                    {props.triggerButton}
                </Button>
            </PopoverTrigger>
            <PopoverContent p={5}>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Stack spacing={4}>
                        <TextInput
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                            label={PRODUCT_LIST.NAME}
                            id="name"
                            name="name"
                            ref={textInputRef}
                        />
                        <TextInput
                            onChange={(e) => {
                                setNote(e.target.value);
                            }}
                            value={note}
                            label={PRODUCT_LIST.NOTE}
                            id="note"
                            name="note"
                        />
                        <ButtonGroup display="flex" justifyContent="flex-end">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={() => {
                                    handleSubmit(name, note);
                                }}
                            >
                                {PRODUCT_LIST.CREATE_NEW}
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </FocusLock>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverForm;
