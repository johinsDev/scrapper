import puppeteer, { Page } from "puppeteer";
import { IProduct } from "../Product";
import { IConfigProvider } from "src/config";
import { IProvider } from "./IProvider";

abstract class Provider implements IProvider {
  products: IProduct[];

  abstract extractData(): IProduct[];

  constructor(protected config: IConfigProvider) {}

  async prepareSearch(
    param: string,
    selector: string,
    selectorList: string
  ): Promise<Page> {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(this.config.url);

    await page.waitForSelector(selector);

    await page.type(selector, param);

    await page.keyboard.press(String.fromCharCode(13));

    await page.waitForSelector(selectorList);

    await page.waitFor(1000);

    return page;
  }

  async scrapeInfiniteScrollItems(page: Page): Promise<IProduct[]> {
    let items: IProduct[] = [];
    let stop = false;

    try {
      while (!stop) {
        let previousHeight;

        const newItems = await page.evaluate(this.extractData);

        previousHeight = await page.evaluate("document.body.scrollHeight");

        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

        await page.waitForFunction(
          `document.body.scrollHeight > ${previousHeight}`
        );

        await page.waitForFunction(
          "document.querySelector('.jscroll-loading').length <= 0"
        );

        console.log(newItems.length, items.length);

        if (items.length >= newItems.length) {
          stop = true;

          return newItems;
        } else {
          items = newItems;
        }
      }
    } catch (e) {
      console.log("error", e);
    }

    return items;
  }

  async search(param: string, selectorInput: string, selectorList: string) {
    let items: IProduct[] = [];

    try {
      const page = await this.prepareSearch(param, selectorInput, selectorList);

      items = await this.scrapeInfiniteScrollItems(page);
    } catch (error) {
      console.log("Error", error);
    }

    return Promise.resolve(
      items.map((item) => ({ ...item, provider: this.config.provider }))
    );
  }
}

export default Provider;
