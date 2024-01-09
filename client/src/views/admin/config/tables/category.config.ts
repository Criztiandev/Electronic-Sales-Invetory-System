import tableUtils from "@/utils/table.utils";
import { TableStructProps } from "../../interface/table";
import {
  Expenses,
  Products,
  Purchase,
  Quotas,
  Sales,
  SalesReturn,
  StocksManagement,
  StocksManagementAdjustment,
} from "../../interface/model";
import { User } from "@/interface/user";

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

const stocksManagementTable: TableStructProps<StocksManagement> = {
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

const stocksManagementAdjustment: TableStructProps<StocksManagementAdjustment> =
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

const userTable: TableStructProps<User> = {
  base: "users",
  name: "users-table",
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

export default {
  productTable,
  stocksManagementTable,
  stocksManagementAdjustment,
  quotasTable,
  purchaseTable,
  purchaseTableReturn,
  salesTable,
  saleReturnTable,
  expensesTable,
  userTable,
};
