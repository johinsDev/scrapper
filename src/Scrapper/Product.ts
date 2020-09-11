import { providers } from "src/config";

export interface IProduct {
  name: string;
  price: string;
  images: string[];
  discountPrice?: string;
  extra?: {};
  provider?: providers;
}
