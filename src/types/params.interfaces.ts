export interface CreateProductParams {
    name: string;
    code?: string;
    barcode?: string;
    weight?: number;
    unit: string;
    retailPrice: number;
    importPrice: number;
    wholesalePrice?: number;
    images?: string[];
    productType: string;
    brand: string;
    tax?: boolean;
    active?: boolean;
}

export interface ProductParams {
    name?: string;
    code?: string;
    barcode?: string;
    weight?: number;
    unit?: string;
    retailPrice?: number;
    importPrice?: number;
    wholesalePrice?: number;
    productTypes?: string[];
    brands?: string[];
    tax?: boolean;
    active?: boolean;
}

export interface ProductTypeParams {
    name?: string;
    code?: string;
}

export interface FindSuppliersParams {
    name?: string;
    code?: string;
}

export interface FindImportOrdersParams {
    code?: string;
    pageSize: number;
    currentPage: number;
}
