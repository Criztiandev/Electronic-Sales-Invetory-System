import withTableFetching from "@/hoc/withTableFetching.hoc";
import SupplierScreen from ".";
import SupplierCreate from "./screen/SupplierCreate";
import SupplierTable from "./screen/SupplierTable";
import filesConfig from "../../config/tables/files.config";
import supplierApi from "./api/supplier.api";
import SupplierEdit from "./screen/SupplierEdit";
import SupplierDetails from "./screen/SupplierDetails";

const DynamicSupplierTable = withTableFetching(
  SupplierTable,
  filesConfig.supplierTable
);

const routes = {
  path: "/supplier",
  element: <SupplierScreen />,
  children: [
    {
      path: "/supplier",
      element: <DynamicSupplierTable fetchFn={supplierApi.fetchAll} />,
    },
    { path: "/supplier/:id", element: <SupplierDetails /> },
    { path: "/supplier/create", element: <SupplierCreate /> },
    { path: "/supplier/edit/:id", element: <SupplierEdit /> },
  ],
};

export default routes;
