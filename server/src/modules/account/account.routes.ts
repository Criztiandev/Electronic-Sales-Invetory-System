import express from "express";
import accountController from "./account.controller.ts";
import authMiddleware from "../../middleware/auth.middleware.ts";
import fileUtils from "../../utils/file.utils.ts";

const router = express.Router();
const { requireAdmin, authenticateUser } = authMiddleware;

const protectionList = [authenticateUser, requireAdmin];

router.get("/:UID", protectionList, accountController.getProfile);
router.put(
  "/:UID",
  [...protectionList, fileUtils.upload("/profile").single("profileImg")],
  accountController.updateProfile
);
router.delete("/:UID", protectionList, accountController.deleteProfile);
export default router;
