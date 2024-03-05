import { Application } from "../Application";
import { APPLICATION_TOKEN } from "./ApplicationToken.constant";
import { InjectionToken } from "./InjectionToken.type";

export function Inject<T = any>(token: InjectionToken): T {
    const root = globalThis as any;
    const app: Application = root[APPLICATION_TOKEN];
    return app.getProvidedValue(token) as T;
}