import { Request, Response } from "express";
import { JWTPayload } from "./token.js";

interface Base {
  user?: JWTPayload;
  admin?: JWTPayload;
}

export interface ProtectedRequest extends Request, Base {}

export interface ProtectedResponse extends Response, Base {}

export interface UserRequest extends Request {
  user: JWTPayload;
}

export interface AdminRequest extends Request {
  admin: JWTPayload;
}
