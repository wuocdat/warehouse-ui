import api from "services/api";
import { ImportOrderDto } from "types/dto.interfaces";
import { FindImportOrdersParams } from "types/params.interfaces";
const getImportOrders = (params: FindImportOrdersParams) => {
    return api.get<ImportOrderDto[]>("/import-order", {
        params,
    });
};

const ImportOrderService = {
    getImportOrders,
};

export default ImportOrderService;
