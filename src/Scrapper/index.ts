import { IConfig, providers, IConfigProvider } from "src/config";
import LaMayorista from "./providers/LaMayorista";
import { IProvider } from "./providers/IProvider";
import Frubana from "./providers/Frubana";

const capitalize = (value: string) => {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default class ScrapperManager {
  protected singleton: boolean;

  private mappingsCache: Map<providers, IProvider> = new Map();

  constructor(public config: IConfig) {
    this.singleton = true;
  }

  protected getDefaultMappingName(): providers {
    return this.config.default;
  }

  private getFromCache(name: providers): IProvider | null {
    return this.mappingsCache.get(name) || null;
  }

  protected getMappingDriver(name: providers) {
    const config = this.getMappingConfig(name);
    return config && config.provider;
  }

  protected getMappingConfig(name: providers) {
    return this.config.providers[name];
  }

  use(name?: providers): IProvider {
    const mappingName = name || this.getDefaultMappingName();

    const cached = this.getFromCache(mappingName);

    if (cached) {
      return cached;
    }

    const driver = this.getMappingDriver(mappingName);

    return this.makeDriver(
      mappingName,
      driver,
      this.getMappingConfig(mappingName)
    );
  }

  private makeDriver(
    mappingName: providers,
    driver: string,
    config: IConfigProvider
  ): IProvider {
    const driverCreatorName = `create${capitalize(
      driver.replace(/-\w|_\w/g, (g) => g.substr(1).toUpperCase())
    )}Provider`;

    // @ts-ignore
    const value = this[driverCreatorName](mappingName, config);

    this.saveToCache(mappingName, value);

    return value;
  }

  private saveToCache(name: providers, value: IProvider): void {
    if (this.singleton) {
      this.mappingsCache.set(name, value);
    }
  }

  createLamayoristaProvider(_: providers, config: IConfigProvider) {
    return new LaMayorista(config);
  }

  createFrubanaProvider(_: providers, config: IConfigProvider) {
    return new Frubana(config);
  }

  createMerqueoProvider(_: providers, config: IConfigProvider) {
    return new Frubana(config);
  }
}
