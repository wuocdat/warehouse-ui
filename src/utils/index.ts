import { AxiosError } from "axios";
import {
    BrandDto,
    ProductTypeDto,
    ProductUploadResultDto,
} from "types/dto.interfaces";
import { PRODUCT_LIST } from "./constants";

const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        if (
            error.response &&
            error.response?.data &&
            error.response?.data.message
        )
            return error.response.data.message;
        else return error.message;
    } else {
        console.log(error);
        return "SomeThing Wrong :(";
    }
};

const formatDate = (stringDate: string) => {
    const date = new Date(stringDate);

    const currentMonth = date.getMonth();
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    // const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${date.getFullYear()}/${monthString}/${currentDate}`;
};

const formatToSelectOption = (types: ProductTypeDto[] | BrandDto[]) => {
    const result = [...types];

    return result.map((item) => {
        return {
            value: item,
            label: item.name,
        };
    });
};

export const setUploadResultText = (result: ProductUploadResultDto) => {
    return PRODUCT_LIST.UPLOAD_RESULT.replace(
        "{success}",
        (result.total - result.error).toString()
    )
        .replace("{error}", result.error + "")
        .replace("{errorRows}", result.errorRows.toLocaleString());
};

export { getErrorMessage, formatDate, formatToSelectOption };
export { SIDEBAR as SIDEBAR_CONSTANT } from "./constants";
