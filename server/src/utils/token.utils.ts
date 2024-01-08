import tokenConfig from "../config/token.config.ts";
import { Response } from "express";
import { JWTPayload, VerifyToken } from "../interfaces/token.js";
import jwt, { SignOptions } from "jsonwebtoken";
import { title } from "process";

export default {
  verifyToken: (token: string, secret: string): VerifyToken | null => {
    try {
      const data = jwt.verify(token, secret) as JWTPayload;
      return { payload: data, expired: false };
    } catch (e) {
      return { payload: null, expired: true };
    }
  },

  generateToken: (payload: JWTPayload, options: SignOptions) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  },

  generateCookies: (res: Response, title: string, payload: string) => {
    // store token to the cookies
    return res.cookie(title, payload, {
      httpOnly: true,
      secure: process.env.NODE_ENVI !== "production",
      sameSite: "strict",
      maxAge: tokenConfig.config.cookiesAge,
    });
  },

  revokeCookies: (res: Response, title: string): void => {
    // Revoke the cookie by setting an empty value and immediate expiration
    res.cookie(title, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      expires: new Date(0), // Set expiration to immediately expire
    });
  },
};
