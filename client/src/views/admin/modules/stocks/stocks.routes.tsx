import withTableFetching from "@/hoc/withTableFetching.hoc";
import SupplierScreen from ".";
import filesConfig from "../../config/tables/files.config";
import StocksTable from "./screen/StocksTable";
import StocksDetails from "./screen/StocksDetails";
import StocksCreate from "./screen/StocksCreate";
import StocksEdit from "./screen/StocksEdit";
import stocksApi from "./api/stocks.api";

const { base } = filesConfig.StocksManagementTable;

const DynamicStockTable = withTableFetching(
  StocksTable,
  filesConfig.StocksManagementTable
);

const routes = {
  path: `/${base}`,
  element: <SupplierScreen />,
  children: [
    {
      path: `/${base}`,
      element: <DynamicStockTable fetchFn={stocksApi.fetchAll} />,
    },
    { path: `/${base}/:id`, element: <StocksDetails /> },
    { path: `/${base}/create`, element: <StocksCreate /> },
    { path: `/${base}/edit/:id`, element: <StocksEdit /> },
  ],
};

export default routes;
