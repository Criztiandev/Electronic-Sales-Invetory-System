import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { RootReducer } from "./service/store";
import publicRoutes from "./views/public/public.routes";
import adminRoutes from "./views/admin/admin.routes";
import userRootRoute from "./views/user/user.routes";

const App = () => {
  const { UID, role } = useSelector((state: RootReducer) => state.auth);

  if (!UID || !role) {
    return <RouterProvider router={publicRoutes} />;
  }

  console.log(role === "admin");
  const protectedRoutes = role === "admin" ? adminRoutes : userRootRoute;

  return <RouterProvider router={protectedRoutes} />;
};

export default App;
