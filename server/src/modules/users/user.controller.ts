import asyncHandler from "express-async-handler";
import userModel from "./user.model.ts";
import { Request, Response } from "express";
import { validatePaginationOptions } from "../../utils/api.utils.ts";
import { AdminRequest } from "../../interfaces/server.js";
import * as fs from "fs";

import { publicFolder } from "../../utils/fs.utils.ts";

export default {
  createUser: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { email, userName } = req.body;
    if (req.file) {
      req.body.profileImg = req.file.filename;
    }

    const _email = await userModel.findOne({ email }).lean().select("_id");
    if (_email) throw new Error("Email alreay exist, Please Try again");

    const _userName = await userModel
      .findOne({ userName })
      .lean()
      .select("_id");
    if (_userName) throw new Error("User Name already exist Please Try again");

    const credentials = await userModel.create(req.body);
    if (!credentials)
      throw new Error("Something went wrong, Please Try again later");

    res.status(200).json({
      payload: credentials?._id,
    });
  }),

  fetchAllUser: asyncHandler(async (req: Request, res: Response) => {
    const {
      size = 10,
      index = 0,
      filter = {},
    } = validatePaginationOptions(req.query);

    const totalUsers = await userModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / 10);

    const users = await userModel
      .find(filter)
      .skip(size * index)
      .limit(size)
      .lean()
      .select("-password -__v");

    res.status(200).json({
      payload: users,
      pageCount: totalPages,
      currentPage: index,
    });
  }),

  fetchUserById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userModel.findById(id).lean().select("-password");
    if (!user) throw new Error("User doest exist");

    res.status(200).json({
      payload: user,
    });
  }),

  updateUserById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    delete req.body.profileImg;

    if (req.file) {
      req.body.profileImg = req.file.filename;
    }

    const _user = await userModel.findById(id).lean().select("_id profileImg");
    if (!_user) throw new Error("User doesnt exist");

    if (_user.profileImg && req.file) {
      try {
        const filePath = publicFolder(`images/profile/${_user.profileImg}`);
        await fs.unlinkSync(filePath);
      } catch (e) {
        // create a file for backlogs
        console.log(e);
      }
    }

    const _updated = await userModel
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

  deleteUserById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const _user = await userModel.findById(id).lean().select("_id");
    if (!_user) throw new Error("User doest exist");

    try {
      const credentials = await userModel.deleteOne({ _id: id });
      if (credentials.deletedCount !== 1)
        throw new Error("Document not found or not deleted.");

      // delete the profile using the fs module

      res.status(200).json({
        payload: _user?._id,
      });
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }),

  deleteUserByBatch: asyncHandler(async (req: Request, res: Response) => {
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
