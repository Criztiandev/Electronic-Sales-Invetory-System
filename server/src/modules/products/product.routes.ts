import express from "express";
import authMiddleware from "../../middleware/auth.middleware.ts";
import fileUtils from "../../utils/file.utils.ts";
import productController from "./product.controller.ts";

const router = express.Router();
const BASE_FILE_NAME = "products";
const { upload } = fileUtils;

router.post(
  "/create",
  [upload(`/${BASE_FILE_NAME}`).single(`${BASE_FILE_NAME}Img`)],
  productController.create
);
router.get("/", productController.fetchAll);
router.get("/:id", productController.fetchById);
router.put(
  "/:id",
  [upload(`/${BASE_FILE_NAME}`).single(`${BASE_FILE_NAME}Img`)],
  productController.updateById
);
router.delete("/:id", productController.deleteById);
router.post("/batch", productController.deleteByBatch);

export default router;
