import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
  password: z.string().min(3, "Too Short").max(255, "Too Long"),
});

export const registerSchema = z.object({
  profileImg: z.any().optional(),
  userName: z.string().min(3, "Too Short").max(255, "Too Long"),
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
  password: z.string().min(3, "Too Short").max(255, "Too Long"),
});
