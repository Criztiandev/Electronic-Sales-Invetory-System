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
  subTotal: string;
  total: string;
  status: string;
  description?: string;
}
