import { userSchema } from "@/interface/user";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData extends userSchema {
  confirmPassword: string;
}
