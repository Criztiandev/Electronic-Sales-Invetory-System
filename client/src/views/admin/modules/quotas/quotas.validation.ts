import * as z from "zod";

export interface Quotas {
  _id?: string;
  reference: string;
  customer: string;
  date: string;
  product: string;
  netUnitPrice: string;
  stocks: string;
  quantity: string;
  discount: string;
  tax: string;
  shipping: string;
  status: string;
  description?: string;
}

const quotasValidation = z.object({
  reference: z.string().min(1).max(255),
  customer: z.string().min(1).max(255),
  date: z.string().min(1).max(255),
  product: z.string().min(1).max(255),
  netUnitPrice: z.string().min(1).max(255),
  stocks: z.string().min(1).max(255),
  quantity: z.string().min(1).max(255),
  discount: z.string().min(1).max(255),
  tax: z.string().min(1).max(255),
  shipping: z.string().min(1).max(255),
  status: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
});

export default quotasValidation;
