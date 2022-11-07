import { PaymentsEnum } from "types/enum";

export const SIDEBAR = {
    OVERVIEW: "Tổng Quan",

    PRODUCT: "Sản Phẩm",
    PRODUCT_LIST: "Danh sách sản phẩm",
    ADD_PRODUCT: "Thêm sản phẩm",
    PRODUCT_TYPE: "Loại sản phẩm",
    WAREHOUSE_MANAGEMENT: "Quản lý kho",
    IMPORT_GOODS: "Nhập hàng",
    SUPPLIER: "Nhà cung cấp",

    CUSTOMERS: "Khách hàng",
    CUSTOMER_LIST: "Danh sách khách hàng",
    CUSTOMER_GROUPS: "Nhóm khách hàng",

    ORDERS: "Đơn hàng",
    CREATE_ORDER: "Tạo đơn hàng và giao hàng",
    ORDER_LIST: "Danh sách đơn hàng",
    RETURNED_GOODS: "Khách trả hàng",

    SALES_CHANEL: "Kênh bán hàng",
    COUNTER_SALES: "Bán tại quầy",
    SELLING_SITE: "Bán qua website",

    REPORT: "Báo cáo",
    SALES_REPORT: "Báo cáo bán hàng",
    IMPORT_REPORT: "Báo cáo nhập hàng",
    WAREHOUSE_REPORT: "Báo cáo kho",
    FINANCIAL_REPORT: "Báo cáo tài chính",
    CUSTOMER_REPORT: "Báo cáo khách hàng",

    CONFIG: "Cấu hình",
};

export const COMMON_TEXT = {
    WAREHOUSE_MANAGER: "WAREHOUSE",
    COLLAPSE: "Thu gọn",
    CREATE_SUCCESSFULLY: "Tạo thành công",
    CLOSE: "Đóng",
    DELETE: "Xóa",
    ROW_NUMBER: "No.",
    EDIT: "Chỉnh sửa",
    PHONE_NUMBER: "Số điện thoại",
    EMAIL: "Email",
    WEBSITE: "Website",
    CREATE: "Tạo mới",
    TOO_LONG: "Chuỗi quá dài",
    NOT_PHONE_NUMBER: "Sai định dạng số điện thoại",
    STATUS: "Trạng thái",
    ACTIVE: "Đang giao dịch",
    DEACTIVATE: "Ngưng giao dịch",
    QUANTITY: "Số lượng",
    UNIT: "Đơn vị",
    PRICE: "Giá",
    COST: "Phí",
    TOTAL: "Thành tiền",
};

export const PAGINATION_TEXT = {
    DISPLAY: "Hiển thị",
    RESULT: "kết quả",
    DESCRIPTION: "Từ {number1} đến {number2} trên tổng {number3}",
};

