import express from "express";
import authController from "./auth.controller.ts";
import validationMiddleware from "../../middleware/validation.middleware.ts";
import userValidation from "../../validation/user.validation.ts";
const router = express.Router();

const { validateBody, authValidation } = validationMiddleware;
const loginValidation = authValidation(userValidation.loginSchema);
const registrationValidation = authValidation(userValidation.registerSchema);

router.post("/", [validateBody, loginValidation], authController.login);
router.post(
  "/register",
  [validateBody, registrationValidation],
  authController.register
);

export default router;
