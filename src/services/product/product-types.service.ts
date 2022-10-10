import { ProductTypeDto } from "types/dto.interfaces";
import api from "services/api";
const createNew = (name: string, note?: string) => {
    return api.post<ProductTypeDto>("product-types", {
        name,
        note,
    });
};

const fetchAllProductTypes = () => {
    return api.get<ProductTypeDto[]>("product-types/all");
};

const ProductTypeService = {
    createNew,
    fetchAllProductTypes,
};

export default ProductTypeService;
