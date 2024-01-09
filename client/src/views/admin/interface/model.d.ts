/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Products {
  _id?: string;
  productImg?: any;
  code: string;
  name: string;
  category: string;
  cost: string;
  price: string;
  quantity: string;
}

export interface ProductCategory {
  _id?: string;
  code: string;
  name: string;
  count?: string;
}

export interface StocksManagement {
  _id?: string;
  date: string;
  reference: string;
  products: string;
}

export interface StocksManagementAdjustment {
  _id?: string;
  name: string;
  code: string;
  stock: string;
  quantity: string;
  type: string;
}

export interface Supplier {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Quotas {
  _id?: string;
  date: string;
  refrence: string;
  customer: string;
  status: string;
  total: string;
}

export interface Purchase {
  _id?: string;
  refrence: string;
  supplier: string;
  status: string;
  total: string;
  paid: string;
  due: string;
  paymentStatus: string;
}

export interface PurchaseReturn extends Purchase {}

export interface Sales {
  _id?: string;
  date: string;
  refrerence: string;
  customer: string;
  status: string;
  total: string;
  paid: string;
  due: string;
  paymentStatus: string;
}

export interface SalesReturn extends Sales {}

export interface Expenses {
  _id?: string;
  date: string;
  reference: string;
  category: string;
  amount: string;
  details: string;
}
