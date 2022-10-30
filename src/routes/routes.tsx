import { Icon } from "@chakra-ui/react";
import { FaMoneyBillAlt, FaProductHunt, FaUserFriends } from "react-icons/fa";
import { MdPointOfSale, MdSettings } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { SIDEBAR_CONSTANT } from "utils";

import { RoutesType } from "types";
import ProductList from "pages/Admin/ProductList";
import WareHouseManager from "pages/Admin/WareHouseManager";
import Importation from "pages/Admin/Importation";
import Supplier from "pages/Admin/Supplier";
import CustomerList from "pages/Admin/CustomerList";
import CustomerGroup from "pages/Admin/CustomerGroup";
import OrderCreation from "pages/Admin/OrderCreation";
import OrderList from "pages/Admin/OrderList";
import ReturnedGood from "pages/Admin/ReturnedGood";
import SalesReport from "pages/Admin/SalesReport";
import ImportReport from "pages/Admin/ImportReport";
import WarehouseReport from "pages/Admin/WarehouseReport";
import FinancialReport from "pages/Admin/FinancialReport";
import CustomerReport from "pages/Admin/CustomerReport";
import Overview from "pages/Admin/Overview";
import NewProduct from "pages/Admin/ProductList/NewProduct";
import ProductType from "pages/Admin/ProductList/ProductType";
import ProductInfo from "pages/Admin/ProductList/ProductInfo";
import NewSupplier from "pages/Admin/Supplier/NewSupplier";
import NewImportOrder from "pages/Admin/Importation/NewImportOrder";

export const subRoutes: RoutesType[] = [
    {
        name: SIDEBAR_CONSTANT.OVERVIEW,
        layout: "/admin",
        path: "/overview",
        icon: <Icon as={MdSettings} color="inherit" />,
        component: Overview,
    },
    {
        name: SIDEBAR_CONSTANT.PRODUCT,
        layout: "/admin",
        mainPath: "/products",
        icon: <Icon as={FaProductHunt} color="inherit" />,
        children: [
            {
                name: SIDEBAR_CONSTANT.PRODUCT_LIST,
                layout: "/admin",
                path: "/products/list",
                component: ProductList,
            },
            {
                name: SIDEBAR_CONSTANT.PRODUCT_LIST,
                layout: "/admin",
                path: "/products/list/:id",
                component: ProductInfo,
                hide: true,
            },
            {
                name: SIDEBAR_CONSTANT.ADD_PRODUCT,
                layout: "/admin",
                path: "/products/list/add",
                component: NewProduct,
                hide: true,
            },
            {
                name: SIDEBAR_CONSTANT.PRODUCT_TYPE,
                layout: "/admin",
                path: "/products/list/type",
                component: ProductType,
                hide: true,
            },
            {
                name: SIDEBAR_CONSTANT.WAREHOUSE_MANAGEMENT,
                layout: "/admin",
                path: "/products/management",
                component: WareHouseManager,
            },
            {
                name: SIDEBAR_CONSTANT.IMPORT_GOODS,
                layout: "/admin",
                path: "/products/import_goods",
                component: Importation,
            },
            {
                name: SIDEBAR_CONSTANT.IMPORT_GOODS,
                layout: "/admin",
                path: "/products/import_goods/add",
                component: NewImportOrder,
                hide: true,
            },
            {
                name: SIDEBAR_CONSTANT.SUPPLIER,
                layout: "/admin",
                path: "/products/supplier",
                component: Supplier,
            },
            {
                name: SIDEBAR_CONSTANT.SUPPLIER,
                layout: "/admin",
                path: "/products/supplier/add",
                component: NewSupplier,
                hide: true,
            },
        ],
    },
    {
        name: SIDEBAR_CONSTANT.CUSTOMERS,
        layout: "/admin",
        mainPath: "/customers",
        icon: <Icon as={FaUserFriends} color="inherit" />,
        children: [
            {
                name: SIDEBAR_CONSTANT.CUSTOMER_LIST,
                layout: "/admin",
                path: "/customers/list",
                component: CustomerList,
            },
            {
                name: SIDEBAR_CONSTANT.CUSTOMER_GROUPS,
                layout: "/admin",
                path: "/customers/groups",
                component: CustomerGroup,
            },
        ],
    },
    {
        name: SIDEBAR_CONSTANT.ORDERS,
        layout: "/admin",
        mainPath: "/orders",
        icon: <Icon as={FaMoneyBillAlt} color="inherit" />,
        children: [
            {
                name: SIDEBAR_CONSTANT.CREATE_ORDER,
                layout: "/admin",
                path: "/orders/creation",
                component: OrderCreation,
            },
            {
                name: SIDEBAR_CONSTANT.ORDER_LIST,
                layout: "/admin",
                path: "/orders/list",
                component: OrderList,
            },
            {
                name: SIDEBAR_CONSTANT.RETURNED_GOODS,
                layout: "/admin",
                path: "/orders/returned_goods",
                component: ReturnedGood,
            },
        ],
    },
    {
        name: SIDEBAR_CONSTANT.SALES_CHANEL,
        layout: "/chanel",
        mainPath: "/sales_chanel",
        icon: <Icon as={MdPointOfSale} color="inherit" />,
        children: [
            {
                name: SIDEBAR_CONSTANT.COUNTER_SALES,
                layout: "/chanel",
                path: "/sales_chanel/counter",
                component: ProductList,
            },
            {
                name: SIDEBAR_CONSTANT.SELLING_SITE,
                layout: "/chanel",
                path: "/sales_chanel/site",
                component: ProductList,
                hide: true,
            },
        ],
    },
    {
        name: SIDEBAR_CONSTANT.REPORT,
        layout: "/admin",
        mainPath: "/reports",
        icon: <Icon as={TbReport} color="inherit" />,
        children: [
            {
                name: SIDEBAR_CONSTANT.SALES_REPORT,
                layout: "/admin",
                path: "/reports/sale",
                component: SalesReport,
            },
            {
                name: SIDEBAR_CONSTANT.IMPORT_REPORT,
                layout: "/admin",
                path: "/reports/import",
                component: ImportReport,
            },
            {
                name: SIDEBAR_CONSTANT.WAREHOUSE_REPORT,
                layout: "/admin",
                path: "/reports/warehouse",
                component: WarehouseReport,
            },
            {
                name: SIDEBAR_CONSTANT.FINANCIAL_REPORT,
                layout: "/admin",
                path: "/reports/finance",
                component: FinancialReport,
            },
            {
                name: SIDEBAR_CONSTANT.CUSTOMER_REPORT,
                layout: "/admin",
                path: "/reports/customer",
                component: CustomerReport,
            },
        ],
    },
    {
        name: SIDEBAR_CONSTANT.CONFIG,
        layout: "/admin",
        path: "/config",
        icon: <Icon as={MdSettings} color="inherit" />,
        component: ProductList,
    },
];
