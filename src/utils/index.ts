import { ProductDto } from "./../types/product/product.dto";
import { AxiosError } from "axios";
import {
    BrandDto,
    ProductTypeDto,
    ProductUploadResultDto,
    SupplierDto,
} from "types/dto.interfaces";
import { PRODUCT_LIST } from "./constants";
import { ImportOrderStatusE } from "types/enum";

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

const formatNumber = (number: number, separator: string): string => {
    let counter = Math.floor(number.toString().length / 3);
    let result = number.toString();
    for (let i = 1; i <= counter; i++) {
        result =
            result.slice(0, -3 * i - i + 1) +
            separator +
            result.slice(-3 * i - i + 1);
    }
    return result[0] === separator ? result.replace(separator, "") : result;
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

const formatSupplierOption = (suppliers: SupplierDto[]) => {
    const result = [...suppliers];

    return result.map((item) => {
        return {
            value: item,
            label: item.name,
        };
    });
};

const formatProductOption = (products: ProductDto[]) => {
    const result = [...products];

    return result.map((item) => {
        return {
            value: item,
            label: item.name,
        };
    });
};

const formatIOrderEnum = (iOrderE: ImportOrderStatusE): string =>
    iOrderE == ImportOrderStatusE.FINISH ? "Hoàn thành" : "Đang giao dịch";

const formatIOrderEnumByPayMent = (iOrderE: ImportOrderStatusE): string =>
    iOrderE > 0 ? "Đã thanh toán" : "Chưa thanh toán";

const formatIOrderEnumByImport = (iOrderE: ImportOrderStatusE): string =>
    iOrderE > 1 ? "Đã nhập" : "Chờ nhập";

export const setUploadResultText = (result: ProductUploadResultDto) => {
    return !!result.error
        ? PRODUCT_LIST.UPLOAD_RESULT.replace(
              "{success}",
              (result.total - result.error).toString()
          )
              .replace("{error}", result.error + "")
              .replace("{errorRows}", result.errorRows.toLocaleString())
        : PRODUCT_LIST.UPLOAD_RESULT.slice(
              0,
              PRODUCT_LIST.UPLOAD_RESULT.indexOf(",")
          ).replace("{success}", (result.total - result.error).toString());
};

export const setFirstLetterToUpCase = (text: string) => {
    return text[0].toUpperCase() + text.substring(1);
};

export const isEmpty = (str: string): boolean => str === "";

export {
    getErrorMessage,
    formatDate,
    formatToSelectOption,
    formatSupplierOption,
    formatProductOption,
    formatNumber,
    formatIOrderEnum,
    formatIOrderEnumByPayMent,
    formatIOrderEnumByImport,
};
export { SIDEBAR as SIDEBAR_CONSTANT } from "./constants";
