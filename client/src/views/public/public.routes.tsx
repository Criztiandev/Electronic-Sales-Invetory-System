import { createBrowserRouter } from "react-router-dom";
import LandingPage from ".";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import NotFound from "../utils/NotFound";

const publicRoutes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
]);

export default publicRoutes;
