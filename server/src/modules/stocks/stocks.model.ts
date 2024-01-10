import mongoose from "mongoose";
import { StocksManagement } from "./stocks.ts";

const Schema = new mongoose.Schema<StocksManagement>(
  {
    productName: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    stocks: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<StocksManagement>("Stocks", Schema);
