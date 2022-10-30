import { AddressDto } from "types/dto.interfaces";
import api from "services/api";
const fetchAddress = (params: any) => {
    return api.get<AddressDto>(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        {
            params,
        }
    );
};

const AddressService = {
    fetchAddress,
};

export default AddressService;
