import * as path from "path";
import * as fs from "fs";
import asyncHandler from "express-async-handler";
import userModel from "../users/user.model.ts";
import { Request, Response } from "express";
import { validatePaginationOptions } from "../../utils/api.utils.ts";
import { AdminRequest } from "../../interfaces/server.js";
import { productCategoryModel, productModel } from "./product.model.ts";
import { publicFolder } from "../../utils/fs.utils.ts";

export default {
  create: asyncHandler(async (req: AdminRequest, res: Response) => {
    if (req.file) {
      req.body.productsImg = req.file.filename;
    }

    const product = await productModel
      .findOne({ code: req.body.code })
      .lean()
      .select("_id");
    if (product) throw new Error("Product already exist");

    const categories = await productCategoryModel.findById(req.body.category);
    if (!categories) throw new Error("Category doesnt exist");

    // update the category count by 1
    const _updated = await productCategoryModel
      .findByIdAndUpdate(
        req.body.category,
        { count: categories.count + 1 },
        { new: true }
      )
      .lean()
      .select("_id");

    if (!_updated) throw new Error("Something went wrong");

    const payload = await productModel.create(req.body);
    if (!payload) throw new Error("Something went wrong");

    res.status(201).json({
      payload: payload._id,
    });
  }),

  fetchAll: asyncHandler(async (req: Request, res: Response) => {
    const {
      size = 10,
      index = 0,
      filter = {},
    } = validatePaginationOptions(req.query);

    const totalItems = await productModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / 10);

    const payload = await productModel
      .find(filter)
      .skip(size * index)
      .limit(size)
      .lean()
      .select("-__v");

    const getCategoryNames = payload.map(async (item) => {
      const credentaisl = await productCategoryModel.findById(item.category);
      if (!credentaisl) throw new Error("Category doesnt exist");

      return {
        ...item,
        category: credentaisl.name,
      };
    });

    const _payload = await Promise.all(getCategoryNames);

    res.status(200).json({
      payload: _payload,
      pageCount: totalPages,
      currentPage: index,
    });
  }),

  fetchById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await productModel.findById(id).lean().select("-__v");
    if (!user) throw new Error("User doest exist");

    res.status(200).json({
      payload: user,
    });
  }),

  updateById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.file) {
      req.body.productsImg = req.file.filename;
    }

    const payload = await productModel
      .findById(id)
      .lean()
      .select("_id productsImg");
    if (!payload) throw new Error("Product doesnt exist");

    console.log("payload", payload);

    // check if the image exist
    const filePath = publicFolder("products/" + payload?.productsImg);
    const oldProfileExists = fs.existsSync(filePath);

    console.log("filePath", filePath);
    console.log("oldProfileExists", oldProfileExists);

    if (oldProfileExists) {
      fs.unlinkSync(filePath);
    }

    const _updated = await productModel
      .findByIdAndUpdate(id, req.body, {
        new: true,
      })
      .lean()
      .select("_id");

    if (!_updated) throw new Error("Something went wrong");

    res.status(200).json({
      payload: _updated?._id,
    });
  }),

  deleteById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const payload = await productModel
      .findById(id)
      .lean()
      .select("_id productsImg");
    if (!payload) throw new Error("User doest exist");

    try {
      // check if the image exist
      const filePath = publicFolder("products/" + payload?.productsImg);
      const oldProfileExists = fs.existsSync(filePath);
      if (oldProfileExists) {
        fs.unlinkSync(filePath);
      }

      const credentials = await productModel.deleteOne({ _id: id });
      if (credentials.deletedCount !== 1)
        throw new Error("Document not found or not deleted.");
      res.status(200).json({
        payload: payload?._id,
      });
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }),

  deleteByBatch: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { payload } = req.body;

      // Assuming 'id' is the field you want to match for deletion
      const result = await userModel
        .deleteMany({ _id: { $in: payload } })
        .lean()
        .select("_id");

      if (result.deletedCount > 0) {
        res.status(200).json({ payload: true });
      } else {
        throw new Error("No users found to delete.");
      }
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }),
};
