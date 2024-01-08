import { z } from "zod";

export const ReviewsSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  rating: z.number(),
  date: z.date(),
  userId: z.string(),
  comment: z.string(),
});

export const ProductSchema = z.object({
  //   cover: z.array(z.string()),
  cover: z.string().min(3, "Too Short").max(25, "Too Long"),
  title: z.string().min(3, "Too Short").max(25, "Too Long"),
  price: z.string().min(3, "Too Short").max(25, "Too Long"),
  stockQuantity: z.string().min(3, "Too Short").max(25, "Too Long"),
  category: z.enum(["Indoor", "Outdoor", "Flowering", "Featured", "Shrubs"]),
  description: z.string(),
  rating: z.string().min(1, "Too Short").max(25, "Too Long"),
});
