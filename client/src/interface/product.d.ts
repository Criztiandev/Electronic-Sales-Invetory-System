export interface ProductSchema {
  _id?: string;
  productImg: Array<string> | string;
  title: string;
  price: number;
  stocks: number;
  category: "all" | "tress" | "plants" | "indoor" | "outdoor" | "shrubs";
  description: string;
  status: "active" | "inactive";
}
