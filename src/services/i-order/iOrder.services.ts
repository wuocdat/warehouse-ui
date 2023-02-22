import { ImportOrderDto } from "types/dto.interfaces";
import api from "services/api";
import { CreateImportOrderDto } from "types/dto.interfaces";
const createNew = (data: CreateImportOrderDto) => {
    return api.post<ImportOrderDto>("i-order", { ...data });
};

const IOrderService = { createNew };

export default IOrderService;
