import asyncHandler from "express-async-handler";
import userModel from "../../users/user.model.ts";
import { Request, Response } from "express";
import { validatePaginationOptions } from "../../../utils/api.utils.ts";
import { AdminRequest } from "../../../interfaces/server.js";
import { productCategoryModel } from "../product.model.ts";

export default {
  create: asyncHandler(async (req: AdminRequest, res: Response) => {
    const credentails = await productCategoryModel
      .findOne({ code: req.body.code })
      .lean()
      .select("_id");
    if (credentails) throw new Error("Product Category already exist");

    const payload = await productCategoryModel.create(req.body);
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

    const totalItems = await productCategoryModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / 10);

    const payload = await productCategoryModel
      .find(filter)
      .skip(size * index)
      .limit(size)
      .lean()
      .select("-__v");

    res.status(200).json({
      payload: payload,
      pageCount: totalPages,
      currentPage: index,
    });
  }),

  fetchById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await productCategoryModel.findById(id).lean().select("-__v");
    if (!user) throw new Error("User doest exist");

    res.status(200).json({
      payload: user,
    });
  }),

  updateById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const palyload = await productCategoryModel
      .findById(id)
      .lean()
      .select("_id profileImg");
    if (!palyload) throw new Error("User doesnt exist");

    const _updated = await productCategoryModel
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

    const payload = await productCategoryModel
      .findById(id)
      .lean()
      .select("_id");
    if (!payload) throw new Error("User doest exist");

    try {
      const credentials = await productCategoryModel.deleteOne({ _id: id });
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
