import { Roles } from "../modules/users/user.js";

export interface JWTPayload {
  UID: string;
  role: Roles;
  scope: Array<string>;
}

export interface JWTSigningOptions {
  expiresAt: string | number;
}

export interface VerifyToken {
  payload: JWTPayload;
  expired: boolean;
}
