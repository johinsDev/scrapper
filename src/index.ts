import ScrapperManager from "./Scrapper";
import Config, { providers } from "./config";
import fs from "fs";

const scrapper = new ScrapperManager(Config);

// new ScrapperManager(Config)
//   .use(providers.lamayorista)
//   .search("aguardiente", "input#search", "#Pev_AdsListingInfiniteSearch", true)
//   .then((products) => {
//     console.log("Finish" + products.length);

//     fs.writeFileSync(
//       "./lamayorista.txt",
//       products.map(JSON.stringify).join("\n") + "\n"
//     );
//   })
//   .catch(console.error);

// console.time("Frubana");
// scrapper
//   .use(providers.frubana)
//   .search("pescado", ".js-searchInput", ".products-container")
//   .then((products) => {
//     fs.writeFileSync(
//       "./frubana.txt",
//       products.map(JSON.stringify).join("\n") + "\n"
//     );

//     console.timeEnd("Frubana");
//   })
//   .catch(console.error);

console.time("LaMAyorista");
scrapper
  .use(providers.lamayorista)
  .search("huevos", "input#search", "#Pev_AdsListingInfiniteSearch")
  .then((products) => {
    console.timeEnd("LaMAyorista");
    fs.writeFileSync(
      "./lamyorista.txt",
      products.map(JSON.stringify).join("\n") + "\n"
    );
  })
  .catch(console.error);

// console.time("Merqueo");
// scrapper
//   .use(providers.merqueo)
//   .search("aguardiente", "input#finder-products", "#infinite-scroll-products")
//   .then((products) => {
//     console.timeEnd("Merqueo");
//     fs.writeFileSync(
//       "./merqueo.txt",
//       products.map(JSON.stringify).join("\n") + "\n"
//     );
//   })
//   .catch(console.error);
