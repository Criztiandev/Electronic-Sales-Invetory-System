import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../users/user.model.ts";

export default {
  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.params;

    const _details = await userModel.findById(UID).lean().select("-password");
    if (!_details) throw new Error("User doesnt exist");

    res.status(200).json({
      payload: _details,
    });
  }),

  updateProfile: asyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.params;
    const payload = req.body;

    if (req.file) {
      req.body.profileImg = req.file.filename;
    }

    const _details = await userModel.findById(UID).lean().select("_id");
    if (!_details) throw new Error("User doesnt exist");

    // delete the old image and replace with new one

    const updateDetails = await userModel
      .findOneAndUpdate({ _id: UID }, payload, { new: true })
      .lean()
      .select("-password");

    if (!updateDetails) throw new Error("Something went wrong");

    res.status(200).json({
      payload: updateDetails,
    });
  }),

  deleteProfile: asyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.params;

    const _details = await userModel.findById(UID).lean().select("_id");
    if (!_details) throw new Error("User doesnt exist");

    const deletedDetails = await userModel
      .findOneAndDelete({ _id: UID })
      .lean()
      .select("_id");
    if (!deletedDetails) throw new Error("Something went wrong");

    res.status(200).json({
      payload: deletedDetails,
    });
  }),
};
