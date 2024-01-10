import { createBrowserRouter } from "react-router-dom";
import AdminEntryPoint from ".";
import NotFound from "../utils/NotFound";
import DashboardScreen from "./modules/dashboard";

import productRoutes from "./modules/products/product.routes";
import userRoutes from "./modules/users/user.routes";
import supplierRoute from "./modules/supplier/supplier.routes";
import stocksRoute from "./modules/stocks/stocks.routes";
import quotasRoute from "./modules/quotas/quotas.routes";

const adminRoutes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: <AdminEntryPoint />,
    children: [
      { path: "/", element: <DashboardScreen /> },

      userRoutes,
      productRoutes,
      supplierRoute,
      stocksRoute,
      quotasRoute,
    ],
  },
]);
export default adminRoutes;
