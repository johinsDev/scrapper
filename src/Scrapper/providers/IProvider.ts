import { IProduct } from "../Product";

export interface IProvider {
  search(
    param: string,
    selectorInput: string,
    selectorList: string,
    withScroll?: boolean
  ): Promise<any>;
  extractData(): IProduct[];
}
