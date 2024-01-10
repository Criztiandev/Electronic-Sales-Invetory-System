import express from "express";
import supplierController from "./supplier.controller.ts";

const router = express.Router();

router.post("/create", supplierController.create);
router.get("/", supplierController.fetchAll);
router.get("/:id", supplierController.fetchById);
router.put("/:id", supplierController.updateById);
router.delete("/:id", supplierController.deleteById);
router.post("/batch", supplierController.deleteByBatch);

export default router;
