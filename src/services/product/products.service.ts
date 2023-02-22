import { ProductDto } from "types/product/product.dto";
import api from "services/api";
import { CreateProductParams } from "types/params.interfaces";
import { MessageDto, ProductUploadResultDto } from "types/dto.interfaces";

const createNew = (params: CreateProductParams) => {
    return api.post<ProductDto>("products", {
        ...params,
    });
};

const getProductById = (id: string) => {
    return api.get<ProductDto>(`products/${id}`);
};

const getProducts = (params: any) => {
    return api.get<ProductDto[]>("products", {
        params,
    });
};

const getAllProducts = () => {
    return api.get<ProductDto[]>("products/all");
};

const getProductCount = (params: any) => {
    return api.get<number>("products/count", {
        params,
    });
};

const getExcelFile = (params: any) => {
    return api.get<Blob>("products/export-excel-file", {
        params,
        responseType: "blob",
    });
};

const downloadTemplate = () => {
    return api.get<Blob>("products/download-template", {
        responseType: "blob",
    });
};

const uploadExcelFile = (data: FormData) => {
    return api.post<ProductUploadResultDto>("products/upload-file", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const deleteOne = (id: string) => {
    return api.delete<MessageDto>("products/delete-one", {
        params: { id },
    });
};

const ProductService = {
    createNew,
    getProducts,
    getAllProducts,
    getProductCount,
    getExcelFile,
    downloadTemplate,
    uploadExcelFile,
    deleteOne,
    getProductById,
};

export default ProductService;
