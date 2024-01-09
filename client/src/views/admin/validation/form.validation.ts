import * as z from "zod";

export const ProductValidationSchema = z.object({
  productImg: z.any().optional(),
  name: z.string(),
  category: z.string(),
  code: z.string(),
  cost: z.string(),
  price: z.string(),
  quantity: z.string(),
});
