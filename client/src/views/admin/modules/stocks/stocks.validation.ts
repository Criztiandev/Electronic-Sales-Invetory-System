import * as z from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface StocksManagement {
  _id?: string;
  productName: string;
  code: string;
  date: string;
  stocks: number;
  quantity: number;
  type: string;
}

const stocksValidation = z.object({
  productName: z.string().min(3, { message: "Product name is too short" }),
  code: z.string().min(3, { message: "Code is too short" }),
  date: z.string().min(3, { message: "Date is too short" }),
  stocks: z.string().min(1, { message: "Stocks is too short" }),
  quantity: z.string().min(1, { message: "Quantity is too short" }),
  type: z.string().min(3, { message: "Type is too short" }),
});

export default stocksValidation;
