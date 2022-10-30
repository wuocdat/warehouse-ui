import { FindSuppliersParams } from "./../../types/params.interfaces";
import { CreateSupplierDto, SupplierDto } from "./../../types/dto.interfaces";
import api from "services/api";
const createNewSupplier = (data: CreateSupplierDto) => {
    return api.post<SupplierDto>("/supplier", {
        ...data,
    });
};

const getSuppliers = (params: FindSuppliersParams) => {
    return api.get<SupplierDto[]>("/supplier", {
        params,
    });
};

const SupplierServices = {
    createNewSupplier,
    getSuppliers,
};

export default SupplierServices;
