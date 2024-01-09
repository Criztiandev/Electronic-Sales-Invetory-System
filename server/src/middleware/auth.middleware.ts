import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  AdminRequest,
  ProtectedRequest,
  ProtectedResponse,
  UserRequest,
} from "../interfaces/server.js";
import tokenUtils from "../utils/token.utils.ts";
export default {
  requireUser: asyncHandler(
    async (req: UserRequest, res: Response, next: NextFunction) => {
      if (!req.user) {
        // clear cookies
        tokenUtils.revokeCookies(res, "accessToken");
        tokenUtils.revokeCookies(res, "refreshToken");
        res.status(401);
        throw new Error("Unauthorized, Your role is not User");
      }
      return next();
    }
  ),

  requireAdmin: asyncHandler(
    async (req: AdminRequest, res: Response, next: NextFunction) => {
      if (!req.admin) {
        res.status(401);
        throw new Error("Unauthorized, Your role is not Admin");
      }
      return next();
    }
  ),

  authenticateUser: asyncHandler(
    async (
      req: ProtectedRequest,
      res: ProtectedResponse,
      next: NextFunction
    ) => {
      if (!req.cookies) throw new Error("No Cookies");

      const { accessToken, refreshToken } = req.cookies;
      if (!accessToken || !refreshToken) throw new Error("Invalid Token");

      const result = tokenUtils.verifyToken(
        accessToken,
        process.env.JWT_SECRET
      );

      if (result?.expired && result?.payload === null) {
        const refresh = tokenUtils.verifyToken(
          refreshToken,
          process.env.JWT_SECRET
        );

        const { payload, expired } = refresh;

        if (expired && payload === null) {
          tokenUtils.revokeCookies(res, "accessToken");
          tokenUtils.revokeCookies(res, "refreshToken");
          throw new Error("Expired Token");
        }

        const newToken: string = tokenUtils.generateToken(
          { UID: payload.UID, role: payload.role, scope: payload.scope },
          { expiresIn: "15m" }
        );
        tokenUtils.generateCookies(res, "accessToken", newToken);

        // renew
        req[payload?.role] = tokenUtils.verifyToken(
          newToken,
          process.env.JWT_SECRET
        ).payload;
        return next();
      } else {
        req[result?.payload?.role] = result?.payload;
        return next();
      }
    }
  ),
};
