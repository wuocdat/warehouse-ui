import { BrandDto, ProductTypeDto } from "types/dto.interfaces";

export interface ProductDto {
    _id: string;
    name: string;
    code?: string;
    barcode?: string;
    weight?: number;
    unit: string;
    retailPrice: number;
    importPrice: number;
    wholesalePrice?: number;
    images?: string[];
    productType: ProductTypeDto;
    brand: BrandDto;
    tax?: boolean;
    sellableQuantity: number;
    quantity: number;
    active?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
}
