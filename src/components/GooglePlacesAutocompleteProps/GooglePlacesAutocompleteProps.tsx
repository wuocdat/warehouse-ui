import { Select } from "chakra-react-select";
import config from "config";
import useDebounce from "hooks/useDebounce";
import { FC, useEffect, useState } from "react";
import AddressService from "services/address/map.service";
import { getErrorMessage } from "utils";

interface GooglePlacesAutocompleteProps {
    apiKey?: string;
    debounce?: number;
    minLengthAutocomplete?: number;
    onLoadFailed: (error: Error) => void;
    onChange: (data: string) => void;
}

interface OptionType {
    label: string;
    value: string;
}

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = (props) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [options, setOptions] = useState<OptionType[]>([]);

    const debounced = useDebounce(inputValue, 500);

    const fetchMapData = async () => {
        try {
            const { data } = await AddressService.fetchAddress({
                input: inputValue === "" ? undefined : inputValue,
                inputtype: "textquery",
                key: props.apiKey || config.apiKey,
            });

            if (data && data.candidates.length !== 0) {
                setOptions(
                    data.candidates.map((candidate) => {
                        return {
                            label: candidate,
                            value: candidate,
                        };
                    })
                );
            }
        } catch (error) {
            props.onLoadFailed(new Error(getErrorMessage(error)));
        }
    };

    useEffect(() => {
        fetchMapData();
    }, [debounced]);

    return (
        <Select
            colorScheme="purple"
            options={options}
            onChange={(option) => {
                props.onChange(option!.value);
            }}
            inputValue={inputValue}
            onInputChange={setInputValue}
        />
    );
};

export default GooglePlacesAutocomplete;
