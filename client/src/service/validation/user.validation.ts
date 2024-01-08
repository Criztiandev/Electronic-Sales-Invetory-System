import { z } from "zod";

export const PreferedUserDetailsSchema = z.object({
  profileImg: z.any().optional(),
  userName: z.string(),
  email: z.string().email(), // Ensure email format is valid
  role: z.enum(["user", "admin"]),
});
