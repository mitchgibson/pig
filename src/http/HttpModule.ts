import { Application } from "../core";
import { HttpClient } from "./HttpClient";
import { HttpInterceptors, HttpInterceptorsOptions } from "./HttpInterceptors";

export type HttpModuleOptions = HttpInterceptorsOptions;

export class HttpModule {
  constructor(app: Application, options: HttpModuleOptions = {}) {
    app.provide([HttpClient, [HttpInterceptors, options]]);
  }
}
