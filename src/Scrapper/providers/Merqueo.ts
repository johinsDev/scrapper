import { IConfigProvider } from "src/config";
import { IProduct } from "../Product";
import Provider from "./Provider";

export default class Merqueo extends Provider {
  constructor(config: IConfigProvider) {
    super(config);
  }

  extractData(): IProduct[] {
    const results: IProduct[] = [];

    const items = document.querySelectorAll(".mq-grid-item");

    items.forEach((item) => {
      // @ts-ignore
      const name = item.querySelector(".mq-product-title")?.innerText;

      const price = "Sin precio";

      const thumbImage = "IMaga";

      results.push({
        name,
        price,
        images: thumbImage ? [thumbImage] : [],
      });
    });

    return results;
  }
}
