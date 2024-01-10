import withTableFetching from "@/hoc/withTableFetching.hoc";
import QuotasCreate from "./screen/QuotasCreate";
import QuotasScreen from ".";
import QuotasTable from "./screen/QuotasTable";
import categoryConfig from "../../config/tables/category.config";
import quotasApi from "./api/quotas.api";
import QuotasDetails from "./screen/QuotasDetails";
import QuotasEdit from "./screen/QuotasEdit";

const DynamicQuotaTable = withTableFetching(
  QuotasTable,
  categoryConfig.quotasTable
);

const routes = {
  path: "/quotas",
  element: <QuotasScreen />,
  children: [
    {
      path: "/quotas",
      element: <DynamicQuotaTable fetchFn={quotasApi.fetchAll} />,
    },
    { path: "/quotas/:id", element: <QuotasDetails /> },
    { path: "/quotas/create", element: <QuotasCreate /> },
    { path: "/quotas/edit/:id", element: <QuotasEdit /> },
  ],
};

export default routes;
