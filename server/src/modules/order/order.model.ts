import { Schema, model } from "mongoose";

// interface OrderTable {
//   _id?: string;
//   productID: string;
//   status: string;
//   deliveryDate: string;
//   price: number;
//   quantity: number;
//   category: string;
// }

const orderSchema = new Schema(
  {
    productID: [
      { type: Schema.Types.ObjectId, ref: "Product", required: true },
    ],

    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    address: { type: String, required: true },
    deliveryDate: {
      type: Date,
      required: true,
    },
    total: { type: Number },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
