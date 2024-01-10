/* eslint-disable @typescript-eslint/no-explicit-any */

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
