/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import ProductCategoryTable from "./screen/tables/ProductCategoryTable";
import filesConfig from "../../config/tables/files.config";
import ProductScreen from ".";
import ProductCategoryCreate from "./screen/forms/ProductCategoryCreate";
import productCategoryApi from "./api/productCategory.api";
import ProductTable from "./screen/tables/ProductTable";
import ProductCreate from "./screen/forms/ProductCreate";
import productsApi from "./api/products.api";
import ProductEdit from "./screen/forms/ProductEdit";
import ProductDetails from "./screen/forms/ProductDetails";

const DynamicPCTable = withTableFetching(
  ProductCategoryTable,
  filesConfig.productCategory
);

const DynamicProductTable = withTableFetching(
  ProductTable,
  filesConfig.productTable
);

const routes = {
  path: "/products",
  element: <ProductScreen />,
  children: [
    {
      path: "/products",
      element: <DynamicProductTable fetchFn={productsApi.fetchAll} />,
    },
    { path: "/products/:id", element: <ProductDetails /> },
    { path: "/products/create", element: <ProductCreate /> },
    { path: "/products/edit/:id", element: <ProductEdit /> },
    {
      path: "/products/category",
      element: <DynamicPCTable fetchFn={productCategoryApi.fetchAll} />,
    },
    { path: "/products/category/edit/:id", element: <ProductCategoryCreate /> },
    { path: "/products/category/create", element: <ProductCategoryCreate /> },
  ],
};

export default routes;
