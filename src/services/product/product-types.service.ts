import { ProductTypeParams } from "./../../types/params.interfaces";
import {
    CreateProductTypeDto,
    MessageDto,
    ProductTypeDto,
} from "types/dto.interfaces";
import api from "services/api";

const create = (params: CreateProductTypeDto) => {
    return api.post<ProductTypeDto>("product-types", params);
};

const createNew = (name: string, note?: string) => {
    return api.post<ProductTypeDto>("product-types", {
        name,
        note,
    });
};

const fetchAllProductTypes = () => {
    return api.get<ProductTypeDto[]>("product-types/all");
};

const fetchProductTypes = (params: ProductTypeParams) => {
    return api.get<ProductTypeDto[]>("product-types", { params });
};

const deleteOne = (id: string) => {
    return api.delete<MessageDto>("product-types/delete-one", {
        params: { id },
    });
};

const ProductTypeService = {
    create,
    createNew,
    fetchAllProductTypes,
    fetchProductTypes,
    deleteOne,
};

export default ProductTypeService;
