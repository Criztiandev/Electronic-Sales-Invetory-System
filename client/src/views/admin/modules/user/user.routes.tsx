/* eslint-disable react-refresh/only-export-components */
import { Route } from "@/interface/server";
import tableConfig from "@/config/table.config";
import withLazyLoading from "@/hoc/withLazyLoading.hoc";

const UserLazyScreen = withLazyLoading(() => import("."));
const UserTableLazy = withLazyLoading(() => import("./screen/UserTable"));
const UserDetailsScreenLazy = withLazyLoading(
  () => import("./screen/UserDetailsScreen")
);
const UserEditScreenLazy = withLazyLoading(
  () => import("./screen/UserEditScreen")
);

const UserCreateFormLazy = withLazyLoading(
  () => import("./screen/UserCreateForm")
);

const { base } = tableConfig.userTable;

export const userRoutes: Route = {
  path: `/${base}`,
  element: <UserLazyScreen />,
  children: [
    { path: `/${base}`, element: <UserTableLazy /> },
    { path: `/${base}/:id`, element: <UserDetailsScreenLazy base={base} /> },
    { path: `/${base}/edit/:id`, element: <UserEditScreenLazy base={base} /> },
    { path: `/${base}/create`, element: <UserCreateFormLazy base={base} /> },
  ],
};
