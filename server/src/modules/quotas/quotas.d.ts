export interface QuotaSchema {
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
  total: number;
  status: string;
  description?: string;
}