export const PRODUCT_LIST = {
    EXPORT_FILE: "Xuất file",
    IMPORT_FILE: "Nhập file",
    DOWNLOAD_TEMPLATE: "Tải file nhập mẫu",
    PRODUCT_TYPE: "Loại sản phẩm",
    ADD_PRODUCT: "Thêm sản phẩm",
    GENERAL_INFO: "Thông tin chung",
    UPLOAD_IMAGE: "Tải lên hình ảnh sản phẩm",
    ADDITIONAL_INFO: "Thông tin bổ sung",
    PRODUCT_PRICE: "Giá sản phẩm",
    OTHER_INFO: "Thông tin khác",

    PRODUCT_NAME: "Tên sản phẩm",
    PRODUCT_INFO: "Thông tin sản phẩm",
    PRODUCT_CODE: "Mã sản phẩm",
    PRODUCT_BARCODE: "Mã vạch",
    PRODUCT_WEIGHT: "Khối lượng",
    PRODUCT_UNIT: "Đơn vị tính",
    RETAIL_PRICE: "Giá bán lẻ",
    IMPORT_PRICE: "Giá nhập",
    WHOLESALE_PRICE: "Giá bán buôn",
    CHOOSE_PRODUCT_TYPE: "Chọn loại sản phẩm",
    ADD_NEW_PRODUCT: "Thêm sản phẩm",
    CHOOSE_BRAND: "Chọn nhãn hiệu",
    BRAND: "Nhãn hiệu",
    ADD_NEW_BRAND: "Thêm nhãn hiệu",
    CREATE_NEW: "Tạo mới",
    NAME: "Tên",
    NOTE: "Ghi chú",
    PRODUCT_STATUS: "Trạng thái",
    PRODUCT_ACTIVE: "Cho phép bán?",
    PRODUCT_TAX: "Thuế",
    APPLY_TAX: "Áp dụng thuế?",
    IMPORT_PRODUCT_HISTORY: "Lịch sử kho",
    EDIT_PRODUCT_STATUS: "Kinh doanh / Ngừng kinh doanh",

    TABLE_PRODUCT: "Sản phẩm",
    TABLE_TYPE: "Loại",
    TABLE_BRAND: "Nhãn hiệu",
    TABLE_SELLABLE: "Có thể bán",
    TABLE_QUANTITY: "Tồn kho",
    TABLE_CREATED_DATE: "Ngày khởi tạo",

    SEARCH_BAR: "Tìm kiếm theo mã sản phẩm, tên sản phẩm",
    NAME_SEARCH_BAR: "Tìm kiếm theo tên sản phẩm",
    FILTER_BUTTON: "Lọc",

    UPLOAD_RESULT_TITLE: "Kết quả nhập sản phẩm",
    UPLOAD_RESULT:
        "Thêm thành công {success} sản phẩm, lỗi {error} sản phẩm (tại các dòng số : {errorRows})",

    PRODUCT_TYPE_NAME: "Tên loại sản phẩm",
    PRODUCT_TYPE_CODE: "Mã loại",
    PRODUCT_TYPE_DESCRIPTION: "Ghi chú",
    ADD_NEW_PRODUCT_TYPE: "Thêm loại sản phẩm",
    PRODUCT_ACTION: "Thao tác",
    DELETE_PRODUCT_MESSAGE: "Bạn chắc chắn muốn xóa sản phẩm này?",
    DELETE_PRODUCT_TYPE_MESSAGE: "Bạn chắc chắn muốn xóa loại sản phẩm này?",
    DELETE_PRODUCT_TYPE_ALERT:
        "Tồn tại sản phẩm thuộc loại này. Bạn vẫn muốn xóa loại sản phẩm này?",
    DELETE_PRODUCT_TITLE: "Xóa sản phẩm",
    DELETE_PRODUCT_TYPE_TITLE: "Xóa loại sản phẩm",
};

export const SUPPLIER = {
    ADD: "Thêm nhà cung cấp",
    ENTER_NAME: "Nhập tên nhà cung cấp",
    NAME: "Tên nhà cung cấp",
    CODE: "Mã nhà cung cấp",
    GENERAL_INFO: "Thông tin chung",
    ADDRESS_INFO: "Thông tin địa chỉ",
    OPTIONAL_INFO: "Thông tin bổ sung",
    OTHER_INFO: "Thông tin khác",
    ADDRESS: "Địa chỉ",
    AREA: "Khu vực",
    LABEL: "Nhãn",
    WARDS: "Phường xã",
    PAYMENTS: "Hình thức thanh toán",
    NOTE: "Mô tả về nhà cung cấp",
};

export const IMPORT_ORDER = {
    CREATE: "Thêm đơn nhập hàng",
    CODE: "Mã đơn",
    PAYMENT: "Thanh toán",
    IMPORT_WAREHOUSE: "Nhập kho",
    MONEY_TOTAL: "Tổng tiền",
    CREATED_AT: "Ngày tạo",
    DELIVERY_DATE: "Ngày hẹn giao",
    ORDER: "Đặt hàng",
    BROWSING: "Duyệt",
    IMPORT: "Nhập kho",
    DONE: "Hoàn thành",
};

export const breadcrumbText = new Map<string, string>([
    ["admin", "Trang chủ"],
    ["products", "Sản Phẩm"],
    ["list", "Danh sách"],
    ["overview", "Tổng quan"],
    ["add", "Thêm"],
    ["type", "Thêm"],
    ["supplier", "Nhà cung cấp"],
    ["import_goods", "Nhập hàng"],
]);

export const PAYMENTS = {
    SWIPE: "Quẹt thẻ",
    TRANSFER: "Chuyển khoản",
    CASH: "Tiền mặt",
    ERROR: "Chưa chọn phương pháp thanh toán",
};

export const colorSchemePaymentsOptions = [
    { value: PaymentsEnum.SWIPE, label: PAYMENTS.SWIPE, colorScheme: "blue" },
    {
        value: PaymentsEnum.TRANSFER,
        label: PAYMENTS.TRANSFER,
        colorScheme: "purple",
    },
    { value: PaymentsEnum.CASH, label: PAYMENTS.CASH, colorScheme: "red" },
    // { value: "orange", label: "Orange", colorScheme: "orange" },
    // { value: "yellow", label: "Yellow", colorScheme: "yellow" },
    // { value: "green", label: "Green", colorScheme: "green" },
];
