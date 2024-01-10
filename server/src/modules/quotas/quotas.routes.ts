import express from "express";
import stocksController from "./quotas.controller.ts";

const router = express.Router();

router.post("/create", stocksController.create);
router.get("/", stocksController.fetchAll);
router.get("/:id", stocksController.fetchById);
router.put("/:id", stocksController.updateById);
router.delete("/:id", stocksController.deleteById);
router.post("/batch", stocksController.deleteByBatch);

export default router;
