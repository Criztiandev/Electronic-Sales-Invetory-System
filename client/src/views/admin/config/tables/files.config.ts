/* eslint-disable @typescript-eslint/no-explicit-any */
import tableUtils from "@/utils/table.utils";

import { TableStructProps } from "../../interface/table";
import productCategoryApi from "../../modules/products/api/productCategory.api";
import productsApi from "../../modules/products/api/products.api";
import { ProductCategory, Products } from "../../modules/products/product";
import { Supplier } from "../../modules/supplier/supplier";
import supplierApi from "../../modules/supplier/api/supplier.api";
import { StocksManagement } from "../../modules/stocks/stocks";
import stocksApi from "../../modules/stocks/api/stocks.api";

const productTable: TableStructProps<Products> = {
  base: "products",
  name: "products-table",
  columns: tableUtils.columnGenerator<Products>({
    invalidateKey: ["products"],
    configFn: productsApi.deleteById,
    options: [
      {
        name: "name",
        header: "Name",
        isFirst: true,
        hasImage: true,
        path: "products",
      },
      { id: "category", name: "category", header: "Category" },
      { name: "code", header: "Code", isBadge: true },
      { name: "cost", header: "Cost" },
      { name: "price", header: "Price" },
      { name: "quantity", header: "Quantity" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const productCategory: TableStructProps<ProductCategory> = {
  base: "products-category",
  name: "products-category-table",
  columns: tableUtils.columnGenerator<ProductCategory>({
    invalidateKey: ["products-category"],
    configFn: productCategoryApi.deleteById,
    options: [
      { name: "code", header: "Code", isFirst: true },
      { name: "name", header: "Name" },
      { name: "count", header: "Count", isBadge: true },
      { name: "createdAt", header: "Date", isDate: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const StocksManagementTable: TableStructProps<StocksManagement> = {
  base: "stocks",
  name: "stocks-table",
  columns: tableUtils.columnGenerator<StocksManagement>({
    configFn: () => stocksApi.deleteById,
    invalidateKey: ["stocks"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "productName", header: "Product Name" },
      { name: "code", header: "Category" },
      { name: "stocks", header: "Stocks", isBadge: true },
      { name: "quantity", header: "Quantity" },
      { name: "type", header: "Type" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const supplierTable: TableStructProps<Supplier> = {
  base: "supplier",
  name: "supplier-table",
  columns: tableUtils.columnGenerator<Supplier>({
    configFn: () => supplierApi.deleteById,
    invalidateKey: ["supplier"],
    options: [
      { name: "name", header: "Name", isFirst: true },
      { name: "email", header: "Email" },
      { name: "phone", header: "Phone" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default {
  productTable,
  productCategory,
  supplierTable,
  StocksManagementTable,
};
