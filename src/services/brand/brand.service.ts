import api from "services/api";
import { BrandDto } from "types/dto.interfaces";
const createNew = (name: string, note?: string) => {
    return api.post<BrandDto>("brand", {
        name,
        note,
    });
};

const fetchAllBrands = () => {
    return api.get<BrandDto[]>("brand/all");
};

const BrandService = {
    createNew,
    fetchAllBrands,
};

export default BrandService;
