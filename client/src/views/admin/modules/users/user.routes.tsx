/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import UserScreen from ".";
import UserTable from "./screen/UserTable";
import categoryConfig from "../../config/tables/category.config";
import usersApi from "@/service/api/users.api";
import UserEditScreen from "./screen/UserEditScreen";
import UserCreateScreen from "./screen/UserCreateScreen";

const UserFetchTable = withTableFetching(UserTable, categoryConfig.userTable);

const routes = {
  path: "/users",
  element: <UserScreen />,
  children: [
    {
      path: "/users",
      element: <UserFetchTable fetchFn={usersApi.fetchAllUser} />,
    },
    { path: "/users/create", element: <UserCreateScreen /> },
    { path: "/users/edit/:id", element: <UserEditScreen /> },
  ],
};

export default routes;
