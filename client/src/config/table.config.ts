/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductSchema } from "@/interface/product";
import { User } from "@/interface/user";
import tableUtils from "@/utils/table.utils";
import { QueryKey } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

interface Props<T> {
  base: string;
  name: string;
  invalidateKey: QueryKey;
  columns: ColumnDef<T, any>[];
}

const general = {
  cellWidth: "200px",
  pagination: {
    pageIndex: 0,
    pageSize: 0,
  },
};

const userTable: Props<User> = {
  base: "users",
  name: "users-table",
  invalidateKey: ["users"] as QueryKey,
  columns: tableUtils.columnGenerator<User>({
    invalidateKey: ["users"],
    options: [
      { name: "userName", header: "User Name", isFirst: true },
      { name: "email", header: "Email" },
      { id: "role", name: "role", header: "Role", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const productTable: Props<ProductSchema> = {
  base: "products",
  name: "products-table",
  invalidateKey: ["products"] as QueryKey,
  columns: tableUtils.columnGenerator<ProductSchema>({
    invalidateKey: ["products"],
    options: [
      { name: "title", header: "Name", isFirst: true },
      { name: "price", header: "Price" },
      { name: "stocks", header: "Stocks" },
      { name: "category", header: "Category" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const orderTable: Props<any> = {
  base: "order",
  name: "order-table",
  invalidateKey: ["order"] as QueryKey,
  columns: tableUtils.columnGenerator<any>({
    invalidateKey: ["order"],
    options: [
      { name: "title", header: "Name", isFirst: true },
      { name: "price", header: "Price" },
      { name: "stocks", header: "Stocks" },
      { name: "category", header: "Category" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default { userTable, general, productTable, orderTable };
