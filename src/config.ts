export enum providers {
  merqueo = "merqueo",
  lamayorista = "lamayorista",
  frubana = "frubana",
}

type driver = "puppeteer";

export interface IConfigProvider {
  driver: driver;
  url: string;
  provider: providers;
  validItemsPerScroll?: Number;
}

export interface IConfig {
  default: providers;
  providers: {
    [key in providers]: IConfigProvider;
  };
}

const Config: IConfig = {
  default: providers.lamayorista,
  providers: {
    lamayorista: {
      driver: "puppeteer",
      url: "https://lamayorista.com/buscar/",
      provider: providers.lamayorista,
    },
    merqueo: {
      driver: "puppeteer",
      url: "https://merqueo.com/bogota",
      provider: providers.merqueo,
    },
    frubana: {
      driver: "puppeteer",
      url: "https://co.frubana.com/bog",
      provider: providers.frubana,
    },
  },
};

export default Config;
