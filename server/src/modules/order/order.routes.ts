import express from "express";
import orderController from "./order.controller.ts";

const router = express.Router();

router.post("/create", orderController.create);
router.get("/", orderController.fetchAll);
router.get("/:id", orderController.fetchById);
router.put("/:id", orderController.updateById);
router.delete("/:id", orderController.deleteById);
router.post("/batch", orderController.deleteByBatch);

export default router;
