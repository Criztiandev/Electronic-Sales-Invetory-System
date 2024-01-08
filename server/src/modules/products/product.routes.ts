import express from "express";
import authMiddleware from "../../middleware/auth.middleware.ts";
import fileUtils from "../../utils/file.utils.ts";
import productController from "./product.controller.ts";

const router = express.Router();
const BASE_FILE_NAME = "product";
const { requireAdmin, authenticateUser } = authMiddleware;
const { upload } = fileUtils;

router.post(
  "/create",
  [
    authenticateUser,
    requireAdmin,
    upload(`/${BASE_FILE_NAME}`).single(`${BASE_FILE_NAME}Img`),
  ],
  productController.create
);
router.get("/", [authenticateUser, requireAdmin], productController.fetchAll);
router.get(
  "/:id",
  [authenticateUser, requireAdmin],
  productController.fetchById
);
router.put(
  "/:id",
  [
    authenticateUser,
    requireAdmin,
    upload(`/${BASE_FILE_NAME}`).single(`${BASE_FILE_NAME}Img`),
  ],
  productController.updateById
);
router.delete(
  "/:id",
  [authenticateUser, requireAdmin],
  productController.deleteById
);
router.post(
  "/batch",
  [authenticateUser, requireAdmin],
  productController.deleteByBatch
);

export default router;
