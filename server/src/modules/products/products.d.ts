export interface ProductSchema {
  productsImg: Array<string> | string;
  category: string;
  code: string;
  name: string;
  cost: number;
  price: number;
  quantity: number;
}
