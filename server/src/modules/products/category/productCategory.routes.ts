import express from "express";
import productCategoryController from "./productCategory.controller.ts";

const router = express.Router();

router.post("/create", productCategoryController.create);
router.get("/", productCategoryController.fetchAll);
router.get("/:id", productCategoryController.fetchById);
router.put("/:id", productCategoryController.updateById);
router.delete("/:id", productCategoryController.deleteById);
router.post("/batch", productCategoryController.deleteByBatch);

export default router;
