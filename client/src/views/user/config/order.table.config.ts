import tableUtils from "@/utils/table.utils";
import { QueryKey } from "@tanstack/react-query";
import { BaseTableProps } from "../interface/table";
import { OrderTable } from "../interface/model";

const orderTable: BaseTableProps<OrderTable> = {
  base: "order",
  name: "order-table",
  invalidateKey: ["order"] as QueryKey,
  columns: tableUtils.columnGenerator<OrderTable>({
    invalidateKey: ["order"],
    options: [
      { name: "productID", header: "ID", isFirst: true },
      { name: "quantity", header: "Qnty" },
      { name: "price", header: "Price" },
      { name: "deliveryDate", header: "Date" },
      { name: "category", header: "Category" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default orderTable;
