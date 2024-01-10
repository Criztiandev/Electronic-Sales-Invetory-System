import mongoose from "mongoose";
import { SupplierSchema } from "./supplier.ts";

const supplierSchema = new mongoose.Schema<SupplierSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<SupplierSchema>("Supplier", supplierSchema);
