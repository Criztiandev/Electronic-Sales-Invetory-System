import express from "express";
import userController from "./user.controller.ts";
import authMiddleware from "../../middleware/auth.middleware.ts";
import fileUtils from "../../utils/file.utils.ts";

const router = express.Router();

const { requireAdmin, authenticateUser } = authMiddleware;
const { upload } = fileUtils;

router.post(
  "/create",
  [authenticateUser, requireAdmin, upload("/profile").single("profileImg")],
  userController.createUser
);
router.get("/", [authenticateUser, requireAdmin], userController.fetchAllUser);
router.get(
  "/:id",
  [authenticateUser, requireAdmin],
  userController.fetchUserById
);
router.put(
  "/:id",
  [authenticateUser, requireAdmin, upload("/profile").single("profileImg")],
  userController.updateUserById
);
router.delete(
  "/:id",
  [authenticateUser, requireAdmin],
  userController.deleteUserById
);
router.post(
  "/batch",
  [authenticateUser, requireAdmin],
  userController.deleteUserByBatch
);

export default router;
