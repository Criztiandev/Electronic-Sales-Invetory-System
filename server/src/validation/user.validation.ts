import { z } from "zod";

const accountSchema = z.object({
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
  userName: z.string().min(3, "Too Short").max(255, "Too Long"),
});

const loginSchema = z.object({
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
  password: z.string().min(3, "Too Short").max(255, "Too Long"),
});

const registerSchema = z.object({
  userName: z.string().min(3, "Too Short").max(255, "Too Long"),
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
  password: z.string().min(3, "Too Short").max(255, "Too Long"),
});

export default { loginSchema, registerSchema, accountSchema };
