import mongoose from "mongoose";
import { ProductSchema } from "./products.js";

const productSchema = new mongoose.Schema<ProductSchema>(
  {
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
  },
  { timestamps: true }
);

const productCategorySchema = new mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    count: { type: Number, require: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
const productCategoryModel = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

export { productModel, productCategoryModel };
