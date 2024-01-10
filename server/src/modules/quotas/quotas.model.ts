import mongoose from "mongoose";
import { QuotaSchema } from "./quotas.js";

const ModelSchema = new mongoose.Schema<QuotaSchema>(
  {
    reference: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    date: { type: String, required: true },
    product: { type: String, required: true },
    netUnitPrice: { type: String, required: true },
    stocks: { type: String, required: true },
    quantity: { type: String, required: true },
    discount: { type: String, required: true },
    tax: { type: String, required: true },
    shipping: { type: String, required: true },
    total: { type: Number, default: 0 },
    status: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<QuotaSchema>("Quotas", ModelSchema);
