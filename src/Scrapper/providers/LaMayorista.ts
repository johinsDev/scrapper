import { IConfigProvider } from "src/config";
import { IProduct } from "../Product";
import Provider from "./Provider";

export default class LaMayorista extends Provider {
  constructor(config: IConfigProvider) {
    super(config);
  }

  extractData(): IProduct[] {
    const results: IProduct[] = [];

    const items = document.querySelectorAll(".Pev__Home__ListProduct");

    items.forEach((item) => {
      // @ts-ignore
      const name = item.querySelector(".Mic__TitleProduct")?.innerText;

      const vendor =
        // @ts-ignore
        item.querySelector(".Pev__Home__VendorProduct")?.innerText;

      const price =
        // @ts-ignore
        item.querySelector(".Pev__Home__PriceProductCell")?.innerText;

      const thumbImage = item
        .querySelector(".Pev__Home__thumbimg")
        ?.getAttribute("style")
        ?.match(/\((.*?)\)/)?.[1]
        .replace(/('|")/g, "");

      const location = item.querySelector(".Pev__Home__StoreProduct") // @ts-ignore
        ?.innerText;

      results.push({
        name,
        price,
        extra: {
          location,
          vendor,
        },
        images: thumbImage ? [thumbImage] : [],
      });
    });

    return results;
  }
}
