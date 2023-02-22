import api from "services/api";
import { ImportOrderDto } from "types/dto.interfaces";
import { FindImportOrdersParams } from "types/params.interfaces";
const getImportOrders = (params: FindImportOrdersParams) => {
    return api.get<ImportOrderDto[]>("i-order", {
        params,
    });
};

const countIOrders = (params: any) => {
    return api.get<number>("i-order/count", {
        params,
    });
};

const getIOrderById = (id: string) => {
    return api.get<ImportOrderDto>(`i-order/${id}`);
};

const ImportOrderService = {
    getImportOrders,
    countIOrders,
    getIOrderById,
};

export default ImportOrderService;
