import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<string>("app.config");
export interface IAppConfig {
  endpoint: string;
  apiEndpoint: string;
  apiSettingsPath: string;
}

let endPoint = "https://api.tsetab.com";

export const AppConfig: IAppConfig = {
  endpoint: endPoint,
  apiEndpoint: endPoint + "/api",
  apiSettingsPath: "ApiSetting"
}; 