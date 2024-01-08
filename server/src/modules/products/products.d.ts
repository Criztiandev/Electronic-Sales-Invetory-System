export interface ProductSchema {
  productImg: Array<string> | string;
  title: string;
  price: number;
  description: string;
  stocks: number;
  tags: string;
  regularPrice: number;
  category: "all" | "tress" | "plants" | "indoor" | "outdoor" | "shrubs";
}
