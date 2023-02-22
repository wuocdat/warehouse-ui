import { ProductDto } from "./product/product.dto";
import { ImportOrderStatusE, PaymentsEnum } from "./enum";

interface CommonFields {
    createdAt: string;
    updatedAt: string;
}

export interface ProductTypeDto {
    _id: string;
    createdBy: string;
    updatedBy: string;
    isActive: boolean;
    name: string;
    note?: string;
    code?: string;
    createdAt: string;
    updatedAt: string;
}

export interface BrandDto {
    _id: string;
    createdBy: string;
    updatedBy: string;
    isActive: boolean;
    name: string;
    note?: string;
    code?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductUploadResultDto {
    total: number;
    error: number;
    errorRows: number[];
}

export interface CreateProductTypeDto {
    name: string;
    code?: string;
    note?: string;
}

export interface MessageDto {
    message: string;
}

export interface AddressDto {
    candidates: string[];
    error_message: string;
    status: string;
}

export interface CreateSupplierDto {
    name: string;
    code?: string;
    phoneNumber?: string;
    email?: string;
    tag?: string;
    area?: string;
    address?: string;
    wards?: string;
    website?: string;
    payments: number[];
    note?: string;
}

export interface SupplierDto extends CommonFields {
    _id: string;
    name: string;
    code?: string;
    phoneNumber?: string;
    email?: string;
    tag?: string;
    area?: string;
    address?: string;
    wards?: string;
    website?: string;
    payments: PaymentsEnum[];
    note?: string;
    isActive: boolean;
}

export interface ImportOrderDto extends CommonFields {
    _id: string;
    code: string;
    supplier: SupplierDto;
    product: ProductDto;
    status: ImportOrderStatusE;
    deliveryDate: string;
    quantity: number;
    price: number;
    cost?: number;
    note?: string;
}

export interface CreateImportOrderDto {
    supplier?: string;
    product?: string;
    status: ImportOrderStatusE;
    deliveryDate: string;
    quantity: number;
    price: number;
    cost?: number;
    note?: string;
    code?: string;
}
