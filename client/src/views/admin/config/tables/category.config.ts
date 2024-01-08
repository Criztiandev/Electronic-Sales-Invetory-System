import tableUtils from "@/utils/table.utils";
import { TableStructProps } from "../../interface/table";
import {
  Expenses,
  Purchase,
  Quotas,
  Sales,
  SalesReturn,
} from "../../interface/model";

const quotasTable: TableStructProps<Quotas> = {
  base: "quotas",
  name: "quotas-table",
  columns: tableUtils.columnGenerator<Quotas>({
    invalidateKey: ["quotas"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "refrence", header: "Reference" },
      { name: "customer", header: "Customer" },
      { name: "status", header: "Status", isBadge: true },
      { name: "total", header: "Total" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const purchaseTable: TableStructProps<Purchase> = {
  base: "purchase",
  name: "purchase-table",
  columns: tableUtils.columnGenerator<Purchase>({
    invalidateKey: ["purchase"],
    options: [
      { name: "refrence", header: "Reference", isFirst: true },
      { name: "supplier", header: "Supplier" },
      { name: "total", header: "Total Ammount" },
      { name: "paid", header: "Paid Ammount" },
      { name: "due", header: "Due Ammount" },
      { name: "paymentStatus", header: "Payment Status" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const purchaseTableReturn: TableStructProps<Purchase> = {
  base: "purchase-return",
  name: "purchase-return-table",
  columns: tableUtils.columnGenerator<Purchase>({
    invalidateKey: ["purchase-return"],
    options: [
      { name: "refrence", header: "Reference", isFirst: true },
      { name: "supplier", header: "Supplier" },
      { name: "total", header: "Total Ammount" },
      { name: "paid", header: "Paid Ammount" },
      { name: "due", header: "Due Ammount" },
      { name: "paymentStatus", header: "Payment Status" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const salesTable: TableStructProps<Sales> = {
  base: "sales",
  name: "sales-table",
  columns: tableUtils.columnGenerator<Sales>({
    invalidateKey: ["sales"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "refrerence", header: "Reference" },
      { name: "customer", header: "Customer" },
      { name: "total", header: "Total Ammount" },
      { name: "paid", header: "Paid Ammount" },
      { name: "due", header: "Due Ammount" },
      { name: "paymentStatus", header: "Payment Status" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const saleReturnTable: TableStructProps<SalesReturn> = {
  base: "sales-return",
  name: "sales-return-table",
  columns: tableUtils.columnGenerator<SalesReturn>({
    invalidateKey: ["sales-return"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "refrerence", header: "Reference" },
      { name: "customer", header: "Customer" },
      { name: "total", header: "Total Ammount" },
      { name: "paid", header: "Paid Ammount" },
      { name: "due", header: "Due Ammount" },
      { name: "paymentStatus", header: "Payment Status" },
      { name: "status", header: "Status", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const expensesTable: TableStructProps<Expenses> = {
  base: "expenses",
  name: "expenses-table",
  columns: tableUtils.columnGenerator<Expenses>({
    invalidateKey: ["expenses"],
    options: [
      { name: "date", header: "Date", isFirst: true },
      { name: "reference", header: "Reference" },
      { name: "category", header: "Category" },
      { name: "amount", header: "Details" },
      { name: "details", header: "Status" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default {
  quotasTable,
  purchaseTable,
  purchaseTableReturn,
  salesTable,
  saleReturnTable,
  expensesTable,
};
