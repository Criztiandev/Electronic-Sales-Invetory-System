/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Products {
  _id?: string;
  productImg?: any;
  code: string;
  name: string;
  category: string;
  cost: any;
  price: any;
  quantity: any;
}

export interface ProductCategory {
  _id?: string;
  code: string;
  name: string;
  count?: string;
  createdAt?: string;
}
