/* eslint-disable @typescript-eslint/no-explicit-any */
import tableUtils from "@/utils/table.utils";
import { QueryKey } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  StocksManagement,
  StocksManagementAdjustment,
} from "../interface/model";
interface Props<T> {
  base: string;
  name: string;
  invalidateKey: QueryKey;
  columns: ColumnDef<T, any>[];
}

const StocksManagementTable: Props<StocksManagement> = {
  base: "stocks",
  name: "stocks-table",
  invalidateKey: ["stocks"] as QueryKey,
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
const StocksManagementAdjustment: Props<StocksManagementAdjustment> = {
  base: "stocks",
  name: "stocks-table",
  invalidateKey: ["stocks"] as QueryKey,
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

export default { StocksManagementTable, StocksManagementAdjustment };
