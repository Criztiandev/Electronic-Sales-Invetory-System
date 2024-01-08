import mongoose from "mongoose";
import { ProductSchema } from "./products.js";

const productSchema = new mongoose.Schema<ProductSchema>({
  productImg: { type: String, default: "" },
  title: { type: String, require: true, unique: true },
  price: { type: Number, require: true, unique: true },
  description: { type: String, require: true },
  stocks: { type: Number, require: true },
  tags: { type: String, require: true },
  regularPrice: { type: Number, require: true },
  category: {
    type: String,
    enum: ["all", "tress", "plants", "indoor", "outdoor", "shrubs"],
    default: "all",
    require: true,
  },
});

export default mongoose.model("product", productSchema);
