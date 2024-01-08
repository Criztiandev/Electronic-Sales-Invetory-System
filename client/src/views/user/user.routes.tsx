/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import UserEntyPoint from ".";

const userRootRoute = createBrowserRouter([
  {
    path: "/",
    element: <UserEntyPoint />,
    children: [
      { path: "/product/:id", element: <div>Profile</div> },
      { path: "/address", element: <div>Address</div> },
    ],
  },
]);

export default userRootRoute;
