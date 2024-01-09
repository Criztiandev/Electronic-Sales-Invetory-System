import mongoose from "mongoose";
import { ProductSchema } from "./products.js";

const productSchema = new mongoose.Schema<ProductSchema>(
  {
    productsImg: { type: String, default: "" },
    category: {
      type: String,
      require: true,
    },
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    cost: { type: Number, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

const productCategorySchema = new mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    count: { type: Number, require: true, default: 0 },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
const productCategoryModel = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

export { productModel, productCategoryModel };
