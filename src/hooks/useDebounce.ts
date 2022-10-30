import { useEffect } from "react";
import { useState } from "react";
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, seDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            seDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    });

    return debouncedValue;
};

export default useDebounce;
