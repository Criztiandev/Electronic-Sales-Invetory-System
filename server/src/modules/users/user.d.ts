import { Document } from "mongoose";

export type Roles = "admin" | "user";
export interface UserSchema {
  profileImg?: string;
  userName?: string;
  email: string;
  password: string;
  role?: Roles;
}

export interface UserSchemaDocument extends Document, UserSchema {
  matchPassword: (value: string) => Promise<boolean>;
}
