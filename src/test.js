const fs = require("fs");
const puppeteer = require("puppeteer");

function extractItems() {
  const extractedElements = document.querySelectorAll(
    ".Pev__Home__ListProduct"
  );

  const items = [];

  for (let element of extractedElements) {
    const name = element.querySelector(".Mic__TitleProduct").innerText;

    items.push(name);
  }

  return items;
}

async function scrapeInfiniteScrollItems(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000
) {
  let items = [];
  try {
    while (items.length < 20) {
      let previousHeight;

      await page.waitForSelector("#Pev_AdsListingInfiniteSearch");

      items = await page.evaluate(extractItems);

      previousHeight = await page.evaluate("document.body.scrollHeight");

      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`
      );

      await page.waitFor(scrollDelay);
    }
  } catch (e) {}
  return items;
}

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto("https://merqueo.com/bogota");

  await page.type(".mq-input-group", "huevos");

  await page.keyboard.press(String.fromCharCode(13));

  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

  fs.writeFileSync("./items.txt", items.join("\n") + "\n");

  // Close the browser.
  await browser.close();
})();
