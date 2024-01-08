import crypto from "crypto-js";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape, object, string } from "zod";

const userValidationSchema = object({
  email: string().email(),
  password: string(),
});

const validateBody = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("The request body is empty or invalid");
    }

    next();
  }
);

const authValidation = <T extends ZodRawShape>(
  validationSchema: ZodObject<T>
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;

      // Decrypt the password
      const decryptedPwd = crypto.AES.decrypt(
        password,
        process.env.PASSWORD_SECRET
      ).toString(crypto.enc.Utf8);

      if (!decryptedPwd)
        throw new Error("Something went wrong, Please Try again later");

      // Validate payload using the provided Zod schema
      const validatedCredentials = validationSchema.parse({
        ...req.body,
        password: decryptedPwd,
      });

      req.body = validatedCredentials;
      next();
    } catch (e) {
      const errorPayload = JSON.parse(e.message);
      throw new Error(
        errorPayload[0]?.message || "Something went wrong, Please try again"
      );
    }
  });

export default { validateBody, authValidation };
