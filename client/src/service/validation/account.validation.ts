import { z } from "zod";

export const accountValidation = z.object({
  profileImg: z.any().optional(),
  userName: z.string().min(3, "Too Short").max(255, "Too Long"),
  email: z.string().email().min(3, "Too Short").max(255, "Too Long"),
});

export const passwordValidation = z.object({
  password: z.string().min(3, "Too Short").max(255, "Too Long"),
  confirmPassword: z.string().min(3, "Too Short").max(255, "Too Long"),
});
