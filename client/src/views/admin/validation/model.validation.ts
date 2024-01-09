import * as z from "zod";

const files = {
  productCategory: z.object({
    code: z.string().min(3, "Too Short").max(24, "Too Long"),
    name: z.string().min(3, "Too Short").max(64, "Too Long"),
    count: z.string().min(1, "Too Short").max(64, "Too Long"),
  }),

  product: z.object({
    productImg: z.any().optional(),
    name: z.string().min(3, "Too Short").max(64, "Too Long"),
    code: z.string().min(2, "Too Short").max(64, "Too Long"),
    category: z.string().min(3, "Too Short").max(64, "Too Long"),
    cost: z.string().min(1, "Too Short").max(64, "Too Long"),
    price: z.string().min(1, "Too Short").max(64, "Too Long"),
    quantity: z.string().min(1, "Too Short").max(64, "Too Long"),
  }),
};

export default { files };
