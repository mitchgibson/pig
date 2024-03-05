import { Application } from "../Application";
import { ModuleConstructor } from "../types/ModuleConstructor.type";
import { APPLICATION_TOKEN } from "./ApplicationToken.constant";

export function Module(module: ModuleConstructor): void {
    const root = globalThis as any;
    const app: Application = root[APPLICATION_TOKEN];
    new module(app);
}