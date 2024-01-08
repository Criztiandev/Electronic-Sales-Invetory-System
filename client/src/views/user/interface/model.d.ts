export interface OrderTable {
  _id?: string;
  productID: string;
  status: string;
  deliveryDate: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  productID: Array<string>;
  price: number;
  quantity: number;
  address: string;
  deliveryDate: string;
  total?: number;
  subTotal?: number;
  discount?: number;
  shippingFee?: number;
  createdBy?: string;
  updatedBy?: string;
  status: "pending" | "processing" | "completed";
}
