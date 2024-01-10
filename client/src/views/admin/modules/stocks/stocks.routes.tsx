import SupplierScreen from ".";

const routes = {
  path: "/supplier",
  element: <SupplierScreen />,
  children: [
    { path: "/supplier", element: <div></div> },
    { path: "/supplier/:id", element: <div></div> },
    { path: "/supplier/create", element: <div></div> },
    { path: "/supplier/edit/:id", element: <div></div> },
  ],
};

export default routes;
