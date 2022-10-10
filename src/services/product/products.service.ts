import { ProductDto } from "types/product/product.dto";
import api from "services/api";
import { CreateProductParams, ProductParams } from "types/params.interfaces";

const createNew = (params: CreateProductParams) => {
    return api.post<ProductDto>("products", {
        ...params,
    });
};

const getProducts = (params: ProductParams) => {
    return api.get<ProductDto[]>("products/all", {
        params,
    });
};

const ProductService = {
    createNew,
    getProducts,
};

export default ProductService;
