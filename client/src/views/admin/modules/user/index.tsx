import tableConfig from "@/config/table.config";
import Layout from "../../layout";
import usersApi from "@/service/api/users.api";

import { Outlet } from "react-router-dom";

const UserScreen = () => {
  const { name, invalidateKey } = tableConfig.userTable;

  return (
    <Layout.Dynamic
      queryKey={invalidateKey}
      name={name}
      fetchFn={usersApi.fetchAllUser}>
      <Outlet />
    </Layout.Dynamic>
  );
};

export default UserScreen;
