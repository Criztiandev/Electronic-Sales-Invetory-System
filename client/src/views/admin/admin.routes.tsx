import { createBrowserRouter } from "react-router-dom";
import AdminEntryPoint from ".";
import NotFound from "../utils/NotFound";
import DashboardScreen from "./modules/dashboard";
import ProductScreen from "./modules/products";
import ProductTable from "./modules/products/screen/ProductTable";
import ProductCategory from "./modules/products/screen/ProductCategory";
import ProductCreate from "./modules/products/screen/ProductCreate";
import ProductCategoryCreate from "./modules/products/screen/ProductCategoryCreate";
import StocksManagementScreen from "./modules/stocks";
import StocksManagementTable from "./modules/stocks/screen/StocksManagementTable";
import StockManagementTableAdjustment from "./modules/stocks/screen/StocksManagementAdjust";
import SupplierScreen from "./modules/supplier";
import SupplierTable from "./modules/supplier/screen/SupplierTable";
import SupplierCreate from "./modules/supplier/screen/SupplierCreate";
import QuotasScreen from "./modules/quotas";
import QuotasCreate from "./modules/quotas/screen/QuotasCreate";
import QuotasTable from "./modules/quotas/screen/QuotasTable";
import PurchaseScreen from "./modules/purchase";
import PurchaseTable from "./modules/purchase/screen/PurchaseTable";
import PurchaseCreate from "./modules/purchase/screen/PurchaseCreate";
import SalesScreen from "./modules/sales";
import SalesTable from "./modules/sales/screen/SalesTable";
import SalesCreate from "./modules/sales/screen/SalesCreate";
import SalesReturnTable from "./modules/sales/screen/SalesReturn";
import ExprensesTable from "./modules/expenses/screen/ExprensesTable";
import ExprensesCreate from "./modules/expenses/screen/ExprensesCreate";
import ExprensesScreen from "./modules/expenses";

import PurchaseReturnTable from "./modules/purchase/screen/PurchaseReturnTable";
import ProfitLoss from "./modules/reports/screen/ProfitLoss";
import PaymentTable from "./modules/reports/screen/Payment";
import TOS from "./modules/reports/screen/TOS";
import userRoutes from "./modules/users/user.routes";

const adminRoutes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: <AdminEntryPoint />,
    children: [
      { path: "/", element: <DashboardScreen /> },
      {
        path: "/products",
        element: <ProductScreen />,
        children: [
          { path: "/products", element: <ProductTable /> },
          { path: "/products/category", element: <ProductCategory /> },
          {
            path: "/products/category/create",
            element: <ProductCategoryCreate />,
          },
          { path: "/products/create", element: <ProductCreate /> },
        ],
      },

      {
        path: "/stocks",
        element: <StocksManagementScreen />,
        children: [
          { path: "/stocks", element: <StocksManagementTable /> },
          {
            path: "/stocks/adjustment",
            element: <StockManagementTableAdjustment />,
          },
        ],
      },

      {
        path: "/supplier",
        element: <SupplierScreen />,
        children: [
          { path: "/supplier", element: <SupplierTable /> },
          { path: "/supplier/create", element: <SupplierCreate /> },
        ],
      },

      {
        path: "/quotas",
        element: <QuotasScreen />,
        children: [
          { path: "/quotas", element: <QuotasTable /> },
          { path: "/quotas/create", element: <QuotasCreate /> },
        ],
      },
      {
        path: "/purchase",
        element: <PurchaseScreen />,
        children: [
          { path: "/purchase", element: <PurchaseTable /> },
          { path: "/purchase/create", element: <PurchaseCreate /> },
        ],
      },

      {
        path: "/sales",
        element: <SalesScreen />,
        children: [
          { path: "/sales", element: <SalesTable /> },
          { path: "/sales/return/create", element: <SalesCreate /> },
        ],
      },

      {
        path: "/expenses",
        element: <ExprensesScreen />,
        children: [
          { path: "/expenses", element: <ExprensesTable /> },
          { path: "/expenses/create", element: <ExprensesCreate /> },
        ],
      },

      {
        path: "/reports",
        element: <ExprensesScreen />,
        children: [
          { path: "/reports/profit", element: <ProfitLoss /> },
          { path: "/reports/payment", element: <PaymentTable /> },
          { path: "/reports/tos", element: <TOS /> },
          { path: "/reports/sales-return", element: <SalesReturnTable /> },
          {
            path: "/reports/purchase-return",
            element: <PurchaseReturnTable />,
          },
        ],
      },
      userRoutes,
    ],
  },
]);
export default adminRoutes;
