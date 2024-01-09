/* eslint-disable @typescript-eslint/no-explicit-any */
import tableUtils from "@/utils/table.utils";
import {
  ProductCategory,
  Products,
  StocksManagement,
  StocksManagementAdjustment,
  Supplier,
} from "../../interface/model";
import { TableStructProps } from "../../interface/table";

const productTable: TableStructProps<Products> = {
  base: "products",
  name: "products-table",
  columns: tableUtils.columnGenerator<Products>({
    invalidateKey: ["products"],
    options: [
      { name: "productImg", header: "Image", isFirst: true },
      { name: "category", header: "Category" },
      { name: "code", header: "Code", isBadge: true },
      { name: "name", header: "Name" },
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
    options: [
      { name: "code", header: "Code", isFirst: true },
      { name: "name", header: "Name" },
      { name: "count", header: "Count", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const StocksManagementTable: TableStructProps<StocksManagement> = {
  base: "stocks",
  name: "stocks-table",
  columns: tableUtils.columnGenerator<StocksManagement>({
    invalidateKey: ["stocks"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "products", header: "Products" },
      { name: "reference", header: "Reference", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};
const StocksManagementAdjustment: TableStructProps<StocksManagementAdjustment> =
  {
    base: "stocks",
    name: "stocks-table",
    columns: tableUtils.columnGenerator<StocksManagementAdjustment>({
      invalidateKey: ["stocks"],
      options: [
        { name: "name", header: "Image", isFirst: true },
        { name: "code", header: "Category" },
        { name: "stock", header: "Stocks", isBadge: true },
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
  StocksManagementAdjustment,
};
