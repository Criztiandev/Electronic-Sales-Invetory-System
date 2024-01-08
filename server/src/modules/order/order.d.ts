interface Order {
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
