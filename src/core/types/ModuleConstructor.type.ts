import { Application } from "../Application";

export type ModuleConstructor = {
    new (app:Application, ...args: any[]): any;
  };
  