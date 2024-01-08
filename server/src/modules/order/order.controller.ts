import * as path from "path";
import * as fs from "fs";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validatePaginationOptions } from "../../utils/api.utils.ts";
import { AdminRequest } from "../../interfaces/server.js";
import orderModel from "./order.model.ts";

export default {
  create: asyncHandler(async (req: AdminRequest, res: Response) => {}),

  fetchAll: asyncHandler(async (req: Request, res: Response) => {
    const {
      size = 10,
      index = 0,
      filter = {},
    } = validatePaginationOptions(req.query);

    const totalItems = await orderModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / 10);

    const payload = await orderModel
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

    const user = await orderModel.findById(id).lean().select("-__v");
    if (!user) throw new Error("User doest exist");

    res.status(200).json({
      payload: user,
    });
  }),

  updateById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.file) {
      req.body.productImg = req.file.filename;
    }

    const palyload = await orderModel
      .findById(id)
      .lean()
      .select("_id profileImg");
    if (!palyload) throw new Error("User doesnt exist");

    const _updated = await orderModel
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

    const payload = await orderModel.findById(id).lean().select("_id");
    if (!payload) throw new Error("User doest exist");

    try {
      const credentials = await orderModel.deleteOne({ _id: id });
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

      const result = await orderModel
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
