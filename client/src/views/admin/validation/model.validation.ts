import * as z from "zod";

const numberStringRegex = /^[0-9]{1,64}$/;

const files = {
  productCategory: z.object({
    code: z.string().min(3, "Too Short").max(24, "Too Long"),
    name: z.string().min(3, "Too Short").max(64, "Too Long"),
    count: z.string().min(1, "Too Short").max(64, "Too Long"),
  }),

  product: z.object({
    productImg: z.any().optional(),
    name: z.string().min(0, "Too Short").max(64, "Too Long"),
    code: z.string().min(0, "Too Short").max(64, "Too Long"),
    category: z.string().min(0, "Too Short").max(64, "Too Long"),
    cost: z.any().refine((data) => numberStringRegex.test(data), {
      message: "Invalid format. Should be a string containing only numbers.",
    }),

    price: z.any().refine((data) => numberStringRegex.test(data), {
      message: "Invalid format. Should be a string containing only numbers.",
    }),

    quantity: z.any().refine((data) => numberStringRegex.test(data), {
      message: "Invalid format. Should be a string containing only numbers.",
    }),
  }),
};

export default { files };
